import express from 'express';
import { PrismaClient } from '@prisma/client';
import { fetchAndProcessLolMatches, fetchAndProcessValMatches } from '../data/lolapi.js';
import { fileURLToPath } from 'url';
import path from 'path';

import updateMatchOdds from '../utils/randomOdds.js';
import dotenv from 'dotenv';
import bcrypt from "bcrypt";
import fs from 'fs/promises';

import jwt from 'jsonwebtoken';

// ENV VARS
dotenv.config();

// PRISMA 
const prisma = new PrismaClient();

// EXPRESS
const app = express();

// JSON PARSER
app.use(express.json());

// BASE ROUTE
const API_BASE = '/api';

// CURRENT MATCHS - Updated every minutes
let nextLolMatch = [];
let nextValMatch = [];

let matchesOdds = [];

// UPDATER MATCHS
const updateMatches = async () => {
  try {
    
    console.log("[LOG] Updating matchs...");
    const lolMatches = await fetchAndProcessLolMatches();
    nextLolMatch = lolMatches;
    const valMatches = await fetchAndProcessValMatches();
    nextValMatch = valMatches;
    matchesOdds = updateMatchOdds(lolMatches, matchesOdds);
    matchesOdds = updateMatchOdds(valMatches, matchesOdds);
    console.log("[LOG] Matchs updated at " + new Date());
  } catch (error) {
    console.error("[ERROR] Échec de la mise à jour des matchs :", error);
  }
};

if(process.env.DEV_MODE === "false") {

  setInterval(updateMatches, 60 * 1000);
  updateMatches();
} else {
  console.log("[LOG] Dev mode enabled. Skipping match update...");
  console.log("[LOG] Setting manually the matchs via sample data.");

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const loadSampleData = async () => {
    try {
      const lolData = await fs.readFile(path.join(__dirname, '..', 'data', 'sample_data_lol.json'));
      const valData = await fs.readFile(path.join(__dirname, '..', 'data', 'sample_data_val.json'));
      
      nextLolMatch = JSON.parse(lolData);
      nextValMatch = JSON.parse(valData);
    } catch (error) {
      console.error("[ERROR] Failed to load sample data:", error);
    }
  }

  loadSampleData();
}

// API ROUTES FOR UPCOMING MATCHS AND ODDS
app.get(`${API_BASE}/matches/lol/upcoming`, (req, res) => {
  res.status(200).json(nextLolMatch);
});

app.get(`${API_BASE}/matches/val/upcoming`, (req, res) => {
  res.status(200).json(nextValMatch);
});


app.get(`${API_BASE}/matches/odds`, (req, res) => {
  res.status(200).json(matchesOdds);
});


// API ROUTE FOR SIGN UP
app.post(`${API_BASE}/users`, async (req, res) => {
  const { nickname, password, mail, birth_date, avatar, displayName } = req.body;
  console.log("[LOG] Sign up request. Nickname : " + nickname);

  try {
    if (!nickname || !password || !mail || !birth_date) {
      return res.status(400).json({ error: 'All fields are required except avatar.' });
    }

    // Hashing password
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the number of rounds (cost)

    // SQL : Creating user
    const newUser = await prisma.account.create({
      data: {
        nickname,
        password: hashedPassword,
        mail,
        birth_date: new Date(birth_date),
        avatar: avatar || null, 
        delta: 0, 
        solde: 50,
        displayName: displayName || "",
      },
    });


    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    if (error.code === 'P2002') {
      // 409 : Conflict not unique
      return res.status(409).json({ error: 'Nickname or email already exists.' });
    }
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post(`${API_BASE}/auth/login`, async (req, res) => {
  const { identifier, password } = req.body; // Can be mail or nickname
  console.log("[LOG] Login request. Identifier : " + identifier);

  try {
    if (!identifier || !password) {
      return res.status(400).json({ error: 'Username/Email and password are required.' });
    }

    // Search eather mail or nickname
    const user = await prisma.account.findFirst({
      where: {
        OR: [
          { mail: identifier },
          { nickname: identifier },
        ],
      },
    });

    if (!user) {
      return res.status(404).json({ error: 'Invalid username/email or password.' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid username/email or password.' });
    }

    // Generating token
    const token = jwt.sign(
      { id: user.id, nickname: user.nickname, mail: user.mail },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({
      message: 'Login successful',
      token,
      user: { id: user.id, nickname: user.nickname, mail: user.mail, avatar: user.avatar, displayName: user.displayName, solde: user.solde, delta: user.delta }, // Données utilisateur
    });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// API ROUTE FOR DAILY GIFT
app.post(`${API_BASE}/users/:nickname/daily-gift`, async (req, res) => {
  const username = req.params.nickname;
  console.log("[LOG] - Daily gift request. User : " + username);

  try {
    // Récupérer l'utilisateur
    const user = await prisma.account.findUnique({
      where: { nickname: username },
    });

    console.log(user)

    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }
    
    // DAILY GIFT ONLY ONCE PER DAY
    const today = new Date().toISOString().split('T')[0]; // Obtenir la date du jour (yyyy-mm-dd)
    const lastGiftDate = user.last_daily_gift
      ? user.last_daily_gift.toISOString().split('T')[0]
      : null;

    if (lastGiftDate === today) {
      return res.status(403).json({ error: 'You have already claimed your daily gift today.' });
    }
      

    const updatedUser = await prisma.account.update({
      where: { nickname: username },
      data: {
        solde: user.solde + 50.0,
        last_daily_gift: new Date(),
      },
    });

    res.status(200).json({
      message: 'Daily gift claimed successfully!',
      user: { id: updatedUser.id, solde: updatedUser.solde, last_daily_gift: updatedUser.last_daily_gift },
    });
  } catch (error) {
    console.error('Error claiming daily gift:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// API ROUTE FOR PLACING BET
app.post(`${API_BASE}/bets`, async (req, res) => {
  const { nickname, matchId, teamName, betAmount } = req.body;

  try {
    console.log("[LOG] - NEW BET REQUEST");
    console.log("Nickname : " + nickname + " | MatchID : " + matchId + " | TeamName : " + teamName + " | BetAmount : " + betAmount);
    if (!nickname || !matchId || !teamName || !betAmount) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    const user = await prisma.account.findUnique({
      where: { nickname },
    });

    // CHECK USER EXISTS

    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    // CHECK USER FONDS

    if (user.solde < betAmount) {
      return res.status(400).json({ error: 'Insufficient balance.' });
    }

    // CHECK USER HAS NOT ALREADY BET ON THIS MATCH

    const existingBet = await prisma.bet.findFirst({
      where: {
        nickname,
        matchId,
      },
    });

    if (existingBet) {
      return res.status(403).json({ error: 'You already have a bet on this match.' });
    }

    // CHECK MATCH EXISTS

    const match = nextLolMatch.concat(nextValMatch).find((m) => m.id === matchId);
    if (!match) {
      return res.status(404).json({ error: 'Match not found.' });
    }

    // CHECK TEAM EXISTS

    const team = match.teams.find((t) => t.name === teamName);
    if (!team) {
      return res.status(404).json({ error: 'Team not found in this match.' });
    }

    // GET ODDS
    const odds = matchesOdds.find((o) => o.hasOwnProperty(matchId));
    const teamOdds = odds ? odds[matchId][team.name === match.teams[0].name ? 0 : 1] : 1.0;

    // POTENTIAL WINNINGS
    const potentialWinnings = betAmount * teamOdds;

    // SQL : Creating bet
    const newBet = await prisma.bet.create({
      data: {
        nickname,
        matchId,
        teamName,
        betAmount,
        potentialWinnings,
      },
    });

    await prisma.account.update({
      where: { nickname },
      data: { solde: user.solde - betAmount },
    });

    res.status(201).json({
      message: 'Bet placed successfully.',
      bet: newBet,
    });
  } catch (error) {
      console.error('Error placing bet:', error);
      res.status(500).json({ error: 'Internal server error.' });
  }
});

// API ROUTE FOR FETCHING USER MATCHES

app.get(`${API_BASE}/users/:nickname/matches`, async (req, res) => {
  const username = req.params.nickname;

  try {
    const matches = await prisma.bet.findMany({
      where: { nickname: username },
      select: {
        matchId: true,
        teamName: true,
        betAmount: true,
        potentialWinnings: true,
        status: true,
      },
    });

    res.status(200).json(matches);
  } catch (error) {
    console.error("[ERROR] - Unable to fetch matches: ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// API ROUTE FOR UPDATING USER

app.patch(`${API_BASE}/users/:nickname`, async (req, res) => {
  const { nickname } = req.params;
  console.log("[LOG] Updating user - " + nickname);
  const { displayName, avatar, password, mail } = req.body;
  
  try {

    // USER VERIFICATION
    const user = await prisma.account.findUnique({
      where: { nickname },
    });


    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    const updateData = {};
    if (displayName !== undefined) updateData.displayName = displayName;
    if (avatar !== undefined) updateData.avatar = avatar;



    if (mail) {
      const emailExists = await prisma.account.findFirst({
        where: { mail },
      });
      if (emailExists && emailExists.nickname !== nickname) {
        return res.status(409).json({ error: 'Email already in use by another user.' });
      }
      updateData.mail = mail;
    }
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updateData.password = hashedPassword;
    }

    const updatedUser = await prisma.account.update({
      where: { nickname },
      data: updateData,
    });

    res.status(200).json({
      message: 'User updated successfully.',
      user: { 
        id: updatedUser.id, 
        nickname: updatedUser.nickname, 
        mail: updatedUser.mail, 
        avatar: updatedUser.avatar, 
        displayName: updatedUser.displayName, 
        solde: updatedUser.solde, 
        delta: updatedUser.delta 
      },
    });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});


// API ROUTE FOR DELETING USER

app.delete(`${API_BASE}/users/:nickname`, async (req, res) => {
  const { nickname } = req.params;
  console.log("[LOG] Deleting user - " + nickname);

  try {
    // USER VERIFICATION
    const user = await prisma.account.findUnique({
      where: { nickname },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    // SQL : Deleting user
    await prisma.account.delete({
      where: { nickname },
    });

    res.status(200).json({ message: 'User deleted successfully.' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});


// EXPRESS : Starting server

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`[SERVER] Starting server on http://localhost:${PORT}${API_BASE}`);
});

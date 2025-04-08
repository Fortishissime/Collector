import dotenv from 'dotenv';
import axios from 'axios';

// LOAD ENV VARS
dotenv.config();

export const fetchAndProcessLolMatches = async () => {
  const url = 'https://api.pandascore.co/lol/matches/upcoming';
  const apiKey = process.env.PANDA_TOKEN;
  const devMode = process.env.DEV_MODE === "true" ? true : false;


  try {
    const response = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Connection': 'close'
      },
    });

    const rawMatches = response.data;

    // FETCH AND FORMAT
    const processedMatches = rawMatches
      .filter(match => match.opponents.length === 2)
      .map(match => ({
        id: match.id,
        name: match.name,
        date: match.scheduled_at,
        teams: match.opponents.map(opponent => ({
          name: opponent.opponent.name,
          logo: opponent.opponent.image_url,
          tag: opponent.opponent.acronym,
        })),
      }));
    return processedMatches
  } catch (error) {
    console.error('Error fetching or processing matches:', error);
  }
};


export const fetchAndProcessValMatches = async () => {
  const url = 'https://api.pandascore.co/valorant/matches/upcoming';
  const apiKey = process.env.PANDA_TOKEN;
  const devMode = process.env.DEV_MODE === "true" ? true : false;


  try {
    const response = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Connection': 'close'
      },
    });

    const rawMatches = response.data;

    const processedMatches = rawMatches
      .filter(match => match.opponents.length === 2)
      .map(match => ({
        id: match.id,
        name: match.name,
        date: match.scheduled_at,
        teams: match.opponents.map(opponent => ({
          name: opponent.opponent.name,
          logo: opponent.opponent.image_url ? opponent.opponent.image_url : "https://cdn-icons-png.flaticon.com/512/5726/5726678.png",
          tag: opponent.opponent.acronym,
        })),
      }));
    return processedMatches
  } catch (error) {
    console.error('Error fetching or processing matches:', error);
  }
};

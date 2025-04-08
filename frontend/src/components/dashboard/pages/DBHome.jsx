import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useDashboardHandlers } from '../handlers';

const DBHome = () => {
  const [lolMatches, setLolMatches] = useState([]);
  const [valMatches, setValMatches] = useState([]);
  const [selectedBet, setSelectedBet] = useState(null);
  const [betAmount, setBetAmount] = useState("10.00");
  const [isPlaceholderVisible, setPlaceholderVisible] = useState(false);
  const [selectedGame, setSelectedGame] = useState('lol');
  const [matchOdds, setMatchOdds] = useState([]);
  const [betStatus, setBetStatus] = useState(null);
  const [betErrorMessage, setBetErrorMessage] = useState("No problem !");
  const {user, setUser, coins, setCoins} = useDashboardHandlers();  
  

  const coinAnimation = (updatedCoins) => {;
    setUser((prevUser) => {
      const updatedUser = { ...prevUser, solde: updatedCoins };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      return updatedUser;
    });

    setCoins(updatedCoins)
  }


  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const [lolRes, valRes, oddsRes] = await Promise.all([
          axios.get('/api/matches/lol/upcoming'),
          axios.get('/api/matches/val/upcoming'),
          axios.get('/api/matches/odds'),
        ]);

        setLolMatches(lolRes.data);
        setValMatches(valRes.data);
        setMatchOdds(oddsRes.data);
      } catch (error) {
        console.error('Error fetching matches:', error);
      }
    };
    
    fetchMatches();
  }, []);

  const formatTag = (team) => team.tag || team.name.slice(0, 3).toUpperCase();
  
  const getMatchOdds = (matchId) => {
    const odds = matchOdds.find((odd) => odd.hasOwnProperty(matchId));
    return odds ? odds[matchId] : [1.0, 1.0];
  };

  const handleBetClick = (match, team) => {
    console.log(user);
    console.log(coins)

    setSelectedBet({ match, team });
    setPlaceholderVisible(true);
    setBetStatus(null);
  };

  const handleClosePlaceholder = () => {
    setPlaceholderVisible(false);
    setTimeout(() => {
      setSelectedBet(null);
      setBetAmount("10.00");
      setBetStatus(null);
    }, 500);
  };

  const submitBet = async () => {
    if (!selectedBet || betAmount <= 0) return;
  
    try {
      const response = await axios.post('/api/bets', {
        matchId: selectedBet.match.id,
        teamName: selectedBet.team.name,
        betAmount: parseFloat(betAmount.replace(",", ".")),
        nickname: user.nickname,
      });

  
      if (response.status === 201) {
        setBetStatus('success');
        setTimeout(() => {
          handleClosePlaceholder();
        }, 1500);
        coinAnimation(coins - parseFloat(betAmount))
        setBetAmount("10.00");
      }
    } catch (error) {
      console.error(error);
      if (error.response) {
        const { data } = error.response;
        setBetErrorMessage(data.error || 'Une erreur inconnue est survenue.');
      } else {
        setBetErrorMessage('Critical error. Try again.');
      }
      setBetStatus('error');
    }
  };
  

  const handleGameSelection = (game) => {
    setSelectedGame(game);
  };

  const displayedMatches = selectedGame === 'lol' ? lolMatches : valMatches;

  return (
    <div className="relative ml-60">
      <div className="mb-3 ml-6 space-x-4">
        <Button
          variant={selectedGame === 'lol' ? 'contained' : 'outlined'}
          color="primary"
          onClick={() => handleGameSelection('lol')}
        >
          League of Legends
        </Button>
        <Button
          variant={selectedGame === 'val' ? 'contained' : 'outlined'}
          color="primary"
          onClick={() => handleGameSelection('val')}
        >
          Valorant
        </Button>
      </div>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 p-6">
        {displayedMatches.map((match) => (
          <div
            key={match.id}
            className="bg-gray-800 text-gray-200 p-4 rounded-lg shadow-md flex flex-col justify-between"
          >
            <div className="flex justify-between items-center">
              <img
                src={match.teams[0].logo}
                alt={match.teams[0].name}
                className="h-12 w-12"
              />
              <h3 className="text-lg font-bold text-center">{match.name}</h3>
              <img
                src={match.teams[1].logo}
                alt={match.teams[1].name}
                className="h-12 w-12"
              />
            </div>

            <div className="text-center text-sm italic text-gray-400 mb-3">
              {new Date(match.date).toLocaleString('fr-FR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </div>

            <div className="flex justify-between text-sm">
              {(() => {
                const [leftOdd, rightOdd] = getMatchOdds(match.id);
                return (
                  <>
                    <span className="bg-gray-700 text-white py-1 px-3 rounded-md font-semibold">
                      {leftOdd.toFixed(2)}
                    </span>
                    <span className="bg-gray-700 text-white py-1 px-3 rounded-md font-semibold">
                      {rightOdd.toFixed(2)}
                    </span>
                  </>
                );
              })()}
            </div>

            <div className="flex justify-around items-center mt-4">
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                onClick={() => handleBetClick(match, match.teams[0])}
              >
                BET {formatTag(match.teams[0])}
              </button>
              <span className="text-gray-400 font-bold">OR</span>
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                onClick={() => handleBetClick(match, match.teams[1])}
              >
                BET {formatTag(match.teams[1])}
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedBet && (
        <div
          className={`fixed bottom-0 right-0 mb-4 mr-4 bg-gray-850 text-gray-200 p-6 rounded-lg shadow-lg ${
            isPlaceholderVisible ? 'show-placeholder' : 'hidden-placeholder'
          }`}
          style={{ width: '300px', height: '430px' }}
        >
          <button
            className="absolute top-2 right-2 text-gray-400 hover:text-gray-200"
            onClick={handleClosePlaceholder}
          >
            &times;
          </button>

          {betStatus !== 'success' && (
            <div className="text-center">
              <img
                src={selectedBet.team.logo}
                alt={selectedBet.team.name}
                className="h-12 w-12 mx-auto mb-2"
              />
              <h3 className="text-lg font-bold">{selectedBet.match.name}</h3>
              <p className="text-sm italic text-gray-400">
                {new Date(selectedBet.match.date).toLocaleString('fr-FR', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
              <div className="flex justify-center mt-4 ml-1 text-sm">
                {(() => {
                  const [leftOdd, rightOdd] = getMatchOdds(selectedBet.match.id);
                  const selectedOdd =
                    selectedBet.team === selectedBet.match.teams[0]
                      ? leftOdd
                      : rightOdd;
                  return (
                    <span className="bg-gray-700 text-white py-1 px-3 rounded-md font-semibold">
                      {selectedOdd.toFixed(2)}
                    </span>
                  );
                })()}
              </div>

              <div className="mt-4">
                <label htmlFor="betAmount" className="block text-sm mb-1">
                  Credits to Bet: {selectedBet.team.tag}
                </label>
                <input
                  id="betAmount"
                  type="number"
                  value={betAmount}
                  onChange={(e) => 
                    {
                      console.log(e.target.value)
                      if (
                        e.target.value >= 0.0 &&
                        (!e.target.value.includes('.') || e.target.value.split('.')[1].length <= 2)
                      ) {
                        setBetAmount(e.target.value)
                      }
                    }
                  }

                  className="w-full p-2 rounded bg-gray-700 text-gray-200 border-none focus:outline-none"
                />
              </div>

              {(() => {
                const [leftOdd, rightOdd] = getMatchOdds(selectedBet.match.id);
                const selectedOdd =
                  selectedBet.team === selectedBet.match.teams[0]
                    ? leftOdd.toFixed(2)
                    : rightOdd.toFixed(2);
                return (
                  <p className="mt-2 text-sm truncate">
                    Potential Winnings: <span className="font-bold">{(betAmount * selectedOdd).toFixed(2)} credits</span>
                  </p>
                );
              })()}

              <button
                className="bg-green-600 text-white px-4 py-2 rounded mt-4 hover:bg-green-700"
                onClick={submitBet}
              >
                Confirm Bet
              </button>

              {betStatus === 'error' && (
                <div className="mt-2 text-red-500 text-xs">{betErrorMessage}.</div>
              )}

              <p className="text-xs italic text-gray-400 mt-4">
                Once placed, bets are not cancellable
              </p>
            </div>
          )}

          {betStatus === 'success' && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-850">
              <img
                src={selectedBet.team.logo}
                alt={selectedBet.team.name}
                className="h-16 w-16 mb-4"
              />
              <CheckCircleIcon className="text-green-500 text-6xl mb-2" />
              <p className="text-xl font-bold text-green-500">Bet confirmed!</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DBHome;
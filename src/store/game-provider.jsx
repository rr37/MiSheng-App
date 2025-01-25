import { useState } from 'react';
import PropTypes from 'prop-types';
import { GameContext } from './game-context';

export const GameProvider = ({ children }) => {
  const [currentId, setCurrentId] = useState('1');
  const [missions, setMissions] = useState([]);
  const [currentMission, setCurrentMission] = useState(null);
  const [unlockedHints, setUnlockedHints] = useState({});

  const unlockHint = (missionId, hintIndex) => {
    setUnlockedHints((prev) => ({
      ...prev,
      [missionId]: {
        ...prev[missionId],
        [hintIndex]: true,
      },
    }));
  };

  return (
    <GameContext.Provider
      value={{
        currentId,
        setCurrentId,
        missions,
        setMissions,
        currentMission,
        setCurrentMission,
        unlockedHints,
        setUnlockedHints,
        unlockHint,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

GameProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

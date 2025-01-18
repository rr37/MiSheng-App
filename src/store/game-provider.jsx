import { useState } from 'react';
import PropTypes from 'prop-types';
import { GameContext } from './game-context';

export const GameProvider = ({ children }) => {
  const [currentId, setCurrentId] = useState('1');
  const [missions, setMissions] = useState([]);
  const [currentMission, setCurrentMission] = useState(null);

  return (
    <GameContext.Provider
      value={{
        currentId,
        setCurrentId,
        missions,
        setMissions,
        currentMission,
        setCurrentMission,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

GameProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

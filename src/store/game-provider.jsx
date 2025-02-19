import { useState } from 'react';
import PropTypes from 'prop-types';
import { GameContext } from './game-context';

export const GameProvider = ({ children }) => {
  // 只需匯入一次的遊戲資料
  const [characterData, setCharacterData] = useState(null);
  const [hintData, setHintData] = useState(null);
  const [missionData, setMissionData] = useState([]);
  const [propData, setPropData] = useState(null);
  const [rundownData, setRundownData] = useState(null);

  // 玩家資料
  const [playerMissionData, setPlayerMissionData] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [currentId, setCurrentId] = useState('1');
  const [currentMissionId, setCurrentMissionId] = useState('0');
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

  // 更新任務的完成狀態
  const updateMissionStatus = (missionId, status = 'incomplete') => {
    setPlayerMissionData((prevMissions) => {
      const missionExists = prevMissions.some(
        (mission) => mission.id === missionId
      );

      if (!missionExists) {
        return [...prevMissions, { id: missionId, status }];
      }

      return prevMissions.map((mission) =>
        mission.id === missionId ? { ...mission, status } : mission
      );
    });
  };

  return (
    <GameContext.Provider
      value={{
        //只需匯入一次的資料
        characterData,
        setCharacterData,
        hintData,
        setHintData,
        missionData,
        setMissionData,
        propData,
        setPropData,
        rundownData,
        setRundownData,

        playerMissionData,
        setPlayerMissionData,
        isDataLoaded,
        setIsDataLoaded,
        currentId,
        setCurrentId,
        currentMissionId,
        setCurrentMissionId,
        unlockedHints,
        setUnlockedHints,
        unlockHint,
        updateMissionStatus,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

GameProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

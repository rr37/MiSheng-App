import { useState, useEffect, useContext } from 'react';
import { GameContext } from '../store/game-context';
import { Typography } from '@mui/material';
import ModelTestInfo from '../component/common/ModelTestInfo';
import TalkModel from './TalkModel';
import QuizModel from './QuizModel';
import MissionStartModel from './MissionStartModel';
import MissionAnswerInputModel from './MissionAnswerInputModel';
import { loadCSVData } from './csvLoader';
import PropTypes from 'prop-types'; // 引入 PropTypes

const GameController = ({
  characterCsvFile,
  hintCsvFile,
  missionCsvFile,
  propCsvFile,
  rundownCsvFile,
}) => {
  const {
    characterData,
    setCharacterData,
    setHintData,
    setMissionData,
    setPropData,
    rundownData,
    setRundownData,

    isDataLoaded,
    setIsDataLoaded,
    currentId,
    setCurrentId,
  } = useContext(GameContext);
  const [currentRow, setCurrentRow] = useState([]);

  // 讀取該遊戲所有不變的資料
  useEffect(() => {
    if (isDataLoaded) {
      return;
    }
    const loadCsvFiles = async () => {
      try {
        const [characterData, hintData, missionData, propData, rundownData] =
          await Promise.all([
            loadCSVData(characterCsvFile),
            loadCSVData(hintCsvFile),
            loadCSVData(missionCsvFile),
            loadCSVData(propCsvFile),
            loadCSVData(rundownCsvFile),
          ]);
        setCharacterData(characterData);
        setHintData(hintData);
        setMissionData(missionData);
        setPropData(propData);
        setRundownData(rundownData);
        console.log('轉換 Csv 資料');
      } catch (error) {
        console.error('Error loading CSV files:', error);
      }
      setIsDataLoaded(true);
    };

    loadCsvFiles();
  }, []);

  useEffect(() => {
    // Check if csvData is valid and find the current row based on the current ID
    if (Array.isArray(rundownData)) {
      const row = rundownData.find((item) => item.id === currentId);
      if (row !== currentRow) {
        setCurrentRow(row);
      }
    }
  }, [currentId, rundownData, currentRow]);

  if (!rundownData || !Array.isArray(rundownData)) {
    return <Typography>Loading data...</Typography>;
  }

  if (!currentRow) {
    return <Typography>Loading...</Typography>;
  }

  // Render content based on the model type
  const renderContent = () => {
    switch (currentRow.model) {
      case 'Talk':
        return (
          <TalkModel
            data={rundownData}
            characterData={characterData}
            currentId={currentId}
            setCurrentId={setCurrentId}
          />
        );
      case 'Quiz':
        return (
          <QuizModel
            data={rundownData}
            characterData={characterData}
            currentId={currentId}
            setCurrentId={setCurrentId}
          />
        );
      case 'MissionStart':
        return (
          <MissionStartModel
            data={rundownData}
            currentId={currentId}
            setCurrentId={setCurrentId}
          />
        );
      case 'MissionAnswerInput':
        return (
          <MissionAnswerInputModel
            data={rundownData}
            setCurrentId={setCurrentId}
            currentDialogue={currentRow}
          />
        );
      // Add more cases for other models as needed
      default:
        return <Typography>Unknown model type: {currentRow.model}</Typography>;
    }
  };

  return (
    <>
      <ModelTestInfo model={currentRow.model} />
      {renderContent()}
    </>
  );
};

// 定義 propTypes
GameController.propTypes = {
  characterCsvFile: PropTypes.string.isRequired,
  hintCsvFile: PropTypes.string.isRequired,
  missionCsvFile: PropTypes.string.isRequired,
  propCsvFile: PropTypes.string.isRequired,
  rundownCsvFile: PropTypes.string.isRequired,
};

export default GameController;

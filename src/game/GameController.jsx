import { useState, useEffect, useContext } from 'react';
import { GameContext } from '../store/game-context';
import { Typography } from '@mui/material';
import ModelTestInfo from '../component/common/ModelTestInfo';
import TalkModel from './TalkModel';
import QuizModel from './QuizModel';
import MissionStartModel from './MissionStartModel';
import MissionAnswerInputModel from './MissionAnswerInputModel';
import ImgModel from './ImgModel';
import { loadCSVData } from './csvLoader';
import PropTypes from 'prop-types'; // 引入 PropTypes

const GameController = ({
  characterCsvFile,
  hintCsvFile,
  missionCsvFile,
  propCsvFile,
  rundownCsvFile,
  storyCsvFile,
}) => {
  const {
    setCharacterData,
    setHintData,
    missionData,
    setMissionData,
    setPropData,
    rundownData,
    setRundownData,
    setStoryData,

    isDataLoaded,
    setIsDataLoaded,
    currentId,
    setCurrentMissionId,
    updateMissionStatus,
  } = useContext(GameContext);
  const [currentRow, setCurrentRow] = useState([]);

  // 讀取該遊戲所有不變的資料
  useEffect(() => {
    if (isDataLoaded) {
      return;
    }
    const loadCsvFiles = async () => {
      try {
        const [
          characterData,
          hintData,
          missionData,
          propData,
          rundownData,
          storyData,
        ] = await Promise.all([
          loadCSVData(characterCsvFile),
          loadCSVData(hintCsvFile),
          loadCSVData(missionCsvFile),
          loadCSVData(propCsvFile),
          loadCSVData(rundownCsvFile),
          loadCSVData(storyCsvFile),
        ]);
        setCharacterData(characterData);
        setHintData(hintData);
        setMissionData(missionData);
        setPropData(propData);
        setRundownData(rundownData);
        setStoryData(storyData);
        console.log('轉換 Csv 資料');
      } catch (error) {
        console.error('Error loading CSV files:', error);
      }
      setIsDataLoaded(true);
    };

    loadCsvFiles();
  }, []);

  useEffect(() => {
    if (!Array.isArray(rundownData)) return;

    // 找到 currentRow
    const row = rundownData.find((item) => item.id === currentId);
    if (row !== currentRow) {
      setCurrentRow(row);
    }

    // 設定目前的 mission
    if (row) {
      const currentMissionId = row.missionId;
      const mission = missionData.find(
        (mission) => mission.id === currentMissionId
      );
      if (mission) {
        setCurrentMissionId(mission.id);
        updateMissionStatus(mission.id, 'solving');
      } else {
        console.log('這頁沒有 missionId');
      }
    }
  }, [currentId, rundownData, missionData, currentRow]);


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
        return <TalkModel currentRow={currentRow} />;
      case 'Quiz':
        return <QuizModel currentRow={currentRow} />;
      case 'MissionStart':
        return <MissionStartModel currentRow={currentRow} />;
      case 'MissionAnswerInput':
        return <MissionAnswerInputModel currentRow={currentRow} />;
      case 'Img':
        return <ImgModel currentRow={currentRow} />;
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
  storyCsvFile: PropTypes.string.isRequired,
};

export default GameController;

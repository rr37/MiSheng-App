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

const GameController = ({ rundownCsvFile, characterCsvFile }) => {
  const [rundownCsvData, setRundownCsvData] = useState(null);
  const [characterCsvData, setCharacterCsvData] = useState(null);
  const {currentId, setCurrentId} = useContext(GameContext);
  const [currentRow, setCurrentRow] = useState([]);

  useEffect(() => {
    const loadCsvFiles = async () => {
      try {
        const [rundownData, characterData] = await Promise.all([
          loadCSVData(rundownCsvFile),
          loadCSVData(characterCsvFile),
        ]);
        setRundownCsvData(rundownData);
        setCharacterCsvData(characterData);
      } catch (error) {
        console.error('Error loading CSV files:', error);
      }
    };

    loadCsvFiles();
  }, [rundownCsvFile, characterCsvFile]);

  useEffect(() => {
    // Check if csvData is valid and find the current row based on the current ID
    if (Array.isArray(rundownCsvData)) {
      const row = rundownCsvData.find((item) => item.id === currentId);
      setCurrentRow(row);
    }
  }, [currentId, rundownCsvData]);

  if (!rundownCsvData || !Array.isArray(rundownCsvData)) {
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
            data={rundownCsvData}
            characterData={characterCsvData}
            currentId={currentId}
            setCurrentId={setCurrentId}
          />
        );
      case 'Quiz':
        return (
          <QuizModel
            data={rundownCsvData}
            characterData={characterCsvData}
            currentId={currentId}
            setCurrentId={setCurrentId}
          />
        );
      case 'MissionStart':
        return (
          <MissionStartModel
            data={rundownCsvData}
            currentId={currentId}
            setCurrentId={setCurrentId}
          />
        );
      case 'MissionAnswerInput':
        return (
          <MissionAnswerInputModel
            data={rundownCsvData}
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
  rundownCsvFile: PropTypes.string.isRequired,
  characterCsvFile: PropTypes.string.isRequired,
};

export default GameController;

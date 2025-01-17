import { useState, useEffect } from 'react';
import { Typography, Box } from '@mui/material';
import TalkModel from './TalkModel';
import QuizModel from './QuizModel';
import MissionStart from './MissionStart';
import MissionAnswerInput from './MissionAnswerInput';
import { loadCSVData } from './csvLoader';
import PropTypes from 'prop-types'; // 引入 PropTypes

const GameController = ({ rundownCsvFile, characterCsvFile }) => {
  const [rundownCsvData, setRundownCsvData] = useState(null);
  const [characterCsvData, setCharacterCsvData] = useState(null);
  const [currentId, setCurrentId] = useState('1');
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
            currentId={currentId}
            setCurrentId={setCurrentId}
            characterData={characterCsvData}
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
          <MissionStart
            data={rundownCsvData}
            currentId={currentId}
            setCurrentId={setCurrentId}
          />
        );
      case 'MissionAnswerInput':
        return (
          <MissionAnswerInput
            data={rundownCsvData}
            currentId={currentId}
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
    <Box>
      <Typography variant="h5" gutterBottom>
        Current Model: {currentRow.model}
      </Typography>
      {renderContent()}
    </Box>
  );
};

// 定義 propTypes
GameController.propTypes = {
  rundownCsvFile: PropTypes.string.isRequired,
  characterCsvFile: PropTypes.string.isRequired,
};

export default GameController;

import { useState, useEffect } from 'react';
import { Typography, Box } from '@mui/material';
import TalkModel from './TalkModel';
import QuizModel from './QuizModel';
import MissionStart from './MissionStart';
import MissionAnswerInput from './MissionAnswerInput';
import { loadCSVData } from './csvLoader';
import PropTypes from 'prop-types'; // 引入 PropTypes

const GameController = ({ csvFile }) => {
  const [csvData, setCsvData] = useState(null);
  const [currentId, setCurrentId] = useState('1');
  const [currentRow, setCurrentRow] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await loadCSVData(csvFile);
        setCsvData(data);
      } catch (error) {
        console.error('Error loading CSV data:', error);
      }
    };

    fetchData();
  }, [csvFile]);

  useEffect(() => {
    // Check if csvData is valid and find the current row based on the current ID
    if (Array.isArray(csvData)) {
      const row = csvData.find((item) => item.id === currentId);
      setCurrentRow(row);
    }
  }, [currentId, csvData]);

  if (!csvData || !Array.isArray(csvData)) {
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
            data={csvData}
            currentId={currentId}
            setCurrentId={setCurrentId}
          />
        );
      case 'Quiz':
        return (
          <QuizModel
            data={csvData}
            currentId={currentId}
            setCurrentId={setCurrentId}
          />
        );
      case 'MissionStart':
        return (
          <MissionStart
            data={csvData}
            currentId={currentId}
            setCurrentId={setCurrentId}
          />
        );
      case 'MissionAnswerInput':
        return (
          <MissionAnswerInput
            data={csvData}
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
  csvFile: PropTypes.string.isRequired, // csvFile 應該是必須的字串
};

export default GameController;

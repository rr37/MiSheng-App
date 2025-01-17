import { useState, useEffect, useContext } from 'react';
import { Button, Typography, Box } from '@mui/material';
import { GameContext } from '../store/game-context';
import { loadCSVData } from './csvLoader';
import PropTypes from 'prop-types';
import missionCsvFile from '../../public/gameFile/sjqy/sjqy - mission.csv';
import useNextId from '../hook/useNextId';

const MissionStart = ({ data, currentId, setCurrentId }) => {
  const [currentDialogue, setCurrentDialogue] = useState(null);
  const [missionCsvData, setMissionCsvData] = useState(null);
  const { currentMission, setCurrentMission } = useContext(GameContext);
  const { setMissions } = useContext(GameContext);

  // 讀取 missionCsvFile 資料，將資料寫進 missionCsvData
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await loadCSVData(missionCsvFile);
        setMissionCsvData(data);
        setMissions(data);
      } catch (error) {
        console.error('Error loading CSV data:', error);
      }
    };

    fetchData();
  }, [setMissions]);

  useEffect(() => {
    if (data && data.length > 0) {
      const dialogue = data.find((row) => row.id === currentId);
      setCurrentDialogue(dialogue);
    }

    // 設定目前的 mission
    if (data && missionCsvData && missionCsvData.length > 0) {
      const row = data.find((row) => row.id === currentId);
      if (row) {
        const currentMissionId = row.missionId;
        const mission = missionCsvData.find(
          (row) => row.id === currentMissionId
        );
        setCurrentMission(mission);
      }
    }
  }, [currentId, data, missionCsvData, setCurrentMission]);

  const { getNextId, canProceedToNext } = useNextId(data, currentDialogue);

  const handleNext = () => {
    const nextId = getNextId();
    if (nextId) {
      setCurrentId(nextId); // 如果有下一個 ID，設置為它
    }
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" p={2}>
      {currentMission ? (
        <>
          <Typography variant="h6" gutterBottom>
            {currentMission.subtitle || ''}
          </Typography>
          <Typography variant="h2" gutterBottom>
            {currentMission.title || ''}
          </Typography>
          <Typography
            variant="body1"
            gutterBottom
            sx={{ whiteSpace: 'pre-wrap' }}
          >
            {currentMission.description || ''}
          </Typography>
          {currentMission.background_img && (
            <img
              src={currentMission.background_img}
              alt="scene"
              style={{ maxWidth: '100%', height: 'auto', marginBottom: '16px' }}
            />
          )}
        </>
      ) : (
        <Typography variant="h6" gutterBottom>
          正在載入任務資料...
        </Typography>
      )}
      <Button
        variant="contained"
        color="primary"
        onClick={handleNext}
        disabled={!canProceedToNext()}
      >
        開始遊戲
      </Button>
    </Box>
  );
};

// 定義 propTypes
MissionStart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      speaker: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      nextId: PropTypes.string,
      img: PropTypes.string,
      missionId: PropTypes.string,
    })
  ).isRequired,
  currentId: PropTypes.string.isRequired,
  setCurrentId: PropTypes.func.isRequired,
};

export default MissionStart;

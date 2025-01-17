import { useState, useEffect, useContext } from 'react';
import { Button, Typography, Box } from '@mui/material';
import { GameContext } from '../store/game-context';
import { loadCSVData } from './csvLoader';
import PropTypes from 'prop-types';
import missionCsvFile from '../../public/gameFile/sjqy/sjqy - mission.csv';
import useNextId from '../hook/useNextId';
import FloatingLayer from '../component/layer/FloatingLayer';
import Layer from '../component/layer/layer';
import BackgroundLayer from '../component/layer/BackgroundLayer';
import TalkText from '../component/common/TalkText';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';

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
    <FloatingLayer>
      {currentMission?.background_img && (
        <Layer>
          <BackgroundLayer
            src={`/gameFile/sjqy/img/${currentMission.background_img}`}
            opacity="0.9"
          />
        </Layer>
      )}

      <Layer>
        <Box
          sx={{
            width: '100%',
            padding: '7%',
            boxSizing: 'border-box',
            position: 'absolute',
            bottom: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'left',
          }}
        >
          {currentMission ? (
            <>
              <Typography
                align="left"
                sx={{
                  fontFamily: "'Noto Serif TC', serif",
                  fontWeight: 600,
                  fontSize: '28px',
                  color: '#fff',
                  marginLeft: '2px',
                  textShadow: '0px 3px 4.2px rgba(0, 0, 0, 0.5)',
                }}
              >
                {currentMission.subtitle || ''}
              </Typography>
              <Typography
                gutterBottom
                align="left"
                sx={{
                  fontFamily: "'Noto Serif TC', serif",
                  fontWeight: 900,
                  fontSize: '48px',
                  color: '#fff',
                  textShadow: '0px 6px 8.4px rgba(0, 0, 0, 0.5)',
                }}
              >
                {currentMission.title || ''}
              </Typography>
              {currentMission.description && (
                <TalkText
                  text={currentMission.description || ''}
                  height="auto"
                  textShadow="0px 3px 6px rgba(0, 0, 0, 0.5)"
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
            size="medium"
            color="inherit"
            sx={{
              borderRadius: '30px',
              width: 'fit-content',
              marginTop: '10px',
            }}
            onClick={handleNext}
            disabled={!canProceedToNext()}
            endIcon={<ArrowForwardRoundedIcon />}
          >
            開始遊戲
          </Button>
        </Box>
      </Layer>
    </FloatingLayer>
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

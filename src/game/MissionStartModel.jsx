import { useState, useEffect, useContext } from 'react';
import { Button, Typography, Box } from '@mui/material';
import { GameContext } from '../store/game-context';
import PropTypes from 'prop-types';
import useNextId from '../hook/useNextId';
import FloatingLayer from '../component/layer/FloatingLayer';
import Layer from '../component/layer/Layer';
import BackgroundLayer from '../component/layer/BackgroundLayer';
import MissionSubtitleText from '../component/common/MissionSubtitleText';
import MissionTitleText from '../component/common/MissionTitleText';
import TalkText from '../component/common/TalkText';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';

const MissionStart = ({ data, currentId, setCurrentId }) => {
  const [currentDialogue, setCurrentDialogue] = useState(null);
  const {
    missionData,
    currentMissionId,
    setCurrentMissionId,
    updateMissionStatus,
  } = useContext(GameContext);
  const currentMission = missionData[currentMissionId];

  useEffect(() => {
    if (data && data.length > 0) {
      const dialogue = data.find((row) => row.id === currentId);
      setCurrentDialogue(dialogue);

      // 設定目前的 mission
      if (dialogue) {
        const currentMissionId = dialogue.missionId;
        const mission = missionData.find(
          (mission) => mission.id === currentMissionId
        );
        if (mission) {
          setCurrentMissionId(mission.id);
          updateMissionStatus(mission.id, 'solving');
          console.log(`mission 現在是這樣：${mission.id}`);
        } else {
          console.log('未找到符合條件的任務');
        }
      }
    }
  }, [currentId, data]);

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
              <MissionSubtitleText subtitle={currentMission.subtitle} />
              <MissionTitleText title={currentMission.title} />
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

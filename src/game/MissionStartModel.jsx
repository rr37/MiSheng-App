import { useContext } from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';
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
import AssistantDirectionRoundedIcon from '@mui/icons-material/AssistantDirectionRounded';

const MissionStart = ({ currentRow }) => {
  const {
    missionData,
    rundownData,
    currentMissionId,
    setCurrentId,
  } = useContext(GameContext);
  const currentMission = missionData[currentMissionId];

  const { getNextId, canProceedToNext } = useNextId(rundownData, currentRow);

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

          <Stack direction="row" spacing={2} sx={{ mt: '10px' }}>
            {currentMission.navigation && (
              <Button
                variant="contained"
                size="medium"
                color="inherit"
                href={currentMission.navigation}
                target="_blank"
                sx={{
                  borderRadius: '30px',
                  width: 'fit-content',
                }}
                endIcon={<AssistantDirectionRoundedIcon />}
              >
                導航
              </Button>
            )}
            <Button
              variant="contained"
              size="medium"
              color="inherit"
              sx={{
                borderRadius: '30px',
                width: 'fit-content',
              }}
              onClick={handleNext}
              disabled={!canProceedToNext()}
              endIcon={<ArrowForwardRoundedIcon />}
            >
              開始遊戲
            </Button>
          </Stack>
        </Box>
      </Layer>
    </FloatingLayer>
  );
};

// 定義 propTypes
MissionStart.propTypes = {
  currentRow: PropTypes.object,
};

export default MissionStart;

import { useContext, useEffect, useState } from 'react';
import { Box, Fab, Paper, Stack, Typography } from '@mui/material';
import OpenInFullRoundedIcon from '@mui/icons-material/OpenInFullRounded';
import CloseFullscreenRoundedIcon from '@mui/icons-material/CloseFullscreenRounded';
import { GameContext } from '../../store/game-context';
import ThemeColorLayer from '../layer/ThemeColorLayer';

const StoryPage = () => {
  const { missionData, storyData, currentMissionId } = useContext(GameContext);
  const [currentStories, setCurrentStories] = useState();
  const [fullScreenIndex, setFullScreenIndex] = useState(null); // 控制哪張圖全螢幕

  const currentMission = missionData[currentMissionId];

  useEffect(() => {
    if (!currentMission) {
      console.log('還沒有 currentMission！');
      return;
    }
    if (!Array.isArray(storyData)) {
      console.log('storyData 不是有效的數組！');
      return;
    }
    const stories = storyData.filter(
      (row) => row.mission_id === currentMission.id
    );
    setCurrentStories(stories);
  }, [currentMission, storyData]);

  // 切換全螢幕模式
  const toggleFullScreen = (index) => {
    setFullScreenIndex(fullScreenIndex === index ? null : index);
  };

  return (
    <ThemeColorLayer bgc="#fff">
      <Box
        sx={{
          width: '100%',
          height: '85vh',
          padding: '7%',
          boxSizing: 'border-box',
          position: 'absolute',
          top: 0,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Typography
          gutterBottom
          align="left"
          sx={{
            fontFamily: "'Noto Serif TC', serif",
            fontWeight: 900,
            fontSize: '48px',
            color: '#37474F',
          }}
        >
          故事
        </Typography>
        <Stack
          spacing={2}
          sx={{
            overflowY: 'auto',
            maxHeight: '100%',
            flex: '1',
            p: '8%',
            m: '-8%',
          }}
        >
          {Array.isArray(currentStories) && currentStories.length > 0 ? (
            currentStories.map((story, index) => (
              <Paper
                key={index}
                elevation={10}
                sx={{
                  display: 'flex',
                  borderRadius: '10px',
                  position: 'relative',
                }}
              >
                {/* 放大按鈕，只在圖片未放大時顯示 */}
                {fullScreenIndex === null && (
                  <Fab
                    size="medium"
                    variant="contained"
                    onClick={() => toggleFullScreen(index)}
                    sx={{
                      position: 'absolute',
                      bottom: 10,
                      right: 10,
                      zIndex: 1101,
                      color: '#37474F',
                      backgroundColor: '#fff',
                    }}
                  >
                    <OpenInFullRoundedIcon />
                  </Fab>
                )}
                <img
                  src={`/gameFile/sjqy/img/${story.img}`}
                  alt={`Image ${index + 1}`}
                  style={{
                    width: fullScreenIndex === index ? '90%' : '100%',
                    height: fullScreenIndex === index ? 'auto' : 'auto',
                    objectFit: 'scale-down',
                    position: fullScreenIndex === index ? 'fixed' : 'relative',
                    top: fullScreenIndex === index ? '50%' : 'auto',
                    left: fullScreenIndex === index ? '50%' : 'auto',
                    transform:
                      fullScreenIndex === index
                        ? 'translate(-50%, -50%)'
                        : 'none',
                    borderRadius: 'inherit',
                    zIndex: fullScreenIndex === index ? 1001 : 'auto',
                  }}
                />
              </Paper>
            ))
          ) : (
            <p>No stories available</p>
          )}
        </Stack>
      </Box>

      {/* 當有圖片放大時，顯示背景 + 縮小按鈕 */}
      {fullScreenIndex !== null && (
        <>
          {/* 半透明白色背景，點擊可縮小圖片 */}
          <Box
            onClick={() => setFullScreenIndex(null)}
            sx={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              backgroundColor: 'rgba(200, 200, 200, 0.9)', // 半透明白底
              zIndex: 1000, // 確保在圖片下方
            }}
          />

          {/* 縮小按鈕 */}
          <Fab
            variant="contained"
            onClick={() => setFullScreenIndex(null)}
            sx={{
              position: 'fixed',
              zIndex: 1101, // 確保按鈕在最上層
              bottom: 0,
              left: '50%',
              transform: 'translate(-50%, -80%)',
              color: '#37474F',
              backgroundColor: '#fff',
            }}
          >
            <CloseFullscreenRoundedIcon />
          </Fab>
        </>
      )}
    </ThemeColorLayer>
  );
};

export default StoryPage;

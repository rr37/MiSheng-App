import { useContext, useEffect, useState } from 'react';
import { Box, Paper, Stack, Typography } from '@mui/material';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import BlockRoundedIcon from '@mui/icons-material/BlockRounded';
import PersonPinCircleRoundedIcon from '@mui/icons-material/PersonPinCircleRounded';
import { GameContext } from '../../store/game-context';
import ThemeColorLayer from '../layer/ThemeColorLayer';
import Layer from '../layer/Layer';
import BackgroundLayer from '../layer/BackgroundLayer';

const MissionPage = () => {
  const { missionData, playerMissionData, currentMissionId } =
    useContext(GameContext);
  const [displayMissions, setDisplayMissions] = useState();

  const currentMission = missionData[currentMissionId];

  useEffect(() => {
    if (!currentMission) {
      console.log('還沒有 currentMission！');
      return;
    }
    if (!Array.isArray(missionData)) {
      console.log('missionData 不是有效的數組！');
      return;
    }
    const filterMissions = missionData.filter((row) => row.id > 0);
    const updatedFilterMissions = filterMissions.map((mission) => {
      const targetMission = playerMissionData.find(
        (playerMD) => playerMD.id === mission.id
      );
      return { ...mission, status: targetMission?.status || '' };
    });
    setDisplayMissions(updatedFilterMissions);
  }, [currentMission, missionData, playerMissionData]);

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
          關卡
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
          {Array.isArray(displayMissions) && displayMissions.length > 0 ? (
            displayMissions.map((mission, index) => (
              <Paper
                key={index}
                elevation={10}
                sx={{
                  display: 'flex',
                  borderRadius: '20px',
                  position: 'relative',
                  height: '70px',
                  minHeight: '70px',
                }}
              >
                {/* Background-image */}
                <Layer>
                  {mission.status ? (
                    <BackgroundLayer
                      src={`/gameFile/sjqy/img/${mission.background_img}`}
                    />
                  ) : (
                    <Box
                      sx={{
                        width: '100%',
                        height: '100%',
                        background: '#37474F',
                        opacity: '50%',
                      }}
                    ></Box>
                  )}
                </Layer>

                {/* Gradient after text */}
                {mission.status ? (
                  <Layer>
                    <Box
                      sx={{
                        background:
                          'linear-gradient(-90deg,transparent 0%, #37474F 90%)',
                        width: '70%',
                        height: '100%',
                      }}
                    ></Box>
                  </Layer>
                ) : null}

                {/* Mission subtitle or title */}
                <Layer>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      height: '100%',
                      pl: '20px',
                    }}
                  >
                    {mission.status === 'solving' && (
                      <PersonPinCircleRoundedIcon sx={{ color: '#fff' }} />
                    )}
                    {mission.status === 'complete' && (
                      <CheckCircleOutlineRoundedIcon
                        sx={{ color: '#fff', opacity: '0.5' }}
                      />
                    )}
                    {!mission.status && (
                      <BlockRoundedIcon
                        sx={{ color: '#fff', opacity: '0.5' }}
                      />
                    )}
                    <Typography
                      align="left"
                      sx={{
                        fontFamily: "'Noto Serif TC', serif",
                        fontWeight: 600,
                        fontSize: '24px',
                        color: '#fff',
                        opacity:
                          !mission.status || mission.status === 'complete'
                            ? '0.5'
                            : '1',
                        marginLeft: '6px',
                        textShadow: '0px 3px 4.2px rgba(0, 0, 0, 0.5)',
                      }}
                    >
                      {mission.subtitle ? mission.subtitle : mission.title}
                    </Typography>
                  </Box>
                </Layer>
              </Paper>
            ))
          ) : (
            <p>No missions available</p>
          )}
        </Stack>
      </Box>
    </ThemeColorLayer>
  );
};

export default MissionPage;

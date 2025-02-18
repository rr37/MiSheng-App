import { useContext, useEffect, useState } from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { GameContext } from '../../store/game-context';
import ThemeColorLayer from '../layer/ThemeColorLayer';

const PropPage = () => {
  const { missionData, propData, currentMissionId } = useContext(GameContext);
  const [currentProps, setCurrentProps] = useState();
  const currentMission = missionData[currentMissionId];

  useEffect(() => {
    if (!currentMission) {
      console.log('還沒有 currentMission！');
      return;
    }
    if (!Array.isArray(propData)) {
      console.log('propData 不是有效的數組！');
      return;
    }
    const props = propData.filter(
      (row) => row.mission_id === currentMission.id
    );
    setCurrentProps(props);
  }, [currentMission, propData]);

  return (
    <ThemeColorLayer bgc="#fff">
      <Box
        sx={{
          width: '100%',
          padding: '7%',
          boxSizing: 'border-box',
          position: 'absolute',
          top: 0,
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
          道具
        </Typography>
        {Array.isArray(currentProps) && currentProps.length > 0 ? (
          currentProps.map((prop, index) => (
            <Paper
              key={index}
              elevation={12}
              sx={{
                display: 'flex',
                height: 'auto',
                // border: '1px solid #000',
                borderRadius: '10px',
                overflow: 'hidden',
              }}
            >
              <img
                src={`/gameFile/sjqy/img/${prop.img}`}
                alt={`Image ${index + 1}`}
                style={{
                  width: '100%',
                  height: 'auto',
                }}
              />
            </Paper>
          ))
        ) : (
          <p>No props available</p>
        )}
      </Box>
    </ThemeColorLayer>
  );
};

export default PropPage;

import { useContext, useEffect, useState } from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { GameContext } from '../../store/game-context';
import ThemeColorLayer from '../layer/ThemeColorLayer';
import { loadCSVData } from '../../game/csvLoader';
import propCsvFile from '../../../public/gameFile/sjqy/sjqy - prop.csv';

const PropPage = () => {
  const { currentMission } = useContext(GameContext);
  const [propCsvData, setPropCsvCsvData] = useState(null);
  const [currentProps, setCurrentProps] = useState();

  // 讀取 missionCsvFile 資料，將資料寫進 missionCsvData
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await loadCSVData(propCsvFile);
        setPropCsvCsvData(data);
      } catch (error) {
        console.error('Error loading CSV data:', error);
      }
    };

    fetchData();
  }, [setPropCsvCsvData]);

  useEffect(() => {
    if (!currentMission) {
      console.log('還沒有 currentMission！');
      return;
    }
    if (!Array.isArray(propCsvData)) {
      console.log('propCsvData 不是有效的數組！');
      return;
    }
    const props = propCsvData.filter(
      (row) => row.mission_id === currentMission.id
    );
    setCurrentProps(props);
  }, [currentMission, propCsvData]);

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
                overflow:'hidden'
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

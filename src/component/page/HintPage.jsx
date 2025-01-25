import { useContext, useEffect, useState } from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  Typography,
} from '@mui/material';
import { GameContext } from '../../store/game-context';
import ThemeColorLayer from '../layer/ThemeColorLayer';
import { loadCSVData } from '../../game/csvLoader';
import hintCsvFile from '../../../public/gameFile/sjqy/sjqy - hint.csv';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LockRoundedIcon from '@mui/icons-material/LockRounded';
import avatar from '../../../public/gameFile/sjqy/img/qianru_avatar.png';

const HintPage = () => {
  const { currentMission, unlockedHints, unlockHint } = useContext(GameContext);
  const [hintCsvData, setHintCsvData] = useState(null);
  const [currentHints, setCurrentHints] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false); // Dialog 的開關
  const [currentHintIndex, setCurrentHintIndex] = useState(null); // 當前選擇的提示索引

  // 讀取 missionCsvFile 資料，將資料寫進 missionCsvData
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await loadCSVData(hintCsvFile);
        setHintCsvData(data);
      } catch (error) {
        console.error('Error loading CSV data:', error);
      }
    };

    fetchData();
  },[]);

  useEffect(() => {
    if (!currentMission) {
      // console.log('還沒有 currentMission！');
      return;
    }
    if (!Array.isArray(hintCsvData)) {
      // console.log('hintCsvData 不是有效的數組！');
      return;
    }
    const props = hintCsvData.filter(
      (row) => row.mission_id === currentMission.id
    );
    setCurrentHints(props);
  }, [currentMission, hintCsvData]);

  const handleUnlockClick = (index) => {
    setCurrentHintIndex(index);
    setDialogOpen(true);
  };

  const handleConfirmUnlock = () => {
    if (currentHintIndex !== null) {
      unlockHint(currentMission.id, currentHintIndex);
    }
    setDialogOpen(false);
    setCurrentHintIndex(null);
  };

  const handleCancel = () => {
    setDialogOpen(false);
    setCurrentHintIndex(null);
  };

  return (
    <ThemeColorLayer bgc="#fff">
      <Box
        sx={{
          width: '100%',
          height: '85vh',
          p: '7%',
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
          提示
        </Typography>
        <Stack
          spacing={2}
          sx={{
            overflowY: 'auto',
            maxHeight: '100%',
            flex: '1',
            p: '5%',
            m: '-5%',
          }}
        >
          {Array.isArray(currentHints) && currentHints.length > 0 ? (
            currentHints.map((hint, index) => (
              <Accordion
                key={index}
                disabled={!unlockedHints[currentMission?.id]?.[index]}
                elevation={6}
                sx={{
                  borderRadius: '4px',
                  '&:before': {
                    display: 'none', // 移除內建分隔線
                  },
                }}
              >
                {!unlockedHints[currentMission?.id]?.[index] && (
                  <Box sx={{ width: '100%' }}>
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      onClick={() => handleUnlockClick(index)}
                      startIcon={<LockRoundedIcon />}
                      sx={{ backgroundColor: '#37474F' }}
                    >
                      解鎖提示 {index + 1}
                    </Button>
                  </Box>
                )}
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography>提示 {index + 1}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {hint?.speaker ? (
                    <Box sx={{ display: 'flex', alignItems: 'top' }}>
                      <Avatar
                        alt={hint.speaker}
                        src={`${avatar}`}
                        sx={{ mr: '8px' }}
                      />
                      <Stack spacing={1}>
                        <Typography
                          variant="body1"
                          align="left"
                          sx={{
                            height: '40px',
                            lineHeight: '40px',
                            fontWeight: 'bold',
                          }}
                        >
                          {hint.speaker}
                        </Typography>
                        <Typography align="left">{hint.text}</Typography>
                        {hint.img && (
                          <img
                            src={`/gameFile/sjqy/img/${hint.img}`}
                            alt={`Image ${index + 1}`}
                            style={{
                              width: '100%',
                              height: 'auto',
                            }}
                          />
                        )}
                      </Stack>
                    </Box>
                  ) : (
                    <Box sx={{ display: 'flex', alignItems: 'top' }}>
                      <Stack spacing={1}>
                        <Typography align="left">{hint.text}</Typography>
                        {hint.img && (
                          <img
                            src={`/gameFile/sjqy/img/${hint.img}`}
                            alt={`Image ${index + 1}`}
                            style={{
                              width: '100%',
                              height: 'auto',
                            }}
                          />
                        )}
                      </Stack>
                    </Box>
                  )}
                </AccordionDetails>
              </Accordion>
            ))
          ) : (
            <p>No hints available</p>
          )}
        </Stack>
      </Box>
      {/* 解鎖確認 Dialog */}
      <Dialog open={dialogOpen} onClose={handleCancel}>
        <DialogTitle>確認解鎖</DialogTitle>
        <DialogContent>
          <DialogContentText>
            確定要解鎖提示 {currentHintIndex + 1} 嗎？
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="secondary">
            取消
          </Button>
          <Button onClick={handleConfirmUnlock} color="primary">
            確定
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeColorLayer>
  );
};

export default HintPage;

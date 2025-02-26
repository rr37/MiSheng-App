import { useContext, useEffect, useState } from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Avatar,
  Box,
  Button,
  Stack,
  Typography,
} from '@mui/material';
import { GameContext } from '../../store/game-context';
import ThemeColorLayer from '../layer/ThemeColorLayer';
import PageContainer from '../common/PageContainer';
import PageTitleText from '../common/PageTitleText';
import ContentList from '../common/ContentList';
import MissionConfirmDialog from '../common/MissionConfirmDialog';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LockRoundedIcon from '@mui/icons-material/LockRounded';

const HintPage = () => {
  const {
    characterData,
    hintData,
    missionData,
    currentMissionId,
    unlockedHints,
    unlockHint,
  } = useContext(GameContext);
  const [currentHints, setCurrentHints] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false); // Dialog 的開關
  const [currentHintIndex, setCurrentHintIndex] = useState(null); // 當前選擇的提示索引
  const [expandedHints, setExpandedHints] = useState([]);

  const currentMission = missionData[currentMissionId];

  useEffect(() => {
    if (!currentMission) {
      // console.log('還沒有 currentMission！');
      return;
    }
    if (!Array.isArray(hintData)) {
      // console.log('hintData 不是有效的數組！');
      return;
    }
    const filteredHints = hintData.filter(
      (row) => row.mission_id === currentMission.id
    );
    const updatedFilteredHints = filteredHints.map((hint) => {
      const speaker = characterData.find((char) => char.name === hint.speaker);
      return { ...hint, avatar: speaker?.avatar || '' };
    });

    setCurrentHints(updatedFilteredHints);
  }, [currentMissionId, hintData, currentMission]);

  const handleExpand = (index) => {
    setExpandedHints((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const handleUnlockClick = (index) => {
    setCurrentHintIndex(index);
    setDialogOpen(true);
  };

  const handleConfirmUnlock = () => {
    if (currentHintIndex !== null) {
      unlockHint(currentMission.id, currentHintIndex);
      setTimeout(() => {
        handleExpand(currentHintIndex);
      }, 100); // 略微延遲確保狀態更新,確保在解鎖後才展開
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
      <PageContainer>
        <PageTitleText title="提示" />
        {Array.isArray(currentHints) && currentHints.length > 0 ? (
          <ContentList
            items={currentHints}
            renderItem={(hint, index) => (
              <Accordion
                key={index}
                disabled={!unlockedHints[currentMission?.id]?.[index]}
                elevation={6}
                expanded={expandedHints.includes(index)}
                onChange={() => handleExpand(index)}
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
                        src={`/gameFile/sjqy/img/${hint.avatar}`}
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
            )}
          />
        ) : (
          <p>No hints available</p>
        )}
      </PageContainer>
      {/* 解鎖確認 Dialog */}
      <MissionConfirmDialog
        open={dialogOpen}
        onClose={handleCancel}
        onConfirm={handleConfirmUnlock}
        title={'確認解鎖'}
        confirmText={`確定要解鎖提示 ${currentHintIndex + 1} 嗎？`}
      />
    </ThemeColorLayer>
  );
};

export default HintPage;

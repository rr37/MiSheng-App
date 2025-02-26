import { useContext, useEffect, useState } from 'react';
import { Box, Button, Paper, Typography } from '@mui/material';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import PendingRoundedIcon from '@mui/icons-material/PendingRounded';
import BlockRoundedIcon from '@mui/icons-material/BlockRounded';
import PersonPinCircleRoundedIcon from '@mui/icons-material/PersonPinCircleRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import { GameContext } from '../../store/game-context';
import ThemeColorLayer from '../layer/ThemeColorLayer';
import PageContainer from '../common/PageContainer';
import PageTitleText from '../common/PageTitleText';
import ContentList from '../common/ContentList';
import Layer from '../layer/Layer';
import BackgroundLayer from '../layer/BackgroundLayer';
import ConfirmDialog from '../common/ConfirmDialog';

const MissionPage = () => {
  const {
    missionData,
    playerMissionData,
    rundownData,
    currentMissionId,
    setCurrentId,
    setCurrentMissionId,
    updateMissionStatus,
  } = useContext(GameContext);
  const [displayMissions, setDisplayMissions] = useState();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedMissionIndex, setSelectedMissionIndex] = useState(null);
  const [selectedMissionTitle, setSelectedMissionTitle] = useState(null);
  const [pressTimer, setPressTimer] = useState(null);

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
  }, [currentMission, currentMissionId, missionData, playerMissionData]);

  const handleSwitchMissionClick = (index, title) => {
    setSelectedMissionIndex(index);
    setSelectedMissionTitle(title);
    setDialogOpen(true);
  };

  const handleConfirmSelect = () => {
    const targetMissionId = String(selectedMissionIndex + 1);
    const missionStartRow = rundownData.find(
      (row) => row.model === 'MissionStart' && row.missionId === targetMissionId
    );

    if (missionStartRow) {
      const { id, missionId } = missionStartRow;
      setCurrentId(id);
      setCurrentMissionId(missionId);
      updateMissionStatus(missionId, 'solving');
    }

    setDialogOpen(false);
  };

  const handleCancel = () => {
    setDialogOpen(false);
  };

  const handleLongPressStart = (e, index, title) => {
    // 設定計時器，5 秒後開啟對話框
    const timer = setTimeout(() => {
      handleSwitchMissionClick(index, title);
    }, 5000);

    setPressTimer(timer);
  };

  const handleLongPressEnd = () => {
    // 取消計時器
    if (pressTimer) {
      clearTimeout(pressTimer);
      setPressTimer(null);
    }
  };

  return (
    <ThemeColorLayer bgc="#fff">
      <PageContainer>
        <PageTitleText title="關卡" />
        {Array.isArray(displayMissions) && displayMissions.length > 0 ? (
          <ContentList
            items={displayMissions}
            renderItem={(mission, index) => (
              <Paper
                key={index}
                onMouseDown={(e) =>
                  handleLongPressStart(
                    e,
                    index,
                    mission.subtitle || mission.title
                  )
                }
                onMouseUp={handleLongPressEnd}
                onMouseLeave={handleLongPressEnd}
                elevation={!mission.status ? 0 : 8}
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
                      color: '#fff',
                      opacity: mission.id !== currentMissionId && '0.5',
                    }}
                  >
                    {mission.id === currentMissionId ? (
                      <PersonPinCircleRoundedIcon />
                    ) : (
                      {
                        solving: <PendingRoundedIcon />,
                        complete: <CheckCircleOutlineRoundedIcon />,
                      }[mission.status] || <BlockRoundedIcon />
                    )}

                    <Typography
                      align="left"
                      sx={{
                        fontFamily: "'Noto Serif TC', serif",
                        fontWeight: 600,
                        fontSize: '24px',
                        color: '#fff',
                        marginLeft: '6px',
                        // textShadow: '0px 3px 4.2px rgba(0, 0, 0, 0.5)',
                      }}
                    >
                      {mission.subtitle ? mission.subtitle : mission.title}
                    </Typography>
                  </Box>
                </Layer>

                {/* Switch mission button */}
                <Layer>
                  <Button
                    disabled={!mission.status && true}
                    onClick={() =>
                      handleSwitchMissionClick(
                        index,
                        mission.subtitle ? mission.subtitle : mission.title
                      )
                    }
                    sx={{
                      width: '100%',
                      height: '100%',
                      color: '#fff',
                      display: 'flex',
                      justifyContent: 'end',
                      pr: '20px',
                      opacity: mission.id !== currentMissionId && '0.5',
                    }}
                  >
                    <ArrowForwardRoundedIcon
                      sx={{
                        filter: 'drop-shadow(2px 2px 5px rgba(0, 0, 0, 0.3))',
                      }}
                    />
                  </Button>
                </Layer>
              </Paper>
            )}
          />
        ) : (
          <p>No missions available</p>
        )}
      </PageContainer>

      {/* 跳關確認 Dialog */}
      <ConfirmDialog
        open={dialogOpen}
        onClose={handleCancel}
        onConfirm={handleConfirmSelect}
        title={`確定要移動到${selectedMissionTitle}嗎？`}
        confirmText={`移動不會影響答題狀態喔～`}
      />
    </ThemeColorLayer>
  );
};

export default MissionPage;

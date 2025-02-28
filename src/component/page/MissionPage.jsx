import { useContext, useEffect, useState } from 'react';
import { GameContext } from '../../store/game-context';
import ThemeColorLayer from '../layer/ThemeColorLayer';
import PageContainer from '../common/PageContainer';
import PageTitleText from '../common/PageTitleText';
import MissionList from '../common/MissionList';
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
  const [displayMissions, setDisplayMissions] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedMissionId, setSelectedMissionId] = useState(null);
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

  const handleMissionSelect = (missionId, title) => {
    setSelectedMissionId(missionId);
    setSelectedMissionTitle(title);
    setDialogOpen(true);
  };

  const handleConfirmSelect = () => {
    const missionStartRow = rundownData.find(
      (row) =>
        row.model === 'MissionStart' &&
        row.missionId === String(selectedMissionId)
    );

    if (missionStartRow) {
      setCurrentId(missionStartRow.id);
      setCurrentMissionId(missionStartRow.missionId);
      updateMissionStatus(missionStartRow.missionId, 'solving');
    }

    setDialogOpen(false);
  };

  const handleLongPressStart = (e, missionId, title) => {
    e.preventDefault(); // 防止 touch 產生點擊事件
    const timer = setTimeout(() => handleMissionSelect(missionId, title), 5000);
    setPressTimer(timer);
  };

  const handleLongPressEnd = () => {
    if (pressTimer) {
      clearTimeout(pressTimer);
      setPressTimer(null);
    }
  };

  return (
    <ThemeColorLayer bgc="#fff">
      <PageContainer>
        <PageTitleText title="關卡" />
        <MissionList
          missions={displayMissions}
          currentMissionId={currentMissionId}
          onLongPressStart={handleLongPressStart}
          onLongPressEnd={handleLongPressEnd}
          onMissionSelect={handleMissionSelect}
          onTouchStart={handleLongPressStart}
          onTouchEnd={handleLongPressEnd}
          onTouchCancel={handleLongPressEnd}
        />
      </PageContainer>

      {/* 跳關確認 Dialog */}
      <ConfirmDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onConfirm={handleConfirmSelect}
        title={`確定要移動到${selectedMissionTitle}嗎？`}
        confirmText={`移動不會影響答題狀態喔～`}
      />
    </ThemeColorLayer>
  );
};

export default MissionPage;

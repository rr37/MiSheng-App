import { useContext, useEffect, useState } from 'react';
import { GameContext } from '../../store/game-context';
import ThemeColorLayer from '../layer/ThemeColorLayer';
import PageContainer from '../common/PageContainer';
import PageTitleText from '../common/PageTitleText';
import ContentList from '../common/ContentList';
import HintAccordion from '../common/HintAccordion';
import MissionConfirmDialog from '../common/MissionConfirmDialog';

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
              <HintAccordion
                key={index}
                index={index}
                hint={hint}
                isUnlocked={!!unlockedHints[currentMission?.id]?.[index]}
                isExpanded={expandedHints.includes(index)}
                onExpand={handleExpand}
                onUnlock={handleUnlockClick}
              />
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

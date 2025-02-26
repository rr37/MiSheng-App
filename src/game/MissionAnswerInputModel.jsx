import { useContext, useState, useEffect } from 'react';
import { GameContext } from '../store/game-context';
import { Typography } from '@mui/material';
import ThemeColorLayer from '../component/layer/ThemeColorLayer';
import Layer from '../component/layer/Layer';
import BackgroundLayer from '../component/layer/BackgroundLayer';
import MissionSubtitleText from '../component/common/MissionSubtitleText';
import MissionTitleText from '../component/common/MissionTitleText';
import BottomBox from '../component/common/BottomBox';
import NextButton from '../component/common/NextButton';
import AnswerInputForm from '../component/common/AnswerInputForm';
import MissionConfirmDialog from '../component/common/MissionConfirmDialog';
import MissionFeedbackDialog from '../component/common/MissionFeedbackDialog';
import PropTypes from 'prop-types';
import useNextId from '../hook/useNextId';

const MissionAnswerInputModel = ({ data, setCurrentId, currentDialogue }) => {
  const {
    currentMissionId,
    missionData,
    playerMissionData,
    updateMissionStatus,
  } = useContext(GameContext);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [confirmGiveUpText, setConfirmGiveUpText] = useState('確定要放棄嗎？');
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false); // 用於控制按鈕顯示
  const [isGiveUp, setIsGiveUp] = useState(false);
  const [openDialog, setOpenDialog] = useState(false); // 控制彈出視窗
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false); // 控制確定放棄視窗
  const [giveupCountdown, setGiveupCountdown] = useState(5);
  const currentMission = missionData[currentMissionId];

  useEffect(() => {
    if (playerMissionData[currentMissionId].status === 'complete') {
      setIsAnswerCorrect(true);
    }
  }, []);

  const handleAnswerSubmit = () => {
    if (userAnswer.trim() === currentMission.answer) {
      updateMissionStatus(currentMission.id, 'complete');
      setFeedback(currentMission.success_text);
      setIsAnswerCorrect(true);
      setOpenDialog(true); // 打開彈出視窗
    } else if (userAnswer.trim() === '我放棄了') {
      currentMission.confirmGiveUp_text &&
        setConfirmGiveUpText(currentMission.confirmGiveUp_text);
      setOpenConfirmDialog(true); // 顯示確認放棄的對話框
    } else {
      setFeedback('答案錯誤，請再試一次。');
      setIsAnswerCorrect(false);
      if (giveupCountdown > 0) {
        setGiveupCountdown(giveupCountdown - 1);
      }
      setOpenDialog(true); // 打開彈出視窗
    }
    setUserAnswer(''); // 清空輸入框內容
  };

  const confirmGiveUp = () => {
    updateMissionStatus(currentMission.id, 'complete');
    setFeedback(currentMission.giveUp_text);
    setIsGiveUp(true);
    setIsAnswerCorrect(true);
    setUserAnswer('');
    setOpenDialog(true);
    setOpenConfirmDialog(false);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setOpenConfirmDialog(false);
  };

  const { getNextId, canProceedToNext } = useNextId(data, currentDialogue);

  const handleNext = () => {
    const nextId = getNextId();
    if (nextId) {
      setCurrentId(nextId); // 如果有下一個 ID，設置為它
    }
  };

  if (!currentMission) {
    return <Typography>未選擇任務。</Typography>;
  }

  return (
    <ThemeColorLayer>
      {/* AnswerInput model */}

      {/* Background-image */}
      {currentMission?.background_img && (
        <Layer>
          <BackgroundLayer
            src={`/gameFile/sjqy/img/${currentMission.background_img}`}
            opacity="0.9"
          />
        </Layer>
      )}

      {/* AnswerInput */}
      <Layer>
        <BottomBox>
          <MissionSubtitleText subtitle={currentMission.subtitle} />
          <MissionTitleText title={currentMission.title} />

          {isAnswerCorrect && canProceedToNext ? (
            <NextButton onClick={handleNext}>Next</NextButton>
          ) : (
            <AnswerInputForm
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              onClick={handleAnswerSubmit}
              disabled={isAnswerCorrect}
              giveupCountdown={giveupCountdown}
            />
          )}

          {/* feedback 彈出視窗 */}
          <MissionFeedbackDialog
            open={openDialog}
            onClose={handleCloseDialog}
            isAnswerCorrect={isAnswerCorrect}
            isGiveUp={isGiveUp}
            feedback={feedback}
          />

          {/* confirmGiveUp 彈出視窗 */}
          <MissionConfirmDialog
            open={openConfirmDialog}
            onClose={handleCloseDialog}
            onConfirm={confirmGiveUp}
            confirmText={confirmGiveUpText}
          />
        </BottomBox>
      </Layer>
    </ThemeColorLayer>
  );
};

// 定義 propTypes
MissionAnswerInputModel.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      speaker: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      nextId: PropTypes.string,
      img: PropTypes.string,
      missionId: PropTypes.string,
    })
  ).isRequired,
  setCurrentId: PropTypes.func.isRequired,
  currentDialogue: PropTypes.object.isRequired,
};

export default MissionAnswerInputModel;

import { useContext, useState, useEffect } from 'react';
import { GameContext } from '../store/game-context';
import { Typography } from '@mui/material';
import ThemeColorLayer from '../component/layer/ThemeColorLayer';
import Layer from '../component/layer/layer';
import BackgroundLayer from '../component/layer/BackgroundLayer';
import MissionSubtitleText from '../component/common/MissionSubtitleText';
import MissionTitleText from '../component/common/MissionTitleText';
import BottomBox from '../component/common/BottomBox';
import NextButton from '../component/common/NextButton';
import AnswerInputForm from '../component/common/AnswerInputForm';
import MissionDialog from '../component/common/MissionDialog';
import PropTypes from 'prop-types';
import useNextId from '../hook/useNextId';

const MissionAnswerInputModel = ({ data, setCurrentId, currentDialogue }) => {
  const { currentMissionId, missionData, updateMissionStatus } =
    useContext(GameContext);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false); // 用於控制按鈕顯示
  const [openDialog, setOpenDialog] = useState(false); // 控制彈出視窗
  const currentMission = missionData[currentMissionId];

  useEffect(() => {
    if (currentMission.status === 'complete') {
      setIsAnswerCorrect(true);
    }
  }, []);

  const handleAnswerSubmit = () => {
    if (userAnswer.trim() === currentMission.answer) {
      updateMissionStatus(currentMission.id, 'complete');
      setFeedback(currentMission.success_text);
      setIsAnswerCorrect(true);
      setUserAnswer(''); // 清空輸入框內容
    } else {
      setFeedback('答案錯誤，請再試一次。');
      setIsAnswerCorrect(false);
      setUserAnswer(''); // 清空輸入框內容
    }
    setOpenDialog(true); // 打開彈出視窗
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
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
            />
          )}

          {/* 彈出視窗 */}
          <MissionDialog
            open={openDialog}
            onClose={handleCloseDialog}
            isAnswerCorrect={isAnswerCorrect}
            feedback={feedback}
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

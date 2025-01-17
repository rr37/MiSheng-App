import { useContext, useState } from 'react';
import { GameContext } from '../store/game-context';
import {
  Button,
  TextField,
  Typography,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import PropTypes from 'prop-types';
import useNextId from '../hook/useNextId';

const MissionAnswerInput = ({
  data,
  currentId,
  setCurrentId,
  currentDialogue,
}) => {
  const { currentMission } = useContext(GameContext);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false); // 用於控制按鈕顯示
  const [openDialog, setOpenDialog] = useState(false); // 控制彈出視窗

  const handleAnswerSubmit = () => {
    if (userAnswer.trim() === currentMission.answer) {
      setFeedback('正確答案！');
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
    <Box display="flex" flexDirection="column" alignItems="center" p={2}>
      <Typography variant="h5">{currentMission.title}</Typography>
      <Typography variant="subtitle1">{currentMission.subtitle}</Typography>
      <Typography variant="body1">{currentMission.description}</Typography>
      <img
        src={currentMission.background_img}
        alt="mission background"
        style={{ maxWidth: '100%', height: 'auto', margin: '16px 0' }}
      />
      <TextField
        label="輸入答案"
        value={userAnswer}
        onChange={(e) => setUserAnswer(e.target.value)}
        fullWidth
        margin="normal"
        disabled={isAnswerCorrect}
      />
      <Button
        variant="contained"
        color={isAnswerCorrect ? 'secondary' : 'primary'}
        onClick={isAnswerCorrect ? handleNext : handleAnswerSubmit}
      >
        {isAnswerCorrect ? '下一步' : '提交答案'}
      </Button>

      {/* 彈出視窗 */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{isAnswerCorrect ? '恭喜！' : '提示'}</DialogTitle>
        <DialogContent>
          <Typography>{feedback}</Typography>
        </DialogContent>
        <DialogActions>
          {isAnswerCorrect && canProceedToNext && (
            <Button variant="contained" color="primary" onClick={handleNext}>
              下一步
            </Button>
          )}
          <Button onClick={handleCloseDialog} color="secondary">
            關閉
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

// 定義 propTypes
MissionAnswerInput.propTypes = {
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
  currentId: PropTypes.string.isRequired,
  setCurrentId: PropTypes.func.isRequired,
  currentDialogue: PropTypes.object.isRequired,
};

export default MissionAnswerInput;

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Typography,
} from '@mui/material';
import PropTypes from 'prop-types';

const MissionFeedbackDialog = ({
  open,
  onClose,
  isAnswerCorrect,
  isGiveUp,
  feedback,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      {isGiveUp ? (
        <DialogTitle>再接再厲！</DialogTitle>
      ) : (
        <DialogTitle>{isAnswerCorrect ? '恭喜！' : '提示'}</DialogTitle>
      )}
      <DialogContent>
        <Typography>{feedback}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          關閉
        </Button>
      </DialogActions>
    </Dialog>
  );
};

MissionFeedbackDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  isAnswerCorrect: PropTypes.bool.isRequired,
  isGiveUp: PropTypes.bool,
  feedback: PropTypes.string.isRequired,
};

export default MissionFeedbackDialog;

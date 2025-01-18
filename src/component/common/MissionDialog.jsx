import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Typography,
} from '@mui/material';
import PropTypes from 'prop-types';

const MissionDialog = ({ open, onClose, isAnswerCorrect, feedback }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{isAnswerCorrect ? '恭喜！' : '提示'}</DialogTitle>
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

MissionDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  isAnswerCorrect: PropTypes.bool.isRequired,
  feedback: PropTypes.string.isRequired,
};

export default MissionDialog;

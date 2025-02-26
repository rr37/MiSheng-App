import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Typography,
} from '@mui/material';
import PropTypes from 'prop-types';

const MissionConfirmDialog = ({
  open,
  onClose,
  onConfirm,
  title,
  confirmText,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title || '提示'}</DialogTitle>
      <DialogContent>
        <Typography>{confirmText}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onConfirm} color="error">
          確定
        </Button>
        <Button onClick={onClose} color="primary">
          關閉
        </Button>
      </DialogActions>
    </Dialog>
  );
};

MissionConfirmDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func,
  title:PropTypes.string,
  confirmText: PropTypes.string.isRequired,
};

export default MissionConfirmDialog;

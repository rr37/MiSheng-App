import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Typography,
} from '@mui/material';
import PropTypes from 'prop-types';

const MissionConfirmDialog = ({ open, onClose, onConfirm, conFirmText }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>提示</DialogTitle>
      <DialogContent>
        <Typography>{conFirmText}</Typography>
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
  conFirmText: PropTypes.string.isRequired,
};

export default MissionConfirmDialog;

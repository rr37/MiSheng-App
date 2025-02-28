import { Button } from '@mui/material';
import PropTypes from 'prop-types';

const NextButton = ({ onClick, disabled, children }) => {
  return (
    <Button
      variant="contained"
      size="small"
      color="inherit"
      fullWidth
      sx={{ borderRadius: '30px' }}
      onClick={onClick}
      disabled={disabled || false}
    >
      {children}
    </Button>
  );
};

NextButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

export default NextButton;

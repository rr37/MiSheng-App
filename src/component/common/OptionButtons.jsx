import { Button } from '@mui/material';
import PropTypes from 'prop-types';

const OptionButtons = ({ options, onOptionClick }) => (
  <>
    {options.map((option) => (
      <Button
        key={option.id}
        variant="contained"
        size="small"
        color="inherit"
        sx={{ width: '100%', borderRadius: '30px' }}
        onClick={() => onOptionClick(option.nextId)}
      >
        {option.title}
      </Button>
    ))}
  </>
);

OptionButtons.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      nextId: PropTypes.string.isRequired,
    })
  ).isRequired,
  onOptionClick: PropTypes.func.isRequired,
};

export default OptionButtons;
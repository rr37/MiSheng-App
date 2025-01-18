import NextButton from './NextButton';
import PropTypes from 'prop-types';

const OptionButtons = ({ options, onOptionClick }) => (
  <>
    {options.map((option) => (
      <NextButton key={option.id} onClick={() => onOptionClick(option.nextId)}>
        {option.title}
      </NextButton>
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

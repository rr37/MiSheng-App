import NextButton from './NextButton';
import PropTypes from 'prop-types';

const OptionButtons = ({ options, onOptionClick }) => (
  <>
    {options.map((option) => {
      return (
        <NextButton
          key={option.id}
          href={option.url}
          onClick={!option.url ? () => onOptionClick(option.nextId) : undefined}
        >
          {option.title}
        </NextButton>
      );
    })}
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

import { Box, Stack } from '@mui/material';
import SpeakerText from '../common/SpeakerText';
import QuestionText from '../common/QuestionText';
import OptionButtons from '../common/OptionButtons';
import PropTypes from 'prop-types';

const QuestionBox = ({ speaker, text, options, onOptionClick }) => {
  return (
    <Box
      sx={{
        width: '100%',
        padding: '7%',
        boxSizing: 'border-box',
        position: 'absolute',
        bottom: 0,
      }}
    >
      <Stack spacing={2}>
        <SpeakerText speaker={speaker} />
        <QuestionText text={text} />
        <OptionButtons options={options} onOptionClick={onOptionClick} />
      </Stack>
    </Box>
  );
};

QuestionBox.propTypes = {
  speaker: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      nextId: PropTypes.string.isRequired,
    })
  ).isRequired,
  onOptionClick: PropTypes.func.isRequired,
};

export default QuestionBox;

import { Box, Stack, Button } from '@mui/material';
import SpeakerText from '../common/SpeakerText';
import TalkText from '../common/TalkText';
import PropTypes from 'prop-types';

const TalkBox = ({ title, text, onNext, canProceed }) => {
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
        <SpeakerText speaker={title} />
        <TalkText text={text} />
        <Button
          variant="contained"
          size="small"
          color="inherit"
          fullWidth
          sx={{ borderRadius: '30px' }}
          onClick={onNext}
          disabled={!canProceed()}
        >
          Next
        </Button>
      </Stack>
    </Box>
  );
};

TalkBox.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  onNext: PropTypes.func.isRequired,
  canProceed: PropTypes.func.isRequired,
};

export default TalkBox;

import { Stack } from '@mui/material';
import BottomBox from '../common/BottomBox';
import SpeakerText from '../common/SpeakerText';
import TalkText from '../common/TalkText';
import NextButton from '../common/NextButton';
import PropTypes from 'prop-types';

const TalkBox = ({ title, text, onNext, canProceed }) => {
  return (
    <BottomBox>
      <Stack spacing={2}>
        <SpeakerText speaker={title} />
        <TalkText text={text} />
        {canProceed && <NextButton onClick={onNext}>Next</NextButton>}
      </Stack>
    </BottomBox>
  );
};

TalkBox.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  onNext: PropTypes.func.isRequired,
  canProceed: PropTypes.func.isRequired,
};

export default TalkBox;

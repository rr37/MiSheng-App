import { Stack } from '@mui/material';
import BottomBox from '../common/BottomBox';
import SpeakerText from '../common/SpeakerText';
import TalkText from '../common/TalkText';
import NextButton from '../common/NextButton';
import PropTypes from 'prop-types';

const TalkBox = ({ title, text, textContainerRef, onNext, canProceed }) => {
  return (
    <BottomBox>
      <Stack spacing={2}>
        <SpeakerText speaker={title} />
        <TalkText text={text} ref={textContainerRef} />
        {canProceed && <NextButton onClick={onNext}>Next</NextButton>}
      </Stack>
    </BottomBox>
  );
};

TalkBox.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  textContainerRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  onNext: PropTypes.func.isRequired,
  canProceed: PropTypes.bool.isRequired,
};

export default TalkBox;

import { Typography } from '@mui/material';
import PropTypes from 'prop-types';

const TalkText = ({ text, height = '120px', textShadow }) => (
  <Typography
    variant="body2"
    align="left"
    gutterBottom
    sx={{
      whiteSpace: 'pre-wrap',
      color: '#fff',
      height: height,
      overflowY: 'auto',
      textShadow: textShadow,
    }}
  >
    {text}
  </Typography>
);

TalkText.propTypes = {
  text: PropTypes.string.isRequired,
  height:PropTypes.string,
  textShadow: PropTypes.string,
};

export default TalkText;

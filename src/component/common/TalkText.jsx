import { Typography } from '@mui/material';
import PropTypes from 'prop-types';

const TalkText = ({ text }) => (
  <Typography
    variant="body2"
    align="left"
    gutterBottom
    sx={{
      whiteSpace: 'pre-wrap',
      color: '#fff',
    }}
  >
    {text}
  </Typography>
);

TalkText.propTypes = {
  text: PropTypes.string.isRequired,
};

export default TalkText;

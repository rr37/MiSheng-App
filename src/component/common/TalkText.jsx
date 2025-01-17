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
      height: '120px',
      overflow:'scroll'
    }}
  >
    {text}
  </Typography>
);

TalkText.propTypes = {
  text: PropTypes.string.isRequired,
};

export default TalkText;

import { Typography } from '@mui/material';
import PropTypes from 'prop-types';

const PageTitleText = ({ title }) => (
  <Typography
    gutterBottom
    align="left"
    sx={{
      fontFamily: "'Noto Serif TC', serif",
      fontWeight: 900,
      fontSize: '48px',
      color: '#37474F',
    }}
  >
    {title}
  </Typography>
);

PageTitleText.propTypes = {
  title: PropTypes.string.isRequired,
};

export default PageTitleText;

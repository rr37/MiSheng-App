import { Box } from '@mui/material';
import PropTypes from 'prop-types'; // 引入 PropTypes

function ThemeColorLayer({ children, bgc = '#37474F' }) {
  return (
    <Box
      sx={{
        height: '100%',
        width: '100%',
        backgroundColor: bgc,
        overflow: 'hidden',
        boxSizing: 'border-box',
        position: 'relative',
      }}
    >
      {children}
    </Box>
  );
}

ThemeColorLayer.propTypes = {
  children: PropTypes.node.isRequired,
  bgc: PropTypes.string,
};

export default ThemeColorLayer;

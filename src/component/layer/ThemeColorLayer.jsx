import { Box } from '@mui/material';
import PropTypes from 'prop-types'; // 引入 PropTypes

function ThemeColorLayer(props) {
  return (
    <Box
      sx={{
        // border: '1px solid #000',
        borderRadius: '20px',
        height: 'calc(100% - 30px)',
        width: '100%',
        backgroundColor: '#37474F',
        marginLeft: '20px',
        marginRight: '20px',
        marginBottom: '20px',
        overflow: 'hidden',
        boxSizing: 'border-box',
        position: 'relative',
      }}
    >
      {props.children}
    </Box>
  );
}

ThemeColorLayer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ThemeColorLayer;

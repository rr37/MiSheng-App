import { Box } from '@mui/material';
import PropTypes from 'prop-types'; // 引入 PropTypes

function Layer(props) {
  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        // border: '1px solid #000',
        boxSizing: 'border-box',
        position: 'absolute',
        top: 0,
        left: 0,
        borderRadius: '20px',
      }}
    >
      {props.children}
    </Box>
  );
}

Layer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layer;

import { Box, Paper } from '@mui/material';
import PropTypes from 'prop-types'; // 引入 PropTypes

function FloatingLayer(props) {
  return (
    <Paper
      elevation={12}
      sx={{
        borderRadius: '20px',
        height: 'calc(60% + 100px)',
        width: '100%',
        marginLeft: '40px',
        marginRight: '40px',
        marginBottom: '20px',
        overflow: 'hidden',
        boxSizing: 'border-box',
        position: 'relative',
      }}
    >
      <Box sx={{}}>{props.children}</Box>
    </Paper>
  );
}

FloatingLayer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default FloatingLayer;

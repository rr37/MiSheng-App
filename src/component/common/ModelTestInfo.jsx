import { Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';

const ModelTestInfo =({model})=> (
    <Box
      sx={{
        position: 'fixed',
        zIndex: '99',
        top: '0',
        right: '0',
        color: '#777',
        padding: '20px',
      }}
    >
      <Typography variant="body1" gutterBottom>
        Current Model: {model}
      </Typography>
    </Box>
  );

export default ModelTestInfo;

ModelTestInfo.propTypes = {
  model: PropTypes.string,
};
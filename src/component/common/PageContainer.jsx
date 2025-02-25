import { Box } from '@mui/material';
import PropTypes from 'prop-types';

const PageContainer = ({ children }) => {
  return (
    <Box
      sx={{
        width: '100%',
        height: '85vh',
        minHeight: '65vh',
        padding: '7%',
        boxSizing: 'border-box',
        position: 'absolute',
        top: 0,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {children}
    </Box>
  );
};

PageContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PageContainer;

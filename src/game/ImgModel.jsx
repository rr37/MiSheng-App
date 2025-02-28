import { useState } from 'react';
import { Box } from '@mui/material';
import PropTypes from 'prop-types';
import ZoomableImage from '../component/common/ZoomableImage';
import NextButton from '../component/common/NextButton';

const Img = ({ currentRow, onNext, canProceed }) => {
  const [fullScreenIndex, setFullScreenIndex] = useState(null);

  return (
    <Box
      sx={{
        borderRadius: '20px',
        height: 'calc(100% - 30px)',
        width: 'calc(100% - 80px)',
        m: 'auto',
        boxSizing: 'border-box',
        position: 'relative',
        // border: '1px solid red',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
      }}
    >
      {currentRow?.background_img && (
        <ZoomableImage
          src={`/gameFile/sjqy/img/${currentRow.background_img}`}
          alt={`${currentRow.background_img}`}
          borderRadius={'20px'}
          zoomInFab={'center'}
          isFullScreen={fullScreenIndex !== null}
          showZoomButton={fullScreenIndex === null}
          onToggle={() =>
            setFullScreenIndex(fullScreenIndex === null ? 0 : null)
          }
        />
      )}

      <NextButton onClick={onNext} disabled={!canProceed}>
        Next
      </NextButton>
    </Box>
  );
};

// 定義 propTypes
Img.propTypes = {
  currentRow: PropTypes.object.isRequired,
  onNext: PropTypes.func.isRequired,
  canProceed: PropTypes.bool.isRequired,
};

export default Img;

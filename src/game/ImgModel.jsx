import { useState, useContext } from 'react';
import { GameContext } from '../store/game-context';
import { Box } from '@mui/material';
import PropTypes from 'prop-types';
import ZoomableImage from '../component/common/ZoomableImage';
import NextButton from '../component/common/NextButton';

const Img = ({ currentRow, onNext, canProceed }) => {
  const [fullScreenIndex, setFullScreenIndex] = useState(null);
  const { imgPath } = useContext(GameContext);

  return (
    <Box
      sx={{
        borderRadius: '20px',
        height: 'calc(60dvh + 100px)',
        width: '76%',
        m: 'auto',
        boxSizing: 'border-box',
        position: 'relative',
        // border: '1px solid red',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      {currentRow?.backgroundImg && (
        <ZoomableImage
          src={`${imgPath}/${currentRow.backgroundImg}`}
          alt={`${currentRow.backgroundImg}`}
          borderRadius={'20px'}
          zoomInFab={'center'}
          isFullScreen={fullScreenIndex !== null}
          showZoomButton={fullScreenIndex === null}
          onToggle={() =>
            setFullScreenIndex(fullScreenIndex === null ? 0 : null)
          }
        />
      )}

      {canProceed && (
        <NextButton onClick={onNext} disabled={!canProceed}>
          Next
        </NextButton>
      )}
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

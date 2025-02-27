import { useState, useContext } from 'react';
import { Box } from '@mui/material';
import { GameContext } from '../store/game-context';
import PropTypes from 'prop-types';
import useNextId from '../hook/useNextId';
import ZoomableImage from '../component/common/ZoomableImage';
import NextButton from '../component/common/NextButton';

const Img = ({ currentRow }) => {
  const { rundownData, setCurrentId } = useContext(GameContext);
  const [fullScreenIndex, setFullScreenIndex] = useState(null);

  const { getNextId, canProceedToNext } = useNextId(rundownData, currentRow);

  const handleNext = () => {
    const nextId = getNextId();
    if (nextId) {
      setCurrentId(nextId); // 如果有下一個 ID，設置為它
    }
  };

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

      <NextButton onClick={handleNext} disabled={!canProceedToNext()}>
        Next
      </NextButton>
    </Box>
  );
};

// 定義 propTypes
Img.propTypes = {
  currentRow: PropTypes.object,
};

export default Img;

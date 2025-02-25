import PropTypes from 'prop-types';
import { Box, Fab, Paper } from '@mui/material';
import OpenInFullRoundedIcon from '@mui/icons-material/OpenInFullRounded';
import CloseFullscreenRoundedIcon from '@mui/icons-material/CloseFullscreenRounded';

const ZoomableImage = ({
  src,
  alt,
  isFullScreen,
  showZoomButton,
  onToggle,
}) => {
  return (
    <>
      {/* 當圖片沒有放大時，顯示在 Paper 內 */}
      {!isFullScreen && (
        <Paper
          elevation={10}
          sx={{ display: 'flex', borderRadius: '10px', position: 'relative' }}
        >
          {showZoomButton && (
            <Fab
              size="small"
              onClick={onToggle}
              sx={{
                position: 'absolute',
                bottom: 10,
                right: 10,
                zIndex: 1101,
                backgroundColor: '#fff',
                color: '#37474F',
              }}
            >
              <OpenInFullRoundedIcon />
            </Fab>
          )}
          <img
            src={src}
            alt={alt}
            style={{
              width: '100%',
              height: 'auto',
              objectFit: 'scale-down',
              borderRadius: 'inherit',
            }}
          />
        </Paper>
      )}

      {/* 當圖片放大時 */}
      {isFullScreen && (
        <>
          {/* 半透明背景，點擊可縮小 */}
          <Box
            onClick={onToggle}
            sx={{
              position: 'fixed',
              top: 0,
              left: 0,
              m: '0 !important',
              width: '100vw',
              height: '100vh',
              backgroundColor: 'rgba(200, 200, 200, 0.9)',
              zIndex: 1000,
            }}
          />

          {/* 放大的圖片 */}
          <img
            src={src}
            alt={alt}
            style={{
              width: '90%',
              height: 'auto',
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 1101, // 確保圖片在最上層
              borderRadius: '10px',
            }}
          />

          {/* 縮小按鈕 */}
          <Fab
            onClick={onToggle}
            sx={{
              position: 'fixed',
              bottom: 20,
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 1102, // 確保按鈕在圖片之上
              backgroundColor: '#fff',
              color: '#37474F',
            }}
          >
            <CloseFullscreenRoundedIcon />
          </Fab>
        </>
      )}
    </>
  );
};

ZoomableImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  isFullScreen: PropTypes.bool.isRequired,
  showZoomButton: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
};

export default ZoomableImage;

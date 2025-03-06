import PropTypes from 'prop-types';
import { useState } from 'react';
import { Box, Fab, Paper, Slider } from '@mui/material';
import OpenInFullRoundedIcon from '@mui/icons-material/OpenInFullRounded';
import CloseFullscreenRoundedIcon from '@mui/icons-material/CloseFullscreenRounded';

const Wheel = ({
  prop,
  elevation = 10,
  borderRadius = '10px',
  zoomInFab = 'right',
  isFullScreen,
  showZoomButton,
  onToggle,
}) => {
  const [angle, setAngle] = useState(180);
  const handleSliderChange = (event, newValue) => {
    setAngle(newValue);
  };

  return (
    <>
      {/* 當圖片沒有放大時，顯示在 Paper 內 */}
      {!isFullScreen && (
        <Paper
          elevation={elevation}
          sx={{
            display: 'flex',
            borderRadius: { borderRadius },
            position: 'relative',
          }}
        >
          {showZoomButton && (
            <Box
              sx={{
                position: 'absolute',
                width: '100%',
                bottom: 10,
                display: 'flex',
                alignItems: 'center',
                zIndex: 1101,
              }}
            >
              {prop.title && (
                <Box
                  sx={{
                    backgroundColor: '#37474F',
                    borderRadius: '0px 20px 20px 0px',
                    fontSize: 14,
                    fontWeight: 'regular',
                    textAlign: 'center',
                    letterSpacing: 0.7,
                    color: '#fff',
                    p: '6px',
                    pr: '13px',
                  }}
                >
                  {prop.title}
                </Box>
              )}
              {zoomInFab === 'right' && (
                <Fab
                  size="small"
                  onClick={onToggle}
                  sx={{
                    backgroundColor: '#fff',
                    color: '#37474F',
                    right: 10,
                    ml: 'auto',
                  }}
                >
                  <OpenInFullRoundedIcon />
                </Fab>
              )}
              {zoomInFab === 'center' && (
                <Fab
                  size="medium"
                  onClick={onToggle}
                  sx={{
                    backgroundColor: '#fff',
                    color: '#37474F',
                    m: 'auto',
                    top: 10,
                    transform: 'translateY(50%)',
                  }}
                >
                  <OpenInFullRoundedIcon />
                </Fab>
              )}
            </Box>
          )}
          <img
            src={`/gameFile/sjqy/img/${prop.img}`}
            alt={prop.img}
            style={{
              width: '100%',
              objectFit: 'scale-down',
              borderRadius: 'inherit',
            }}
          />
        </Paper>
      )}

      {/* 當圖片放大時 */}
      {isFullScreen && (
        <>
          {/* 半透明背景 */}
          <Box
            sx={{
              width: '100vw',
              height: '100vh',
              m: '0 !important',
              position: 'fixed',
              top: 0,
              left: 0,
              backgroundColor: 'rgba(200, 200, 200, 0.9)',
              zIndex: 1000,
            }}
          />
          {/* Fixed底層 */}
          <Box
            sx={{
              width: '100%',
              height: '100%',
              m: '0 !important',
              position: 'fixed',
              top: 0,
              left: 0,
              display: 'flex',
              alignItems: 'center',
              zIndex: 1100,
            }}
          >
            {/* 功能區 */}
            <Box
              sx={{
                width: '100%',
                maxWidth: '600px',
                height: 'calc(80dvh)',
                maxHeight: '650px',
                margin: 'auto',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-evenly',
                alignItems: 'center',
              }}
            >
              {/* 放大的圖片 */}
              <Box
                sx={{
                  width: '100%',
                  maxWidth: '600px',
                  height: 'auto',
                  position: 'relative',
                }}
              >
                {/* 可以旋轉的那張圖片 */}
                <img
                  src={`/gameFile/sjqy/img/${prop.rotateImg}`}
                  alt={prop.rotateImg}
                  style={{
                    width: '100%',
                    maxWidth: '600px',
                    maxHeight: '100%',
                    position: 'absolute',
                    transform: `rotate(${angle}deg)`,
                    transition: 'transform 0.1s linear',
                    objectFit: 'scale-down',
                    filter: 'drop-shadow(0px 0px 4px rgba(0, 0, 0, 0.3))',
                  }}
                />

                {/* 不能旋轉的那張圖片 */}
                <img
                  src={`/gameFile/sjqy/img/${prop.frontImg}`}
                  alt={prop.frontImg}
                  style={{
                    width: '100%',
                    maxWidth: '600px',
                    maxHeight: '100%',
                    position: 'relative',
                    transform: 'rotate(${angle}deg)',
                    objectFit: 'scale-down',
                    filter: 'drop-shadow(0px 0px 2px rgba(0, 0, 0, 0.5))',
                  }}
                />
              </Box>

              {/* 滑桿區 */}
              <Box
                sx={{
                  width: '80%',
                  maxWidth: '480px',
                }}
              >
                <Slider
                  value={angle}
                  onChange={handleSliderChange}
                  aria-label="Degree"
                  aria-labelledby="continuous-slider"
                  color="danger"
                  min={0}
                  max={360}
                  valueLabelDisplay="auto"
                  valueLabelFormat={(value) => `${value}°`}
                />
              </Box>

              {/* 縮小按鈕 */}
              <Fab
                onClick={onToggle}
                sx={{
                  flexShrink: '0',
                  backgroundColor: '#fff',
                  color: '#37474F',
                }}
              >
                <CloseFullscreenRoundedIcon />
              </Fab>
            </Box>
          </Box>
        </>
      )}
    </>
  );
};

Wheel.propTypes = {
  prop: PropTypes.object,
  elevation: PropTypes.number,
  borderRadius: PropTypes.string,
  zoomInFab: PropTypes.string,
  isFullScreen: PropTypes.bool.isRequired,
  showZoomButton: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
};

export default Wheel;

import PropTypes from 'prop-types'; 

function BackgroundLayer({ src, opacity = '0.5' }) {
  return (
    <img
      src={src}
      style={{
        objectFit: 'cover',
        objectPosition: '35%',
        width: '100%',
        height: '100%',
        opacity: opacity,
      }}
    ></img>
  );
}

BackgroundLayer.propTypes = {
  src: PropTypes.string.isRequired,
  opacity: PropTypes.oneOfType([
    PropTypes.string, // opacity 可以是字串
    PropTypes.number, // 或數字
  ]),
};

export default BackgroundLayer;
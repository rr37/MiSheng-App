import PropTypes from 'prop-types'; 

function BackgroundLayer(props) {
  return (
    <img
      src={props.src}
      style={{
        objectFit: 'cover',
        objectPosition: '35%',
        width: '100%',
        height: '100%',
        opacity: '0.5',
      }}
    ></img>
  );
}

BackgroundLayer.propTypes = {
  src: PropTypes.string.isRequired, 
};

export default BackgroundLayer;
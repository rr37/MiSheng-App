import PropTypes from 'prop-types'; 
function CharacterLayer(props) {
  return (
    <img
      src={props.src}
      style={{
        objectFit: 'contain',
        objectPosition: 'top',
        width: '100%',
        height: '100%',
        position: 'relative',
      }}
    ></img>
  );
}

CharacterLayer.propTypes = {
  src: PropTypes.string.isRequired,
};

export default CharacterLayer;
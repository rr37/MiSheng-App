import { useState, useEffect } from 'react';
import { Button, Typography, Box, Stack } from '@mui/material';
import PropTypes from 'prop-types'; // 引入 PropTypes
import { useTypewriterEffect } from '../animation/useTypewriterEffect';

const Quiz = ({ data, currentId, setCurrentId }) => {
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    // Find the current question
    const question = data.find((row) => row.id === currentId);
    setCurrentQuestion(question);

    // Find options related to the current question
    const relatedOptions = data.filter((row) => row.parentId === currentId);
    setOptions(relatedOptions);
  }, [currentId, data]);

  const displayText = useTypewriterEffect(
    currentQuestion?.text || '', // Pass the dialogue text to the hook
    50 // Typing speed in milliseconds
  );

  const handleOptionClick = (nextId) => {
    setCurrentId(nextId);
  };

  if (!currentQuestion) {
    return <Typography>Quiz Loading...</Typography>;
  }

  return (
    <>
      {/* quiz model */}
      {/* background-image */}
      <Box
        sx={{
          width: '100%',
          height: '100%',
          overflow: 'hidden',
          // border: '1px solid #000',
          position: 'absolute',
          borderRadius: '20px',
          top: 0,
          left: 0,
        }}
      >
        <img
          src="/gameFile/sjqy/img/m1bgc.jpg"
          style={{
            objectFit: 'cover',
            objectPosition: '35%',
            width: '100%',
            height: '100%',
            opacity: '0.5',
          }}
        ></img>
      </Box>
      {/* character */}
      <Box
        sx={{
          width: '100%',
          height: '100%',
          overflow: 'hidden',
          // border: '1px solid #000',
          position: 'absolute',
          borderRadius: '20px',
          top: 0,
          left: 0,
        }}
      >
        <img
          src="/gameFile/sjqy/img/explorer_girl.png"
          style={{
            objectFit: 'contain',
            objectPosition: 'center',
            width: '100%',
            height: '100%',
            top: '20%',
            position: 'relative',
          }}
        ></img>
      </Box>
      {/* gradient after text */}
      <Box
        sx={{
          background: 'linear-gradient(transparent 12%, #37474F 66%)',
          width: '100%',
          height: '80%',
          bottom: '0%',
          position: 'absolute',
          borderRadius: '0 0 20px 20px',
        }}
      ></Box>
      {/* text */}
      <Box
        sx={{
          width: '100%',
          height: '100%',
          overflow: 'hidden',
          // border: '1px solid #000',
          boxSizing: 'border-box',
          position: 'absolute',
          top: 0,
          left: 0,
          borderRadius: '20px',
        }}
      >
        <Box
          sx={{
            width: '100%',
            padding: '7%',
            boxSizing: 'border-box',
            // border: '1px solid #000',
            bottom: '0',
            position: 'absolute',
          }}
        >
          <Stack spacing={2}>
            <Typography
              variant="h5"
              align="left"
              sx={{ color: '#fff', width: '100%' }}
            >
              {currentQuestion.speaker}
            </Typography>
            <Typography variant="body2" align="left" sx={{ color: '#fff' }}>
              {displayText}
            </Typography>
            {options.map((option) => (
              <Button
                key={option.id}
                variant="contained"
                size="small"
                color="inherit"
                sx={{ width: '100%', borderRadius: '30px' }}
                onClick={() => handleOptionClick(option.nextId)}
              >
                {option.title}
              </Button>
            ))}
          </Stack>
        </Box>
      </Box>
    </>
  );
};

// 定義 propTypes
Quiz.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      speaker: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      nextId: PropTypes.string,
      img: PropTypes.string,
    })
  ).isRequired,
  currentId: PropTypes.string.isRequired,
  setCurrentId: PropTypes.func.isRequired,
};

export default Quiz;

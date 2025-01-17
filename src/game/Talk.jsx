import { useState, useEffect } from 'react';
import { Button, Typography, Box } from '@mui/material';
import PropTypes from 'prop-types'; // 引入 PropTypes
import { useTypewriterEffect } from '../animation/useTypewriterEffect';
import useNextId from '../hook/useNextId';

const Talk = ({ data, currentId, setCurrentId }) => {
  const [currentDialogue, setCurrentDialogue] = useState(null);

  useEffect(() => {
    if (data.length > 0) {
      const dialogue = data.find((row) => row.id === currentId);
      setCurrentDialogue(dialogue);
    }
  }, [currentId, data]);

  const displayText = useTypewriterEffect(
    currentDialogue?.text || '', // Pass the dialogue text to the hook
    50 // Typing speed in milliseconds
  );

  const { getNextId, canProceedToNext } = useNextId(data, currentDialogue);

  const handleNext = () => {
    const nextId = getNextId();
    if (nextId) {
      setCurrentId(nextId); // 如果有下一個 ID，設置為它
    }
  };

  if (!currentDialogue) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box display="flex" flexDirection="column" alignItems="center" p={2}>
      <Typography variant="h6" gutterBottom>
        {currentDialogue.speaker}: {currentDialogue.title}
      </Typography>
      <Typography
        variant="body1"
        gutterBottom
        sx={{
          whiteSpace: 'pre-wrap',
        }}
      >
        {displayText}
      </Typography>
      {currentDialogue.img && (
        <img
          src={currentDialogue.img}
          alt="scene"
          style={{ maxWidth: '100%', height: 'auto', marginBottom: '16px' }}
        />
      )}
      <Button
        variant="contained"
        color="primary"
        onClick={handleNext}
        disabled={!canProceedToNext()} // 使用提取的函數判斷按鈕是否應該禁用
      >
        Next
      </Button>
    </Box>
  );
};

// 定義 propTypes
Talk.propTypes = {
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

export default Talk;

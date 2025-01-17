import { useState, useEffect } from 'react';
import { Typography } from '@mui/material';
import PropTypes from 'prop-types'; // 引入 PropTypes
import { useTypewriterEffect } from '../animation/useTypewriterEffect';
import Layer from '../component/layer/layer';
import GradientLayer from '../component/layer/GradientLayer';
import BackgroundLayer from '../component/layer/BackgroundLayer';
import CharacterLayer from '../component/layer/CharacterLayer';
import QuestionBox from '../component/feature/QuestionBox';

const QuizModel = ({ data, characterData, currentId, setCurrentId }) => {
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [speaker, setSpeaker] = useState(null);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    // Find the current question
    const question = data.find((row) => row.id === currentId);
    setCurrentQuestion(question);

    // Find options related to the current question
    const relatedOptions = data.filter((row) => row.parentId === currentId);
    setOptions(relatedOptions);

    // 如果有 speaker，從 characterData 中找到對應的角色
    if (question?.speaker) {
      const character = characterData.find(
        (char) => char.name === question.speaker
      );
      setSpeaker(character|| null); // 儲存角色資訊
    } else {
      setSpeaker(null); // 沒有 speaker 時清空
    }
  }, [currentId, data, characterData]);

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
      {/* Quiz model */}

      {/* Background-image */}
      <Layer>
        <BackgroundLayer src="/gameFile/sjqy/img/m1bgc.jpg" />
      </Layer>

      {/* Character */}
      {speaker?.straight && (
        <Layer>
          <CharacterLayer src={`/gameFile/sjqy/img/${speaker?.straight}`} />
        </Layer>
      )}

      {/* Gradient after text */}
      <GradientLayer />

      {/* Quiz */}
      <Layer>
        <QuestionBox
          speaker={currentQuestion.speaker}
          text={displayText}
          options={options}
          onOptionClick={handleOptionClick}
        />
      </Layer>
    </>
  );
};

// 定義 propTypes
QuizModel.propTypes = {
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
  characterData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      avatar: PropTypes.string,
      straight: PropTypes.string,
    })
  ).isRequired,
  currentId: PropTypes.string.isRequired,
  setCurrentId: PropTypes.func.isRequired,
};

export default QuizModel;

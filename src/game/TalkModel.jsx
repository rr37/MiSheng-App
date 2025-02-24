import { useState, useEffect, useContext } from 'react';
import { Typography } from '@mui/material';
import PropTypes from 'prop-types'; // 引入 PropTypes
import { useTypewriterEffect } from '../animation/useTypewriterEffect';
import useNextId from '../hook/useNextId';
import ThemeColorLayer from '../component/layer/ThemeColorLayer';
import Layer from '../component/layer/Layer';
import GradientLayer from '../component/layer/GradientLayer';
import BackgroundLayer from '../component/layer/BackgroundLayer';
import CharacterLayer from '../component/layer/CharacterLayer';
import TalkBox from '../component/feature/TalkBox';
import { GameContext } from '../store/game-context';

const Talk = ({ data, characterData, currentId, setCurrentId }) => {
  const [currentDialogue, setCurrentDialogue] = useState(null);
  const [speaker, setSpeaker] = useState(null);
  const [backgroundImg, setBackgroundImg] = useState(null);
  const { missionData, currentMissionId } = useContext(GameContext);
  const currentMission = missionData[currentMissionId];

  useEffect(() => {
    if (data.length < 0) {
      return;
    }
    const dialogue = data.find((row) => row.id === currentId);
    setCurrentDialogue(dialogue);

    // 如果有 speaker，從 characterData 中找到對應的角色
    if (dialogue?.speaker) {
      const character = characterData.find(
        (char) => char.name === dialogue.speaker
      );
      setSpeaker(character || null); // 儲存角色資訊
    } else {
      setSpeaker(null); // 沒有 speaker 時清空
    }
  }, [currentId, data, characterData]);

  useEffect(() => {
    setBackgroundImg(
      currentDialogue?.background_img || currentMission?.background_img
    );
  }, [currentDialogue, currentMission]);

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
    <ThemeColorLayer>
      {/* Talk model */}

      {/* Background-image */}
      {backgroundImg && (
        <Layer>
          <BackgroundLayer src={`/gameFile/sjqy/img/${backgroundImg}`} />
        </Layer>
      )}

      {/* Character */}
      {speaker?.straight && (
        <Layer>
          <CharacterLayer src={`/gameFile/sjqy/img/${speaker?.straight}`} />
        </Layer>
      )}

      {/* Gradient after text */}
      <GradientLayer />

      {/* Talk */}
      <Layer>
        <TalkBox
          title={currentDialogue?.title || currentDialogue.speaker}
          text={displayText}
          onNext={handleNext}
          canProceed={canProceedToNext}
        />
      </Layer>
    </ThemeColorLayer>
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

export default Talk;

import { useState, useEffect, useContext } from 'react';
import { Typography } from '@mui/material';
import PropTypes from 'prop-types'; // 引入 PropTypes
import { useTypewriterEffect } from '../animation/useTypewriterEffect';
import ThemeColorLayer from '../component/layer/ThemeColorLayer';
import Layer from '../component/layer/Layer';
import GradientLayer from '../component/layer/GradientLayer';
import BackgroundLayer from '../component/layer/BackgroundLayer';
import CharacterLayer from '../component/layer/CharacterLayer';
import TalkBox from '../component/feature/TalkBox';
import { GameContext } from '../store/game-context';

const Talk = ({ currentRow, onNext, canProceed }) => {
  const [speaker, setSpeaker] = useState(null);
  const [backgroundImg, setBackgroundImg] = useState(null);
  const {
    characterData,
    missionData,
    rundownData,
    currentMissionId,
    currentId,
  } = useContext(GameContext);
  const currentMission = missionData[currentMissionId];

  useEffect(() => {
    if (rundownData.length < 0) {
      return;
    }

    // 如果有 speaker，從 characterData 中找到對應的角色
    if (currentRow?.speaker) {
      const character = characterData.find(
        (char) => char.name === currentRow.speaker
      );
      setSpeaker(character || null); // 儲存角色資訊
    } else {
      setSpeaker(null); // 沒有 speaker 時清空
    }
  }, [currentId]);

  useEffect(() => {
    setBackgroundImg(
      currentRow?.background_img || currentMission?.background_img
    );
  }, [currentRow, currentMission]);

  const displayText = useTypewriterEffect(
    currentRow?.text || '', // Pass the dialogue text to the hook
    50 // Typing speed in milliseconds
  );

  if (!currentRow) {
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
          title={currentRow?.title || currentRow.speaker}
          text={displayText}
          onNext={onNext}
          canProceed={canProceed}
        />
      </Layer>
    </ThemeColorLayer>
  );
};

// 定義 propTypes
Talk.propTypes = {
  currentRow: PropTypes.object.isRequired,
  onNext: PropTypes.func.isRequired,
  canProceed: PropTypes.bool.isRequired,
};

export default Talk;

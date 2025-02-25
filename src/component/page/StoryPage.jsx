import { useContext, useEffect, useState } from 'react';
import { GameContext } from '../../store/game-context';
import ThemeColorLayer from '../layer/ThemeColorLayer';
import PageContainer from '../common/PageContainer';
import PageTitleText from '../common/PageTitleText';
import ContentList from '../common/ContentList';
import ZoomableImage from '../common/zoomableImage';

const StoryPage = () => {
  const { missionData, storyData, currentMissionId } = useContext(GameContext);
  const [currentStories, setCurrentStories] = useState();
  const [fullScreenIndex, setFullScreenIndex] = useState(null); // 控制哪張圖全螢幕

  const currentMission = missionData[currentMissionId];

  useEffect(() => {
    if (!currentMission) {
      console.log('還沒有 currentMission！');
      return;
    }
    if (!Array.isArray(storyData)) {
      console.log('storyData 不是有效的數組！');
      return;
    }
    const stories = storyData.filter(
      (row) => row.mission_id === currentMission.id
    );
    setCurrentStories(stories);
  }, [currentMission, storyData]);

  return (
    <ThemeColorLayer bgc="#fff">
      <PageContainer>
        <PageTitleText title="故事" />

        {Array.isArray(currentStories) && currentStories.length > 0 ? (
          <ContentList
            items={currentStories}
            renderItem={(story, index) => (
              <ZoomableImage
                key={index}
                src={`/gameFile/sjqy/img/${story.img}`}
                alt={`Image ${index + 1}`}
                isFullScreen={fullScreenIndex === index}
                showZoomButton={fullScreenIndex === null}
                onToggle={() =>
                  setFullScreenIndex(fullScreenIndex === index ? null : index)
                }
              />
            )}
          />
        ) : (
          <p>No stories available</p>
        )}
      </PageContainer>
    </ThemeColorLayer>
  );
};

export default StoryPage;

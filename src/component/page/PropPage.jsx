import { useContext, useEffect, useState } from 'react';
import { GameContext } from '../../store/game-context';
import ThemeColorLayer from '../layer/ThemeColorLayer';
import PageContainer from '../common/PageContainer';
import PageTitleText from '../common/PageTitleText';
import ContentList from '../common/ContentList';
import ZoomableImage from '../common/zoomableImage';

const PropPage = () => {
  const { missionData, propData, currentMissionId } = useContext(GameContext);
  const [currentProps, setCurrentProps] = useState();
  const [fullScreenIndex, setFullScreenIndex] = useState(null); // 控制哪張圖全螢幕

  const currentMission = missionData[currentMissionId];

  useEffect(() => {
    if (!currentMission) {
      console.log('還沒有 currentMission！');
      return;
    }
    if (!Array.isArray(propData)) {
      console.log('propData 不是有效的數組！');
      return;
    }
    const props = propData.filter(
      (row) => row.mission_id === currentMission.id
    );
    setCurrentProps(props);
  }, [currentMission, propData]);

  return (
    <ThemeColorLayer bgc="#fff">
      <PageContainer>
        <PageTitleText title="道具" />

        {Array.isArray(currentProps) && currentProps.length > 0 ? (
          <ContentList
            items={currentProps}
            renderItem={(prop, index) => (
              <ZoomableImage
                key={index}
                src={`/gameFile/sjqy/img/${prop.img}`}
                alt={`Image ${index + 1}`}
                title={prop.title}
                isFullScreen={fullScreenIndex === index}
                showZoomButton={fullScreenIndex === null}
                onToggle={() =>
                  setFullScreenIndex(fullScreenIndex === index ? null : index)
                }
              />
            )}
          />
        ) : (
          <p>No props available</p>
        )}
      </PageContainer>
    </ThemeColorLayer>
  );
};

export default PropPage;

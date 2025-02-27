import ContentList from '../common/ContentList';
import MissionItem from './MissionItem';
import PropTypes from 'prop-types';

const MissionList = ({
  missions,
  currentMissionId,
  onLongPressStart,
  onLongPressEnd,
  onMissionSelect,
}) => {
  return (
    <ContentList
      items={missions}
      renderItem={(mission) => (
        <MissionItem
          key={mission.id}
          mission={mission}
          isActive={mission.id === currentMissionId}
          onLongPressStart={onLongPressStart}
          onLongPressEnd={onLongPressEnd}
          onSelect={() =>
            onMissionSelect(mission.id, mission.subtitle || mission.title)
          }
        />
      )}
      emptyText={'No missions available'}
    />
  );
};

MissionList.propTypes = {
  missions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string,
      subtitle: PropTypes.string,
      status: PropTypes.oneOf(['solving', 'complete', 'incomplete', '']),
      background_img: PropTypes.string,
    })
  ).isRequired,
  currentMissionId: PropTypes.number.isRequired,
  onLongPressStart: PropTypes.func.isRequired,
  onLongPressEnd: PropTypes.func.isRequired,
  onMissionSelect: PropTypes.func.isRequired,
};

export default MissionList;

import { Box, Button, Paper, Typography } from '@mui/material';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import PendingRoundedIcon from '@mui/icons-material/PendingRounded';
import BlockRoundedIcon from '@mui/icons-material/BlockRounded';
import PersonPinCircleRoundedIcon from '@mui/icons-material/PersonPinCircleRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import Layer from '../layer/Layer';
import BackgroundLayer from '../layer/BackgroundLayer';
import PropTypes from 'prop-types';

const MissionItem = ({
  mission,
  isActive,
  onLongPressStart,
  onLongPressEnd,
  onSelect,
}) => {
  return (
    <Paper
      onMouseDown={(e) =>
        onLongPressStart(e, mission.id, mission.subtitle || mission.title)
      }
      onMouseUp={onLongPressEnd}
      onMouseLeave={onLongPressEnd}
      elevation={mission.status ? 8 : 0}
      sx={{
        display: 'flex',
        borderRadius: '20px',
        position: 'relative',
        height: '70px',
        minHeight: '70px',
      }}
    >
      {/* Background */}
      <Layer>
        {mission.status ? (
          <BackgroundLayer
            src={`/gameFile/sjqy/img/${mission.background_img}`}
          />
        ) : (
          <Box
            sx={{
              width: '100%',
              height: '100%',
              background: '#37474F',
              opacity: '50%',
            }}
          />
        )}
      </Layer>

      {/* Gradient Overlay */}
      {mission.status && (
        <Layer>
          <Box
            sx={{
              background: 'linear-gradient(-90deg,transparent 0%, #37474F 90%)',
              width: '70%',
              height: '100%',
            }}
          />
        </Layer>
      )}

      {/* Title & Status Icon */}
      <Layer>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            height: '100%',
            pl: '20px',
            color: '#fff',
            opacity: isActive ? 1 : 0.5,
          }}
        >
          {isActive ? (
            <PersonPinCircleRoundedIcon />
          ) : mission.status === 'solving' ? (
            <PendingRoundedIcon />
          ) : mission.status === 'complete' ? (
            <CheckCircleOutlineRoundedIcon />
          ) : (
            <BlockRoundedIcon />
          )}

          <Typography
            align="left"
            sx={{
              fontFamily: "'Noto Serif TC', serif",
              fontWeight: 600,
              fontSize: '24px',
              color: '#fff',
              marginLeft: '6px',
            }}
          >
            {mission.subtitle || mission.title}
          </Typography>
        </Box>
      </Layer>

      {/* Button */}
      <Layer>
        <Button
          disabled={!mission.status}
          onClick={onSelect}
          sx={{
            width: '100%',
            height: '100%',
            color: '#fff',
            display: 'flex',
            justifyContent: 'end',
            pr: '20px',
            opacity: isActive ? 1 : 0.5,
          }}
        >
          <ArrowForwardRoundedIcon
            sx={{ filter: 'drop-shadow(2px 2px 5px rgba(0, 0, 0, 0.3))' }}
          />
        </Button>
      </Layer>
    </Paper>
  );
};

MissionItem.propTypes = {
  mission: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string,
    subtitle: PropTypes.string,
    status: PropTypes.oneOf(['solving', 'complete', 'incomplete', '']),
    background_img: PropTypes.string,
  }).isRequired,
  isActive: PropTypes.bool.isRequired,
  onLongPressStart: PropTypes.func.isRequired,
  onLongPressEnd: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default MissionItem;

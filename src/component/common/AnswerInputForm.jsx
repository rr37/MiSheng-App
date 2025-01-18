import {
  Divider,
  FilledInput,
  FormControl,
  IconButton,
  InputLabel,
  InputAdornment,
} from '@mui/material';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import PropTypes from 'prop-types';

const AnswerInputForm = ({ value, onChange, onClick, disabled }) => {
  return (
    <FormControl variant="filled" fullWidth>
      <InputLabel htmlFor="mission-answer">輸入答案</InputLabel>
      <FilledInput
        id="mission-answer"
        type="text"
        value={value}
        onChange={onChange}
        endAdornment={
          <InputAdornment
            position="end"
            sx={{ display: 'flex', alignItems: 'center' }}
          >
            <Divider
              orientation="vertical"
              flexItem
              sx={{
                height: 28,
                mx: 1,
              }}
            />
            <IconButton
              onClick={onClick}
              edge="end"
              aria-label="submit-answer"
              sx={{
                color: 'primary.main',
                '&:hover': {
                  color: 'secondary.main',
                  backgroundColor: 'rgba(0, 0, 0, 0.1)',
                },
              }}
            >
              <SendRoundedIcon />
            </IconButton>
          </InputAdornment>
        }
        disabled={disabled}
        sx={{
          backgroundColor: '#fff',
          borderRadius: '10px',
          '&:hover': {
            backgroundColor: '#fff',
          },
          '&.Mui-focused': {
            backgroundColor: '#fff',
          },
          '&:focus-within': {
            backgroundColor: '#fff',
          },
        }}
      />
    </FormControl>
  );
};

AnswerInputForm.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

export default AnswerInputForm;

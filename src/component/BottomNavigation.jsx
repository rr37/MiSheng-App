import { useState } from 'react';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import StorageRoundedIcon from '@mui/icons-material/StorageRounded';
import HomeRepairServiceRoundedIcon from '@mui/icons-material/HomeRepairServiceRounded';
import QuestionAnswerRoundedIcon from '@mui/icons-material/QuestionAnswerRounded';
import TipsAndUpdatesRoundedIcon from '@mui/icons-material/TipsAndUpdatesRounded';
import AutoStoriesRoundedIcon from '@mui/icons-material/AutoStoriesRounded';

export default function FixedBottomNavigation() {
  const [value, setValue] = useState(0);

  return (
    <BottomNavigation
      sx={{
        position: 'relative',
        bottom: 0, // 固定在畫面底部
        width: '100%',
        maxWidth: '600px',
        margin: 'auto',
        backgroundColor: '#f8f9fa', // 背景色
        boxShadow: '0 -1px 5px rgba(0, 0, 0, 0.1)', // 輕微陰影
      }}
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      // showLabels
    >
      <BottomNavigationAction label="關卡" icon={<StorageRoundedIcon />} />
      <BottomNavigationAction
        label="道具"
        icon={<HomeRepairServiceRoundedIcon />}
      />
      <BottomNavigationAction
        label="解謎"
        icon={<QuestionAnswerRoundedIcon />}
      />
      <BottomNavigationAction
        label="提示"
        icon={<TipsAndUpdatesRoundedIcon />}
      />
      <BottomNavigationAction label="故事" icon={<AutoStoriesRoundedIcon />} />
    </BottomNavigation>
  );
}

import './App.css';
import { useState } from 'react';
import { Box, Container } from '@mui/material';
import { GameProvider } from './store/game-provider';
import FixedBottomNavigation from './component/BottomNavigation';
import MissionPage from './component/page/MissionPage';
import PropPage from './component/page/PropPage';
import HintPage from './component/page/HintPage';
import StoryPage from './component/page/StoryPage';
import GameController from './game/GameController';
// 遊戲檔位置
import characterCsvFile from '/gameFile/sjqy/sjqy - character.csv';
import hintCsvFile from '/gameFile/sjqy/sjqy - hint.csv';
import missionCsvFile from '/gameFile/sjqy/sjqy - mission.csv';
import propCsvFile from '/gameFile/sjqy/sjqy - prop.csv';
import rundownCsvFile from '/gameFile/sjqy/sjqy - rundown.csv';
import storyCsvFile from '/gameFile/sjqy/sjqy - story.csv';

function App() {
  const [value, setValue] = useState(2);

  // 根據value顯示不同的內容
  const renderMainContainer = () => {
    switch (value) {
      case 0:
        return <MissionPage />;
      case 1:
        return <PropPage />;
      case 2:
        return (
          <GameController
            characterCsvFile={characterCsvFile}
            hintCsvFile={hintCsvFile}
            missionCsvFile={missionCsvFile}
            propCsvFile={propCsvFile}
            rundownCsvFile={rundownCsvFile}
            storyCsvFile={storyCsvFile}
          />
        );
      case 3:
        return <HintPage />;
      case 4:
        return <StoryPage />;
      default:
        return <div>未知頁面內容</div>;
    }
  };

  return (
    <GameProvider>
      <Box
        sx={{
          height: '100dvh',
          // backgroundColor: '#000',
        }}
      >
        <Container
          maxWidth="sm"
          sx={{
            height: 'calc(100dvh - 56px)',
            backgroundColor: '#eee',
            width: '100%',
          }}
        >
          <Box
            id="main-container"
            sx={{
              position: 'fixed',
              width: '100%',
              height: 'calc(100dvh - 56px)',
              zIndex: 550,
              top: 0,
              left: 0,
            }}
          >
            <Box
              sx={{
                width: '100%',
                height: '100%',
                maxWidth: '600px',
                boxSizing: 'border-box',
                margin: 'auto',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              {renderMainContainer()}
            </Box>
          </Box>

          <Box
            id="TabBar"
            sx={{
              width: '100%',
              position: 'fixed',
              bottom: 0,
              left: 0,
            }}
          >
            <FixedBottomNavigation
              value={value}
              onChange={(event, newValue) => setValue(newValue)}
            />
          </Box>
        </Container>
      </Box>
    </GameProvider>
  );
}

export default App;

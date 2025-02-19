import './App.css';
import { useState } from 'react';
import { Box, Container } from '@mui/material';
import { GameProvider } from './store/game-provider';
import MyAppBar from './component/AppBar';
import FixedBottomNavigation from './component/BottomNavigation';
import PropPage from './component/page/PropPage';
import HintPage from './component/page/HintPage';
import GameController from './game/GameController';
// 遊戲檔位置
import characterCsvFile from '/gameFile/sjqy/sjqy - character.csv';
import hintCsvFile from '/gameFile/sjqy/sjqy - hint.csv';
import missionCsvFile from '/gameFile/sjqy/sjqy - mission.csv';
import propCsvFile from '/gameFile/sjqy/sjqy - prop.csv';
import rundownCsvFile from '/gameFile/sjqy/sjqy - rundown.csv';

function App() {
  const [value, setValue] = useState(1);

  // 根據value顯示不同的內容
  const renderMainContainer = () => {
    switch (value) {
      case 0:
        return <div>關卡頁面內容</div>;
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
          />
        );
      case 3:
        return <HintPage />;
      case 4:
        return <div>故事頁面內容</div>;
      default:
        return <div>未知頁面內容</div>;
    }
  };

  return (
    <GameProvider>
      <Box
        sx={{
          minHeight: '100vh',
          flexDirection: 'column',
          maxHeight: '100%',
        }}
      >
        <Container
          maxWidth="sm"
          sx={{
            maxHeight: '100%',
            // border: '1px solid #000',
            display: 'flex',
            backgroundColor: '#fff',
            margin: 'auto',
            paddingLeft: '0',
            paddingRight: '0',
            minHeight: '100%',
            width: '100%',
          }}
        >
          <Box
            id="navbar"
            sx={{
              width: '100%',
              position: 'fixed',
              top: '0px',
              left: '0px',
              // border: '1px solid #000',
            }}
          >
            <MyAppBar />
          </Box>
          <Box
            id="main-container"
            sx={{
              display: 'flex',
              alignItems: 'center',
              flex: 1,
              maxHeight: '100%',
              minHeight: '100vh',
              boxSizing: 'border-box',
              paddingTop: '56px',
              paddingBottom: '56px',
            }}
          >
            {renderMainContainer()}
          </Box>
          <Box
            id="TabBar"
            sx={{
              width: '100%',
              position: 'fixed',
              bottom: '0px',
              left: '0px',
              // border: '1px solid #000',
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

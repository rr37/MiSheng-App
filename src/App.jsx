import './App.css';
import { useState, useEffect } from 'react';
import { Box, Container } from '@mui/material';
import { GameProvider } from './store/game-provider';
import FixedBottomNavigation from './component/BottomNavigation';
import MissionPage from './component/page/MissionPage';
import PropPage from './component/page/PropPage';
import HintPage from './component/page/HintPage';
import StoryPage from './component/page/StoryPage';
import GameController from './game/GameController';
import { getGameFolders, loadGameData } from './game/gameLoader';

function App() {
  const [value, setValue] = useState(2);
  const [gameData, setGameData] = useState(null);
  const [gameFolder, setGameFolder] = useState(null);

  useEffect(() => {
    const load = async () => {
      const folders = getGameFolders();
      if (folders.length === 0) return;
      setGameFolder(folders[0]);
      const data = await loadGameData(folders[0]); // 先載入第一個遊戲資料夾
      setGameData(data);
    };

    load();
  }, []);

  const renderMainContainer = () => {
    if (!gameData) return <div>載入中...</div>;

    switch (value) {
      case 0:
        return <MissionPage />;
      case 1:
        return <PropPage />;
      case 2:
        return <GameController {...gameData} />;
      case 3:
        return <HintPage />;
      case 4:
        return <StoryPage />;
      default:
        return <div>未知頁面內容</div>;
    }
  };

  return (
    <GameProvider gameFolder={gameFolder}>
      <Box sx={{ height: '100dvh' }}>
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

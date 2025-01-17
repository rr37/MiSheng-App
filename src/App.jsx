import './App.css';
import { Box, Container } from '@mui/material';
import FixedBottomNavigation from './component/BottomNavigation';
import MyAppBar from './component/AppBar';
import GameController from './game/GameController';
import { GameProvider } from './store/game-provider';
import rundownCsv from '../public/gameFile/sjqy/sjqy - rundown.csv';
import characterCsv from '../public/gameFile/sjqy/sjqy - character.csv';

function App() {
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
            <GameController
              rundownCsvFile={rundownCsv}
              characterCsvFile={characterCsv}
            />
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
            <FixedBottomNavigation />
          </Box>
        </Container>
      </Box>
    </GameProvider>
  );
}

export default App;

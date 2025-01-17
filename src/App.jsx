import './App.css';
import { Box, Container, Typography, Button, Stack } from '@mui/material';
import FixedBottomNavigation from './component/BottomNavigation';
import MyAppBar from './component/AppBar';
function App() {
  const userName = '柏銘';

  return (
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
          {/* bluegray background */}
          <Box
            sx={{
              // border: '1px solid #000',
              borderRadius: '20px',
              height: 'calc(100% - 30px)',
              width: '100%',
              backgroundColor: '#37474F',
              marginLeft: '20px',
              marginRight: '20px',
              marginBottom: '20px',
              overflow: 'hidden',
              boxSizing: 'border-box',
              position: 'relative',
            }}
          >
            {/* quiz model */}
            {/* background-image */}
            <Box
              sx={{
                width: '100%',
                height: '100%',
                overflow: 'hidden',
                // border: '1px solid #000',
                position: 'absolute',
                borderRadius: '20px',
                top: 0,
                left: 0,
              }}
            >
              <img
                src="/gameFile/sjqy/img/m1bgc.jpg"
                style={{
                  objectFit: 'cover',
                  objectPosition: '35%',
                  width: '100%',
                  height: '100%',
                  opacity: '0.5',
                }}
              ></img>
            </Box>
            {/* character */}
            <Box
              sx={{
                width: '100%',
                height: '100%',
                overflow: 'hidden',
                // border: '1px solid #000',
                position: 'absolute',
                borderRadius: '20px',
                top: 0,
                left: 0,
              }}
            >
              <img
                src="/gameFile/sjqy/img/explorer_girl.png"
                style={{
                  objectFit: 'contain',
                  objectPosition: 'center',
                  width: '100%',
                  height: '100%',
                  top: '20%',
                  position: 'relative',
                }}
              ></img>
            </Box>
            {/* gradient after text */}
            <Box
              sx={{
                background: 'linear-gradient(transparent 12%, #37474F 66%)',
                width: '100%',
                height: '80%',
                bottom: '0%',
                position: 'absolute',
                borderRadius: '0 0 20px 20px',
              }}
            ></Box>
            {/* text */}
            <Box
              sx={{
                width: '100%',
                height: '100%',
                overflow: 'hidden',
                // border: '1px solid #000',
                boxSizing: 'border-box',
                position: 'absolute',
                top: 0,
                left: 0,
                borderRadius: '20px',
              }}
            >
              <Box
                sx={{
                  margin: '7%',
                  // border: '1px solid #000',
                  bottom: '0',
                  position: 'absolute',
                }}
              >
                <Stack spacing={2}>
                  <Typography variant="h5" align="left" sx={{ color: '#fff' }}>
                    林茜如
                  </Typography>
                  <Typography
                    variant="body2"
                    align="left"
                    sx={{ color: '#fff' }}
                  >
                    嗨！可愛的 {userName} ，
                    我是茜如，事情就像是發文說的那樣，我想要找人陪我去冒險尋寶，感覺路上多一點人比較安全，你願意陪我去嗎？
                  </Typography>
                  <Button
                    variant="contained"
                    size="small"
                    color="inherit"
                    sx={{ width: '100%', borderRadius: '30px' }}
                  >
                    好呀！要要要！
                  </Button>
                  <Button
                    variant="contained"
                    size="small"
                    color="inherit"
                    sx={{ width: '100%', borderRadius: '30px' }}
                  >
                    這個嘛...
                  </Button>
                </Stack>
              </Box>
            </Box>
          </Box>
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
  );
}

export default App;

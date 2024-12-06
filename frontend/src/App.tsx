// 

import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import ProtectedRoutes from './components/auth/ProtectedRoutes';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage'
import MessagePage from './pages/message/MessagePage';
import ChatBot from './components/chatBot/ChatBot';
import theme from './themes/theme';
import { ThemeProvider, Box } from '@mui/material';
import { SelectedUserProvider } from './components/message/SelectedUserContext';
import { SocketProvider } from './components/message/SocketContext';
import { BackgroundProvider } from './components/message/BackgroundContext';
const App = () => {

  const location = useLocation()

  return (
    <BackgroundProvider>
      <SocketProvider>
        <SelectedUserProvider>
          <ThemeProvider theme={theme}>
            <Box
              component="div"
              minHeight="100vh"
            >
              <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />


                <Route path="/message" element={<MessagePage />} />
              </Routes>

              {location.pathname !== "/login" && location.pathname != "register" ? <ChatBot /> : null}
            </Box>

          </ThemeProvider>
        </SelectedUserProvider>
      </SocketProvider>
    </BackgroundProvider>



  );
};

export default App;

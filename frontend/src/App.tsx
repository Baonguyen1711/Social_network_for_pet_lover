import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import MessagePage from "./pages/message/MessagePage";
import ChatBot from "./components/chatBot/ChatBot";
import theme from "./themes/theme";

import ExplorePage from "../src/pages/explore/ExplorePage";
import ProfilePage from "./pages/profile/ProfilePage";
import PostsDisplay from "./components/profile/PostsDisplay";
import PetsDisplay from "./components/profile/PetsDisplay";

import { ThemeProvider, Box } from "@mui/material";
import { SelectedUserProvider } from "./components/message/SelectedUserContext";
import { SocketProvider } from "./components/message/SocketContext";
import { BackgroundProvider } from "./components/message/BackgroundContext";
import HomePage from "./pages/home/HomePage";
import ProtectedRoutes from "./pages/auth/ProtectedRoute";
import { ProfileProvider } from "./components/profile/ProfileContext";

const App = () => {
  const location = useLocation();

  return (
    <BackgroundProvider>
      <SocketProvider>
        <SelectedUserProvider>
          <ThemeProvider theme={theme}>
            <Box component="div" minHeight="100vh">
              
              <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                
                
                <Route path="/message" element={<ProtectedRoutes element={<MessagePage />} />} />
                <Route path="/explore" element={<ProtectedRoutes element={<ExplorePage />} />} />
                <Route path="/home" element={<ProtectedRoutes element={<HomePage />} />} />

                <Route path="/profile" element={<ProtectedRoutes element={<ProfilePage />} />}>
                  <Route index element={<ProtectedRoutes element={<PostsDisplay />} />} />
                  <Route path="posts" element={<ProtectedRoutes element={<PostsDisplay />} />} />
                  <Route path="pets" element={<ProtectedRoutes element={<PetsDisplay />} />} />
                </Route>
              </Routes> 

              {location.pathname !== "/login" &&
              location.pathname != "register" ? (
                <ChatBot />
              ) : null}
            </Box>
          </ThemeProvider>
        </SelectedUserProvider>
      </SocketProvider>
    </BackgroundProvider>
  );
};

export default App;

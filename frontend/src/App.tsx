import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import ProtectedRoutes from "./components/auth/ProtectedRoutes";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import MessagePage from "./pages/message/MessagePage";
import ChatBot from "./components/chatBot/ChatBot";
import theme from "./themes/theme";

import ExplorePage from "../src/pages/explore/ExplorePage";
import ProfilePage from "./pages/profile/ProfilePage";
import PostsDisplay from "./components/profile/Post/PostsDisplay";
import PetsDisplay from "./components/profile/PetsDisplay";

import { ThemeProvider, Box } from "@mui/material";
import { SelectedUserProvider } from "./components/message/SelectedUserContext";
import { SocketProvider } from "./components/message/SocketContext";
import { BackgroundProvider } from "./components/message/BackgroundContext";
import HomePage from "./pages/home/HomePage";
import FavouritePage from "./pages/favourite/FavouritePage";
import { Favorite } from "@mui/icons-material";
import FavouritePostsDisplay from "./pages/favourite/FavouritePostsDisplay";
import FavouritePetsDisplay from "./pages/favourite/FavouritePetsDisplay";
import FavouriteGeneral from "./pages/favourite/FavouriteGeneralDisplay";
import PostModal from "./components/favourite/post/PostModal";

const App = () => {
  const location = useLocation();
  const state = location.state;
  return (
    <BackgroundProvider>
      <SocketProvider>
        <SelectedUserProvider>
          <ThemeProvider theme={theme}>
            <Box component="div" minHeight="100vh">
              <Routes location={state?.background || location}>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />

                <Route path="/message" element={<MessagePage />} />
                <Route path="/explore" element={<ExplorePage />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/favourite" element={<FavouritePage />}>
                  <Route path="general" element={<FavouriteGeneral />} />
                  <Route path="posts" element={<FavouritePostsDisplay />} />
                  <Route path="pets" element={<FavouritePetsDisplay />} />
                </Route>
                <Route path="/profile/:userId" element={<ProfilePage />}>
                  <Route index element={<PostsDisplay />} />
                  <Route path="posts" element={<PostsDisplay />} />
                  <Route path="pets" element={<PetsDisplay />} />
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

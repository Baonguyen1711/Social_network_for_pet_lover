//

import React from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoutes from "./components/auth/ProtectedRoutes";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";

import theme from "./themes/theme";
import { ThemeProvider } from "@mui/material";
import ExplorePage from "../src/pages/explore/ExplorePage";
import ProfilePage from "./pages/profile/ProfilePage";
import PostsDisplay from "./components/profile/PostsDisplay";
import PetsDisplay from "./components/profile/PetsDisplay";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/profile" element={<ProfilePage />}>
          <Route index element={<PostsDisplay />} />
          <Route path="posts" element={<PostsDisplay />} />
          <Route path="pets" element={<PetsDisplay />} />
        </Route>
        <Route path="/profile/pets" element={<ProfilePage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </ThemeProvider>
  );
};

export default App;

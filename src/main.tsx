import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./global.css"
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Routes,Route } from "react-router";
import LoginPage from "./pages/LoginPage.tsx";
import RegisterPage from "./pages/RegisterPage.tsx";
import AuthLayout from "./layouts/AuthLayout.tsx";
import MainLayout from "./layouts/MainLayout.tsx";
import BingoPage from "./pages/BingoPage.tsx";
import LeaderboardPage from "./pages/LeaderboardPage.tsx";
import ProfilePage from "./pages/ProfilePage.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <BrowserRouter>
          <Routes>
              <Route element={<MainLayout />}>
                  <Route index path="/" element={<App />} />
                  <Route path="/bingo" element={<BingoPage />} />
                  <Route path="/leaderboard" element={<LeaderboardPage />} />
                  <Route path="/profile" element={<ProfilePage />} />
              </Route>
              <Route element={<AuthLayout />}>
                  <Route path="login" element={<LoginPage />} />
                  <Route path="register" element={<RegisterPage />} />
              </Route>
          </Routes>
      </BrowserRouter>
  </StrictMode>,
)
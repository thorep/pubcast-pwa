import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";
import App from "./App.tsx";
import MainLayout from "./layouts/MainLayout.tsx";
import BingoPage from "./pages/BingoPage.tsx";
import LeaderboardPage from "./pages/LeaderboardPage.tsx";
import ProfilePage from "./pages/ProfilePage.tsx";
import RequireAuth from "./components/RequireAuth.tsx";
import { AuthProvider } from "./auth";

const rootElement = document.getElementById("root");
if (!rootElement) {
    throw new Error("Root element not found");
}

createRoot(rootElement).render(
    <StrictMode>
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route
                        element={
                            <RequireAuth>
                                <MainLayout />
                            </RequireAuth>
                        }
                    >
                        <Route index path="/" element={<App />} />
                        <Route path="/bingo" element={<BingoPage />} />
                        <Route path="/leaderboard" element={<LeaderboardPage />} />
                        <Route path="/profile" element={<ProfilePage />} />
                    </Route>
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    </StrictMode>,
);

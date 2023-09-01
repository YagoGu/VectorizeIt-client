import "./App.css";
import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage/HomePage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import SignupPage from "./pages/SignupPage/SignupPage";
import LoginPage from "./pages/LoginPage/LoginPage";

import Navbar from "./components/Navbar/Navbar";
import IsPrivate from "./components/IsPrivate/IsPrivate";
import IsAnon from "./components/IsAnon/IsAnon";

import GamePage from "./pages/GamePage/GamePage";
import PlayedGamesPage from "./pages/PlayedGamesPage/PlayedGamesPage";
import CreatedGamesPage from "./pages/CreatedGamesPage/CreatedGamesPage";
import ReviewsPage from "./pages/ReviewsPage/ReviewsPage";

function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />

        {/* user routes */}
        <Route
          path="/user/:idUser"
          element={
            <IsPrivate>
              <ProfilePage />
            </IsPrivate>
          }
        />

        <Route
          path="/user/:idUser/created-games"
          element={
            <CreatedGamesPage />
          }
        />

        {/* game routes */}
        <Route
          path="/game/:idGame"
          element={
              <GamePage />
          }
        />

        <Route
          path="/game/:idUser/played-games"
          element={
            <PlayedGamesPage />
          }
        />

        <Route
          path="/review/:idGame/all"
          element={
            <ReviewsPage />
          }
        />

        <Route
          path="/signup"
          element={
            <IsAnon>
              <SignupPage />
            </IsAnon>
          }
        />
        <Route
          path="/login"
          element={
            <IsAnon>
              <LoginPage />
            </IsAnon>
          }
        />
      </Routes>
    </div>
  );
}

export default App;

import { Route, Routes } from "react-router-dom";
import CreateJoinPage from "./pages/CreateJoinPage";
import RoomPage from "./pages/RoomPage";
import TablePage from "./pages/TablePage";
import ErrorPage from "./pages/ErrorPage";
import { GameProvider } from "./context/GameContext";
import "./App.css";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<CreateJoinPage />} />
    <Route path="/room" element={<RoomPage />} />
    <Route path="/table" element={<TablePage />} />
    <Route
      path="/400"
      element={
        <ErrorPage
          code="400"
          title="Bad Request"
          message="The table couldn't read that move. Check the room id and try again."
        />
      }
    />
    <Route
      path="/500"
      element={
        <ErrorPage
          code="500"
          title="Table Timeout"
          message="The dealer dropped the deck. Refresh or head back to the lobby."
        />
      }
    />
    <Route
      path="*"
      element={
        <ErrorPage
          code="400"
          title="Bad Request"
          message="The table couldn't read that move. Check the room id and try again."
        />
      }
    />
  </Routes>
);

const App = () => (
  <GameProvider>
    <AppRoutes />
  </GameProvider>
);

export default App;

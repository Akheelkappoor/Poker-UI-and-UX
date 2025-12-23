import { createContext, useContext } from "react";
import useGameController from "../hooks/useGameController";

const GameContext = createContext(null);

export const useGame = () => {
  const ctx = useContext(GameContext);
  if (!ctx) {
    throw new Error("useGame must be used inside GameProvider");
  }
  return ctx;
};

export const GameProvider = ({ children }) => {
  const value = useGameController();
  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

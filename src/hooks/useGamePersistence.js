import { useEffect } from "react";
import { STORAGE_KEY } from "../utils/gameStateStorage";

const useGamePersistence = (payload, deps) => {
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  }, deps);
};

export default useGamePersistence;

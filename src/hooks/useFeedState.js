import { useState } from "react";
import { initialFeed } from "../utils/gameStateStorage";

const useFeedState = (persistedFeed) => {
  const [feed, setFeed] = useState(persistedFeed || initialFeed);
  const [toasts, setToasts] = useState([]);

  const updateFeed = (label, detail) => {
    setFeed((prev) => [{ label, detail }, ...prev].slice(0, 5));
    const toast = {
      id: `${Date.now()}-${Math.random()}`,
      title: label,
      detail,
    };
    setToasts((prev) => [toast, ...prev].slice(0, 3));
    setTimeout(() => {
      setToasts((prev) => prev.filter((item) => item.id !== toast.id));
    }, 3200);
  };

  return { feed, setFeed, toasts, updateFeed };
};

export default useFeedState;

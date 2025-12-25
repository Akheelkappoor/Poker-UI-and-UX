import { useEffect, useRef } from "react";

const useRoundAnnouncement = (phase, setRoundModal) => {
  const prevPhase = useRef(phase);

  useEffect(() => {
    if (!phase || prevPhase.current === phase) {
      return;
    }
    setRoundModal({ open: true, label: phase });
    prevPhase.current = phase;
    const timer = setTimeout(() => {
      setRoundModal({ open: false, label: "" });
    }, 2200);
    return () => clearTimeout(timer);
  }, [phase, setRoundModal]);
};

export default useRoundAnnouncement;

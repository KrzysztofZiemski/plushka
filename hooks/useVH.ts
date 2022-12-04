import { useEffect } from "react";
import { isClient } from "../utils/next";

function setDocHeight() {
  document.documentElement.style.setProperty(
    "--vh",
    `${window.innerHeight / 100}px`
  );
}

export const useVH = () => {
  useEffect(() => {
    if (!isClient()) return;
    
    setDocHeight();
    window.addEventListener("resize", function () {
      setDocHeight();
    });
    window.addEventListener("orientationchange", function () {
      setDocHeight();
    });
  }, []);
};

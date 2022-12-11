import React, { useEffect, useState } from "react";

const stopScroll = (stoppedPosition: number) => {
  return () => window.scrollTo(0, stoppedPosition);
};

export default function useStopScrolling(init?: boolean) {
  const [stopped, setStopped] = useState(!!init);

  useEffect(() => {
    const stop = stopScroll(window.scrollY);
    if (stopped) {
      window.addEventListener("scroll", stop);
    } else {
      window.removeEventListener("scroll", stop);
    }

    return () => {
      window.removeEventListener("scroll", stop);
    };
  }, [stopped]);

  return { stopped, setStopped };
}

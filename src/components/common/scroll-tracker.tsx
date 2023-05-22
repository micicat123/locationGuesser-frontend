import React, { useEffect } from "react";
import axios from "axios";
import logAction from "./log-action";

interface ScrollTrackerProps {
  children: React.ReactNode;
}

const ScrollTracker = ({ children }: ScrollTrackerProps) => {
  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    const handleScroll = () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      timeoutId = setTimeout(() => {
        logAction(
          "scroll",
          null,
          window.scrollY.toString(),
          window.location.pathname
        );
      }, 500);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  return <>{children}</>;
};

export default ScrollTracker;

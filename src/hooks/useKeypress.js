import { useEffect } from "react";
import store from "../redux/store";

// Add event listener when clicking on a key
export const useKeypress = (key, action) => {
  useEffect(() => {
    if (store.getState().maze.mazeContent) {
      function onKeyup(e) {
        if (e.key === key) action();
      }
      window.addEventListener("keyup", onKeyup);
      return () => window.removeEventListener("keyup", onKeyup);
    }
  }, [action, key]);
};

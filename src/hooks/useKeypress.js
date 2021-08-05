import { useEffect } from "react";
import store from "../redux/store";

export const useKeypress = (key, action) => {
  useEffect(() => {
    if (store.getState().app.isGameStarted) {
      function onKeyup(e) {
        if (e.key === key) action();
      }
      window.addEventListener("keyup", onKeyup);
      return () => window.removeEventListener("keyup", onKeyup);
    }
  }, [action, key]);
};

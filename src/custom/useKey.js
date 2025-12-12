import { useEffect } from "react";

export function useKey(key, fn) {
  useEffect(
    function () {
      function callback(e) {
        if (e.code === key) {
          fn();
        }
      }
      document.addEventListener("keydown", callback);

      return document.addEventListener("keydown", callback);
    },
    [key, fn]
  );
}

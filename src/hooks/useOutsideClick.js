import { useEffect } from "react";

export function useOutsideClick(refs, callback) {
  useEffect(() => {
    const handler = (e) => {
      const clickedOutsideAll = refs.every(
        (ref) => ref?.current && !ref.current?.contains(e.target)
      );
      if (clickedOutsideAll) {
        // callback();
      }
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [refs, callback]);
}

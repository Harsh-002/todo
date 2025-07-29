import { useEffect, useState } from "react";

export function useIsMobile(breakpoint = 599) {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth <= breakpoint : false
  );

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth <= breakpoint);
    }

    window.addEventListener("resize", handleResize);
    // Set on mount
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]);

  return isMobile;
}

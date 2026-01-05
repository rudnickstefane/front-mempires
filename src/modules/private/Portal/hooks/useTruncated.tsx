/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";

export const useTruncated = (dependencies: any[]) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isTruncated, setIsTruncated] = useState(false);

  useEffect(() => {
    const check = () => {
      requestAnimationFrame(() => {
        if (ref.current) {
          setIsTruncated(ref.current.scrollWidth > ref.current.clientWidth);
        }
      });
    };

    check();
    const timer = setTimeout(check, 350);
    window.addEventListener("resize", check);
    return () => {
      window.removeEventListener("resize", check);
      clearTimeout(timer);
    };
  }, dependencies);

  return { ref, isTruncated };
};

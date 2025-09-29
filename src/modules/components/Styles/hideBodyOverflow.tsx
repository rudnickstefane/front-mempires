import { useEffect } from "react";

const HideBodyOverflow = () => {
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  return null;
};

export default HideBodyOverflow;

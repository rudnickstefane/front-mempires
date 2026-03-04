import { useEffect, useState } from "react";

interface TextSwitcherItem {
  title: React.ReactNode;
  description: React.ReactNode;
}

export function useTextSwitcher(
  items: TextSwitcherItem[],
  intervalTime: number = 2000,
) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);

      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
        setFade(true);
      }, 600);
    }, intervalTime);

    return () => clearInterval(interval);
  }, [items, intervalTime]);

  return { ...items[currentIndex], fade };
}

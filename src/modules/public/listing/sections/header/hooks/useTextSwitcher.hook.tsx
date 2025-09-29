import { useEffect, useState } from 'react';

interface TextSwitcherItem {
    title: string;
    text: string;
    subtitle: string;
    description: JSX.Element;
}

export function useTextSwitcher(items: TextSwitcherItem[], intervalTime: number = 2000) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [fade, setFade] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setFade(false);

            setTimeout(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
                setFade(true);
            }, 500);

        }, intervalTime);

        return () => clearInterval(interval);
    }, [items, intervalTime]);

    return { title: items[currentIndex].title, text: items[currentIndex].text, subtitle: items[currentIndex].subtitle, description: items[currentIndex].description, fade };
}

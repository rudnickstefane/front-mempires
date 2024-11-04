import { useEffect, useState } from 'react';

interface TextSwitcherItem {
    text: string;
    description: JSX.Element;
}

function useTextSwitcher(items: TextSwitcherItem[], intervalTime: number = 2000) {
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

    return { text: items[currentIndex].text, description: items[currentIndex].description, fade };
}

export default useTextSwitcher;

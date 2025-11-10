import { Box, Button, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { SliderProps } from "./types/sliderAnnouncementProps.type";

const SLIDE_DURATION = 6000;

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

const Announcement = ({ slides, className }: SliderProps) => {
  // Função para embaralhar slides uma única vez
  function slideShuffleOnce<T>(slides: T[]): T[] {
    return shuffleArray(slides);
  }

  // Embaralha uma única vez por ciclo de vida do componente
  const shuffledSlidesRef = useRef<Array<typeof slides[0]>>(slideShuffleOnce(slides));
  const shuffledSlides = shuffledSlidesRef.current;

  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState<number[]>(Array(shuffledSlides.length).fill(0));
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const totalSlides = shuffledSlides.length;

  const resetTimeout = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  // Update progress when current slide changes
  useEffect(() => {
    setProgress(() => {
      const updated = Array(totalSlides).fill(0);
      for (let i = 0; i < totalSlides; i++) {
        if (i < current) updated[i] = 100; // Past slides: filled
        else if (i > current) updated[i] = 0; // Future slides: empty
        // Current slide: remains 0 to start animation
      }
      return updated;
    });
  }, [current, totalSlides]);

  const handlePrev = () => {
    resetTimeout();
    setCurrent((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const handleNext = useCallback(
    (auto = false) => {
      resetTimeout();
      const next = (current + 1) % totalSlides;

      if (auto && next === 0) {
        // Reset progress for all slides when looping back to the first slide
        setProgress(Array(totalSlides).fill(0));
        setTimeout(() => {
          setCurrent(0);
        }, 20);
      } else {
        setCurrent(next);
      }
    },
    [current, totalSlides]
  );

  // Auto-advance slides and animate current slide progress
  useEffect(() => {
    if (totalSlides === 0) return;

    resetTimeout();
    timeoutRef.current = setTimeout(() => {
      handleNext(true);
    }, SLIDE_DURATION);

    // Animate progress for the current slide
    const interval = setInterval(() => {
      setProgress((prev) => {
        const updated = [...prev];
        if (updated[current] < 100) updated[current] += 100 / (SLIDE_DURATION / 100); // Increment progress
        return updated;
      });
    }, 100);

    return () => {
      resetTimeout();
      clearInterval(interval);
    };
  }, [current, handleNext, totalSlides]);

  const handleDrag = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const startX = e.clientX;

    const handleMove = (moveEvent: MouseEvent) => {
      const delta = moveEvent.clientX - startX;
      if (Math.abs(delta) > 50) {
        if (delta > 0) handlePrev();
        else handleNext();
        cleanup();
      }
    };

    const cleanup = () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", cleanup);
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseup", cleanup);
  };

  return (
    <Box
      ref={containerRef}
      onMouseDown={handleDrag}
      className={`w-full h-full overflow-hidden relative group ${className}`}
    >
      {/* Slide atual */}
      {totalSlides > 0 ? (
        <a href={shuffledSlides[current].link} target="_blank" rel="noopener noreferrer">
          <img
            src={shuffledSlides[current].imageUrl}
            alt={`Anúncio ${current + 1}`}
            className="absolute w-full h-full object-cover select-none"
            draggable={false}
          />
        </a>
      ) : (
        <Box className="w-full h-full flex items-center justify-center bg-[var(--sponsor-surface)]">
          <Typography className="!text-[.85rem]">Espaço para anúncios</Typography>
        </Box>
      )}

      {/* Arrows centered vertically */}
      {totalSlides > 1 && (
        <Box className='opacity-0 group-hover:opacity-100 transition duration-300 h-full flex items-center'>
          <Button
            onClick={handlePrev}
            className="!absolute left-2 !bg-[#edecf2] !text-black !rounded-full h-8 !min-w-8 flex items-center justify-center shadow-xl"
          >
            <MdKeyboardArrowLeft />
          </Button>
          <Button
            onClick={() => handleNext()}
            className="!absolute right-2 !bg-[#edecf2] !text-black !rounded-full h-8 !min-w-8 flex items-center justify-center shadow-xl"
          >
            <MdKeyboardArrowRight />
          </Button>
        </Box>
      )}

      {/* Progress bars on top */}
      <Box className="absolute bottom-4 left-4 right-4 flex gap-2 z-1">
        {shuffledSlides.map((_, index) => (
          <Box key={index} className="flex-1 h-1 bg-gray-500/30 rounded overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress[index]}%` }}
              transition={{ duration: 0 }}
              className="h-full bg-white/70"
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Announcement;
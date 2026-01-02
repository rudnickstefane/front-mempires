import { ArrowBack, ArrowForward } from '@mui/icons-material';
import { Box, IconButton } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface Slides {
  slideCode: string;
  image: string;
  path: string;
}

interface CarouselProps {
  autoSlide: boolean;
  autoSlideInterval: number;
  slides: Slides[];
  duration: number; // Duração da transição
  stopAutoPlayOnHover: boolean;
}

const Carousel: React.FC<CarouselProps> = ({
  autoSlide,
  autoSlideInterval,
  slides,
  duration,
  stopAutoPlayOnHover,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [paused, setPaused] = useState(false);

  // Função para avançar o slide
  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  // Função para voltar o slide
  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + slides.length) % slides.length
    );
  };

  // Controle do slide automático
  useEffect(() => {
    if (autoSlide && !paused) {
      const interval = setInterval(nextSlide, autoSlideInterval);
      return () => clearInterval(interval);
    }
  }, [autoSlide, paused, autoSlideInterval, nextSlide]);

  return (
    <Box
      className="relative w-full h-full overflow-hidden rounded-3xl justify-between"
      onMouseEnter={() => stopAutoPlayOnHover && setPaused(true)}
      onMouseLeave={() => stopAutoPlayOnHover && setPaused(false)}
    >
      <Box className="relative w-full">
        {slides.map((slide, index) => (
          <Box
            key={index}
            className={`absolute top-0 left-0 w-full transition-opacity duration-[${duration}ms] ease-in-out ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ transitionProperty: 'opacity' }}
          >
            <Link to={slide.path} target="_blank" className="block w-full">
              <img
                src={slide.image}
                alt={`Slide ${index}`}
                className="w-full h-[240px] object-cover mx-auto"  // Centraliza a imagem e define a altura
              />
            </Link>
          </Box>
        ))}
      </Box>

      <IconButton
        onClick={prevSlide}
        aria-label="Previous"
        className="!absolute top-1/2 left-4 transform -translate-y-1/2 bg-white rounded-full shadow-lg"
      >
        <ArrowBack />
      </IconButton>

      <IconButton
        onClick={nextSlide}
        aria-label="Next"
        className="!absolute top-1/2 right-4 transform -translate-y-1/2 bg-white rounded-full shadow-lg"
      >
        <ArrowForward />
      </IconButton>
    </Box>
  );
};

export default Carousel;

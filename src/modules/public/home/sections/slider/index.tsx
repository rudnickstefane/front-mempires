import { Box, Button, Skeleton, Typography } from "@mui/material";
import dailyCycle from "@sr/assets/images/daily-cycle-system.jpg";
import websiteOnline from "@sr/assets/images/website-online.jpg";
import { useAnimation } from "framer-motion";
import { Calendar, Share2 } from "lucide-react";
import * as motion from "motion/react-client";
import { useEffect, useRef, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useInView } from "react-intersection-observer";
import SwiperCore from "swiper";
import "swiper/css";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

SwiperCore.use([Navigation, Pagination, Autoplay]);

const HomeSlideComponent = () => {
  const swiperRef = useRef<SwiperCore | null>(null);
  const [filter, setFilter] = useState<'rent' | 'sale'>('rent');

  const properties = [
    {
      title: "Sistema de Ciclo Diário",
      description: 'O ambiente agora alterna entre dia e noite, afetando visibilidade, ambientação e estratégias de jogo.',
      tags: 'Novo Recurso',
      publishDate: "09 de novembro de 2025",
      forRent: true,
      imageCount: 2,
      image: dailyCycle
    },
    {
      title: "Bem-vindo ao site!",
      description: 'Nosso novo site acaba de entrar no ar! Explore as novidades, acompanhe atualizações e prepare-se para conquistar um novo mundo.',
      tags: 'Site',
      publishDate: "09 de novembro de 2025",
      forRent: true,
      featured: true,
      imageCount: 4,
      videoCount: 1,
      image: websiteOnline
    }
  ];

    const filteredProperties = properties.filter(p =>
    filter === 'rent' ? p.forRent : p.forSale
  );

  const slidesPerPage = 3;
  const [isDragging, setIsDragging] = useState(false);
  const totalSteps = Math.max(filteredProperties.length - slidesPerPage + 1, 1);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, [filter]);

  const { ref, inView } = useInView({
    triggerOnce: false, // Allow animations to replay on scroll
    threshold: 0.2,
  });

  const controls = useAnimation(); // Animation controls for parent container

  // Animation variants for the parent container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Stagger child animations
        when: "beforeChildren",
      },
    },
  };

  // Animation variants for child elements
  const childVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  // Animation variants for Swiper slides
  const slideVariants = {
    hidden: (index: number) => ({
      y: 50,
      opacity: 0,
      transition: { delay: index * 0.1 },
    }),
    visible: (index: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        delay: index * 0.1, // Cascade effect for slides
      },
    }),
  };

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [inView, controls]);

  return (
    <Box className="w-full">
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        <motion.div variants={childVariants}>
          <Typography
            className="!font-bold text-primary !text-[4rem] uppercase font-jost"
          >
            Últimas Novidades
          </Typography>
        </motion.div>
        <Box
          className={`${
            isDragging ? "cursor-grabbing" : "cursor-auto"
          } relative select-none`}
          onMouseEnter={() => swiperRef.current?.autoplay?.stop()}
          onMouseLeave={() => swiperRef.current?.autoplay?.start()}
        >
          {loading ? (
            <Box className="flex justify-center gap-8">
              {[...Array(3)].map((_, i) => (
                <Box
                  key={i}
                  className="rounded-2xl shadow-md overflow-hidden w-[419.33px] h-[444px]"
                >
                  <Skeleton
                    variant="rectangular"
                    height={256}
                    className="rounded-t-2xl w-full"
                  />
                  <Box className="p-4 !-mt-2">
                    <Skeleton
                      variant="text"
                      className="w-full !h-[4rem]"
                      animation="wave"
                    />
                    <Skeleton
                      variant="text"
                      className="w-full !h-[2rem] !-mt-2"
                      animation="wave"
                    />
                    <Skeleton
                      variant="text"
                      className="w-full !h-[2.7rem] !-mt-1.5"
                      animation="wave"
                    />
                    <Skeleton
                      variant="text"
                      className="w-full !h-[1.4rem] !-mt-1"
                      animation="wave"
                    />
                    <Skeleton
                      variant="text"
                      className="w-full !h-[1.4rem] !mt-1"
                      animation="wave"
                    />
                  </Box>
                </Box>
              ))}
            </Box>
          ) : (
            <Swiper
              key={filter}
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
              onSlideChange={(swiper) => {
                const realIndex = swiper.realIndex;
                const pageIndex = realIndex % totalSteps;
                setCurrentPage(pageIndex);
              }}
              loop={true}
              speed={800}
              spaceBetween={30}
              slidesPerView={1.1}
              onTouchStart={() => setIsDragging(true)}
              onTouchEnd={() => setIsDragging(false)}
              onMouseDown={() => setIsDragging(true)}
              onMouseUp={() => setIsDragging(false)}
              className={`${
                isDragging ? "cursor-grabbing" : "cursor-auto"
              } select-none`}
              breakpoints={{
                768: { slidesPerView: 2.1 },
                1024: { slidesPerView: slidesPerPage },
              }}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              modules={[Autoplay]}
            >
              {filteredProperties.map((property, index) => (
                <SwiperSlide key={index}>
                  <motion.div
                    custom={index}
                    variants={slideVariants}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                  >
                    <Box className="rounded-2xl shadow-md overflow-hidden p-3 bg-white my-12">
                      <Box className="relative">
                        <Box className='gradient-card-box rounded-xl' />
                        <img
                          src={property.image}
                          alt={property.title}
                          className="w-full h-64 object-cover rounded-xl"
                        />
                        <div className="absolute top-2 right-2 flex gap-2 items-center">
                          <div className="flex items-center bg-white text-xs px-2 py-1 rounded">
                            <Calendar className="w-4 h-4 mr-1" />
                            {property.publishDate}
                          </div>
                        </div>
                        <Box className="flex flex-col absolute bottom-0 p-4 gap-2 z-[1]">
                          <Box>
                            <Typography className="text-white !text-2xl !font-semibold !mb-2">
                              {property.title}
                            </Typography>
                            <Typography className="!text-sm text-gray-400">
                              {property.description}
                            </Typography>
                          </Box>
                          <Box className="flex justify-between gap-2">
                            {property.tags && (
                              <Typography className="bg-white !font-bold !text-xs px-2 py-1 rounded uppercase">
                                {property.tags}
                              </Typography>
                            )}
                            <button className="bg-white p-1 rounded-full">
                              <Share2 className="w-4 h-4" />
                            </button>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
          <motion.div variants={childVariants}>
            <Box className="flex items-center justify-center gap-3 p-5">
              <Button
                onClick={() => swiperRef.current?.slidePrev()}
                variant="outlined"
                className="flex flex-row items-center !min-w-0 !rounded-full !min-h-0 w-[3rem] h-[3rem]"
              >
                <FaArrowLeft className="text-[1.25rem] color-primary" />
              </Button>
              <Box className="flex space-x-3 py-2 px-5 rounded-xl shadow-lg border-gray border">
                {Array.from({ length: totalSteps }).map((_, index) => (
                  <Box
                    key={index}
                    onClick={() => swiperRef.current?.slideToLoop(index)}
                    className={`flex justify-center items-center rounded-full cursor-pointer ${
                      currentPage === index
                        ? "w-4 h-4 border-blue-500 border-[2px]"
                        : "w-4 h-4 bg-transparent"
                    }`}
                  >
                    <Box
                      className={`w-2 h-2 rounded-full cursor-pointer ${
                        currentPage === index ? "bg-secondary" : "bg-blue-200"
                      }`}
                    />
                  </Box>
                ))}
              </Box>
              <Button
                onClick={() => swiperRef.current?.slideNext()}
                variant="outlined"
                className="flex flex-row items-center !min-w-0 !rounded-full !min-h-0 w-[3rem] h-[3rem]"
              >
                <FaArrowRight className="text-[1.25rem] color-primary" />
              </Button>
            </Box>
          </motion.div>
        </Box>
      </motion.div>
    </Box>
  );
};

export default HomeSlideComponent;
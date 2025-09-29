import { Box, Button, Skeleton, Typography } from "@mui/material";
import { useAnimation } from "framer-motion";
import { Camera, Heart, Share2, Star } from "lucide-react";
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
      title: "Villa on Hollywood Boulevard",
      location: "Hatteras Lane, Hollywood, FL 33019, USA",
      type: "Villa",
      price: "$740,000",
      beds: 3,
      baths: 4,
      garages: 4,
      area: "4530 sq ft",
      added: "June 13, 2022",
      forSale: true,
      featured: true,
      trendy: true,
      imageCount: 8,
      videoCount: 1,
      image: "/img1.jpg"
    },
    {
      title: "1",
      location: "Sunset Drive, Miami, FL, USA",
      type: "Shop",
      price: "$2,600 / Monthly",
      area: "950 Sq Ft",
      added: "June 12, 2022",
      forRent: true,
      imageCount: 2,
      videoCount: 1,
      image: "/img2.jpg"
    },
    {
      title: "2",
      location: "CocoWalk, 3015 Grand Avenue, Miami, USA",
      type: "Villa",
      price: "$4,750 / Monthly",
      beds: 4,
      baths: 4,
      garages: 4,
      area: "9350 sq ft",
      added: "June 11, 2022",
      forRent: true,
      featured: true,
      imageCount: 4,
      videoCount: 1,
      image: "/img3.jpg"
    },
    {
      title: "3",
      location: "CocoWalk, 3015 Grand Avenue, Miami, USA",
      type: "Villa",
      price: "$4,750 / Monthly",
      beds: 4,
      baths: 4,
      garages: 4,
      area: "9350 sq ft",
      added: "June 11, 2022",
      forRent: true,
      featured: true,
      imageCount: 4,
      videoCount: 1,
      image: "/img3.jpg"
    },
    {
      title: "4",
      location: "CocoWalk, 3015 Grand Avenue, Miami, USA",
      type: "Villa",
      price: "$4,750 / Monthly",
      beds: 4,
      baths: 4,
      garages: 4,
      area: "9350 sq ft",
      added: "June 11, 2022",
      forRent: true,
      featured: true,
      imageCount: 4,
      videoCount: 1,
      image: "/img3.jpg"
    },
    {
      title: "5",
      location: "CocoWalk, 3015 Grand Avenue, Miami, USA",
      type: "Villa",
      price: "$4,750 / Monthly",
      beds: 4,
      baths: 4,
      garages: 4,
      area: "9350 sq ft",
      added: "June 11, 2022",
      forRent: true,
      featured: true,
      imageCount: 4,
      videoCount: 1,
      image: "/img3.jpg"
    },
    {
      title: "6",
      location: "CocoWalk, 3015 Grand Avenue, Miami, USA",
      type: "Villa",
      price: "$4,750 / Monthly",
      beds: 4,
      baths: 4,
      garages: 4,
      area: "9350 sq ft",
      added: "June 11, 2022",
      forRent: true,
      featured: true,
      imageCount: 4,
      videoCount: 1,
      image: "/img3.jpg"
    },
    {
      title: "7",
      location: "CocoWalk, 3015 Grand Avenue, Miami, USA",
      type: "Villa",
      price: "$4,750 / Monthly",
      beds: 4,
      baths: 4,
      garages: 4,
      area: "9350 sq ft",
      added: "June 11, 2022",
      forRent: true,
      featured: true,
      imageCount: 4,
      videoCount: 1,
      image: "/img3.jpg"
    },
    {
      title: "8",
      location: "CocoWalk, 3015 Grand Avenue, Miami, USA",
      type: "Villa",
      price: "$4,750 / Monthly",
      beds: 4,
      baths: 4,
      garages: 4,
      area: "9350 sq ft",
      added: "June 11, 2022",
      forRent: true,
      featured: true,
      imageCount: 4,
      videoCount: 1,
      image: "/img3.jpg"
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
    <Box className="w-full mt-12">
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        <motion.div variants={childVariants}>
          <Typography
            className="bg-[#E1E4F5] rounded-xl text-quintary p-2 px-5 max-w-fit !text-sm"
          >
            Anúncios Recentes
          </Typography>
        </motion.div>
        <Box className="flex flex-row py-5">
          <motion.div variants={childVariants}>
            <Button
              onClick={() => setFilter("rent")}
              variant="outlined"
              className={`transition-all duration-300 inline-block !px-7 !py-[.711rem] !rounded-l-xl !rounded-r-none !normal-case !text-[0.9375rem] ${
                filter === "rent" ? "button-primary" : "button-quaternary"
              }`}
            >
              Alugar
            </Button>
          </motion.div>
          <motion.div variants={childVariants}>
            <Button
              onClick={() => setFilter("sale")}
              variant="outlined"
              className={`transition-all duration-300 inline-block !px-7 !py-[.711rem] !rounded-r-xl !rounded-l-none !normal-case !text-[0.9375rem] ${
                filter === "sale" ? "button-primary" : "button-quaternary"
              }`}
            >
              Comprar
            </Button>
          </motion.div>
        </Box>

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
                    <Box className="rounded-2xl shadow-md overflow-hidden">
                      <div className="relative">
                        <img
                          src={property.image}
                          alt={property.title}
                          className="w-full h-64 object-cover"
                        />
                        <div className="absolute top-2 left-2 flex gap-2">
                          {property.forSale && (
                            <span className="bg-white text-xs px-2 py-1 rounded">
                              For Sale
                            </span>
                          )}
                          {property.forRent && (
                            <span className="bg-white text-xs px-2 py-1 rounded">
                              For Rent
                            </span>
                          )}
                          {property.featured && (
                            <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded">
                              Featured
                            </span>
                          )}
                          {property.trendy && (
                            <span className="bg-yellow-500 text-white text-xs px-2 py-1 rounded">
                              Trendy
                            </span>
                          )}
                        </div>
                        <div className="absolute top-2 right-2 flex gap-2 items-center">
                          <div className="flex items-center bg-white text-xs px-2 py-1 rounded">
                            <Camera className="w-4 h-4 mr-1" />
                            {property.imageCount}
                          </div>
                          <div className="flex items-center bg-white text-xs px-2 py-1 rounded">
                            <Star className="w-4 h-4 mr-1" />
                            {property.videoCount}
                          </div>
                        </div>
                        <div className="absolute bottom-2 right-2 flex gap-2">
                          <button className="bg-white p-1 rounded-full">
                            <Heart className="w-4 h-4" />
                          </button>
                          <button className="bg-white p-1 rounded-full">
                            <Share2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <Box className="p-4">
                        <h3 className="text-lg font-semibold">
                          {property.title}
                        </h3>
                        <p className="text-xs text-gray-500 flex items-center">
                          <span className="mr-1">📍</span>
                          {property.location}
                        </p>
                        <p className="text-sm text-gray-700 mt-2">
                          {property.type}
                        </p>
                        <p className="text-lg font-bold text-blue-600 mt-2">
                          {property.price}
                        </p>
                        <div className="flex text-xs text-gray-500 gap-4 mt-2">
                          {property.beds && <>🛏 {property.beds}</>}
                          {property.baths && <>🛁 {property.baths}</>}
                          {property.garages && <>🚗 {property.garages}</>}
                          <span>{property.area}</span>
                        </div>
                        <p className="text-xs text-gray-400 mt-2">
                          Added: {property.added}
                        </p>
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
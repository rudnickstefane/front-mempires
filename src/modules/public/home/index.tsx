import { Box, Typography } from "@mui/material";
import Announcement from "@sr/modules/components/sliders/announcement";
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useInView } from 'react-intersection-observer';
import '../../../input.css';
import Footer from "../../components/Footer";
import { HomeHeader } from "./sections/header";

export default function Home() {

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
        staggerChildren: 0.3, // Stagger child animations
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

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [inView, controls]);

  const slides = [
    { id: 1, imageUrl: "@sr/modules/assets/images/header-box.png", link: "#" },
  ];

  return (
    <>
      <HomeHeader />
      <Box className='p-5'>
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          <Box className="-mt-36 bg-secondary rounded-3xl w-full p-16 flex flex-row items-center">
            <motion.div variants={childVariants} className='w-full'>
              <img
                src=''
                alt='Uma pessoa com um celular no colo e seu gato olhando para a janela'
                className="w-full h-auto"
              />
            </motion.div>
            <motion.div variants={childVariants} className='w-full'>
              <Box className='text-white'>
                <Typography variant="h4" className="text-white !font-bold !mb-6">
                  Do sofá da sua casa para o lar dos seus sonhos.
                </Typography>
                <Typography className="text-white">
                  Comunicação descomplicada, a gente conecta você ao imóvel ideal.
                </Typography>
              </Box>
            </motion.div>
          </Box>
        </motion.div>
        <Box className="bg-header-box rounded-3xl w-full md:w-[70rem] h-[30rem] flex flex-row items-end text-center">
          <motion.div variants={childVariants} className='w-full'>
            <Box className="w-full h-[30rem] flex items-center justify-center">
              <Announcement slides={slides} className='rounded-xl'/>
            </Box>
          </motion.div>
        </Box>
      </Box>
      <Footer />
    </>
  );
}
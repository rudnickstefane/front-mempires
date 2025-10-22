import { Box, Typography } from '@mui/material';
import { Logo } from '@sr/modules/common/ui/Logo';
import { motion, useAnimation } from 'framer-motion'; // Import Framer Motion
import { useEffect } from 'react';
import { FaDiscord, FaFacebook, FaInstagram, FaLinkedinIn, FaReddit, FaYoutube } from 'react-icons/fa';
import { SiX } from 'react-icons/si';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';

function Footer() {
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
        when: 'beforeChildren',
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
        ease: 'easeOut',
      },
    },
  };

  // Animation for nested links (e.g., social media, navigation)
  const linkVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: (index: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
        delay: index * 0.1, // Cascade effect for links
      },
    }),
  };

  // Animation for copyright section
  const copyrightVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
        delay: 0.6, // Delay to animate after main sections
      },
    },
  };

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    } else {
      controls.start('hidden');
    }
  }, [inView, controls]);

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={controls}
      className="flex flex-col justify-center"
    >
      <Box className="flex flex-col md:flex-row justify-center items-center py-32 px-20 pb-0 w-full">
        <motion.div variants={childVariants} className="mb-6 md:mb-0 mx-5 flex flex-col md:flex-col justify-center items-center">
          <Logo />
          <Box className="flex mt-7 space-x-4">
            {[
              { to: 'https://instagram.com/mobileempires', icon: <FaInstagram size={20} /> },
              { to: 'https://www.youtube.com/@mobileempires', icon: <FaYoutube size={20} /> },
              { to: 'https://x.com/mobilempires', icon: <SiX size={20} /> },
              { to: 'https://linkedin.com/company/mobileempires', icon: <FaLinkedinIn size={17} /> },
              { to: 'https://www.facebook.com/mobileempires/', icon: <FaFacebook size={20} /> },
              { to: 'https://discord.gg/TYz9EWXBw', icon: <FaDiscord size={20} /> },
              { to: 'https://www.reddit.com/r/mobileempires/', icon: <FaReddit size={20} /> },
            ].map((link, index) => (
              <motion.div key={index} custom={index} variants={linkVariants}>
                <Link
                  to={link.to}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-midia p-3 rounded-full transition-colors duration-300 !w-10 !h-10 flex justify-center items-center"
                >
                  {link.icon}
                </Link>
              </motion.div>
            ))}
          </Box>
        </motion.div>
      </Box>
      <motion.div variants={copyrightVariants} className="flex text-center color-secondary h-[92px] items-center justify-center">
        <Typography className="!text-sm">
          Copyright © {new Date().getFullYear()} Mobile Empires.
        </Typography>
      </motion.div>
    </motion.div>
  );
}

export default Footer;
import { Box, Typography } from '@mui/material';
import { Logo } from '@sr/modules/common/ui/Logo';
import { motion, useAnimation } from 'framer-motion'; // Import Framer Motion
import { useEffect } from 'react';
import { FaInstagram, FaLinkedinIn } from 'react-icons/fa';
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
      <Box className="flex flex-col md:flex-row justify-center items-start py-32 px-20 pb-10 w-full">
        <motion.div variants={childVariants} className="mb-6 md:mb-0 mx-5 max-w-72">
          <Logo />
          <Typography className="!mt-5 color-secondary !text-sm">
            Alugar ou comprar um imóvel não precisa ser complicado.
          </Typography>
          <Box className="flex mt-7 space-x-4">
            {[
              { to: 'https://linkedin.com/company/alugabem', icon: <FaLinkedinIn size={17} /> },
              { to: 'https://instagram.com/alugabem', icon: <FaInstagram size={20} /> },
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
        <motion.div variants={childVariants} className="mb-6 md:mb-0 md:mx-7">
          <Typography className="!text-[22px] !font-semibold color-primary after-arrow">
            Empresa
          </Typography>
          <Box className="mt-5 space-y-2 leading-8 flex flex-col">
            {[
              { to: '/carreiras', text: 'Carreiras' },
              { to: '/parceiros', text: 'Parceiros' },
              { to: '/quem-somos', text: 'Quem Somos' },
            ].map((link, index) => (
              <motion.div key={index} custom={index} variants={linkVariants}>
                <Link
                  to={link.to}
                  className="color-secondary transition-colors duration-300"
                >
                  {link.text}
                </Link>
              </motion.div>
            ))}
          </Box>
        </motion.div>
        <motion.div variants={childVariants} className="mb-6 md:mb-0 md:mx-10">
          <Typography className="!text-[22px] !font-semibold color-primary after-arrow">
            Serviços
          </Typography>
          <Box className="mt-5 space-y-2 leading-8 flex flex-col">
            {[
              { to: 'anunciar/alugar-meu-imovel', text: 'Anunciar meu imóvel' },
              { to: 'anunciar/vender-meu-imovel', text: 'Vender meu imóvel' },
            ].map((link, index) => (
              <motion.div key={index} custom={index} variants={linkVariants}>
                <Link
                  to={link.to}
                  className="color-secondary transition-colors duration-300"
                >
                  {link.text}
                </Link>
              </motion.div>
            ))}
          </Box>
        </motion.div>
        <motion.div variants={childVariants} className="mb-6 md:mb-0">
          <Typography className="!text-[22px] !font-semibold color-primary after-arrow">
            Ficou com alguma dúvida?
          </Typography>
          <Typography className="!my-5 color-secondary flex items-center">
            Entre em contato para mais informações ou<br />se tiver qualquer problema.
          </Typography>
          <motion.div custom={0} variants={linkVariants}>
            <Link
              to="mailto:suporte@alugabem.com.br"
              className="mt-2 flex items-center color-primary transition-colors duration-300"
            >
              suporte@alugabem.com.br
            </Link>
          </motion.div>
        </motion.div>
      </Box>
      <motion.div variants={copyrightVariants} className="flex text-center color-secondary h-[92px] items-center justify-center">
        <Typography className="!text-sm">
          Copyright © {new Date().getFullYear()} AlugaBem.
        </Typography>
      </motion.div>
    </motion.div>
  );
}

export default Footer;
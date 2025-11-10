import { Box, Link } from '@mui/material';
import * as motion from "motion/react-client";

export function Logo() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.9,
        delay: 0.3,
        ease: [0, 0.71, 0.2, 1.01],
      }}
    >
      <Link href="/" className="!no-underline flex flex-row items-center">
        <Box className="flex flex-col items-center">
          <Box className='clean-logo' />
          <Box className="text-[.75rem] uppercase font-bold text-primary">Legacy Rising</Box>
        </Box>
      </Link>
    </motion.div>
  );
}
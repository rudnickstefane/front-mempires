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
        <Box className="flex flex-col items-center font-nsr">
          <Box className="text-[1.8rem] color-primary font-bold uppercase flex flex-row items-end">m<Box className="text-[1.6rem]">obil</Box>e</Box>
          <Box className="-mt-[.95rem] text-[1.8rem] color-primary font-bold uppercase flex flex-row items-end">e<Box className="text-[1.6rem]">mpire</Box>s</Box>
        </Box>
      </Link>
    </motion.div>
  );
}
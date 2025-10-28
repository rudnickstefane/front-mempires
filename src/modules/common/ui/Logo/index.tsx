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
          <Box className='flex flex-row'>
            <Box className="text-[1.8rem] color-primary font-bold uppercase flex flex-row items-end">m<Box className="text-[1.6rem]">obile</Box></Box>
            <Box className="text-[1.8rem] color-primary font-bold uppercase flex flex-row items-end ml-2.5">e<Box className="text-[1.6rem]">mpires</Box></Box>
          </Box>
          <Box className="-mt-[.35rem] text-[1rem] uppercase font-bold text-primary">Legacy Rising</Box>
        </Box>
      </Link>
    </motion.div>
  );
}
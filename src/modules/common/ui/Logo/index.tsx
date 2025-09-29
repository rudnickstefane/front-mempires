import { Box, Link } from '@mui/material';
import IconLogo from '@sr/modules/assets/svg/icon.svg?react';
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
        <Box className="w-[2.7rem] h-full overflow-hidden">
          <IconLogo
            className="w-[4.2rem] h-full mt-1 -translate-x-4 text-secondary"
            aria-label="Ícone do logo"
          />
        </Box>
        <Box className="flex flex-col items-end">
          <Box className="text-[1.7rem] color-primary font-bold">alugabem</Box>
          <Box className="-mt-[.35rem] text-[.6rem] text-primary font-bold uppercase">do jeito certo</Box>
        </Box>
      </Link>
    </motion.div>
  );
}
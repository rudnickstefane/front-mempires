import { Box, Link } from "@mui/material";
import * as motion from "motion/react-client";

export function Logo({ size = "text-6xl", color = "color-primary" }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 1 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.9,
        delay: 0.3,
        ease: [0, 0.71, 0.2, 1.01],
      }}
    >
      <Link
        href="/"
        className="!no-underline flex flex-row w-full items-end justify-end"
      >
        <Box className="flex flex-col items-left ">
          <Box className={`flex items-center font-galada ${size} ${color}`}>
            BenefyCare
          </Box>
        </Box>
      </Link>
    </motion.div>
  );
}

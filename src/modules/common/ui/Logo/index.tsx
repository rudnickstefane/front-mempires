import { Box, Link } from "@mui/material";
import { AnimatePresence } from "framer-motion";
import * as motion from "motion/react-client";

interface LogoProps {
  className?: string;
  isApp?: boolean;
  isCollapsed?: boolean;
  animated?: boolean;
}

export function Logo({
  className = "text-6xl color-primary",
  isApp = false,
  isCollapsed = false,
  animated = true,
}: LogoProps) {
  const LogoContent = (
    <Link
      href={isApp ? "/portal" : "/"}
      className="!no-underline flex flex-row w-full items-center"
    >
      <Box className="flex flex-row items-center">
        {isApp && (
          <Box
            className={`relative flex items-center justify-center font-galada text-white bg-primary rounded-2xl w-12 h-12 overflow-hidden
            ${!isCollapsed && "mr-2"}
          `}
          >
            <AnimatePresence mode="wait">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="flex items-center justify-center w-full h-full"
              >
                <span className="pt-2 text-3xl">B</span>
              </motion.div>
            </AnimatePresence>
          </Box>
        )}

        {!isCollapsed && (
          <Box className={`font-posterama !text-2xl mt-[0.4rem] ${className}`}>
            Benefy
            <Box className="relative inline-block">
              Care
              <Box className="absolute left-[26.2px] -translate-x-1/2 top-[22px] bg-primary w-[7px] h-[3px] rounded-xl rounded-b-md" />
            </Box>
          </Box>
        )}
      </Box>
    </Link>
  );

  if (!animated) return <Box>{LogoContent}</Box>;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.9 }}
    >
      {LogoContent}
    </motion.div>
  );
}

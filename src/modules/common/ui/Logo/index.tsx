import { Box, Link } from "@mui/material";
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
      className="!no-underline flex flex-row w-full items-end justify-end"
    >
      <Box className="flex flex-row items-center">
        {isApp && (
          <Box
            className={`flex items-center justify-center font-galada text-white bg-[var(--color-primary)] text-3xl rounded-2xl w-12 !h-12 pt-2
            ${!isCollapsed && "mr-2"}
          `}
          >
            B
          </Box>
        )}
        {!isCollapsed && (
          <Box className={`font-galada mt-[0.4rem] ${className}`}>
            BenefyCare
          </Box>
        )}
      </Box>
    </Link>
  );

  if (!animated) return <Box>{LogoContent}</Box>;

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
      {LogoContent}
    </motion.div>
  );
}

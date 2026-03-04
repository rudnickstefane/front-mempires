import { Box, Link } from "@mui/material";
import { AnimatePresence } from "framer-motion";
import { BookSaved, Health, Heart, Timer1 } from "iconsax-react"; // Importando ícones que remetem aos seus temas
import * as motion from "motion/react-client";
import { useEffect, useState } from "react";

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
  const [index, setIndex] = useState(0);

  // Lista de itens que vão rotacionar dentro do quadrado
  const items = [
    { type: "text", content: "B" },
    { type: "icon", content: <Heart variant="Bold" size={28} /> },
    { type: "icon", content: <Health variant="Bold" size={28} /> },
    { type: "icon", content: <BookSaved variant="Bold" size={28} /> },
    { type: "icon", content: <Timer1 variant="Bold" size={28} /> },
  ];

  useEffect(() => {
    if (animated) {
      const timer = setInterval(() => {
        setIndex((prev) => (prev + 1) % items.length);
      }, 3000); // Troca a cada 3 segundos
      return () => clearInterval(timer);
    }
  }, [animated, items.length]);

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
                key={index}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="flex items-center justify-center w-full h-full"
              >
                {items[index].type === "text" ? (
                  <span className="pt-2 text-3xl">{items[index].content}</span>
                ) : (
                  <Box className="flex items-center justify-center">
                    {items[index].content}
                  </Box>
                )}
              </motion.div>
            </AnimatePresence>
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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.9 }}
    >
      {LogoContent}
    </motion.div>
  );
}

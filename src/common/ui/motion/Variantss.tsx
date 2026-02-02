import { Variants } from "framer-motion";

export const presets: Record<string, Variants> = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15, // Tempo entre cada item
        delayChildren: 0.3, // Atraso antes de começar o primeiro
      },
    },
  },
  itemUp: {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  },
  itemLeft: {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
  },
  header: {
    hidden: { y: -10, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  },
  itemScale: {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 1, ease: "easeOut" },
    },
  },
  progress: {
    hidden: { width: 0 },
    visible: (custom: number) => ({
      width: `${custom}%`,
      transition: { duration: 0.8, delay: 0.3 },
    }),
  },
};

import { Variants } from "framer-motion";

export type AnimationType =
  | "container"
  | "item"
  | "fadeLeft"
  | "fadeDown"
  | "scale"
  | "progressBar";

// Suas variantes atuais preservadas
export const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      when: "beforeChildren",
    },
  },
};

export const childVariants: Variants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

export const animations: Record<string, Variants> = {
  container: containerVariants,
  item: childVariants,
  fadeLeft: {
    hidden: { opacity: 0, x: -15 },
    visible: { opacity: 1, x: 0 },
  },
  fadeDown: {
    hidden: { opacity: 0, y: -15 },
    visible: { opacity: 1, y: 0 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.9, ease: [0, 0.71, 0.2, 1.01] },
    },
  },
};

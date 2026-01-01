import { motion } from "framer-motion";
import { ReactNode } from "react";
import { containerVariants } from "./Variants";

interface AnimatedContainerProps {
  children: ReactNode;
  className?: string;
  threshold?: number;
  once?: boolean;
}

export function AnimatedContainer({
  children,
  className,
  threshold = 0.2,
  once = true,
}: AnimatedContainerProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: once,
        amount: threshold,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

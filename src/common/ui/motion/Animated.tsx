import { HTMLMotionProps, motion } from "framer-motion";
import { animations, AnimationType } from "./Variants";

interface AnimatedProps extends HTMLMotionProps<"div"> {
  type?: AnimationType;
  delay?: number;
  progress?: number;
  once?: boolean;
}

export function Animated({
  children,
  type = "item",
  delay = 0,
  progress,
  className,
  once = true,
  style,
  ...props
}: AnimatedProps) {
  if (type === "progressBar") {
    return (
      <motion.div
        className={className}
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.8, delay: 0.3 + delay }}
        {...props}
      />
    );
  }

  return (
    <motion.div
      variants={animations[type]}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.1 }}
      transition={{ delay }}
      className={className}
      style={{ display: "contents", ...style }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

import { HTMLMotionProps, motion } from "framer-motion";
import { animations, AnimationType } from "./Variants";

interface AnimatedProps extends HTMLMotionProps<"div"> {
  type?: AnimationType;
  delay?: number;
  progress?: number; // Exclusivo para barra de progresso
  once?: boolean;
}

export function Animated({
  children,
  type = "item", // Padrão é o seu childVariants
  delay = 0,
  progress,
  className,
  once = true,
  ...props
}: AnimatedProps) {
  // Caso especial: Barra de Progresso
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
      viewport={{ once: once, amount: 0.2 }}
      transition={{
        delay: delay,
        // Se for o seu 'item' padrão, ele já tem transition interna,
        // mas aqui permitimos sobrescrever o delay se necessário.
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

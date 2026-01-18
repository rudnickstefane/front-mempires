/* eslint-disable @typescript-eslint/no-explicit-any */
import { HTMLMotionProps, motion } from "framer-motion";
import { presets } from "./Variantss";

interface AnimatedProps extends HTMLMotionProps<"div"> {
  variant?: keyof typeof presets;
  delay?: number;
  custom?: any;
  isChild?: boolean;
  noAnimate?: boolean;
  as?: any;
}

export function Animated({
  noAnimate,
  variant = "itemUp",
  children,
  delay = 0,
  custom,
  isChild = false,
  as = "div",
  ...props
}: AnimatedProps) {
  const Component = motion[as as keyof typeof motion] as any;

  if (noAnimate) {
    const Component = as;
    return <Component className={props.className}>{children}</Component>;
  }

  return (
    <Component
      variants={presets[variant]}
      initial={isChild ? undefined : "hidden"}
      whileInView={isChild ? undefined : "visible"}
      viewport={isChild ? undefined : { once: true, amount: 0.1 }}
      transition={{ delay }}
      custom={custom}
      {...props}
    >
      {children}
    </Component>
  );
}

import { Card } from "@mui/material";
import { Animated } from "@sr/common/ui/motion";

interface CardBoxProps {
  children: React.ReactNode;
}

export const CardView = ({ children }: CardBoxProps) => {
  return (
    <Animated variant="itemUp" isChild className="w-full">
      <Card
        className={`bg-white !rounded-2xl p-6 !border-0 !shadow-soft hover:!shadow-lg transition-all duration-300 w-full h-full `}
      >
        {children}
      </Card>
    </Animated>
  );
};

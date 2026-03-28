import { Box, Collapse, Fade } from "@mui/material";
import { ShowProps } from "@sr/common/types";

export function Show(props: ShowProps) {
  const { hidden, children } = props;

  return (
    <Collapse in={!hidden} unmountOnExit timeout={300} className="w-full">
      <Fade in={!hidden} timeout={400}>
        {/* Adicionamos um Box para garantir que o layout interno 
            não quebre durante a animação de altura */}
        <Box className="flex flex-col gap-6">{children}</Box>
      </Fade>
    </Collapse>
  );
}

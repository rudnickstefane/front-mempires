import { Box, Collapse, Fade } from "@mui/material";
import { ShowProps } from "@sr/common/types";

export function Show(props: ShowProps) {
  if (!props.hidden && props.variant == "basic") {
    return <>{props.children}</>;
  }

  return (
    <Collapse in={!props.hidden} unmountOnExit timeout={300} className="w-full">
      <Fade in={!props.hidden} timeout={400}>
        <Box
          className={`${props.variant === "effect" ? "" : "flex flex-col gap-6"}`}
        >
          {props.children}
        </Box>
      </Fade>
    </Collapse>
  );
}

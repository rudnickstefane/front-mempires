import { Box } from "@mui/material";
import { Typography } from "@sr/common/iu/components/Typography/Typography";
import { Animated } from "@sr/common/ui/motion";

interface DataRowProps {
  label: string;
  value?: string | number;
  description?: string;
  isBox?: boolean;
  variant?: string;
  isChild?: boolean;
  noAnimate?: boolean;
}

export function CardText({
  label,
  value,
  description,
  isBox,
  variant,
  isChild,
  noAnimate,
}: DataRowProps) {
  return (
    <>
      <Animated variant={variant} isChild={isChild} noAnimate={noAnimate}>
        <Typography
          translateId={label}
          className={`text-neutral-700 font-manrope !text-sm flex flex-row items-center gap-1.5 ${
            isBox ? "!py-1.5" : "!mt-4"
          }`}
        >
          {description && (
            <Box className="text-[11px] text-neutral-500 bg-neutral-100 px-1.5 pt-[0.22rem] pb-[0.2rem] rounded">
              <Typography
                translateId={description}
                className="text-[11px] font-manrope"
              />
            </Box>
          )}
        </Typography>
      </Animated>
      <Animated variant={variant} isChild={isChild} noAnimate={noAnimate}>
        <Typography
          className={`text-neutral-900 font-manrope !font-semibold text-sm break-words overflow-hidden ${
            isBox ? "!py-1.5" : "!mt-4"
          }`}
        >
          {value || "-"}
        </Typography>
      </Animated>
    </>
  );
}

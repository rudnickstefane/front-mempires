import { Box, Typography } from "@mui/material";
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

export function GridText({
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
          className={`text-neutral-700 !font-poppins !text-sm flex flex-row items-center gap-1.5 ${
            isBox ? "!py-1.5" : "!mt-4"
          }`}
        >
          {label}
          {description && (
            <Box className="text-[11px] text-neutral-500 bg-neutral-100 px-1.5 py-[0.1rem] rounded">
              {description}
            </Box>
          )}
        </Typography>
      </Animated>
      <Animated variant={variant} isChild={isChild} noAnimate={noAnimate}>
        <Typography
          className={`!text-neutral-900 !font-poppins !font-semibold !text-sm break-words overflow-hidden ${
            isBox ? "!py-1.5" : "!mt-4"
          }`}
        >
          {value || "-"}
        </Typography>
      </Animated>
    </>
  );
}

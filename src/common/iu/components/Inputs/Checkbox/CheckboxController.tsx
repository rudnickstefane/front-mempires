import { Box, Checkbox, FormControlLabel, FormHelperText } from "@mui/material";
import { CheckboxControllerProps } from "@sr/common/types";
import { TickSquare } from "iconsax-react";
import { Typography } from "../../Typography";

export function CheckboxController({
  label,
  variant = "default",
  error,
  errorMessage,
  checked,
  onValueChange,
  ...props
}: CheckboxControllerProps) {
  const isChecked = !!checked;

  const CustomIcon = isChecked ? (
    <TickSquare size={24} variant="Bold" className="text-primary mt-0.5" />
  ) : (
    <Box className="mt-[4px] mx-0.5 w-5 h-5 rounded-md border-solid border flex-shrink-0 transition-colors bg-white border-neutral-300" />
  );

  if (variant === "card") {
    return (
      <Box className="flex flex-col gap-1 w-full">
        <Box
          onClick={() => onValueChange?.(!isChecked)}
          className={`flex items-start gap-3 p-4 rounded-2xl border transition-all cursor-pointer ${
            isChecked
              ? "bg-primary/5 border-primary/20"
              : "bg-neutral-50 border-neutral-200"
          } ${error ? "border-red-500 bg-red-50/10" : ""}`}
        >
          {CustomIcon}
          <Box className="flex-1">
            {typeof label === "string" ? (
              <Typography className="!text-xs !text-neutral-600 !leading-relaxed !font-manrope">
                {label}
              </Typography>
            ) : (
              label
            )}
          </Box>
        </Box>
        {errorMessage && (
          <FormHelperText error className="ml-2 !font-manrope">
            {errorMessage}
          </FormHelperText>
        )}
      </Box>
    );
  }

  return (
    <Box>
      <FormControlLabel
        className="!ml-0"
        control={
          <Checkbox
            {...props}
            checked={isChecked}
            onChange={(e) => onValueChange?.(e.target.checked)}
            icon={
              <Box className="mx-0.5 w-5 h-5 rounded-md border-solid border bg-white border-neutral-300" />
            }
            checkedIcon={
              <TickSquare size={24} variant="Bold" className="text-primary" />
            }
            disableRipple
            className="!p-0 !mr-3"
          />
        }
        label={
          typeof label === "string" ? (
            <Typography className="!text-sm !text-neutral-700 !font-manrope">
              {label}
            </Typography>
          ) : (
            label
          )
        }
      />
      {errorMessage && (
        <FormHelperText error className="!font-manrope">
          {errorMessage}
        </FormHelperText>
      )}
    </Box>
  );
}

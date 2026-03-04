/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, TextField, Typography } from "@mui/material";
import { PinFieldProps } from "@sr/common/types";
import { ClipboardEvent, KeyboardEvent, useEffect, useRef } from "react";

export function PinField({ value, onChange, error, autoFocus }: PinFieldProps) {
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const digits = [0, 1, 2, 3, 4, 5];

  useEffect(() => {
    if (autoFocus) {
      const timer = setTimeout(() => {
        inputsRef.current[0]?.focus();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [autoFocus]);

  const handlePaste = (e: ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);
    onChange(pastedData);
    inputsRef.current[Math.min(pastedData.length, 5)]?.focus();
  };

  const handleChange = (val: string, index: number) => {
    const char = val.replace(/\D/g, "").slice(-1);
    if (!char && val !== "") return;

    const newValue = value.split("");
    newValue[index] = char;
    onChange(newValue.join(""));

    if (char && index < 5) inputsRef.current[index + 1]?.focus();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    const isBackspace = e.key === "Backspace";
    const isEmpty = !value[index];

    if (isBackspace && isEmpty && index > 0) {
      const newValue = value.split("");
      newValue[index - 1] = "";
      onChange(newValue.join(""));
      inputsRef.current[index - 1]?.focus();
    }
  };

  return (
    <Box className="flex items-center justify-center gap-2">
      {digits.map((index) => (
        <Box key={index} className="flex items-center gap-2">
          <TextField
            name={`otp_${index}`}
            inputRef={(el: any) => (inputsRef.current[index] = el)}
            value={value[index] || ""}
            error={error}
            onPaste={handlePaste}
            onChange={(e: any) => handleChange(e.target.value, index)}
            onKeyDown={(e: any) => handleKeyDown(e, index)}
            autoComplete="one-time-code"
            slotProps={{
              htmlInput: {
                maxLength: 1,
                inputMode: "numeric",
                style: {
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: "1.2rem",
                  padding: "12px 0",
                },
              },
            }}
            sx={{
              width: "48px",
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
                backgroundColor: "white",
                "& fieldset": { borderColor: error ? "#f44336" : "#E5E5E5" },
              },
            }}
          />
          {index === 2 && (
            <Typography className="!font-bold !text-neutral-400 !text-xl">
              -
            </Typography>
          )}
        </Box>
      ))}
    </Box>
  );
}

/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  MenuItem,
  Select as MuiSelect,
  SelectChangeEvent,
  SxProps,
} from "@mui/material";
import { ArrowDown2 } from "iconsax-react";

export type SelectOption = {
  label: string | number;
  value: string | number;
};

export type SelectProps = {
  value: string | number;
  onChange: (value: any) => void;
  options: SelectOption[];
  placeholder?: string;
  className?: string;
  sx?: SxProps;
  iconRight?: string | number;
};

export function Select({
  value,
  onChange,
  options,
  placeholder,
  className = "h-9 text-sm",
  sx,
  iconRight,
}: SelectProps) {
  const handleChange = (e: SelectChangeEvent<string | number>) => {
    onChange(e.target.value);
  };

  return (
    <MuiSelect
      value={value}
      displayEmpty
      onChange={handleChange}
      IconComponent={ArrowDown2}
      className={className}
      MenuProps={{
        slotProps: {
          paper: {
            className:
              "shadow-lg rounded-xl border border-gray-100 min-w-[220px] py-2",
          },
        },
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "left",
        },
        transformOrigin: {
          vertical: "top",
          horizontal: "left",
        },
      }}
      sx={{
        ...(iconRight && {
          "& .MuiSelect-icon": { right: `${iconRight} !important` },
        }),
        ...sx,
      }}
    >
      {placeholder && <MenuItem value="">{placeholder}</MenuItem>}

      {options.map((opt) => (
        <MenuItem key={opt.value} value={opt.value}>
          {opt.label}
        </MenuItem>
      ))}
    </MuiSelect>
  );
}

/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Switch, SwitchProps } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import { Typography } from "@sr/common/iu/components/Typography";

export interface CustomSwitchProps extends Omit<SwitchProps, "value"> {
  label?: string;
  styledSwitch?: boolean;
  isTable?: boolean; // Nova prop
}

export function CustomizedSwitch(props: Readonly<CustomSwitchProps>) {
  const {
    checked,
    disabled = false,
    label = "Ativo",
    styledSwitch,
    isTable, // Pegando a prop aqui
    onChange,
    ...rest
  } = props;

  // Estilo para a Tabela (28x16)
  const tableSx = {
    width: 28,
    height: 16,
    padding: 0,
    display: "flex",
    "& .MuiSwitch-switchBase": {
      padding: 0,
      left: 2,
      top: 2,
      transition: "transform 250ms cubic-bezier(0.4, 0, 0.2, 1)",
      "&.Mui-checked": {
        transform: "translateX(12px)",
        color: "#fff",
        "& + .MuiSwitch-track": {
          backgroundColor: "var(--color-primary)",
          opacity: 1,
          transition: "background-color 250ms",
        },
      },
    },
    "& .MuiSwitch-thumb": {
      width: 12,
      height: 12,
      backgroundColor: "#fff",
    },
    "& .MuiSwitch-track": {
      borderRadius: 16,
      backgroundColor: "#9e9e9e",
      opacity: 1,
      transition: "background-color 250ms",
    },
  };

  const styledSx = {
    width: 90,
    height: 45,
    padding: 1,
    "& .MuiSwitch-switchBase": {
      padding: 0,
      left: 11.5,
      top: "11px",
      transition: "transform 250ms cubic-bezier(0.4, 0, 0.2, 1)",
      "&.Mui-checked": {
        transform: "translateX(44px)",
        color: "#fff",
        "& + .MuiSwitch-track": {
          backgroundColor: "var(--color-primary)",
          opacity: 1,
        },
      },
    },
    "& .MuiSwitch-thumb": {
      boxSizing: "border-box",
      width: 23,
      height: 23,
      backgroundColor: "#fff",
      boxShadow: "0 2px 4px rgba(0,0,0,0.3)",
    },
    "& .MuiSwitch-track": {
      borderRadius: 22,
      backgroundColor: "#9e9e9e",
      opacity: 1,
      transition: "background-color 250ms",
      position: "relative",
      "&::before": {
        content: '"Sim"',
        position: "absolute",
        left: 14,
        top: "50%",
        transform: "translateY(-50%)",
        fontSize: 14,
        fontWeight: 600,
        color: "#fff",
        opacity: checked ? 1 : 0,
        transition: "opacity 0.2s",
      },
      "&::after": {
        content: '"Não"',
        position: "absolute",
        right: 14,
        top: "50%",
        transform: "translateY(-50%)",
        fontSize: 14,
        fontWeight: 600,
        color: "#fff",
        opacity: checked ? 0 : 1,
        transition: "opacity 0.2s background-color 250ms",
      },
    },
  };

  const defaultSx = {
    width: 44,
    height: 24,
    padding: 0,
    "& .MuiSwitch-switchBase": {
      padding: 0,
      left: 2,
      top: "2px",
      transitionDuration: "300ms",
      "&.Mui-checked": {
        transform: "translateX(20px)",
        color: "#fff",
        "& + .MuiSwitch-track": {
          backgroundColor: "var(--color-primary)",
          opacity: 1,
        },
      },
    },
    "& .MuiSwitch-thumb": {
      boxSizing: "border-box",
      width: 20,
      height: 20,
      backgroundColor: "#fff",
      boxShadow: "0 2px 4px rgba(0,0,0,0.3)",
    },
    "& .MuiSwitch-track": {
      borderRadius: 22,
      backgroundColor: "#9e9e9e",
      opacity: 1,
      position: "relative",
    },
  };

  const finalSx = isTable ? tableSx : styledSwitch ? styledSx : defaultSx;

  return (
    <Box className={styledSwitch ? "bg-gray-200 rounded-2xl pl-4 pr-1" : ""}>
      <FormGroup className={`${isTable ? "w-fit" : ""}`}>
        <FormControlLabel
          control={
            <Switch
              checked={checked}
              onChange={onChange}
              disabled={disabled}
              sx={finalSx}
              {...rest}
            />
          }
          labelPlacement={styledSwitch ? "start" : "end"}
          label={
            !isTable && (
              <Typography
                translateId={label}
                className={`ml-2 font-manrope text-neutral20 text-base ${
                  styledSwitch ? "font-bold" : "font-normal"
                }`}
              />
            )
          }
        />
      </FormGroup>
    </Box>
  );
}

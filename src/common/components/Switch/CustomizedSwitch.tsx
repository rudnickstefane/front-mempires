/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Switch, SwitchProps } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import { Typography } from "@sr/common/iu/components/Typography";

export interface CustomSwitchProps extends Omit<SwitchProps, "value"> {
  label?: string;
  styledSwitch?: boolean; // Nova prop para definir o visual
}

export function CustomizedSwitch(props: Readonly<CustomSwitchProps>) {
  const {
    checked,
    disabled = false,
    label = "Ativo",
    styledSwitch,
    onChange,
    ...rest
  } = props;

  const styledSx = {
    width: 90,
    height: 45,
    padding: 1,

    "& .MuiSwitch-switchBase": {
      padding: 0,
      left: 11.5,
      top: "11px",
      transitionDuration: "300ms",

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
        transition: "opacity 0.2s",
      },
    },
  };

  return (
    <Box className={styledSwitch ? "bg-gray-200 rounded-2xl pl-4 pr-1" : ""}>
      <FormGroup>
        <FormControlLabel
          control={
            <Switch
              checked={checked}
              onChange={onChange}
              disabled={disabled}
              sx={
                styledSwitch
                  ? styledSx
                  : {
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
                    }
              }
              {...rest}
            />
          }
          labelPlacement={styledSwitch ? "start" : "end"}
          label={
            <Typography
              translateId={label}
              className={`!ml-2 !font-manrope !text-neutral20 !text-base ${
                styledSwitch ? "!font-bold" : "!font-normal"
              }`}
            />
          }
        />
      </FormGroup>
    </Box>
  );
}

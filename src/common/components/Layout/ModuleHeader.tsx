import { Box, Button, Typography } from "@mui/material";
import { PiUserPlus } from "react-icons/pi";

export type ModuleHeaderProps = {
  label: {
    title: string;
    subtitle: string;
  };
  showButton?: boolean;
  labelButton?: string;
  refresh?: () => Promise<void>;
};

export function ModuleHeader({
  label,
  showButton,
  labelButton,
}: Readonly<ModuleHeaderProps>) {
  return (
    <Box className="w-full flex flex-row items-center justify-between mb-9 mt-2">
      <Box>
        <Typography className="flex flex-row items-center !text-[32px] !mb-0 !text-rhino-950  !font-poppins !font-semibold">
          {label.title}
        </Typography>
        <Typography className="!text-rhino-850 flex flex-row items-center !text-sm !font-poppins">
          {label.subtitle}
        </Typography>
      </Box>
      <Box>
        {showButton && (
          <Button
            startIcon={<PiUserPlus />}
            variant="contained"
            color="primary"
            style={{
              color: "white",
              fontFamily: "Poppins",
              width: "12.5rem",
              height: "3rem",
            }}
            sx={{
              background: "#ff0336",
              transition: "transform 0.3s, background-color 0.3s",
              "&:hover": {
                background: "#FF0000",
              },
            }}
            // onClick={() => openDrawer("StudentRegister")}
          >
            {labelButton}
          </Button>
        )}
      </Box>
    </Box>
  );
}

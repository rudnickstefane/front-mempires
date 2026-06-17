import { Box, Typography } from "@mui/material";
import { Button } from "@sr/common/iu/components/Button";
import { BsAndroid2, BsApple, BsGooglePlay } from "react-icons/bs";
import { Menu } from "../../../../components/Menu";

export function HomeHeader() {
  return (
    <Box className="home-section" id="home">
      <Menu />

      <Box className="relative flex flex-row items-center justify-center w-full mx-auto max-w-screen-2xl px-6 min-h-[85vh] gap-14 overflow-hidden">
        <Box className="flex flex-col items-center justify-center relative drop-shadow-lg">
          <Box className="logo" />
          <Box className="divider-red" />
          <Box className="hero-text-wrapper flex flex-col items-center gap-3 drop-shadow-lg">
            <Typography
              className="
                font-marcellus
                font-semibold
                text-2xl
                bg-gradient-to-r
                from-[#ecce90]
                to-[#fee7b3]
                bg-clip-text
                text-transparent
                [text-shadow:0_2px_4px_rgba(0,0,0,0.3)]
              "
            >
              BUILD. CONQUER. RULE.
            </Typography>
            <Box className="flex flex-col items-center">
              <Typography className="font-bonobo font-semibold text-xl bg-gradient-to-r from-[#f8e9c0] to-[#fdf5d1] bg-clip-text text-transparent [text-shadow:0_2px_4px_rgba(0,0,0,0.2)]">
                The ultimate MMORTS experience
              </Typography>
              <Typography
                className="
                font-bonobo
                font-semibold
                text-xl
                transition-all
                duration-300
                bg-[linear-gradient(to_bottom,#E6CE9A_0%,#C5B591_50%,#C6AE82_100%)]
                bg-clip-text
                text-transparent
                [text-shadow:0_2px_4px_rgba(0,0,0,0.3)]
                "
              >
                on your mobile device.
              </Typography>
            </Box>
          </Box>
          <Box className="divider-gold" />
          <Button className="btn-red-download text-2xl font-marcellus uppercase">
            <Box className="btn-red-text tracking-[0.05em] font-semibold">
              Cadastre-se
            </Box>
          </Button>
          <Box className="flex flex-wrap justify-center gap-10 mt-6">
            <Button
              className="!normal-case font-secondary !rounded-xl bg-black !text-white w-[200px] h-[65px] !border !border-white/10 hover:!bg-primary-900 transition-all duration-300"
              disableElevation
              startIcon={<BsApple size={30} />}
            >
              <Box className="flex flex-col items-start text-left">
                <Box className="text-[10px] uppercase leading-none opacity-70">
                  Em breve na
                </Box>
                <Box className="text-[1.1rem] font-bold leading-none mt-1">
                  App Store
                </Box>
              </Box>
            </Button>

            <Button
              className="!normal-case font-secondary !rounded-xl bg-black !text-white w-[200px] h-[65px] !border !border-white/10 hover:!bg-primary-900 transition-all duration-300"
              disableElevation
              startIcon={<BsGooglePlay size={30} />}
            >
              <Box className="flex flex-col items-start text-left">
                <Box className="text-[10px] uppercase leading-none opacity-70">
                  Em breve no
                </Box>
                <Box className="text-[1.1rem] font-bold leading-none mt-1">
                  Google Play
                </Box>
              </Box>
            </Button>

            <Button
              className="!normal-case font-secondary !rounded-xl bg-black !text-white w-[200px] h-[65px] !border !border-white/10 hover:!bg-primary-900 transition-all duration-300"
              disableElevation
              startIcon={<BsAndroid2 size={30} />}
            >
              <Box className="flex flex-col items-start text-left">
                <Box className="text-[10px] uppercase leading-none opacity-70">
                  Em breve o
                </Box>
                <Box className="text-[1.1rem] font-bold leading-none mt-1">
                  .APK
                </Box>
              </Box>
            </Button>
          </Box>
        </Box>
        <Box className="bg-video flex flex-col items-center gap-2">
          <Box className="w-[470px] h-[358px] cursor-not-allowed"></Box>
          <Typography className="uppercase bottom-0 font-marcellus text-lg font-semibold transition-all duration-300 bg-[linear-gradient(to_bottom,#fff2c2_0%,#f9d78a_20%,#e8af5a_45%,#c67d26_75%,#8d4f12_100%)] bg-clip-text text-transparent">
            Watch Trailer
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

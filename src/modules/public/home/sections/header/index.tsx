import { Box, Typography } from "@mui/material";
import bgHeader from "@sr/assets/images/bgHeader.png";
import { Button } from "@sr/common/iu/components/Button";
import { ArrowRight, ShieldTick } from "iconsax-react";
import { Menu } from "../../../../components/Menu";
import { useHomeHeaderLogic } from "./hooks";

export function HomeHeader() {
  const { title, description, fade } = useHomeHeaderLogic();

  // Efeito de fade para o conteúdo
  const fadeClass = `transition-all duration-700 ease-in-out ${
    fade ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
  }`;

  return (
    <Box className="bg-primary-200/10" id="home">
      <Menu />

      <Box className="relative flex flex-row items-center justify-center w-full mx-auto max-w-screen-2xl px-6 min-h-[85vh] gap-5 overflow-hidden ">
        <Box className="absolute inset-0">
          <Box className="absolute top-20 right-20 w-32 h-32 bg-primary-200/40 rounded-full blur-xl"></Box>
          <Box className="absolute bottom-20 left-20 w-40 h-40 bg-primary-300/35 rounded-full blur-2xl"></Box>
          <Box className="absolute top-32 left-1/4 w-72 h-72 bg-[radial-gradient(circle,_#cfe3f099_0%,_rgba(255,255,255,0)_70%)] rounded-full blur-2xl" />
        </Box>
        <Box className="flex flex-col w-2/4 gap-10">
          <Box className="flex flex-row items-center gap-3">
            <Box className="!w-6 !h-2 block bg-primary rounded-lg"></Box>
            <Typography className="inline-block font-ubuntu text-xl font-light text-primary-950">
              Seja bem-vindo à BenefyCare
            </Typography>
          </Box>
          <Box className="text-left h-80">
            <Box className={`${fadeClass}`}>{title}</Box>

            <Box className={`${fadeClass} delay-100`}>
              <Box className="mt-10">{description}</Box>
            </Box>
          </Box>
          <Button
            fullWidth
            to="#contact"
            translateId="Quero ser parceiro"
            className="py-3 px-4 text-base bg-primary hover:bg-primary-900 text-white w-fit"
            endIcon={<ArrowRight size={23} variant="Linear" />}
          />
        </Box>
        <Box className="flex items-center justify-center w-2/3">
          <div className="relative flex items-center justify-center">
            {/* Outer decorative frame */}
            <div className="absolute top-36 -right-4 w-24 h-24 rounded-[2rem] border-solid border-2 border-primary-950/20 translate-x-6 -translate-y-6" />
            <div className="absolute bottom-[24.9%] -left-4 w-28 h-28 rounded-[2rem] border-solid border-2 border-primary-950/20 -translate-x-4 translate-y-4" />

            {/* Main image */}
            <div className="relative rounded-3xl overflow-hidden z-10">
              <img
                src={bgHeader}
                alt="Farmacêutica atendendo clientes com eficiência"
                className="w-full h-[660px] object-contain"
              />
            </div>

            {/* Floating card — bottom left */}
            <div className="absolute bottom-40 -left-4 z-10 bg-white rounded-2xl p-4 shadow-soft border border-border/50 animate-float max-w-[240px]">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <ShieldTick
                    variant="Bulk"
                    size={20}
                    className="text-primary"
                  />
                </div>
                <div>
                  <Typography className="text-sm font-bold text-primary-950">
                    Convênio Ativo
                  </Typography>
                  <Typography className="text-xs text-muted-foreground text-primary-950/80">
                    Monitoramento contínuo
                  </Typography>
                </div>
              </div>
              <div className="w-full bg-primary-200/50 rounded-full h-2">
                <div className="bg-primary h-2 rounded-full w-3/4 transition-all" />
              </div>
            </div>

            {/* Floating card — top right */}
            <div
              className="absolute top-32 -right-7 z-10 bg-white rounded-2xl px-5 py-4 shadow-soft border border-border/50 animate-float"
              style={{ animationDelay: "1s" }}
            >
              <Typography className="text-2xl font-extrabold text-primary-950">
                1.200+
              </Typography>
              <Typography className="text-xs text-primary-950/80 font-medium">
                Parceiros ativos
              </Typography>
            </div>
          </div>
        </Box>
      </Box>
    </Box>
  );
}

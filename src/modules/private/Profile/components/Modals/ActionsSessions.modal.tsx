import { Box, Typography } from "@mui/material";
import { CardBox } from "@sr/common/components/Card";
import { Lock, TickCircle, Unlock } from "iconsax-react";

export function ActiveSessionsModal() {
  const steps = [
    {
      icon: <Lock className="h-4 w-4" />,
      title: "Verificação de identidade",
      description: "Primeiro, confirme sua senha atual",
    },
    {
      icon: <Unlock className="h-4 w-4" />,
      title: "Nova senha segura",
      description: "Crie uma senha forte e única",
    },
    {
      icon: <TickCircle className="h-4 w-4" />,
      title: "Confirmação",
      description: "Confirme e finalize a alteração",
    },
  ];

  return (
    <Box className="flex flex-col gap-5">
      <Box className="space-y-6">
        <Box className="space-y-5 mt-4">
          {steps.map((step) => (
            <CardBox key={step.title}>
              <Box className="h-9 w-9 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0 border border-orange/20">
                <Typography className="!text-sm !font-bold  text-orange-500">
                  {step.icon}
                </Typography>
              </Box>

              <Box>
                <Typography className="!font-manrope !font-semibold !text-neutral-800">
                  {step.title}ss
                </Typography>
                <Typography className="!text-sm !text-neutral-500 !font-manrope">
                  {step.description}ssssss
                </Typography>
              </Box>
            </CardBox>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

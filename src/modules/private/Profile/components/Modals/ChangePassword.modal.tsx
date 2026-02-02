import { Box, Typography } from "@mui/material";
import { CardBox } from "@sr/common/components/Card";
import { Key, Lock, TickCircle, Unlock } from "iconsax-react";

export function ChangePasswordModal() {
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
        <Box className="text-center">
          <Box className="h-20 w-20 mx-auto rounded-2xl bg-orange-100 flex items-center justify-center mb-4">
            <Key className="h-10 w-10 text-orange-500" />
          </Box>
          <h3 className="text-xl font-semibold text-foreground mb-2">
            Alterar sua senha
          </h3>
          <Typography className="text-muted-foreground">
            Mantenha sua conta segura atualizando sua senha regularmente
          </Typography>
        </Box>

        <Box className="space-y-5">
          {steps.map((step) => (
            <CardBox key={step.title}>
              <Box className="h-9 w-9 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0 border border-orange/20">
                <Typography className="!text-sm !font-bold  text-orange-500">
                  {step.icon}
                </Typography>
              </Box>

              <Box>
                <Typography className="!font-manrope !font-semibold !text-neutral-800">
                  {step.title}
                </Typography>
                <Typography className="!text-sm !text-neutral-500 !font-manrope">
                  {step.description}
                </Typography>
              </Box>
            </CardBox>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

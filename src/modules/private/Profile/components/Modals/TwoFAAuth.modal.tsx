import { Box, Button, Typography } from "@mui/material";
import { Alert } from "@sr/common/ui/Alert";
import { Animated } from "@sr/common/ui/motion";
import { ArrowRight2, Copy, ShieldSecurity, TickCircle } from "iconsax-react";
import { QrCode, Smartphone } from "lucide-react";
import { useState } from "react";

// Se você tiver um componente de OTP customizado, use-o.
// Caso contrário, pode usar um conjunto de TextField ou biblioteca como 'react-otp-input'

export function TwoFAAuthModal() {
  const [twoFAStep, setTwoFAStep] = useState<
    "intro" | "qrcode" | "verify" | "backup" | "complete" | "manage"
  >("intro");
  const [otpCode, setOtpCode] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);

  const secretKey = "JBSWY3DPEHPK3PXP"; // Mock
  const backupCodes = ["ABCD-1234", "EFGH-5678", "IJKL-9012", "MNOP-3456"];

  const handleNext = (step: typeof twoFAStep) => setTwoFAStep(step);

  const renderContent = () => {
    switch (twoFAStep) {
      case "intro":
        return (
          <Animated variant="container" className="space-y-6">
            <Box className="text-center py-4">
              <Box className="h-20 w-20 mx-auto rounded-3xl bg-primary/10 flex items-center justify-center mb-4">
                <ShieldSecurity
                  size={40}
                  className="text-primary"
                  variant="Bulk"
                />
              </Box>
              <Typography className="!font-manrope !text-xl !font-bold !text-neutral-800 !mb-2">
                Proteja sua conta
              </Typography>
              <Typography className="!font-manrope !text-neutral-500">
                A autenticação em dois fatores (2FA) protege sua conta mesmo que
                sua senha seja comprometida.
              </Typography>
            </Box>

            <Box className="space-y-4">
              {[
                {
                  title: "Baixe um app autenticador",
                  description: "Google Authenticator ou Authy",
                  step: "1",
                },
                {
                  title: "Escaneie o QR Code",
                  description: "Use o app para escanear o código",
                  step: "2",
                },
                {
                  title: "Confirme o código",
                  description: "Digite os 6 dígitos gerados",
                  step: "3",
                },
              ].map((step) => (
                <Box
                  key={step.step}
                  className="flex items-start gap-4 p-4 rounded-2xl bg-neutral-50 border border-neutral-100"
                >
                  <Box className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <Typography className="!font-manrope !text-sm !font-bold !text-primary">
                      {step.step}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography className="!font-manrope !font-semibold !text-neutral-800">
                      {step.title}
                    </Typography>
                    <Typography className="!font-manrope !text-sm !text-neutral-500">
                      {step.description}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>

            <Button
              fullWidth
              onClick={() => handleNext("qrcode")}
              className="!rounded-lg border !py-3 !normal-case !font-manrope !text-base !bg-primary !text-white"
              endIcon={<ArrowRight2 size={21} />}
            >
              Começar configuração
            </Button>
          </Animated>
        );

      case "qrcode":
        return (
          <Animated variant="container" className="space-y-6 text-center">
            <Typography className="!text-neutral-500">
              Escaneie o QR Code abaixo com seu app autenticador
            </Typography>

            <Box className="p-4 bg-white rounded-3xl shadow-sm border border-neutral-100 inline-block mx-auto">
              {/* QR Code Placeholder */}
              <Box className="h-48 w-48 bg-neutral-100 rounded-xl flex items-center justify-center border-2 border-dashed border-neutral-200">
                <Typography className="text-neutral-400 text-xs text-center px-4">
                  <QrCode className="h-6 w-6 text-primary-foreground" />
                </Typography>
              </Box>
            </Box>

            <Box className="p-4 rounded-2xl bg-neutral-50 border border-neutral-100 text-left">
              <Typography className="!text-xs !font-bold !text-neutral-400 !uppercase !tracking-widest !mb-2">
                Ou digite a chave manualmente
              </Typography>
              <Box className="flex items-center gap-2">
                <Box className="flex-1 p-3 rounded-xl bg-white border border-neutral-200 font-mono text-sm">
                  {secretKey}
                </Box>
                <Button
                  variant="outlined"
                  className="!bg-white !border !border-neutral-200 !rounded-xl !py-3 !min-w-0"
                >
                  <Copy size={20} className="text-neutral-600" />
                </Button>
              </Box>
            </Box>

            <Alert
              variant="warning"
              message="Não compartilhe esta chave com ninguém. Ela é usada para gerar os códigos de autenticação."
            />

            <Box className="flex gap-3">
              <Button
                fullWidth
                variant="outlined"
                onClick={() => handleNext("intro")}
                className="!py-3 !rounded-lg !text-neutral-900 border !border-neutral-500 !normal-case !font-manrope !text-base"
              >
                Voltar
              </Button>
              <Button
                fullWidth
                onClick={() => handleNext("verify")}
                className="!py-3 !rounded-lg border !px-5 !normal-case !font-manrope !text-base !bg-primary !text-white"
              >
                Próximo
              </Button>
            </Box>
          </Animated>
        );

      case "verify":
        return (
          <Animated variant="container" className="space-y-6 text-center">
            <Box className="h-16 w-16 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center mb-2">
              <Smartphone size={32} className="text-primary" />
            </Box>
            <Typography className="!font-bold !text-lg">
              Verificar Código
            </Typography>
            <Typography className="!text-neutral-500 !text-sm">
              Digite o código de 6 dígitos do seu app
            </Typography>

            <Box className="flex justify-center py-4">
              {/* Input OTP Placeholder - Use o componente que você tiver no projeto */}
              <Box className="flex gap-2">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <Box
                    key={i}
                    className="w-12 h-14 border-2 border-neutral-200 rounded-xl flex items-center justify-center bg-white"
                  />
                ))}
              </Box>
            </Box>

            <Box className="flex gap-3">
              <Button
                fullWidth
                variant="outlined"
                onClick={() => handleNext("qrcode")}
                className="!py-3 !rounded-lg !text-neutral-900 border !border-neutral-500 !normal-case !font-manrope !text-base"
              >
                Voltar
              </Button>
              <Button
                fullWidth
                disabled={isVerifying}
                onClick={() => {
                  setIsVerifying(true);
                  setTimeout(() => {
                    setIsVerifying(false);
                    handleNext("complete");
                  }, 1500);
                }}
                className="!py-3 !rounded-lg border !normal-case !font-manrope !text-base !bg-primary !text-white"
              >
                {isVerifying ? "Verificando..." : "Confirmar"}
              </Button>
            </Box>
          </Animated>
        );

      case "complete":
        return (
          <Animated variant="container" className="space-y-6 text-center py-6">
            <Box className="h-20 w-20 mx-auto rounded-full bg-green-100 flex items-center justify-center">
              <TickCircle size={48} className="text-green-600" variant="Bold" />
            </Box>
            <Box>
              <Typography className="!text-xl !font-bold !text-neutral-800">
                2FA Ativado!
              </Typography>
              <Typography className="!text-neutral-500">
                Sua conta agora está muito mais segura.
              </Typography>
            </Box>
            <Button
              fullWidth
              variant="contained"
              onClick={() => handleNext("intro")}
              className="!rounded-xl !py-3 !shadow-none !bg-neutral-900 !normal-case !font-manrope !text-base"
            >
              Finalizar
            </Button>
          </Animated>
        );

      default:
        return null;
    }
  };

  return <Box className="p-2">{renderContent()}</Box>;
}

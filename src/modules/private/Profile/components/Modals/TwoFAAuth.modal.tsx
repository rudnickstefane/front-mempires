import { Box } from "@mui/material";
import { Button } from "@sr/common/iu/components/Button";
import { CheckboxController } from "@sr/common/iu/components/Inputs/Checkbox";
import { PinField } from "@sr/common/iu/components/Inputs/PinField/PinField";
import { Typography } from "@sr/common/iu/components/Typography";
import { Alert } from "@sr/common/ui/Alert";
import { Animated } from "@sr/common/ui/motion";
import {
  ArrowRight2,
  Copy,
  DocumentDownload,
  Key,
  ShieldSecurity,
  ShieldTick,
  TickCircle,
} from "iconsax-react";
import { Smartphone } from "lucide-react";
import { useTwoFAAuthHook } from "../../hooks/useTwoFAAuth.hook";

export function TwoFAAuthModal() {
  const {
    twoFAStep,
    setTwoFAStep,
    handleStartSetup,
    isSettingUp,
    isVerifying,
    setupData,
    formData,
    backupCodes,
    handleCopySecret,
    handleCopyAll,
    downloadBackupCodes,
    confirmedSaved,
    setConfirmedSaved,
    closeModal,
    isButtonEnabled,
  } = useTwoFAAuthHook();

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
                  className="flex items-start gap-4 p-4 rounded-2xl bg-neutral-50 border-solid border border-neutral-100"
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

            <Box className="flex gap-3">
              <Button
                fullWidth
                variant="outlined"
                onClick={closeModal}
                className="py-3 text-neutral-900 border-neutral-500 text-base"
                translateId="btn.cancel"
              />
              <Button
                fullWidth
                onClick={handleStartSetup}
                loading={isSettingUp}
                endIcon={!isSettingUp && <ArrowRight2 size={21} />}
                className="py-3 px-4 text-base bg-primary text-white"
                translateId="btn.start"
              />
            </Box>
          </Animated>
        );

      case "qrcode":
        return (
          <Animated variant="container" className="space-y-6 text-center">
            <Typography className="!text-neutral-500">
              Escaneie o QR Code abaixo com seu app autenticador
            </Typography>

            <Box className="p-4 bg-white rounded-3xl shadow-soft border-solid border border-neutral-100 inline-block">
              <Box
                component="img"
                src={setupData?.qrCode}
                alt="QR Code 2FA"
                className="h-48 w-48 bg-neutral-100 rounded-xl flex items-center justify-center border-2 border-dashed border-neutral-200"
              />
            </Box>

            <Box className="p-4 rounded-2xl bg-neutral-50 border-solid border border-neutral-100 text-left">
              <Typography className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-2">
                Ou digite a chave manualmente
              </Typography>
              <Box className="flex items-center gap-2">
                <Box className="flex-1 p-3 rounded-xl bg-white border-solid border border-neutral-200 font-manrope text-sm">
                  {setupData?.secret}
                </Box>
                <Button
                  variant="outlined"
                  onClick={handleCopySecret}
                  className="!bg-white !border-neutral-200 !rounded-xl !py-3 !min-w-0"
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
                onClick={() => setTwoFAStep("intro")}
                className="py-3 text-neutral-900 border-neutral-500 text-base"
                translateId="btn.return"
              />

              <Button
                fullWidth
                onClick={() => setTwoFAStep("verify")}
                className="py-3 rounded-lg border px-4 normal-case font-manrope text-base bg-primary text-white"
                endIcon={<ArrowRight2 size={21} />}
              >
                Continuar
              </Button>
            </Box>
          </Animated>
        );

      case "verify":
        return (
          <Animated variant="container" className="space-y-6 text-center">
            <Box className="text-center py-4">
              <Box className="h-16 w-16 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center mb-2">
                <Smartphone size={32} className="text-primary" />
              </Box>
              <Box>
                <Typography className="!font-bold !text-lg !leading-10">
                  Verificar Código
                </Typography>
                <Typography className="!text-neutral-500 !text-sm">
                  Digite o código de 6 dígitos exibido no seu app autenticador
                </Typography>
              </Box>
            </Box>

            <PinField
              autoFocus
              value={formData.values.otp}
              onChange={(val) => formData.setFieldValue("otp", val)}
              error={!!formData.errors.otp && formData.touched.otp}
            />

            <Typography className="text-neutral-500 text-xs">
              O código é atualizado a cada 30 segundos
            </Typography>

            <Box className="flex gap-3 pt-7">
              <Button
                fullWidth
                variant="outlined"
                onClick={() => setTwoFAStep("qrcode")}
                className="py-3 text-neutral-900 border-neutral-500 text-base"
                translateId="btn.return"
              />

              <Button
                fullWidth
                loading={isVerifying}
                disabled={!isButtonEnabled}
                onClick={() => formData.handleSubmit()}
                translateId="btn.verify"
                className="py-3 px-4 border text-base bg-primary text-white"
              />
            </Box>
          </Animated>
        );

      case "backup":
        return (
          <Animated variant="container" className="space-y-6">
            <Box className="py-4 text-center">
              <Box className="h-16 w-16 mx-auto rounded-2xl bg-yellow/10 flex items-center justify-center mb-2">
                <Key size={32} className="text-yellow" variant="Bold" />
              </Box>
              <Typography className="text-xl font-bold text-neutral-800 mt-6">
                Códigos de Backup
              </Typography>
              <Typography className="!text-neutral-500 text-sm mt-2">
                Estes códigos são sua reserva de segurança.
              </Typography>
              <Typography className="!text-neutral-500 text-sm">
                Cada código pode ser usado apenas uma vez.
              </Typography>
            </Box>

            <Alert
              variant="info"
              message="Se você perder o acesso ao seu dispositivo, esses códigos permitirão que você recupere sua conta sem depender do aplicativo."
            />

            {/* Grid de Códigos de Backup */}
            <Box className="grid grid-cols-2 gap-2 p-4 rounded-2xl bg-neutral-50 border border-dashed border-neutral-200">
              {backupCodes.map((code, index) => (
                <Box
                  key={index}
                  className="flex gap-2 items-center bg-white p-2 rounded-lg border border-neutral-100"
                >
                  <Typography className="text-[10px] text-neutral-400 font-bold">
                    {String(index + 1).padStart(2, "0")}
                  </Typography>
                  <Typography className="font-mono text-sm font-semibold text-neutral-700 tracking-wider">
                    {code}
                  </Typography>
                </Box>
              ))}
            </Box>

            <Box className="flex flex-row gap-3">
              <Button
                variant="outlined"
                fullWidth
                startIcon={<Copy size={20} />}
                onClick={handleCopyAll}
                className="rounded-xl py-3 border-neutral-200 text-neutral-700 !normal-case !font-manrope !text-sm"
              >
                Copiar tudo
              </Button>

              <Button
                fullWidth
                variant="outlined"
                startIcon={<DocumentDownload variant="Linear" size={18} />}
                onClick={downloadBackupCodes}
                className="rounded-xl py-3 border-neutral-200 text-neutral-700 !normal-case !font-manrope !text-sm"
              >
                Baixar códigos (.txt)
              </Button>
            </Box>

            <Alert
              variant="error"
              title="Importante"
              message="Por segurança, estes códigos não serão exibidos novamente após fechar esta tela. Sem eles, a perda do dispositivo pode resultar no bloqueio permanente da conta."
            />

            <CheckboxController
              variant="card"
              checked={confirmedSaved}
              onValueChange={(val) => setConfirmedSaved(val)}
              label={
                <Typography className="!text-xs !text-neutral-600 !leading-relaxed !font-manrope">
                  Eu compreendo que estes códigos são a{" "}
                  <strong>maneira mais segura</strong> de recuperar minha conta,
                  e confirmo que os salvei em um local protegido.
                </Typography>
              }
            />

            <Button
              fullWidth
              disabled={!confirmedSaved}
              onClick={() => setTwoFAStep("complete")}
              className="py-3 rounded-lg border px-4 normal-case font-manrope text-base bg-primary text-white"
              endIcon={<TickCircle size={20} variant="Linear" />}
              translateId="btn.completeSetup"
            />
          </Animated>
        );

      case "complete":
        return (
          <Animated variant="container" className="space-y-6 text-center">
            <Box className="py-4">
              <Box className="h-20 w-20 mx-auto rounded-full bg-green-100 flex items-center justify-center">
                <ShieldTick
                  size={48}
                  className="text-green-600"
                  variant="Bold"
                />
              </Box>
              <Typography className="!text-xl !font-bold !text-neutral-800 mt-8">
                2FA Ativado com Sucesso!
              </Typography>
              <Typography className="text-neutral-500 mt-2 text-sm">
                Sua conta agora está protegida com autenticação em dois fatores.
              </Typography>
            </Box>

            <Alert
              variant="success"
              message="Sempre que você fizer login, solicitaremos uma confirmação de identidade através do seu método de autenticação configurado."
            />

            <Button
              fullWidth
              variant="contained"
              onClick={closeModal}
              className="py-3 shadow-none bg-neutral-900 text-base"
              translateId="btn.close"
            />
          </Animated>
        );

      default:
        return null;
    }
  };

  return <Box>{renderContent()}</Box>;
}

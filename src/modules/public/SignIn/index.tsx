import { Box, Button, CircularProgress, Link } from "@mui/material";
import { FormController } from "@sr/common/iu/components/Forms";
import { TextField } from "@sr/common/iu/components/Inputs/TextField/TextField";
import { Typography } from "@sr/common/iu/components/Typography";
import { AnimatedContainer } from "@sr/common/ui/motion/AnimatedContainer";
import { AnimatedItem } from "@sr/common/ui/motion/AnimatedItem";
import { TypewriterText } from "@sr/common/ui/typewriters";
import { useSignInFormHook } from "@sr/modules/common/hooks";
import { Logo } from "@sr/modules/common/ui/Logo";
import { PasswordCheck, SecurityUser } from "iconsax-react";
import { signInTypewriter } from "./constants";

export default function SignIn() {
  const { formData, showPassword, handleClickShowPassword, isLoading } =
    useSignInFormHook();

  return (
    <Box className="flex flex-row w-full h-screen">
      <Box className="flex flex-col md:justify-center items-center bg-white md:w-2/4 w-full">
        <Box className="flex flex-col justify-center items-center w-full px-14">
          <AnimatedContainer className="w-full">
            <Box className="flex items-center justify-center flex-col mb-10">
              <AnimatedItem>
                <Typography className="text-3xl font-semibold text-gray-900 mb-3">
                  Bem-vindo ao BenefyCare
                </Typography>
              </AnimatedItem>
              <AnimatedItem>
                <Typography className="!text-gray-500">
                  Identifique-se para acessar sua conta.
                </Typography>
              </AnimatedItem>
            </Box>
            <FormController value={formData}>
              <AnimatedItem>
                <TextField
                  required
                  fullWidth
                  autoFocus
                  label="Identificação do usuário"
                  placeholder="Carteirinha, CNPJ, CPF ou E-mail"
                  variant="outlined"
                  margin="normal"
                  name="login"
                  startIcon={<SecurityUser variant="Linear" />}
                />
              </AnimatedItem>
              <AnimatedItem>
                <TextField
                  required
                  fullWidth
                  name="password"
                  type={showPassword ? "text" : "password"}
                  label="Senha"
                  placeholder="Digite sua senha"
                  className="!mt-5"
                  startIcon={<PasswordCheck variant="Linear" />}
                  showPasswordToggle
                  onTogglePassword={handleClickShowPassword}
                />
              </AnimatedItem>
              <AnimatedItem>
                <Box className="flex flex-row items-center justify-end w-full my-4">
                  <Link
                    href="/recovery"
                    className="text-primary !no-underline hover:!underline transition-all text-sm"
                  >
                    Preciso de ajuda com minha senha.
                  </Link>
                </Box>
              </AnimatedItem>
              <AnimatedItem>
                <Button
                  type="submit"
                  disabled={
                    isLoading ||
                    !formData.values.login ||
                    !formData.values.password
                  }
                  variant="contained"
                  color="primary"
                  fullWidth
                  className="normal-case font-manrope text-lg btn-primary rounded-lg h-12 transition-all"
                >
                  {isLoading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    "Entrar"
                  )}
                </Button>
              </AnimatedItem>
            </FormController>
            <AnimatedItem>
              <Box className="flex flex-row items-center justify-center w-full my-4 text-[.8rem]">
                Protegido pelo reCAPTCHA.
                <Link
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary !no-underline hover:!underline !transition-all !mx-1"
                >
                  Privacidade
                </Link>
                e
                <Link
                  href="https://policies.google.com/terms"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary !no-underline hover:!underline !transition-all !ml-1"
                >
                  Termos
                </Link>
                .
              </Box>
            </AnimatedItem>
          </AnimatedContainer>
        </Box>
      </Box>
      <Box className="w-full bg-gradient-to-br from-primary to-[#2D0796] flex flex-col p-20">
        <Logo className="text-4xl text-white" />
        <Box className="flex h-full -mt-14">
          <Box className="flex flex-col justify-center">
            <AnimatedContainer className="w-full">
              <AnimatedItem>
                <Typography className="text-white !font-light font-ubuntu !text-6xl">
                  Evoluindo a gestão de benefícios...
                </Typography>
              </AnimatedItem>
              <AnimatedItem>
                <TypewriterText messages={signInTypewriter} />
              </AnimatedItem>
            </AnimatedContainer>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

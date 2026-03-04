import { Box, Button, CircularProgress } from "@mui/material";
import { PasswordStrength } from "@sr/common/components/Forms";
import { FormController } from "@sr/common/iu/components/Forms";
import { TextField } from "@sr/common/iu/components/Inputs/TextField/TextField";
import { Alert } from "@sr/common/ui/Alert";
import * as Hook from "../../hooks";

export function ChangePasswordModal() {
  const {
    formData,
    newPasswordValue,
    showPassword,
    handleClickShowPassword,
    isPending,
    isButtonEnabled,
  } = Hook.useChangePasswordHook();

  return (
    <FormController value={formData}>
      <Box className="flex flex-col gap-6">
        <Alert
          variant="warning"
          title="Importante"
          message="Ao concluir a alteração, todas as suas sessões atuais serão encerradas e você será levado de volta à tela de login para validar sua nova senha."
        />

        <TextField
          required
          fullWidth
          name="oldPassword"
          type={showPassword ? "text" : "password"}
          label="Senha atual"
          showPasswordToggle
          onTogglePassword={handleClickShowPassword}
        />

        <TextField
          required
          fullWidth
          name="newPassword"
          type={"password"}
          label="Nova senha"
        />

        <TextField
          required
          fullWidth
          name="confirmPassword"
          type={"password"}
          label="Confirmar nova senha"
        />

        <PasswordStrength password={newPasswordValue} />

        <Button
          fullWidth
          onClick={() => formData.handleSubmit()}
          disabled={!isButtonEnabled || isPending}
          className="rounded-lg !py-3 normal-case font-manrope text-base bg-primary text-white"
        >
          {isPending ? (
            <Box className="flex items-center h-6">
              <CircularProgress size={20} color="inherit" />
            </Box>
          ) : (
            "Alterar senha"
          )}
        </Button>
      </Box>
    </FormController>
  );
}

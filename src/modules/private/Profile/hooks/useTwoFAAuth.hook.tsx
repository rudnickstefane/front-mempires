import { useModal } from "@sr/common/components/Modal/hooks";
import { notify } from "@sr/common/iu/components/notifications";
import { useFormik } from "formik";
import { useState } from "react";
import * as Hook from "../hooks";

export type TwoFASteps = "intro" | "qrcode" | "verify" | "backup" | "complete";

export const useTwoFAAuthHook = () => {
  const { closeModal } = useModal();
  const [twoFAStep, setTwoFAStep] = useState("intro");
  const [confirmedSaved, setConfirmedSaved] = useState(false);
  const [backupCodes, setBackupCodes] = useState<string[]>([]);

  const {
    mutateAsync: setup2FA,
    isPending: isSettingUp,
    data: setupData,
  } = Hook.useSetupTwoFactor();

  const { mutateAsync: confirm2FA, isPending: isVerifying } =
    Hook.useActivateTwoFactor();

  const handleStartSetup = async () => {
    await setup2FA();
    setTwoFAStep("qrcode");
  };

  const formData = useFormik({
    initialValues: { otp: "" },
    onSubmit: async (values) => {
      await confirm2FA(
        { code: values.otp },
        {
          onSuccess: (data) => {
            const codes = Array.isArray(data) ? data : data.activateTwoFactor;

            if (codes) {
              setBackupCodes(codes);
              setTwoFAStep("backup");
            }
          },
        },
      );
    },
  });

  const handleCopySecret = async () => {
    if (!setupData?.secret) return;

    try {
      await navigator.clipboard.writeText(setupData.secret);
      notify.success(
        "Chave copiada! Agora cole no seu aplicativo de autenticação.",
      );
    } catch {
      notify.error(
        "Não foi possível copiar a chave. Tente selecionar e copiar manualmente.",
      );
    }
  };

  const handleCopyAll = async () => {
    if (backupCodes.length === 0) return;

    const content = `CÓDIGOS DE BACKUP - BenefyCare\n\n${backupCodes.join("\n")}\n\nGuarde em local seguro. Cada código só pode ser usado uma vez.`;

    try {
      await navigator.clipboard.writeText(content);
      notify.success(
        "Todos os códigos foram copiados para a área de transferência!",
      );
    } catch (err) {
      notify.error("Não foi possível copiar os códigos.");
    }
  };

  const downloadBackupCodes = () => {
    if (backupCodes.length === 0) return;

    const element = document.createElement("a");
    const content = `CÓDIGOS DE BACKUP - BenefyCare\n\n${backupCodes.join("\n")}\n\nGuarde em local seguro. Cada código só pode ser usado uma vez.`;
    const file = new Blob([content], { type: "text/plain" });

    element.href = URL.createObjectURL(file);
    element.download = "backup-codes-benefycare.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return {
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
    isButtonEnabled: formData.isValid && formData.dirty && !isVerifying,
  };
};

/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormControl, TextField } from "@mui/material";
import { useEffect } from "react";
import { DrawerProps } from "../../../../common/types";
import { useEditProfileForm } from "../../hooks";

export const EditProfileDrawer = ({
  closeDrawer,
  data,
  initialStep = 0,
  refresh,
}: DrawerProps) => {
  const {
    isLoading,
    formData,
    errors,
    activeStep,
    setActiveStep,
    dynamicSteps,
    isNoNumber,
    handleTextFieldChange,
    handleNoNumberToggle,
    handleBack,
    handleContinue,
    handleFinish,
    isCheckingUsername,
    isUsernameAvailable,
    contacts,
    handleAddContact,
    handleEditContact,
    handleDeleteContact,
    editingContact,
    handleConfirmEditContact,
  } = useEditProfileForm({ closeDrawer, data, refresh });

  useEffect(() => {
    setActiveStep(initialStep);
  }, [initialStep, setActiveStep]);

  return (
    <>
      {(() => {
        switch (activeStep) {
          case 0:
            break;

          case 1:
            break;

          case 2:
            return (
              <>
                <FormControl fullWidth>
                  <TextField
                    required
                    name="description"
                    placeholder="e.g.: Whatsapp, Casa etc.."
                    label="Descrição"
                    variant="outlined"
                    value={formData.description}
                    onChange={handleTextFieldChange}
                    error={!!errors.descriptionError}
                    helperText={errors.descriptionError}
                    inputProps={{ maxLength: 30 }}
                  />
                </FormControl>
                <FormControl fullWidth>
                  <TextField
                    required
                    name="phone"
                    label="Telefone"
                    variant="outlined"
                    className="!mt-5"
                    value={formData.phone}
                    onChange={handleTextFieldChange}
                    error={!!errors.phoneError}
                    helperText={errors.phoneError}
                  />
                </FormControl>
                <FormControl fullWidth>
                  <TextField
                    required
                    name="email"
                    label="E-mail"
                    variant="outlined"
                    className="!mt-5"
                    value={formData.email}
                    onChange={handleTextFieldChange}
                    error={!!errors.emailError}
                    helperText={errors.emailError}
                    inputProps={{ maxLength: 100 }}
                  />
                </FormControl>
              </>
            );

          default:
            return null;
        }
      })()}
    </>
  );
};

/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box } from "@mui/material";
import { listContactType } from "@sr/common/constants";
import { useContactsForm } from "@sr/common/hooks";
import { Button } from "@sr/common/iu/components/Button";
import { TextField } from "@sr/common/iu/components/Inputs/TextField/TextField";
import { ContactsFormProps } from "@sr/common/types";
import { formatText } from "@sr/utils";
import { FieldArray } from "formik";
import { Add, TickCircle } from "iconsax-react";
import { ContactItem } from "../Card";
import { Show } from "../Show";

export function ContactsForm({ isSimple = false }: ContactsFormProps) {
  const {
    values,
    editingIndex,
    canAdd,
    handlePhoneChange,
    handleFormattedTextChange,
    handleAction,
    handleEdit,
    handleRemove,
    clearTempFields,
    setFieldValue,
  } = useContactsForm();

  return (
    <>
      <Show hidden={!isSimple}>
        <Box className="flex flex-col gap-6">
          <TextField
            required
            fullWidth
            name="contact.description"
            label="Descrição"
            disabled
            onChange={handleFormattedTextChange}
            maxLength={50}
          />
          <Box className="grid grid-cols-2 gap-4">
            <TextField
              required
              fullWidth
              name="contact.phone"
              label="Telefone"
              onChange={handlePhoneChange}
            />

            <TextField required name="contact.email" label="E-mail" />
          </Box>
        </Box>
      </Show>

      <Show hidden={isSimple}>
        <Box className="flex flex-col gap-6">
          <FieldArray name="contacts">
            {({ push, remove, replace }) => (
              <>
                <Box className="flex flex-col gap-6 p-7 border border-neutral-200 rounded-lg bg-white">
                  <TextField
                    required
                    name="_tempType"
                    label="Tipo de Contato"
                    fullWidth
                    options={listContactType.types}
                  />
                  <TextField
                    required
                    fullWidth
                    name="_tempDescription"
                    label="Nome ou Descrição"
                    maxLength={50}
                    onChange={(e) =>
                      setFieldValue(
                        "_tempDescription",
                        formatText(e.target.value),
                      )
                    }
                  />
                  <Box className="grid grid-cols-2 gap-4">
                    <TextField
                      fullWidth
                      name="_tempPhone"
                      label="Telefone"
                      onChange={handlePhoneChange}
                    />
                    <TextField
                      required
                      fullWidth
                      name="_tempEmail"
                      label="E-mail"
                    />
                  </Box>
                  <Box className="flex gap-4 items-center justify-end">
                    {editingIndex !== null && (
                      <Button
                        variant="outlined"
                        onClick={clearTempFields}
                        className="text-neutral-600 border-neutral-600 w-fit rounded-lg border py-3 px-4 normal-case font-manrope text-base"
                      >
                        Cancelar
                      </Button>
                    )}
                    <Button
                      variant="outlined"
                      startIcon={
                        editingIndex !== null ? (
                          <TickCircle size={22} />
                        ) : (
                          <Add size={22} />
                        )
                      }
                      disabled={!canAdd}
                      onClick={() => handleAction(push, replace)}
                      className={`w-fit rounded-lg border py-3 font-manrope text-base ${
                        editingIndex !== null
                          ? "text-green-600 border-green-600 px-6 w-52"
                          : !canAdd
                            ? "!border-transparent px-4 w-52"
                            : "text-primary border-primary px-4 w-52"
                      }`}
                    >
                      {editingIndex !== null
                        ? "Salvar alteração"
                        : "Adicionar contato"}
                    </Button>
                  </Box>
                </Box>

                <Box className="flex flex-col gap-4">
                  {values.contacts?.map((contact: any, index: number) => (
                    <ContactItem
                      key={index}
                      contact={contact}
                      index={index}
                      isEditing={editingIndex === index}
                      onEdit={() => handleEdit(index, contact)}
                      onRemove={() => handleRemove(index, remove)}
                    />
                  ))}
                </Box>
              </>
            )}
          </FieldArray>
        </Box>
      </Show>
    </>
  );
}

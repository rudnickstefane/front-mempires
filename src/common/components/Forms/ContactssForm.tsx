/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import { Box, Button, IconButton, Typography } from "@mui/material";
import { TextField } from "@sr/common/iu/components/Inputs/TextField/TextField";
import { DrawerFormUserProps } from "@sr/modules/private/Profile/types";
import { formatText } from "@sr/utils";
import { FieldArray, useFormikContext } from "formik";
import { Add, Edit2 } from "iconsax-react"; // Usando iconsax para manter o padrão
import { Trash2 } from "lucide-react";

export function ContactsForm() {
  const { values, setFieldValue } = useFormikContext<
    DrawerFormUserProps | any
  >();

  // Função para limpar os campos temporários
  const clearTempFields = () => {
    setFieldValue("_tempDescription", "");
    setFieldValue("_tempPhone", "");
    setFieldValue("_tempEmail", "");
  };

  const handleAddContact = (push: Function) => {
    const desc = values._tempDescription;
    const email = values._tempEmail;

    if (desc && email) {
      push({
        description: desc,
        phone: values._tempPhone || "",
        email: email,
        type: "",
        status: "",
      });
      clearTempFields();
    }
  };

  const handleEdit = (index: number, contact: any, remove: Function) => {
    // Volta os dados para os campos de cima
    setFieldValue("_tempDescription", contact.description);
    setFieldValue("_tempPhone", contact.phone);
    setFieldValue("_tempEmail", contact.email);
    // Remove da lista
    remove(index);
  };

  return (
    <Box className="flex flex-col gap-6">
      {/* Área de Digitação - Usando nomes temporários que não sujam o objeto final */}
      <Box className="flex flex-col gap-4">
        <TextField
          fullWidth
          name="_tempDescription"
          label="Descrição"
          placeholder="Ex: Celular Pessoal"
          onChange={(e) =>
            setFieldValue("_tempDescription", formatText(e.target.value))
          }
        />
        <Box className="grid grid-cols-2 gap-4">
          <TextField
            fullWidth
            name="_tempPhone"
            label="Telefone"
            mask="(99) 99999-9999"
          />
          <TextField fullWidth name="_tempEmail" label="E-mail" />
        </Box>

        <FieldArray name="contacts">
          {({ push, remove }) => (
            <>
              <Button
                variant="text"
                startIcon={<Add size={20} />}
                onClick={() => handleAddContact(push)}
                className="!justify-start !text-rhino-600 !font-medium !lowercase hover:!bg-neutral-100 !w-fit"
              >
                Adicionar novo contato
              </Button>

              {/* Lista de Contatos (Box neutral) */}
              <Box className="flex flex-col gap-3 mt-2">
                {values.contacts?.map((contact: any, index: number) => (
                  <Box
                    key={index}
                    className="flex items-center justify-between p-4 rounded-xl border border-neutral-200 bg-neutral-50"
                  >
                    <Box className="flex flex-col">
                      <Typography className="!font-poppins !text-sm !font-semibold text-neutral-600">
                        {contact.description}
                      </Typography>
                      <Typography className="!font-poppins !text-xs !font-light text-neutral-500">
                        {contact.email} {contact.phone && `• ${contact.phone}`}
                      </Typography>
                    </Box>

                    <Box className="flex gap-1">
                      <IconButton
                        onClick={() => handleEdit(index, contact, remove)}
                        className="text-neutral-400 hover:text-rhino-600"
                      >
                        <Edit2 size={18} variant="Outline" />
                      </IconButton>
                      <IconButton
                        onClick={() => remove(index)}
                        className="text-neutral-400 hover:text-red-500"
                      >
                        <Trash2 size={18} />
                      </IconButton>
                    </Box>
                  </Box>
                ))}
              </Box>
            </>
          )}
        </FieldArray>
      </Box>
    </Box>
  );
}

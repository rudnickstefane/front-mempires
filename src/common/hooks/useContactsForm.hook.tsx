/* eslint-disable @typescript-eslint/no-explicit-any */
import { ContactsProps } from "@sr/common/types";
import { formatPhoneNumber, formatText } from "@sr/utils";
import { useFormikContext } from "formik";
import { useState } from "react";

export const useContactsForm = () => {
  const { values, errors, setFieldValue, setFieldTouched } =
    useFormikContext<any>();
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFieldValue(name, formatPhoneNumber(value));
  };

  const handleFormattedTextChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = event.target;
    setFieldValue(name, formatText(value));
  };

  const clearTempFields = () => {
    ["_tempType", "_tempDescription", "_tempPhone", "_tempEmail"].forEach(
      (field) => {
        setFieldValue(field, "");
        setFieldTouched(field, false);
      },
    );
    setEditingIndex(null);
  };

  const canAdd = !!(
    values._tempType &&
    values._tempDescription &&
    values._tempEmail &&
    !errors._tempType &&
    !errors._tempDescription &&
    !errors._tempEmail
  );

  const handleAction = (
    push: (obj: ContactsProps) => void,
    replace: (index: number, obj: ContactsProps) => void,
  ) => {
    if (!canAdd) return;

    const contactData = {
      description: values._tempDescription,
      phone: values._tempPhone || "",
      email: values._tempEmail,
      type: values._tempType,
    };

    const action =
      editingIndex !== null
        ? () => replace(editingIndex, contactData)
        : () => push(contactData);

    action();
    setTimeout(clearTempFields, 0);
  };

  const handleRemove = (index: number, removeFn: (index: number) => void) => {
    removeFn(index);

    if (editingIndex === null) return;

    if (editingIndex === index) return clearTempFields();

    if (editingIndex > index)
      setEditingIndex((prev) => (prev !== null ? prev - 1 : null));
  };

  const handleEdit = (index: number, contact: ContactsProps) => {
    setEditingIndex(index);
    setFieldValue("_tempType", contact.type);
    setFieldValue("_tempDescription", contact.description);
    setFieldValue("_tempPhone", contact.phone);
    setFieldValue("_tempEmail", contact.email);
  };

  return {
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
  };
};

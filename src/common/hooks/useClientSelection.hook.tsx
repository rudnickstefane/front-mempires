/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useFormikContext } from "formik";
import { useCallback } from "react";

export const useClientSelection = () => {
  const { values, setFieldValue } = useFormikContext<any>();
  const selectedClients: any[] = values.clients || [];

  const toggleClient = useCallback(
    (client: any) => {
      const clientIndex = selectedClients.findIndex(
        (c) => c.clientCode === client.clientCode,
      );

      let newSelection = [...selectedClients];

      if (clientIndex > -1) {
        newSelection.splice(clientIndex, 1);
      } else if (selectedClients.length < 10) {
        newSelection.push({
          clientCode: client.clientCode,
          fantasyName: client.fantasyName || client.name,
          code: client.code,
        });
      }

      setFieldValue("clients", newSelection, true);
    },
    [selectedClients, setFieldValue],
  );

  return {
    selectedClients,
    toggleClient,
    isMaxReached: selectedClients.length >= 10,
  };

  return {
    selectedClients,
    toggleClient,
    isMaxReached: selectedClients.length >= 10,
  };
};

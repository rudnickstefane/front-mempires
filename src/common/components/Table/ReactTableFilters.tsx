/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box } from "@mui/material";
import { FormController } from "@sr/common/iu/components/Forms";
import { CheckboxController } from "@sr/common/iu/components/Inputs/Checkbox";
import { TextField } from "@sr/common/iu/components/Inputs/TextField/TextField";
import { ReactTableFilterConfig } from "@sr/common/types";
import { SearchStatus } from "iconsax-react";

export function ReactTableFilters({
  filters,
  formData,
}: {
  filters: ReactTableFilterConfig[];
  formData: any;
}) {
  return (
    <FormController value={formData}>
      <Box className="flex gap-4 flex-wrap">
        {filters.map((filter) => {
          if (filter.type === "search") {
            return (
              <Box key={filter.name} className="flex-1 max-w-xl">
                <TextField
                  name={filter.name}
                  placeholder={filter.placeholder}
                  startIcon={<SearchStatus variant="Linear" />}
                  className="m-0"
                  fullWidth
                />
              </Box>
            );
          }

          if (filter.type === "checkbox") {
            return (
              <CheckboxController
                key={filter.name}
                label={filter.label}
                checked={formData.values[filter.name]}
                onValueChange={(val) =>
                  formData.setFieldValue(filter.name, val)
                }
              />
            );
          }

          return null;
        })}
      </Box>
    </FormController>
  );
}

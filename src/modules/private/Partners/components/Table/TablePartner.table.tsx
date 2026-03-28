import { Box } from "@mui/material";
import { Card } from "@sr/common/components/Card";
import { ReactTable } from "@sr/common/components/Table";
import { FormController } from "@sr/common/iu/components/Forms";
import { TextField } from "@sr/common/iu/components/Inputs/TextField/TextField";
import { ReactTableProps } from "@sr/common/types";
import { useSignInFormHook } from "@sr/modules/common/hooks";
import { SearchStatus } from "iconsax-react";
import { PartnerDTO } from "../../constants/columnsPartners.const";

export function TablePartner(props: ReactTableProps<PartnerDTO>) {
  const { formData } = useSignInFormHook();

  return (
    <Card loading={props.isLoading} skeletonCount={3} padding="p-0">
      <Box className="flex items-center p-6">
        <FormController value={formData}>
          <TextField
            fullWidth
            placeholder="Buscar por nome ou CNPJ"
            variant="outlined"
            margin="normal"
            name="login"
            startIcon={<SearchStatus variant="Linear" />}
            className="m-0"
          />
        </FormController>
      </Box>

      <ReactTable {...props} />
    </Card>
  );
}

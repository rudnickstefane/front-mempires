import { Box } from "@mui/material";
import { Typography } from "@sr/common/iu/components/Typography";
import { FolderCross } from "iconsax-react";

export const NoRecordsFound = ({
  title = "Nenhum registro encontrado",
  description = "No momento, não há informações para serem exibidas aqui.",
  observation = "Tente recarregar a página ou ajuste os filtros aplicados.",
}) => (
  <Box className="flex flex-col items-center justify-center text-center p-10 gap-6">
    <Box className="flex items-center justify-center bg-neutral-100 p-4 rounded-5xl w-36 h-36">
      <FolderCross size={70} variant="TwoTone" className="text-neutral-500" />
    </Box>
    <Box className="max-w-md">
      <Typography className="text-base text-neutral-600 font-bold mb-2">
        {title}
      </Typography>
      <Typography className="text-neutral-500 text-sm leading-relaxed px-4">
        {description}
      </Typography>
      <Typography className="text-neutral-500 text-sm leading-relaxed px-4">
        {observation}
      </Typography>
    </Box>
  </Box>
);

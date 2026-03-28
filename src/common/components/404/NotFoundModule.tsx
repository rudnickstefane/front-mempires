import { Box, Container } from "@mui/material";
import { Typography } from "@sr/common/iu/components/Typography";
import { NoteRemove } from "iconsax-react";

export const NotFoundModule = () => {
  return (
    <Container
      maxWidth="sm"
      className="w-full h-full flex justify-center items-center"
    >
      <Box className="flex flex-col justify-center items-center gap-5">
        <NoteRemove size="80" variant="Bulk" className="text-primary" />

        <Typography className="text-7xl font-bold text-primary-950 font-ubuntu">
          404
        </Typography>

        <Typography className="text-base font-ubuntu text-primary-950">
          Desculpe! Essa página não foi encontrada.
        </Typography>

        <Typography className="text-base text-center text-primary-950">
          Parece que este recurso ainda não está disponível.
        </Typography>
      </Box>
    </Container>
  );
};

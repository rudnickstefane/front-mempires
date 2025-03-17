import { Box, Typography } from '@mui/material';
import { BiSolidMessageSquareError } from 'react-icons/bi';

export const NoRecordsFound = () => (
    <Box className="w-full flex flex-col items-center justify-center my-5">
      <Box className="my-5">
        <BiSolidMessageSquareError className="text-[4rem] text-[#aaabac]" />
      </Box>
      <Typography className="text-[#aaabac] !font-semibold">Nenhum registro encontrado</Typography>
    </Box>
);

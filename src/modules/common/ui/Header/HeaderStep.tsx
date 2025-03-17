import { Box, Typography } from "@mui/material";
import { StepHeaderTypes } from "../../../../pages/sign-up/gym/types";

export const HeaderStep = ({ title, description }: StepHeaderTypes) => (
    <Box className='flex flex-col items-center justify-center'>
        <Typography className='!text-3xl !text-[#333333]'>{title}</Typography>
        <Typography className='!mt-5 !w-[100%] !text-center'>{description}</Typography>
    </Box>
);

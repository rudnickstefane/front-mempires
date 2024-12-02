import { Box, Button } from "@mui/material";
import { MdAddBox } from "react-icons/md";

export default function GymIntegrationCardOperatorManagement() {
    return (
        <Box>
            <Button
                className='bg-white w-[200px] h-[200px] !rounded-3xl items-center justify-center flex flex-col !mx-4 !font-normal !border-dashed !border-[1px]'
                style={{ textTransform: 'none', fontFamily: 'Poppins' }}
                sx={{
                    background: '#ff033511',
                    color: '#ff033524',
                    transition: 'transform 0.3s, background-color 0.3s, color 0.3s,',
                    '&:hover': {
                        color: '#4b5563',
                    },
                }}
            >
                <MdAddBox className='text-[2.3rem] color-primary' />
                <Box className='flex flex-col mt-3 color-primary'>Nova Operadora</Box>
            </Button>
        </Box>
    );
}

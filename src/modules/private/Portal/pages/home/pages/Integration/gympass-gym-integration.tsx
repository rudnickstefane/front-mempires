import { Box, Button, TextField, Typography } from "@mui/material";

export default function GymIntegrationGympassManagement() {
    return (
        <Box>
            {/* <Box className='border border-neutral-300 rounded-lg py-4 px-4'></Box> */}
            <Box className='mt-1 mb-5'>
                <Typography className='text-[#404040] !text-[.875rem] text-center'>
                    Informe seu Gympass ID abaixo para começar a integração.
                </Typography>
            </Box>
            {/* Input para Gympass ID e botão de integração */}
            <Box className='flex flex-col items-center justify-center'>
                <TextField
                    label="ID"
                    variant="outlined"
                    className="font-poppins w-[20rem] !mr-3"
                />
                <Button
                    variant="contained"
                    href="#"
                    color="primary"
                    style={{ color: 'white', fontFamily: 'Poppins', width: '12.5rem', height: '3rem' }}
                    sx={{
                        background: '#ff0336',
                        transition: 'transform 0.3s, background-color 0.3s',
                        marginTop: '1rem',
                        '&:hover': {
                            background: '#FF0000'
                        },
                    }}
                >Iniciar Integração</Button>
            </Box>
        </Box>
    );
}

import { Box, Button, TextField } from "@mui/material";

export default function GymIntegrationTotalPassManagement() {
    return (
        <Box>
            {/* <Box className='border border-neutral-300 rounded-lg py-4 px-4'></Box> */}
            {/* Input para Gympass ID e botão de integração */}
            <Box className='flex flex-col items-center justify-center'>
                <TextField
                    required
                    label="API Key"
                    variant="outlined"
                    className="font-poppins w-[20rem] !mr-3 !mb-5"
                />
                <TextField
                    required
                    label="Código de Integração"
                    variant="outlined"
                    className="font-poppins w-[20rem] !mr-3"
                />
                <Button
                    variant="contained"
                    href="#"
                    color="primary"
                    style={{ color: 'white', fontFamily: 'Poppins', width: '12rem', height: '3rem' }}
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

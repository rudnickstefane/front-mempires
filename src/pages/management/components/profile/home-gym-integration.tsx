import { Box, TextField, Typography } from "@mui/material";

export default function GymAccountManagement() {
    return (
        <Box>
            <Box className='mt-1 mb-5'>
                <Typography className='text-[#404040] !text-[.875rem] text-center'>
                    Aqui você pode ver e gerenciar todas as suas integrações ativas. Mantenha-as atualizadas para garantir o funcionamento correto dos seus serviços.
                </Typography>
            </Box>
            <Box className='border border-neutral-300 rounded-lg p-4'>
                <Box className='text-black text-[1.3rem] mb-7'>Informações Pessoais</Box>
                <TextField
                    disabled
                    required
                    InputLabelProps={{ shrink: true }}
                    label="Nome Completo"
                    variant="outlined"
                    value={"Alexandre Lindote Martins"}
                    className="font-poppins w-[20rem] !mr-3 !mb-5"
                />
                <TextField
                    disabled
                    required
                    InputLabelProps={{ shrink: true }}
                    label="CPF"
                    variant="outlined"
                    value={"000.000.000-00"}
                    className="font-poppins w-[20rem] !mr-3 !mb-5"
                />
                <TextField
                    disabled
                    required
                    InputLabelProps={{ shrink: true }}
                    label="Data de Nascimento"
                    variant="outlined"
                    value={"14/09/2024"}
                    className="font-poppins w-[20rem] !mr-3 !mb-5"
                />
                <TextField
                    disabled
                    required
                    InputLabelProps={{ shrink: true }}
                    label="E-mail"
                    variant="outlined"
                    value={"alexandre@gmail.com"}
                    className="font-poppins w-[20rem] !mr-3 !mb-5"
                />
                <TextField
                    disabled
                    required
                    InputLabelProps={{ shrink: true }}
                    label="Senha"
                    type="password"
                    variant="outlined"
                    value={"14/09/2024"}
                    className="font-poppins w-[20rem] !mr-3 !mb-5"
                />
            </Box>
        </Box>
    );
}

import { Box, IconButton, TableCell, TableContainer, Typography } from "@mui/material";

import {
    Switch,
    Table,
    TableBody,
    TableHead,
    TableRow
} from '@mui/material';

import MoreVertIcon from '@mui/icons-material/MoreVert';

const dadosSimulados = [
    {
        ativo: true,
        nome: 'Entrada',
        tipo: 'Catraca',
        ultimaAlteracao: '01/09/2023',
    },
    {
        ativo: true,
        nome: 'Saída',
        tipo: 'Catraca',
        ultimaAlteracao: '01/09/2023',
    },
    {
        ativo: false,
        nome: 'Gympass',
        tipo: 'Integração',
        ultimaAlteracao: '15/08/2023',
    },
    {
        ativo: true,
        nome: 'TotalPass',
        tipo: 'Integração',
        ultimaAlteracao: '30/07/2023',
    }
];

export default function GymAdminHomeManagement() {
    return (
        <Box>
            <Box className='mt-1 mb-5'>
                <Typography className='text-[#404040] !text-[.875rem] text-center'>
                    Aqui você pode ver e gerenciar todas as suas integrações ativas. Mantenha-as atualizadas para garantir o funcionamento correto dos seus serviços.
                </Typography>
            </Box>
            <Box className='border border-neutral-300 rounded-lg'>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    <Box>
                                        <Typography>
                                            Ativo
                                        </Typography>
                                    </Box>
                                </TableCell>

                                <TableCell>
                                    <Box>
                                        <Typography>
                                            Nome
                                        </Typography>
                                    </Box>
                                </TableCell>

                                <TableCell>
                                    <Box>
                                        <Typography>Tipo</Typography>
                                    </Box>
                                </TableCell>

                                <TableCell>
                                    <Box>
                                        <Typography>Última Alteração</Typography>
                                    </Box>
                                </TableCell>

                                <TableCell>
                                    <Box textAlign="center">
                                        <Typography>Ações</Typography>
                                    </Box>
                                </TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {dadosSimulados.map((dado, index) => (
                                <TableRow key={index} hover>
                                    <TableCell>
                                        <Switch checked={dado.ativo} />
                                    </TableCell>

                                    <TableCell>
                                        <Typography noWrap>{dado.nome}</Typography>
                                    </TableCell>

                                    <TableCell>
                                        <Typography noWrap>{dado.tipo}</Typography>
                                    </TableCell>

                                    <TableCell>
                                        <Typography noWrap>{dado.ultimaAlteracao}</Typography>
                                    </TableCell>

                                    <TableCell>
                                        <Box textAlign="center">
                                            <IconButton>
                                                <MoreVertIcon />
                                            </IconButton>
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Box>
    );
}

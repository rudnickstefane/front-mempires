import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Box, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";

const dadosSimulados = [
    {
        turma: 'Ballet',
        modalidade: 'Geral',
        dias: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
        professores: 'Bruna',
        local: 'Sala A',
    },
    {
        turma: 'Natação',
        modalidade: 'Geral',
        dias: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
        professores: 'Gabriel',
        local: 'Sala C',
    }
];

export default function GymAdminFrequenciesManagement() {
    return (
        <Box>
            <Box className='border border-neutral-300 rounded-lg'>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    <Box>
                                        <Typography>
                                            Aluno
                                        </Typography>
                                    </Box>
                                </TableCell>

                                <TableCell>
                                    <Box>
                                        <Typography>
                                            Modalidade
                                        </Typography>
                                    </Box>
                                </TableCell>

                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {dadosSimulados.map((dado, index) => (
                                <TableRow key={index} hover>
                                    <TableCell>
                                        <Typography noWrap>{dado.turma}</Typography>
                                    </TableCell>

                                    <TableCell>
                                        <Typography noWrap>{dado.modalidade}</Typography>
                                    </TableCell>

                                    <TableCell>
                                        <Box textAlign="center">
                                            <IconButton>
                                                <MoreHorizIcon />
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

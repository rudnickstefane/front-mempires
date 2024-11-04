import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Box, Button, Chip, Divider, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useState } from 'react';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { PiUsersThree } from 'react-icons/pi';

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

export default function GymAdminClassesManagement() {
    const [diasSelecionados, setDiasSelecionados] = useState<string[]>([]);

    // Função para alternar a seleção de dias
    const toggleDiaSelecionado = (dia: string) => {
        setDiasSelecionados((prev) =>
            prev.includes(dia) ? prev.filter((d) => d !== dia) : [...prev, dia]
        );
    };

    return (
        <Box>
            <Box className='flex flex-row justify-between items-center'>
                <Box>
                    <Typography className='flex flex-row items-center !text-[2.25rem] text-[#212121]'>
                        Turmas
                    </Typography>
                    <Typography className='flex flex-row items-center !text-[.85rem] !mt-4'>
                        Administrativo<MdKeyboardArrowRight />Turmas
                    </Typography>
                </Box>
                <Button
                    startIcon={<PiUsersThree />}
                    variant="contained"
                    href="#"
                    color="primary"
                    style={{ color: 'white', fontFamily: 'Poppins', width: '12rem', height: '3rem' }}
                    sx={{
                        background: '#ff0336',
                        transition: 'transform 0.3s, background-color 0.3s',
                        '&:hover': {
                            background: '#FF0000'
                        },
                    }}
                >Nova Turma</Button>
            </Box>
            <Divider className='!my-5 w-full bg-[#e2e2e4]' />
            <Box className='border border-neutral-300 rounded-lg'>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    <Box>
                                        <Typography>
                                            Turma
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

                                <TableCell>
                                    <Box>
                                        <Typography>
                                            Dias
                                        </Typography>
                                    </Box>
                                </TableCell>

                                <TableCell>
                                    <Box>
                                        <Typography>Professores</Typography>
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
                                        {/* Exibe os dias como bolinhas usando o componente Chip */}
                                        {dado.dias.map((dia) => (
                                            <Chip
                                                key={dia}
                                                label={dia}
                                                clickable
                                                onClick={() => toggleDiaSelecionado(dia)}
                                                sx={{
                                                    margin: '2px',
                                                    backgroundColor: diasSelecionados.includes(dia) ? '#ff0336' : '#e0e0e0',
                                                    color: diasSelecionados.includes(dia) ? 'white' : 'black',
                                                }}
                                            />
                                        ))}
                                    </TableCell>

                                    <TableCell>
                                        <Typography noWrap>{dado.professores}</Typography>
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

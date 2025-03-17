import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Box, Button, Divider, IconButton, Link, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { LiaUserTieSolid } from 'react-icons/lia';
import { MdKeyboardArrowRight } from 'react-icons/md';

const dadosSimulados = [
    {
        ativo: true,
        nome: 'Igor Anthony Vicente de Paula',
        documento: '8879492',
        periodicidade: 'Nutricionista',
        valor: '100,00',
    },
    {
        ativo: true,
        nome: 'Beatriz Betina Fogaça',
        documento: '0173977',
        periodicidade: 'Personal Trainer',
        valor: '140,00',
    },
    {
        ativo: false,
        nome: 'Rudnick Stefane Nogueira Santana',
        documento: '8879492',
        periodicidade: 'Professor',
        valor: '100,00',
    },
    {
        ativo: false,
        nome: 'Elisa Raimunda Teixeira',
        documento: '3296972',
        periodicidade: 'Gerente',
        valor: '140,00',
    },
    {
        ativo: true,
        nome: 'Eloá Isabella Maya Barbosa',
        documento: '9564339',
        periodicidade: 'Recepcionista',
        valor: '140,00',
    },
];

export default function ContributorsGymAdmin() {
    return (
        <>
            <Box className="overflow-x-auto max-h-[calc(100vh-60px)] p-5 pb-[4rem]">
                <Box className="flex flex-row w-full">
                    <Box className="bg-white w-full rounded-3xl shadow-md p-5 border border-[#EAECF0]">
                        <Box className='flex flex-row justify-between items-center'>
                            <Box>
                                <Typography className='flex flex-row items-center !text-[2.25rem] text-[#212121]'>
                                    Colaboradores
                                </Typography>
                                <Typography className='flex flex-row items-center !text-[.85rem] !mt-4'>
                                    Administrativo<MdKeyboardArrowRight />Colaboradores
                                </Typography>
                            </Box>
                            <Button
                                startIcon={<LiaUserTieSolid />}
                                variant="contained"
                                href="#"
                                color="primary"
                                style={{ color: 'white', fontFamily: 'Poppins', width: '14rem', height: '3rem' }}
                                sx={{
                                    background: '#ff0336',
                                    transition: 'transform 0.3s, background-color 0.3s',
                                    '&:hover': {
                                        background: '#FF0000'
                                    },
                                }}
                            >Novo Colaborador</Button>
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
                                                    <Typography>Cargo</Typography>
                                                </Box>
                                            </TableCell>

                                            <TableCell></TableCell>
                                        </TableRow>
                                    </TableHead>

                                    <TableBody>
                                        {dadosSimulados.map((dado, index) => (
                                            <TableRow key={index} hover>
                                                <TableCell>
                                                    <Switch checked={dado.ativo} />
                                                </TableCell>

                                                <TableCell>
                                                    {/* Link específico para cada aluno */}
                                                    <Link href={`/aluno/${dado.documento}`} underline="none">
                                                        <Typography noWrap>{dado.nome}</Typography>
                                                    </Link>
                                                </TableCell>

                                                <TableCell>
                                                    <Typography noWrap>{dado.periodicidade}</Typography>
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
                </Box>
            </Box>
        </>
    );
}

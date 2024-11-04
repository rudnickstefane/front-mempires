import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Box, Button, Divider, IconButton, Link, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { LiaTruckLoadingSolid } from 'react-icons/lia';
import { MdKeyboardArrowRight } from 'react-icons/md';

const dadosSimulados = [
    {
        ativo: true,
        nome: 'Igor Anthony Vicente de Paula',
        documento: '8879492',
        periodicidade: 'Mensal',
        valor: '100,00',
    },
    {
        ativo: true,
        nome: 'Beatriz Betina Fogaça',
        documento: '0173977',
        periodicidade: 'Mensal',
        valor: '140,00',
    },
    {
        ativo: false,
        nome: 'Rudnick Stefane Nogueira Santana',
        documento: '8879492',
        periodicidade: 'Mensal',
        valor: '100,00',
    },
    {
        ativo: false,
        nome: 'Elisa Raimunda Teixeira',
        documento: '3296972',
        periodicidade: 'Mensal',
        valor: '140,00',
    },
    {
        ativo: true,
        nome: 'Eloá Isabella Maya Barbosa',
        documento: '9564339',
        periodicidade: 'Mensal',
        valor: '140,00',
    },
];

export default function GymAdminSuppliersManagement() {
    return (
        <Box>
            <Box className='flex flex-row justify-between items-center'>
                <Box>
                    <Typography className='flex flex-row items-center !text-[2.25rem] text-[#212121]'>
                        Fornecedores
                    </Typography>
                    <Typography className='flex flex-row items-center !text-[.85rem] !mt-4'>
                        Administrativo<MdKeyboardArrowRight />Fornecedores
                    </Typography>
                </Box>
                <Button
                    startIcon={<LiaTruckLoadingSolid />}
                    variant="contained"
                    href="#"
                    color="primary"
                    style={{ color: 'white', fontFamily: 'Poppins', width: '13rem', height: '3rem' }}
                    sx={{
                        background: '#ff0336',
                        transition: 'transform 0.3s, background-color 0.3s',
                        '&:hover': {
                            background: '#FF0000'
                        },
                    }}
                >Novo Fornecedor</Button>
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
                                            Fornecedor
                                        </Typography>
                                    </Box>
                                </TableCell>

                                <TableCell>
                                    <Box>
                                        <Typography>CPF ou CNPJ</Typography>
                                    </Box>
                                </TableCell>

                                <TableCell>
                                    <Box>
                                        <Typography>Cidade</Typography>
                                    </Box>
                                </TableCell>

                                <TableCell>
                                    <Box>
                                        <Typography>Telefone</Typography>
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
                                        <Typography noWrap>{dado.periodicidade}</Typography>
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
    );
}

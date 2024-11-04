import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Box, Button, Divider, IconButton, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { HiOutlineUserGroup } from 'react-icons/hi2';
import { MdKeyboardArrowRight } from 'react-icons/md';

const dadosSimulados = [
    {
        ativo: true,
        nome: 'Financeiro',
        documento: '7',
        periodicidade: 'Mensal',
        valor: '100,00',
    },
    {
        ativo: true,
        nome: 'Recepção',
        documento: '2',
        periodicidade: 'Mensal',
        valor: '140,00',
    },
    {
        ativo: false,
        nome: 'Administrativo',
        documento: '1',
        periodicidade: 'Mensal',
        valor: '100,00',
    },
    {
        ativo: false,
        nome: 'Professor',
        documento: '2',
        periodicidade: 'Mensal',
        valor: '140,00',
    },
    {
        ativo: true,
        nome: 'Personal',
        documento: '5',
        periodicidade: 'Mensal',
        valor: '140,00',
    },
];

export default function GymAdminGroupsManagement() {
    return (
        <Box>
            <Box className='flex flex-row justify-between items-center'>
                <Box>
                    <Typography className='flex flex-row items-center !text-[2.25rem] text-[#212121]'>
                        Grupos de <Box className="color-primary ml-3">Acesso</Box>
                    </Typography>
                    <Typography className='flex flex-row items-center !text-[.85rem] !mt-4'>
                        Administrativo<MdKeyboardArrowRight />Perfil e Configurações<MdKeyboardArrowRight />Permissões
                    </Typography>
                </Box>
                <Button
                    startIcon={<HiOutlineUserGroup />}
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
                >Novo Grupo</Button>
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
                                            Nome do Grupo
                                        </Typography>
                                    </Box>
                                </TableCell>

                                <TableCell>
                                    <Box>
                                        <Typography>Descrição</Typography>
                                    </Box>
                                </TableCell>

                                <TableCell>
                                    <Box>
                                        <Typography>Usuários</Typography>
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
                                        <Typography noWrap>{dado.nome}</Typography>
                                    </TableCell>

                                    <TableCell>
                                        <Typography noWrap>{dado.valor}</Typography>
                                    </TableCell>

                                    <TableCell>
                                        <Box textAlign="center">
                                            <Typography noWrap>{dado.documento}</Typography>
                                        </Box>
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

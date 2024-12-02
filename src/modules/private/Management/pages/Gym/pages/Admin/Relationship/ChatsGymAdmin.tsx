import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Box, Button, Divider, Drawer, IconButton, Link, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { IoChatbubblesOutline } from 'react-icons/io5';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { ChatCreateDrawer } from '../../../../../components/Drawer';
import { AdminGymDrawerType } from '../../../types';

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
        nome: 'Rudnick Stefane No...',
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

export default function ChatsGymAdmin() {

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [drawerType, setDrawerType] = useState<AdminGymDrawerType[keyof AdminGymDrawerType] | null>(null);

    const { enqueueSnackbar } = useSnackbar();

    const openDrawer = (type: AdminGymDrawerType[keyof AdminGymDrawerType]) => {
        setDrawerType(type);
        setIsDrawerOpen(true);
    };

    const closeDrawer = () => {
        setDrawerType(null);
        setIsDrawerOpen(false);
    };

    const renderDrawerContent = () => {
        switch (drawerType) {
            case 'ChatCreate':
                return <ChatCreateDrawer closeDrawer={closeDrawer} enqueueSnackbar={enqueueSnackbar}/>;

            default:
                break;
        }
    };

    return (
        <Box>
            {/* Drawer */}
            <Drawer
                anchor="right"
                open={isDrawerOpen}
                onClose={closeDrawer}
                PaperProps={{
                    className: "w-[60%] p-8"
                }}
            >
                {renderDrawerContent()}
            </Drawer>

            <Box className='flex flex-row justify-between items-center'>
                <Box>
                    <Typography className='flex flex-row items-center !text-[2.25rem] text-[#212121]'>
                        Conversas
                    </Typography>
                    <Typography className='flex flex-row items-center !text-[.85rem] !mt-4'>
                        Administrativo<MdKeyboardArrowRight />Relacionamento<MdKeyboardArrowRight />Contatos
                    </Typography>
                </Box>
                <Button
                    startIcon={<IoChatbubblesOutline />}
                    variant="contained"
                    color="primary"
                    style={{ color: 'white', fontFamily: 'Poppins', width: '12.5rem', height: '3rem' }}
                    sx={{
                        background: '#ff0336',
                        transition: 'transform 0.3s, background-color 0.3s',
                        '&:hover': {
                            background: '#FF0000'
                        },
                    }}
                    onClick={() => openDrawer('ChatCreate')}
                >Nova Conversa</Button>
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
                                            Matrícula
                                        </Typography>
                                    </Box>
                                </TableCell>

                                <TableCell>
                                    <Box>
                                        <Typography>
                                            Aluno
                                        </Typography>
                                    </Box>
                                </TableCell>

                                <TableCell>
                                    <Box>
                                        <Typography>Periodicidade</Typography>
                                    </Box>
                                </TableCell>

                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {dadosSimulados.map((dado, index) => (
                                <TableRow key={index} hover>
                                    <TableCell>
                                        <Typography noWrap>{dado.documento}</Typography>
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
    );
}

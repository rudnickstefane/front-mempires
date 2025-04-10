import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Box, Button, Divider, Drawer, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, Pagination, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useSnackbar } from 'notistack';
import { BiSupport } from 'react-icons/bi';
import { CiFolderOff } from 'react-icons/ci';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { TbListDetails } from 'react-icons/tb';
import { QueueBadge, StatusBadge } from '../../../../../components/Badges/PaymentBadge';
import { useCoreTicket } from '../../../../Gym/hooks';

export default function Protocols() {

    const { enqueueSnackbar } = useSnackbar();

    const {
        itemsPerPage,
        handleItemsPerPageChange,
        startIndex,
        endIndex,
        totalItems,
        totalPages,
        currentPage,
        handlePageChange,
        handleMoreDetails,
        anchorEls,
        handleOpenMore,
        handleCloseMore,
        isMenuOpen,
        ticketsToDisplay,
        isDetailsView,
        renderComponentContent,
        renderDrawerContent,
        isDrawerOpen,
        closeDrawer,
        openDrawer
    } = useCoreTicket({ enqueueSnackbar });

    return (
        <>
            {/* Drawer */}
            <Drawer
                disableEnforceFocus
                anchor="right"
                open={isDrawerOpen}
                onClose={closeDrawer}
                PaperProps={{
                    className: "w-[60%] p-8"
                }}
            >
                {renderDrawerContent()}
            </Drawer>

            {!isDetailsView ? (
                <>
                    <Box className='flex flex-row justify-between items-center'>
                        <Box>
                            <Typography className='flex flex-row items-center !text-[2.25rem] text-[#212121]'>
                                Protocolos
                            </Typography>
                            <Typography className='flex flex-row items-center !text-[.85rem] !mt-4'>
                                Suporte<MdKeyboardArrowRight className='mx-1.5' />Meus protocolos
                            </Typography>
                        </Box>
                        <Button
                            startIcon={<BiSupport />}
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
                            onClick={() => openDrawer('TicketCreate')}
                        >Novo Protocolo</Button>
                    </Box>
                    <Divider className='!my-5 w-full bg-[#e2e2e4]' />
                    <Box className="overflow-x-auto border border-neutral-300 rounded-lg w-full">
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Status</TableCell>
                                        <TableCell>Código</TableCell>
                                        <TableCell>Aberto em</TableCell>
                                        <TableCell>Assunto</TableCell>
                                        <TableCell>Área</TableCell>
                                        <TableCell></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                {ticketsToDisplay && ticketsToDisplay.length > 0 ? (
                                    ticketsToDisplay.sort((a, b) => 
                                        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                                    ).map((ticket, index) => (
                                    <TableRow
                                        key={index}
                                        sx={{
                                            transition: "transform 0.3s, background-color 0.3s, border-color 0.3s ease",
                                            borderLeft: '3px solid transparent',
                                            borderRight: '3px solid transparent',
                                            "&:hover": {
                                                background: "#f9fafb",
                                                borderLeft: '3px solid red',
                                            },
                                        }}
                                    >
                                        <TableCell><StatusBadge status={ticket.status} /></TableCell>
                                        <TableCell>
                                            PRL-{ticket.ticketCode}
                                        </TableCell>
                                        <TableCell>
                                            {ticket.createdAt}
                                        </TableCell>
                                        <TableCell className="max-w-[10rem]">
                                            <Box
                                                className='cursor-pointer color-primary hover:!text-red-600 whitespace-nowrap overflow-hidden text-ellipsis'
                                                onClick={() => handleMoreDetails(ticket.ticketCode, 'PROTOCOL')}
                                                sx={{
                                                    transition: "transform 0.3s, background-color 0.3s",
                                                }}
                                            >
                                                    {ticket.name}
                                            </Box>
                                        </TableCell>
                                        <TableCell className="max-w-[10rem]">
                                            <Box
                                                className='whitespace-nowrap overflow-hidden text-ellipsis'
                                            >
                                                <QueueBadge payment={ticket.queue} />
                                            </Box>
                                        </TableCell>
                                        <TableCell>
                                            <Box textAlign="center">
                                                <IconButton
                                                    className='w-[2rem] h-[2rem]'
                                                    onClick={(event) => handleOpenMore(event, ticket.ticketCode)}
                                                    style={{
                                                        backgroundColor: isMenuOpen(ticket.ticketCode) ? '#0000000a' : '',
                                                    }}
                                                >
                                                    <MoreHorizIcon />
                                                </IconButton>
                                                <Menu
                                                    anchorEl={anchorEls[ticket.ticketCode]}
                                                    open={Boolean(anchorEls[ticket.ticketCode])}
                                                    onClose={() => handleCloseMore(ticket.ticketCode)}
                                                    slotProps={{
                                                        paper: {
                                                            sx: {
                                                                borderRadius: '.7rem',
                                                                padding: '0 .4rem',
                                                                mt: 1.5,
                                                            },
                                                        },
                                                    }}
                                                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                                                >
                                                    <MenuItem
                                                        onClick={() => handleMoreDetails(ticket.ticketCode, 'PROTOCOL')}
                                                        sx={{
                                                            borderRadius: '.4rem',
                                                            margin: '.2rem 0',
                                                            '&:hover': {
                                                                backgroundColor: '#0000000a !important',
                                                                color: '#000000de !important'
                                                            }
                                                        }}
                                                    >
                                                        <ListItemIcon className='!-mr-1.5'>
                                                            <TbListDetails className='text-[1.5rem]' />
                                                        </ListItemIcon>
                                                        <ListItemText primary="Mais detalhes" />
                                                    </MenuItem>
                                                </Menu>
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={7} align="center">
                                            <Box className='flex flex-col items-center my-4'>
                                                <CiFolderOff className='text-[3rem] mb-4 text-gray-600'/>
                                                Nenhum registro encontrado
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        {/* Paginação e Itens por Página */}
                        <Box className="flex justify-between items-center px-6 py-3 border-l border-r border-b border-[#EAECF0] rounded-b-lg">
                            {/* Selecionar Itens por Página */}
                            <Box className="flex items-center gap-2">
                                <Select
                                    value={itemsPerPage}
                                    onChange={handleItemsPerPageChange}
                                    size="small"
                                    className="w-[5rem]"
                                >
                                    {[5, 10, 15, 20, 25, 50].map((value) => (
                                    <MenuItem key={value} value={value}>
                                        {value}
                                    </MenuItem>
                                ))}
                                </Select>
                                <Typography variant="body2">Itens por página</Typography>
                                <Box className='border-l border-gray-400 mx-2 h-4'></Box>
                                <Typography variant="body2">
                                    {startIndex + 1} - {Math.min(endIndex, totalItems)} de{" "}
                                    {totalItems} registro(s)
                                </Typography>
                            </Box>

                            {/* Navegação por Páginas */}
                            <Pagination
                                count={totalPages}
                                page={currentPage}
                                onChange={handlePageChange}
                                color="primary"
                                size="small"
                            />
                        </Box>
                    </Box>
                </>
            ) : (
                renderComponentContent()
            )}
        </>
    );
}

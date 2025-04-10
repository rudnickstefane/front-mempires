import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Box, Divider, Drawer, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, Pagination, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography } from "@mui/material";
import { CiFolderOff } from 'react-icons/ci';
import { GiPayMoney } from 'react-icons/gi';
import { TbListDetails } from 'react-icons/tb';
import { PaymentBadge } from '../../components/Badges/PaymentBadge';
import { useInvoice } from '../Gym/hooks';
import { GymManagementProps } from '../Gym/types';

export default function Invoices ({ enqueueSnackbar }: GymManagementProps) {
    const {
        isDrawerOpen,
        renderDrawerContent,
        closeDrawer,
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
        transactionsToDisplay,
        handleReceiveTransaction
    } = useInvoice({ enqueueSnackbar });

    return (
        <Box>
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

            <Box className="overflow-x-auto max-h-[calc(100vh-60px)] p-5 pb-[4rem]">
                <Box className="flex flex-row w-full">
                    <Box className="bg-white w-full rounded-3xl shadow-md p-5 border border-[#EAECF0]">
                        <Box className='flex flex-row justify-between items-center'>
                            <Box>
                                <Typography className='flex flex-row items-center !text-[2.25rem] text-[#212121]'>
                                    Faturas
                                </Typography>
                                <Typography className='flex flex-row items-center !text-[.85rem] !mt-4'>
                                    Minhas faturas
                                </Typography>
                            </Box>
                        </Box>
                        <Divider className='!my-5 w-full bg-[#e2e2e4]' />
                        <Box className="overflow-x-auto border border-neutral-300 rounded-lg w-full">
                            <TableContainer>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Código</TableCell>
                                            <TableCell>Descrição</TableCell>
                                            <TableCell>Valor</TableCell>
                                            <TableCell>Status</TableCell>
                                            <TableCell>Vencimento</TableCell>
                                            <TableCell>Data de emissão</TableCell>
                                            <TableCell></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                    {transactionsToDisplay && transactionsToDisplay.length > 0 ? (
                                        transactionsToDisplay.sort((a, b) => 
                                            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                                        ).map((transaction, index) => (
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
                                            <TableCell>TRA-{transaction.transactionCode}</TableCell>
                                            <TableCell className="max-w-[10rem]">
                                                    <Tooltip
                                                        title={
                                                            <>
                                                            {transaction.description}
                                                            </>
                                                        }
                                                        placement="left"
                                                        arrow
                                                    >
                                                        <Box className='whitespace-nowrap overflow-hidden text-ellipsis'>
                                                            {transaction.description}
                                                        </Box>
                                                    </Tooltip>
                                            </TableCell>
                                            <TableCell>R$ {transaction.amount}</TableCell>
                                            <TableCell>
                                                <PaymentBadge payment={transaction.paymentStatus} />
                                            </TableCell>
                                            <TableCell>{transaction.dueDate}</TableCell>
                                            <TableCell>{transaction.createdAt}</TableCell>
                                            <TableCell>
                                                <Box textAlign="center">
                                                    <IconButton
                                                        className='w-[2rem] h-[2rem]'
                                                        onClick={(event) => handleOpenMore(event, transaction.transactionCode)}
                                                        style={{
                                                            backgroundColor: isMenuOpen(transaction.transactionCode) ? '#0000000a' : '',
                                                        }}
                                                    >
                                                        <MoreHorizIcon />
                                                    </IconButton>
                                                    <Menu
                                                        anchorEl={anchorEls[transaction.transactionCode]}
                                                        open={Boolean(anchorEls[transaction.transactionCode])}
                                                        onClose={() => handleCloseMore(transaction.transactionCode)}
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
                                                            onClick={() => handleMoreDetails(transaction.transactionCode)}
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
                                                        {['PENDING'].includes(transaction.paymentStatus) && (
                                                            <MenuItem
                                                                onClick={() => handleReceiveTransaction(transaction.transactionCode)}
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
                                                                    <GiPayMoney className='text-[1.5rem]' />
                                                                </ListItemIcon>
                                                                <ListItemText primary="Pagar" />
                                                            </MenuItem>
                                                        )}                    
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
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}

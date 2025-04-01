import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Box, Button, Divider, Drawer, Fade, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, Modal, Pagination, Select, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useSnackbar } from 'notistack';
import { BiEditAlt } from 'react-icons/bi';
import { CiFolderOff } from 'react-icons/ci';
import { HiOutlineUserGroup } from 'react-icons/hi';
import { MdKeyboardArrowRight, MdOutlineDeleteOutline } from 'react-icons/md';
import { TbListDetails, TbProgressAlert } from 'react-icons/tb';
import { PositionBadge } from '../../../../components/Badges/PaymentBadge';
import { useGroupsGymAdmin } from '../../hooks';

export default function GroupAccessGymAdmin() {

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
        handleAlterGroup,
        handleDeletePlan,
        handleConfirmDelete,
        modalConfirmDelete,
        handleCloseConfirmDelete,
        isMenuOpen,
        groupsToDisplay,
        renderDrawerContent,
        isDrawerOpen,
        closeDrawer,
        openDrawer,
        handleStatusPlan,
        isDetailsView,
        renderComponentContent,
    } = useGroupsGymAdmin({ enqueueSnackbar });

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

            {!isDetailsView ? (
                <>
                    <Box className='flex flex-row justify-between items-center'>
                        <Box>
                            <Typography className='flex flex-row items-center !text-[2.25rem] text-[#212121]'>
                                Grupos de <Box className="color-primary ml-3">Acesso</Box>
                            </Typography>
                            <Typography className='flex flex-row items-center !text-[.85rem] !mt-4'>
                                Administrativo<MdKeyboardArrowRight />Configurações<MdKeyboardArrowRight />Permissões
                            </Typography>
                        </Box>
                        <Button
                            startIcon={<HiOutlineUserGroup />}
                            variant="contained"
                            color="primary"
                            style={{ color: 'white', fontFamily: 'Poppins', width: '14rem', height: '3rem' }}
                            sx={{
                                background: '#ff0336',
                                transition: 'transform 0.3s, background-color 0.3s',
                                '&:hover': {
                                    background: '#FF0000'
                                },
                            }}
                            onClick={() => openDrawer('GroupRegister')}
                        >Novo Grupo</Button>
                    </Box>
                    <Divider className='!my-5 w-full bg-[#e2e2e4]' />
                    <Box className="overflow-x-auto border border-neutral-300 rounded-lg w-full">
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                    <TableCell className='!text-center w-[1rem]'>Ativo</TableCell>
                                    <TableCell>Nome do grupo</TableCell>
                                    <TableCell>Descrição</TableCell>
                                    <TableCell className='!text-right'>Usuários</TableCell>
                                    <TableCell></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                {groupsToDisplay && groupsToDisplay.length > 0 ? (
                                    groupsToDisplay.sort((a, b) => 
                                        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                                    ).map((group, index) => (
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
                                        <TableCell>
                                            <Switch
                                                checked={group.status === 'ACTIVE' ? true : false}
                                                onClick={() => handleStatusPlan(group.groupCode, group.status)}
                                            />
                                        </TableCell>
                                        <TableCell className="max-w-[10rem]">
                                            <Box
                                                className='cursor-pointer color-primary hover:!text-red-600 whitespace-nowrap overflow-hidden text-ellipsis'
                                                onClick={() => handleMoreDetails(group.groupCode)}
                                                sx={{
                                                    transition: "transform 0.3s, background-color 0.3s",
                                                }}
                                            >
                                                    {group.name}
                                            </Box>
                                        </TableCell>
                                        <TableCell className="max-w-[15rem]">
                                            <Box
                                                className='whitespace-nowrap overflow-hidden text-ellipsis'
                                            >
                                                <PositionBadge payment={group.description} />
                                            </Box>
                                        </TableCell>
                                        <TableCell className='!text-right'>{group.totalContributors}</TableCell>
                                        <TableCell>
                                            <Box textAlign="center">
                                                <IconButton
                                                    className='w-[2rem] h-[2rem]'
                                                    onClick={(event) => handleOpenMore(event, group.groupCode)}
                                                    style={{
                                                        backgroundColor: isMenuOpen(group.groupCode) ? '#0000000a' : '',
                                                    }}
                                                >
                                                    <MoreHorizIcon />
                                                </IconButton>
                                                <Menu
                                                    anchorEl={anchorEls[group.groupCode]}
                                                    open={Boolean(anchorEls[group.groupCode])}
                                                    onClose={() => handleCloseMore(group.groupCode)}
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
                                                        onClick={() => handleMoreDetails(group.groupCode)}
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
                                                    <MenuItem
                                                        onClick={() => handleAlterGroup(group.groupCode)}
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
                                                            <BiEditAlt className='text-[1.5rem]' />
                                                        </ListItemIcon>
                                                        <ListItemText primary="Alterar" />
                                                    </MenuItem>
                                                    <MenuItem
                                                        onClick={handleConfirmDelete}
                                                        sx={{ 
                                                            borderRadius: '.4rem',
                                                            margin: '.2rem 0',
                                                            '&:hover': {
                                                                backgroundColor: '#0000000a !important',
                                                                color: '#000000de !important'
                                                            }
                                                        }}
                                                        style={{
                                                            backgroundColor: modalConfirmDelete ? '#0000000a' : '',
                                                        }}
                                                    >
                                                        <ListItemIcon className='!-mr-1.5'>
                                                            <MdOutlineDeleteOutline className='text-[1.5rem]' />
                                                        </ListItemIcon>
                                                        <ListItemText primary="Excluir" />
                                                    </MenuItem>
                                                    <Modal
                                                        aria-labelledby="transition-modal-title"
                                                        aria-describedby="transition-modal-description"
                                                        open={modalConfirmDelete}
                                                        onClose={handleCloseConfirmDelete}
                                                        closeAfterTransition
                                                        className='flex items-center justify-center'
                                                        slotProps={{
                                                        backdrop: {
                                                            timeout: 500,
                                                        },
                                                        }}
                                                    >
                                                        <Fade in={modalConfirmDelete}>
                                                            <Box className="bg-white rounded-lg w-[500px] flex flex-col items-center p-7">
                                                                <MdOutlineDeleteOutline className="text-[#ff0336] text-[5.5rem] bg-[#ffe7ec] rounded-3xl p-5" />
                                                                <Typography className='text-center !text-[1.2rem] !mt-5'>Deseja excluir {group.name}?</Typography>
                                                                <Box className='bg-[#fef7e5] text-[#744600] p-5 rounded-3xl mt-5 text-[.9rem] w-full'>
                                                                    <Box className='flex flex-row items-center mb-2'>
                                                                    <TbProgressAlert className="text-[#744600] text-[1.5rem] mr-2" />
                                                                    <Typography variant="h6" component="h2">Atenção</Typography>
                                                                    </Box>
                                                                    <Typography className='!text-[.9rem]'>Esta ação é irreversível e todos os dados associados a este colaborador serão permanentemente removidos.</Typography>
                                                                </Box>
                                                                <Box className='flex flex-row justify-between mt-8 w-full'>
                                                                    <Button
                                                                        onClick={handleCloseConfirmDelete}
                                                                        variant="outlined"
                                                                        className='w-[45%]'
                                                                        sx={{
                                                                            backgroundColor: 'transparent',
                                                                            color: '#4b5563',
                                                                            borderColor: '#4b5563',
                                                                            '&:hover': {
                                                                                backgroundColor: '#d4d4d8',
                                                                                borderColor: '#4b5563',
                                                                            },
                                                                        }}
                                                                    >
                                                                        Cancelar
                                                                    </Button>
                                                                    <Button
                                                                        variant="contained"
                                                                        color="primary"
                                                                        className='w-[45%]'
                                                                        sx={{
                                                                        backgroundColor: '#ff0336',
                                                                        color: '#fff',
                                                                        height: '3rem',
                                                                        '&:hover': {
                                                                            backgroundColor: '#e6001b',
                                                                        },
                                                                        }}
                                                                        onClick={() => handleDeletePlan(group.groupCode)}
                                                                    >
                                                                        Excluir
                                                                    </Button>
                                                                </Box>
                                                            </Box>
                                                        </Fade>
                                                    </Modal>
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
        </Box>
    );
}

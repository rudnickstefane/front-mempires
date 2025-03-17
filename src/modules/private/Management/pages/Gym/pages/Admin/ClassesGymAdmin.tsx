import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Box, Button, Chip, Divider, Drawer, Fade, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, Modal, Pagination, Select, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography } from "@mui/material";
import { BiEditAlt } from 'react-icons/bi';
import { CiFolderOff } from 'react-icons/ci';
import { MdKeyboardArrowRight, MdOutlineDeleteOutline } from 'react-icons/md';
import { PiUsersThree } from 'react-icons/pi';
import { TbListDetails, TbProgressAlert } from 'react-icons/tb';
import { useClassesGymAdmin } from '../../hooks';
import { GymManagementProps } from '../../types';

const diasSemana = [
    { label: 'Dom', key: 'sundayStatus' },
    { label: 'Seg', key: 'mondayStatus' },
    { label: 'Ter', key: 'tuesdayStatus' },
    { label: 'Qua', key: 'wednesdayStatus' },
    { label: 'Qui', key: 'thursdayStatus' },
    { label: 'Sex', key: 'fridayStatus' },
    { label: 'Sáb', key: 'saturdayStatus' },
    { label: 'Fer', key: 'holidayStatus' },
];

export default function ClassesGymAdmin ({ enqueueSnackbar }: GymManagementProps) {
    const {
        isDrawerOpen,
        renderDrawerContent,
        openDrawer,
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
        searchText,
        setSearchText,
        anchorEls,
        handleOpenMore,
        handleCloseMore,
        handleAlterClasses,
        handleDeletePlan,
        handleConfirmDelete,
        modalConfirmDelete,
        handleCloseConfirmDelete,
        handleStatusPlan,
        isMenuOpen,
        classesToDisplay,
        isDetailsView,
        renderComponentContent,
        handleStatusDay
    } = useClassesGymAdmin({ enqueueSnackbar });

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
                <Box className="overflow-x-auto max-h-[calc(100vh-60px)] p-5 pb-[4rem]">
                    <Box className="flex flex-row w-full">
                        <Box className="bg-white w-full rounded-3xl shadow-md p-5 border border-[#EAECF0]">
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
                                    color="primary"
                                    style={{ color: 'white', fontFamily: 'Poppins', width: '12.5rem', height: '3rem' }}
                                    sx={{
                                        background: '#ff0336',
                                        transition: 'transform 0.3s, background-color 0.3s',
                                        '&:hover': {
                                            background: '#FF0000'
                                        },
                                    }}
                                    onClick={() => openDrawer('ClassCreate')}
                                >Nova Turma</Button>
                            </Box>
                            <Divider className='!my-5 w-full bg-[#e2e2e4]' />
                            <Box className="overflow-x-auto border border-neutral-300 rounded-lg w-full">
                                <TableContainer>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                            <TableCell className='!text-center w-[1rem]'>Ativo</TableCell>
                                            <TableCell>Turma</TableCell>
                                            <TableCell>Modalidades</TableCell>
                                            <TableCell>
                                                Dias
                                                <Tooltip
                                                    title={
                                                        <>
                                                            O aluno só poderá acessar a academia nos dias que estiverem ativos.
                                                        </>
                                                    } placement="left" arrow>
                                                    <IconButton
                                                        size="small"
                                                        sx={{ marginLeft: '5px' }}
                                                    >
                                                        <HelpOutlineIcon fontSize="small" />
                                                    </IconButton>
                                                </Tooltip>
                                            </TableCell>
                                            <TableCell>Vagas</TableCell>
                                            <TableCell></TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                        {classesToDisplay && classesToDisplay.length > 0 ? (
                                            classesToDisplay.sort((a, b) => 
                                                new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                                            ).map((classes, index) => (
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
                                                        checked={classes.status === 'ACTIVE' ? true : false}
                                                        onClick={() => handleStatusPlan(classes.classCode, classes.status)}
                                                    /></TableCell>
                                                <TableCell className="max-w-[10rem]">
                                                    <Box
                                                        className='cursor-pointer color-primary hover:!text-red-600 whitespace-nowrap overflow-hidden text-ellipsis'
                                                        onClick={() => handleMoreDetails(classes.classCode)}
                                                        sx={{
                                                            transition: "transform 0.3s, background-color 0.3s",
                                                        }}
                                                    >
                                                            {classes.name}
                                                    </Box>
                                                </TableCell>
                                                <TableCell>
                                                    <Box className='!flex !flex-row items-center'>
                                                        {classes.modalities && classes.modalities.length > 0 ? (
                                                            <>
                                                            {classes.modalities[0].name} {/* Exibe a primeira modalidade */}
                                                            {classes.modalities.length > 1 && (
                                                                <Tooltip
                                                                title={
                                                                    <>
                                                                    {classes.modalities.slice(1).map((modality, idx) => (
                                                                        <div key={idx}>{modality.name}</div>
                                                                    ))}
                                                                    </>
                                                                }
                                                                placement="right"
                                                                arrow
                                                                >
                                                                <Box
                                                                    className="bg-[#e8ebf4] rounded-full ml-2 px-2 py-[.1rem] text-[.8rem] cursor-pointer"
                                                                    sx={{
                                                                        transition: "transform 0.3s, background-color 0.3s",
                                                                        "&:hover": {
                                                                            background: "#ff0336",
                                                                            color: 'white',
                                                                        },
                                                                    }}
                                                                >
                                                                    + {classes.modalities.length - 1}
                                                                </Box>
                                                                </Tooltip>
                                                            )}
                                                            </>
                                                        ) : (
                                                            "Sem modalidades"
                                                        )}
                                                    </Box>
                                                </TableCell>
                                                <TableCell>
                                                    <Box className='!flex !flex-row items-center'>
                                                        {diasSemana.map(({ label, key }) => {
                                                            const isActive = classes[key];
                                                            
                                                            return (
                                                                <Chip
                                                                    key={label}
                                                                    label={label}
                                                                    clickable
                                                                    onClick={() => handleStatusDay(classes.classCode, key, isActive)}
                                                                    sx={{
                                                                        marginRight: '10px',
                                                                        backgroundColor: isActive ? '#ff0336' : '#e0e0e0',
                                                                        color: isActive ? 'white' : 'black',
                                                                        cursor: 'pointer',
                                                                        '&:hover': {
                                                                            backgroundColor: isActive ? '#cc0029' : '#d6d6d6',
                                                                        },
                                                                    }}
                                                                />
                                                            );
                                                        })}
                                                    </Box>
                                                </TableCell>
                                                <TableCell>
                                                    <Box className='!flex !flex-row items-center justify-center'>
                                                        {classes.studentsPerHour > 0 ? (
                                                            <>
                                                                {classes.studentsPerHour}
                                                            </>
                                                        ) : (
                                                            "Ilimitado"
                                                        )}
                                                    </Box>
                                                </TableCell>
                                                <TableCell>
                                                    <Box textAlign="center">
                                                        <IconButton
                                                            className='w-[2rem] h-[2rem]'
                                                            onClick={(event) => handleOpenMore(event, classes.classCode)}
                                                            style={{
                                                                backgroundColor: isMenuOpen(classes.classCode) ? '#0000000a' : '',
                                                            }}
                                                        >
                                                            <MoreHorizIcon />
                                                        </IconButton>
                                                        <Menu
                                                            anchorEl={anchorEls[classes.classCode]}
                                                            open={Boolean(anchorEls[classes.classCode])}
                                                            onClose={() => handleCloseMore(classes.classCode)}
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
                                                                onClick={() => handleMoreDetails(classes.classCode)}
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
                                                                onClick={() => handleAlterClasses(classes.classCode)}
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
                                                                        <Typography className='text-center !text-[1.2rem] !mt-5'>Deseja excluir a turma {classes.name}?</Typography>
                                                                        <Box className='bg-[#fef7e5] text-[#744600] p-5 rounded-3xl mt-5 text-[.9rem] w-full'>
                                                                            <Box className='flex flex-row items-center mb-2'>
                                                                            <TbProgressAlert className="text-[#744600] text-[1.5rem] mr-2" />
                                                                            <Typography variant="h6" component="h2">Atenção</Typography>
                                                                            </Box>
                                                                            <Typography className='!text-[.9rem]'>Esta ação é irreversível e todos os dados associados a esta turma serão permanentemente removidos.</Typography>
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
                                                                                onClick={() => handleDeletePlan(classes.classCode)}
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
                        </Box>
                    </Box>
                </Box>
            ) : (
                renderComponentContent()
            )}
        </Box>
    );
}

/* eslint-disable @typescript-eslint/no-explicit-any */
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Box, Button, Collapse, Divider, Drawer, Fade, IconButton, InputAdornment, InputLabel, ListItemIcon, ListItemText, Menu, MenuItem, Modal, Select as MuiSelect, Pagination, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Tooltip, Typography } from "@mui/material";
import { Key } from 'react';
import { BiEditAlt } from "react-icons/bi";
import { CiFolderOff, CiSearch } from "react-icons/ci";
import { FaRegCircleCheck } from 'react-icons/fa6';
import { GiReceiveMoney } from 'react-icons/gi';
import { GrUserManager } from 'react-icons/gr';
import { IoMdAddCircleOutline } from 'react-icons/io';
import { LuShieldAlert } from "react-icons/lu";
import { MdDeleteOutline, MdKeyboardArrowRight, MdOutlineDeleteOutline } from "react-icons/md";
import { PiUserSquareLight } from "react-icons/pi";
import { RiUserReceivedLine } from 'react-icons/ri';
import { SiFirewalla } from 'react-icons/si';
import { TbAdjustmentsSearch, TbAlertSquareRounded, TbArrowLeft, TbEdit, TbListDetails, TbPhotoEdit, TbProgressAlert, TbRotateClockwise2 } from "react-icons/tb";
import { TiCancel } from 'react-icons/ti';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import styled from "styled-components";
import { DrawerProps } from "../../../../../../../../common/types";
import { customNoOptionsMessage, customStyles } from '../../../../../../../../common/ui';
import { FormatZipCode } from "../../../../../../../../common/utils";
import { PaymentBadge } from "../../../../../../components/Badges/PaymentBadge";
import { ImageCropModal } from "../../../../../../components/Modals";
import { useStudentAlterForm } from "../../../../../../hooks";

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

export const GymStudentDetails = ({
    closeDrawer,
    enqueueSnackbar,
    data,
    refresh,
    onBack,
}: DrawerProps) => {

    const animatedComponents = makeAnimated();

    const {
        anchorEls,
        handleOpenMore,
        handleCloseMore,
        handleAlterTransaction,
        handleDeleteTransaction,
        handleConfirmDelete,
        handleMoreDetails,
        handleMoreDetailsReview,
        isMenuOpen,
        modalConfirmDelete,
        handleCloseConfirmDelete,
        itemsPerPage,
        handleItemsPerPageChange,
        startIndex,
        endIndex,
        totalItems,
        totalItemsPlans,
        totalPages,
        totalPagesPlans,
        currentPage,
        handlePageChange,
        searchText,
        setSearchText,
        renderDrawerContent,
        isDrawerOpen,
        openDrawer,
        closeDrawerDetails,
        isLoading,
        handleImageUpload,
        handleDeleteImage,
        handleCrop,
        image,
        croppedImage,
        isDialogOpen,
        setIsDialogOpen,
        cropperRef,
        setActiveView,
        activeView,
        detailsViews,
        setHoveredView,
        hoveredView,
        transactions,
        pendingTotal,
        formatAmount,
        advancedSearch,
        handleSelectChange,
        handleFocus,
        focusedFields,
        filterStatusOptions,
        selectedStatus,
        handleAdvancedSearch,
        handleReprocessTransaction,
        handleConfirmReprocess,
        handleCloseConfirmReprocess,
        modalConfirmReprocess,
        handleCancelTransaction,
        handleConfirmCancel,
        handleCloseConfirmCancel,
        modalConfirmCancel,
        handleReversedTransaction,
        handleReasonChange,
        cancelReason,
        handleReceiveTransaction,
        handleCreateTransaction,
        responseTransactions,
        studentPlans,
        handleStatusPlan,
        handleStudentPlanCreate,
        handleStudentPlansMoreDetails,
        reviews,
        startIndexPlans,
        endIndexPlans,
        startIndexReviews,
        endIndexReviews,
        totalItemsReviews,
        totalPagesReviews,
        handleDeleteReview,
        handleAlterReview
    } = useStudentAlterForm({ closeDrawer, enqueueSnackbar, data, refresh });

    const referralSourceOptions = [
        { value: 'billboard', label: 'Outdoor' },
        { value: 'call', label: 'Ligação' },
        { value: 'email', label: 'E-mail Marketing' },
        { value: 'facebook', label: 'Facebook' },
        { value: 'flyer', label: 'Panfleto' },
        { value: 'friend', label: 'Indicação de amigo' },
        { value: 'google', label: 'Google' },
        { value: 'instagram', label: 'Instagram' },
        { value: 'student', label: 'Indicação de aluno ou colaborador' },
        { value: 'website', label: 'Site' },
        { value: 'whatsapp', label: 'WhatsApp' },
        { value: 'others', label: 'Outros' },
    ];
    
    const selectedReferral = referralSourceOptions.find(option => option.value === data.referralSource);

    return (
        <>
            <Drawer
                disableEnforceFocus
                anchor="right"
                open={isDrawerOpen}
                onClose={closeDrawerDetails}
                PaperProps={{
                    className: "w-[60%] p-8"
                }}
            >
                {renderDrawerContent()}
            </Drawer>

            {/* Modal de recorte */}
            <ImageCropModal
                isOpen={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                onCrop={handleCrop}
                image={image}
                cropperRef={cropperRef}
                isLoading={isLoading}
            />

            <Box className='overflow-x-auto max-h-[calc(100vh-60px)] p-5 pb-[4rem]'>
                <Box className='flex flex-row items-center'>
                    <Box
                        component="label"
                        className="relative md:w-[8.373rem] md:h-[7.407rem] w-[8.373rem] h-[7.4067rem] !mr-3 !rounded-3xl !mt-1 group !color-secondary shadow-md">
                        {croppedImage ? (
                                <img
                                    src={croppedImage}
                                    alt="Cropped"
                                    className="w-full h-full rounded-3xl"
                                    style={{
                                    maxWidth: '300px',
                                    }}
                                />
                            ) : data?.photo ? (
                                <>
                                    <img
                                        src={data?.photo}
                                        alt="Foto do usuário"
                                        className="w-full h-full rounded-3xl absolute"
                                    />
                                    <Box className='flex flex-row justify-between w-full h-full'>
                                        <Tooltip
                                            placement="bottom"
                                            title={'Alterar Foto'}
                                            arrow
                                        >
                                            <Button
                                                component="label"
                                                className='!h-full !min-w-[56%]'
                                                sx={{
                                                    color: '#79808a',
                                                    fontWeight: 'normal',
                                                    padding: 0,
                                                    transition: 'transform 0.3s, background-color 0.3s, color 0.3s,',
                                                    '&:hover': {
                                                        color: '#ff0336',
                                                    },
                                                }}
                                            >
                                                <VisuallyHiddenInput
                                                    type="file"
                                                    onChange={handleImageUpload}
                                                    multiple
                                                    accept="image/*"
                                                />
                                                <Box className='flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[#08041b4f] hover:bg-[#08041b6b] rounded-l-3xl w-full h-full'>
                                                    <Box className="p-2 bg-white bg-opacity-60 rounded-full">
                                                        <TbPhotoEdit className="text-[2rem] color-primary" />
                                                    </Box>
                                                </Box>
                                            </Button>
                                        </Tooltip>
                                        <Tooltip
                                            placement="right"
                                            title={'Excluir Foto'}
                                            arrow
                                        >
                                            <Button
                                                className='!h-full !min-w-[5%]'
                                                sx={{
                                                    color: '#79808a',
                                                    fontWeight: 'normal',
                                                    padding: 0,
                                                    transition: 'transform 0.3s, background-color 0.3s, color 0.3s,',
                                                    '&:hover': {
                                                        color: '#ff0336',
                                                    },
                                                }}
                                                onClick={() => handleDeleteImage()}
                                            >
                                                <Box className="flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[#08041b4f] hover:bg-[#08041b6b] rounded-r-3xl w-full h-full px-1.5">
                                                    <Box className="p-2 bg-white bg-opacity-60 rounded-full">
                                                        <MdDeleteOutline className="text-[1.5rem] color-primary" />
                                                    </Box>
                                                </Box>
                                            </Button>
                                        </Tooltip>
                                    </Box>  
                                </>
                            ) : (
                                <>
                                    <Button
                                            component="label"
                                            className='!m-0 !p-0 w-full h-full'
                                    >
                                        <PiUserSquareLight className="text-[7rem] text-[#646464]" />
                                        <VisuallyHiddenInput
                                            type="file"
                                            onChange={handleImageUpload}
                                            multiple
                                            accept="image/*"
                                        />
                                        <Box className='absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[#08041b4f] hover:bg-[#08041b6b] rounded-3xl'>
                                            <Box className="p-2 bg-white bg-opacity-60 rounded-full">
                                                <TbPhotoEdit className="text-[2rem] color-primary" />
                                            </Box>
                                        </Box>
                                    </Button>
                                </>
                            )
                        }
                    </Box>
                    <Box className='w-full md:mt-0 mt-5'>
                        <Typography className="flex flex-row items-center !text-[2.25rem] text-[#212121]">
                            <>
                                <Box className='whitespace-nowrap overflow-hidden text-ellipsis max-w-[55vw]'>
                                    {data.name}
                                </Box>
                            </>
                        </Typography>
                        <Typography className='flex flex-row items-center !text-[.9rem]'>
                            {data?.username 
                            ? `@${data.username} | Matrícula: STD-${data.profileCode}` 
                            : `Matrícula: STD-${data.profileCode}`}
                        </Typography>
                    </Box>
                </Box>
                <Box className='flex flex-row w-full mt-5'>
                    <Box className='bg-white w-full rounded-3xl shadow-md p-5 border border-[#EAECF0]'>
                        <Box className='flex flex-row justify-between items-center'>
                            <Box>
                                <Typography className="flex flex-row items-center !text-[2.25rem] text-[#212121]">
                                    <Button
                                        variant="text"
                                        className='!text-[#212121] flex flex-row items-center font-poppins !min-w-12 !mx-1 !rounded-full !min-h-12 hover:!bg-[#f3f3f3] !mr-3 !text-[1.6rem]'
                                        onClick={onBack} // Chamará o método `handleBackToTable`
                                    >
                                        <TbArrowLeft />
                                    </Button>
                                    Perfil do Aluno
                                </Typography>
                                <Typography className="flex flex-row items-center !text-[.85rem] !mt-4">
                                Administrativo
                                <MdKeyboardArrowRight className='mx-1.5'/>
                                Alunos
                                <MdKeyboardArrowRight className='mx-1.5'/>
                                Mais detalhes
                                </Typography>
                            </Box>
                        </Box>
                        <Box className='mt-5 flex flex-row'>
                            {detailsViews.map((detail) => {

                                const isActive = activeView === detail.view;
                                const isHovered = hoveredView === detail.view;

                                return (
                                    <Box
                                        key={detail.view}
                                        className='mr-5'
                                    >
                                        <Button
                                            style={{ textTransform: 'none', fontFamily: 'Poppins' }}
                                            className='flex flex-col'
                                            sx={{
                                                fontWeight: 'normal',
                                                padding: 0,
                                            }}
                                            onMouseEnter={() => setHoveredView(detail.view)}
                                            onMouseLeave={() => setHoveredView(null)}
                                            onClick={() => setActiveView(detail.view)}
                                        >
                                            <Box
                                                className={`!p-3 !px-5 !rounded-lg ${
                                                    activeView === detail.view ? '!bg-[#f3f3f3] !text-black' : '!bg-transparent !text-gray-500'
                                                }`}
                                                sx={{
                                                    '&:hover': {
                                                        background: '#f3f3f3 !important',
                                                        color: '#000 !important',
                                                    },
                                                }}
                                                style={{
                                                    transition: 'background-color 0.3s, color 0.3s',
                                                }}
                                            >
                                                {detail.name}
                                            </Box>
                                        </Button>
                                        <Box
                                            style={{
                                                transition: 'background-color 0.3s',
                                            }}
                                            className={`${isActive || isHovered ? 'bg-[#ff0336]' : 'bg-transparent'} w-full rounded-full h-1 mt-3`}
                                        ></Box>
                                    </Box>
                                );
                            })}
                        </Box>
                        <Divider className='!mb-5 w-full bg-[#e2e2e4] !-mt-[.18rem]' />
                        {(() => {
                            switch (activeView) {
                                case 'PROFILE':
                                    return (
                                        <>
                                            <Box className='mt-5 border border-neutral-300 rounded-lg p-5'>
                                                <Box className='!text-neutral20 !font-roboto !text-base !font-semibold !flex !items-center !gap-4'>Dados Pessoais
                                                    <Button
                                                        className='!min-w-5 !mr-5'
                                                        sx={{
                                                            color: '#4b5563',
                                                            fontWeight: 'normal',
                                                            padding: 0,
                                                            transition: 'transform 0.3s, background-color 0.3s, color 0.3s,',
                                                            '&:hover': {
                                                                background: 'white',
                                                                color: '#ff0336',
                                                            },
                                                        }}
                                                        onClick={() => openDrawer('EditStudent', 0)}
                                                    >
                                                        <TbEdit size={24} />
                                                    </Button>
                                                </Box>
                                                        <>
                                                            <Box className='grid grid-cols-[10.5rem,1fr]'>
                                                                <Typography className='!text-neutral-700 !font-roboto !text-sm !mt-4'>Nome</Typography>
                                                                <Typography className='!text-neutral-700 !font-roboto !text-sm !mt-4 !font-semibold'>{data?.name || ''}</Typography>
                                                            </Box>
                                                            <Box className='grid grid-cols-[10.5rem,1fr]'>
                                                                <Typography className='!text-neutral-700 !font-roboto !text-sm !mt-4'>Data de Nascimento</Typography>
                                                                <Typography className='!text-neutral-700 !font-roboto !text-sm !mt-4 !font-semibold'>{data?.birthDate || ''}</Typography>
                                                            </Box>
                                                            <Box className='grid grid-cols-[10.5rem,1fr]'>
                                                                <Typography className='!text-neutral-700 !font-roboto !text-sm !mt-4'>Documento</Typography>
                                                                <Typography className='!text-neutral-700 !font-roboto !text-sm !mt-4 !font-semibold'>
                                                                    {(() => {
                                                                        const id = data.identity;
                                                                        const len = id.length;
                                                                        const start = Math.floor((len - 5) / 2); // Início dos 5 do meio
                                                                        const end = start + 5; // Fim dos 5 do meio
                                                                        let result = "";
                                                                        for (let i = 0; i < len; i++) {
                                                                        if (i >= start && i < end) {
                                                                            result += id[i]; // Mantém os 5 do meio
                                                                        } else if (id[i].match(/[.,-]/)) {
                                                                            result += id[i]; // Mantém pontos, vírgulas e hífen
                                                                        } else {
                                                                            result += "*"; // Substitui por *
                                                                        }
                                                                        }
                                                                        return result;
                                                                    })()}
                                                                </Typography>
                                                            </Box>
                                                            <Box className='grid grid-cols-[10.5rem,1fr]'>
                                                                <Typography className='!text-neutral-700 !font-roboto !text-sm !mt-4'>Gênero</Typography>
                                                                <Typography className='!text-neutral-700 !font-roboto !text-sm !mt-4 !font-semibold'>
                                                                    {data?.gender === 'MAN' ? 'Masculino' : data?.gender === 'WOMAN' ? 'Feminino' : data?.gender ? 'Outros' : ''}
                                                                    </Typography>
                                                            </Box>
                                                            <Box className='grid grid-cols-[10.5rem,1fr]'>
                                                                <Typography className='!text-neutral-700 !font-roboto !text-sm !mt-4'>Estado Civil</Typography>
                                                                <Typography className='!text-neutral-700 !font-roboto !text-sm !mt-4 !font-semibold'>{data?.stateMarital === 'MARRIED' ? 'Casado' : data?.stateMarital === 'SINGLE' ? 'Solteiro' : data?.stateMarital ? 'Outros' : ''}</Typography>
                                                            </Box>
                                                            <Box className='grid grid-cols-[10.5rem,1fr]'>
                                                                <Typography className='!text-neutral-700 !font-roboto !text-sm !mt-4'>Profissão</Typography>
                                                                <Typography className='!text-neutral-700 !font-roboto !text-sm !mt-4 !font-semibold'>{data.profession}</Typography>
                                                            </Box>
                                                            <Box className='grid grid-cols-[10.5rem,1fr]'>
                                                                <Typography className='!text-neutral-700 !font-roboto !text-sm !mt-4'>Empresa</Typography>
                                                                <Typography className='!text-neutral-700 !font-roboto !text-sm !mt-4 !font-semibold'>{data.company}</Typography>
                                                            </Box>
                                                            <Box className='grid grid-cols-[10.5rem,1fr]'>
                                                                <Typography className='!text-neutral-700 !font-roboto !text-sm !mt-4'>Como nos conheceu?</Typography>
                                                                <Typography className='!text-neutral-700 !font-roboto !text-sm !mt-4 !font-semibold'>{selectedReferral?.label}</Typography>
                                                            </Box>
                                                            {data.indicationCode && (
                                                                <Box className='flex flex-col gap-4 p-6 bg-neutral-100 rounded-xl mt-5'>
                                                                    <Box className='flex flex-row'>
                                                                        <Box className='flex flex-col flex-grow'>
                                                                        <Typography className='text-left !font-roboto !text-sm'>Indicado por:</Typography>
                                                                        <Typography className='text-left !font-roboto !font-semibold !text-xl text-neutral-900'>
                                                                            {data.nameIndication}
                                                                        </Typography>
                                                                        </Box>
                                                                        <Box>
                                                                        <GrUserManager className='text-[2.5rem] text-[#282929]' />
                                                                        </Box>
                                                                    </Box>
                                                                </Box>
                                                            )}
                                                        </>
                                            </Box>

                                            <Box className='mt-5 border border-neutral-300 rounded-lg p-5'>
                                                <Box className='!text-neutral20 !font-roboto !text-base !font-semibold !flex !items-center !gap-4'>Endereço
                                                    <Button
                                                        className='!min-w-5 !mr-5'
                                                        sx={{
                                                            color: '#4b5563',
                                                            fontWeight: 'normal',
                                                            padding: 0,
                                                            transition: 'transform 0.3s, background-color 0.3s, color 0.3s,',
                                                            '&:hover': {
                                                                background: 'white',
                                                                color: '#ff0336',
                                                            },
                                                        }}
                                                        onClick={() => openDrawer('EditStudent', 1)}
                                                    >
                                                        <TbEdit size={24} />
                                                    </Button>
                                                </Box>
                                                <Box>
                                                    <Box className='grid grid-cols-[10rem,1fr]'>
                                                        <Typography className='!text-neutral-700 !font-roboto !text-sm !mt-4'>CEP</Typography>
                                                        <Typography className='!text-neutral-700 !font-roboto !text-sm !mt-4 !font-semibold'>
                                                            {data?.zipCode ? FormatZipCode(data.zipCode) : ''}
                                                        </Typography>
                                                    </Box>
                                                    <Box className='grid grid-cols-[10rem,1fr]'>
                                                        <Typography className='!text-neutral-700 !font-roboto !text-sm !mt-4'>Logradouro</Typography>
                                                        <Typography className='!text-neutral-700 !font-roboto !text-sm !mt-4 !font-semibold'>{data?.address || ''}</Typography>
                                                    </Box>
                                                    <Box className='grid grid-cols-[10rem,1fr]'>
                                                        <Typography className='!text-neutral-700 !font-roboto !text-sm !mt-4'>Número</Typography>
                                                        <Typography className='!text-neutral-700 !font-roboto !text-sm !mt-4 !font-semibold'>{data?.number || ''}</Typography>
                                                    </Box>
                                                    <Box className='grid grid-cols-[10rem,1fr]'>
                                                        <Typography className='!text-neutral-700 !font-roboto !text-sm !mt-4'>Complemento</Typography>
                                                        <Typography className='!text-neutral-700 !font-roboto !text-sm !mt-4 !font-semibold'>{data?.complement || ''}</Typography>
                                                    </Box>
                                                    <Box className='grid grid-cols-[10rem,1fr]'>
                                                        <Typography className='!text-neutral-700 !font-roboto !text-sm !mt-4'>Bairro</Typography>
                                                        <Typography className='!text-neutral-700 !font-roboto !text-sm !mt-4 !font-semibold'>{data?.district || ''}</Typography>
                                                    </Box>
                                                    <Box className='grid grid-cols-[10rem,1fr]'>
                                                        <Typography className='!text-neutral-700 !font-roboto !text-sm !mt-4'>Cidade</Typography>
                                                        <Typography className='!text-neutral-700 !font-roboto !text-sm !mt-4 !font-semibold'>{data?.city || ''}</Typography>
                                                    </Box>
                                                    <Box className='grid grid-cols-[10rem,1fr]'>
                                                        <Typography className='!text-neutral-700 !font-roboto !text-sm !mt-4'>Estado</Typography>
                                                        <Typography className='!text-neutral-700 !font-roboto !text-sm !mt-4 !font-semibold'>{data?.state || ''}</Typography>
                                                    </Box>
                                                </Box>
                                            </Box>

                                            <Box className='mt-5 border border-neutral-300 rounded-lg p-5 pb-0'>
                                                <Box className='!text-neutral20 !font-roboto text-base font-semibold flex md:items-center !gap-4 mb-3 md:flex-row flex-col justify-between'>
                                                    <Box>
                                                        Contato
                                                        <Button
                                                            className='!min-w-5 !ml-4'
                                                            sx={{
                                                                color: '#4b5563',
                                                                fontWeight: 'normal',
                                                                padding: 0,
                                                                transition: 'transform 0.3s, background-color 0.3s, color 0.3s,',
                                                                '&:hover': {
                                                                    background: 'white',
                                                                    color: '#ff0336',
                                                                },
                                                            }}
                                                            onClick={() => openDrawer('EditStudent', 2)}
                                                        >
                                                            <TbEdit size={24} />
                                                        </Button>
                                                    </Box>
                                                    {data && data?.contact?.filter((contact: { emailStatus: string; }) => contact.emailStatus === 'PENDING').length > 0 && (
                                                        <Box className='bg-[#fff9ee] border border-[#faa200] rounded-lg font-semibold flex flex-row items-center justify-center text-[#faa200] py-1 px-2 uppercase text-[.8rem] font-poppins'>
                                                            <LuShieldAlert className='text-[#faa200] text-[1.3rem] mr-2' /> 
                                                            {data?.contact?.filter((contact: { emailStatus: string; }) => contact.emailStatus === 'PENDING').length > 1 
                                                            ? 'Existem e-mails não confirmados' 
                                                            : 'Existe um e-mail não confirmado'}
                                                        </Box>
                                                    )}
                                                </Box>
                                                <Box className='flex flex-wrap justify-between'>
                                                    {data?.contact
                                                        .sort((a: { type: string; }) => (a.type === 'MAIN' ? -1 : 1))
                                                        .map((contact: { contactCode: Key | null | undefined; description: any; phone: any; emailStatus: string; email: any; emergencyContact: any; emergencyPhone: any; }) => (
                                                        <Box
                                                            key={contact.contactCode}
                                                            className="bg-[#F3F3F4] md:w-[49%] w-full rounded-lg p-5 pt-[14px] grid grid-cols-[11.5rem,1fr] mb-5"
                                                        >
                                                            <Typography className="!text-neutral-700 !font-roboto !text-sm !mt-4">Descrição</Typography>
                                                            <Typography className="!text-neutral-700 !font-roboto !text-sm !mt-4 !font-semibold break-words overflow-hidden">
                                                                {contact.description || ''}
                                                            </Typography>
                                                            <Typography className="!text-neutral-700 !font-roboto !text-sm !mt-4">Telefone</Typography>
                                                            <Typography className="!text-neutral-700 !font-roboto !text-sm !mt-4 !font-semibold">
                                                                {contact.phone || ''}
                                                            </Typography>
                                                            <Typography className="!text-neutral-700 !font-roboto !text-sm !mt-4">E-mail</Typography>
                                                            {contact.emailStatus === 'PENDING' ? (
                                                                <Tooltip
                                                                    placement="bottom"
                                                                    title={
                                                                        <>
                                                                            Este e-mail ainda não foi confirmado. Clique para reenviar o e-mail de confirmação.<br /><br />
                                                                            Após o envio, não se esqueça de verificar sua caixa de entrada e a pasta de spam.
                                                                        </>
                                                                    }
                                                                    arrow
                                                                >
                                                                    <Typography className="!font-roboto !text-sm !mt-4 !font-semibold !text-[#faa200] cursor-pointer break-words overflow-hidden">
                                                                        {contact.email || ''}
                                                                    </Typography>
                                                                </Tooltip>
                                                            ): (
                                                                <Typography className="!text-neutral-700 !font-roboto !text-sm !mt-4 !font-semibold break-words overflow-hidden">
                                                                {contact.email || ''}
                                                                </Typography>
                                                            )}
                                                            <Typography className="!text-neutral-700 !font-roboto !text-sm !mt-4">Contato de Emergência</Typography>
                                                            <Typography className="!text-neutral-700 !font-roboto !text-sm !mt-4 !font-semibold break-words overflow-hidden">
                                                                {contact.emergencyContact || ''}
                                                            </Typography>
                                                            <Typography className="!text-neutral-700 !font-roboto !text-sm !mt-4">Telefone de Emergência</Typography>
                                                            <Typography className="!text-neutral-700 !font-roboto !text-sm !mt-4 !font-semibold break-words overflow-hidden">
                                                                {contact.emergencyPhone || ''}
                                                            </Typography>
                                                        </Box>
                                                    ))}
                                                </Box>
                                            </Box>
                                        </>
                                    );

                                case 'FINANCE':
                                    return (
                                        <>
                                            <Box className="flex items-center gap-4 my-10">
                                                <Box className='flex flex-row items-center'>
                                                    <SiFirewalla className='mr-3 text-[2.5rem] text-[#ff0336]'/>
                                                    <Box>
                                                        <Box className='flex flex-row items-end text-[#ff0336]'>R$ <Box className='ml-1 text-3xl'>{responseTransactions?.findTransactions[0].rewardsCredit ? responseTransactions?.findTransactions[0].rewardsCredit : '0,00'}
                                                        <Tooltip
                                                            title={
                                                                <>
                                                                    iFlex Rewards trata-se de um crédito que pode ser utilizado para abater o valor das próximas mensalidades ou para a compra de produtos em nossa plataforma.
                                                                </>
                                                            } placement="right" arrow>
                                                            <IconButton
                                                                size="small"
                                                                sx={{ marginTop: '-20px', marginLeft: '5px' }}
                                                            >
                                                                <HelpOutlineIcon fontSize="small" />
                                                            </IconButton>
                                                        </Tooltip>
                                                        </Box>
                                                        </Box>
                                                        <Typography>iFlex Rewards</Typography>
                                                    </Box>
                                                </Box>
                                                <Box className='flex flex-row items-center ml-1'>
                                                    {pendingTotal > 0 ? (
                                                        <>
                                                            <TbAlertSquareRounded className='mr-3 text-[2.5rem] text-[#d23a01]'/>
                                                            <Box>
                                                                <Box className='flex flex-row items-end text-[#d23a01]'>R$ <Box className='ml-1 text-3xl'>{formatAmount(pendingTotal)}</Box></Box>
                                                                <Typography>Pagamentos em aberto</Typography>
                                                            </Box>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <FaRegCircleCheck className='mr-3 text-[2.5rem] text-[#16ae49]'/>
                                                            <Box>
                                                                <Box className='flex flex-row items-end text-[#16ae49]'>Não existem</Box>
                                                                <Typography>pagamentos em aberto</Typography>
                                                            </Box>
                                                        </>
                                                    )}
                                                </Box>
                                            </Box>
                                            <Box className="flex items-center justify-between mb-5">
                                                <Box className='w-full flex items-center'>
                                                    <TextField
                                                        fullWidth
                                                        variant="outlined"
                                                        placeholder="Buscar por código da transação, descrição ou valor"
                                                        className='!w-[52%] !rounded-lg'
                                                        value={searchText}
                                                        onChange={(e) => setSearchText(e.target.value)}
                                                        InputProps={{
                                                            startAdornment: (
                                                                <InputAdornment position="start">
                                                                    <CiSearch size={20} />
                                                                </InputAdornment>
                                                            ),
                                                        }}
                                                    />
                                                    <Box className='mx-3'> | </Box>
                                                    <Button
                                                        startIcon={<TbAdjustmentsSearch />}
                                                        onClick={handleAdvancedSearch}
                                                        style={{ textTransform: 'none', fontFamily: 'Poppins' }}
                                                        sx={{
                                                            color: '#4b5563',
                                                            fontWeight: 'normal',
                                                            padding: 0,
                                                            transition: 'transform 0.3s, background-color 0.3s, color 0.3s,',
                                                            '&:hover': {
                                                                background: 'white',
                                                                color: '#ff0336',
                                                            },
                                                        }}
                                                    >
                                                        Busca Avançada
                                                    </Button>
                                                </Box>
                                                <Button
                                                    startIcon={<IoMdAddCircleOutline />}
                                                    className='w-[11rem]'
                                                    style={{ textTransform: 'none', fontFamily: 'Poppins' }}
                                                    sx={{
                                                        color: '#4b5563',
                                                        fontWeight: 'normal',
                                                        padding: 0,
                                                        transition: 'transform 0.3s, background-color 0.3s, color 0.3s,',
                                                        '&:hover': {
                                                            background: 'white',
                                                            color: '#ff0336',
                                                        },
                                                    }}
                                                    onClick={handleCreateTransaction}
                                                >
                                                    Nova Transação
                                                </Button>
                                            </Box>
                                            <Collapse in={advancedSearch} timeout={300}>
                                                <Box>Busca Avançada</Box>
                                                <Box className='my-5'>
                                                    <Box className='w-[40%] relative'>
                                                        <InputLabel id="status"
                                                            className={`!absolute z-[1] bg-white ml-2 -mt-[.7rem] !px-2 scale-[0.75] transition-all duration-300 transform ${
                                                                (selectedStatus && selectedStatus.length > 0) || focusedFields.status ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                                                            } ${focusedFields.status ? '!text-[#ff0336]' : '!text-[#0009]'}`}
                                                        >Status</InputLabel>
                                                        <Select
                                                        placeholder={focusedFields.status ? '' : 'Status'}
                                                        closeMenuOnSelect={false}
                                                        components={animatedComponents}
                                                        options={filterStatusOptions}
                                                        styles={customStyles}
                                                        isMulti
                                                        noOptionsMessage={customNoOptionsMessage}
                                                        onFocus={() => handleFocus('status', true)}
                                                        onBlur={() => handleFocus('status', false)}
                                                        onChange={(newValue) => handleSelectChange(newValue, 'status')}
                                                        value={filterStatusOptions.filter(option => selectedStatus.includes(option.value))}
                                                        />
                                                    </Box>
                                                </Box>
                                            </Collapse>
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
                                                        {transactions && transactions.length > 0 ? (
                                                            transactions.sort((a, b) => 
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
                                                                                        <GiReceiveMoney className='text-[1.5rem]' />
                                                                                    </ListItemIcon>
                                                                                    <ListItemText primary="Receber" />
                                                                                </MenuItem>
                                                                            )}
                                                                            {transaction.originPayment !== '' && (
                                                                                <Box>
                                                                                    {!['PAID', 'CANCELED', 'REFUNDED', 'REVERSED', 'PARTIALLY_REVERSED'].includes(transaction.paymentStatus) && (
                                                                                        <MenuItem
                                                                                            onClick={() => handleAlterTransaction(transaction.transactionCode)}
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
                                                                                    )}
                                                                                </Box>
                                                                            )}
                                                                            {['PAID', 'PARTIALLY_REVERSED'].includes(transaction.paymentStatus) && (
                                                                                <MenuItem
                                                                                    onClick={() => handleReversedTransaction(transaction.transactionCode)}
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
                                                                                        <RiUserReceivedLine className='text-[1.5rem]' />
                                                                                    </ListItemIcon>
                                                                                    <ListItemText primary="Reembolsar" />
                                                                                </MenuItem>
                                                                            )}
                                                                            {['FAILED'].includes(transaction.paymentStatus) && (
                                                                                <>
                                                                                    <MenuItem
                                                                                        onClick={handleConfirmReprocess}
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
                                                                                            <TbRotateClockwise2 className='text-[1.5rem]' />
                                                                                        </ListItemIcon>
                                                                                        <ListItemText primary="Reprocessar" />
                                                                                    </MenuItem>
                                                                                    <Modal
                                                                                        aria-labelledby="transition-modal-title"
                                                                                        aria-describedby="transition-modal-description"
                                                                                        open={modalConfirmReprocess}
                                                                                        onClose={handleCloseConfirmReprocess}
                                                                                        closeAfterTransition
                                                                                        className='flex items-center justify-center'
                                                                                        slotProps={{
                                                                                        backdrop: {
                                                                                            timeout: 500,
                                                                                        },
                                                                                        }}
                                                                                    >
                                                                                        <Fade in={modalConfirmReprocess}>
                                                                                            <Box className="bg-white rounded-lg w-[500px] flex flex-col items-center p-7">
                                                                                                <TbRotateClockwise2 className="text-[#4b5563] text-[5.5rem] bg-[#edf5ff] rounded-3xl p-5" />
                                                                                                <Typography className='text-center !text-[1.2rem] !mt-5'>Deseja reprocessar a transação {transaction.description}?</Typography>
                                                                                                <Box className='bg-[#edf5ff] text-[#4b5563] p-5 rounded-3xl mt-5 text-[.9rem] w-full'>
                                                                                                    <Box className='flex flex-row items-center mb-2'>
                                                                                                    <TbProgressAlert className="text-[#4b5563] text-[1.5rem] mr-2" />
                                                                                                    <Typography variant="h6" component="h2">Importante</Typography>
                                                                                                    </Box>
                                                                                                    <Typography className='!text-[.9rem]'>Caso o prazo de pagamento tenha sido ultrapassado, a data será atualizada para hoje. Multa e juros serão desconsiderados, pois o pagamento não foi processado devido a falhas no sistema. 
                                                                                                    </Typography>
                                                                                                </Box>
                                                                                                <Box className='flex flex-row justify-between mt-8 w-full'>
                                                                                                    <Button
                                                                                                        onClick={handleCloseConfirmReprocess}
                                                                                                        variant="outlined"
                                                                                                        className='w-[45%]'
                                                                                                        sx={{
                                                                                                            backgroundColor: 'transparent',
                                                                                                            color: '#4b5563',
                                                                                                            borderColor: '#4b5563',
                                                                                                            height: '3rem',
                                                                                                            '&:hover': {
                                                                                                                backgroundColor: '#d4d4d8',
                                                                                                                borderColor: '#4b5563',
                                                                                                            },
                                                                                                        }}
                                                                                                    >
                                                                                                        Não
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
                                                                                                        onClick={() => handleReprocessTransaction(transaction.transactionCode)}
                                                                                                    >
                                                                                                        Sim
                                                                                                    </Button>
                                                                                                </Box>
                                                                                            </Box>
                                                                                        </Fade>
                                                                                    </Modal>
                                                                                </>
                                                                            )}
                                                                            {!['PAID', 'CANCELED', 'REFUNDED', 'PARTIALLY_REVERSED', 'REVERSED'].includes(transaction.paymentStatus) && (
                                                                                <>
                                                                                    <MenuItem
                                                                                        onClick={handleConfirmCancel}
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
                                                                                            <TiCancel className='text-[1.5rem]' />
                                                                                        </ListItemIcon>
                                                                                        <ListItemText primary="Cancelar" />
                                                                                    </MenuItem>
                                                                                    <Modal
                                                                                        aria-labelledby="transition-modal-title"
                                                                                        aria-describedby="transition-modal-description"
                                                                                        open={modalConfirmCancel}
                                                                                        onClose={handleCloseConfirmCancel}
                                                                                        closeAfterTransition
                                                                                        className='flex items-center justify-center'
                                                                                        slotProps={{
                                                                                        backdrop: {
                                                                                            timeout: 500,
                                                                                        },
                                                                                        }}
                                                                                    >
                                                                                        <Fade in={modalConfirmCancel}>
                                                                                            <Box className="bg-white rounded-lg w-[500px] flex flex-col items-center p-7">
                                                                                                <TiCancel className="text-[#4b5563] text-[5.5rem] bg-[#edf5ff] rounded-3xl p-5" />
                                                                                                <Typography className='text-center !text-[1.2rem] !mt-5'>Deseja cancelar a transação {transaction.description}?</Typography>
                                                                                                <TextField
                                                                                                    required
                                                                                                    placeholder="Informe o motivo do cancelamento"
                                                                                                    label="Motivo"
                                                                                                    multiline
                                                                                                    rows={3}
                                                                                                    value={cancelReason}
                                                                                                    onChange={handleReasonChange}
                                                                                                    variant="outlined"
                                                                                                    fullWidth
                                                                                                    className="!mt-5"
                                                                                                />
                                                                                                <Box className='bg-[#edf5ff] text-[#4b5563] p-5 rounded-3xl mt-5 text-[.9rem] w-full'>
                                                                                                    <Box className='flex flex-row items-center mb-2'>
                                                                                                    <TbProgressAlert className="text-[#4b5563] text-[1.5rem] mr-2" />
                                                                                                    <Typography variant="h6" component="h2">Importante</Typography>
                                                                                                    </Box>
                                                                                                    <Typography className='!text-[.9rem]'>Após o cancelamento a transação não ficará mais disponível para pagamento. 
                                                                                                    </Typography>
                                                                                                </Box>
                                                                                                <Box className='flex flex-row justify-between mt-8 w-full'>
                                                                                                    <Button
                                                                                                        onClick={handleCloseConfirmCancel}
                                                                                                        variant="outlined"
                                                                                                        className='w-[45%]'
                                                                                                        sx={{
                                                                                                            backgroundColor: 'transparent',
                                                                                                            color: '#4b5563',
                                                                                                            borderColor: '#4b5563',
                                                                                                            height: '3rem',
                                                                                                            '&:hover': {
                                                                                                                backgroundColor: '#d4d4d8',
                                                                                                                borderColor: '#4b5563',
                                                                                                            },
                                                                                                        }}
                                                                                                    >
                                                                                                        Não
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
                                                                                                        onClick={() => handleCancelTransaction(transaction.transactionCode)}
                                                                                                        disabled={!cancelReason.trim()}
                                                                                                    >
                                                                                                        Sim
                                                                                                    </Button>
                                                                                                </Box>
                                                                                            </Box>
                                                                                        </Fade>
                                                                                    </Modal>
                                                                                </>
                                                                            )}
                                                                            {['CANCELED'].includes(transaction.paymentStatus) && (
                                                                                <>
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
                                                                                                <Typography className='text-center !text-[1.2rem] !mt-5'>Deseja excluir a transação {transaction.description}?</Typography>
                                                                                                <Box className='bg-[#fef7e5] text-[#744600] p-5 rounded-3xl mt-5 text-[.9rem] w-full'>
                                                                                                    <Box className='flex flex-row items-center mb-2'>
                                                                                                    <TbProgressAlert className="text-[#744600] text-[1.5rem] mr-2" />
                                                                                                    <Typography variant="h6" component="h2">Atenção</Typography>
                                                                                                    </Box>
                                                                                                    <Typography className='!text-[.9rem]'>Esta ação é irreversível e todos os dados associados a esta transação serão permanentemente removidos.</Typography>
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
                                                                                                            height: '3rem',
                                                                                                            '&:hover': {
                                                                                                                backgroundColor: '#d4d4d8',
                                                                                                                borderColor: '#4b5563',
                                                                                                            },
                                                                                                        }}
                                                                                                    >
                                                                                                        Não
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
                                                                                                        onClick={() => handleDeleteTransaction(transaction.transactionCode)}
                                                                                                    >
                                                                                                        Sim
                                                                                                    </Button>
                                                                                                </Box>
                                                                                            </Box>
                                                                                        </Fade>
                                                                                    </Modal>
                                                                                </>
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
                                                        <MuiSelect
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
                                                        </MuiSelect>
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
                                    );

                                case 'PLAN':
                                    return (
                                        <>
                                            <Box className="flex items-center justify-between mb-5">
                                                <Button
                                                    startIcon={<IoMdAddCircleOutline />}
                                                    className='!ml-1'
                                                    style={{ textTransform: 'none', fontFamily: 'Poppins' }}
                                                    sx={{
                                                        color: '#4b5563',
                                                        fontWeight: 'normal',
                                                        padding: 0,
                                                        transition: 'transform 0.3s, background-color 0.3s, color 0.3s,',
                                                        '&:hover': {
                                                            background: 'white',
                                                            color: '#ff0336',
                                                        },
                                                    }}
                                                    onClick={handleStudentPlanCreate}
                                                >
                                                    Associar Plano
                                                </Button>
                                            </Box>
                                            <Box className="overflow-x-auto border border-neutral-300 rounded-lg w-full">
                                                <TableContainer>
                                                    <Table>
                                                        <TableHead>
                                                            <TableRow>
                                                                <TableCell className='!text-center w-[1rem]'>Ativo</TableCell>
                                                                <TableCell>Código</TableCell>
                                                                <TableCell>Plano e Modalidade</TableCell>
                                                                <TableCell>Periodicidade</TableCell>
                                                                <TableCell>Valor</TableCell>
                                                                <TableCell>Pagamento</TableCell>
                                                                <TableCell className='!text-center'>Matrícula</TableCell>
                                                                <TableCell></TableCell>
                                                            </TableRow>
                                                        </TableHead>
                                                        <TableBody>
                                                        {studentPlans && studentPlans.length > 0 ? (
                                                            studentPlans.sort((a, b) => 
                                                                new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                                                            ).map((plan, index) => (
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
                                                                        checked={plan.status === 'ACTIVE' ? true : false}
                                                                        onClick={() => handleStatusPlan(data.profileCode, plan.studentPlanCode, plan.status)}
                                                                    />
                                                                </TableCell>
                                                                <TableCell>CPA-{plan.studentPlanCode}</TableCell>
                                                                <TableCell className="max-w-[10rem]">
                                                                    <Box className='whitespace-nowrap overflow-hidden text-ellipsis'>
                                                                        {plan.name}
                                                                        <Box className='!flex !flex-row items-center !text-[.9em] text-gray-500'>
                                                                            {plan.modalities[0]}
                                                                            {plan.modalities.length > 1 && (
                                                                                <Tooltip
                                                                                title={
                                                                                    <>
                                                                                    {plan.modalities.slice(1).map((modality, idx) => (
                                                                                        <Box key={idx}>{modality}</Box>
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
                                                                                    + {plan.modalities.length - 1}
                                                                                </Box>
                                                                                </Tooltip>
                                                                            )}
                                                                        </Box>
                                                                    </Box>
                                                                </TableCell>
                                                                <TableCell>{plan.periodicityName}</TableCell>
                                                                <TableCell>R$ {plan.amount}</TableCell>
                                                                <TableCell><PaymentBadge payment={plan.planPayment} /></TableCell>
                                                                <TableCell className='!text-center'>
                                                                    {plan.createdAt}
                                                                    <Typography className='!text-[.9em] text-gray-500'>
                                                                        Vence dia {plan.paymentDay.split('/')[0]}
                                                                    </Typography>
                                                                </TableCell>
                                                                <TableCell>
                                                                    <Box textAlign="center">
                                                                        <IconButton
                                                                            className='w-[2rem] h-[2rem]'
                                                                            onClick={(event) => handleOpenMore(event, plan.studentPlanCode)}
                                                                            style={{
                                                                                backgroundColor: isMenuOpen(plan.studentPlanCode) ? '#0000000a' : '',
                                                                            }}
                                                                        >
                                                                            <MoreHorizIcon />
                                                                        </IconButton>
                                                                        <Menu
                                                                            anchorEl={anchorEls[plan.studentPlanCode]}
                                                                            open={Boolean(anchorEls[plan.studentPlanCode])}
                                                                            onClose={() => handleCloseMore(plan.studentPlanCode)}
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
                                                                                onClick={() => handleStudentPlansMoreDetails(plan.studentPlanCode)}
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
                                                        <MuiSelect
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
                                                        </MuiSelect>
                                                        <Typography variant="body2">Itens por página</Typography>
                                                        <Box className='border-l border-gray-400 mx-2 h-4'></Box>
                                                        <Typography variant="body2">
                                                            {startIndexPlans + 1} - {Math.min(endIndexPlans, totalItemsPlans)} de{" "}
                                                            {totalItemsPlans} registro(s)
                                                        </Typography>
                                                    </Box>

                                                    {/* Navegação por Páginas */}
                                                    <Pagination
                                                        count={totalPagesPlans}
                                                        page={currentPage}
                                                        onChange={handlePageChange}
                                                        color="primary"
                                                        size="small"
                                                    />
                                                </Box>
                                            </Box>
                                        </>
                                    );

                                case 'TRAININGS':
                                    return (
                                        <>
                                            <Box className="flex flex-col items-center mb-5">
                                                <Box className="text-[#E94560] text-[2.5rem] mb-3">Oops!</Box>
                                                <Typography>Essa funcionalidade estará disponível em breve.</Typography>
                                            </Box>
                                        </>
                                    );

                                case 'REVIEWS':
                                    return (
                                        <>
                                            <Box className="flex items-center justify-between mb-5">
                                                <Button
                                                    startIcon={<IoMdAddCircleOutline />}
                                                    className='!ml-1'
                                                    style={{ textTransform: 'none', fontFamily: 'Poppins' }}
                                                    sx={{
                                                        color: '#4b5563',
                                                        fontWeight: 'normal',
                                                        padding: 0,
                                                        transition: 'transform 0.3s, background-color 0.3s, color 0.3s,',
                                                        '&:hover': {
                                                            background: 'white',
                                                            color: '#ff0336',
                                                        },
                                                    }}
                                                    onClick={() => openDrawer('ReviewCreate', 0)}
                                                >
                                                    Nova Avaliação
                                                </Button>
                                            </Box>
                                            <Box className="overflow-x-auto border border-neutral-300 rounded-lg w-full">
                                                <TableContainer>
                                                    <Table>
                                                        <TableHead>
                                                            <TableRow>
                                                                <TableCell>Código</TableCell>
                                                                <TableCell>Avaliado em</TableCell>
                                                                <TableCell>Avaliador</TableCell>
                                                                <TableCell>Peso</TableCell>
                                                                <TableCell>Próxima Avaliação</TableCell>
                                                                <TableCell></TableCell>
                                                            </TableRow>
                                                        </TableHead>
                                                        <TableBody>
                                                        {reviews && reviews.length > 0 ? (
                                                            reviews.sort((a, b) => 
                                                                new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                                                            ).map((review, index) => (
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
                                                                <TableCell>ALC-{review.reviewCode}</TableCell>
                                                                <TableCell>{review.createdAt}</TableCell>
                                                                <TableCell>{review.evaluator}</TableCell>
                                                                <TableCell>{review.weight ? `${review.weight} kg` : ''}</TableCell>
                                                                <TableCell>{review.dueDate}</TableCell>
                                                                <TableCell>
                                                                    <Box textAlign="center">
                                                                        <IconButton
                                                                            className='w-[2rem] h-[2rem]'
                                                                            onClick={(event) => handleOpenMore(event, review.reviewCode)}
                                                                            style={{
                                                                                backgroundColor: isMenuOpen(review.reviewCode) ? '#0000000a' : '',
                                                                            }}
                                                                        >
                                                                            <MoreHorizIcon />
                                                                        </IconButton>
                                                                        <Menu
                                                                            anchorEl={anchorEls[review.reviewCode]}
                                                                            open={Boolean(anchorEls[review.reviewCode])}
                                                                            onClose={() => handleCloseMore(review.reviewCode)}
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
                                                                                onClick={() => handleMoreDetailsReview(review.reviewCode)}
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
                                                                                onClick={() => handleAlterReview(review.reviewCode)}
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
                                                                                        <Typography className='text-center !text-[1.2rem] !mt-5'>Deseja excluir a avaliação de código<br />ALC-{review.reviewCode}?</Typography>
                                                                                        <Box className='bg-[#fef7e5] text-[#744600] p-5 rounded-3xl mt-5 text-[.9rem] w-full'>
                                                                                            <Box className='flex flex-row items-center mb-2'>
                                                                                            <TbProgressAlert className="text-[#744600] text-[1.5rem] mr-2" />
                                                                                            <Typography variant="h6" component="h2">Atenção</Typography>
                                                                                            </Box>
                                                                                            <Typography className='!text-[.9rem]'>Esta ação é irreversível e todos os dados associados a esta avaliação serão permanentemente removidos.</Typography>
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
                                                                                                    height: '3rem',
                                                                                                    '&:hover': {
                                                                                                        backgroundColor: '#d4d4d8',
                                                                                                        borderColor: '#4b5563',
                                                                                                    },
                                                                                                }}
                                                                                            >
                                                                                                Não
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
                                                                                                onClick={() => handleDeleteReview(review.reviewCode)}
                                                                                            >
                                                                                                Sim
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
                                                        <MuiSelect
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
                                                        </MuiSelect>
                                                        <Typography variant="body2">Itens por página</Typography>
                                                        <Box className='border-l border-gray-400 mx-2 h-4'></Box>
                                                        <Typography variant="body2">
                                                            {startIndexReviews + 1} - {Math.min(endIndexReviews, totalItemsReviews)} de{" "}
                                                            {totalItemsReviews} registro(s)
                                                        </Typography>
                                                    </Box>

                                                    {/* Navegação por Páginas */}
                                                    <Pagination
                                                        count={totalPagesReviews}
                                                        page={currentPage}
                                                        onChange={handlePageChange}
                                                        color="primary"
                                                        size="small"
                                                    />
                                                </Box>
                                            </Box>
                                        </>
                                    );
                            
                                default:
                                return null;
                            }
                        })()}
                        
                    </Box>
                </Box>
            </Box>
        </>
    );
}

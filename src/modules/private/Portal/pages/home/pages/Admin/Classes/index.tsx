/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Button, Divider, Drawer, Typography } from "@mui/material";
import { Key, useEffect } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import { TbArrowLeft, TbEdit } from "react-icons/tb";
import { DrawerProps } from "../../../../../../../common/types";
import { FormatDateTime } from "../../../../../../../common/utils";
import { useClassAlterForm } from "../../../../../hooks";

export const GymClassesDetails = ({
    closeDrawer,
    enqueueSnackbar,
    data,
    initialStep = 0,
    refresh,
    onBack,
}: DrawerProps) => {

    const {
        formData,
        renderDrawerContent,
        setActiveStep,
        isDrawerOpen,
        openDrawer,
        closeDrawerDetails,
        daysOfWeek
    } = useClassAlterForm({ closeDrawer, enqueueSnackbar, data, refresh });

    useEffect(() => {
        setActiveStep(initialStep);
    }, [initialStep, setActiveStep]);

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

            <Box className='overflow-x-auto max-h-[calc(100vh-60px)] p-5 pb-[4rem]'>
                <Box className='flex flex-row w-full'>
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
                                    Turma de<Box className='whitespace-nowrap overflow-hidden text-ellipsis max-w-[27vw] ml-3'> {data.findClasses.name}</Box>
                                </Typography>
                                <Typography className="flex flex-row items-center !text-[.85rem] !mt-4">
                                Administrativo
                                <MdKeyboardArrowRight className='mx-1.5'/>
                                Turmas
                                <MdKeyboardArrowRight className='mx-1.5'/>
                                Mais detalhes
                                </Typography>
                            </Box>
                            <Box>
                                <Typography className='flex flex-row items-center !text-[.85rem] !mt-4'>
                                    Código: TRM-{data.findClasses.classCode}
                                </Typography>
                            </Box>
                        </Box>
                        <Divider className='!my-5 w-full bg-[#e2e2e4]' />
                        <Box className='mt-5 border border-neutral-300 rounded-lg p-5'>
                            <Box className='!text-neutral20 !font-roboto !text-base !font-semibold !flex !items-center !gap-4'>Detalhes da turma
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
                                    onClick={() => openDrawer('ClassDetail', 0)}
                                >
                                    <TbEdit size={24} />
                                </Button>
                            </Box>
                                    <>
                                        <Box className='grid grid-cols-[10rem,1fr]'>
                                            <Typography className='!text-neutral-700 !font-roboto !text-sm !mt-4'>Nome</Typography>
                                            <Typography className='!text-neutral-700 !font-roboto !text-sm !mt-4 !font-semibold'>{data?.findClasses.name || ''}</Typography>
                                        </Box>
                                        <Box className='grid grid-cols-[10rem,1fr]'>
                                            <Typography className='!text-neutral-700 !font-roboto !text-sm !mt-4'>Início da Vigência</Typography>
                                            <Typography className='!text-neutral-700 !font-roboto !text-sm !mt-4 !font-semibold'>{data?.findClasses.startDate ? FormatDateTime(data.findClasses.startDate) : ''}</Typography>
                                        </Box>
                                        <Box className='grid grid-cols-[10rem,1fr]'>
                                            <Typography className='!text-neutral-700 !font-roboto !text-sm !mt-4'>Fim da Vigência</Typography>
                                            <Typography className='!text-neutral-700 !font-roboto !text-sm !mt-4 !font-semibold'>{data?.findClasses.endDate ? FormatDateTime(data.findClasses.endDate) : ''}</Typography>
                                        </Box>
                                        <Box className='grid grid-cols-[10rem,1fr]'>
                                            <Typography className='!text-neutral-700 !font-roboto !text-sm !mt-4'>Observações</Typography>
                                            <Typography className='!text-neutral-700 !font-roboto !text-sm !mt-4 !font-semibold'>{data?.findClasses.observation || ''}</Typography>
                                        </Box>
                                    </>
                        </Box>

                        <Box className='mt-5 border border-neutral-300 rounded-lg p-5'>
                            <Box className='!text-neutral20 !font-roboto !text-base !font-semibold !flex !items-center !gap-4 mb-5'>Regras
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
                                    onClick={() => openDrawer('ClassDetail', 1)}
                                >
                                    <TbEdit size={24} />
                                </Button>
                            </Box>
                                    <>
                                        <Box className='grid grid-cols-[13rem,1fr]'>
                                            <Typography className='!text-neutral-700 !font-roboto !text-sm'>Qtde. de alunos por horário</Typography>
                                            <Typography className='!text-neutral-700 !font-roboto !text-sm !font-semibold'>{data?.findClasses?.studentsPerHour}
                                            </Typography>
                                        </Box>
                                        <Box className='grid grid-cols-[13rem,1fr]'>
                                            <Typography className='!text-neutral-700 !font-roboto !text-sm !mt-4'>Limite mínimo para alerta</Typography>
                                            <Typography className='!text-neutral-700 !font-roboto !text-sm !mt-4 !font-semibold'>{data?.findClasses?.minimumAlert}</Typography>
                                        </Box>
                                        <Box className='grid grid-cols-[10rem,1fr]'>
                                            <Typography className='!text-neutral-700 !font-roboto !text-sm !mt-4'>Horários para acesso</Typography>
                                        </Box>
                                        <Box className="flex flex-wrap justify-between mt-2">
                                            {daysOfWeek.map(({ key, label }) => (
                                            <Box key={key} className="bg-[#F3F3F4] md:w-[24%] w-full rounded-lg p-5 pt-[14px] mt-3">
                                                <Typography className="!text-neutral-700 !font-roboto !text-sm !mt-4 uppercase">{label}</Typography>
                                                <Divider className="!my-3" />
                                                {(formData[key] as string[])?.map((slot, index) => (
                                                <>
                                                    <Box key={index} className='flex flex-row items-center justify-between'>
                                                    <Typography className="!text-neutral-700 !font-roboto !text-sm !mt-[.1rem] !font-semibold">{slot}</Typography>
                                                    </Box>
                                                    <Divider className="!my-3" />
                                                </>
                                                ))}
                                            </Box>
                                            ))}
                                        </Box>
                                    </>
                        </Box>

                        <Box className='mt-5 border border-neutral-300 rounded-lg p-5'>
                            <Box className='!text-neutral20 !font-roboto !text-base !font-semibold !flex !items-center !gap-4 mb-5'>Modalidades
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
                                    onClick={() => openDrawer('ClassDetail', 0)}
                                >
                                    <TbEdit size={24} />
                                </Button>
                            </Box>
                                    <>
                                        <Box className="flex flex-wrap justify-between">
                                            {Array.isArray(data?.findClasses?.modalities) && data.findClasses.modalities.length > 0 ? (
                                                data.findClasses.modalities.map((modality: { name: any; description: any; }, index: Key | null | undefined) => (
                                                    <Box
                                                            key={index}
                                                            className="bg-[#F3F3F4] md:w-[49%] w-full rounded-lg p-5 pt-[14px] grid grid-cols-[5.5rem,1fr]"
                                                        >
                                                        <Typography className="!text-neutral-700 !font-roboto !text-sm !mt-4">Nome</Typography>
                                                        <Typography className="!text-neutral-700 !font-roboto !text-sm !mt-4 !font-semibold">
                                                            {modality.name || ''}
                                                        </Typography>
                                                        <Typography className="!text-neutral-700 !font-roboto !text-sm !mt-4">Descrição</Typography>
                                                        <Typography className="!text-neutral-700 !font-roboto !text-sm !mt-4 !font-semibold">
                                                            {modality.description || ''}
                                                        </Typography>
                                                    </Box>
                                                ))
                                            ) : (
                                                <Typography className="!text-neutral-700 !font-roboto !text-sm">Nenhuma modalidade cadastrada.</Typography>
                                            )}
                                        </Box>
                                    </>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    );
}

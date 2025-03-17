import { Box, Button, Divider, Drawer, Typography } from "@mui/material";
import { GrUserManager } from 'react-icons/gr';
import { MdKeyboardArrowRight } from "react-icons/md";
import { TbArrowLeft } from "react-icons/tb";
import { DrawerProps } from '../../../../../../../common/types';
import { StatusInternalBadge } from "../../../../../components/Badges/PaymentBadge";
import { useStudentAlterForm } from '../../../../../hooks';

export const TicketDetails = ({
    closeDrawer,
    enqueueSnackbar,
    data,
    refresh,
    onBack,
}: DrawerProps) => {

    console.log(data);

    const {
        renderDrawerContent,
        isDrawerOpen,
        openDrawer,
        closeDrawerDetails,
    } = useStudentAlterForm({ closeDrawer, enqueueSnackbar, data, refresh });

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
                        {data.name}
                    </Typography>
                    <Typography className="flex flex-row items-center !text-[.85rem] !mt-4">
                    Suporte
                    <MdKeyboardArrowRight className='mx-1.5'/>
                    Meus protocolos
                    <MdKeyboardArrowRight className='mx-1.5'/>
                    Mais detalhes
                    </Typography>
                </Box>
            </Box>
            <Divider className='w-full bg-[#e2e2e4] !my-5' />
            <Box className='mt-5 border border-neutral-300 rounded-lg'>
                <Box className='bg-[#f8f9f9] rounded-t-lg p-3 border-b-[#d8dcde] border-b flex flex-row'>
                    <Box className='rounded-lg border-[#d8dcde] border flex flex-row text-[#293239] text-[14px] h-[34px]'>
                        <Box className='flex items-center px-3'>
                            {data.queue === 'GYM_SUPPORT' ? 'Atendimento & Suporte' : 'Financeiro'}
                        </Box>
                        <Box className='flex items-center bg-[#e8eaec] rounded-r-lg border-[#d8dcde] border-l px-3'>
                            <StatusInternalBadge status={data.status} /> Protocolo #{data.ticketCode}
                        </Box>
                    </Box>
                </Box>
                <Box className='p-5'>
                    <Typography className='text-left !font-roboto !text-sm'>{data.nameRecipientUser} • {data.messages[0].createdAt}</Typography>
                    <Box className='flex flex-col gap-4 p-6 bg-[#ecf9f9] rounded-xl mb-5 mt-3'>
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
                    <Typography className='text-right !font-roboto !text-sm'>{data.nameIssuerUser} • {data.messages[0].createdAt}</Typography>
                    <Box className='flex flex-col gap-4 p-6 bg-neutral-100 rounded-xl mt-3'>
                        <Box className='flex flex-row'>
                            <Box className='flex flex-col flex-grow'>
                            <Typography className='text-left !font-roboto text-neutral-900'>
                                {data.messages[0].message}
                            </Typography>
                            </Box>
                            <Box>
                            <GrUserManager className='text-[2.5rem] text-[#282929]' />
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    );
}

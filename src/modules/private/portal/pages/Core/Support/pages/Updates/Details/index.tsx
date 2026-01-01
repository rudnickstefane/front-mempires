import { Box, Button, Divider, Typography } from "@mui/material";
import { MdKeyboardArrowRight } from "react-icons/md";
import { TbArrowLeft } from "react-icons/tb";
import { DrawerProps } from "../../../../../../../../common/types";
import { QueueBadge, StatusInternalBadge } from "../../../../../../components/Badges/PaymentBadge";

export const UpdateDetails = ({
    data,
    onBack,
}: DrawerProps) => {

    return (
        <>
            <Box className='flex flex-row justify-between items-center'>
                <Box>
                    <Typography className="flex flex-row items-center !text-[1.5rem] text-[#212121]">
                        <Button
                            variant="text"
                            className='!text-[#212121] flex flex-row items-center font-poppins !min-w-12 !mx-1 !rounded-full !min-h-12 hover:!bg-[#f3f3f3] !mr-3 !text-[1.6rem]'
                            onClick={onBack} // Chamará o método `handleBackToTable`
                        >
                            <TbArrowLeft />
                        </Button>
                        {data.description}
                    </Typography>
                    <Typography className="flex flex-row items-center !text-[.85rem] !mt-4">
                    Suporte
                    <MdKeyboardArrowRight className='mx-1.5'/>
                    Atualizações
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
                            <QueueBadge payment={data.impact} />
                        </Box>
                        <Box className='flex items-center bg-[#e8eaec] rounded-r-lg border-[#d8dcde] border-l px-3'>
                            <StatusInternalBadge status={data.type} /> Atualização de nº {data.updateCode}
                        </Box>
                    </Box>
                </Box>
                <Box className='p-5' dangerouslySetInnerHTML={{ __html: data.message }} />
            </Box>
        </>
    );
}
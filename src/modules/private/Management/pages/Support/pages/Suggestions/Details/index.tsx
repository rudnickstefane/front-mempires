import { Box, Button, CircularProgress, Divider, FormControl, TextField, Typography } from "@mui/material";
import { useEffect, useRef } from "react";
import { MdCheckCircle, MdKeyboardArrowRight } from "react-icons/md";
import { PiUserSquareLight } from "react-icons/pi";
import { TbArrowLeft } from "react-icons/tb";
import { DrawerProps } from '../../../../../../../common/types';
import { QueueBadge, StatusInternalBadge } from "../../../../../components/Badges/PaymentBadge";
import { useTicketCreateForm } from '../../../../../hooks';

export const SuggestionDetails = ({
    closeDrawer,
    enqueueSnackbar,
    data,
    refresh,
    onBack,
}: DrawerProps) => {

    useEffect(() => {
        // Configura o intervalo para chamar a cada 30 segundos
        const intervalId = setInterval(() => {
            refresh?.();
        }, 30 * 1000); // 30 segundos em milissegundos

        // Limpa o intervalo quando o componente desmontar
        return () => clearInterval(intervalId);
    }, [refresh]);

    const {
        isLoading,
        formData,
        errors,
        handleTextFieldChange,
        charactersRemaining,
        handleMessageCreate
    } = useTicketCreateForm({ closeDrawer, enqueueSnackbar, data, refresh });
    

    const chatContainerRef = useRef(null);

    // Função para rolar o contêiner para o final
    const scrollToBottom = () => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [data.messages]);

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
                        {data.name}
                    </Typography>
                    <Typography className="flex flex-row items-center !text-[.85rem] !mt-4">
                    Suporte
                    <MdKeyboardArrowRight className='mx-1.5'/>
                    Sugestões
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
                            <QueueBadge payment={data.queue} />
                        </Box>
                        <Box className='flex items-center bg-[#e8eaec] rounded-r-lg border-[#d8dcde] border-l px-3'>
                            <StatusInternalBadge status={data.status} /> Sugestão de nº {data.ticketCode}
                        </Box>
                    </Box>
                </Box>
                <Box ref={chatContainerRef} className='p-5 flex flex-col overflow-x-auto max-h-[calc(100vh-300px)]' >
                    {data.messages.map((message, index) => (
                        <Box key={index} className={`flex flex-col w-full ${index > 0 ? 'mt-5' : ''}`}>
                        {/* Verifica se a mensagem é do issuerUserCode ou issuerCompanyCode */}
                        {(message.sentUserCode === data.issuerUserCode || message.sentCompanyCode === data.issuerCompanyCode) ? (
                            <>
                                <Typography className='text-right !font-roboto !text-sm w-full'>
                                    {message.nameSentUser.split(' ').slice(0, 2).join(' ')} • {message.createdAt}
                                </Typography>
                                <Box className='flex flex-row w-full justify-end'>
                                    <Box className='flex flex-col p-5 bg-neutral-100 rounded-xl mt-3'>
                                    <Typography className='text-left !font-roboto text-neutral-900 !text-[14px] !leading-[1.1rem]' style={{ whiteSpace: 'pre-line' }}>
                                        {message.message}
                                    </Typography>
                                    </Box>
                                    <Box className='mt-1 ml-3'>
                                    <PiUserSquareLight className="text-[4rem] text-[#646464]" />
                                    </Box>
                                </Box>
                            </>
                        ) : (
                            <>
                                <Typography className='text-left !font-roboto !text-sm w-full'>
                                    {message.nameSentUser.split(' ').slice(0, 2).join(' ')} • {message.createdAt}
                                </Typography>
                                <Box className='flex flex-row w-full justify-start'>
                                    <Box className='mt-1 mr-3'>
                                    <PiUserSquareLight className="text-[4rem] text-[#646464]" />
                                    </Box>
                                    <Box className='flex flex-col p-5 bg-[#ecf9f9] rounded-xl mt-3'>
                                    <Typography className='text-left !font-roboto text-neutral-900 !text-[14px] !leading-[1.1rem]' style={{ whiteSpace: 'pre-line' }}>
                                        {message.message}
                                    </Typography>
                                    </Box>
                                </Box>
                            </>
                        )}
                        </Box>
                    ))}
                </Box>
                <Box className='bg-[#f8f9f9] rounded-b-lg border-t-[#d8dcde] border-t flex flex-col p-5'>
                    <FormControl fullWidth>
                        <TextField
                            name='message'
                            multiline
                            rows={4}
                            label='Mensagem'
                            variant='outlined'
                            value={formData.message}
                            onChange={handleTextFieldChange}
                            inputProps={{ maxLength: 300 }}
                            error={Boolean(errors.messageError)}
                            helperText={errors.messageError}
                        />
                        <Box
                            className='mt-2 font-light text-[.9rem]'
                            sx={{
                                color: charactersRemaining <= 10 ? 'red' : 'inherit',
                            }}
                        >
                            Restam {charactersRemaining} caracteres
                        </Box>
                    </FormControl>
                    <Box className='flex flex-col items-end w-full'>
                        <Button
                            disabled={isLoading || !formData.message}
                            variant="contained"
                            color="primary"
                            onClick={() => handleMessageCreate(data.ticketCode)}
                            className='w-[15rem]'
                            endIcon={isLoading ? '' : <MdCheckCircle />}
                            sx={{
                                backgroundColor: '#ff0336',
                                color: '#fff',
                                height: '3rem',
                                '&:hover': {
                                backgroundColor: '#e6001b',
                                },
                            }}
                            >
                            {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Enviar Mensagem'}
                        </Button>
                    </Box>
                </Box>
            </Box>
        </>
    );
}

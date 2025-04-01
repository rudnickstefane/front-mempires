import { Box, Button, Divider, Drawer, Tooltip, Typography } from "@mui/material";
import { LuShieldAlert } from "react-icons/lu";
import { MdKeyboardArrowRight } from "react-icons/md";
import { TbArrowLeft, TbEdit } from "react-icons/tb";
import { DrawerProps } from '../../../../../../../../../common/types';
import { FormatZipCode } from '../../../../../../../../../common/utils';
import { useContributorEditForm } from '../../../../../../../hooks';

export const GymContributorDetails = ({
    closeDrawer,
    enqueueSnackbar,
    data,
    refresh,
    onBack,
}: DrawerProps) => {

    const {
        isDrawerOpen,
        closeDrawerDetails,
        renderDrawerContent,
        openDrawer
    } = useContributorEditForm({ closeDrawer, enqueueSnackbar, data, refresh });

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
                        Perfil do Colaborador
                    </Typography>
                    <Typography className="flex flex-row items-center !text-[.85rem] !mt-4">
                    Administrativo
                    <MdKeyboardArrowRight className='mx-1.5'/>
                    Configurações
                    <MdKeyboardArrowRight className='mx-1.5'/>
                    Colaboradores
                    <MdKeyboardArrowRight className='mx-1.5'/>
                    Mais detalhes
                    </Typography>
                </Box>
                <Box>
                    <Typography className='flex flex-row items-center !text-[.85rem] !mt-4'>
                        Código: PFL-{data.profileCode}
                    </Typography>
                </Box>
            </Box>
            <Divider className='!my-5 w-full bg-[#e2e2e4]' />
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
                        onClick={() => openDrawer('EditContributor', 0)}
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
                                <Typography className='!text-neutral-700 !font-roboto !text-sm !mt-4'>Cargo</Typography>
                                <Typography className='!text-neutral-700 !font-roboto !text-sm !mt-4 !font-semibold'>{data.profession}</Typography>
                            </Box>
                            <Box className='grid grid-cols-[10.5rem,1fr]'>
                                <Typography className='!text-neutral-700 !font-roboto !text-sm !mt-4'>Empresa</Typography>
                                <Typography className='!text-neutral-700 !font-roboto !text-sm !mt-4 !font-semibold'>{data.company}</Typography>
                            </Box>
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
                        onClick={() => openDrawer('EditContributor', 1)}
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
                            onClick={() => openDrawer('EditContributor', 2)}
                        >
                            <TbEdit size={24} />
                        </Button>
                    </Box>
                    {data && data?.contact?.filter((contact) => contact.emailStatus === 'PENDING').length > 0 && (
                        <Box className='bg-[#fff9ee] border border-[#faa200] rounded-lg font-semibold flex flex-row items-center justify-center text-[#faa200] py-1 px-2 uppercase text-[.8rem] font-poppins'>
                            <LuShieldAlert className='text-[#faa200] text-[1.3rem] mr-2' /> 
                            {data?.contact?.filter((contact) => contact.emailStatus === 'PENDING').length > 1 
                            ? 'Existem e-mails não confirmados' 
                            : 'Existe um e-mail não confirmado'}
                        </Box>
                    )}
                </Box>
                <Box className='flex flex-wrap justify-between'>
                    {data?.contact
                        .sort((a) => (a.type === 'MAIN' ? -1 : 1))
                        .map((contact) => (
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
}

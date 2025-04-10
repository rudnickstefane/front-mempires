import { Box, Button, Divider, Drawer, Skeleton, Tooltip, Typography } from "@mui/material";
import { LuShieldAlert } from "react-icons/lu";
import { MdDeleteOutline } from "react-icons/md";
import { PiUserSquareLight } from "react-icons/pi";
import { TbEdit, TbPhotoEdit } from "react-icons/tb";
import styled from "styled-components";
import { FindProfileDetailsResponse } from "../../common/types";
import { FormatIdentity, FormatZipCode } from "../../common/utils";
import { ImageCropModal } from "../Management/components/Modals";
import { useProfileGymManagement } from "../Management/pages/Gym/hooks";

type GymProfileManagementProps = {
    data: FindProfileDetailsResponse | undefined;
    refresh: () => Promise<void>;
    isProfileLoading: boolean;
}

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

export default function GymProfileManagement({ data, refresh, isProfileLoading }: GymProfileManagementProps) {

    const {
        isLoading,
        renderDrawerContent,
        isDrawerOpen,
        openDrawer,
        closeDrawer,
        handleImageUpload,
        handleCrop,
        image,
        croppedImage,
        isDialogOpen,
        setIsDialogOpen,
        cropperRef,
        profileCode,
        handleDeleteImage,
    } = useProfileGymManagement({ data, refresh });

    return (
        <>
            <Drawer
                anchor="right"
                open={isDrawerOpen}
                onClose={closeDrawer}
                disableEnforceFocus
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
                                <>
                                    <img
                                        src={croppedImage}
                                        alt="Cropped"
                                        className="w-full h-full rounded-3xl absolute"
                                        style={{
                                        maxWidth: '300px',
                                        }}
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
                            ) : data?.findProfileDetails.photo ? (
                                <>
                                    <img
                                        src={data?.findProfileDetails.photo}
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
                        {isProfileLoading ? (
                                <>
                                    <Skeleton variant="text" className='w-[40%] !h-[4rem]' animation="wave" />
                                    <Box className='flex flex-row items-center -mt-3'>
                                        <Skeleton variant="text" className='!w-[20%] mr-1.5' animation="wave" />
                                    </Box>
                                    <Skeleton variant="text" className='!w-[15%] !h-[1.7rem] mr-1.5 !mt-1' animation="wave" />
                                    <Skeleton variant="text" className='!w-[35%] !h-[1.6rem] !-mt-[.1rem]' animation="wave" />
                                </>
                            ) : (
                                <>
                                    <Typography className='md:!text-[2rem] !text-[1.5rem] whitespace-nowrap overflow-hidden text-ellipsis max-w-[55vw]'>
                                        {data?.findProfileDetails.name}
                                    </Typography>
                                    <Typography className='flex flex-row items-center !text-[.9rem]'>
                                        {data?.findProfileDetails.username 
                                        ? `@${data.findProfileDetails.username} | ${data.findProfileDetails.contact[0].email}` 
                                        : data?.findProfileDetails.contact[0].email}
                                    </Typography>
                                    {data?.findProfileDetails?.userPlan && (
                                        <>
                                            <Typography className='!mt-4'>
                                            {data?.findProfileDetails.userPlan.level === 'FREE_PERIOD' 
                                            ? 'Você está no período gratuito de 15 dias' 
                                            : data?.findProfileDetails?.userPlan?.name}
                                            </Typography>
                                            <Typography className='!text-[.9rem]'>
                                                {data?.findProfileDetails.userPlan.level === 'FREE_PERIOD' 
                                                ? '' 
                                                : `Assinante desde ${data?.findProfileDetails?.userPlan?.createdAt}`}
                                            </Typography>
                                        </>
                                    )}
                                </>
                            )
                        }
                    </Box>
                </Box>

                <Box className='flex flex-row w-full mt-5'>
                    <Box className='bg-white w-full rounded-3xl shadow-md p-5 border border-[#EAECF0]'>
                        <Box className='flex flex-row justify-between items-center'>
                            <Box>
                                <Typography className='flex flex-row items-center !text-[2.25rem] text-[#212121]'>
                                    Meus Dados
                                </Typography>
                                <Typography className='flex flex-row items-center !text-[.85rem] !mt-4'>
                                    Informações Cadastrais
                                </Typography>
                            </Box>
                            <Box>
                                <Typography className='flex flex-row items-center !text-[.85rem] !mt-4'>
                                    Código: PFL-{profileCode}
                                </Typography>
                            </Box>
                        </Box>
                        <Divider className='!my-5 w-full bg-[#e2e2e4]' />
                        {data?.findProfileDetails?.userPlan && (
                            <Box className='mt-5 border border-neutral-300 rounded-lg p-5'>
                                <Box className='!text-neutral20 !font-roboto !text-base !font-semibold !flex !items-center !gap-4'>Detalhes do Plano</Box>
                                {data?.findProfileDetails?.userPlan && data?.findProfileDetails.userPlan.level != 'FREE_PERIOD' ? (
                                        isProfileLoading ? (
                                            <>
                                            {Array.from({ length: 2 }).map((_, index) => (
                                                <Box key={index} className="flex flex-col">
                                                <Skeleton variant="text" animation="wave" className="w-[30%] !h-[2.1rem] !mt-2" />
                                                </Box>
                                            ))}
                                            </>
                                        ) : (
                                            <>
                                            <Box className='grid grid-cols-[10rem,1fr]'>
                                                <Typography className='!text-neutral-700 !font-roboto !text-sm !mt-4'>Assinatura</Typography>
                                                <Typography className='!text-neutral-700 !font-roboto !text-sm !mt-4 !font-semibold'>
                                                {data.findProfileDetails.userPlan.name || ''}
                                                </Typography>
                                            </Box>
                                            <Box className='grid grid-cols-[10rem,1fr]'>
                                                <Typography className='!text-neutral-700 !font-roboto !text-sm !mt-4'>Assinante desde</Typography>
                                                <Typography className='!text-neutral-700 !font-roboto !text-sm !mt-4 !font-semibold'>
                                                {data.findProfileDetails.userPlan.createdAt || ''}
                                                </Typography>
                                            </Box>
                                            <Box className='grid grid-cols-[10rem,1fr]'>
                                                <Typography className='!text-neutral-700 !font-roboto !text-sm !mt-4'>Valor</Typography>
                                                <Typography className='!text-neutral-700 !font-roboto !text-sm !mt-4 !font-semibold'>
                                                R$ {data.findProfileDetails.userPlan.amount || ''}
                                                </Typography>
                                            </Box>
                                            <Box className='grid grid-cols-[10rem,1fr]'>
                                                <Typography className='!text-neutral-700 !font-roboto !text-sm !mt-4'>Próximo vencimento</Typography>
                                                <Typography className='!text-neutral-700 !font-roboto !text-sm !mt-4 !font-semibold'>
                                                {data.findProfileDetails.userPlan.nextDueDate || ''}
                                                </Typography>
                                            </Box>
                                            </>
                                        )
                                    ) : (
                                        <Typography className="!text-neutral-700 !font-roboto !text-sm !mt-4">Você está no período gratuito de 15 dias.</Typography>
                                    )
                                }
                            </Box>
                        )}

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
                                    onClick={() => openDrawer('EditInfos', 0)}
                                >
                                    <TbEdit size={24} />
                                </Button>
                            </Box>
                            {isProfileLoading ? (
                                    <>
                                        {Array.from({ length: Math.min(5) }).map((_, index) => (
                                            <Box key={index} className="flex flex-col">
                                                <Skeleton variant="text" animation="wave" className="w-[30%] !h-[2.1rem] !mt-2" />
                                            </Box>
                                        ))}
                                    </>
                                ) : (
                                    <>
                                        <Box className='grid grid-cols-[10rem,1fr]'>
                                            <Typography className='!text-neutral-700 !font-roboto !text-sm !mt-4'>Nome</Typography>
                                            <Typography className='!text-neutral-700 !font-roboto !text-sm !mt-4 !font-semibold'>{data?.findProfileDetails.name || ''}</Typography>
                                        </Box>
                                        <Box className='grid grid-cols-[10rem,1fr]'>
                                            <Typography className='!text-neutral-700 !font-roboto !text-sm !mt-4'>Data de Nascimento</Typography>
                                            <Typography className='!text-neutral-700 !font-roboto !text-sm !mt-4 !font-semibold'>{data?.findProfileDetails.birthDate || ''}</Typography>
                                        </Box>
                                        <Box className='grid grid-cols-[10rem,1fr]'>
                                            <Typography className='!text-neutral-700 !font-roboto !text-sm !mt-4'>CPF</Typography>
                                            <Typography className='!text-neutral-700 !font-roboto !text-sm !mt-4 !font-semibold'>
                                                {data?.findProfileDetails.identity ? FormatIdentity(data?.findProfileDetails.identity) : ''}
                                                </Typography>
                                        </Box>
                                        <Box className='grid grid-cols-[10rem,1fr]'>
                                            <Typography className='!text-neutral-700 !font-roboto !text-sm !mt-4'>Nome de Usuário</Typography>
                                            <Typography className='!text-neutral-700 !font-roboto !text-sm !mt-4 !font-semibold'>@{data?.findProfileDetails.username || ''}</Typography>
                                        </Box>
                                    </>
                                )
                            }
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
                                    onClick={() => openDrawer('EditInfos', 1)}
                                >
                                    <TbEdit size={24} />
                                </Button>
                            </Box>
                            {isProfileLoading ? (
                                    <>
                                        {Array.from({ length: Math.min(7) }).map((_, index) => (
                                            <Box key={index} className="flex flex-col">
                                                <Skeleton variant="text" animation="wave" className="w-[30%] !h-[2.1rem] !mt-2" />
                                            </Box>
                                        ))}
                                    </>
                                ) : (
                                    <>
                                        <Box className='grid grid-cols-[10rem,1fr]'>
                                            <Typography className='!text-neutral-700 !font-roboto !text-sm !mt-4'>CEP</Typography>
                                            <Typography className='!text-neutral-700 !font-roboto !text-sm !mt-4 !font-semibold'>
                                                {data?.findProfileDetails.zipCode ? FormatZipCode(data.findProfileDetails.zipCode) : ''}
                                            </Typography>
                                        </Box>
                                        <Box className='grid grid-cols-[10rem,1fr]'>
                                            <Typography className='!text-neutral-700 !font-roboto !text-sm !mt-4'>Logradouro</Typography>
                                            <Typography className='!text-neutral-700 !font-roboto !text-sm !mt-4 !font-semibold'>{data?.findProfileDetails.address || ''}</Typography>
                                        </Box>
                                        <Box className='grid grid-cols-[10rem,1fr]'>
                                            <Typography className='!text-neutral-700 !font-roboto !text-sm !mt-4'>Número</Typography>
                                            <Typography className='!text-neutral-700 !font-roboto !text-sm !mt-4 !font-semibold'>{data?.findProfileDetails.number || ''}</Typography>
                                        </Box>
                                        <Box className='grid grid-cols-[10rem,1fr]'>
                                            <Typography className='!text-neutral-700 !font-roboto !text-sm !mt-4'>Complemento</Typography>
                                            <Typography className='!text-neutral-700 !font-roboto !text-sm !mt-4 !font-semibold'>{data?.findProfileDetails.complement || ''}</Typography>
                                        </Box>
                                        <Box className='grid grid-cols-[10rem,1fr]'>
                                            <Typography className='!text-neutral-700 !font-roboto !text-sm !mt-4'>Bairro</Typography>
                                            <Typography className='!text-neutral-700 !font-roboto !text-sm !mt-4 !font-semibold'>{data?.findProfileDetails.district || ''}</Typography>
                                        </Box>
                                        <Box className='grid grid-cols-[10rem,1fr]'>
                                            <Typography className='!text-neutral-700 !font-roboto !text-sm !mt-4'>Cidade</Typography>
                                            <Typography className='!text-neutral-700 !font-roboto !text-sm !mt-4 !font-semibold'>{data?.findProfileDetails.city || ''}</Typography>
                                        </Box>
                                        <Box className='grid grid-cols-[10rem,1fr]'>
                                            <Typography className='!text-neutral-700 !font-roboto !text-sm !mt-4'>Estado</Typography>
                                            <Typography className='!text-neutral-700 !font-roboto !text-sm !mt-4 !font-semibold'>{data?.findProfileDetails.state || ''}</Typography>
                                        </Box>
                                    </>
                                )
                            }
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
                                        onClick={() => openDrawer('EditInfos', 2)}
                                    >
                                        <TbEdit size={24} />
                                    </Button>
                                </Box>
                                {data && data.findProfileDetails?.contact?.filter((contact) => contact.emailStatus === 'PENDING').length > 0 && (
                                    <Box className='bg-[#fff9ee] border border-[#faa200] rounded-lg font-semibold flex flex-row items-center justify-center text-[#faa200] py-1 px-2 uppercase text-[.8rem] font-poppins'>
                                        <LuShieldAlert className='text-[#faa200] text-[1.3rem] mr-2' /> 
                                        {data.findProfileDetails?.contact?.filter((contact) => contact.emailStatus === 'PENDING').length > 1 
                                        ? 'Existem e-mails não confirmados' 
                                        : 'Existe um e-mail não confirmado'}
                                    </Box>
                                )}
                            </Box>
                            {isProfileLoading ? (
                                    <Skeleton variant="text" animation="wave" className="w-[30%] !h-[10rem] !-my-[2.1rem]" />
                                ) : (
                                    <Box className='flex flex-wrap justify-between'>
                                        {data?.findProfileDetails.contact
                                            .sort((a) => (a.type === 'MAIN' ? -1 : 1))
                                            .map((contact) => (
                                            <Box
                                                key={contact.contactCode}
                                                className="bg-[#F3F3F4] md:w-[49%] w-full rounded-lg p-5 pt-[14px] grid grid-cols-[5.5rem,1fr] mb-5"
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
                                            </Box>
                                        ))}
                                    </Box>
                                )
                            }
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    );
}

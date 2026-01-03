import { Box, Button, Divider, Drawer, Typography } from "@mui/material";
import { MdKeyboardArrowRight } from "react-icons/md";
import { TbArrowLeft, TbEdit } from "react-icons/tb";
import { DrawerProps } from '../../../../../../../../../common/types';
import { useGroupEditForm } from '../../../../../../../hooks';

export const GymGroupsDetails = ({
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
    } = useGroupEditForm({ closeDrawer, enqueueSnackbar, data, refresh });

    const permissionMapping: Record<string, string> = {
        NONE: "Restrito",
        VIEW: "Visualização",
        UPDATE: "Edição",
        ADMIN: "Sem restrição",
    };

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
                        Detalhes do grupo
                    </Typography>
                    <Typography className="flex flex-row items-center !text-[.85rem] !mt-4">
                    Administrativo
                    <MdKeyboardArrowRight className='mx-1.5'/>
                    Configurações
                    <MdKeyboardArrowRight className='mx-1.5'/>
                    Grupos de acesso
                    <MdKeyboardArrowRight className='mx-1.5'/>
                    Mais detalhes
                    </Typography>
                </Box>
                <Box>
                    <Typography className='flex flex-row items-center !text-[.85rem] !mt-4'>
                        Código: GPA-{data.groupCode}
                    </Typography>
                </Box>
            </Box>
            <Divider className='!my-5 w-full bg-[#e2e2e4]' />
            <Box className='mt-5 border border-neutral-300 rounded-lg p-5'>
                <Box className='!text-neutral20 !font-roboto !text-base !font-semibold !flex !items-center !gap-4'>Dados do grupo
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
                        onClick={() => openDrawer('EditGroup', 0)}
                    >
                        <TbEdit size={24} />
                    </Button>
                </Box>
                <Box className='grid grid-cols-[10.5rem,1fr]'>
                    <Typography className='!text-neutral-700 !font-roboto !text-sm !mt-4'>Nome</Typography>
                    <Typography className='!text-neutral-700 !font-roboto !text-sm !mt-4 !font-semibold'>{data?.name}</Typography>
                </Box>
                <Box className='grid grid-cols-[10.5rem,1fr]'>
                    <Typography className='!text-neutral-700 !font-roboto !text-sm !mt-4'>Descrição</Typography>
                    <Typography className='!text-neutral-700 !font-roboto !text-sm !mt-4 !font-semibold'>{data?.description}</Typography>
                </Box>
            </Box>

            <Box className='!font-roboto text-base font-semibold flex items-center gap-4 mt-5'>Permissões
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
                    onClick={() => openDrawer('EditGroup', 1)}
                >
                    <TbEdit size={24} />
                </Button>
            </Box>
            <Box className='mt-5 border border-neutral-300 rounded-lg p-5'>
                <Box className='flex flex-row justify-between'>
                    <Box>
                        <Typography className='p-3 bg-[#28292914] rounded-lg'>Geral</Typography>
                    </Box>
                    <Typography className='p-3'>Permissões definidas abaixo</Typography>
                </Box>
                <Box>
                    <Box className='grid grid-cols-[10rem,1fr]'>
                        <Typography className='!text-neutral-700 !font-roboto !text-sm !mt-4'>Dados da academia</Typography>
                        <Typography className='!text-neutral-700 !font-roboto !text-sm !mt-4 !font-semibold'>
                            {permissionMapping[data.permissions.find((p: { path: string; }) => p.path === "Company")?.permission]}
                        </Typography>
                    </Box>
                </Box>
            </Box>
            <Box className='mt-5 border border-neutral-300 rounded-lg p-5'>
                <Box className='flex flex-row justify-between'>
                    <Box>
                        <Typography className='p-3 bg-[#28292914] rounded-lg'>Menu</Typography>
                    </Box>
                    <Typography className='p-3'>Permissões definidas abaixo</Typography>
                </Box>
                <Box>
                    <Box className='grid grid-cols-[10rem,1fr]'>
                        <Typography className='!text-neutral-700 !font-roboto !text-sm !mt-4'>Administrativo</Typography>
                        <Typography className='!text-neutral-700 !font-roboto !text-sm !mt-4 !font-semibold'>
                            {permissionMapping[data.permissions.find((p: { path: string; }) => p.path === "Admin")?.permission]}
                        </Typography>
                    </Box>
                    <Box className='grid grid-cols-[10rem,1fr]'>
                        <Typography className='!text-neutral-700 !font-roboto !text-sm !mt-4'>Financeiro</Typography>
                        <Typography className='!text-neutral-700 !font-roboto !text-sm !mt-4 !font-semibold'>
                            {permissionMapping[data.permissions.find((p: { path: string; }) => p.path === "Finance")?.permission]}
                        </Typography>
                    </Box>
                    <Box className='grid grid-cols-[10rem,1fr]'>
                        <Typography className='!text-neutral-700 !font-roboto !text-sm !mt-4'>Integrações</Typography>
                        <Typography className='!text-neutral-700 !font-roboto !text-sm !mt-4 !font-semibold'>
                            {permissionMapping[data.permissions.find((p: { path: string; }) => p.path === "Integration")?.permission]}
                        </Typography>
                    </Box>
                    <Box className='grid grid-cols-[10rem,1fr]'>
                        <Typography className='!text-neutral-700 !font-roboto !text-sm !mt-4'>Relatórios</Typography>
                        <Typography className='!text-neutral-700 !font-roboto !text-sm !mt-4 !font-semibold'>
                            {permissionMapping[data.permissions.find((p: { path: string; }) => p.path === "Dashboard")?.permission]}
                        </Typography>
                    </Box>
                    <Box className='grid grid-cols-[10rem,1fr]'>
                        <Typography className='!text-neutral-700 !font-roboto !text-sm !mt-4'>Programas</Typography>
                        <Typography className='!text-neutral-700 !font-roboto !text-sm !mt-4 !font-semibold'>
                            {permissionMapping[data.permissions.find((p: { path: string; }) => p.path === "Programs")?.permission]}
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </>
    );
}

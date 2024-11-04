import {
    Box,
    Button,
    Divider,
    Typography
} from "@mui/material";

import { useState } from "react";
import { CgMenuRightAlt } from "react-icons/cg";
import { LiaUserCogSolid } from "react-icons/lia";
import { MdKeyboardArrowRight, MdOutlineAssignment } from "react-icons/md";
import { PiUserSquareLight } from "react-icons/pi";
import GymIntegrationAccessManagement from "../../gym/integration/access-gym-integration";
import GymIntegrationCameraManagement from "../../gym/integration/camera-gym-integration";
import GymIntegrationGympassManagement from "../../gym/integration/gympass-gym-integration";
import GymIntegrationKeyboardManagement from "../../gym/integration/keyboard-gym-integration";
import GymIntegrationMiniPrinterManagement from "../../gym/integration/mini-printer-gym-integration";
import GymIntegrationReaderManagement from "../../gym/integration/reader-gym-integration";
import GymIntegrationTotalPassManagement from "../../gym/integration/totalpass-gym-integration";
import GymIntegrationTurnstileManagement from "../../gym/integration/turnstile-gym-integration";
import { GymIntegrationManagementType } from "../../gym/types/gym-integration.types";
import { ResourceBoxProps } from "../../gym/types/gym-resource-box.types";
import GymAccountManagement from "./home-gym-integration";

const resources: ResourceBoxProps[] = [
    {
        icon: LiaUserCogSolid,
        type: 'teste',
        name: 'Minha Conta',
        subName: 'Tipos de Acesso',
        description: 'Minha <span class="color-primary">Conta</span>',
    },
    {
        icon: MdOutlineAssignment,
        type: 'CardOperator',
        name: 'Dados da Assinatura',
        description: 'Gerenciamento de <span class="color-primary">Operadoras de Cartão</span>',
    },
];

const subResources: ResourceBoxProps[] = [
    {
        icon: MdKeyboardArrowRight,
        type: 'Turnstile',
        name: 'Catracas',
        description: 'Configurações de <span class="color-primary">Catracas</span>',
    },
    {
        icon: MdKeyboardArrowRight,
        type: 'Reader',
        name: 'Leitores',
        description: 'Configurações de <span class="color-primary">Leitores</span>',
    },
    {
        icon: MdKeyboardArrowRight,
        type: 'Camera',
        name: 'Câmeras',
        description: 'Configurações de <span class="color-primary">Câmeras</span>',
    },
    {
        icon: MdKeyboardArrowRight,
        type: 'Keyboard',
        name: 'Teclados',
        description: 'Configurações de <span class="color-primary">Teclados</span>',
    },
    {
        icon: MdKeyboardArrowRight,
        type: 'Gympass',
        name: 'Gympass',
        description: 'Integração com <span class="color-primary">Gympass</span>',
    },
    {
        icon: MdKeyboardArrowRight,
        type: 'TotalPass',
        name: 'TotalPass',
        description: 'Integração com <span class="color-primary">TotalPass</span>',
    },
];

const ResourceBox = ({ icon: Icon, name, onClick, isSelected }: ResourceBoxProps & { onClick: () => void, isSelected: boolean }) => (
    <Button
        startIcon={<Icon className='color-primary' />}
        className='font-poppins !text-[1rem] !rounded-none !px-5'
        style={{
            textTransform: 'none',
            color: isSelected ? '#ff0336' : '#08041b',
            justifyContent: 'flex-start',
            height: '50px',
            background: isSelected ? '#f3f3f3' : 'transparent',
            borderRight: isSelected ? '2px solid #ff0336' : 'none'
        }}
        sx={{
            fontWeight: 'light',
            transition: 'transform 0.3s, background-color 0.3s, color 0.3s,',
            '&:hover': {
                background: '#f3f3f3 !important'
            },
        }}
        onClick={onClick}
    >
        {name}
    </Button>
);

const SubResourceBox = ({ icon: Icon, name, onClick, isSelected }: ResourceBoxProps & { onClick: () => void, isSelected: boolean }) => (
    <Button
        endIcon={<Icon />}
        className='font-poppins !text-[1rem] !px-5 !rounded-xl !mt-4'
        style={{
            textTransform: 'none',
            color: '#08041b',
            justifyContent: 'space-between',
            height: '50px',
            background: isSelected ? '#f6fbef' : 'transparent',
        }}
        sx={{
            fontWeight: 'light',
            transition: 'transform 0.3s, background-color 0.3s, color 0.3s,',
            '&:hover': {
                background: '#f6fbef !important'
            },
        }}
        onClick={onClick}
    >
        {name}
    </Button>
);

const renderComponents: { [key in GymIntegrationManagementType]: React.ComponentType } = {
    Home: GymAccountManagement,
    Access: GymIntegrationAccessManagement,
    CardOperator: GymAccountManagement,
    MiniPrinter: GymIntegrationMiniPrinterManagement,
    Turnstile: GymIntegrationTurnstileManagement,
    Reader: GymIntegrationReaderManagement,
    Camera: GymIntegrationCameraManagement,
    Keyboard: GymIntegrationKeyboardManagement,
    Gympass: GymIntegrationGympassManagement,
    TotalPass: GymIntegrationTotalPassManagement
};

export default function GymProfileManagement() {
    const [selectedResource, setSelectedResource] = useState<ResourceBoxProps | null>(null); // Guarda o recurso principal selecionado
    const [selectedSubResource, setSelectedSubResource] = useState<ResourceBoxProps | null>(null); // Guarda o sub-recurso selecionado
    const [activeComponent, setActiveComponent] = useState<GymIntegrationManagementType>('Home'); // Controle para o componente ativo


    const handleResourceClick = (resource: ResourceBoxProps) => {
        setSelectedResource(resource);
        setSelectedSubResource(null); // Reseta o sub-recurso quando o recurso principal muda
        if (resource.type in renderComponents) {
            setActiveComponent(resource.type as GymIntegrationManagementType);
        }
    };

    const handleSubResourceClick = (subResource: ResourceBoxProps) => {
        setSelectedSubResource(subResource);
        if (subResource.type in renderComponents) {
            setActiveComponent(subResource.type as GymIntegrationManagementType);
        }
    };

    const ActiveComponent = renderComponents[activeComponent];

    return (
        <Box>
            <Box className='flex flex-row'>
                <PiUserSquareLight className='text-[6rem] mr-3' />
                <Box>
                    <Typography className='!text-[2rem] !mt-2.5'>Alexandre Lindote Martins</Typography>
                    <Typography className='flex flex-row items-center !text-[.9rem]'>@alexandre | alexandre@gmail.com</Typography>
                    <Typography className='!mt-4'>Plano Mensal</Typography>
                    <Typography className='!text-[.9rem]'>Assinante desde 14 de Setembro de 2024</Typography>
                </Box>
            </Box>
            <Box className='flex flex-row bg-white rounded-3xl shadow-md w-full mt-5'>
                {/* Menu Principal */}
                <Box className='flex flex-col min-h-full py-5 bg-[#fbfbfb] rounded-l-3xl border-r-[1px] border-[##efefef] min-w-[16.1rem]'>
                    <Button
                        endIcon={<CgMenuRightAlt />}
                        className='font-poppins !text-[1rem] !rounded-none !px-5'
                        style={{ textTransform: 'none', color: '#08041b', justifyContent: 'space-between', height: '50px' }}
                        sx={{
                            fontWeight: 'light',
                            transition: 'transform 0.3s, background-color 0.3s, color 0.3s,',
                            '&:hover': {
                                background: '#f3f3f3'
                            },
                        }}>Navegue abaixo
                    </Button>
                    {resources.map((resource, index) => (
                        <ResourceBox
                            key={index}
                            icon={resource.icon}
                            name={resource.name}
                            type={''}
                            description={resource.description}
                            isSelected={selectedResource?.name === resource.name}
                            onClick={() => handleResourceClick(resource)}
                        />
                    ))}
                </Box>

                {/* Submenu */}
                {selectedResource?.type === 'Access' && (
                    <Box className='flex flex-col min-w-[12rem] h-full m-5 mr-0'>
                        <Typography className='flex flex-row items-center !text-[.75rem] !m-3 !mb-0 uppercase'>{selectedResource && <>{selectedResource.subName}</>}</Typography>
                        {subResources.map((subResource, index) => (
                            <SubResourceBox
                                key={index}
                                icon={subResource.icon}
                                name={subResource.name}
                                type={''}
                                description={subResource.description}
                                isSelected={selectedSubResource?.name === subResource.name}
                                onClick={() => handleSubResourceClick(subResource)}
                            />
                        ))}
                    </Box>
                )}

                {/* Breadcrumb */}
                <Box className='flex flex-col m-5 w-full'>
                    <Box className='w-full'>
                        {selectedSubResource ? (
                            // Renderiza o conteúdo com HTML usando dangerouslySetInnerHTML
                            <>
                                <Typography className='flex flex-row items-center !text-[2.25rem] text-[#212121]'>
                                    <Box dangerouslySetInnerHTML={{ __html: selectedSubResource.description }} />
                                </Typography>
                                <Typography className='flex flex-row items-center !text-[.85rem] !mt-4'>
                                    Perfil e Configurações
                                    {selectedResource && <><MdKeyboardArrowRight /> {selectedResource.name}</>}
                                    {selectedSubResource && <><MdKeyboardArrowRight /> {selectedSubResource.name}</>}
                                </Typography>
                                <Divider className='!my-5 w-full bg-[#e2e2e4]' />
                            </>
                        ) : (
                            // Caso contrário, exibe o nome do recurso principal
                            selectedResource && <>
                                <Typography className='flex flex-row items-center !text-[2.25rem] text-[#212121]'>
                                    <Box dangerouslySetInnerHTML={{ __html: selectedResource.description }} />
                                </Typography>
                                <Typography className='flex flex-row items-center !text-[.85rem] !mt-4'>
                                    Perfil e Configurações
                                    {selectedResource && <><MdKeyboardArrowRight /> {selectedResource.name}</>}
                                </Typography>
                                <Divider className='!my-5 w-full bg-[#e2e2e4]' />
                            </>

                        )}
                    </Box>
                    <Box>
                        <ActiveComponent />
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}

import { Box, Button, Divider, Tooltip, Typography } from "@mui/material";
import { useState } from "react";
import { BsPrinter } from "react-icons/bs";
import { CgMenuRightAlt } from "react-icons/cg";
import { FaPersonWalkingDashedLineArrowRight } from "react-icons/fa6";
import { ImCreditCard } from "react-icons/im";
import { MdKeyboardArrowRight } from "react-icons/md";
import { GymIntegrationManagementType } from "../../../../../../../pages/management/gym/types/gym-integration.types";
import { ResourceBoxProps } from "../../../../../../../pages/management/gym/types/gym-resource-box.types";
import GymIntegrationAccessManagement from "./access-gym-integration";
import GymIntegrationCameraManagement from "./camera-gym-integration";
import GymIntegrationCardOperatorManagement from "./card-operator-gym-integration";
import GymIntegrationGympassManagement from "./gympass-gym-integration";
import GymIntegrationHomeManagement from "./home-gym-integration";
import GymIntegrationKeyboardManagement from "./keyboard-gym-integration";
import GymIntegrationMiniPrinterManagement from "./mini-printer-gym-integration";
import GymIntegrationReaderManagement from "./reader-gym-integration";
import GymIntegrationTotalPassManagement from "./totalpass-gym-integration";

import GymIntegrationTurnstileManagement from "./turnstile-gym-integration";
const collapsibleMenus = ['Access'];

const resources: ResourceBoxProps[] = [
    {
        icon: FaPersonWalkingDashedLineArrowRight,
        type: 'Access',
        name: 'Acessos',
        subName: 'Tipos de Acesso',
        description: 'Acessos e <span class="color-primary">Integrações</span>',
    },
    {
        icon: ImCreditCard,
        type: 'CardOperator',
        name: 'Operadoras de Cartão',
        description: 'Gerenciamento de <span class="color-primary">Operadoras de Cartão</span>',
    },
    {
        icon: BsPrinter,
        type: 'MiniPrinter',
        name: 'Mini Impressoras',
        description: 'Configuração de <span class="color-primary">Mini Impressoras</span>',
    }
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

const ResourceBox = ({ icon: Icon, name, onClick, isSelected, isMenuCollapsed }: ResourceBoxProps & { onClick: () => void, isSelected: boolean }) => (
    <Button
        startIcon={!isMenuCollapsed ? <Icon className='color-primary' /> : null}  // Mostra o ícone apenas quando não está encolhido
        className='font-poppins !text-[1rem] !rounded-none !px-5 w-full'
        style={{
            textTransform: 'none',
            color: isSelected ? '#ff0336' : '#08041b',
            justifyContent: isMenuCollapsed ? 'center' : 'flex-start',  // Centraliza o ícone quando o menu está encolhido
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
        {isMenuCollapsed ? <Icon className='color-primary w-[20px] h-[20px]' /> : name} {/* Mostra o ícone centralizado se o menu estiver encolhido */}
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
    Home: GymIntegrationHomeManagement,
    Access: GymIntegrationAccessManagement,
    CardOperator: GymIntegrationCardOperatorManagement,
    MiniPrinter: GymIntegrationMiniPrinterManagement,
    Turnstile: GymIntegrationTurnstileManagement,
    Reader: GymIntegrationReaderManagement,
    Camera: GymIntegrationCameraManagement,
    Keyboard: GymIntegrationKeyboardManagement,
    Gympass: GymIntegrationGympassManagement,
    TotalPass: GymIntegrationTotalPassManagement
};

export default function GymIntegrationManagement() {
    const [selectedResource, setSelectedResource] = useState<ResourceBoxProps | null>(null); // Guarda o recurso principal selecionado
    const [selectedSubResource, setSelectedSubResource] = useState<ResourceBoxProps | null>(null); // Guarda o sub-recurso selecionado
    const [activeComponent, setActiveComponent] = useState<GymIntegrationManagementType>('Home'); // Controle para o componente ativo
    const [isMenuCollapsed, setIsMenuCollapsed] = useState(false);

    const handleResourceClick = (resource: ResourceBoxProps) => {
        setSelectedResource(resource);
        setSelectedSubResource(null); // Reseta o sub-recurso quando o recurso principal muda
        if (resource.type && resource.type in renderComponents) {
            setActiveComponent(resource.type as GymIntegrationManagementType);
        }

        if (resource.type && collapsibleMenus.includes(resource.type)) {
            setIsMenuCollapsed(true);
        }
    };

    const handleSubResourceClick = (subResource: ResourceBoxProps) => {
        setSelectedSubResource(subResource);
        if (subResource.type && subResource.type in renderComponents) {
            setActiveComponent(subResource.type as GymIntegrationManagementType);
        }
    };

    const toggleMenu = () => {
        setIsMenuCollapsed((prev) => !prev);
    };

    const ActiveComponent = renderComponents[activeComponent];

    return (
        <Box className='flex flex-row bg-white rounded-3xl shadow-md w-full'>
            {/* Menu Principal */}
            <Box className={`flex flex-col min-h-full py-5 bg-[#fbfbfb] rounded-l-3xl border-r-[1px] border-[##efefef] transition-width duration-300 ${isMenuCollapsed ? 'min-w-[4rem]' : 'min-w-[16.1rem]'}`}>
                <Button
                    endIcon={!isMenuCollapsed ? <CgMenuRightAlt /> : null}  // Mostra o ícone apenas quando não está encolhido
                    className='font-poppins !text-[1rem] !rounded-none !px-5'
                    style={{ textTransform: 'none', color: '#08041b', justifyContent: isMenuCollapsed ? 'center' : 'space-between', height: '50px' }}
                    sx={{
                        fontWeight: 'light',
                        transition: 'transform 0.3s, background-color 0.3s, color 0.3s,',
                        '&:hover': {
                            background: '#f3f3f3'
                        },
                    }}
                    onClick={toggleMenu}
                >
                    {isMenuCollapsed ? <CgMenuRightAlt className='w-[20px] h-[20px]' /> : 'Navegue abaixo'}
                </Button>
                {resources.map((resource, index) => (
                    <Tooltip title={isMenuCollapsed ? resource.name : ''} placement="right" arrow key={index}>
                        <Box>
                            <ResourceBox
                                icon={resource.icon}
                                name={isMenuCollapsed ? '' : resource.name}
                                isMenuCollapsed={isMenuCollapsed}
                                description={resource.description}
                                isSelected={selectedResource?.name === resource.name}
                                onClick={() => handleResourceClick(resource)}
                            />
                        </Box>
                    </Tooltip>
                ))}
            </Box>

            {/* Submenu */}
            {selectedResource?.type === 'Access' && (
                <Box className='flex flex-col min-w-[13.5rem] h-full m-5 mr-0'>
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
                                Integrações
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
                                Integrações
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
    );
}

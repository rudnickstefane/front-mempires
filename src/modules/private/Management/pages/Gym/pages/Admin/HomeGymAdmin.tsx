import { Box, Button, Divider, Tooltip, Typography } from "@mui/material";
import { useState } from "react";
import { CgMenuRightAlt } from "react-icons/cg";
import { CiMobile3 } from "react-icons/ci";
import { IoCalendarOutline } from "react-icons/io5";
import { LiaTruckLoadingSolid, LiaUserTieSolid } from "react-icons/lia";
import { MdKeyboardArrowRight } from "react-icons/md";
import { PiCurrencyCircleDollarLight, PiGearSixLight, PiHandWavingThin, PiIdentificationCardThin, PiStorefrontLight, PiUsersThreeLight } from "react-icons/pi";
import { ResourceBoxProps } from "../../types/gym-resource-box.types";
import ClassesGymAdmin from "./ClassesGymAdmin";
import ContentHomeGymAdmin from "./ContentHomeGymAdmin";
import ContributorsGymAdmin from "./ContributorsGymAdmin";
import FrequenciesGymAdmin from "./FrequenciesGymAdmin";
import GroupsGymAdmin from "./GroupsGymAdmin";
import HoursGymAdmin from "./HoursGymAdmin";
import MarketplaceGymAdmin from "./MarketplaceGymAdmin";
import PlansGymAdmin from "./PlansGymAdmin";
import AdvertisementsGymAdmin from "./Relationship/AdvertisementsGymAdmin";
import ChatsGymAdmin from "./Relationship/ChatsGymAdmin";
import ContactsGymAdmin from "./Relationship/ContactsGymAdmin";
import EventsGymAdmin from "./Relationship/EventsGymAdmin";
import VisitsGymAdmin from "./Relationship/VisitsGymAdmin";
import StudentsGymAdmin from "./StudentsGymAdmin";
import SuppliersGymAdmin from "./SuppliersGymAdmin";
import { HomeGymAdminType } from "./types/AdminGym.types";
import UsersGymAdmin from "./UsersGymAdmin";

const blockedTitles = ['Students', 'Classes', 'Suppliers', 'Contributors', 'Users', 'Groups', 'Visits', 'Contacts', 'Chats', 'Events', 'Advertisements'];
const collapsibleMenus = ['ProfileSettings', 'Relationship'];

const resources: ResourceBoxProps[] = [
    {
        icon: CiMobile3,
        type: 'Application',
        name: 'Aplicativo',
        subName: 'Tipos de Aplicativo',
        description: 'Acessos e <span class="color-primary">Integrações</span>',
    },
    {
        icon: PiIdentificationCardThin,
        type: 'Students',
        name: 'Alunos',
        description: 'Alunos',
    },
    {
        icon: PiUsersThreeLight,
        type: 'Classes',
        name: 'Turmas',
        description: '#',
    },
    {
        icon: IoCalendarOutline,
        type: 'Frequencies',
        name: 'Frequências',
        description: 'Frequências',
    },
    {
        icon: PiHandWavingThin,
        type: 'Relationship',
        name: 'Relacionamento',
        subName: 'Acompanhamento',
        description: '#',
    },
    {
        icon: PiCurrencyCircleDollarLight,
        type: 'Plans',
        name: 'Planos',
        description: 'Planos',
    },
    {
        icon: PiStorefrontLight,
        type: 'Marketplace',
        name: 'Marketplace',
        description: 'Marketplace',
    },
    {
        icon: LiaTruckLoadingSolid,
        type: 'Suppliers',
        name: 'Fornecedores',
        description: '#',
    },
    {
        icon: LiaUserTieSolid,
        type: 'Contributors',
        name: 'Colaboradores',
        description: '#',
    },
    {
        icon: PiGearSixLight,
        type: 'ProfileSettings',
        subName: 'Perfil e Configurações',
        name: 'Perfil e Configurações',
        description: 'Perfil e <span class="color-primary">Configurações</span>',
    }
];

const subResources: ResourceBoxProps[] = [
    {
        icon: MdKeyboardArrowRight,
        type: 'Users',
        menu: 'ProfileSettings',
        name: 'Usuários',
        description: 'Usuários',
    },
    {
        icon: MdKeyboardArrowRight,
        type: 'Groups',
        menu: 'ProfileSettings',
        name: 'Grupos de Acesso',
        description: 'Grupos de <span class="color-primary">Acesso</span>',
    },
    {
        icon: MdKeyboardArrowRight,
        type: 'Hours',
        menu: 'ProfileSettings',
        name: 'Funcionamento',
        description: 'Horário de <span class="color-primary">Funcionamento</span>',
    },
    {
        icon: MdKeyboardArrowRight,
        type: 'Visits',
        menu: 'Relationship',
        name: 'Visitas',
        description: 'Visitas',
    },
    {
        icon: MdKeyboardArrowRight,
        menu: 'Relationship',
        type: 'Contacts',
        name: 'Contatos',
        description: 'Contatos',
    },
    {
        icon: MdKeyboardArrowRight,
        menu: 'Relationship',
        type: 'Chats',
        name: 'Conversas',
        description: 'Conversas',
    },
    {
        icon: MdKeyboardArrowRight,
        menu: 'Relationship',
        type: 'Events',
        name: 'Eventos',
        description: 'Eventos',
    },
    {
        icon: MdKeyboardArrowRight,
        menu: 'Relationship',
        type: 'Advertisements',
        name: 'Publicidades',
        description: 'Publicidades',
    }
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
            textAlign: 'left',
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

const renderComponents: { [key in HomeGymAdminType]: React.ComponentType } = {
    Home: ContentHomeGymAdmin,
    Students: StudentsGymAdmin,
    Classes: ClassesGymAdmin,
    Visits: VisitsGymAdmin,
    Contacts: ContactsGymAdmin,
    Chats: ChatsGymAdmin,
    Events: EventsGymAdmin,
    Advertisements: AdvertisementsGymAdmin,
    Frequencies: FrequenciesGymAdmin,
    Plans: PlansGymAdmin,
    Marketplace: MarketplaceGymAdmin,
    Suppliers: SuppliersGymAdmin,
    Contributors: ContributorsGymAdmin,
    Users: UsersGymAdmin,
    Groups: GroupsGymAdmin,
    Hours: HoursGymAdmin
};

export default function HomeGymAdmin() {
    const [selectedResource, setSelectedResource] = useState<ResourceBoxProps | null>(null); // Guarda o recurso principal selecionado
    const [selectedSubResource, setSelectedSubResource] = useState<ResourceBoxProps | null>(null); // Guarda o sub-recurso selecionado
    const [activeComponent, setActiveComponent] = useState<HomeGymAdminType>('Home'); // Controle para o componente ativo
    const [isMenuCollapsed, setIsMenuCollapsed] = useState(false);

    const handleResourceClick = (resource: ResourceBoxProps) => {
        setSelectedResource(resource);
        setSelectedSubResource(null); // Reseta o sub-recurso quando o recurso principal muda
        if (resource.type && resource.type in renderComponents) {
            setActiveComponent(resource.type as HomeGymAdminType);
        }

        if (resource.type && collapsibleMenus.includes(resource.type)) {
            setIsMenuCollapsed(true);
        }
    };

    const handleSubResourceClick = (subResource: ResourceBoxProps) => {
        setSelectedSubResource(subResource);
        if (subResource.type && subResource.type in renderComponents) {
            setActiveComponent(subResource.type as HomeGymAdminType);
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

            {selectedResource && (
                // Verifica se há sub-recursos para o recurso selecionado
                subResources.some(subResource => subResource.menu === selectedResource.type) && (
                    <Box className='flex flex-col min-w-[13.5rem] h-full m-5 mr-0'>
                        <Typography className='flex flex-row items-center !text-[.75rem] !m-3 !mb-0 uppercase'>
                            {selectedResource.subName}
                        </Typography>
                        {subResources
                            .filter(subResource => subResource.menu === selectedResource.type)
                            .map((subResource, index) => (
                                <SubResourceBox
                                    key={index}
                                    icon={subResource.icon}
                                    name={subResource.name}
                                    type={subResource.type}
                                    description={subResource.description}
                                    isSelected={selectedSubResource?.name === subResource.name}
                                    onClick={() => handleSubResourceClick(subResource)}
                                />
                            ))}
                    </Box>
                )
            )}

            {/* Breadcrumb */}
            <Box className='flex flex-col m-5 w-full'>
                <Box className='w-full'>
                    {selectedSubResource ? (
                        // Renderiza o conteúdo com HTML usando dangerouslySetInnerHTML
                        selectedSubResource && selectedSubResource.type && !blockedTitles.includes(selectedSubResource.type) && <>
                            <Typography className='flex flex-row items-center !text-[2.25rem] text-[#212121]'>
                                <Box dangerouslySetInnerHTML={{ __html: selectedSubResource.description }} />
                            </Typography>
                            <Typography className='flex flex-row items-center !text-[.85rem] !mt-4'>
                                Administrativo
                                {selectedResource && <><MdKeyboardArrowRight /> {selectedResource.name}</>}
                                {selectedSubResource && <><MdKeyboardArrowRight /> {selectedSubResource.name}</>}
                            </Typography>
                            <Divider className='!my-5 w-full bg-[#e2e2e4]' />
                        </>
                    ) : (
                        // Caso contrário, exibe o nome do recurso principal
                        selectedResource && selectedResource.type && !blockedTitles.includes(selectedResource.type) && <>
                            <Typography className='flex flex-row items-center !text-[2.25rem] text-[#212121]'>
                                <Box dangerouslySetInnerHTML={{ __html: selectedResource.description }} />
                            </Typography>
                            <Typography className='flex flex-row items-center !text-[.85rem] !mt-4'>
                                Administrativo
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

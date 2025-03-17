import { Box, Button, Collapse, Divider, Skeleton, Tooltip, Typography } from "@mui/material";
import { BiSupport } from "react-icons/bi";
import { CgMenuRightAlt } from "react-icons/cg";
import { HiMiniChevronRight } from "react-icons/hi2";
import { PiStorefront, PiUserCircleLight } from "react-icons/pi";
import { RiExchange2Line } from "react-icons/ri";
import { RxExit } from "react-icons/rx";
import notification from '../../../../../assets/svg/notification.svg';
import logo from '../../../../../modules/assets/images/icon.png';
import MenuBox from "../../components/Menus/MenuBox";
import SubMenuBox from "../../components/Menus/SubMenuBox";
import { useGymManagement } from "./hooks";
import { GymManagementType } from "./types/gym-management.types";

export default function GymManagement() {

    const {
        isMenuLoading,
        isProfileLoading,
        isCompanyLoading,
        responseMenus,
        responseProfileDetails,
        responseCompanyDetails,
        isMenuCollapsed,
        expandedMenus,
        setExpandedMenus,
        selectedResource,
        toggleMenu,
        toggleSubMenu,
        openComponent,
        setActiveComponent,
        setSelectedResource,
        finishSession,
        renderComponentContent,
    } = useGymManagement();

    return (
        <>
        <style>
            {`
                body {
                    overflow: hidden;
                }
            `}
        </style>
        <Box className={`flex flex-row bg-white h-screen`}>
            {/* Menu Lateral */}
            <Box className='flex flex-col justify-between'>
                <Box className={`flex flex-col items-center transition-all duration-300 ease-in-out ${isMenuCollapsed ? 'max-w-[7.7rem]' : 'max-w-[16rem]'}`}>
                    <Box className='w-full p-5 pb-0 pt-0'>
                        {/* Profile */}
                        <Tooltip title={'Meus Dados'} placement="right" arrow>
                            <Button
                                className="flex flex-row !rounded-3xl !bg-[#f3f3f3] !justify-start !mt-5 w-full items-center"
                                endIcon={<HiMiniChevronRight className={`${isMenuCollapsed ? '!-ml-4' : ''}`}/>}
                                style={{ color: '#08041b' }}
                                sx={{
                                    textTransform: 'none',
                                }}
                                onClick={() => {
                                    setSelectedResource(null);
                                    setExpandedMenus([]);
                                    setActiveComponent('Profile')}
                                }
                            >
                                {isProfileLoading ? (
                                    <>
                                        <PiUserCircleLight className="text-[2.5rem] mr-3" />
                                        <Box
                                            className={`flex flex-col text-left overflow-hidden transition-all duration-300 ${
                                                isMenuCollapsed ? 'opacity-0 max-w-0' : 'opacity-100 max-w-[7rem] min-w-[7rem]'
                                            }`}
                                        >
                                            <Typography className="whitespace-nowrap overflow-hidden text-ellipsis">
                                                <Skeleton variant="text" animation="wave" className="w-full" />
                                            </Typography>
                                            <Typography className="!font-light !text-[.9rem] whitespace-nowrap overflow-hidden text-ellipsis">
                                                <Skeleton variant="text" animation="wave" className="w-full" />
                                            </Typography>
                                        </Box>
                                    </>
                                ) : (
                                    <>
                                        {responseProfileDetails?.findProfileDetails.photo ? (
                                            <img
                                                src={responseProfileDetails?.findProfileDetails.photo}
                                                alt="Foto do usuário"
                                                className="w-10 h-10 rounded-full mr-3"
                                            />
                                        ) : (
                                            <PiUserCircleLight className="text-[2.5rem] mr-3" />
                                        )}

                                        <Box
                                            className={`flex flex-col text-left overflow-hidden transition-all duration-300 ${
                                                isMenuCollapsed ? 'opacity-0 max-w-0' : 'opacity-100 max-w-[7rem] min-w-[7rem]'
                                            }`}
                                        >
                                            <Typography className="whitespace-nowrap overflow-hidden text-ellipsis">
                                                {responseProfileDetails?.findProfileDetails.name.split(' ')[0]}
                                            </Typography>
                                            <Typography className="!font-light !text-[.9rem] whitespace-nowrap overflow-hidden text-ellipsis">
                                                {responseProfileDetails?.findProfileDetails.contact[0].email}
                                            </Typography>
                                        </Box>
                                    </>
                                )}
                            </Button>
                        </Tooltip>
                        <Tooltip title={'Informações da Academia'} placement="right" arrow>
                            <Button
                                className="flex flex-row !rounded-3xl !bg-transparent !justify-start !mt-5 w-full items-center"
                                endIcon={<RiExchange2Line className={`${isMenuCollapsed ? '!ml-[1rem]' : ''}`}/>}
                                style={{ color: '#08041b' }}
                                sx={{
                                    textTransform: 'none',
                                    '&:hover': {
                                        color: '#ff0336 !important'
                                    },
                                }}
                                onClick={() => {
                                    setSelectedResource(null);
                                    setExpandedMenus([]);
                                    setActiveComponent('Company')}
                                }
                            >
                                {isCompanyLoading ? (
                                    <>
                                        <Box
                                            className={`flex flex-col text-left overflow-hidden transition-all duration-300 ${
                                                isMenuCollapsed ? 'opacity-0 max-w-0' : 'opacity-100 max-w-[10rem] min-w-[10rem] !px-5'
                                            }`}
                                        >
                                            <Typography className="whitespace-nowrap overflow-hidden text-ellipsis">
                                                <Skeleton variant="text" animation="wave" className="w-full" />
                                            </Typography>
                                            <Typography className="!font-light !text-[.9rem] whitespace-nowrap overflow-hidden text-ellipsis">
                                                <Skeleton variant="text" animation="wave" className="w-full" />
                                            </Typography>
                                        </Box>
                                    </>
                                ) : (
                                    <>
                                        <Box
                                            className={`flex flex-col text-left overflow-hidden transition-all duration-300 ${
                                                isMenuCollapsed ? 'opacity-0 max-w-0' : 'opacity-100 max-w-[10rem] min-w-[10rem] !px-5'
                                            }`}
                                        >
                                            <Typography className="whitespace-nowrap overflow-hidden text-ellipsis">
                                                {responseCompanyDetails?.findCompanyDetails.fantasyName}
                                            </Typography>
                                            <Typography className="!font-light !text-[.9rem] whitespace-nowrap overflow-hidden text-ellipsis">
                                                {responseCompanyDetails?.findCompanyDetails.ownershipType === 'MAIN' ? 'Matriz' : 'Filial'}
                                            </Typography>
                                        </Box>
                                    </>
                                )}
                            </Button>
                        </Tooltip>
                        <Divider className='!my-5' />
                    </Box>
                    <Button
                        endIcon={!isMenuCollapsed ? <CgMenuRightAlt /> : null}
                        className={`font-poppins !text-[1rem] !rounded-xl !px-5 !mx-5 ${isMenuCollapsed ? 'w-[5.2rem]' : 'w-[13.5rem]'}`}
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
                    <Box className="max-h-[calc(100vh-20.23rem)] overflow-x-hidden w-full pb-5">
                        {isMenuLoading ? (
                            <>
                                {Array.from({ length: Math.min(3) }).map((_, index) => (
                                    <Box key={index} className="flex flex-col">
                                        <Box className="flex flex-row px-1 m-7 mt-4 mb-2">
                                            <Skeleton 
                                                variant="circular" 
                                                animation="wave" 
                                                className={isMenuCollapsed ? "w-[2rem] !h-[2rem] ml-[.9rem]" : "w-[2.5rem] !h-[2rem]"} 
                                            />
                                            {isMenuCollapsed ? '' : <Skeleton variant="text" animation="wave" className="w-full ml-2" />}
                                        </Box>
                                    </Box>
                                ))}
                            </>
                        ) : (
                            <>
                                {responseMenus?.findMenus?.map((menu) => {
                                    const hasSubMenu = menu?.SubMenus?.length > 0;
                                    const isExpanded = expandedMenus.includes(menu.menuCode);

                                    return (
                                        <Box key={menu.menuCode} className="flex flex-col">
                                            <Tooltip title={isMenuCollapsed ? menu.name : ''} placement="right" arrow
                                                PopperProps={{
                                                    modifiers: [
                                                        {
                                                            name: 'offset',
                                                            options: {
                                                                offset: [0, -15],
                                                            },
                                                        },
                                                    ],
                                                }}>
                                                <Box>
                                                    <MenuBox
                                                        key={menu.menuCode}
                                                        icon={menu.icon}
                                                        name={isMenuCollapsed ? "" : menu.name}
                                                        isMenuCollapsed={isMenuCollapsed}
                                                        description={menu.description}
                                                        isSelected={
                                                            selectedResource?.name === menu.name ||
                                                            menu?.SubMenus?.some((sub) => selectedResource?.name === sub.name)
                                                        }
                                                        onClick={() => {
                                                            setSelectedResource({
                                                                name: menu.name,
                                                                icon: menu.icon,
                                                                onClick: () => openComponent(menu.path as GymManagementType),
                                                            });
                                                            if (hasSubMenu) {
                                                                toggleSubMenu(menu.menuCode);
                                                            } else {
                                                                setExpandedMenus([]);
                                                                openComponent(menu.path as GymManagementType);
                                                            }
                                                        }}
                                                        hasSubMenu={hasSubMenu}
                                                        isExpanded={isExpanded}
                                                    />
                                                </Box>
                                            </Tooltip>
                                            <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                                                {menu?.SubMenus?.map((sub) => (
                                                    <Tooltip
                                                        key={sub.subMenuCode}
                                                        title={isMenuCollapsed ? sub.name : ''}
                                                        placement="right"
                                                        arrow
                                                        PopperProps={{
                                                            modifiers: [
                                                                {
                                                                    name: 'offset',
                                                                    options: {
                                                                        offset: [0, -15],
                                                                    },
                                                                },
                                                            ],
                                                        }}
                                                    >
                                                        <Box>
                                                            <SubMenuBox
                                                                key={sub.subMenuCode}
                                                                icon={sub.icon}
                                                                name={sub.name}
                                                                description={menu.description}
                                                                isMenuCollapsed={isMenuCollapsed}
                                                                isSelected={selectedResource?.name === sub.name}
                                                                onClick={() => {
                                                                    setSelectedResource({
                                                                        name: sub.name,
                                                                        icon: sub.icon,
                                                                        onClick: () => openComponent(menu.path as GymManagementType),
                                                                    });
                                                                    setActiveComponent(sub.path as GymManagementType);
                                                                }}
                                                            />
                                                        </Box>
                                                    </Tooltip>
                                                ))}
                                            </Collapse>
                                        </Box>
                                    );
                                })}
                            </>
                        )}
                    </Box>
                </Box>
                <Box className='mx-5'>
                    <Divider className='!mx-5' />
                    <Button
                        startIcon={<RxExit className='text-[2.3rem]' />}
                        className='!rounded-3xl w-full !font-normal !color-primary !my-5'
                        style={{ textTransform: 'none', fontFamily: 'Poppins' }}
                        sx={{
                            background: '#ff0336',
                            color: 'white',
                            transition: 'transform 0.3s, background-color 0.3s, color 0.3s,',
                            '&:hover': {
                                background: '#ff0000',
                                color: 'white',
                            },
                        }}
                        onClick={() => finishSession()}
                    >
                        Sair
                    </Button>
                </Box>
            </Box>
            <Box className="flex flex-col w-full">
                <Box className="flex flex-row w-full min-h-[6rem] bg-white justify-end items-center px-4">
                    <Tooltip title={'Marketplace'} placement="bottom" arrow>
                        <Button
                            className='flex flex-row items-center font-poppins !min-w-12 !mx-2 !rounded-full !min-h-12 !bg-[#f3f3f3]'
                            style={{ color: '#08041b' }}>
                            <PiStorefront className='text-[1.5rem]' />
                        </Button>
                    </Tooltip>
                    <Tooltip title={'Notificações'} placement="bottom" arrow>
                        <Button
                            className='flex flex-row items-center font-poppins !min-w-12 !mx-2 !rounded-full !min-h-12 !bg-[#f3f3f3]'
                            style={{ color: '#08041b' }}>
                            <img src={notification} className='w-[1.5rem]' />
                        </Button>
                    </Tooltip>
                    <Tooltip title={'Central de Serviços'} placement="bottom" arrow>
                        <Button
                            className='flex flex-row items-center font-poppins !min-w-12 !mx-2 !rounded-full !min-h-12 !bg-[#f3f3f3]'
                            style={{ color: '#08041b' }}
                            onClick={() => {
                                setSelectedResource(null);
                                setExpandedMenus([]);
                                setActiveComponent('Support')}
                            }
                            >
                            <BiSupport className='text-[1.5rem]' />
                        </Button>
                    </Tooltip>
                    {/* Logo */}
                    <Box className='flex flex-col items-center h-[40px] ml-8 mr-3 -mt-3'>
                        <a href="/gestao">
                            <Box className='flex w-[161px] items-center !-ml-5'>
                                <img src={logo} alt="Logo" className='w-[3.7rem]' />
                                <Box className='ml-3 text-[2rem] color-primary font-intro mt-[.34rem]'>iFlex</Box>
                            </Box>
                        </a>
                    </Box>
                </Box>
                <Box className="rounded-l-3xl pt-0 bg-[#f2f2f280] h-screen border border-[#EAECF0]">
                    {renderComponentContent()}
                </Box>
            </Box>
        </Box>
        </>
    );
}
import {
  Box,
  Button,
  Divider,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Skeleton,
  Tooltip,
  Typography,
} from "@mui/material";
import { PortalMenu } from "@sr/components/menu";
import { Logo } from "@sr/modules/common/ui/Logo";
import { Logout, Notification } from "iconsax-react";
import { BiSupport } from "react-icons/bi";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from "react-icons/md";
import { PiConfettiLight, PiUserCircleLight } from "react-icons/pi";
import { RiExchange2Line } from "react-icons/ri";
import { TbFileInvoice, TbUserCircle } from "react-icons/tb";
import { ManagementProps } from "../../../../common/types/ManagementProps.type";
import { useGymManagement } from "./hooks";
import { RendersGymManagement } from "./types/gym-management.types";

export default function GymManagement({ permissions }: ManagementProps) {
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
    anchorEls,
    handleOpen,
    handleClose,
    responseNotifications,
    formatNotificationTime,
    handleNotificationRead,
    menuExcludedPaths,
    isCompanyDisabled,
  } = useGymManagement({ permissions });

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
        <Box className="flex flex-col justify-between">
          <Box
            className={`flex flex-col items-center transition-all duration-300 ease-in-out ${
              isMenuCollapsed ? "max-w-[7.7rem]" : "max-w-[16rem]"
            }`}
          >
            <Box className="w-full p-5 pb-0 pt-0">
              <Box className="flex flex-row !rounded-3xl !bg-[#f3f3f3] !justify-start !mt-5 w-full items-center">
                {/* Profile */}
                <Tooltip title={"Meus Dados"} placement="bottom" arrow>
                  <Button
                    className={`flex flex-row !rounded-l-3xl !justify-start w-full items-center !pr-0 ${
                      isMenuCollapsed ? "!min-w-[3rem]" : "w-full"
                    }`}
                    style={{ color: "#08041b" }}
                    sx={{
                      textTransform: "none",
                    }}
                    onClick={() => {
                      setSelectedResource(null);
                      setExpandedMenus([]);
                      setActiveComponent("Profile");
                    }}
                  >
                    {isProfileLoading ? (
                      <>
                        <PiUserCircleLight
                          className={`text-[2.5rem] ${
                            isMenuCollapsed ? "mr-0" : "mr-3"
                          }`}
                        />
                        <Box
                          className={`flex flex-col text-left overflow-hidden transition-all duration-300 ${
                            isMenuCollapsed
                              ? "opacity-0 max-w-0"
                              : "opacity-100 max-w-[7rem] min-w-[7rem]"
                          }`}
                        >
                          <Typography className="whitespace-nowrap overflow-hidden text-ellipsis">
                            <Skeleton
                              variant="text"
                              animation="wave"
                              className="w-full"
                            />
                          </Typography>
                          <Typography className="!font-light !text-[.9rem] whitespace-nowrap overflow-hidden text-ellipsis">
                            <Skeleton
                              variant="text"
                              animation="wave"
                              className="w-full"
                            />
                          </Typography>
                        </Box>
                      </>
                    ) : (
                      <>
                        {responseProfileDetails?.findProfileDetails.photo ? (
                          <img
                            src={
                              responseProfileDetails?.findProfileDetails.photo
                            }
                            alt="Foto do usuário"
                            className="w-10 h-10 rounded-full mr-3"
                          />
                        ) : (
                          <PiUserCircleLight
                            className={`text-[2.5rem] ${
                              isMenuCollapsed ? "mr-0" : "mr-3"
                            }`}
                          />
                        )}

                        <Box
                          className={`flex flex-col text-left overflow-hidden transition-all duration-300 ${
                            isMenuCollapsed
                              ? "opacity-0 max-w-0"
                              : "opacity-100 max-w-[7rem] min-w-[7rem]"
                          }`}
                        >
                          <Typography className="whitespace-nowrap overflow-hidden text-ellipsis">
                            {
                              responseProfileDetails?.findProfileDetails.name.split(
                                " "
                              )[0]
                            }
                          </Typography>
                          <Typography className="!font-light !text-[.9rem] whitespace-nowrap overflow-hidden text-ellipsis">
                            {
                              responseProfileDetails?.findProfileDetails
                                .contact[0].email
                            }
                          </Typography>
                        </Box>
                      </>
                    )}
                  </Button>
                </Tooltip>
                <Box>
                  <Tooltip title={"Menu"} placement="right" arrow>
                    <Button
                      className={`flex flex-row !rounded-r-3xl items-center !min-h-[3.5rem] !text-[1.25rem] ${
                        isMenuCollapsed ? "!min-w-[2.1rem]" : "!min-w-[2.7rem]"
                      }`}
                      style={{ color: "#08041b" }}
                      sx={{
                        textTransform: "none",
                      }}
                      onClick={(event) => {
                        handleOpen(event, "menuProfile");
                        setSelectedResource(null);
                        setExpandedMenus([]);
                      }}
                    >
                      {anchorEls["menuProfile"] ? (
                        <MdKeyboardArrowDown
                          className={`${isMenuCollapsed ? "!-ml-1" : ""}`}
                        />
                      ) : (
                        <MdKeyboardArrowRight
                          className={`${isMenuCollapsed ? "!-ml-1" : ""}`}
                        />
                      )}
                    </Button>
                  </Tooltip>
                  <Menu
                    anchorEl={anchorEls["menuProfile"]}
                    open={Boolean(anchorEls["menuProfile"])}
                    onClose={() => handleClose("menuProfile")}
                    slotProps={{
                      paper: {
                        elevation: 0,
                        sx: {
                          borderRadius: ".7rem",
                          padding: "0 .6rem",
                          overflow: "visible",
                          filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                          mt: 2,
                          ml: -0.5,
                          "& .MuiAvatar-root": {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                          },
                          "&::before": {
                            content: '""',
                            display: "block",
                            position: "absolute",
                            top: 0,
                            left: 14,
                            width: 10,
                            height: 10,
                            bgcolor: "background.paper",
                            transform: "translateY(-50%) rotate(45deg)",
                            zIndex: 0,
                          },
                        },
                      },
                    }}
                    transformOrigin={{ horizontal: "left", vertical: "top" }}
                    anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
                  >
                    <MenuItem
                      onClick={() => {
                        handleClose("menuProfile");
                        setActiveComponent("Profile");
                      }}
                      sx={{
                        borderRadius: ".4rem",
                        margin: ".2rem 0",
                        "&:hover": {
                          backgroundColor: "#0000000a !important",
                          color: "#000000de !important",
                        },
                      }}
                    >
                      <ListItemIcon className="!-mr-1.5">
                        <TbUserCircle className="text-[1.5rem]" />
                      </ListItemIcon>
                      <ListItemText primary="Meus Dados" />
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        handleClose("menuProfile");
                        setActiveComponent("Invoices");
                      }}
                      sx={{
                        borderRadius: ".4rem",
                        margin: ".2rem 0",
                        "&:hover": {
                          backgroundColor: "#0000000a !important",
                          color: "#000000de !important",
                        },
                      }}
                    >
                      <ListItemIcon className="!-mr-1.5">
                        <TbFileInvoice className="text-[1.5rem]" />
                      </ListItemIcon>
                      <ListItemText primary="Faturas" />
                    </MenuItem>
                  </Menu>
                </Box>
              </Box>
              <Tooltip
                title={"Informações da Academia"}
                placement="right"
                arrow
              >
                <Button
                  className="flex flex-row !rounded-3xl !bg-transparent !justify-start !mt-5 w-full items-center"
                  endIcon={
                    <RiExchange2Line
                      className={`${isMenuCollapsed ? "!ml-[1rem]" : ""} ${
                        isCompanyDisabled ? "hidden" : ""
                      }`}
                    />
                  }
                  style={{ color: "#08041b" }}
                  sx={{
                    textTransform: "none",
                    "&:hover": {
                      color: "#ff0336 !important",
                    },
                  }}
                  disabled={isCompanyDisabled}
                  onClick={() => {
                    setSelectedResource(null);
                    setExpandedMenus([]);
                    setActiveComponent("Company");
                  }}
                >
                  {isCompanyLoading ? (
                    <>
                      <Box
                        className={`flex flex-col text-left overflow-hidden transition-all duration-300 ${
                          isMenuCollapsed
                            ? "opacity-0 max-w-0"
                            : "opacity-100 max-w-[10rem] min-w-[10rem] !px-5"
                        }`}
                      >
                        <Typography className="whitespace-nowrap overflow-hidden text-ellipsis">
                          <Skeleton
                            variant="text"
                            animation="wave"
                            className="w-full"
                          />
                        </Typography>
                        <Typography className="!font-light !text-[.9rem] whitespace-nowrap overflow-hidden text-ellipsis">
                          <Skeleton
                            variant="text"
                            animation="wave"
                            className="w-full"
                          />
                        </Typography>
                      </Box>
                    </>
                  ) : (
                    <>
                      <Box
                        className={`flex flex-col text-left overflow-hidden transition-all duration-300 ${
                          isMenuCollapsed
                            ? "opacity-0 max-w-0"
                            : "opacity-100 max-w-[10rem] min-w-[10rem] !px-5"
                        }`}
                      >
                        <Typography className="whitespace-nowrap overflow-hidden text-ellipsis">
                          {
                            responseCompanyDetails?.findCompanyDetails
                              .fantasyName
                          }
                        </Typography>
                        <Typography className="!font-light !text-[.9rem] whitespace-nowrap overflow-hidden text-ellipsis">
                          {responseCompanyDetails?.findCompanyDetails
                            .ownershipType === "MAIN"
                            ? "Matriz"
                            : "Filial"}
                        </Typography>
                      </Box>
                    </>
                  )}
                </Button>
              </Tooltip>
              <Divider className="!my-5" />
            </Box>
            <PortalMenu
              isMenuCollapsed={isMenuCollapsed}
              toggleMenu={toggleMenu}
              isMenuLoading={isMenuLoading}
              responseMenus={responseMenus}
              menuExcludedPaths={menuExcludedPaths}
              expandedMenus={expandedMenus}
              toggleSubMenu={toggleSubMenu}
              selectedResource={selectedResource}
              setSelectedResource={setSelectedResource}
              setExpandedMenus={setExpandedMenus}
              openComponent={openComponent}
              setActiveComponent={setActiveComponent}
            />
          </Box>
          <Box className="mx-5">
            <Divider className="!mx-5" />
            <Button
              startIcon={<Logout type="Linear" />}
              className="w-full !my-5 !normal-case font-ubuntu btn-primary !rounded-3xl"
              onClick={() => finishSession()}
              color="primary"
              variant="contained"
              fullWidth
            >
              Sair
            </Button>
          </Box>
        </Box>
        <Box className="flex flex-col w-full">
          <Box className="flex flex-row w-full min-h-[6rem] bg-white justify-end items-center px-4">
            <Box textAlign="center">
              <Tooltip title={"Notificações"} placement="bottom" arrow>
                <Button
                  className="flex flex-row items-center font-poppins !min-w-12 !mx-2 !rounded-full !min-h-12 !bg-[#f3f3f3]"
                  style={{ color: "#08041b" }}
                  onClick={(event) => handleOpen(event, "notification")}
                >
                  <Notification type="linear" />
                  {responseNotifications?.findNotifications?.some(
                    (n) => !n.read
                  ) && (
                    <Box className="w-2 h-2 bg-secondary rounded-xl !font-intro text-white text-[.7rem] flex items-center justify-center absolute top-3 right-[.9rem]"></Box>
                  )}
                </Button>
              </Tooltip>
              <Menu
                anchorEl={anchorEls["notification"]}
                open={Boolean(anchorEls["notification"])}
                onClose={() => handleClose("notification")}
                slotProps={{
                  paper: {
                    elevation: 0,
                    sx: {
                      borderRadius: ".7rem",
                      padding: "0 .6rem",
                      overflow: "visible",
                      filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                      mt: 2,
                      ml: -0.5,
                      "& .MuiAvatar-root": {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      "&::before": {
                        content: '""',
                        display: "block",
                        position: "absolute",
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: "background.paper",
                        transform: "translateY(-50%) rotate(45deg)",
                        zIndex: 0,
                      },
                    },
                  },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                <Box className="w-full p-3 flex flex-row justify-between items-center">
                  <Typography className="!text-[1.2rem]">
                    Notificações
                  </Typography>
                  <Button
                    onClick={() => handleClose("notification")}
                    className="flex flex-row items-center font-poppins !min-w-10 !rounded-full !min-h-10 !-mr-2"
                    sx={{
                      color: "#4b5563",
                      transition:
                        "transform 0.3s, background-color 0.3s, color 0.3s,",
                      "&:hover": {
                        color: "#ff0336",
                      },
                    }}
                  >
                    <IoIosCloseCircleOutline className="text-[1.5rem]" />
                  </Button>
                </Box>
                <Box className="overflow-x-auto max-h-[calc(100vh-250px)] pr-2 pb-2">
                  {responseNotifications?.findNotifications
                    ?.filter((n) => !n.read)
                    .slice(0, 10).length ? (
                    responseNotifications?.findNotifications
                      ?.filter((n) => !n.read) // Filtra apenas as notificações não lidas
                      ?.slice(0, 10) // Limita a 10 notificações
                      ?.map((notification, index) => (
                        <MenuItem
                          key={index}
                          onClick={() => {
                            setSelectedResource(null);
                            setExpandedMenus([]);
                            handleClose("notification");
                            handleNotificationRead(
                              notification.notificationCode
                            );
                            setActiveComponent(
                              notification.path as keyof RendersGymManagement
                            );
                          }}
                          sx={{
                            borderRadius: ".4rem",
                            margin: ".2rem 0",
                            "&:hover": {
                              backgroundColor: "#0000000a !important",
                              color: "#000000de !important",
                            },
                          }}
                        >
                          <Box className="flex flex-row py-2">
                            <Box className="w-2 h-2 bg-secondary rounded-full mr-4 mt-[.5rem]" />
                            <Box className="flex flex-col w-[340px]">
                              <ListItemText primary={notification.title} />
                              <Typography className="whitespace-normal break-words !text-[14px] text-neutral-500">
                                {notification.description}
                              </Typography>
                              <Typography className="whitespace-normal break-words !text-[12px] text-neutral-400 !mt-1">
                                {formatNotificationTime(notification.createdAt)}
                              </Typography>
                            </Box>
                          </Box>
                        </MenuItem>
                      ))
                  ) : (
                    <Box
                      className="flex flex-col w-[396px] py-2 pb-8 items-center justify-center"
                      sx={{
                        borderRadius: ".4rem",
                        margin: ".2rem 0",
                      }}
                    >
                      <PiConfettiLight className="text-[3.5rem] text-neutral-500" />
                      <Typography className="!text-[14px] text-neutral-500 !mt-3">
                        Tudo certo por aqui!
                      </Typography>
                      <Typography className="!text-[14px] text-neutral-500">
                        Nenhuma notificação no momento.
                      </Typography>
                    </Box>
                  )}
                </Box>
                <Divider className="w-full my-5" />
                <Box className="w-full p-3 flex justify-center mt-2">
                  <Button
                    className="w-[13rem]"
                    style={{ textTransform: "none", fontFamily: "Poppins" }}
                    sx={{
                      color: "#4b5563",
                      fontWeight: "normal",
                      padding: 0,
                      transition:
                        "transform 0.3s, background-color 0.3s, color 0.3s,",
                      "&:hover": {
                        background: "white",
                        color: "#ff0336",
                      },
                    }}
                    onClick={() => {
                      setSelectedResource(null);
                      setExpandedMenus([]);
                      handleClose("notification");
                      setActiveComponent("Notifications");
                    }}
                  >
                    Exibir todas as notificações
                  </Button>
                </Box>
              </Menu>
            </Box>
            <Tooltip title={"Central de Serviços"} placement="bottom" arrow>
              <Button
                className="flex flex-row items-center font-poppins !min-w-12 !mx-2 !rounded-full !min-h-12 !bg-[#f3f3f3]"
                style={{ color: "#08041b" }}
                onClick={() => {
                  setSelectedResource(null);
                  setExpandedMenus([]);
                  setActiveComponent("Support");
                }}
              >
                <BiSupport className="text-[1.5rem]" />
              </Button>
            </Tooltip>
            {/* Logo */}
            <Box className="flex flex-col items-center h-[40px] ml-8 mr-3 -mt-3">
              <Logo size="text-4xl" color="text-gray-500" />
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

/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Button, Collapse, Skeleton, Tooltip } from "@mui/material";
import MenuBox from "@sr/modules/private/portal/components/Menus/MenuBox";
import SubMenuBox from "@sr/modules/private/portal/components/Menus/SubMenuBox";
import React, { ElementType } from "react";
import { CgMenuRightAlt } from "react-icons/cg";

interface PortalMenuProps {
  isMenuCollapsed: boolean;
  toggleMenu: () => void;
  isMenuLoading: boolean;
  responseMenus: any;
  menuExcludedPaths: string[];
  expandedMenus: number[];
  toggleSubMenu: (menuCode: number) => void;
  selectedResource: any;
  setSelectedResource: (data: any) => void;
  setExpandedMenus: (menus: number[]) => void;
  openComponent: (path: any) => void;
  setActiveComponent: (path: any) => void;
}

export const PortalMenu: React.FC<PortalMenuProps> = ({
  isMenuCollapsed,
  toggleMenu,
  isMenuLoading,
  responseMenus,
  menuExcludedPaths,
  expandedMenus,
  toggleSubMenu,
  selectedResource,
  setSelectedResource,
  setExpandedMenus,
  openComponent,
  setActiveComponent,
}) => {
  return (
    <>
      {/* BOTÃO TOGGLE */}
      <Button
        endIcon={!isMenuCollapsed ? <CgMenuRightAlt /> : null}
        className={`font-poppins !text-[1rem] !rounded-xl !px-5 !mx-5 ${
          isMenuCollapsed ? "w-[5.2rem]" : "w-[13.5rem]"
        }`}
        style={{
          textTransform: "none",
          color: "#08041b",
          justifyContent: isMenuCollapsed ? "center" : "space-between",
          height: "50px",
        }}
        sx={{
          fontWeight: "light",
          transition: "transform 0.3s, background-color 0.3s, color 0.3s",
          "&:hover": {
            background: "#f3f3f3",
          },
        }}
        onClick={toggleMenu}
      >
        {isMenuCollapsed ? (
          <CgMenuRightAlt className="w-[20px] h-[20px]" />
        ) : (
          "Navegue abaixo"
        )}
      </Button>

      {/* LISTA DE MENUS */}
      <Box className="max-h-[calc(100vh-20.23rem)] overflow-x-hidden w-full pb-5">
        {isMenuLoading ? (
          <>
            {Array.from({ length: 3 }).map((_, index) => (
              <Box key={index} className="flex flex-col">
                <Box className="flex flex-row px-1 m-7 mt-4 mb-2">
                  <Skeleton
                    variant="circular"
                    animation="wave"
                    className={
                      isMenuCollapsed
                        ? "w-[2rem] !h-[2rem] ml-[.9rem]"
                        : "w-[2.5rem] !h-[2rem]"
                    }
                  />
                  {!isMenuCollapsed && (
                    <Skeleton
                      variant="text"
                      animation="wave"
                      className="w-full ml-2"
                    />
                  )}
                </Box>
              </Box>
            ))}
          </>
        ) : (
          <>
            {responseMenus?.findMenus
              ?.filter((menu: any) => !menuExcludedPaths.includes(menu.path))
              .map((menu: any) => {
                const hasSubMenu = menu?.SubMenus?.length > 0;
                const isExpanded = expandedMenus.includes(menu.menuCode);

                return (
                  <Box key={menu.menuCode} className="flex flex-col">
                    <Tooltip
                      title={isMenuCollapsed ? menu.name : ""}
                      placement="right"
                      arrow
                    >
                      <Box>
                        <MenuBox
                          icon={menu.icon as ElementType}
                          name={isMenuCollapsed ? "" : menu.name}
                          isMenuCollapsed={isMenuCollapsed}
                          description={menu.description}
                          isSelected={
                            selectedResource?.name === menu.name ||
                            menu?.SubMenus?.some(
                              (sub: any) => selectedResource?.name === sub.name
                            )
                          }
                          hasSubMenu={hasSubMenu}
                          isExpanded={isExpanded}
                          onClick={() => {
                            setSelectedResource({
                              name: menu.name,
                              icon: menu.icon as ElementType,
                              onClick: () => openComponent(menu.path),
                            });

                            if (hasSubMenu) {
                              toggleSubMenu(menu.menuCode);
                            } else {
                              setExpandedMenus([]);
                              openComponent(menu.path);
                            }
                          }}
                        />
                      </Box>
                    </Tooltip>

                    <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                      {menu?.SubMenus?.map((sub: any) => (
                        <Tooltip
                          key={sub.subMenuCode}
                          title={isMenuCollapsed ? sub.name : ""}
                          placement="right"
                          arrow
                        >
                          <Box>
                            <SubMenuBox
                              icon={sub.icon as ElementType}
                              name={sub.name}
                              description={menu.description}
                              isMenuCollapsed={isMenuCollapsed}
                              isSelected={selectedResource?.name === sub.name}
                              onClick={() => {
                                setSelectedResource({
                                  name: sub.name,
                                  icon: sub.icon as ElementType,
                                  onClick: () => openComponent(menu.path),
                                });
                                setActiveComponent(sub.path);
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
    </>
  );
};

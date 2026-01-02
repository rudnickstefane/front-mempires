/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Button, Collapse, Skeleton, Tooltip } from "@mui/material";
import Menu from "@sr/modules/private/portal/components/menu/menu";
import SubMenu from "@sr/modules/private/portal/components/menu/sub-menu";
import React, { ElementType } from "react";
import { CgMenuRightAlt } from "react-icons/cg";
import { MenuProps } from "../../interfaces";

export const PortalMenu: React.FC<MenuProps> = ({
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
        className={`font-poppins !font-light transition-all !text-[1rem] !rounded-xl !px-5 !mx-5 !mb-1 h-[50px] hover:bg-[#f3f3f3] !text-[#08041b] !normal-case ${
          isMenuCollapsed
            ? "w-[5.2rem] justify-center"
            : "w-[13.5rem] justify-between"
        }`}
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
                        <Menu
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
                            <SubMenu
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

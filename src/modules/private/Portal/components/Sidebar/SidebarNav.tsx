/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Button, Collapse, Skeleton } from "@mui/material";
import { CgMenuRightAlt } from "react-icons/cg";
import { MenuProps } from "../../interfaces";
import { NavItem } from "./NavItem";

export const SidebarNav = ({
  responseMenus,
  sidebarCollapsed,
  toggleMenu,
  isMenuLoading,
  menuExcludedPaths,
  expandedMenus,
  toggleSubMenu,
  selectedResource,
  setSelectedResource,
  setExpandedMenus,
  openComponent,
  setActiveComponent,
}: MenuProps) => {
  const filteredMenus =
    responseMenus?.findMenus?.filter(
      (m: any) => !menuExcludedPaths.includes(m.path)
    ) || [];

  return (
    <Box
      className={`w-full flex flex-col pl-5 ${
        !sidebarCollapsed && "w-64"
      } pr-1`}
    >
      {/* Botão de Toggle do Menu */}
      <Button
        onClick={toggleMenu}
        className={`!font-poppins !font-light transition-all !text-[1rem] !rounded-xl !px-5  !mb-1 h-[50px] hover:bg-[#f3f3f3] !text-[#08041b] !normal-case ${
          sidebarCollapsed
            ? "w-[5.2rem] justify-center"
            : "w-[13.5rem] justify-between"
        }`}
        endIcon={!sidebarCollapsed && <CgMenuRightAlt size={20} />}
      >
        {sidebarCollapsed ? <CgMenuRightAlt size={22} /> : "Navegue abaixo"}
      </Button>

      {/* Lista de Navegação */}
      <Box
        className={`overflow-y-auto overflow-x-hidden max-h-[calc(100vh-24.5rem)]
          ${sidebarCollapsed ? "w-[6.2em]" : ""}
          `}
      >
        {isMenuLoading ? (
          <MenuSkeletons isCollapsed={sidebarCollapsed} />
        ) : (
          filteredMenus.map((menu: any) => {
            const hasSubMenu = menu.SubMenus?.length > 0;
            const isExpanded = expandedMenus.includes(menu.menuCode);
            const isSelected =
              selectedResource?.name === menu.name ||
              menu.SubMenus?.some(
                (s: any) => s.name === selectedResource?.name
              );

            return (
              <Box key={menu.menuCode} className="mb-1">
                <NavItem
                  name={menu.name}
                  icon={menu.icon}
                  isCollapsed={sidebarCollapsed}
                  isSelected={isSelected}
                  hasSubMenu={hasSubMenu}
                  isExpanded={isExpanded}
                  onClick={() => {
                    if (hasSubMenu) {
                      toggleSubMenu(menu.menuCode);
                    } else {
                      setExpandedMenus([]);
                      openComponent(menu.path);
                    }

                    setSelectedResource({ name: menu.name });
                  }}
                />

                {hasSubMenu && (
                  <Collapse in={isExpanded} timeout="auto">
                    <Box
                      className={`flex flex-col transition-all duration-300 ease-in-out mt-1 ${
                        sidebarCollapsed
                          ? "w-[5.2rem] border-l-transparent border-b border-b-gray-300 pb-2 mb-1"
                          : "ml-4 pl-2 border-l border-l-gray-300 border-b-transparent border-b-0 pb-0 mb-1"
                      }`}
                      style={{
                        transitionProperty:
                          "margin, padding, border-color, max-width",
                      }}
                    >
                      {menu.SubMenus.map((sub: any) => (
                        <NavItem
                          key={sub.subMenuCode}
                          variant="sub"
                          name={sub.name}
                          icon={sub.icon}
                          isCollapsed={sidebarCollapsed}
                          isSelected={selectedResource?.name === sub.name}
                          onClick={() => {
                            setActiveComponent(sub.path);
                            setSelectedResource({ name: sub.name });
                          }}
                        />
                      ))}
                    </Box>
                  </Collapse>
                )}
              </Box>
            );
          })
        )}
      </Box>
    </Box>
  );
};

const MenuSkeletons = ({ isCollapsed }: { isCollapsed: boolean }) => (
  <Box className="flex flex-col gap-6 mt-3">
    {[1, 2, 3, 4].map((i) => (
      <Box
        key={i}
        className={`flex items-center gap-3 ${isCollapsed ? "px-7" : "px-4"}`}
      >
        <Skeleton variant="circular" width={32} height={32} />
        {!isCollapsed && <Skeleton variant="text" width="70%" height={30} />}
      </Box>
    ))}
  </Box>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Button, Collapse, Skeleton } from "@mui/material";
import { CgMenuRightAlt } from "react-icons/cg";
import { MenuProps } from "../../interfaces";
import { NavItem } from "./NavItem";

export const SidebarNav = ({
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
}: MenuProps) => {
  const filteredMenus =
    responseMenus?.findMenus?.filter(
      (m: any) => !menuExcludedPaths.includes(m.path)
    ) || [];

  return (
    <Box className="w-full flex flex-col">
      {/* Botão de Toggle do Menu */}
      <Button
        onClick={toggleMenu}
        className={`font-poppins !font-light transition-all !text-[1rem] !rounded-xl !px-5  !mb-1 h-[50px] hover:bg-[#f3f3f3] !text-[#08041b] !normal-case ${
          isMenuCollapsed
            ? "w-[5.2rem] justify-center"
            : "w-[13.5rem] justify-between"
        }`}
        endIcon={!isMenuCollapsed && <CgMenuRightAlt size={20} />}
      >
        {isMenuCollapsed ? <CgMenuRightAlt size={22} /> : "Navegue abaixo"}
      </Button>

      {/* Lista de Navegação */}
      <Box className="overflow-y-auto max-h-[calc(100vh-25rem)] pr-1">
        {isMenuLoading ? (
          <MenuSkeletons isCollapsed={isMenuCollapsed} />
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
                  isCollapsed={isMenuCollapsed}
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
                  <Collapse in={isExpanded && !isMenuCollapsed} timeout="auto">
                    <Box className="flex flex-col ml-4 mt-1 border-l border-gray-100 pl-2">
                      {menu.SubMenus.map((sub: any) => (
                        <NavItem
                          key={sub.subMenuCode}
                          variant="sub"
                          name={sub.name}
                          icon={sub.icon}
                          isCollapsed={isMenuCollapsed}
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
    {[1, 2, 3].map((i) => (
      <Box key={i} className="flex items-center gap-3 px-4">
        <Skeleton variant="circular" width={32} height={24} />
        {!isCollapsed && <Skeleton variant="text" width="100%" height={30} />}
      </Box>
    ))}
  </Box>
);

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Box, Button, Divider, MenuItem, Tooltip, Typography } from '@mui/material';
import SignIn from '@sr/modules/public/signin';
import { motion } from 'framer-motion';
import { useRef, useState } from 'react';
import { IoIosArrowForward } from 'react-icons/io';
import { IoEnter } from 'react-icons/io5';
import { MdOutlineWbSunny } from 'react-icons/md';
import { TbDeviceDesktopCog, TbHours24, TbMoonStars } from 'react-icons/tb';
import Announcement from '../sliders/announcement';
import { useMenuLogic } from './hooks';
import { DropdownMenu, SubMenu } from './styles/styles.d';

export function Menu() {
  const {
    scrolled,
    menus,
    menuVariants,
    handleMouseEnter,
    handleMouseLeave,
    openMenu,
    animatingMenu,
    handleDropdownMouseEnter,
    handleDropdownMouseLeave,
    handleSubMenuMouseEnter,
    handleSubMenuMouseLeave,
    openSubMenu,
    shouldPositionAbove,
    themeMode,
    changeTheme,
    setOpenLoginModal,
    openLoginModal,
  } = useMenuLogic();

  const slides: { id: number; imageUrl: string; link: string; }[] = [
    // { id: 1, imageUrl: "", link: "#" },
    // { id: 2, imageUrl: "", link: "#" },
    // { id: 3, imageUrl: "", link: "#" },
  ];

  // 🔹 Estados específicos para o menu de temas
  const [themeMenuOpen, setThemeMenuOpen] = useState(false);
  const [themeMenuAnimating, setThemeMenuAnimating] = useState(false);
  const themeMenuTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const hoveringThemeMenuRef = useRef(false);

  // 🔹 Funções para controlar o menu de temas
  const handleThemeMenuEnter = () => {
    if (themeMenuTimeoutRef.current) clearTimeout(themeMenuTimeoutRef.current);
    hoveringThemeMenuRef.current = true;
    setThemeMenuAnimating(true);
    setThemeMenuOpen(true);
  };

  const handleThemeMenuLeave = () => {
    hoveringThemeMenuRef.current = false;
    themeMenuTimeoutRef.current = setTimeout(() => {
      if (!hoveringThemeMenuRef.current) {
        setThemeMenuOpen(false);
        themeMenuTimeoutRef.current = setTimeout(() => setThemeMenuAnimating(false), 300);
      }
    }, 300); // 🔹 Aumentei para 300ms para dar tempo do usuário mover o mouse
  };

  const handleThemeDropdownEnter = () => {
    if (themeMenuTimeoutRef.current) clearTimeout(themeMenuTimeoutRef.current);
    hoveringThemeMenuRef.current = true;
  };

  const handleThemeDropdownLeave = () => {
    hoveringThemeMenuRef.current = false;
    themeMenuTimeoutRef.current = setTimeout(() => {
      if (!hoveringThemeMenuRef.current) {
        setThemeMenuOpen(false);
        themeMenuTimeoutRef.current = setTimeout(() => setThemeMenuAnimating(false), 300);
      }
    }, 300);
  };

  return (
    <Box className="relative z-10 h-24">
      <Box
        className={`fixed w-full h-24 flex items-center justify-center px-5 transition-all duration-300 shadow-md ${
          scrolled ? 'bg-primary' : 'bg-transparent'
        }`}
      >
        <Box className="flex gap-4 items-center">
          <Box className="flex gap-4 items-center">
            {menus.map((menu, index) => (
              <motion.div
                key={menu.key}
                custom={index}
                variants={menuVariants}
                initial="hidden"
                animate="visible"
                onMouseEnter={() => handleMouseEnter(menu.key)}
                onMouseLeave={handleMouseLeave}
                className={menu.isMegaMenu ? '' : 'relative'}
              >
                <Button
                  component={menu.link ? 'a' : 'button'}
                  href={menu.link || undefined}
                  className={`!normal-case font-secondary !px-5 !py-[.735rem] !rounded-xl ${
                    openMenu === menu.key ? 'button-tertiary' : 'text-primary'
                  }`}
                  disableElevation
                  endIcon={menu.sections && menu.sections?.length || menu.items && menu.items?.length > 0 ? <KeyboardArrowDownIcon /> : null}
                >
                  {menu.label}
                </Button>
                {animatingMenu === menu.key && (
                  <Box className={`absolute left-0 w-full z-50 ${menu.isMegaMenu ? 'px-5 flex justify-center' : ''}`}>
                    <DropdownMenu
                      isOpen={openMenu === menu.key}
                      onMouseEnter={handleDropdownMouseEnter}
                      onMouseLeave={handleDropdownMouseLeave}
                      className={`dropdown-menu shadow-md bg-primary -translate-x-2/4 p-5 rounded-xl min-w-[300px] flex justify-between overflow-x-auto z-10 mt-2 ${
                        menu.isMegaMenu ? 'w-auto' : 'w-full standard-menu'
                      }`}
                    >
                      {menu.isMegaMenu ? (
                        <Box className="flex w-full">
                          {menu.sections?.map((section) => (
                            <>
                              <Box key={section.title} className="flex-1 min-w-[300px]">
                                <Typography className="!text-[1.3rem] !font-semibold flex flex-row">
                                  {section.title}
                                  {section.subtitle && <Box className="color-primary ml-1.5">{section.subtitle}</Box>}
                                </Typography>
                                {section.description && (
                                  <Typography className="flex flex-row">{section.description}</Typography>
                                )}
                                <Divider className="!my-3" />
                                {section.items.map((item) => {
                                  const subMenuKey = `${section.title}_${item.name}`;
                                  return (
                                    <Box
                                      key={item.name}
                                      className="relative"
                                      onMouseEnter={(e) =>
                                        item.subItems?.length
                                          ? handleSubMenuMouseEnter(section.title, item.name, e.currentTarget)
                                          : null
                                      }
                                      onMouseLeave={handleSubMenuMouseLeave}
                                    >
                                      <MenuItem
                                        component={item.link ? 'a' : 'div'}
                                        href={item.link}
                                        {...(item.target && { target: '_blank', rel: 'noopener noreferrer' })}
                                        className={`!py-4 flex flex-row !justify-between !rounded-xl ${
                                          openSubMenu === subMenuKey ? 'button-secondary' : ''
                                        }`}
                                      >
                                        {item.name}
                                        {item.subItems?.length && openSubMenu === subMenuKey ? (
                                          <IoIosArrowForward className="text-[1.4rem] ml-5" />
                                        ) : null}
                                      </MenuItem>
                                      {item.subItems?.length ? (
                                        <SubMenu
                                          isOpen={openSubMenu === subMenuKey}
                                          className="p-[1.25rem] border border-[#515253] bg-primary min-w-[300px] shadow-md rounded-xl z-10 absolute"
                                          positionAbove={shouldPositionAbove(subMenuKey)}
                                        >
                                          {item.subItems.map((subItem, idx) => (
                                            <MenuItem
                                              key={subItem.name || idx}
                                              component="a"
                                              href={subItem.link!}
                                              {...(subItem.target && { target: '_blank', rel: 'noopener noreferrer' })}
                                              className="!py-2 !rounded-xl"
                                            >
                                              {subItem.name}
                                            </MenuItem>
                                          ))}
                                        </SubMenu>
                                      ) : null}
                                    </Box>
                                  );
                                })}
                              </Box>
                              <Divider className="!mx-5 !border-transparent" orientation="vertical" />
                            </>
                          ))}
                          {menu.sponsor && (
                            <Box className="w-1/4 min-w-[300px] bg-[#EEF2F6] rounded-xl flex items-center justify-center">
                              <Announcement slides={slides} className='rounded-xl'/>
                            </Box>
                          )}
                        </Box>
                      ) : (
                        <>
                          <Typography className="!text-[1.3rem] !font-semibold flex flex-row">
                            {menu.title}
                            {menu.subtitle && <Box className="color-primary ml-1.5">{menu.subtitle}</Box>}
                          </Typography>
                          <Divider className="!my-3" />
                          {menu.items?.map((item) => (
                            <MenuItem
                              key={item.name}
                              component="a"
                              href={item.link!}
                              {...(item.target && { target: '_blank', rel: 'noopener noreferrer' })}
                              className="!py-4 flex flex-row !justify-between !rounded-xl"
                            >
                              {item.name}
                            </MenuItem>
                          ))}
                        </>
                      )}
                    </DropdownMenu>
                  </Box>
                )}
              </motion.div>
            ))}
            <Box className="border-x-[1px] divider-base px-2">
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 1 }}
              >
                <Button 
                  className="!text-[#646464] !min-w-5 !mx-2 w-9 h-9 !rounded-full relative !normal-case"
                  onMouseEnter={handleThemeMenuEnter}
                  onMouseLeave={handleThemeMenuLeave}
                >
                  {themeMode === 'default' ? <TbHours24 className="!text-[1.5rem]" /> : 
                  themeMode === 'system' ? <TbDeviceDesktopCog className="!text-[1.5rem]" /> :
                  themeMode === 'light' ? <MdOutlineWbSunny className="!text-[1.5rem]" /> :
                  <TbMoonStars className="!text-[1.5rem]" />}
                  
                  {themeMenuAnimating && (
                    <Box 
                      className="absolute top-[3.1rem] left-0 bg-primary text-sm rounded-lg shadow-md z-50 min-w-[260px] p-5"
                      onMouseEnter={handleThemeDropdownEnter}
                      onMouseLeave={handleThemeDropdownLeave}
                      style={{ 
                        display: themeMenuOpen ? 'block' : 'none',
                        animation: themeMenuOpen ? 'fadeIn 0.2s ease-in-out' : 'fadeOut 0.2s ease-in-out'
                      }}
                    >
                      <Typography className="!text-[1.3rem] !font-semibold flex flex-row">Escolher um tema</Typography>
                      <Divider className="!my-3" />
                      <Tooltip title="Muda automaticamente conforme o horário: manhã, tarde, anoitecer e noite" placement="left" arrow>
                        <MenuItem onClick={() => changeTheme('default')} className="!py-4 !rounded-xl">Padrão</MenuItem>
                      </Tooltip>
                      <Tooltip title="Sincroniza com as configurações do seu sistema" placement="left" arrow>
                        <MenuItem onClick={() => changeTheme('system')} className="!py-4 !rounded-xl">Sistema</MenuItem>
                      </Tooltip>
                      <Tooltip title="Interface clara, ideal para ambientes com boa iluminação" placement="left" arrow>
                        <MenuItem onClick={() => changeTheme('light')} className="!py-4 !rounded-xl">Claro</MenuItem>
                      </Tooltip>
                      <Tooltip title="Interface escura, perfeita para uso à noite ou em luz ambiente" placement="left" arrow>
                        <MenuItem onClick={() => changeTheme('dark')} className="!py-4 !rounded-xl">Escuro</MenuItem>
                      </Tooltip>
                    </Box>
                  )}
                </Button>
              </motion.div>
            </Box>
          </Box>
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.9,
              delay: 1.5,
              ease: [0, 0.71, 0.2, 1.01],
            }}
          >
            <Box className='cursor-not-allowed'>
              <Button
                onClick={() => setOpenLoginModal(true)}
                className="button-primary !px-7 !py-[.711rem] !rounded-xl !normal-case !ml-2 !text-[0.9375rem]"
                endIcon={<IoEnter className="text-[#ffffff]" />}
                disabled
              >
                Entrar
              </Button>
            </Box>
          </motion.div>
        </Box>
      </Box>
      <SignIn open={openLoginModal} onClose={() => setOpenLoginModal(false)} />
    </Box>
  );
}
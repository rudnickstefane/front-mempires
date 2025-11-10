import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Box, Button, Divider, MenuItem, Tooltip, Typography } from '@mui/material';
import SignIn from '@sr/modules/public/signin';
import { motion } from 'framer-motion';
import { useRef, useState } from 'react';
import { IoIosArrowForward } from 'react-icons/io';
import { IoEnter } from 'react-icons/io5';
import { MdOutlineWbSunny } from 'react-icons/md';
import { TbDeviceDesktopCog, TbHours24, TbMoonStars } from 'react-icons/tb';
// import status from '../../../modules/assets/images/online.png';
import { useLocale } from '@sr/modules/common/hooks/useLocale';
import { FormattedMessage, useIntl } from 'react-intl';
import enUS from '../../../modules/assets/images/en_US.png';
import ptBR from '../../../modules/assets/images/pt_BR.png';
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

  // 🔹 Estados específicos para o menu de idiomas
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
  const [languageMenuAnimating, setLanguageMenuAnimating] = useState(false);
  const languageMenuTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const hoveringLanguageMenuRef = useRef(false);

  // 🔹 Funções para controlar o menu de idiomas
  const handleLanguageMenuEnter = () => {
    if (languageMenuTimeoutRef.current) clearTimeout(languageMenuTimeoutRef.current);
    hoveringLanguageMenuRef.current = true;
    setLanguageMenuAnimating(true);
    setLanguageMenuOpen(true);
  };

  const handleLanguageMenuLeave = () => {
    hoveringLanguageMenuRef.current = false;
    languageMenuTimeoutRef.current = setTimeout(() => {
      if (!hoveringLanguageMenuRef.current) {
        setLanguageMenuOpen(false);
        languageMenuTimeoutRef.current = setTimeout(() => setLanguageMenuAnimating(false), 300);
      }
    }, 300);
  };

  const handleLanguageDropdownEnter = () => {
    if (languageMenuTimeoutRef.current) clearTimeout(languageMenuTimeoutRef.current);
    hoveringLanguageMenuRef.current = true;
  };

  const handleLanguageDropdownLeave = () => {
    hoveringLanguageMenuRef.current = false;
    languageMenuTimeoutRef.current = setTimeout(() => {
      if (!hoveringLanguageMenuRef.current) {
        setLanguageMenuOpen(false);
        languageMenuTimeoutRef.current = setTimeout(() => setLanguageMenuAnimating(false), 300);
      }
    }, 300);
  };

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
    }, 300);
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

  const { formatMessage } = useIntl();
  const { lang, changeLocale } = useLocale();

  return (
    <Box className="relative z-20 h-24">
      <Box
        className={`fixed w-full h-24 flex items-center px-5 transition-all duration-300 ${
          scrolled ? 'bg-primary' : 'bg-primary-20'
        }`}
      >
        <Box className="flex items-center justify-between gap-4 mx-auto w-full max-w-screen-2xl">
          <Box className={`min-logo ${scrolled ? 'invert-filter' : ''}`}></Box>
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
                  href={menu.link}
                  className={`!px-5 !py-[.735rem] !rounded-xl !font-bold !text-[1rem] !tracking-[0.0625rem] font-jost ${
                    scrolled 
                      ? openMenu === menu.key ? 'btn-menu-scrolled-active' : 'text-primary' 
                      : openMenu === menu.key ? 'btn-menu-active' : 'btn-menu'
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
                                        className={`!py-4 flex flex-row !justify-between !rounded-xl hover:!bg-[var(--surface-overlay)] ${openSubMenu === subMenuKey ? '!bg-[var(--surface-overlay)]' : ''}`}
                                      >
                                        {item.name}
                                        {item.subItems?.length && openSubMenu === subMenuKey ? (
                                          <IoIosArrowForward className="text-[1.4rem] ml-5" />
                                        ) : null}
                                      </MenuItem>
                                      {item.subItems?.length ? (
                                        <SubMenu
                                          isOpen={openSubMenu === subMenuKey}
                                          className="p-[1.25rem] border border-[var(--border-outline)] bg-primary min-w-[300px] shadow-md rounded-xl z-10 absolute"
                                          positionAbove={shouldPositionAbove(subMenuKey)}
                                        >
                                          {item.subItems.map((subItem, idx) => (
                                            <MenuItem
                                              key={subItem.name || idx}
                                              component="a"
                                              href={subItem.link!}
                                              {...(subItem.target && { target: '_blank', rel: 'noopener noreferrer' })}
                                              className="!py-2 !rounded-xl hover:!bg-[var(--surface-overlay)]"
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
                            <Box className="w-1/4 min-w-[300px] bg-[var(--sponsor-surface)] rounded-xl flex items-center justify-center">
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
                              className="!py-4 flex flex-row !justify-between !rounded-xl hover:!bg-[var(--surface-overlay)]"
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
          </Box>
          <Box className='flex gap-4 items-center'>
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 1 }}
            >
              <Button 
                className={`!font-bold !text-[1rem] !tracking-[0.0625rem] font-jost !rounded-xl relative !normal-case !px-5 !py-[.735rem] ${
                  scrolled 
                    ? languageMenuOpen ? 'btn-menu-scrolled-active' : 'text-primary'
                    : languageMenuOpen ? 'btn-menu-active' : 'btn-menu'
                }`}
                onMouseEnter={handleLanguageMenuEnter}
                onMouseLeave={handleLanguageMenuLeave}
                endIcon={<KeyboardArrowDownIcon />}
              >
                <Box className="flex items-center gap-3">
                  <img 
                    src={lang === 'pt-BR' ? ptBR : enUS} 
                    className='w-6 h-6 rounded-xl'
                  />
                  <FormattedMessage id="language.current" />
                </Box>
                
                {languageMenuAnimating && (
                  <Box 
                    className="text-[#646464] absolute top-[3.71rem] left-0 bg-primary text-sm rounded-lg shadow-md z-50 min-w-[260px] p-5"
                    onMouseEnter={handleLanguageDropdownEnter}
                    onMouseLeave={handleLanguageDropdownLeave}
                    style={{ 
                      display: languageMenuOpen ? 'block' : 'none',
                      animation: languageMenuOpen ? 'fadeIn 0.2s ease-in-out' : 'fadeOut 0.2s ease-in-out'
                    }}
                  >
                    <Typography className="!text-[1.3rem] !font-semibold flex flex-row">
                      <FormattedMessage id="language.choose" />
                    </Typography>
                    <Divider className="!my-3" />
                    <MenuItem
                      onClick={() => changeLocale('en-US')} 
                      className="!py-4 flex flex-row !rounded-xl items-center gap-2 hover:!bg-[var(--surface-overlay)]"
                    >
                      <img src={enUS} alt="English" className="w-6 h-6 rounded-xl" />
                      English
                    </MenuItem>
                    <MenuItem
                      onClick={() => changeLocale('pt-BR')} 
                      className="!py-4 flex flex-row !rounded-xl items-center gap-2 hover:!bg-[var(--surface-overlay)]"
                    >
                      <img src={ptBR} alt="Português" className="w-6 h-6 rounded-xl" />
                      Português
                    </MenuItem>
                  </Box>
                )}
              </Button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 1 }}
            >
              <Button 
                className={`!rounded-xl relative !normal-case !px-5 !py-[.855rem] ${
                  scrolled 
                    ? themeMenuOpen ? 'btn-menu-scrolled-active' : 'text-primary'
                    : themeMenuOpen ? 'btn-menu-active' : 'btn-menu'
                }`}
                onMouseEnter={handleThemeMenuEnter}
                onMouseLeave={handleThemeMenuLeave}
                endIcon={<KeyboardArrowDownIcon />}
              >
                {themeMode === 'default' ? <TbHours24 className="!text-[1.5rem]" /> : 
                themeMode === 'system' ? <TbDeviceDesktopCog className="!text-[1.5rem]" /> :
                themeMode === 'light' ? <MdOutlineWbSunny className="!text-[1.5rem]" /> :
                <TbMoonStars className="!text-[1.5rem]" />}
                
                {themeMenuAnimating && (
                  <Box 
                    className="text-[#646464] absolute top-[3.6rem] left-0 bg-primary text-sm rounded-lg shadow-md z-50 min-w-[260px] p-5"
                    onMouseEnter={handleThemeDropdownEnter}
                    onMouseLeave={handleThemeDropdownLeave}
                    style={{ 
                      display: themeMenuOpen ? 'block' : 'none',
                      animation: themeMenuOpen ? 'fadeIn 0.2s ease-in-out' : 'fadeOut 0.2s ease-in-out'
                    }}
                  >
                    <Typography className="!text-[1.3rem] !font-semibold flex flex-row">
                      <FormattedMessage id="theme.choose" />
                    </Typography>
                    <Divider className="!my-3" />
                    <Tooltip title={formatMessage({id: 'theme.default.tooltip'})} placement="left" arrow>
                      <MenuItem onClick={() => changeTheme('default')} className="!py-4 !rounded-xl hover:!bg-[var(--surface-overlay)]">
                        <FormattedMessage id="theme.default" />
                      </MenuItem>
                    </Tooltip>
                    <Tooltip title={formatMessage({id: 'theme.system.tooltip'})}  placement="left" arrow>
                      <MenuItem onClick={() => changeTheme('system')} className="!py-4 !rounded-xl hover:!bg-[var(--surface-overlay)]">
                        <FormattedMessage id="theme.system" />
                      </MenuItem>
                    </Tooltip>
                    <Tooltip title={formatMessage({id: 'theme.light.tooltip'})}  placement="left" arrow>
                      <MenuItem onClick={() => changeTheme('light')} className="!py-4 !rounded-xl hover:!bg-[var(--surface-overlay)]">
                        <FormattedMessage id="theme.light" />
                      </MenuItem>
                    </Tooltip>
                    <Tooltip title={formatMessage({id: 'theme.dark.tooltip'})}  placement="left" arrow>
                      <MenuItem onClick={() => changeTheme('dark')} className="!py-4 !rounded-xl hover:!bg-[var(--surface-overlay)]">
                        <FormattedMessage id="theme.dark" />
                      </MenuItem>
                    </Tooltip>
                  </Box>
                )}
              </Button>
            </motion.div>
          </Box>
          {/* <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 1 }}
              className="flex flex-row"
            >
            <Box className='flex flex-row items-center gap-3'>
              <img src={status} alt="Status do servidor" className='w-[36px] h-[36px]' />
              <Box>
                <Typography className="!text-[1.2rem] !font-semibold text-white">Status</Typography>
                <Box className='flex flex-row items-center gap-1 text-online -mt-1'>
                  <Box className="w-2 h-2 rounded-full status-online"></Box>
                  <Typography className="!text-sm !font-semibold">Online</Typography>
                </Box>
              </Box>
            </Box>
          </motion.div> */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.9,
              delay: 1.5,
              ease: [0, 0.71, 0.2, 1.01],
            }}
          >
            <Button
              onClick={() => setOpenLoginModal(true)}
              className={`btn-golden !px-7 !py-[.711rem] !rounded-xl !normal-case !ml-2 !text-[0.9375rem] ${
                scrolled ? '!text-white' : ''
              }`}
              // endIcon={<IoEnter className={scrolled ? "text-white" : "text-[#ffffff]"} />}
              // disabled
            >
              <Box
                className='bg-[#F4EAD6] rounded-l-xl h-full absolute left-0 flex items-center justify-center'
                style={{
                  clipPath: 'polygon(0 0, 85% 0, 100% 50%, 85% 100%, 0 100%)', 
                }}>
                <IoEnter className="m-3" size={27}/>
              </Box>
              <Box className="ml-9">
                <FormattedMessage id="btn.login" />
              </Box>
            </Button>
          </motion.div>
        </Box>
      </Box>
      <SignIn open={openLoginModal} onClose={() => setOpenLoginModal(false)} />
    </Box>
  );
}
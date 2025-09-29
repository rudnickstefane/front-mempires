import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Box, Button, Divider, MenuItem, Tooltip, Typography } from '@mui/material';
import { Logo } from '@sr/modules/common/ui/Logo';
import SignIn from '@sr/modules/public/signin';
import { motion } from 'framer-motion';
import { IoIosArrowForward } from 'react-icons/io';
import { IoEnter } from 'react-icons/io5';
import { MdOutlineWbSunny } from 'react-icons/md';
import { TbMoonStars } from 'react-icons/tb';
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
    toggleDarkMode,
    darkMode,
    setOpenLoginModal,
    openLoginModal,
  } = useMenuLogic();

  const slides = [
    { id: 1, imageUrl: "https://static.ifood-static.com.br/image/upload/t_high/discoveries/0605SMHOUSE18287TPMCAPAPRINCIPALTOPDESCONTAO1_Auvp.png?imwidth=1920", link: "#" },
    { id: 2, imageUrl: "https://static.ifood-static.com.br/image/upload/t_high/discoveries/0605CUPOMR30TUDOPRAMIMCAPAPRINCIPAL1_hxLN.png?imwidth=1920", link: "#" },
    { id: 3, imageUrl: "https://static.ifood-static.com.br/image/upload/t_high/discoveries/2606SMHOUSE19288FestiveldeInvernoCAPAPRINCIPAL_Q1CT.png?imwidth=1920", link: "#" },
  ];

  return (
    <Box className="relative z-10 h-24">
      <Box
        className={`fixed w-full h-24 flex items-center justify-between px-5 bg-primary transition-all duration-300 ${
          scrolled ? 'shadow-md' : ''
        }`}
      >
        <Logo />
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
                  className={`!normal-case font-secondary !px-5 !py-[.735rem] !rounded-xl ${
                    openMenu === menu.key ? 'button-tertiary' : 'text-primary'
                  }`}
                  disableElevation
                  endIcon={<KeyboardArrowDownIcon />}
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
                                          className="p-[1.25rem] border border-[#EAECF0] bg-white min-w-[300px] shadow-md rounded-xl z-10 absolute"
                                          positionAbove={shouldPositionAbove(subMenuKey)}
                                        >
                                          <Typography className="!text-[1.3rem] !font-semibold flex flex-row">
                                            Tipo de imóvel
                                          </Typography>
                                          <Divider className="!my-3" />
                                          {item.subItems.map((subItem, idx) => (
                                            <MenuItem
                                              key={subItem.name || idx}
                                              component="a"
                                              href={subItem.link!}
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
                transition={{
                  duration: 0.7,
                  delay: 1,
                  ease: [0, 0.71, 0.2, 1.01],
                }}
              >
                <Tooltip title={
                  <>
                    Em breve você poderá escolher o tema do site.
                  </>
                } placement="bottom" arrow>
                  <Box className='cursor-not-allowed'>
                    <Button className="text-primary !min-w-5 !mx-2 w-9 h-9 !rounded-full" onClick={toggleDarkMode} disabled>
                      {darkMode ? <MdOutlineWbSunny className="!text-[1.5rem]" /> : <TbMoonStars className="!text-[1.5rem]" />}
                    </Button>
                  </Box>
                </Tooltip>
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
            <Button
              onClick={() => setOpenLoginModal(true)}
              className="button-primary !px-7 !py-[.711rem] !rounded-xl !normal-case !ml-2 !text-[0.9375rem]"
              endIcon={<IoEnter className="text-[#ffffff]" />}
            >
              Entrar
            </Button>
          </motion.div>
        </Box>
      </Box>
      <SignIn open={openLoginModal} onClose={() => setOpenLoginModal(false)} />
    </Box>
  );
}
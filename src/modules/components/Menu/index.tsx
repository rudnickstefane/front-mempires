import { Box, Button } from "@mui/material";
import { motion } from "framer-motion";
// import status from '../../../modules/assets/images/online.png';
import { FormattedMessage } from "react-intl";
import { useMenuLogic } from "./hooks";

export function Menu() {
  const {
    scrolled,
    menus,
    handleMouseEnter,
    handleMouseLeave,
    openMenu,
    setOpenLoginModal,
  } = useMenuLogic();

  return (
    <Box className="relative z-20 h-24">
      <Box
        className={`w-full h-[130px] flex items-center px-5 transition-all duration-300`}
      >
        <Box className="header-wrapper">
          <Box className="header-left" />
          <Box className="header-center" />
          <Box className="header-right" />
        </Box>
        <Box className="flex items-center justify-between gap-4 mx-auto w-full max-w-screen-2xl">
          <Box className="w-32 h-32"></Box>
          <Box className="flex items-center">
            {menus.map((menu, index) => (
              <motion.div
                key={menu.key}
                custom={index}
                initial="hidden"
                animate="visible"
                onMouseEnter={() => handleMouseEnter(menu.key)}
                onMouseLeave={handleMouseLeave}
                className={menu.isMegaMenu ? "" : "relative"}
              >
                <Button
                  component={menu.link ? "a" : "button"}
                  href={menu.link}
                  className={`!px-5 !py-[.735rem] !rounded-xl text-[1.2rem] !tracking-[0.0625rem] font-marcellus font-semibold transition-all duration-300 bg-[linear-gradient(to_bottom,#fff2c2_0%,#f9d78a_20%,#e8af5a_45%,#c67d26_75%,#8d4f12_100%)] bg-clip-text text-transparent ${
                    scrolled
                      ? openMenu === menu.key
                        ? "btn-menu-scrolled-active"
                        : "text-primary"
                      : openMenu === menu.key
                        ? "btn-menu-active"
                        : ""
                  }`}
                >
                  {menu.label}
                </Button>
              </motion.div>
            ))}
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
          <Button
            onClick={() => setOpenLoginModal(true)}
            className="btn-red text-[1.2rem] font-marcellus"
          >
            <Box className="btn-red-text tracking-[0.05em] font-semibold">
              <FormattedMessage id="btn.login" />
            </Box>
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

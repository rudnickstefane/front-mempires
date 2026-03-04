// import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Box } from "@mui/material";
// import { useRef, useState } from "react";
// import status from '../../../modules/assets/images/online.png';
import { Button } from "@sr/common/iu/components/Button";
// import { useLocale } from "@sr/modules/common/hooks/useLocale";
import { Logo } from "@sr/modules/common/ui/Logo";
import { HambergerMenu, Login } from "iconsax-react";
// import { FormattedMessage } from "react-intl";
import { useNavigate } from "react-router-dom";
// import enUS from "../../../modules/assets/images/en_US.png";
// import ptBR from "../../../modules/assets/images/pt_BR.png";
import { useMenuLogic } from "./hooks";

export function Menu() {
  const { scrolled, menus } = useMenuLogic();

  // const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
  // const [languageMenuAnimating, setLanguageMenuAnimating] = useState(false);
  // const languageMenuTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  // const hoveringLanguageMenuRef = useRef(false);

  // // 🔹 Funções para controlar o menu de idiomas
  // const handleLanguageMenuEnter = () => {
  //   if (languageMenuTimeoutRef.current)
  //     clearTimeout(languageMenuTimeoutRef.current);
  //   hoveringLanguageMenuRef.current = true;
  //   setLanguageMenuAnimating(true);
  //   setLanguageMenuOpen(true);
  // };

  // const handleLanguageMenuLeave = () => {
  //   hoveringLanguageMenuRef.current = false;
  //   languageMenuTimeoutRef.current = setTimeout(() => {
  //     if (!hoveringLanguageMenuRef.current) {
  //       setLanguageMenuOpen(false);
  //       languageMenuTimeoutRef.current = setTimeout(
  //         () => setLanguageMenuAnimating(false),
  //         300,
  //       );
  //     }
  //   }, 300);
  // };

  // const handleLanguageDropdownEnter = () => {
  //   if (languageMenuTimeoutRef.current)
  //     clearTimeout(languageMenuTimeoutRef.current);
  //   hoveringLanguageMenuRef.current = true;
  // };

  // const handleLanguageDropdownLeave = () => {
  //   hoveringLanguageMenuRef.current = false;
  //   languageMenuTimeoutRef.current = setTimeout(() => {
  //     if (!hoveringLanguageMenuRef.current) {
  //       setLanguageMenuOpen(false);
  //       languageMenuTimeoutRef.current = setTimeout(
  //         () => setLanguageMenuAnimating(false),
  //         300,
  //       );
  //     }
  //   }, 300);
  // };

  // const { lang, changeLocale } = useLocale();
  const navigate = useNavigate();

  return (
    <Box className="relative z-20 h-24">
      <Box
        className={`fixed w-full h-24 flex items-center px-5 transition-all duration-200 ${
          scrolled
            ? "bg-white shadow-md"
            : "bg-gradient-to-b from-white to-transparent"
        }`}
      >
        <Box className="flex items-center justify-between gap-4 w-full mx-auto max-w-screen-2xl px-4 lg:px-6">
          <Logo className="text-2xl lg:text-3xl transition-all duration-300 text-primary-950 hover:text-primary" />

          {/* MENUS: 
              hidden por padrão (mobile)
              flex no lg (desktop) 
          */}
          <Box className="hidden lg:flex gap-4 items-center">
            {menus.map((menu) => (
              <Button
                key={menu.key}
                to={menu.link}
                translateId={menu.label}
                className="px-5 py-3 text-sm font-normal transition-all text-primary-950 hover:text-primary"
              />
            ))}
          </Box>
          {/* <Box className="flex gap-4 items-center"> */}
          {/* <Button
              className={`!font-bold !text-[1rem] !tracking-[0.0625rem] font-jost !rounded-xl relative !normal-case !px-5 !py-[.735rem] ${
                scrolled
                  ? languageMenuOpen
                    ? "btn-menu-scrolled-active"
                    : "text-primary"
                  : languageMenuOpen
                    ? "btn-menu-active"
                    : "btn-menu"
              }`}
              onMouseEnter={handleLanguageMenuEnter}
              onMouseLeave={handleLanguageMenuLeave}
              endIcon={<KeyboardArrowDownIcon />}
            >
              <Box className="flex items-center gap-3">
                <img
                  src={lang === "pt-BR" ? ptBR : enUS}
                  className="w-6 h-6 rounded-xl"
                />
                <FormattedMessage id="language.current" />
              </Box>

              {languageMenuAnimating && (
                <Box
                  className="text-[#646464] absolute top-[3.71rem] left-0 bg-primary text-sm rounded-lg shadow-md z-50 min-w-[260px] p-5"
                  onMouseEnter={handleLanguageDropdownEnter}
                  onMouseLeave={handleLanguageDropdownLeave}
                  style={{
                    display: languageMenuOpen ? "block" : "none",
                    animation: languageMenuOpen
                      ? "fadeIn 0.2s ease-in-out"
                      : "fadeOut 0.2s ease-in-out",
                  }}
                >
                  <Typography className="!text-[1.3rem] !font-semibold flex flex-row">
                    <FormattedMessage id="language.choose" />
                  </Typography>
                  <Divider className="!my-3" />
                  <MenuItem
                    onClick={() => changeLocale("en-US")}
                    className="!py-4 flex flex-row !rounded-xl items-center gap-2 hover:!bg-[var(--surface-overlay)]"
                  >
                    <img
                      src={enUS}
                      alt="English"
                      className="w-6 h-6 rounded-xl"
                    />
                    English
                  </MenuItem>
                  <MenuItem
                    onClick={() => changeLocale("pt-BR")}
                    className="!py-4 flex flex-row !rounded-xl items-center gap-2 hover:!bg-[var(--surface-overlay)]"
                  >
                    <img
                      src={ptBR}
                      alt="Português"
                      className="w-6 h-6 rounded-xl"
                    />
                    Português
                  </MenuItem>
                </Box>
              )}
            </Button> */}
          {/* <Button
              className={`!rounded-xl relative !normal-case !px-5 !py-[.855rem] ${
                scrolled
                  ? themeMenuOpen
                    ? "btn-menu-scrolled-active"
                    : "text-primary"
                  : themeMenuOpen
                    ? "btn-menu-active"
                    : "btn-menu"
              }`}
              onMouseEnter={handleThemeMenuEnter}
              onMouseLeave={handleThemeMenuLeave}
              endIcon={<KeyboardArrowDownIcon />}
            >
              {themeMode === "default" ? (
                <TbHours24 className="!text-[1.5rem]" />
              ) : themeMode === "system" ? (
                <TbDeviceDesktopCog className="!text-[1.5rem]" />
              ) : themeMode === "light" ? (
                <MdOutlineWbSunny className="!text-[1.5rem]" />
              ) : (
                <TbMoonStars className="!text-[1.5rem]" />
              )}

              {themeMenuAnimating && (
                <Box
                  className="text-[#646464] absolute top-[3.6rem] left-0 bg-primary text-sm rounded-lg shadow-md z-50 min-w-[260px] p-5"
                  onMouseEnter={handleThemeDropdownEnter}
                  onMouseLeave={handleThemeDropdownLeave}
                  style={{
                    display: themeMenuOpen ? "block" : "none",
                    animation: themeMenuOpen
                      ? "fadeIn 0.2s ease-in-out"
                      : "fadeOut 0.2s ease-in-out",
                  }}
                >
                  <Typography className="!text-[1.3rem] !font-semibold flex flex-row">
                    <FormattedMessage id="theme.choose" />
                  </Typography>
                  <Divider className="!my-3" />
                  <Tooltip
                    title={formatMessage({ id: "theme.default.tooltip" })}
                    placement="left"
                    arrow
                  >
                    <MenuItem
                      onClick={() => changeTheme("default")}
                      className="!py-4 !rounded-xl hover:!bg-[var(--surface-overlay)]"
                    >
                      <FormattedMessage id="theme.default" />
                    </MenuItem>
                  </Tooltip>
                  <Tooltip
                    title={formatMessage({ id: "theme.system.tooltip" })}
                    placement="left"
                    arrow
                  >
                    <MenuItem
                      onClick={() => changeTheme("system")}
                      className="!py-4 !rounded-xl hover:!bg-[var(--surface-overlay)]"
                    >
                      <FormattedMessage id="theme.system" />
                    </MenuItem>
                  </Tooltip>
                  <Tooltip
                    title={formatMessage({ id: "theme.light.tooltip" })}
                    placement="left"
                    arrow
                  >
                    <MenuItem
                      onClick={() => changeTheme("light")}
                      className="!py-4 !rounded-xl hover:!bg-[var(--surface-overlay)]"
                    >
                      <FormattedMessage id="theme.light" />
                    </MenuItem>
                  </Tooltip>
                  <Tooltip
                    title={formatMessage({ id: "theme.dark.tooltip" })}
                    placement="left"
                    arrow
                  >
                    <MenuItem
                      onClick={() => changeTheme("dark")}
                      className="!py-4 !rounded-xl hover:!bg-[var(--surface-overlay)]"
                    >
                      <FormattedMessage id="theme.dark" />
                    </MenuItem>
                  </Tooltip>
                </Box>
              )}
            </Button> */}
          {/* </Box> */}
          <Box className="flex items-center gap-2">
            {/* BOTÃO LOGIN: 
                w-28 no mobile (menor)
                w-36 no lg (original)
            */}
            <Button
              fullWidth
              translateId="btn.login"
              className="py-2.5 lg:py-3 px-4 text-sm lg:text-base bg-primary hover:bg-primary-900 text-white w-28 lg:w-36"
              onClick={() => navigate("/login")}
              endIcon={<Login size={20} variant="Linear" />}
            />

            {/* Ícone de Menu Mobile (Opcional, apenas visível abaixo de lg) */}
            <Box className="lg:hidden flex items-center p-2 text-primary-950">
              <HambergerMenu size={32} />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

import { useThemeDarkMode } from "@sr/modules/common/theme/ThemeContext";
import { useEffect, useRef, useState } from "react";
import { Menu } from "../types";

export const useMenuLogic = () => {
  const { themeMode, changeTheme } = useThemeDarkMode();
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [animatingMenu, setAnimatingMenu] = useState<string | null>(null);
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const hoveringMenuRef = useRef(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const menuItemRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  const menus: Menu[] = [
    {
      key: "home",
      label: "menu.home",
      link: "#home",
    },
    {
      key: "solutions",
      label: "menu.solutions",
      link: "#funcionalidades",
    },
    {
      key: "ecosystem",
      label: "menu.ecosystem",
      link: "#ecosystem",
    },
    {
      key: "differentials",
      label: "menu.differentials",
      link: "#diferenciais",
    },
    {
      key: "faq",
      label: "menu.faq",
      link: "#faq",
    },
    {
      key: "contact",
      label: "menu.contact",
      link: "#contact",
    },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Verifica se um menu tem dropdown (subitens, seções ou é mega menu)
  const hasDropdown = (menu: Menu): boolean => {
    return (
      !!(menu.items && menu.items.length > 0) ||
      !!(menu.sections && menu.sections.length > 0) ||
      !!menu.isMegaMenu
    );
  };

  // Verifica se um menu é apenas um link simples
  const isSimpleLink = (menu: Menu): boolean => {
    return !!menu.link && !hasDropdown(menu);
  };

  const handleMouseEnter = (key: string) => {
    const menu = menus.find((m) => m.key === key);
    if (!menu || isSimpleLink(menu)) return; // Não abre dropdown para links simples

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpenMenu(key);
    setAnimatingMenu(key);
    hoveringMenuRef.current = true;
  };

  const handleMouseLeave = () => {
    setOpenSubMenu(null);
    hoveringMenuRef.current = false;
    timeoutRef.current = setTimeout(() => {
      if (!hoveringMenuRef.current) {
        setOpenMenu(null);
        timeoutRef.current = setTimeout(() => setAnimatingMenu(null), 300);
      }
    }, 150);
  };

  const handleDropdownMouseEnter = () => {
    clearTimeout(timeoutRef.current!);
    hoveringMenuRef.current = true;
  };

  const handleDropdownMouseLeave = () => {
    setOpenSubMenu(null);
    hoveringMenuRef.current = false;
    timeoutRef.current = setTimeout(() => {
      if (!hoveringMenuRef.current) {
        setOpenMenu(null);
        timeoutRef.current = setTimeout(() => setAnimatingMenu(null), 300);
      }
    }, 150);
  };

  const handleSubMenuMouseEnter = (
    sectionTitle: string,
    itemName: string,
    ref: HTMLDivElement | null,
  ) => {
    clearTimeout(timeoutRef.current!);
    setOpenSubMenu(`${sectionTitle}_${itemName}`);
    if (ref) {
      menuItemRefs.current.set(`${sectionTitle}_${itemName}`, ref);
    }
    hoveringMenuRef.current = true;
  };

  const handleSubMenuMouseLeave = () => {
    hoveringMenuRef.current = false;
    timeoutRef.current = setTimeout(() => {
      if (!hoveringMenuRef.current) setOpenSubMenu(null);
    }, 150);
  };

  const shouldPositionAbove = (subMenuKey: string) => {
    const menuItem = menuItemRefs.current.get(subMenuKey);
    if (!menuItem) return false;

    const menuItemRect = menuItem.getBoundingClientRect();
    const dropdownMenu = menuItem.closest(".dropdown-menu");
    if (!dropdownMenu) return false;

    const dropdownRect = dropdownMenu.getBoundingClientRect();
    const subMenuHeightEstimate = 200;
    const spaceBelow = dropdownRect.bottom - menuItemRect.bottom;
    const spaceAbove = menuItemRect.top - dropdownRect.top;

    return (
      spaceBelow < subMenuHeightEstimate && spaceAbove > subMenuHeightEstimate
    );
  };

  // Animation variants for menu items
  const menuVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: (index: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        delay: index * 0.1, // Cascade effect for each menu
      },
    }),
  };

  return {
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
    themeMode,
    changeTheme,
    shouldPositionAbove,
    setOpenLoginModal,
    openLoginModal,
    hasDropdown,
    isSimpleLink,
  };
};

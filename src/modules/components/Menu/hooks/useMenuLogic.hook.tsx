import { useThemeDarkMode } from '@sr/modules/common/theme/ThemeContext';
import { useEffect, useRef, useState } from 'react';
import { Menu } from '../types';

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
      key: 'home',
      label: 'Início',
      link: '/',
    },
    {
      key: 'explore',
      label: 'Explorar',
      isMegaMenu: true,
      sections: [
        {
          title: 'Últimas',
          subtitle: 'notícias',
          items: [
            {
              name: 'Atualizações do jogo',
              subItems: [
                { name: 'Notas de atualizações', link: '/news/updates/patch-notes' },
                { name: 'Novos recursos', link: '/news/updates/new-features' },
                { name: 'Balanceamentos', link: '/news/updates/balance-changes' },
                { name: 'Ver mais', link: '/news/updates' },
              ],
            },
            {
              name: 'Comunidade',
              subItems: [
                { name: 'Eventos', link: '/news/community/events' },
                { name: 'Torneios', link: '/news/community/tournaments' },
                { name: 'Ranking', link: '/news/community/leaderboards' },
                { name: 'Ver mais', link: '/news/community' },
              ],
            },
            {
              name: 'Desenvolvimento',
              subItems: [
                { name: 'Devlog', link: '/news/development/devlog' },
                { name: 'Sneak peeks', link: '/news/development/sneak-peeks' },
                { name: 'Ver mais', link: '/news/development' },
              ],
            },
            {
              name: 'Gameplay',
              subItems: [
                { name: 'Modos de jogo', link: '/gameplay/game-modes' },
                { name: 'Personagens', link: '/gameplay/characters' },
                { name: 'Mapas', link: '/gameplay/maps' },
                { name: 'Ver mais', link: '/gameplay' },
              ],
            },
            {
              name: 'História',
              subItems: [
                { name: 'Personagens', link: '/history/characters' },
                { name: 'Mundo', link: '/history/world' },
                { name: 'Ver mais', link: '/history' },
              ],
            },
            { name: 'Todas as notícias', subItems: [], link: '/explore' },
          ],
        },
        {
          title: 'Acesso rápido',
          items: [
            { name: 'Download', subItems: [], link: '/download' },
            { name: 'Registro beta', subItems: [], link: '/beta' },
            { name: 'Roadmap', subItems: [], link: '/roadmap' },
          ],
        },
      ],
      sponsor: {
        content: 'Espaço para anúncios',
      },
    },
    {
      key: 'community',
      label: 'Comunidade',
      title: 'Nossos',
      subtitle: 'impérios',
      items: [
        { name: 'Discord', link: 'https://discord.gg/TYz9EWXBw', target: true },
        { name: 'Fórum', link: '/community/forum' },
        { name: 'Reddit', link: 'https://www.reddit.com/r/mobileempires/', target: true },
        { name: 'YouTube', link: 'https://www.youtube.com/@mobileempires', target: true },
      ],
    },
    {
      key: 'faq',
      label: 'FAQ',
      title: 'Conheça',
      subtitle: 'bem mais',
      items: [
        { name: 'Perguntas frequentes', link: '/faq/questions' },
        { name: 'Guia de iniciantes', link: '/faq/beginner-guide' },
        { name: 'Dicas avançadas', link: '/faq/advanced-tips' },
      ],
    },
    {
      key: 'help',
      label: 'Ajuda',
      title: 'Tire suas dúvidas',
      items: [
        { name: 'Central de ajuda', link: '/help/help-center' },
        { name: 'Fale conosco', link: '/help/contact-us' },
        { name: 'Como funciona', link: '/help/how-works' },
        { name: 'Termos de uso', link: '/help/terms-of-use' },
        { name: 'Política de privacidade', link: '/help/privacy-policy' },
      ],
    },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Verifica se um menu tem dropdown (subitens, seções ou é mega menu)
  const hasDropdown = (menu: Menu): boolean => {
    return !!(menu.items && menu.items.length > 0) || 
           !!(menu.sections && menu.sections.length > 0) || 
           !!menu.isMegaMenu;
  };

  // Verifica se um menu é apenas um link simples
  const isSimpleLink = (menu: Menu): boolean => {
    return !!menu.link && !hasDropdown(menu);
  };

  const handleMouseEnter = (key: string) => {
    const menu = menus.find(m => m.key === key);
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

  const handleSubMenuMouseEnter = (sectionTitle: string, itemName: string, ref: HTMLDivElement | null) => {
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
    const dropdownMenu = menuItem.closest('.dropdown-menu');
    if (!dropdownMenu) return false;

    const dropdownRect = dropdownMenu.getBoundingClientRect();
    const subMenuHeightEstimate = 200;
    const spaceBelow = dropdownRect.bottom - menuItemRect.bottom;
    const spaceAbove = menuItemRect.top - dropdownRect.top;

    return spaceBelow < subMenuHeightEstimate && spaceAbove > subMenuHeightEstimate;
  };

  // Animation variants for menu items
  const menuVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: (index: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
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
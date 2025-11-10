import { useThemeDarkMode } from '@sr/modules/common/theme/ThemeContext';
import { useEffect, useRef, useState } from 'react';
import { useIntl } from 'react-intl';
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
  const { formatMessage } = useIntl();

  const menus: Menu[] = [
    {
      key: 'home',
      label: formatMessage({ id: 'menu.home' }),
      link: '/',
    },
    {
      key: 'explore',
      label: formatMessage({ id: 'menu.explore' }),
      isMegaMenu: true,
      sections: [
        {
          title: formatMessage({ id: 'menu.explore.latest' }),
          subtitle: formatMessage({ id: 'menu.explore.latest.subtitle' }),
          items: [
            {
              name: formatMessage({ id: 'menu.explore.game_updates' }),
              subItems: [
                { name: formatMessage({ id: 'menu.explore.patch_notes' }), link: '/news/updates/patch-notes' },
                { name: formatMessage({ id: 'menu.explore.new_features' }), link: '/news/updates/new-features' },
                { name: formatMessage({ id: 'menu.explore.balance_changes' }), link: '/news/updates/balance-changes' },
                { name: formatMessage({ id: 'menu.explore.see_more_updates' }), link: '/news/updates' },
              ],
            },
            {
              name: formatMessage({ id: 'menu.explore.community_news' }),
              subItems: [
                { name: formatMessage({ id: 'menu.explore.events' }), link: '/news/community/events' },
                { name: formatMessage({ id: 'menu.explore.tournaments' }), link: '/news/community/tournaments' },
                { name: formatMessage({ id: 'menu.explore.leaderboards' }), link: '/news/community/leaderboards' },
                { name: formatMessage({ id: 'menu.explore.see_more_community' }), link: '/news/community' },
              ],
            },
            {
              name: formatMessage({ id: 'menu.explore.development' }),
              subItems: [
                { name: formatMessage({ id: 'menu.explore.devlog' }), link: '/news/development/devlog' },
                { name: formatMessage({ id: 'menu.explore.sneak_peeks' }), link: '/news/development/sneak-peeks' },
                { name: formatMessage({ id: 'menu.explore.see_more_development' }), link: '/news/development' },
              ],
            },
            {
              name: formatMessage({ id: 'menu.explore.gameplay' }),
              subItems: [
                { name: formatMessage({ id: 'menu.explore.game_modes' }), link: '/gameplay/game-modes' },
                { name: formatMessage({ id: 'menu.explore.characters' }), link: '/gameplay/characters' },
                { name: formatMessage({ id: 'menu.explore.maps' }), link: '/gameplay/maps' },
                { name: formatMessage({ id: 'menu.explore.see_more_gameplay' }), link: '/gameplay' },
              ],
            },
            {
              name: formatMessage({ id: 'menu.explore.history' }),
              subItems: [
                { name: formatMessage({ id: 'menu.explore.story_characters' }), link: '/history/characters' },
                { name: formatMessage({ id: 'menu.explore.story_world' }), link: '/history/world' },
                { name: formatMessage({ id: 'menu.explore.see_more_history' }), link: '/history' },
              ],
            },
            { name: formatMessage({ id: 'menu.explore.all_news' }), subItems: [], link: '/explore' },
          ],
        },
        {
          title: formatMessage({ id: 'menu.explore.quick_access' }),
          items: [
            { name: formatMessage({ id: 'menu.quick.download' }), link: '/download' },
            { name: formatMessage({ id: 'menu.quick.beta' }), link: '/beta' },
            { name: formatMessage({ id: 'menu.quick.roadmap' }), link: '/roadmap' },
          ],
        },
      ],
      sponsor: {
        content: formatMessage({ id: 'sponsor.content' }),
      },
    },
    {
      key: 'community',
      label: formatMessage({ id: 'menu.community' }),
      title: formatMessage({ id: 'menu.community.title' }),
      subtitle: formatMessage({ id: 'menu.community.subtitle' }),
      items: [
        { name: formatMessage({ id: 'menu.community.discord' }), link: 'https://discord.gg/TYz9EWXBw', target: true },
        { name: formatMessage({ id: 'menu.community.forum' }), link: '/community/forum' },
        { name: formatMessage({ id: 'menu.community.reddit' }), link: 'https://www.reddit.com/r/mobileempires/', target: true },
        { name: formatMessage({ id: 'menu.community.youtube' }), link: 'https://www.youtube.com/@mobileempires', target: true },
      ],
    },
    {
      key: 'faq',
      label: formatMessage({ id: 'menu.faq' }),
      title: formatMessage({ id: 'menu.faq.title' }),
      subtitle: formatMessage({ id: 'menu.faq.subtitle' }),
      items: [
        { name: formatMessage({ id: 'menu.faq.questions' }), link: '/faq/questions' },
        { name: formatMessage({ id: 'menu.faq.beginner_guide' }), link: '/faq/beginner-guide' },
        { name: formatMessage({ id: 'menu.faq.advanced_tips' }), link: '/faq/advanced-tips' },
      ],
    },
    {
      key: 'help',
      label: formatMessage({ id: 'menu.help' }),
      title: formatMessage({ id: 'menu.help.title' }),
      items: [
        { name: formatMessage({ id: 'menu.help.help_center' }), link: '/help/help-center' },
        { name: formatMessage({ id: 'menu.help.contact_us' }), link: '/help/contact-us' },
        { name: formatMessage({ id: 'menu.help.how_works' }), link: '/help/how-works' },
        { name: formatMessage({ id: 'menu.help.terms' }), link: '/help/terms-of-use' },
        { name: formatMessage({ id: 'menu.help.privacy' }), link: '/help/privacy-policy' },
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
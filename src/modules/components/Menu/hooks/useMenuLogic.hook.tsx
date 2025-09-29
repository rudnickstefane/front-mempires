import { useThemeDarkMode } from '@sr/modules/common/theme/ThemeContext';
import { useEffect, useRef, useState } from 'react';
import { Menu } from '../types';

export const useMenuLogic = () => {
  const { darkMode, toggleDarkMode } = useThemeDarkMode();
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
      key: 'rent',
      label: 'Alugar',
      isMegaMenu: true,
      sections: [
        {
          title: 'Principais',
          subtitle: 'cidades',
          items: [
            {
              name: 'São Paulo',
              subItems: [
                { name: 'Apartamentos para alugar', link: '/alugar/sao-paulo/apartamentos' },
                { name: 'Casas para alugar', link: '/alugar/sao-paulo/casas' },
                { name: 'Todos os imóveis para alugar', link: '/alugar/sao-paulo/todos-os-imoveis' },
              ],
            },
            {
              name: 'Rio de Janeiro',
              subItems: [
                { name: 'Apartamentos para alugar', link: '/alugar/rio-de-janeiro/apartamentos' },
                { name: 'Casas para alugar', link: '/alugar/rio-de-janeiro/casas' },
                { name: 'Todos os imóveis para alugar', link: '/alugar/rio-de-janeiro/todos-os-imoveis' },
              ],
            },
            {
              name: 'Brasília',
              subItems: [
                { name: 'Apartamentos para alugar', link: '/alugar/brasilia/apartamentos' },
                { name: 'Casas para alugar', link: '/alugar/brasilia/casas' },
                { name: 'Todos os imóveis para alugar', link: '/alugar/brasilia/todos-os-imoveis' },
              ],
            },
            {
              name: 'Salvador',
              subItems: [
                { name: 'Apartamentos para alugar', link: '/alugar/salvador/apartamentos' },
                { name: 'Casas para alugar', link: '/alugar/salvador/casas' },
                { name: 'Todos os imóveis para alugar', link: '/alugar/salvador/todos-os-imoveis' },
              ],
            },
            {
              name: 'Curitiba',
              subItems: [
                { name: 'Apartamentos para alugar', link: '/alugar/curitiba/apartamentos' },
                { name: 'Casas para alugar', link: '/alugar/curitiba/casas' },
                { name: 'Todos os imóveis para alugar', link: '/alugar/curitiba/todos-os-imoveis' },
              ],
            },
            { name: 'Explorar outras cidades', subItems: [], link: '/alugar/explorar-outras-cidades' },
          ],
        },
        {
          title: 'Recursos',
          items: [
            { name: 'Guia de aluguel', subItems: [], link: '/alugar/guia-de-aluguel' },
          ],
        },
      ],
      sponsor: {
        content: 'Espaço para anúncios',
      },
    },
    {
      key: 'buy',
      label: 'Comprar',
      isMegaMenu: true,
      sections: [
        {
          title: 'Principais',
          subtitle: 'cidades',
          items: [
            {
              name: 'São Paulo',
              subItems: [
                { name: 'Apartamentos à venda', link: '/comprar/sao-paulo/apartamentos' },
                { name: 'Casas à venda', link: '/comprar/sao-paulo/casas' },
                { name: 'Todos os imóveis à venda', link: '/comprar/sao-paulo/todos-os-imoveis' },
              ],
            },
            {
              name: 'Goiânia',
              subItems: [
                { name: 'Apartamentos à venda', link: '/comprar/goiania/apartamentos' },
                { name: 'Casas à venda', link: '/comprar/goiania/casas' },
                { name: 'Todos os imóveis à venda', link: '/comprar/goiania/todos-os-imoveis' },
              ],
            },
            {
              name: 'Curitiba',
              subItems: [
                { name: 'Apartamentos à venda', link: '/comprar/curitiba/apartamentos' },
                { name: 'Casas à venda', link: '/comprar/curitiba/casas' },
                { name: 'Todos os imóveis à venda', link: '/comprar/curitiba/todos-os-imoveis' },
              ],
            },
            {
              name: 'Florianópolis',
              subItems: [
                { name: 'Apartamentos à venda', link: '/comprar/florianopolis/apartamentos' },
                { name: 'Casas à venda', link: '/comprar/florianopolis/casas' },
                { name: 'Todos os imóveis à venda', link: '/comprar/florianopolis/todos-os-imoveis' },
              ],
            },
            {
              name: 'Brasília',
              subItems: [
                { name: 'Apartamentos à venda', link: '/comprar/brasilia/apartamentos' },
                { name: 'Casas à venda', link: '/comprar/brasilia/casas' },
                { name: 'Todos os imóveis à venda', link: '/comprar/brasilia/todos-os-imoveis' },
              ],
            },
            { name: 'Explorar outras cidades', subItems: [], link: '/comprar/explorar-outras-cidades' },
          ],
        },
        {
          title: 'Recursos',
          items: [
            { name: 'Guia de compra', subItems: [], link: '/comprar/guia-de-compra' },
          ],
        },
      ],
      sponsor: {
        content: 'Espaço para anúncios',
      },
    },
    {
      key: 'announce',
      label: 'Anunciar',
      title: 'Anuncie no',
      subtitle: 'alugabem',
      items: [
        { name: 'Alugar meu imóvel', link: '/anunciar/alugar-meu-imovel' },
        { name: 'Vender meu imóvel', link: '/anunciar/vender-meu-imovel' },
      ],
    },
    {
      key: 'explore',
      label: 'Explorar',
      title: 'Conheça',
      subtitle: 'bem mais',
      items: [
        { name: 'Aplicativo', link: '/explorar/aplicativo' },
        { name: 'Avaliações de bairros', link: '/explorar/avaliacoes-de-bairros' },
      ],
    },
    {
      key: 'help',
      label: 'Ajuda',
      title: 'Tire suas dúvidas',
      items: [
        { name: 'Central de ajuda', link: '/ajuda/central-de-ajuda' },
        { name: 'Fale conosco', link: '/ajuda/fale-conosco' },
        { name: 'Como funciona', link: '/ajuda/como-funciona' },
        { name: 'Termos de uso', link: '/ajuda/termos-de-uso' },
        { name: 'Política de privacidade', link: '/ajuda/politica-de-privacidade' },
      ],
    },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseEnter = (key: string) => {
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
    shouldPositionAbove,
    toggleDarkMode,
    darkMode,
    setOpenLoginModal,
    openLoginModal,
  };
};
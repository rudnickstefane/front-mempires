import { Box } from '@mui/material';
import { FormType } from '@sr/modules/common/types';
import { RemoveAccentsLowercase } from '@sr/modules/common/utils/RemoveAccentsLowercase.util';
import { useAnimation } from 'framer-motion';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom';
import { CityPropsType, NeighborhoodPropsType } from '../types';
import { useTextSwitcher } from './useTextSwitcher.hook';

export const useHomeHeaderLogic = () => {
  // Navegação
  const navigate = useNavigate()

  const { ref, inView } = useInView({
    triggerOnce: false, // Allow animations to replay on scroll
    threshold: 0.2,
  });

  const controls = useAnimation();

  // Animation variants for the parent container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Stagger child animations
        when: 'beforeChildren',
      },
    },
  };

  // Animation variants for child elements
  const childVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  };

  // Animation variants for floating cards
  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: (index: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
        delay: 0.8 + index * 0.2, // Cascade effect for cards
      },
    }),
  };

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [inView, controls]);

  // Estado para o input de busca de cidade
  const [cityInput, setCityInput] = useState('');
  const [cities, setCities] = useState<CityPropsType[]>([]);
  const [selectedCity, setSelectedCity] = useState<CityPropsType | null>(null);
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<NeighborhoodPropsType | null>(null);

  // Estado para o input de busca de bairro
  const [neighborhoodInput, setNeighborhoodInput] = useState('');
  const [neighborhoods, setNeighborhoods] = useState<NeighborhoodPropsType[]>([]);
  const [filteredNeighborhoods, setFilteredNeighborhoods] = useState<NeighborhoodPropsType[]>([]);

  // Estados de carregamento
  const [isLoadingCities, setIsLoadingCities] = useState(false);
  const [isLoadingNeighborhoods, setIsLoadingNeighborhoods] = useState(false);

  // Estado para tipo de busca (alugar ou comprar)
  const [rentType, setRentType] = useState<'alugar' | 'comprar'>('alugar');

  // Estado para valor total até
  const [totalValue, setTotalValue] = useState<string>('');

  // Estado para número de quartos
  const [bedrooms, setBedrooms] = useState<string>('');

  const [errors, setErrors] = useState<FormType>({
      cityError: '',
  });

  // Debounce para busca de cidades
  useEffect(() => {
    if (cityInput.length < 2) {
      setCities([]);
      return;
    }
    setIsLoadingCities(true);

    const delayDebounce = setTimeout(() => {
      fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/municipios`)
        .then(res => res.json())
        .then((data: CityPropsType[]) => {
          const filtered = data.filter(c =>
            RemoveAccentsLowercase(c.nome).includes(RemoveAccentsLowercase(cityInput))
          );
          setCities(filtered);
          setIsLoadingCities(false);
        })
        .catch(() => {
          setCities([]);
          setIsLoadingCities(false);
        });
    }, 400);

    return () => clearTimeout(delayDebounce);
  }, [cityInput]);

  // Busca bairros quando uma cidade é selecionada
  useEffect(() => {
    if (!selectedCity) {
      setNeighborhoods([]);
      setSelectedNeighborhood(null);
      setNeighborhoodInput('');
      return;
    }

    const ibgeCode = selectedCity.id;
    setIsLoadingNeighborhoods(true);

    const fetchSubdistricts = fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/municipios/${ibgeCode}/subdistritos`)
      .then(res => res.json())
      .then(data => data.length ? data : Promise.reject('Sem subdistritos'));

    const fetchDistricts = () =>
      fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/municipios/${ibgeCode}/distritos`)
        .then(res => res.json());

    fetchSubdistricts
      .catch(fetchDistricts)
      .then((data) => setNeighborhoods(data))
      .catch(() => setNeighborhoods([]))
      .finally(() => setIsLoadingNeighborhoods(false));
  }, [selectedCity]);

  // Filtra bairros localmente com base no input
  useEffect(() => {
    if (neighborhoodInput.trim() === '') {
      setFilteredNeighborhoods(neighborhoods);
      return;
    }
    const filtered = neighborhoods.filter(b =>
      RemoveAccentsLowercase(b.nome).includes(RemoveAccentsLowercase(neighborhoodInput))
    );
    setFilteredNeighborhoods(filtered);
  }, [neighborhoodInput, neighborhoods]);

  // Controle do menu dropdown
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  // Efeito de repulsão magnética
  const boxRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const box = boxRef.current;
    if (!box) return;

    const rect = box.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const dx = e.clientX - centerX;
    const dy = e.clientY - centerY;

    const repelX = -(dx * 0.05);
    const repelY = -(dy * 0.05);

    box.style.transform = `translate(${repelX}px, ${repelY}px)`;
  };

  const handleMouseLeave = () => {
    const box = boxRef.current;
    if (box) {
      box.style.transform = `translate(0px, 0px)`;
    }
  };

  // Função para construir e redirecionar para a URL de busca
  const handleSearch = () => {
    if (!selectedCity) {
      setErrors(prevErrors => ({
        ...prevErrors,
        cityError: 'A cidade é obrigatória.',
      }));

      return null;
    }

    const citySlug = RemoveAccentsLowercase(selectedCity.nome).replace(/\s+/g, '-');
    const state = selectedCity.microrregiao.mesorregiao.UF.sigla.toLowerCase();
    const neighborhoodSlug = selectedNeighborhood
      ? `${RemoveAccentsLowercase(selectedNeighborhood.nome).replace(/\s+/g, '-')}-`
      : '';
    const minValue = 200;

    const numericTotal = getTotalValueAsNumber();
    const maxValue = numericTotal && numericTotal >= minValue ? numericTotal : 1000;

    // Verifica se tem centavos e formata com "-" se tiver
    const hasCents = maxValue % 1 !== 0;
    const formattedMaxValue = hasCents
      ? maxValue.toFixed(2).replace('.', '-')  // ex: 1800.21 → 1800-21
      : maxValue.toFixed(0);                   // ex: 1800.00 → 1800

    const bedroomsSlug = bedrooms ? `/${bedrooms.replace('+', '')}-quartos` : '';

    const url = `/${rentType}/imovel/${neighborhoodSlug}${citySlug}-${state}/de-${minValue}-a-${formattedMaxValue}-reais${bedroomsSlug}`;
    navigate(url)
  };

  const getTotalValueAsNumber = () => {
    if (!totalValue) return null;
    const cleaned = totalValue.replace(/\D/g, '');
    return Number(cleaned) / 100;
  };

  const handleTotalValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '');
    const numberValue = Number(raw);

    if (!raw || isNaN(numberValue)) {
      setTotalValue('');
      return;
    }

    const formatted = (numberValue / 100).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });

    setTotalValue(formatted);
  };

  // Conteúdo do header
  const { title, text, subtitle, description, fade } = useTextSwitcher([
    {
      title: 'Descubra a susa',
      text: 'Casa',
      subtitle: 'perfeita',
      description: (
        <Box>
          <span className='!w-6 !h-2 block bg-secondary rounded-lg'></span> Encontre <b className="font-bold">casas para alugar</b> ou <b className="font-bold">comprar</b>, com total transparência e praticidade.
        </Box>
      )
    },
    {
      title: 'Descubra o seu',
      text: 'Apartamento',
      subtitle: 'perfeito',
      description: (
        <Box>
          <span className='!w-6 !h-2 block bg-secondary rounded-lg'></span> Explore <b className="font-bold">apartamentos que combinam com você</b>, com filtros inteligentes e processo sem complicações.
        </Box>
      )
    },
    {
      title: 'Descubra o seu',
      text: 'Espaço',
      subtitle: 'perfeito',
      description: (
        <Box>
          <span className='!w-6 !h-2 block bg-secondary rounded-lg'></span> Viva em um lar que une <b className="font-bold">conforto, segurança e estilo</b>, com apoio do AlugaBem em cada etapa.
        </Box>
      )
    },
    {
      title: 'Descubra o seu',
      text: 'Cantinho',
      subtitle: 'perfeito',
      description: (
        <Box>
          <span className='!w-6 !h-2 block bg-secondary rounded-lg'></span> Encontre o <b className="font-bold">espaço ideal para o seu momento</b>, com confiança e tranquilidade no aluguel.
        </Box>
      )
    }
  ], 5000);

  const options = useMemo(
    () => [
      // Residencial
      { label: "Apartamento", group: "Residencial" },
      { label: "Bangalô", group: "Residencial" },
      { label: "Casa", group: "Residencial" },
      { label: "Casa de Condomínio", group: "Residencial" },
      { label: "Casa de Vila", group: "Residencial" },
      { label: "Chalé", group: "Residencial" },
      { label: "Cobertura", group: "Residencial" },
      { label: "Kitnet", group: "Residencial" },
      { label: "Loft", group: "Residencial" },
      { label: "Mansão", group: "Residencial" },
      { label: "Sobrado", group: "Residencial" },
      { label: "Studio", group: "Residencial" },
      
      // Comercial
      { label: "Armazém", group: "Comercial" },
      { label: "Depósito", group: "Comercial" },
      { label: "Escritório", group: "Comercial" },
      { label: "Galpão", group: "Comercial" },
      { label: "Loja", group: "Comercial" },
      { label: "Ponto Comercial", group: "Comercial" },
      { label: "Prédio Comercial", group: "Comercial" },
      { label: "Quiosque", group: "Comercial" },
      { label: "Sala Comercial", group: "Comercial" },
      { label: "Stand", group: "Comercial" },

      // Empreendimentos
      { label: "Em Construção", group: "Empreendimentos" },
      { label: "Incorporado", group: "Empreendimentos" },
      { label: "Lançamento", group: "Empreendimentos" },
      { label: "Planta", group: "Empreendimentos" },

      // Imóveis Especiais
      { label: "Apart-Hotel", group: "Imóveis Especiais" },
      { label: "Flat", group: "Imóveis Especiais" },
      { label: "Hospedaria", group: "Imóveis Especiais" },
      { label: "Hotel", group: "Imóveis Especiais" },
      { label: "Motel", group: "Imóveis Especiais" },
      { label: "Pousada", group: "Imóveis Especiais" },
      { label: "Resort", group: "Imóveis Especiais" },

      // Terrenos
      { label: "Área Comercial", group: "Terrenos" },
      { label: "Área Industrial", group: "Terrenos" },
      { label: "Chácara", group: "Terrenos" },
      { label: "Fazenda", group: "Terrenos" },
      { label: "Lote em Condomínio", group: "Terrenos" },
      { label: "Loteamento", group: "Terrenos" },
      { label: "Sítio", group: "Terrenos" },
      { label: "Terreno Rural", group: "Terrenos" },
      { label: "Terreno Urbano", group: "Terrenos" },

      // Leilão Residencial
      { label: "Apartamento", group: "Leilão" },
      { label: "Bangalô", group: "Leilão" },
      { label: "Casa", group: "Leilão" },
      { label: "Casa de Condomínio", group: "Leilão" },
      { label: "Casa de Vila", group: "Leilão" },
      { label: "Chalé", group: "Leilão" },
      { label: "Cobertura", group: "Leilão" },
      { label: "Kitnet", group: "Leilão" },
      { label: "Loft", group: "Leilão" },
      { label: "Mansão", group: "Leilão" },
      { label: "Sobrado", group: "Leilão" },
      { label: "Studio", group: "Leilão" },
      
      // Leilão Comercial
      { label: "Armazém", group: "Leilão" },
      { label: "Depósito", group: "Leilão" },
      { label: "Escritório", group: "Leilão" },
      { label: "Galpão", group: "Leilão" },
      { label: "Loja", group: "Leilão" },
      { label: "Ponto Leilão", group: "Leilão" },
      { label: "Prédio Leilão", group: "Leilão" },
      { label: "Quiosque", group: "Leilão" },
      { label: "Sala Leilão", group: "Leilão" },
      { label: "Stand", group: "Leilão" },

      // Leilão Imóveis Especiais
      { label: "Apart-Hotel", group: "Leilão" },
      { label: "Flat", group: "Leilão" },
      { label: "Hospedaria", group: "Leilão" },
      { label: "Hotel", group: "Leilão" },
      { label: "Motel", group: "Leilão" },
      { label: "Pousada", group: "Leilão" },
      { label: "Resort", group: "Leilão" },

      // Leilão Terrenos
      { label: "Área Comercial", group: "Leilão" },
      { label: "Área Industrial", group: "Leilão" },
      { label: "Chácara", group: "Leilão" },
      { label: "Fazenda", group: "Leilão" },
      { label: "Lote em Condomínio", group: "Leilão" },
      { label: "Loteamento", group: "Leilão" },
      { label: "Sítio", group: "Leilão" },
      { label: "Terreno Rural", group: "Leilão" },
      { label: "Terreno Urbano", group: "Leilão" },
      ],
    []
  );
  
  const filteredOptions = useMemo(() => {
    if (rentType === 'alugar') {
      return options.filter(
        (opt) =>
          opt.group !== 'Empreendimentos' &&
          opt.group !== 'Leilão' &&
          !['Lote em Condomínio', 'Loteamento'].includes(opt.label)
      );
    }
    return options;
  }, [rentType, options]);
  
  const [isFocused, setIsFocused] = useState(false);
  const [selectedValues, setSelectedValues] = useState<{ label: string; group: string }[]>([]);

  return {
    setCityInput,
    cities,
    isOpen,
    handleOpen,
    handleClose,
    handleMouseMove,
    handleMouseLeave,
    boxRef,
    cityInput,
    isLoadingCities,
    isLoadingNeighborhoods,
    filteredNeighborhoods,
    selectedNeighborhood,
    setSelectedNeighborhood,
    setNeighborhoodInput,
    setSelectedCity,
    selectedCity,
    title,
    text,
    subtitle,
    description,
    fade,
    errors,
    setRentType,
    totalValue,
    handleTotalValueChange,
    bedrooms,
    setBedrooms,
    handleSearch,
    ref,
    controls,
    containerVariants,
    childVariants,
    cardVariants,
    filteredOptions,
    isFocused,
    setIsFocused,
    selectedValues,
    setSelectedValues,
  };
};
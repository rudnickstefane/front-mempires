import { Typography } from "@sr/common/iu/components/Typography";
import { FormType } from "@sr/modules/common/types";
import { RemoveAccentsLowercase } from "@sr/modules/common/utils/RemoveAccentsLowercase.util";
import { useAnimation } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useNavigate } from "react-router-dom";
import { CityPropsType, NeighborhoodPropsType } from "../types";
import { useTextSwitcher } from "./useTextSwitcher.hook";

export const useHomeHeaderLogic = () => {
  // Navegação
  const navigate = useNavigate();

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
        when: "beforeChildren",
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
        ease: "easeOut",
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
        ease: "easeOut",
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
  const [cityInput, setCityInput] = useState("");
  const [cities, setCities] = useState<CityPropsType[]>([]);
  const [selectedCity, setSelectedCity] = useState<CityPropsType | null>(null);
  const [selectedNeighborhood, setSelectedNeighborhood] =
    useState<NeighborhoodPropsType | null>(null);

  // Estado para o input de busca de bairro
  const [neighborhoodInput, setNeighborhoodInput] = useState("");
  const [neighborhoods, setNeighborhoods] = useState<NeighborhoodPropsType[]>(
    [],
  );
  const [filteredNeighborhoods, setFilteredNeighborhoods] = useState<
    NeighborhoodPropsType[]
  >([]);

  // Estados de carregamento
  const [isLoadingCities, setIsLoadingCities] = useState(false);
  const [isLoadingNeighborhoods, setIsLoadingNeighborhoods] = useState(false);

  // Estado para tipo de busca (alugar ou comprar)
  const [rentType, setRentType] = useState<"alugar" | "comprar">("alugar");

  // Estado para valor total até
  const [totalValue, setTotalValue] = useState<string>("");

  // Estado para número de quartos
  const [bedrooms, setBedrooms] = useState<string>("");

  const [errors, setErrors] = useState<FormType>({
    cityError: "",
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
        .then((res) => res.json())
        .then((data: CityPropsType[]) => {
          const filtered = data.filter((c) =>
            RemoveAccentsLowercase(c.nome).includes(
              RemoveAccentsLowercase(cityInput),
            ),
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
      setNeighborhoodInput("");
      return;
    }

    const ibgeCode = selectedCity.id;
    setIsLoadingNeighborhoods(true);

    const fetchSubdistricts = fetch(
      `https://servicodados.ibge.gov.br/api/v1/localidades/municipios/${ibgeCode}/subdistritos`,
    )
      .then((res) => res.json())
      .then((data) =>
        data.length ? data : Promise.reject("Sem subdistritos"),
      );

    const fetchDistricts = () =>
      fetch(
        `https://servicodados.ibge.gov.br/api/v1/localidades/municipios/${ibgeCode}/distritos`,
      ).then((res) => res.json());

    fetchSubdistricts
      .catch(fetchDistricts)
      .then((data) => setNeighborhoods(data))
      .catch(() => setNeighborhoods([]))
      .finally(() => setIsLoadingNeighborhoods(false));
  }, [selectedCity]);

  // Filtra bairros localmente com base no input
  useEffect(() => {
    if (neighborhoodInput.trim() === "") {
      setFilteredNeighborhoods(neighborhoods);
      return;
    }
    const filtered = neighborhoods.filter((b) =>
      RemoveAccentsLowercase(b.nome).includes(
        RemoveAccentsLowercase(neighborhoodInput),
      ),
    );
    setFilteredNeighborhoods(filtered);
  }, [neighborhoodInput, neighborhoods]);

  // Controle do menu dropdown
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  // Efeito de repulsão magnética
  const boxRef = useRef<HTMLDivElement>(null);

  // Função para construir e redirecionar para a URL de busca
  const handleSearch = () => {
    if (!selectedCity) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        cityError: "A cidade é obrigatória.",
      }));

      return null;
    }

    const citySlug = RemoveAccentsLowercase(selectedCity.nome).replace(
      /\s+/g,
      "-",
    );
    const state = selectedCity.microrregiao.mesorregiao.UF.sigla.toLowerCase();
    const neighborhoodSlug = selectedNeighborhood
      ? `${RemoveAccentsLowercase(selectedNeighborhood.nome).replace(/\s+/g, "-")}-`
      : "";
    const minValue = 200;

    const numericTotal = getTotalValueAsNumber();
    const maxValue =
      numericTotal && numericTotal >= minValue ? numericTotal : 1000;

    // Verifica se tem centavos e formata com "-" se tiver
    const hasCents = maxValue % 1 !== 0;
    const formattedMaxValue = hasCents
      ? maxValue.toFixed(2).replace(".", "-") // ex: 1800.21 → 1800-21
      : maxValue.toFixed(0); // ex: 1800.00 → 1800

    const bedroomsSlug = bedrooms
      ? `/${bedrooms.replace("+", "")}-quartos`
      : "";

    const url = `/${rentType}/imovel/${neighborhoodSlug}${citySlug}-${state}/de-${minValue}-a-${formattedMaxValue}-reais${bedroomsSlug}`;
    navigate(url);
  };

  const getTotalValueAsNumber = () => {
    if (!totalValue) return null;
    const cleaned = totalValue.replace(/\D/g, "");
    return Number(cleaned) / 100;
  };

  const handleTotalValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, "");
    const numberValue = Number(raw);

    if (!raw || isNaN(numberValue)) {
      setTotalValue("");
      return;
    }

    const formatted = (numberValue / 100).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

    setTotalValue(formatted);
  };

  // Conteúdo do header
  const { title, description, fade } = useTextSwitcher(
    [
      {
        title: (
          <Typography className="text-primary-950 font-bold text-6xl font-ubuntu">
            Fidelize seu cliente com{" "}
            <span className="text-primary underline">Cashback</span>
          </Typography>
        ),
        description: (
          <Typography className="text-primary-950 leading-relaxed line-clamp-4 text-xl font-light font-ubuntu">
            Pontos acumulados que viram desconto real. O valor resgatado é{" "}
            <b className="font-bold">
              abatido diretamente da fatura de serviços
            </b>
            , criando um ciclo onde o varejo fatura mais e o beneficiário
            economiza de verdade.
          </Typography>
        ),
      },
      {
        title: (
          <Typography className="text-primary-950 font-bold text-6xl font-ubuntu">
            <span className="text-primary underline">Autorização</span>{" "}
            inteligente
          </Typography>
        ),
        description: (
          <Typography className="text-primary-950 leading-relaxed line-clamp-4 text-xl font-light font-ubuntu">
            Venda com segurança total no PDV. A transação é validada via{" "}
            <b className="font-bold">Token dinâmico</b>, garantindo uma operação
            blindada contra fraudes e totalmente auditável para sua rede.
          </Typography>
        ),
      },
      {
        title: (
          <Typography className="text-primary-950 font-bold text-6xl font-ubuntu">
            Super <span className="text-primary underline">App</span>
          </Typography>
        ),
        description: (
          <Typography className="text-primary-950 leading-relaxed line-clamp-4 text-xl font-light font-ubuntu">
            Tecnologia na palma da mão. Com o{" "}
            <b className="font-bold">App BenefyCare</b>, o colaborador gerencia
            limites, consulta saldos e gera chaves de segurança em tempo real,
            elevando o padrão digital da sua operação.
          </Typography>
        ),
      },
      {
        title: (
          <Typography className="text-primary-950 font-bold text-6xl font-ubuntu">
            <span className="text-primary underline">Convênios</span> Versáteis
          </Typography>
        ),
        description: (
          <Typography className="text-primary-950 leading-relaxed line-clamp-4 text-xl font-light font-ubuntu">
            Atenda qualquer demanda corporativa com facilidade. Opere com{" "}
            <b className="font-bold">
              Desconto em Folha, Fidelização ou Benefício
            </b>
            , permitindo que sua rede feche contratos muito mais estratégicos e
            lucrativos.
          </Typography>
        ),
      },
      {
        title: (
          <Typography className="text-primary-950 font-bold text-6xl font-ubuntu">
            <span className="text-primary underline">Repasse</span> Automatizado
          </Typography>
        ),
        description: (
          <Typography className="text-primary-950 leading-relaxed line-clamp-4 text-xl font-light font-ubuntu">
            Elimine erros e processos manuais. Tenha uma{" "}
            <b className="font-bold">conciliação financeira impecável</b> entre
            as vendas no balcão e o faturamento consolidado, com transparência e
            agilidade total.
          </Typography>
        ),
      },
    ],
    8000,
  );

  const [isFocused, setIsFocused] = useState(false);
  const [selectedValues, setSelectedValues] = useState<
    { label: string; group: string }[]
  >([]);

  return {
    setCityInput,
    cities,
    isOpen,
    handleOpen,
    handleClose,
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
    isFocused,
    setIsFocused,
    selectedValues,
    setSelectedValues,
  };
};

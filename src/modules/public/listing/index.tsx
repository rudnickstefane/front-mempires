import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Box, Card, CardActionArea, CardContent, CardMedia, ListItemIcon, ListItemText, Menu, MenuItem, TextField, Typography } from "@mui/material";
import Announcement from "@sr/modules/components/sliders/announcement";
import HideBodyOverflow from '@sr/modules/components/Styles/hideBodyOverflow';
import { useState } from "react";
import { BiTime } from "react-icons/bi";
import { CgArrowsExchangeV } from 'react-icons/cg';
import { HiArrowsExpand, HiOutlineLocationMarker } from 'react-icons/hi';
import { IoMdTrendingDown, IoMdTrendingUp } from 'react-icons/io';
import { PiArrowsInBold, PiFireSimpleBold, PiStarBold } from 'react-icons/pi';
import { useParams } from "react-router-dom";
import { Menu as MenuHeader } from '../../components/Menu';
import { ListingHeader } from "./sections/header";

const slides = [
    { id: 1, imageUrl: "https://static.ifood-static.com.br/image/upload/t_high/discoveries/1104SMHOUSE17884BISNAGA_QHpq.png?imwidth=1920", link: "#" },
    { id: 2, imageUrl: "https://static.ifood-static.com.br/image/upload/t_high/discoveries/0605CUPOMR30TUDOPRAMIMCAPAPRINCIPAL1_hxLN.png?imwidth=1920", link: "#" },
    { id: 3, imageUrl: "https://static.ifood-static.com.br/image/upload/t_high/discoveries/2606SMHOUSE19288FestiveldeInvernoCAPAPRINCIPAL_Q1CT.png?imwidth=1920", link: "#" },
  ];

  const mockProperties = [
  {
    id: 1,
    image: "https://www.quintoandar.com.br/img/1200x800/893672865-484.49484884206569728651.jpg",
    title: "Apartamento mobiliado com 2 quartos",
    price: "R$ 1.850",
    location: "Rua Antônio Sebastião Sobrinho, Parque Pan Americano, São Paulo - SP",
  },
  {
    id: 2,
    image: "https://www.quintoandar.com.br/img/1200x800/894481385-962.3887206512462IMG7538.jpg",
    title: "Casa térrea com quintal amplo",
    price: "R$ 1.670",
    location: "Rua Brigadeiro Godinho dos Santos, Americanopolis, Curitiba - PR",
  },
  {
    id: 3,
    image: "https://www.quintoandar.com.br/img/1200x800/894954930-343.3558534829293MG4728.jpg",
    title: "Studio moderno no centro",
    price: "R$ 2.050",
    location: "Rua Laranjal do Jari, São Pedro, Belo Horizonte - MG",
  },
  {
    id: 4,
    image: "https://www.quintoandar.com.br/img/1200x800/original894967523-860.3497132206412DSC0001.jpg",
    title: "Studio moderno no centro",
    price: "R$ 2.000",
    location: "Rua Luís CUnha, Aurora, Belo Horizonte - MG",
  },
];

const Listing = () => {
  useParams();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedSort, setSelectedSort] = useState("relevantes");
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = (value: string) => {
    setSelectedSort(value);
    handleClose();
    // Aqui você pode aplicar lógica de ordenação real
  };

  return (
    <>
      <MenuHeader />
      <Box className='flex flex-row h-screen border-t'>
        <Box className='w-2/3 border-r'>
          <ListingHeader />
          <Box className='pr-1'>
          <Box className='overflow-x-auto max-h-[calc(100vh-190px)]'>
            <Box className='p-5'>
              <Box className='flex flex-row items-center justify-between mb-5'>
                <Box className='flex flex-col gap-1'>
                  <Typography className='!text-[1rem] !font-semibold text-black'>32 imóveis encontrados</Typography>
                  <Typography className='!text-sm text-black'>para alugar em São Paulo - SP</Typography>
                </Box>

                <Box className='flex flex-row items-center gap-3'>
                  <Typography className='!text-sm text-gray-900 flex flex-row items-center'>
                    <CgArrowsExchangeV className='text-2xl'/> Ordenar por:
                  </Typography>
                  <Box className="button-quintary rounded-xl p-3 max-w-fit !text-sm cursor-pointer" onClick={handleClick}>
                    {/* Ícone + texto do item selecionado */}
                    <Box className="flex justify-between w-full items-center">
                      <Box className="flex flex-row items-center gap-2">
                        {
                          {
                            exclusivos: <PiStarBold className="text-[1.2rem]" />,
                            relevantes: <PiFireSimpleBold className="text-[1.2rem]" />,
                            proximos: <HiOutlineLocationMarker className="text-[1.2rem]" />,
                            recentes: <BiTime className="text-[1.2rem]" />,
                            maior_preco: <IoMdTrendingUp className="text-[1.2rem]" />,
                            menor_preco: <IoMdTrendingDown className="text-[1.2rem]" />,
                            maior_area: <HiArrowsExpand className="text-[1.2rem]" />,
                            menor_area: <PiArrowsInBold className="text-[1.2rem]" />,
                          }[selectedSort]
                        }
                        <Box className="text-sm font-medium">
                          {
                            {
                              exclusivos: "Exclusivos",
                              relevantes: "Mais relevantes",
                              proximos: "Mais próximos",
                              recentes: "Mais recentes",
                              maior_preco: "Maior preço",
                              menor_preco: "Menor preço",
                              maior_area: "Maior área m²",
                              menor_area: "Menor área m²",
                            }[selectedSort]
                          }
                        </Box>
                      </Box>
                      <KeyboardArrowDownIcon className="!text-[1.3rem] ml-2" />
                    </Box>
                  </Box>

                  <Menu
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    slotProps={{
                      paper: {
                        sx: {
                          borderRadius: ".7rem",
                          padding: "0 .4rem",
                          mt: 1.5,
                        },
                      },
                    }}
                    transformOrigin={{ horizontal: "right", vertical: "top" }}
                    anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                  >
                    {[
                      {
                        label: "Exclusivos",
                        value: "exclusivos",
                        icon: <PiStarBold className="text-[1.5rem]" />,
                      },
                      {
                        label: "Mais relevantes",
                        value: "relevantes",
                        icon: <PiFireSimpleBold className="text-[1.5rem]" />,
                      },
                      {
                        label: "Mais próximos",
                        value: "proximos",
                        icon: <HiOutlineLocationMarker className="text-[1.5rem]" />,
                      },
                      {
                        label: "Mais recentes",
                        value: "recentes",
                        icon: <BiTime className="text-[1.5rem]" />,
                      },
                      {
                        label: "Maior preço",
                        value: "maior_preco",
                        icon: <IoMdTrendingUp className="text-[1.5rem]" />,
                      },
                      {
                        label: "Menor preço",
                        value: "menor_preco",
                        icon: <IoMdTrendingDown className="text-[1.5rem]" />,
                      },
                      {
                        label: "Maior area m²",
                        value: "maior_area",
                        icon: <HiArrowsExpand className="text-[1.5rem]" />,
                      },
                      {
                        label: "Menor area m²",
                        value: "menor_area",
                        icon: <PiArrowsInBold className="text-[1.5rem]" />,
                      }
                    ]
                      .map((item) => (
                        <MenuItem
                          key={item.value}
                          onClick={() => handleSelect(item.value)}
                          selected={selectedSort === item.value}
                          sx={{
                            borderRadius: ".4rem",
                            margin: ".2rem 0",
                            "&:hover": {
                              backgroundColor: "#0000000a !important",
                              color: "#000000de !important",
                            },
                          }}
                        >
                          <ListItemIcon className="!-mr-1.5">{item.icon}</ListItemIcon>
                          <ListItemText primary={item.label} />
                        </MenuItem>
                      ))}
                  </Menu>
                </Box>
              </Box>

              <Box className='w-full grid grid-cols-3 gap-4 mb-4'>
                {mockProperties.map((item) => (
                  <Card className='!rounded-xl' key={item.id}>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        height="140"
                        image={item.image}
                        alt="green iguana"
                      />
                      <CardContent>
                        <Typography className='!text-sm text-gray-500 !mb-3'>
                          {item.title}
                        </Typography>
                        <Box className='flex flex-row items-center'>
                          <Typography className='!text-xl !font-medium'>
                            {item.price}
                          </Typography>
                          <Typography className='!text-sm !ml-1 !font-medium'>aluguel</Typography>
                        </Box>
                        <Box className='flex flex-row items-center max-w-auto text-gray-500'>
                          <Typography className='!text-sm whitespace-wrap overflow-hidden text-ellipsis' >{item.location}</Typography>
                        </Box>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                ))}
              </Box>
            </Box>
          </Box>
          </Box>
        </Box>

        <Box className='overflow-x-auto max-h-[calc(100vh-190px)] w-2/6 p-5'>
          <Box className="w-full h-32 min-w-[300px] bg-[#EEF2F6] rounded-xl flex items-center justify-center">
            <Announcement slides={slides} className="rounded-xl" />
          </Box>

          <Box
                    sx={{
                      p: 2,
                      backgroundColor: "#f9f9f9",
                      borderRadius: 3,
                      boxShadow: 1,
                    }}
                  >
                    <Typography variant="h6" mb={2}>Filtros</Typography>

                    <TextField
                      fullWidth
                      label="Tipo de imóvel"
                      select
                      defaultValue=""
                      sx={{ mb: 2 }}
                    >
                      <MenuItem value="Apartamento">Apartamento</MenuItem>
                      <MenuItem value="Casa">Casa</MenuItem>
                      <MenuItem value="Studio">Studio</MenuItem>
                    </TextField>

                    <TextField
                      fullWidth
                      label="Cidade"
                      defaultValue=""
                      sx={{ mb: 2 }}
                    />

                    <TextField
                      fullWidth
                      label="Faixa de preço"
                      select
                      defaultValue=""
                    >
                      <MenuItem value="0-200000">Até R$ 200.000</MenuItem>
                      <MenuItem value="200000-500000">R$ 200.000 - R$ 500.000</MenuItem>
                      <MenuItem value="500000+">Acima de R$ 500.000</MenuItem>
                    </TextField>
                  </Box>
        </Box>
      </Box>
      <HideBodyOverflow />
    </>
  );
};

export default Listing;

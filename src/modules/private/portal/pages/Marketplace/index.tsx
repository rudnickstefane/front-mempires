import { Box, Button, Divider, FormControl, InputAdornment, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { CiSearch, CiShoppingBasket } from "react-icons/ci";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useMarketplace } from "../Gym/hooks";
import { GymManagementProps } from "../Gym/types";

export default function Marketplace({ enqueueSnackbar }: GymManagementProps) {
    const {
        searchText,
        setSearchText,
        productsToDisplay,
    } = useMarketplace({ enqueueSnackbar });

    const equipmentData = [
        { name: 'Alimentos', type: 'FOOD' },
        { name: 'Acessórios de Treino', type: 'ACCESSORY' },
        { name: 'Bebidas', type: 'BEVERAGE' },
        { name: 'Cintos', type: 'BELTS' },
        { name: 'Cardio', type: 'CARDIO_EQUIPMENT' },
        { name: 'Equipamentos Gerais', type: 'EQUIPMENT' },
        { name: 'Faixas e Luvas', type: 'RESISTANCE_BANDS' },
        { name: 'Luvas de Musculação', type: 'GLOVES' },
        { name: 'Musculação', type: 'STRENGTH_EQUIPMENT' },
        { name: 'Pesos e Halteres', type: 'FREE_WEIGHTS' },
        { name: 'Racks e Bancos', type: 'RACKS_BENCHES' },
        { name: 'Rolos', type: 'FOAM_ROLLERS' },
        { name: 'Straps e Munhequeiras', type: 'STRAPS' },
        { name: 'Suplementos', type: 'SUPPLEMENT' },
        { name: 'Tapetes de Yoga', type: 'MATS' },
        { name: 'Outros Produtos', type: 'OTHERS' },
    ];

    // Função para contar a quantidade de cada tipo de equipamento
    const getQuantityByType = (type: string) => {
        return productsToDisplay?.filter((product) => product.type === type).length || 0;
    };

    const equipmentWithQuantity = equipmentData.map((equipment) => ({
        ...equipment,
        quantity: getQuantityByType(equipment.type),
    }));

    return (
        <Box>
            <Box className="overflow-x-auto max-h-[calc(100vh-60px)] p-5 pb-[4rem]">
                <Box className="bg-white w-full rounded-3xl shadow-md p-5 border border-[#EAECF0]">
                    <FormControl fullWidth>
                        <TextField
                        name='search'
                        label='Buscar equipamentos, produtos, fornecedor e muito mais...'
                        variant='outlined'
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="start">
                                    <CiSearch size={20} />
                                </InputAdornment>
                            ),
                        }}
                        inputProps={{ maxLength: 100 }}
                        />
                    </FormControl>
                </Box>
                <Box className="flex flex-row w-full mt-5">
                    <Box className='mr-5 w-[284px] flex flex-col items-start'>
                        <Typography className='!mb-3 !font-semibold'>Categorias</Typography>
                        {equipmentWithQuantity.map((equipment, index) => (
                            <Button
                            key={index}
                            className='!mt-1'
                            style={{ textTransform: 'none', fontFamily: 'Poppins' }}
                            sx={{
                                color: '#4b5563',
                                fontWeight: 'normal',
                                padding: 0,
                                transition: 'transform 0.3s, background-color 0.3s, color 0.3s',
                                '&:hover': {
                                    background: 'transparent',
                                    color: '#ff0336',
                                },
                            }}
                            >
                            {equipment.name} ({equipment.quantity})
                            </Button>
                        ))}
                        <Typography className='!mb-3 !font-semibold !mt-10'>Custo do frete</Typography>
                        <Typography className='!mb-3 !font-semibold !mt-10'>Localização</Typography>
                        <Typography className='!mb-3 !font-semibold !mt-10'>Preço</Typography>
                        <Typography className='!mb-3 !font-semibold !mt-10'>Descontos</Typography>
                    </Box>
                    <Box className='flex flex-row w-full gap-5 flex-wrap'>
                        {productsToDisplay && productsToDisplay.length > 0 ? (
                            productsToDisplay?.map((product) => (
                                <Button 
                                    key={product.productCode} 
                                    className="!flex !flex-wrap !items-start !bg-white w-[260px] !rounded-3xl shadow-md !p-0 border border-[#EAECF0]"
                                    style={{ textTransform: 'none', fontFamily: 'Poppins' }}
                                    sx={{
                                        color: '#4b5563',
                                        fontWeight: 'normal',
                                        padding: 0,
                                        transition: 'transform 0.3s, background-color 0.3s, color 0.3s',
                                        '&:hover': {
                                            background: 'transparent',
                                            color: '#ff0336',
                                        },
                                    }}
                                >
                                    <Box className='flex flex-col text-left p-5'>
                                        <ImageCarousel images={product.images} />
                                        <Divider className='w-full !my-5' />
                                        <Typography className='uppercase !font-semibold text-black whitespace-nowrap overflow-hidden text-ellipsis w-[220px]'>
                                            {product.fantasyName}
                                        </Typography>
                                        <Typography
                                            className="!text-[.9rem] overflow-hidden text-ellipsis w-[220px] line-clamp-2"
                                        >
                                            {product.name}
                                        </Typography>
                                        <Box className='mt-5 flex-col'>
                                            {product.discountPercent ? (
                                                <>
                                                    <Typography className="line-through flex flex-row text-neutral-600">
                                                        {Number(product.price || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                                    </Typography>
                                                    <Typography className='flex flex-row items-center !text-[1.5rem] text-black'>
                                                    {Number(product.discountAmount || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }).split(',')[0]}
                                                        <Box className='text-[.9rem] mr-2'>,{Number(product.discountAmount || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }).split(',')[1]}</Box>
                                                        {product.discountPercent && (
                                                            <Box className='text-[#00a650] text-[.9rem]'>
                                                                {product.discountPercent}% OFF
                                                            </Box>
                                                        )}
                                                    </Typography>
                                                </>
                                            ) : (
                                                <Typography className='flex flex-row items-center !text-[1.5rem] text-black'>
                                                    {Number(product.price || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }).split(',')[0]}
                                                    <Box className='text-[.9rem] mr-3'>,{Number(product.price || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }).split(',')[1]}</Box>
                                                    {product.discountPercent && (
                                                        <Box className='text-[#00a650] text-[.9rem]'>
                                                            {product.discountPercent}% OFF
                                                        </Box>
                                                    )}
                                                </Typography>
                                            )}
                                            {product.freeInstallments === product.installments ? (
                                                <Typography className='flex flex-row !text-[.84rem] text-neutral-600'>em <Box className='text-black ml-1'>{product.freeInstallments}x de {Number((Number(product.price) / Number(product.installments)) || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</Box>
                                                </Typography>
                                            ) : (
                                                <Typography className='flex flex-row !text-[.84rem] text-neutral-600'>
                                                    em <Box className='text-[#00a650] ml-1'>{product.freeInstallments}x sem juros de {Number((Number(product.price) / Number(product.installments)) || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</Box>
                                                </Typography>
                                            )}
                                            {product.freeShipping && (
                                                <Typography className='flex flex-row !text-[.84rem] text-[#00a650] !mt-4 !font-semibold'>
                                                    Frete grátis
                                                </Typography>
                                            )}
                                            <Typography className='flex flex-row !text-[.84rem] !mt-4 text-neutral-500'>
                                                Enviado por: {product.shippingType || 'Logística própria'}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Button>
                            ))
                        ) : (
                            <Box className='w-full flex justify-center mt-20'>
                                <Box className='flex flex-col items-center'>
                                    <CiShoppingBasket size={100}/>
                                    <Typography className='text-[#282929] !mt-5'>
                                        {searchText ? (
                                            <>
                                            Nenhum resultado encontrado para a busca: "<strong>{searchText}</strong>".
                                            </>
                                        ) : (
                                            'Nenhum produto encontrado.'
                                        )}
                                    </Typography>
                                    <Box className="flex flex-col mt-5">
                                        <Typography>No momento, não temos produtos disponíveis. 
                                        Tente novamente mais tarde ou explore outras opções.</Typography>
                                    </Box>
                                </Box>
                            </Box>
                        )}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}

function ImageCarousel({ images }: { images: Array<{ image: string }> }) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const nextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentImageIndex(
            (prevIndex) => (prevIndex - 1 + images.length) % images.length
        );
    };

    return (
        <Box className="relative">
            <img
                src={images[currentImageIndex]?.image}
                alt={`Imagem do produto`}
                className="w-full h-[200px] object-cover rounded-lg"
            />
            <Box className="absolute top-16 left-0 right-0 flex justify-between">
                <Button onClick={prevImage}
                    className='!min-w-[2rem] h-[4rem] !rounded-r-lg !rounded-l-none !shadow-md'
                    sx={{
                        color: '#4b5563',
                        fontWeight: 'normal',
                        padding: 0,
                        transition: 'transform 0.3s, background-color 0.3s, color 0.3s',
                        '&:hover': {
                            background: '#ffffffae',
                            color: '#ff0336',
                        },
                    }}
                >
                    <IoIosArrowBack />
                </Button>
                <Button onClick={nextImage}
                    className='!min-w-[2rem] h-[4rem] !rounded-l-lg !rounded-r-none !shadow-md'
                    sx={{
                        color: '#4b5563',
                        fontWeight: 'normal',
                        padding: 0,
                        transition: 'transform 0.3s, background-color 0.3s, color 0.3s',
                        '&:hover': {
                            background: '#ffffffae',
                            color: '#ff0336',
                        },
                    }}
                >
                    <IoIosArrowForward />
                </Button>
            </Box>
        </Box>
    );
}
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Button, Divider, Drawer, Typography } from "@mui/material";
import { Key, useEffect } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import { TbArrowLeft, TbEdit } from "react-icons/tb";
import { DrawerProps } from "../../../../../../../common/types";
import { FormatDateTime } from "../../../../../../../common/utils";
import { RulesAccessMapper, RulesFrequencyMapper } from "../../../../../components/Badges/PaymentBadge";
import { usePlanAlterForm } from "../../../../../hooks";

export const GymPlansDetails = ({
    closeDrawer,
    enqueueSnackbar,
    data,
    initialStep = 0,
    refresh,
    onBack,
}: DrawerProps) => {

    const {
        formData,
        renderDrawerContent,
        setActiveStep,
        isDrawerOpen,
        openDrawer,
        closeDrawerDetails,
        daysOfWeek
    } = usePlanAlterForm({ closeDrawer, enqueueSnackbar, data, refresh });

    useEffect(() => {
        setActiveStep(initialStep);
    }, [initialStep, setActiveStep]);

    return (
        <>
            <Drawer
                disableEnforceFocus
                anchor="right"
                open={isDrawerOpen}
                onClose={closeDrawerDetails}
                PaperProps={{
                    className: "w-[60%] p-8"
                }}
            >
                {renderDrawerContent()}
            </Drawer>

            <Box className='overflow-x-auto max-h-[calc(100vh-60px)] p-5 pb-[4rem]'>
                <Box className='flex flex-row w-full'>
                    <Box className='bg-white w-full rounded-3xl shadow-md p-5 border border-[#EAECF0]'>
                        <Box className='flex flex-row justify-between items-center'>
                            <Box>
                                <Typography className="flex flex-row items-center !text-[2.25rem] text-[#212121]">
                                    <Button
                                        variant="text"
                                        className='!text-[#212121] flex flex-row items-center font-poppins !min-w-12 !mx-1 !rounded-full !min-h-12 hover:!bg-[#f3f3f3] !mr-3 !text-[1.6rem]'
                                        onClick={onBack} // Chamará o método `handleBackToTable`
                                    >
                                        <TbArrowLeft />
                                    </Button>
                                    Plano<Box className='whitespace-nowrap overflow-hidden text-ellipsis max-w-[27vw] ml-3'> {data.findPlans.name}</Box>
                                </Typography>
                                <Typography className="flex flex-row items-center !text-[.85rem] !mt-4">
                                Administrativo
                                <MdKeyboardArrowRight className='mx-1.5'/>
                                Planos
                                <MdKeyboardArrowRight className='mx-1.5'/>
                                Mais detalhes
                                </Typography>
                            </Box>
                            <Box>
                                <Typography className='flex flex-row items-center !text-[.85rem] !mt-4'>
                                    Código: PLN-{data.findPlans.planCode}
                                </Typography>
                            </Box>
                        </Box>
                        <Divider className='!my-5 w-full bg-[#e2e2e4]' />
                        <Box className='mt-5 border border-neutral-300 rounded-lg p-5'>
                            <Box className='!text-neutral20 !font-roboto !text-base !font-semibold !flex !items-center !gap-4'>Detalhes do plano
                                <Button
                                    className='!min-w-5 !mr-5'
                                    sx={{
                                        color: '#4b5563',
                                        fontWeight: 'normal',
                                        padding: 0,
                                        transition: 'transform 0.3s, background-color 0.3s, color 0.3s,',
                                        '&:hover': {
                                            background: 'white',
                                            color: '#ff0336',
                                        },
                                    }}
                                    onClick={() => openDrawer('PlanDetails', 0)}
                                >
                                    <TbEdit size={24} />
                                </Button>
                            </Box>
                                    <>
                                        <Box className='grid grid-cols-[10rem,1fr]'>
                                            <Typography className='!text-neutral-700 !font-roboto !text-sm !mt-4'>Nome</Typography>
                                            <Typography className='!text-neutral-700 !font-roboto !text-sm !mt-4 !font-semibold'>{data?.findPlans.name || ''}</Typography>
                                        </Box>
                                        <Box className='grid grid-cols-[10rem,1fr]'>
                                            <Typography className='!text-neutral-700 !font-roboto !text-sm !mt-4'>Início da Vigência</Typography>
                                            <Typography className='!text-neutral-700 !font-roboto !text-sm !mt-4 !font-semibold'>{data?.findPlans.startDate ? FormatDateTime(data.findPlans.startDate) : ''}</Typography>
                                        </Box>
                                        <Box className='grid grid-cols-[10rem,1fr]'>
                                            <Typography className='!text-neutral-700 !font-roboto !text-sm !mt-4'>Fim da Vigência</Typography>
                                            <Typography className='!text-neutral-700 !font-roboto !text-sm !mt-4 !font-semibold'>{data?.findPlans.endDate ? FormatDateTime(data.findPlans.endDate) : ''}</Typography>
                                        </Box>
                                        <Box className='grid grid-cols-[10rem,1fr]'>
                                            <Typography className='!text-neutral-700 !font-roboto !text-sm !mt-4'>Observações</Typography>
                                            <Typography className='!text-neutral-700 !font-roboto !text-sm !mt-4 !font-semibold'>{data?.findPlans.observation || ''}</Typography>
                                        </Box>
                                    </>
                        </Box>

                        <Box className='mt-5 border border-neutral-300 rounded-lg p-5'>
                            <Box className='!text-neutral20 !font-roboto !text-base !font-semibold !flex !items-center !gap-4 mb-5'>Regras
                                <Button
                                    className='!min-w-5 !mr-5'
                                    sx={{
                                        color: '#4b5563',
                                        fontWeight: 'normal',
                                        padding: 0,
                                        transition: 'transform 0.3s, background-color 0.3s, color 0.3s,',
                                        '&:hover': {
                                            background: 'white',
                                            color: '#ff0336',
                                        },
                                    }}
                                    onClick={() => openDrawer('PlanDetails', 1)}
                                >
                                    <TbEdit size={24} />
                                </Button>
                            </Box>
                                    <>
                                        <Box className='grid grid-cols-[10rem,1fr]'>
                                            <Typography className='!text-neutral-700 !font-roboto !text-sm'>Frequência</Typography>
                                            <Typography className='!text-neutral-700 !font-roboto !text-sm !font-semibold'><RulesFrequencyMapper rules={{ frequency: data?.findPlans?.frequency || '' }} />
                                            </Typography>
                                        </Box>
                                        <Box className='grid grid-cols-[10rem,1fr]'>
                                            <Typography className='!text-neutral-700 !font-roboto !text-sm !mt-4'>Acesso</Typography>
                                            <Typography className='!text-neutral-700 !font-roboto !text-sm !mt-4 !font-semibold'><RulesAccessMapper rules={{ access: data?.findPlans?.access || '' }} /></Typography>
                                        </Box>
                                        <Box className='grid grid-cols-[10rem,1fr]'>
                                            <Typography className='!text-neutral-700 !font-roboto !text-sm !mt-4'>Horário para acesso</Typography>
                                            <Typography className='!text-neutral-700 !font-roboto !text-sm !mt-4 !font-semibold'>{data?.findPlans.hours === 'FULL_DAY' ? 'Qualquer horário' : 'Definido por dia'}</Typography>
                                        </Box>
                                        {data?.findPlans.hours === 'CUSTOM' && (
                                            <Box className="flex flex-wrap justify-between mt-2">
                                                {daysOfWeek.map(({ key, label }) => (
                                                <Box key={key} className="bg-[#F3F3F4] md:w-[24%] w-full rounded-lg p-5 pt-[14px] mt-3">
                                                    <Typography className="!text-neutral-700 !font-roboto !text-sm !mt-4 uppercase">{label}</Typography>
                                                    <Divider className="!my-3" />
                                                    {(formData[key] as string[]).map((slot, index) => (
                                                    <>
                                                        <Box key={index} className='flex flex-row items-center justify-between'>
                                                        <Typography className="!text-neutral-700 !font-roboto !text-sm !mt-[.1rem] !font-semibold">{slot}</Typography>
                                                        </Box>
                                                        <Divider className="!my-3" />
                                                    </>
                                                    ))}
                                                </Box>
                                                ))}
                                            </Box>
                                        )}
                                    </>
                        </Box>

                        <Box className='mt-5 border border-neutral-300 rounded-lg p-5'>
                            <Box className='!text-neutral20 !font-roboto !text-base !font-semibold !flex !items-center !gap-4 mb-5'>Modalidades
                                <Button
                                    className='!min-w-5 !mr-5'
                                    sx={{
                                        color: '#4b5563',
                                        fontWeight: 'normal',
                                        padding: 0,
                                        transition: 'transform 0.3s, background-color 0.3s, color 0.3s,',
                                        '&:hover': {
                                            background: 'white',
                                            color: '#ff0336',
                                        },
                                    }}
                                    onClick={() => openDrawer('PlanDetails', 2)}
                                >
                                    <TbEdit size={24} />
                                </Button>
                            </Box>
                                    <>
                                        <Box className="flex flex-wrap justify-between">
                                            {Array.isArray(data?.findPlans?.modalities) && data.findPlans.modalities.length > 0 ? (
                                                data.findPlans.modalities.map((modality: { name: any; description: any; amount: number | bigint | null; }, index: Key | null | undefined) => (
                                                    <Box
                                                            key={index}
                                                            className="bg-[#F3F3F4] md:w-[49%] w-full rounded-lg p-5 pt-[14px] grid grid-cols-[5.5rem,1fr]"
                                                        >
                                                        <Typography className="!text-neutral-700 !font-roboto !text-sm !mt-4">Nome</Typography>
                                                        <Typography className="!text-neutral-700 !font-roboto !text-sm !mt-4 !font-semibold">
                                                            {modality.name || ''}
                                                        </Typography>
                                                        <Typography className="!text-neutral-700 !font-roboto !text-sm !mt-4">Descrição</Typography>
                                                        <Typography className="!text-neutral-700 !font-roboto !text-sm !mt-4 !font-semibold">
                                                            {modality.description || ''}
                                                        </Typography>
                                                        <Typography className="!text-neutral-700 !font-roboto !text-sm !mt-4">Valor</Typography>
                                                        <Typography className="!text-neutral-700 !font-roboto !text-sm !mt-4 !font-semibold">
                                                            {modality.amount !== null ? `${new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(modality.amount)}` : ''}
                                                        </Typography>
                                                    </Box>
                                                ))
                                            ) : (
                                                <Typography className="!text-neutral-700 !font-roboto !text-sm">Nenhuma modalidade cadastrada.</Typography>
                                            )}
                                        </Box>
                                    </>
                        </Box>

                        <Box className='mt-5 border border-neutral-300 rounded-lg p-5'>
                            <Box className='!text-neutral20 !font-roboto !text-base !font-semibold !flex !items-center !gap-4 mb-5'>Serviços Personalizados
                                <Button
                                    className='!min-w-5 !mr-5'
                                    sx={{
                                        color: '#4b5563',
                                        fontWeight: 'normal',
                                        padding: 0,
                                        transition: 'transform 0.3s, background-color 0.3s, color 0.3s,',
                                        '&:hover': {
                                            background: 'white',
                                            color: '#ff0336',
                                        },
                                    }}
                                    onClick={() => openDrawer('PlanDetails', 3)}
                                >
                                    <TbEdit size={24} />
                                </Button>
                            </Box>
                                    <>
                                        <Box className="flex flex-wrap justify-between">
                                            {Array.isArray(data?.findPlans?.customServices) && data.findPlans.customServices.length > 0 ? (
                                                data.findPlans.customServices.map((customServices: { name: any; description: any; amount: number | bigint | null; }, index: Key | null | undefined) => (
                                                    <Box
                                                            key={index}
                                                            className="bg-[#F3F3F4] md:w-[49%] w-full rounded-lg p-5 pt-[14px] grid grid-cols-[5.5rem,1fr]"
                                                        >
                                                        <Typography className="!text-neutral-700 !font-roboto !text-sm !mt-4">Nome</Typography>
                                                        <Typography className="!text-neutral-700 !font-roboto !text-sm !mt-4 !font-semibold">
                                                            {customServices.name || ''}
                                                        </Typography>
                                                        <Typography className="!text-neutral-700 !font-roboto !text-sm !mt-4">Descrição</Typography>
                                                        <Typography className="!text-neutral-700 !font-roboto !text-sm !mt-4 !font-semibold">
                                                            {customServices.description || ''}
                                                        </Typography>
                                                        <Typography className="!text-neutral-700 !font-roboto !text-sm !mt-4">Valor</Typography>
                                                        <Typography className="!text-neutral-700 !font-roboto !text-sm !mt-4 !font-semibold">
                                                            {customServices.amount !== null ? `${new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(customServices.amount)}` : ''}
                                                        </Typography>
                                                    </Box>
                                                ))
                                            ) : (
                                                <Typography className="!text-neutral-700 !font-roboto !text-sm">Nenhum serviço personalizado cadastrado.</Typography>
                                            )}
                                        </Box>
                                    </>
                        </Box>

                        <Box className='mt-5 border border-neutral-300 rounded-lg p-5'>
                            <Box className='!text-neutral20 !font-roboto !text-base !font-semibold !flex !items-center !gap-4 mb-5'>Periodicidades e Taxas
                                <Button
                                    className='!min-w-5 !mr-5'
                                    sx={{
                                        color: '#4b5563',
                                        fontWeight: 'normal',
                                        padding: 0,
                                        transition: 'transform 0.3s, background-color 0.3s, color 0.3s,',
                                        '&:hover': {
                                            background: 'white',
                                            color: '#ff0336',
                                        },
                                    }}
                                    onClick={() => openDrawer('PlanDetails', 4)}
                                >
                                    <TbEdit size={24} />
                                </Button>
                            </Box>
                                    <>
                                    <Box className="flex flex-wrap justify-between">
                                        {Array.isArray(data?.findPlans?.periodicities) && data.findPlans.periodicities.length > 0 ? (
                                            data.findPlans.periodicities.map((periodicity: { amount: string | number | undefined; name: string; charge: null; fees: null; startDate: string; endDate: string; observation: any; }, index: Key | null | undefined) => {
                                                const parseToFloat = (value: string | number | undefined): number => {
                                                    if (typeof value === 'number') return value;
                                                    if (!value) return 0;
                                                    return parseFloat(value.replace('.', '').replace(',', '.'));
                                                };
                                            
                                                // Calcula o total de amount de modalities
                                                const totalModalityAmount = data.findPlans.modalities
                                                    .map((modality: { amount: string | number | undefined; }) => parseToFloat(modality.amount))
                                                    .reduce((sum: any, value: any) => sum + value, 0);
                                            
                                                // Calcula o total de amount de customServices
                                                const totalCustomServiceAmount = data.findPlans.customServices
                                                    .map((service: { amount: string | number | undefined; }) => parseToFloat(service.amount))
                                                    .reduce((sum: any, value: any) => sum + value, 0);
                                            
                                                // Subtrai os valores do amount da periodicity
                                                const adjustedAmount = parseToFloat(periodicity.amount) - (totalModalityAmount + totalCustomServiceAmount);
                                            
                                                // Formata o valor para exibição no formato brasileiro
                                                const formatToBRL = (value: number): string => {
                                                    return value.toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.');
                                                };

                                            return (
                                                <Box
                                                key={index}
                                                className="bg-[#F3F3F4] md:w-[49%] w-full rounded-lg p-5 pt-[14px] grid grid-cols-[11rem,1fr]"
                                                >
                                                <Typography className="!text-neutral-700 !font-roboto !text-sm !mt-4">
                                                    Periodicidade
                                                </Typography>
                                                <Typography className="!text-neutral-700 !font-roboto !text-sm !mt-4 !font-semibold">
                                                    {periodicity.name || ''}
                                                </Typography>
                                                <Typography className="!text-neutral-700 !font-roboto !text-sm !mt-4">
                                                    {isNaN(Number(periodicity.name.charAt(0)))
                                                    ? `Valor ${periodicity.name}`
                                                    : `Valor a cada ${periodicity.name}`}
                                                </Typography>
                                                <Typography className="!text-neutral-700 !font-roboto !text-sm !mt-4 !font-semibold">
                                                    R$ {adjustedAmount > 0 ? formatToBRL(adjustedAmount) : '0,00'}
                                                </Typography>
                                                <Typography className="!text-neutral-700 !font-roboto !text-sm !mt-4">
                                                    Taxa de Matrícula
                                                </Typography>
                                                <Typography className="!text-neutral-700 !font-roboto !text-sm !mt-4 !font-semibold">
                                                    {periodicity.charge !== null ? `R$ ${periodicity.charge}` : ''}
                                                </Typography>
                                                <Typography className="!text-neutral-700 !font-roboto !text-sm !mt-4">
                                                    Juros por Atraso
                                                </Typography>
                                                <Typography className="!text-neutral-700 !font-roboto !text-sm !mt-4 !font-semibold">
                                                    {periodicity.fees !== null
                                                    ? data.findPlans.calculationBase === 'VALUE'
                                                        ? `R$ ${periodicity.fees}`
                                                        : `${periodicity.fees} %`
                                                    : ''}
                                                </Typography>
                                                <Typography className="!text-neutral-700 !font-roboto !text-sm !mt-4">
                                                    Início da Vigência
                                                </Typography>
                                                <Typography className="!text-neutral-700 !font-roboto !text-sm !mt-4 !font-semibold">
                                                    {periodicity.startDate ? FormatDateTime(periodicity.startDate) : ''}
                                                </Typography>
                                                <Typography className="!text-neutral-700 !font-roboto !text-sm !mt-4">
                                                    Fim da Vigência
                                                </Typography>
                                                <Typography className="!text-neutral-700 !font-roboto !text-sm !mt-4 !font-semibold">
                                                    {periodicity.endDate ? FormatDateTime(periodicity.endDate) : ''}
                                                </Typography>
                                                <Typography className="!text-neutral-700 !font-roboto !text-sm !mt-4">
                                                    Observações
                                                </Typography>
                                                <Typography className="!text-neutral-700 !font-roboto !text-sm !mt-4 !font-semibold">
                                                    {periodicity.observation || ''}
                                                </Typography>
                                                </Box>
                                            );
                                            })
                                        ) : (
                                            <Typography className="!text-neutral-700 !font-roboto !text-sm !mt-5">
                                            Nenhum serviço personalizado cadastrado.
                                            </Typography>
                                        )}
                                        </Box>
                                    </>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    );
}

import { Box, Typography } from "@mui/material";
import { BsCardChecklist } from "react-icons/bs";
import { FaMapMarkedAlt, FaRegCheckCircle } from "react-icons/fa";
import { MdMiscellaneousServices } from "react-icons/md";
import { PiBarbellBold } from "react-icons/pi";
import { TbClock24 } from "react-icons/tb";
import { StepIconsTypes } from "../../../../pages/sign-up/gym/types";

const steps = [
    { name: 'Expediente', icon: TbClock24 },
    { name: 'Endereço', icon: FaMapMarkedAlt },
    { name: 'Formas de Trabalho', icon: BsCardChecklist },
    { name: 'Modalidades', icon: PiBarbellBold },
    { name: 'Serviços & Segmentos', icon: MdMiscellaneousServices },
    { name: 'Cadastro Concluído', icon: FaRegCheckCircle },
];

export const HeaderStepIcons = ({ currentStep }: StepIconsTypes) => (
    <Box className='flex flex-row pb-5 mb-5 justify-center items-center mt-5'>
        <Box className='flex flex-row items-start'>
            {steps.map((step, index) => {
                const isActive = index + 0 === currentStep;
                const isCompleted = index + 0 < currentStep;
                const IconComponent = step.icon;

                return (
                    <Box key={step.name} className='flex flex-col items-center w-[130px]'>
                        <Box className='flex flex-row items-center w-full'>
                            <Box className={`h-[2px] w-full ${index !== 0 ? (isCompleted || isActive ? 'bg-secondary' : 'bg-[#bcbec0]') : ''}`}></Box>
                            <Box className={`rounded-full ${isActive ? 'bg-secondary shadow-[#ff02289a] shadow-md' : isCompleted ? '' : ''}`}>
                                <IconComponent className={`p-[9px] w-[40px] h-[40px] ${isActive ? 'text-white' : isCompleted ? 'color-primary' : 'text-[#939598]'}`} />
                            </Box>
                            <Box className={`h-[2px] w-full ${index !== steps.length - 1 ? (isCompleted || isActive ? 'bg-secondary' : 'bg-[#bcbec0]') : ''}`}></Box>
                        </Box>
                        <Typography className={`!flex !flex-col !text-[15px] !mt-3 !w-[145px] !text-center ${isActive || isCompleted ? 'color-primary' : 'text-[#939598]'}`}>
                            {step.name}
                        </Typography>
                    </Box>
                );
            })}
        </Box>
    </Box>
);

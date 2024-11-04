import { FaMapMarkedAlt, FaRegCheckCircle } from "react-icons/fa";
import { FaCalendarDays } from "react-icons/fa6";
import { MdMiscellaneousServices } from "react-icons/md";
import { PiBarbellBold } from "react-icons/pi";
import { TbClock24 } from "react-icons/tb";
import { StepIconsTypes } from "../../types";

const steps = [
    { name: 'Expediente', icon: TbClock24 },
    { name: 'Endereço', icon: FaMapMarkedAlt },
    { name: 'Planos de Frequência', icon: FaCalendarDays },
    { name: 'Modalidades', icon: PiBarbellBold },
    { name: 'Serviços & Segmentos', icon: MdMiscellaneousServices },
    { name: 'Cadastro Concluído', icon: FaRegCheckCircle },
];

export const StepIcons = ({ currentStep }: StepIconsTypes) => (
    <div className='flex flex-row pb-5 mb-5 justify-center items-center mt-5'>
        <div className='flex flex-row items-start'>
            {steps.map((step, index) => {
                const isActive = index + 1 === currentStep;
                const isCompleted = index + 1 < currentStep;
                const IconComponent = step.icon;

                return (
                    <div key={step.name} className='flex flex-col items-center w-[130px]'>
                        <div className='flex flex-row items-center w-full'>
                            <span className={`h-[2px] w-full ${index !== 0 ? (isCompleted || isActive ? 'bg-primary' : 'bg-[#bcbec0]') : ''}`}></span>
                            <div className={`rounded-full ${isActive ? 'bg-primary shadow-[#ff02289a] shadow-md' : isCompleted ? '' : ''}`}>
                                <IconComponent className={`p-[9px] w-[40px] h-[40px] ${isActive ? 'text-white' : isCompleted ? 'color-primary' : 'text-[#939598]'}`} />
                            </div>
                            <span className={`h-[2px] w-full ${index !== steps.length - 1 ? (isCompleted || isActive ? 'bg-primary' : 'bg-[#bcbec0]') : ''}`}></span>
                        </div>
                        <h1 className={`flex flex-col text-[15px] mt-3 w-[145px] text-center ${isActive || isCompleted ? 'color-primary' : 'text-[#939598]'}`}>
                            {step.name}
                        </h1>
                    </div>
                );
            })}
        </div>
    </div>
);

import { Box } from "@mui/material";
import { iconMap } from "../../../../common/ui/Icons/IconsMap";
import { PaymentMapper } from "../../../../common/ui/types/PaymentMapper.type";
import { StatusMapper } from "../../../../common/ui/types/StatusMapper.type";

interface PaymentBadgeProps {
    payment: string;
}

interface StatusBadgeProps {
    status: string;
}

export const PaymentBadge: React.FC<PaymentBadgeProps> = ({ payment }) => {
    const paymentInfo = PaymentMapper[payment] || {
        label: payment,
        color: '#7f8c8d',
    };

    const Icon = iconMap[paymentInfo.icon];

    return (
        <Box
            className='rounded-lg px-3 py-[.2rem] text-white border inline-flex flex-row items-center'
            style={{
                color: paymentInfo.color,
                backgroundColor: paymentInfo.backgroundColor,
                borderColor: paymentInfo.color,
            }}
        >
            <Icon
                className="w-[1rem] h-[1rem] mr-1.5"
                style={{
                    color: paymentInfo.color
                }}
            />
            {paymentInfo.label}
        </Box>
    );
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
    const paymentInfo = StatusMapper[status] || {
        label: status,
        color: '#7f8c8d',
    };

    return (
        <Box
            className='rounded-lg px-3 py-[.2rem] text-white border inline-flex flex-row items-center font-semibold'
            style={{
                color: paymentInfo.color,
                backgroundColor: paymentInfo.backgroundColor,
            }}
        >{paymentInfo.label}</Box>
    );
};

export const StatusInternalBadge: React.FC<StatusBadgeProps> = ({ status }) => {
    const paymentInfo = StatusMapper[status] || {
        label: status,
        color: '#7f8c8d',
    };

    return (
        <Box
            className='rounded-md px-3 text-white border inline-flex flex-row items-center font-semibold mr-2'
            style={{
                color: paymentInfo.color,
                backgroundColor: paymentInfo.backgroundColor,
            }}
        >{paymentInfo.label}</Box>
    );
};

export const PaymentTypeBadge: React.FC<PaymentBadgeProps> = ({ payment }) => {
    const paymentInfo = PaymentMapper[payment] || {
        label: payment,
        color: '#7f8c8d',
    };

    const Icon = iconMap[paymentInfo.icon];

    return (
        <Box
            className='flex flex-row items-center'
        >
            <Icon
                className="w-[3rem] h-[3rem] mr-3 rounded-lg p-2.5"
                style={{
                    color: paymentInfo.color,
                    backgroundColor: paymentInfo.backgroundColor,
                    borderColor: paymentInfo.color,
                }}
            />
            {paymentInfo.label}
        </Box>
    );
};

export const PaymentNameBadge: React.FC<PaymentBadgeProps> = ({ payment }) => {
    const paymentInfo = PaymentMapper[payment] || {
        label: payment,
        color: '#7f8c8d',
    };

    return (
        <>
            {paymentInfo.label}
        </>
    );
};

const frequencyLabels: Record<string, string> = {
    ALL: 'Todos os dias da semana',
    ONE: '1 dia da semana',
    TWO: '2 dias da semana',
    THREE: '3 dias da semana',
    FOUR: '4 dias da semana',
    FIVE: '5 dias da semana',
    SIX: '6 dias da semana',
};

export const RulesFrequencyMapper: React.FC<{ rules: { frequency: string } }> = ({ rules }) => {
    const label = frequencyLabels[rules.frequency] || 'Frequência não especificada';
  
    return (
        <>
        {label}
        </>
    );
  };

  const accessLabels: Record<string, string> = {
    ALL: 'Ilimitado',
    ONE: '1 vez no mesmo dia',
    TWO: '2 vezes no mesmo dia',
    THREE: '3 vezes no mesmo dia',
    FOUR: '4 vezes no mesmo dia',
    FIVE: '5 vezes no mesmo dia',
    SIX: '6 vezes no mesmo dia',
};

export const RulesAccessMapper: React.FC<{ rules: { access: string } }> = ({ rules }) => {
    const label = accessLabels[rules.access] || 'Acesso não especificado';
  
    return (
        <>
        {label}
        </>
    );
  };
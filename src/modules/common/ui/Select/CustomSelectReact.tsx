import { StylesConfig } from "react-select";
import { OptionSelect } from "../types";

export const customStyles: StylesConfig<OptionSelect, true> = {
    control: (provided, state) => ({
        ...provided,
        minHeight: '56px',
        fontFamily: 'Poppins, sans-serif',
        borderColor: state.isFocused ? '#ff0336' : provided.borderColor,
        '&:hover': {
            borderColor: '#ff0336',
        },
        boxShadow: state.isFocused ? '0 0 0 1px #ff0336' : provided.boxShadow,
    }),
    menu: (provided) => ({
        ...provided,
        fontFamily: 'Poppins, sans-serif',
    }),
    option: (provided, state) => {
        const backgroundColor = state.isDisabled
            ? '#1976d214' // fundo transparente quando desabilitado
            : state.isSelected
            ? '#ff0336' // fundo selecionado
            : provided.backgroundColor; // fundo padrão quando não está nem desabilitado nem selecionado

        return {
            ...provided,
            fontFamily: 'Poppins, sans-serif',
            backgroundColor, // Aplica o background conforme o estado
            color: state.isDisabled ? '' : provided.color,
            opacity: state.isDisabled ? 0.38 : 1,
            '&:hover': !state.isDisabled && {
                backgroundColor: '#ff0336', // Altera o fundo ao passar o mouse, mas apenas se não estiver desabilitado
                color: 'white',
                cursor: 'pointer',
            },
        };
    },
    multiValueRemove: (provided) => ({
        ...provided,
        '&:hover': {
            backgroundColor: '#ff03353b', // Fundo ao passar o mouse
            color: '#ff0336', // Cor do "X" ao passar o mouse
        },
    }),
    clearIndicator: (provided) => ({
        ...provided,
        '&:hover': {
            color: '#ff0336', // Cor do "X" geral quando passa o mouse
            cursor: 'pointer'
        },
    }),
};

export const customNoOptionsMessage = () => "Ops! Não encontramos o que você procurou.";
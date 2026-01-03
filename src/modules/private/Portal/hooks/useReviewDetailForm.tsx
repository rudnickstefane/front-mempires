
export const useReviewDetailForm = () => {
    const protocolsOptions = [
        { value: 'noSelect', label: 'Selecione um protocolo', isDisabled: true },
        { value: 'JPW78807', label: 'Jackson, Pollock e Ward (1978 e 1980) - 7 dobras' },
        { value: 'JPW78803', label: 'Jackson, Pollock e Ward (1978 e 1980) - 3 dobras' },
        { value: 'P954', label: 'Petroski (1995) - 4 dobras' },
        { value: 'G853', label: 'Guedes (1985) - 3 dobras' },
        { value: 'G943', label: 'Guedes (1994) - 3 dobras' },
        { value: 'F684', label: 'Faulkner (1968) - 4 dobras' },
        { value: 'DR674', label: 'Durnin e Rahaman (1967) - 4 dobras' },
        { value: 'L964', label: 'Lean et al. (1996) - 4 dobras' },
        { value: 'T847', label: 'Thorland (1984) - 7 dobras' },
        { value: 'T843', label: 'Thorland (1984) - 3 dobras' },
        { value: 'W88PO', label: 'Wetman et al. (1988) - Pessoas Obesas' },
    ];

    const protocolsOptionsCardio = [
        { value: 'noSelect', label: 'Selecione um protocolo', isDisabled: true },
        { value: 'COO12', label: 'Cooper - 12 minutos' },
        { value: 'M1609', label: '1 Milha - 1609 metros' },
    ];

    // Função para obter a classificação do IMC
    const getReviewClassification = (imc: number, age: number, gender?: string, type?: string) => {
        if ((age >= 20 && age <= 64) && type === 'IMC_IAC') {
            // Mantém as classificações atuais
            if (imc < 17) return "Muito Abaixo do Peso";
            if (imc >= 17 && imc < 18.5) return "Abaixo do Peso";
            if (imc >= 18.5 && imc < 25) return "Peso Normal";
            if (imc >= 25 && imc < 30) return "Sobrepeso";
            if (imc >= 30 && imc < 35) return "Obesidade Grau I";
            if (imc >= 35 && imc < 40) return "Obesidade Grau II";
            return "Obesidade Mórbida";
        }
    
        if ((age >= 65) && type === 'IMC_IAC') {
            // Idosos (65+ anos)
            if (imc < 22) return "Abaixo do Peso";
            if (imc >= 22 && imc < 27) return "Peso Normal";
            return "Sobrepeso";
        }

        if ((age === 0 && gender === 'MAN') && type === 'IMC_IAC') {
            // Homens
            if (imc < 8) return "Abaixo do Peso";
            if (imc >= 8 && imc < 20) return "Peso Normal";
            if (imc >= 20 && imc < 25) return "Sobrepeso";
            return "Obesidade";
        }

        if ((age === 1 && gender === 'WOMAN') && type === 'IMC_IAC') {
            // Mulheres
            if (imc < 21) return "Abaixo do Peso";
            if (imc >= 21 && imc < 33) return "Peso Normal";
            if (imc >= 33 && imc < 38) return "Sobrepeso";
            return "Obesidade";
        }

        if (age === 2 && type === 'IMC_IAC') {
            // Geral
            if (imc < 8) return "Abaixo do Peso";
            if (imc >= 8 && imc < 32) return "Peso Normal";
            if (imc >= 32 && imc < 38) return "Sobrepeso";
            return "Obesidade";
        }
    
        if ((age <= 19 && gender === 'MAN') && type === 'IMC_IAC') {
            // Menores de 19 anos
            if (imc < 14.4) return "Abaixo do Peso";
            if (imc >= 14.4 && imc < 21.8) return "Peso Normal";
            return "Sobrepeso";
        }

        if ((age <= 19 && gender === 'WOMAN') && type === 'IMC_IAC') {
            // Menores de 19 anos
            if (imc < 14.2) return "Abaixo do Peso";
            if (imc >= 14.2 && imc < 20.8) return "Peso Normal";
            return "Sobrepeso";
        }

        if (type === 'RCQ_ALL') {
            if (imc < 0.71) return "Risco Baixo";
            if (imc >= 0.71 && imc < 0.96) return "Risco Moderado";
            if (imc >= 0.96 && imc < 1.03) return "Risco Alto";
            return "Risco Muito Alto";
        }
        
        if (type === 'RCQ_MAN_60_69') {
            if (imc < 0.91) return "Risco Baixo";
            if (imc >= 0.91 && imc < 0.99) return "Risco Moderado";
            if (imc >= 0.99 && imc < 1.03) return "Risco Alto";
            return "Risco Muito Alto";
        }
        
        if (type === 'RCQ_MAN_50_59') {
            if (imc < 0.90) return "Risco Baixo";
            if (imc >= 0.90 && imc < 0.97) return "Risco Moderado";
            if (imc >= 0.97 && imc < 1.02) return "Risco Alto";
            return "Risco Muito Alto";
        }
        
        if (type === 'RCQ_MAN_40_49') {
            if (imc < 0.88) return "Risco Baixo";
            if (imc >= 0.88 && imc < 0.96) return "Risco Moderado";
            if (imc >= 0.96 && imc < 1.00) return "Risco Alto";
            return "Risco Muito Alto";
        }
        
        if (type === 'RCQ_MAN_30_39') {
            if (imc < 0.84) return "Risco Baixo";
            if (imc >= 0.84 && imc < 0.92) return "Risco Moderado";
            if (imc >= 0.92 && imc < 0.96) return "Risco Alto";
            return "Risco Muito Alto";
        }
        
        if (type === 'RCQ_MAN_20_29') {
            if (imc < 0.83) return "Risco Baixo";
            if (imc >= 0.83 && imc < 0.89) return "Risco Moderado";
            if (imc >= 0.89 && imc < 0.94) return "Risco Alto";
            return "Risco Muito Alto";
        }
        
        if (type === 'RCQ_WOMAN_60_69') {
            if (imc < 0.76) return "Risco Baixo";
            if (imc >= 0.76 && imc < 0.84) return "Risco Moderado";
            if (imc >= 0.84 && imc < 0.90) return "Risco Alto";
            return "Risco Muito Alto";
        }
        
        if (type === 'RCQ_WOMAN_50_59') {
            if (imc < 0.74) return "Risco Baixo";
            if (imc >= 0.74 && imc < 0.82) return "Risco Moderado";
            if (imc >= 0.82 && imc < 0.88) return "Risco Alto";
            return "Risco Muito Alto";
        }

        if (type === 'RCQ_WOMAN_40_49') {
            if (imc < 0.73) return "Risco Baixo";
            if (imc >= 0.73 && imc < 0.80) return "Risco Moderado";
            if (imc >= 0.80 && imc < 0.87) return "Risco Alto";
            return "Risco Muito Alto";
        }

        if (type === 'RCQ_WOMAN_30_39') {
            if (imc < 0.72) return "Risco Baixo";
            if (imc >= 0.72 && imc < 0.79) return "Risco Moderado";
            if (imc >= 0.79 && imc < 0.84) return "Risco Alto";
            return "Risco Muito Alto";
        }

        if (type === 'RCQ_WOMAN_20_29') {
            if (imc < 0.71) return "Risco Baixo";
            if (imc >= 0.71 && imc < 0.78) return "Risco Moderado";
            if (imc >= 0.78 && imc < 0.82) return "Risco Alto";
            return "Risco Muito Alto";
        }

        if (age < 20 && type === 'CMG_ALL_20') {
            if (imc < 5) return "Muito Baixo";
            if (imc >= 5 && imc < 16) return "Baixo";
            if (imc >= 16 && imc < 26) return "Ótimo";
            if (imc >= 26 && imc < 31) return "Moderadamente Alto";
            if (imc >= 31 && imc < 37) return "Alto";
            return "Muito Alto";
        }
        
        if (age >= 20 && age <= 29 && type === 'CMG_ALL_20_29') {
            if (imc < 11) return "Excelente (Atlético)";
            if (imc >= 11 && imc < 20) return "Bom";
            if (imc >= 20 && imc < 29) return "Dentro da Média";
            if (imc >= 29 && imc < 32) return "Regular";
            return "Alto Percentual";
        }
        
        if (age >= 30 && age <= 39 && type === 'CMG_ALL_30_39') {
            if (imc < 12) return "Excelente (Atlético)";
            if (imc >= 12 && imc < 21) return "Bom";
            if (imc >= 21 && imc < 30) return "Dentro da Média";
            if (imc >= 30 && imc < 33) return "Regular";
            return "Alto Percentual";
        }
        
        if (age >= 40 && age <= 49 && type === 'CMG_ALL_40_49') {
            if (imc < 14) return "Excelente (Atlético)";
            if (imc >= 14 && imc < 22) return "Bom";
            if (imc >= 22 && imc < 31) return "Dentro da Média";
            if (imc >= 31 && imc < 34) return "Regular";
            return "Alto Percentual";
        }
        
        if (age >= 50 && age <= 59 && type === 'CMG_ALL_50_59') {
            if (imc < 15) return "Excelente (Atlético)";
            if (imc >= 15 && imc < 23) return "Bom";
            if (imc >= 23 && imc < 32) return "Dentro da Média";
            if (imc >= 32 && imc < 35) return "Regular";
            return "Alto Percentual";
        }
        
        if (age > 59 && type === 'CMG_ALL_59') {
            if (imc < 16) return "Excelente (Atlético)";
            if (imc >= 16 && imc < 24) return "Bom";
            if (imc >= 24 && imc < 33) return "Dentro da Média";
            if (imc >= 33 && imc < 36) return "Regular";
            return "Alto Percentual";
        }

        if (age < 20 && type === 'CMG_MAN_20') {
            if (imc < 5) return "Muito Baixo";
            if (imc >= 5 && imc < 11) return "Baixo";
            if (imc >= 11 && imc < 21) return "Ótimo";
            if (imc >= 21 && imc < 26) return "Moderadamente Alto";
            if (imc >= 26 && imc < 32) return "Alto";
            return "Muito Alto";
        }
        
        if (age >= 20 && age <= 29 && type === 'CMG_MAN_20_29') {
            if (imc < 11) return "Excelente (Atlético)";
            if (imc >= 11 && imc < 14) return "Bom";
            if (imc >= 14 && imc < 21) return "Dentro da Média";
            if (imc >= 21 && imc < 24) return "Regular";
            return "Alto Percentual";
        }
        
        if (age >= 30 && age <= 39 && type === 'CMG_MAN_30_39') {
            if (imc < 12) return "Excelente (Atlético)";
            if (imc >= 12 && imc < 15) return "Bom";
            if (imc >= 15 && imc < 22) return "Dentro da Média";
            if (imc >= 22 && imc < 25) return "Regular";
            return "Alto Percentual";
        }
        
        if (age >= 40 && age <= 49 && type === 'CMG_MAN_40_49') {
            if (imc < 14) return "Excelente (Atlético)";
            if (imc >= 14 && imc < 17) return "Bom";
            if (imc >= 17 && imc < 24) return "Dentro da Média";
            if (imc >= 24 && imc < 27) return "Regular";
            return "Alto Percentual";
        }
        
        if (age >= 50 && age <= 59 && type === 'CMG_MAN_50_59') {
            if (imc < 15) return "Excelente (Atlético)";
            if (imc >= 15 && imc < 18) return "Bom";
            if (imc >= 18 && imc < 25) return "Dentro da Média";
            if (imc >= 25 && imc < 28) return "Regular";
            return "Alto Percentual";
        }
        
        if (age > 59 && type === 'CMG_MAN_59') {
            if (imc < 16) return "Excelente (Atlético)";
            if (imc >= 16 && imc < 19) return "Bom";
            if (imc >= 19 && imc < 26) return "Dentro da Média";
            if (imc >= 26 && imc < 29) return "Regular";
            return "Alto Percentual";
        }

        if (age < 20 && type === 'CMG_WOMAN_20') {
            if (imc < 12) return "Muito Baixo";
            if (imc >= 12 && imc < 16) return "Baixo";
            if (imc >= 16 && imc < 26) return "Ótimo";
            if (imc >= 26 && imc < 31) return "Moderadamente Alto";
            if (imc >= 31 && imc < 37) return "Alto";
            return "Muito Alto";
        }
        
        if (age >= 20 && age <= 29 && type === 'CMG_WOMAN_20_29') {
            if (imc < 16) return "Excelente (Atlético)";
            if (imc >= 16 && imc < 20) return "Bom";
            if (imc >= 20 && imc < 29) return "Dentro da Média";
            if (imc >= 29 && imc < 32) return "Regular";
            return "Alto Percentual";
        }
        
        if (age >= 30 && age <= 39 && type === 'CMG_WOMAN_30_39') {
            if (imc < 17) return "Excelente (Atlético)";
            if (imc >= 17 && imc < 21) return "Bom";
            if (imc >= 21 && imc < 30) return "Dentro da Média";
            if (imc >= 30 && imc < 33) return "Regular";
            return "Alto Percentual";
        }
        
        if (age >= 40 && age <= 49 && type === 'CMG_WOMAN_40_49') {
            if (imc < 18) return "Excelente (Atlético)";
            if (imc >= 18 && imc < 22) return "Bom";
            if (imc >= 22 && imc < 31) return "Dentro da Média";
            if (imc >= 31 && imc < 34) return "Regular";
            return "Alto Percentual";
        }
        
        if (age >= 50 && age <= 59 && type === 'CMG_WOMAN_50_59') {
            if (imc < 19) return "Excelente (Atlético)";
            if (imc >= 19 && imc < 23) return "Bom";
            if (imc >= 23 && imc < 32) return "Dentro da Média";
            if (imc >= 32 && imc < 35) return "Regular";
            return "Alto Percentual";
        }
        
        if (age > 59 && type === 'CMG_WOMAN_59') {
            if (imc < 20) return "Excelente (Atlético)";
            if (imc >= 20 && imc < 24) return "Bom";
            if (imc >= 24 && imc < 33) return "Dentro da Média";
            if (imc >= 33 && imc < 36) return "Regular";
            return "Alto Percentual";
        }

        if (age >= 20 && age <= 29 && type === 'CR_ALL_20_29') {
            if (imc < 24) return "Muito Fraca";
            if (imc >= 25 && imc < 34) return "Fraca";
            if (imc >= 34 && imc < 43) return "Regular";
            if (imc >= 43 && imc < 53) return "Boa";
            return "Excelente";
        }
        
        if (age >= 30 && age <= 39 && type === 'CR_ALL_30_39') {
            if (imc < 20) return "Muito Fraca";
            if (imc >= 23 && imc < 31) return "Fraca";
            if (imc >= 31 && imc < 39) return "Regular";
            if (imc >= 39 && imc < 49) return "Boa";
            return "Excelente";
        }
        
        if (age >= 40 && age <= 49 && type === 'CR_ALL_40_49') {
            if (imc < 17) return "Muito Fraca";
            if (imc >= 20 && imc < 27) return "Fraca";
            if (imc >= 27 && imc < 36) return "Regular";
            if (imc >= 36 && imc < 45) return "Boa";
            return "Excelente";
        }
        
        if (age >= 50 && age <= 59 && type === 'CR_ALL_50_59') {
            if (imc < 15) return "Muito Fraca";
            if (imc >= 18 && imc < 25) return "Fraca";
            if (imc >= 25 && imc < 34) return "Regular";
            if (imc >= 34 && imc < 43) return "Boa";
            return "Excelente";
        }
        
        if (age >= 60 && age <= 69 && type === 'CR_ALL_60_69') {
            if (imc < 13) return "Muito Fraca";
            if (imc >= 16 && imc < 23) return "Fraca";
            if (imc >= 23 && imc < 31) return "Regular";
            if (imc >= 31 && imc < 41) return "Boa";
            return "Excelente";
        }

        if (age >= 20 && age <= 29 && type === 'CR_MAN_20_29') {
            if (imc < 25) return "Muito Fraca";
            if (imc >= 25 && imc < 34) return "Fraca";
            if (imc >= 34 && imc < 43) return "Regular";
            if (imc >= 43 && imc < 53) return "Boa";
            return "Excelente";
        }
        
        if (age >= 30 && age <= 39 && type === 'CR_MAN_30_39') {
            if (imc < 23) return "Muito Fraca";
            if (imc >= 23 && imc < 31) return "Fraca";
            if (imc >= 31 && imc < 39) return "Regular";
            if (imc >= 39 && imc < 49) return "Boa";
            return "Excelente";
        }
        
        if (age >= 40 && age <= 49 && type === 'CR_MAN_40_49') {
            if (imc < 20) return "Muito Fraca";
            if (imc >= 20 && imc < 27) return "Fraca";
            if (imc >= 27 && imc < 36) return "Regular";
            if (imc >= 36 && imc < 45) return "Boa";
            return "Excelente";
        }
        
        if (age >= 50 && age <= 59 && type === 'CR_MAN_50_59') {
            if (imc < 18) return "Muito Fraca";
            if (imc >= 18 && imc < 25) return "Fraca";
            if (imc >= 25 && imc < 34) return "Regular";
            if (imc >= 34 && imc < 43) return "Boa";
            return "Excelente";
        }
        
        if (age >= 60 && age <= 69 && type === 'CR_MAN_60_69') {
            if (imc < 16) return "Muito Fraca";
            if (imc >= 16 && imc < 23) return "Fraca";
            if (imc >= 23 && imc < 31) return "Regular";
            if (imc >= 31 && imc < 41) return "Boa";
            return "Excelente";
        }

        if (age >= 20 && age <= 29 && type === 'CR_WOMAN_20_29') {
            if (imc < 24) return "Muito Fraca";
            if (imc >= 24 && imc < 31) return "Fraca";
            if (imc >= 31 && imc < 38) return "Regular";
            if (imc >= 38 && imc < 49) return "Boa";
            return "Excelente";
        }
        
        if (age >= 30 && age <= 39 && type === 'CR_WOMAN_30_39') {
            if (imc < 20) return "Muito Fraca";
            if (imc >= 20 && imc < 28) return "Fraca";
            if (imc >= 28 && imc < 34) return "Regular";
            if (imc >= 34 && imc < 45) return "Boa";
            return "Excelente";
        }
        
        if (age >= 40 && age <= 49 && type === 'CR_WOMAN_40_49') {
            if (imc < 17) return "Muito Fraca";
            if (imc >= 17 && imc < 24) return "Fraca";
            if (imc >= 24 && imc < 31) return "Regular";
            if (imc >= 31 && imc < 42) return "Boa";
            return "Excelente";
        }
        
        if (age >= 50 && age <= 59 && type === 'CR_WOMAN_50_59') {
            if (imc < 15) return "Muito Fraca";
            if (imc >= 15 && imc < 21) return "Fraca";
            if (imc >= 21 && imc < 28) return "Regular";
            if (imc >= 28 && imc < 38) return "Boa";
            return "Excelente";
        }
        
        if (age >= 60 && age <= 69 && type === 'CR_WOMAN_60_69') {
            if (imc < 13) return "Muito Fraca";
            if (imc >= 13 && imc < 18) return "Fraca";
            if (imc >= 18 && imc < 24) return "Regular";
            if (imc >= 24 && imc < 35) return "Boa";
            return "Excelente";
        }

        if (age >= 20 && age <= 29 && type === 'FB_ALL_20_29') {
            if (imc < 10) return "Muito Fraco";
            if (imc >= 10 && imc < 22) return "Fraco";
            if (imc >= 22 && imc < 29) return "Bom";
            if (imc >= 29 && imc < 36) return "Muito Bom";
            return "Excelente";
        }
        
        if (age >= 30 && age <= 39 && type === 'FB_ALL_30_39') {
            if (imc < 7) return "Muito Fraco";
            if (imc >= 7 && imc < 17) return "Fraco";
            if (imc >= 17 && imc < 22) return "Bom";
            if (imc >= 22 && imc < 30) return "Muito Bom";
            return "Excelente";
        }
        
        if (age >= 40 && age <= 49 && type === 'FB_ALL_40_49') {
            if (imc < 5) return "Muito Fraco";
            if (imc >= 5 && imc < 13) return "Fraco";
            if (imc >= 13 && imc < 17) return "Bom";
            if (imc >= 17 && imc < 25) return "Muito Bom";
            return "Excelente";
        }
        
        if (age >= 50 && age <= 59 && type === 'FB_ALL_50_59') {
            if (imc < 2) return "Muito Fraco";
            if (imc >= 2 && imc < 10) return "Fraco";
            if (imc >= 10 && imc < 13) return "Bom";
            if (imc >= 13 && imc < 21) return "Muito Bom";
            return "Excelente";
        }
        
        if (age >= 60 && age <= 69 && type === 'FB_ALL_60_69') {
            if (imc < 2) return "Muito Fraco";
            if (imc >= 2 && imc < 8) return "Fraco";
            if (imc >= 8 && imc < 11) return "Bom";
            if (imc >= 11 && imc < 18) return "Muito Bom";
            return "Excelente";
        }

        if (age >= 20 && age <= 29 && type === 'FB_MAN_20_29') {
            if (imc < 17) return "Muito Fraco";
            if (imc >= 17 && imc < 22) return "Fraco";
            if (imc >= 22 && imc < 29) return "Bom";
            if (imc >= 29 && imc < 36) return "Muito Bom";
            return "Excelente";
        }
        
        if (age >= 30 && age <= 39 && type === 'FB_MAN_30_39') {
            if (imc < 12) return "Muito Fraco";
            if (imc >= 12 && imc < 17) return "Fraco";
            if (imc >= 17 && imc < 22) return "Bom";
            if (imc >= 22 && imc < 30) return "Muito Bom";
            return "Excelente";
        }
        
        if (age >= 40 && age <= 49 && type === 'FB_MAN_40_49') {
            if (imc < 10) return "Muito Fraco";
            if (imc >= 10 && imc < 13) return "Fraco";
            if (imc >= 13 && imc < 17) return "Bom";
            if (imc >= 17 && imc < 25) return "Muito Bom";
            return "Excelente";
        }
        
        if (age >= 50 && age <= 59 && type === 'FB_MAN_50_59') {
            if (imc < 7) return "Muito Fraco";
            if (imc >= 7 && imc < 10) return "Fraco";
            if (imc >= 10 && imc < 13) return "Bom";
            if (imc >= 13 && imc < 21) return "Muito Bom";
            return "Excelente";
        }
        
        if (age >= 60 && age <= 69 && type === 'FB_MAN_60_69') {
            if (imc < 5) return "Muito Fraco";
            if (imc >= 5 && imc < 8) return "Fraco";
            if (imc >= 8 && imc < 11) return "Bom";
            if (imc >= 11 && imc < 18) return "Muito Bom";
            return "Excelente";
        }

        if (age >= 20 && age <= 29 && type === 'FB_WOMAN_20_29') {
            if (imc < 10) return "Muito Fraco";
            if (imc >= 10 && imc < 15) return "Fraco";
            if (imc >= 15 && imc < 21) return "Bom";
            if (imc >= 21 && imc < 30) return "Muito Bom";
            return "Excelente";
        }
        
        if (age >= 30 && age <= 39 && type === 'FB_WOMAN_30_39') {
            if (imc < 7) return "Muito Fraco";
            if (imc >= 7 && imc < 13) return "Fraco";
            if (imc >= 13 && imc < 20) return "Bom";
            if (imc >= 20 && imc < 27) return "Muito Bom";
            return "Excelente";
        }
        
        if (age >= 40 && age <= 49 && type === 'FB_WOMAN_40_49') {
            if (imc < 5) return "Muito Fraco";
            if (imc >= 5 && imc < 11) return "Fraco";
            if (imc >= 11 && imc < 15) return "Bom";
            if (imc >= 15 && imc < 24) return "Muito Bom";
            return "Excelente";
        }
        
        if (age >= 50 && age <= 59 && type === 'FB_WOMAN_50_59') {
            if (imc < 2) return "Muito Fraco";
            if (imc >= 2 && imc < 7) return "Fraco";
            if (imc >= 7 && imc < 11) return "Bom";
            if (imc >= 11 && imc < 21) return "Muito Bom";
            return "Excelente";
        }
        
        if (age >= 60 && age <= 69 && type === 'FB_WOMAN_60_69') {
            if (imc < 2) return "Muito Fraco";
            if (imc >= 2 && imc < 5) return "Fraco";
            if (imc >= 5 && imc < 12) return "Bom";
            if (imc >= 12 && imc < 17) return "Muito Bom";
            return "Excelente";
        }

        if (age >= 15 && age <= 19 && type === 'RA_ALL_15_19') {
            if (imc < 12) return "Muito Fraco";
            if (imc >= 12 && imc < 23) return "Fraco";
            if (imc >= 23 && imc < 29) return "Bom";
            if (imc >= 29 && imc < 39) return "Muito Bom";
            return "Excelente";
        }
        
        if (age >= 20 && age <= 29 && type === 'RA_ALL_20_29') {
            if (imc < 10) return "Muito Fraco";
            if (imc >= 10 && imc < 22) return "Fraco";
            if (imc >= 22 && imc < 29) return "Bom";
            if (imc >= 29 && imc < 36) return "Muito Bom";
            return "Excelente";
        }
        
        if (age >= 30 && age <= 39 && type === 'RA_ALL_30_39') {
            if (imc < 8) return "Muito Fraco";
            if (imc >= 8 && imc < 17) return "Fraco";
            if (imc >= 17 && imc < 22) return "Bom";
            if (imc >= 22 && imc < 30) return "Muito Bom";
            return "Excelente";
        }
        
        if (age >= 40 && age <= 49 && type === 'RA_ALL_40_49') {
            if (imc < 5) return "Muito Fraco";
            if (imc >= 5 && imc < 13) return "Fraco";
            if (imc >= 13 && imc < 17) return "Bom";
            if (imc >= 17 && imc < 22) return "Muito Bom";
            return "Excelente";
        }
        
        if (age >= 50 && age <= 59 && type === 'RA_ALL_50_59') {
            if (imc < 2) return "Muito Fraco";
            if (imc >= 2 && imc < 10) return "Fraco";
            if (imc >= 10 && imc < 13) return "Bom";
            if (imc >= 13 && imc < 21) return "Muito Bom";
            return "Excelente";
        }
        
        if (age >= 60 && age <= 69 && type === 'RA_ALL_60_69') {
            if (imc < 1) return "Muito Fraco";
            if (imc >= 2 && imc < 8) return "Fraco";
            if (imc >= 8 && imc < 11) return "Bom";
            if (imc >= 11 && imc < 18) return "Muito Bom";
            return "Excelente";
        }
        
        if (age >= 15 && age <= 19 && type === 'RA_MAN_15_19') {
            if (imc < 18) return "Muito Fraco";
            if (imc >= 18 && imc < 23) return "Fraco";
            if (imc >= 23 && imc < 29) return "Bom";
            if (imc >= 29 && imc < 39) return "Muito Bom";
            return "Excelente";
        }
        
        if (age >= 20 && age <= 29 && type === 'RA_MAN_20_29') {
            if (imc < 17) return "Muito Fraco";
            if (imc >= 17 && imc < 22) return "Fraco";
            if (imc >= 22 && imc < 29) return "Bom";
            if (imc >= 29 && imc < 36) return "Muito Bom";
            return "Excelente";
        }
        
        if (age >= 30 && age <= 39 && type === 'RA_MAN_30_39') {
            if (imc < 12) return "Muito Fraco";
            if (imc >= 12 && imc < 17) return "Fraco";
            if (imc >= 17 && imc < 22) return "Bom";
            if (imc >= 22 && imc < 30) return "Muito Bom";
            return "Excelente";
        }
        
        if (age >= 40 && age <= 49 && type === 'RA_MAN_40_49') {
            if (imc < 10) return "Muito Fraco";
            if (imc >= 10 && imc < 13) return "Fraco";
            if (imc >= 13 && imc < 17) return "Bom";
            if (imc >= 17 && imc < 22) return "Muito Bom";
            return "Excelente";
        }
        
        if (age >= 50 && age <= 59 && type === 'RA_MAN_50_59') {
            if (imc < 7) return "Muito Fraco";
            if (imc >= 7 && imc < 10) return "Fraco";
            if (imc >= 10 && imc < 13) return "Bom";
            if (imc >= 13 && imc < 21) return "Muito Bom";
            return "Excelente";
        }
        
        if (age >= 60 && age <= 69 && type === 'RA_MAN_60_69') {
            if (imc < 5) return "Muito Fraco";
            if (imc >= 5 && imc < 8) return "Fraco";
            if (imc >= 8 && imc < 11) return "Bom";
            if (imc >= 11 && imc < 18) return "Muito Bom";
            return "Excelente";
        }
        
        if (age >= 15 && age <= 19 && type === 'RA_WOMAN_15_19') {
            if (imc < 12) return "Muito Fraco";
            if (imc >= 12 && imc < 18) return "Fraco";
            if (imc >= 18 && imc < 25) return "Bom";
            if (imc >= 25 && imc < 33) return "Muito Bom";
            return "Excelente";
        }
        
        if (age >= 20 && age <= 29 && type === 'RA_WOMAN_20_29') {
            if (imc < 10) return "Muito Fraco";
            if (imc >= 10 && imc < 15) return "Fraco";
            if (imc >= 15 && imc < 21) return "Bom";
            if (imc >= 21 && imc < 30) return "Muito Bom";
            return "Excelente";
        }
        
        if (age >= 30 && age <= 39 && type === 'RA_WOMAN_30_39') {
            if (imc < 8) return "Muito Fraco";
            if (imc >= 8 && imc < 13) return "Fraco";
            if (imc >= 13 && imc < 20) return "Bom";
            if (imc >= 20 && imc < 27) return "Muito Bom";
            return "Excelente";
        }
        
        if (age >= 40 && age <= 49 && type === 'RA_WOMAN_40_49') {
            if (imc < 5) return "Muito Fraco";
            if (imc >= 5 && imc < 11) return "Fraco";
            if (imc >= 11 && imc < 15) return "Bom";
            if (imc >= 15 && imc < 24) return "Muito Bom";
            return "Excelente";
        }
        
        if (age >= 50 && age <= 59 && type === 'RA_WOMAN_50_59') {
            if (imc < 2) return "Muito Fraco";
            if (imc >= 2 && imc < 7) return "Fraco";
            if (imc >= 7 && imc < 11) return "Bom";
            if (imc >= 11 && imc < 21) return "Muito Bom";
            return "Excelente";
        }
        
        if (age >= 60 && age <= 69 && type === 'RA_WOMAN_60_69') {
            if (imc < 1) return "Muito Fraco";
            if (imc >= 1 && imc < 5) return "Fraco";
            if (imc >= 5 && imc < 12) return "Bom";
            if (imc >= 12 && imc < 17) return "Muito Bom";
            return "Excelente";
        }

        if (age >= 20 && age <= 29 && type === 'SA_ALL_20_29') {
            if (imc < 25) return "Muito Fraco";
            if (imc >= 25 && imc < 33) return "Fraco";
            if (imc >= 33 && imc < 37) return "Bom";
            if (imc >= 37 && imc < 41) return "Muito Bom";
            return "Excelente";
        }
        
        if (age >= 30 && age <= 39 && type === 'SA_ALL_30_39') {
            if (imc < 23) return "Muito Fraco";
            if (imc >= 23 && imc < 32) return "Fraco";
            if (imc >= 32 && imc < 36) return "Bom";
            if (imc >= 36 && imc < 41) return "Muito Bom";
            return "Excelente";
        }
        
        if (age >= 40 && age <= 49 && type === 'SA_ALL_40_49') {
            if (imc < 18) return "Muito Fraco";
            if (imc >= 18 && imc < 30) return "Fraco";
            if (imc >= 30 && imc < 17) return "Bom";
            if (imc >= 34 && imc < 38) return "Muito Bom";
            return "Excelente";
        }
        
        if (age >= 50 && age <= 59 && type === 'SA_ALL_50_59') {
            if (imc < 16) return "Muito Fraco";
            if (imc >= 16 && imc < 30) return "Fraco";
            if (imc >= 30 && imc < 33) return "Bom";
            if (imc >= 33 && imc < 39) return "Muito Bom";
            return "Excelente";
        }
        
        if (age >= 60 && age <= 69 && type === 'SA_ALL_60_69') {
            if (imc < 15) return "Muito Fraco";
            if (imc >= 15 && imc < 27) return "Fraco";
            if (imc >= 27 && imc < 31) return "Bom";
            if (imc >= 31 && imc < 35) return "Muito Bom";
            return "Excelente";
        }
        
        if (age >= 20 && age <= 29 && type === 'SA_MAN_20_29') {
            if (imc < 25) return "Muito Fraco";
            if (imc >= 25 && imc < 30) return "Fraco";
            if (imc >= 30 && imc < 34) return "Bom";
            if (imc >= 34 && imc < 40) return "Muito Bom";
            return "Excelente";
        }
        
        if (age >= 30 && age <= 39 && type === 'SA_MAN_30_39') {
            if (imc < 23) return "Muito Fraco";
            if (imc >= 23 && imc < 28) return "Fraco";
            if (imc >= 28 && imc < 33) return "Bom";
            if (imc >= 33 && imc < 38) return "Muito Bom";
            return "Excelente";
        }
        
        if (age >= 40 && age <= 49 && type === 'SA_MAN_40_49') {
            if (imc < 18) return "Muito Fraco";
            if (imc >= 18 && imc < 24) return "Fraco";
            if (imc >= 24 && imc < 29) return "Bom";
            if (imc >= 29 && imc < 35) return "Muito Bom";
            return "Excelente";
        }
        
        if (age >= 50 && age <= 59 && type === 'SA_MAN_50_59') {
            if (imc < 16) return "Muito Fraco";
            if (imc >= 16 && imc < 24) return "Fraco";
            if (imc >= 24 && imc < 28) return "Bom";
            if (imc >= 28 && imc < 35) return "Muito Bom";
            return "Excelente";
        }
        
        if (age >= 60 && age <= 69 && type === 'SA_MAN_60_69') {
            if (imc < 15) return "Muito Fraco";
            if (imc >= 15 && imc < 20) return "Fraco";
            if (imc >= 20 && imc < 25) return "Bom";
            if (imc >= 25 && imc < 33) return "Muito Bom";
            return "Excelente";
        }
        
        if (age >= 20 && age <= 29 && type === 'SA_WOMAN_20_29') {
            if (imc < 28) return "Muito Fraco";
            if (imc >= 28 && imc < 33) return "Fraco";
            if (imc >= 33 && imc < 37) return "Bom";
            if (imc >= 37 && imc < 41) return "Muito Bom";
            return "Excelente";
        }
        
        if (age >= 30 && age <= 39 && type === 'SA_WOMAN_30_39') {
            if (imc < 27) return "Muito Fraco";
            if (imc >= 27 && imc < 32) return "Fraco";
            if (imc >= 32 && imc < 36) return "Bom";
            if (imc >= 36 && imc < 41) return "Muito Bom";
            return "Excelente";
        }
        
        if (age >= 40 && age <= 49 && type === 'SA_WOMAN_40_49') {
            if (imc < 25) return "Muito Fraco";
            if (imc >= 25 && imc < 30) return "Fraco";
            if (imc >= 30 && imc < 17) return "Bom";
            if (imc >= 34 && imc < 38) return "Muito Bom";
            return "Excelente";
        }
        
        if (age >= 50 && age <= 59 && type === 'SA_WOMAN_50_59') {
            if (imc < 25) return "Muito Fraco";
            if (imc >= 25 && imc < 30) return "Fraco";
            if (imc >= 30 && imc < 33) return "Bom";
            if (imc >= 33 && imc < 39) return "Muito Bom";
            return "Excelente";
        }
        
        if (age >= 60 && age <= 69 && type === 'SA_WOMAN_60_69') {
            if (imc < 23) return "Muito Fraco";
            if (imc >= 23 && imc < 27) return "Fraco";
            if (imc >= 27 && imc < 31) return "Bom";
            if (imc >= 31 && imc < 35) return "Muito Bom";
            return "Excelente";
        }
    };

    const getImcRanges = (type: string,) => {
        if (type === 'CMG_ALL_20') {
            return [
                { value: 0, position: 2, color: "#FFD700" },
                { value: 5, position: 17.4, color: "#FFC107" },
                { value: 16, position: 33.7, color: "#4CAF50" },
                { value: 26, position: 50.2, color: "#FF9800" },
                { value: 31, position: 67, color: "#FF5722" },
                { value: 37, position: 84, color: "#D32F2F" },
                { value: 100.0, position: 99, color: "#D32F2F" }
            ];
        }

        if (type === 'CMG_ALL_20_29') {
            return [
                { value: 0, position: 2, color: "#224e23" },
                { value: 11, position: 20.5, color: "#337535" },
                { value: 20, position: 40.5, color: "#4CAF50" },
                { value: 29, position: 60.5, color: "#FF9800" },
                { value: 32, position: 80.5, color: "#FF5722" },
                { value: 100.0, position: 99, color: "#FF5722" }
            ];
        }
        
        if (type === 'CMG_ALL_30_39') {
            return [
                { value: 0, position: 2, color: "#224e23" },
                { value: 12, position: 20.5, color: "#337535" },
                { value: 21, position: 40.5, color: "#4CAF50" },
                { value: 30, position: 60.5, color: "#FF9800" },
                { value: 33, position: 80.5, color: "#FF5722" },
                { value: 100.0, position: 99, color: "#FF5722" }
            ];
        }
        
        if (type === 'CMG_ALL_40_49') {
            return [
                { value: 0, position: 2, color: "#224e23" },
                { value: 14, position: 20.5, color: "#337535" },
                { value: 22, position: 40.5, color: "#4CAF50" },
                { value: 31, position: 60.5, color: "#FF9800" },
                { value: 34, position: 80.5, color: "#FF5722" },
                { value: 100.0, position: 99, color: "#FF5722" }
            ];
        }
        
        if (type === 'CMG_ALL_50_59') {
            return [
                { value: 0, position: 2, color: "#224e23" },
                { value: 15, position: 20.5, color: "#337535" },
                { value: 23, position: 40.5, color: "#4CAF50" },
                { value: 32, position: 60.5, color: "#FF9800" },
                { value: 35, position: 80.5, color: "#FF5722" },
                { value: 100.0, position: 99, color: "#FF5722" }
            ];
        }
        
        if (type === 'CMG_ALL_59') {
            return [
                { value: 0, position: 2, color: "#224e23" },
                { value: 16, position: 20.5, color: "#337535" },
                { value: 24, position: 40.5, color: "#4CAF50" },
                { value: 33, position: 60.5, color: "#FF9800" },
                { value: 36, position: 80.5, color: "#FF5722" },
                { value: 100.0, position: 99, color: "#FF5722" }
            ];
        }

        if (type === 'CMG_MAN_20') {
            return [
                { value: 0, position: 2, color: "#FFD700" },
                { value: 5, position: 17.4, color: "#FFC107" },
                { value: 11, position: 33.7, color: "#4CAF50" },
                { value: 21, position: 50.2, color: "#FF9800" },
                { value: 26, position: 67, color: "#FF5722" },
                { value: 32, position: 84, color: "#D32F2F" },
                { value: 100.0, position: 99, color: "#D32F2F" }
            ];
        }

        if (type === 'CMG_MAN_20_29') {
            return [
                { value: 0, position: 2, color: "#224e23" },
                { value: 11, position: 20.5, color: "#337535" },
                { value: 14, position: 40.5, color: "#4CAF50" },
                { value: 21, position: 60.5, color: "#FF9800" },
                { value: 24, position: 80.5, color: "#FF5722" },
                { value: 100.0, position: 99, color: "#FF5722" }
            ];
        }
        
        if (type === 'CMG_MAN_30_39') {
            return [
                { value: 0, position: 2, color: "#224e23" },
                { value: 12, position: 20.5, color: "#337535" },
                { value: 15, position: 40.5, color: "#4CAF50" },
                { value: 22, position: 60.5, color: "#FF9800" },
                { value: 25, position: 80.5, color: "#FF5722" },
                { value: 100.0, position: 99, color: "#FF5722" }
            ];
        }
        
        if (type === 'CMG_MAN_40_49') {
            return [
                { value: 0, position: 2, color: "#224e23" },
                { value: 14, position: 20.5, color: "#337535" },
                { value: 17, position: 40.5, color: "#4CAF50" },
                { value: 24, position: 60.5, color: "#FF9800" },
                { value: 27, position: 80.5, color: "#FF5722" },
                { value: 100.0, position: 99, color: "#FF5722" }
            ];
        }
        
        if (type === 'CMG_MAN_50_59') {
            return [
                { value: 0, position: 2, color: "#224e23" },
                { value: 15, position: 20.5, color: "#337535" },
                { value: 18, position: 40.5, color: "#4CAF50" },
                { value: 25, position: 60.5, color: "#FF9800" },
                { value: 28, position: 80.5, color: "#FF5722" },
                { value: 100.0, position: 99, color: "#FF5722" }
            ];
        }
        
        if (type === 'CMG_MAN_59') {
            return [
                { value: 0, position: 2, color: "#224e23" },
                { value: 16, position: 20.5, color: "#337535" },
                { value: 19, position: 40.5, color: "#4CAF50" },
                { value: 26, position: 60.5, color: "#FF9800" },
                { value: 29, position: 80.5, color: "#FF5722" },
                { value: 100.0, position: 99, color: "#FF5722" }
            ];
        }

        if (type === 'CMG_WOMAN_20') {
            return [
                { value: 0, position: 2, color: "#FFD700" },
                { value: 12, position: 17.4, color: "#FFC107" },
                { value: 16, position: 33.7, color: "#4CAF50" },
                { value: 26, position: 50.2, color: "#FF9800" },
                { value: 31, position: 67, color: "#FF5722" },
                { value: 37, position: 84, color: "#D32F2F" },
                { value: 100.0, position: 99, color: "#D32F2F" }
            ];
        }
        
        if (type === 'CMG_WOMAN_20_29') {
            return [
                { value: 0, position: 2, color: "#224e23" },
                { value: 16, position: 20.5, color: "#337535" },
                { value: 20, position: 40.5, color: "#4CAF50" },
                { value: 29, position: 60.5, color: "#FF9800" },
                { value: 32, position: 80.5, color: "#FF5722" },
                { value: 100.0, position: 99, color: "#FF5722" }
            ];
        }
        
        if (type === 'CMG_WOMAN_30_39') {
            return [
                { value: 0, position: 2, color: "#224e23" },
                { value: 17, position: 20.5, color: "#337535" },
                { value: 21, position: 40.5, color: "#4CAF50" },
                { value: 30, position: 60.5, color: "#FF9800" },
                { value: 33, position: 80.5, color: "#FF5722" },
                { value: 100.0, position: 99, color: "#FF5722" }
            ];
        }
        
        if (type === 'CMG_WOMAN_40_49') {
            return [
                { value: 0, position: 2, color: "#224e23" },
                { value: 18, position: 20.5, color: "#337535" },
                { value: 22, position: 40.5, color: "#4CAF50" },
                { value: 31, position: 60.5, color: "#FF9800" },
                { value: 34, position: 80.5, color: "#FF5722" },
                { value: 100.0, position: 99, color: "#FF5722" }
            ];
        }
        
        if (type === 'CMG_WOMAN_50_59') {
            return [
                { value: 0, position: 2, color: "#224e23" },
                { value: 19, position: 20.5, color: "#337535" },
                { value: 23, position: 40.5, color: "#4CAF50" },
                { value: 32, position: 60.5, color: "#FF9800" },
                { value: 35, position: 80.5, color: "#FF5722" },
                { value: 100.0, position: 99, color: "#FF5722" }
            ];
        }
        
        if (type === 'CMG_WOMAN_59') {
            return [
                { value: 0, position: 2, color: "#224e23" },
                { value: 20, position: 20.5, color: "#337535" },
                { value: 24, position: 40.5, color: "#4CAF50" },
                { value: 33, position: 60.5, color: "#FF9800" },
                { value: 36, position: 80.5, color: "#FF5722" },
                { value: 100.0, position: 99, color: "#FF5722" }
            ];
        }

        if (type === 'IMC_ALL') {
            return [
                { value: 0, position: 2, color: "#FFD700" }, // Muito Abaixo do Peso
                { value: 17.0, position: 10.5, color: "#FFC107" },  // Abaixo do Peso
                { value: 18.5, position: 20.5, color: "#4CAF50" }, // Peso Normal
                { value: 25.0, position: 47.5, color: "#FF9800" }, // Sobrepeso
                { value: 30.0, position: 62.5, color: "#FF5722" }, // Obesidade Grau I
                { value: 35.0, position: 77.5, color: "#D32F2F" }, // Obesidade Grau III
                { value: 40.0, position: 87.5, color: "#B71C1C" }, // Obesidade Mórbida	
                { value: 100.0, position: 99, color: "#B71C1C" }
            ];
        }

        if (type === 'IMC_ELDERLY') {
            return [
                { value: 0, position: 2, color: "#FFC107" },
                { value: 22.0, position: 30, color: "#4CAF50" }, // Peso Normal para idosos
                { value: 27.0, position: 63, color: "#FF9800" }, // Sobrepeso para idosos
                { value: 100.0, position: 99, color: "#FF9800" }
            ];
        }
    
        if (type === 'IMC_WOMAN') {
            return [
                { value: 0, position: 2, color: "#FFC107" },
                { value: 14.2, position: 34, color: "#4CAF50" }, // Peso Normal para meninas
                { value: 30.7, position: 67, color: "#FF9800" }, // Sobrepeso para meninas
                { value: 100.0, position: 99, color: "#FF9800" }
            ];
        }
    
        if (type === 'IMC_MAN') {
            return [
                { value: 0, position: 2, color: "#FFC107" },
                { value: 14.4, position: 34, color: "#4CAF50" }, // Peso Normal para meninos
                { value: 30.6, position: 67, color: "#FF9800" }, // Sobrepeso para meninos
                { value: 100.0, position: 99, color: "#FF9800" }
            ];
        }

        if (type === 'IAC_MAN') {
            return [
                { value: 0, position: 2, color: "#FFC107" },
                { value: 8, position: 25.6, color: "#4CAF50" }, // Peso Normal
                { value: 20, position: 50.5, color: "#FF9800" }, // Sobrepeso
                { value: 25, position: 75.2, color: "#FF5722" }, 
                { value: 100, position: 99, color: "#FF5722" }
            ];
        }

        if (type === 'IAC_WOMAN') {
            return [
                { value: 0, position: 2, color: "#FFC107" },
                { value: 21, position: 25.6, color: "#4CAF50" }, // Peso Normal
                { value: 33, position: 50.5, color: "#FF9800" }, // Sobrepeso
                { value: 38, position: 75.2, color: "#FF5722" }, 
                { value: 100, position: 99, color: "#FF5722" }
            ];
        }

        if (type === 'IAC_ALL') {
            return [
                { value: 0, position: 2, color: "#FFC107" },
                { value: 8, position: 25.6, color: "#4CAF50" }, // Peso Normal
                { value: 32, position: 50.5, color: "#FF9800" }, // Sobrepeso
                { value: 38, position: 75.2, color: "#FF5722" }, 
                { value: 100, position: 99, color: "#FF5722" }
            ];
        }

        if (type === 'RCQ_ALL') {
            return [
                { value: 0, position: 2, color: "#4CAF50" },
                { value: 0.71, position: 25.5, color: "#FF9800" }, // Risco Baixo
                { value: 0.96, position: 50.5, color: "#FF5722" }, // Risco Moderado
                { value: 1.03, position: 75.5, color: "#D32F2F" }, // Risco Alto
                { value: 100.0, position: 99, color: "#D32F2F" } // Risco Muito Alto
            ];
        }
        
        if (type === 'RCQ_MAN_60_69') {
            return [
                { value: 0, position: 2, color: "#4CAF50" },
                { value: 0.91, position: 25.5, color: "#FF9800" }, // Risco Baixo
                { value: 0.99, position: 50.5, color: "#FF5722" }, // Risco Moderado
                { value: 1.03, position: 75.5, color: "#D32F2F" }, // Risco Alto
                { value: 100.0, position: 99, color: "#D32F2F" } // Risco Muito Alto
            ];
        }
        
        if (type === 'RCQ_MAN_50_59') {
            return [
                { value: 0, position: 2, color: "#4CAF50" },
                { value: 0.90, position: 25.5, color: "#FF9800" }, // Risco Baixo
                { value: 0.97, position: 50.5, color: "#FF5722" }, // Risco Moderado
                { value: 1.02, position: 75.5, color: "#D32F2F" }, // Risco Alto
                { value: 100.0, position: 99, color: "#D32F2F" } // Risco Muito Alto
            ];
        }
        
        if (type === 'RCQ_MAN_40_49') {
            return [
                { value: 0, position: 2, color: "#4CAF50" },
                { value: 0.88, position: 25.5, color: "#FF9800" }, // Risco Baixo
                { value: 0.96, position: 50.5, color: "#FF5722" }, // Risco Moderado
                { value: 1.00, position: 75.5, color: "#D32F2F" }, // Risco Alto
                { value: 100.0, position: 99, color: "#D32F2F" } // Risco Muito Alto
            ];
        }
        
        if (type === 'RCQ_MAN_30_39') {
            return [
                { value: 0, position: 2, color: "#4CAF50" },
                { value: 0.84, position: 25.5, color: "#FF9800" }, // Risco Baixo
                { value: 0.92, position: 50.5, color: "#FF5722" }, // Risco Moderado
                { value: 0.96, position: 75.5, color: "#D32F2F" }, // Risco Alto
                { value: 100.0, position: 99, color: "#D32F2F" } // Risco Muito Alto
            ];
        }
        
        if (type === 'RCQ_MAN_20_29') {
            return [
                { value: 0, position: 2, color: "#4CAF50" },
                { value: 0.83, position: 25.5, color: "#FF9800" }, // Risco Baixo
                { value: 0.89, position: 50.5, color: "#FF5722" }, // Risco Moderado
                { value: 0.94, position: 75.5, color: "#D32F2F" }, // Risco Alto
                { value: 100.0, position: 99, color: "#D32F2F" } // Risco Muito Alto
            ];
        }
        
        if (type === 'RCQ_WOMAN_60_69') {
            return [
                { value: 0, position: 2, color: "#4CAF50" },
                { value: 0.76, position: 25.5, color: "#FF9800" }, // Risco Baixo
                { value: 0.84, position: 50.5, color: "#FF5722" }, // Risco Moderado
                { value: 0.90, position: 75.5, color: "#D32F2F" }, // Risco Alto
                { value: 100.0, position: 99, color: "#D32F2F" } // Risco Muito Alto
            ];
        }
        
        if (type === 'RCQ_WOMAN_50_59') {
            return [
                { value: 0, position: 2, color: "#4CAF50" },
                { value: 0.74, position: 25.5, color: "#FF9800" }, // Risco Baixo
                { value: 0.82, position: 50.5, color: "#FF5722" }, // Risco Moderado
                { value: 0.88, position: 75.5, color: "#D32F2F" }, // Risco Alto
                { value: 100.0, position: 99, color: "#D32F2F" } // Risco Muito Alto
            ];
        }
        
        if (type === 'RCQ_WOMAN_40_49') {
            return [
                { value: 0, position: 2, color: "#4CAF50" },
                { value: 0.73, position: 25.5, color: "#FF9800" }, // Risco Baixo
                { value: 0.80, position: 50.5, color: "#FF5722" }, // Risco Moderado
                { value: 0.87, position: 75.5, color: "#D32F2F" }, // Risco Alto
                { value: 100.0, position: 99, color: "#D32F2F" } // Risco Muito Alto
            ];
        }
        
        if (type === 'RCQ_WOMAN_30_39') {
            return [
                { value: 0, position: 2, color: "#4CAF50" },
                { value: 0.72, position: 25.5, color: "#FF9800" }, // Risco Baixo
                { value: 0.79, position: 50.5, color: "#FF5722" }, // Risco Moderado
                { value: 0.84, position: 75.5, color: "#D32F2F" }, // Risco Alto
                { value: 100.0, position: 99, color: "#D32F2F" } // Risco Muito Alto
            ];
        }
        
        if (type === 'RCQ_WOMAN_20_29') {
            return [
                { value: 0, position: 2, color: "#4CAF50" },
                { value: 0.71, position: 25.5, color: "#FF9800" }, // Risco Baixo
                { value: 0.78, position: 50.5, color: "#FF5722" }, // Risco Moderado
                { value: 0.82, position: 75.5, color: "#D32F2F" }, // Risco Alto
                { value: 100.0, position: 99, color: "#D32F2F" } // Risco Muito Alto
            ];
        }

        if (type === 'CR_ALL_20_29') {
            return [
                { value: 0, position: 2, color: "#FF5722" },
                { value: 24, position: 20.5, color: "#FF9800" },
                { value: 34, position: 40.5, color: "#4CAF50" },
                { value: 43, position: 60.5, color: "#337535" },
                { value: 53, position: 80.5, color: "#224e23" },
                { value: 100.0, position: 99, color: "#224e23" }
            ];
        }
        
        if (type === 'CR_ALL_30_39') {
            return [
                { value: 0, position: 2, color: "#FF5722" },
                { value: 20, position: 20.5, color: "#FF9800" },
                { value: 31, position: 40.5, color: "#4CAF50" },
                { value: 39, position: 60.5, color: "#337535" },
                { value: 49, position: 80.5, color: "#224e23" },
                { value: 100.0, position: 99, color: "#224e23" }
            ];
        }
        
        if (type === 'CR_ALL_40_49') {
            return [
                { value: 0, position: 2, color: "#FF5722" },
                { value: 17, position: 20.5, color: "#FF9800" },
                { value: 27, position: 40.5, color: "#4CAF50" },
                { value: 36, position: 60.5, color: "#337535" },
                { value: 45, position: 80.5, color: "#224e23" },
                { value: 100.0, position: 99, color: "#224e23" }
            ];
        }
        
        if (type === 'CR_ALL_50_59') {
            return [
                { value: 0, position: 2, color: "#FF5722" },
                { value: 15, position: 20.5, color: "#FF9800" },
                { value: 25, position: 40.5, color: "#4CAF50" },
                { value: 34, position: 60.5, color: "#337535" },
                { value: 43, position: 80.5, color: "#224e23" },
                { value: 100.0, position: 99, color: "#224e23" }
            ];
        }
        
        if (type === 'CR_ALL_60_69') {
            return [
                { value: 0, position: 2, color: "#FF5722" },
                { value: 13, position: 20.5, color: "#FF9800" },
                { value: 23, position: 40.5, color: "#4CAF50" },
                { value: 31, position: 60.5, color: "#337535" },
                { value: 41, position: 80.5, color: "#224e23" },
                { value: 100.0, position: 99, color: "#224e23" }
            ];
        }
        
        if (type === 'CR_MAN_20_29') {
            return [
                { value: 0, position: 2, color: "#FF5722" },
                { value: 25, position: 20.5, color: "#FF9800" },
                { value: 34, position: 40.5, color: "#4CAF50" },
                { value: 43, position: 60.5, color: "#337535" },
                { value: 53, position: 80.5, color: "#224e23" },
                { value: 100.0, position: 99, color: "#224e23" }
            ];
        }
        
        if (type === 'CR_MAN_30_39') {
            return [
                { value: 0, position: 2, color: "#FF5722" },
                { value: 23, position: 20.5, color: "#FF9800" },
                { value: 31, position: 40.5, color: "#4CAF50" },
                { value: 39, position: 60.5, color: "#337535" },
                { value: 49, position: 80.5, color: "#224e23" },
                { value: 100.0, position: 99, color: "#224e23" }
            ];
        }
        
        if (type === 'CR_MAN_40_49') {
            return [
                { value: 0, position: 2, color: "#FF5722" },
                { value: 20, position: 20.5, color: "#FF9800" },
                { value: 27, position: 40.5, color: "#4CAF50" },
                { value: 36, position: 60.5, color: "#337535" },
                { value: 45, position: 80.5, color: "#224e23" },
                { value: 100.0, position: 99, color: "#224e23" }
            ];
        }
        
        if (type === 'CR_MAN_50_59') {
            return [
                { value: 0, position: 2, color: "#FF5722" },
                { value: 18, position: 20.5, color: "#FF9800" },
                { value: 25, position: 40.5, color: "#4CAF50" },
                { value: 34, position: 60.5, color: "#337535" },
                { value: 43, position: 80.5, color: "#224e23" },
                { value: 100.0, position: 99, color: "#224e23" }
            ];
        }
        
        if (type === 'CR_MAN_60_69') {
            return [
                { value: 0, position: 2, color: "#FF5722" },
                { value: 16, position: 20.5, color: "#FF9800" },
                { value: 23, position: 40.5, color: "#4CAF50" },
                { value: 31, position: 60.5, color: "#337535" },
                { value: 41, position: 80.5, color: "#224e23" },
                { value: 100.0, position: 99, color: "#224e23" }
            ];
        }

        if (type === 'CR_WOMAN_20_29') {
            return [
                { value: 0, position: 2, color: "#FF5722" },
                { value: 24, position: 20.5, color: "#FF9800" },
                { value: 31, position: 40.5, color: "#4CAF50" },
                { value: 38, position: 60.5, color: "#337535" },
                { value: 49, position: 80.5, color: "#224e23" },
                { value: 100.0, position: 99, color: "#224e23" }
            ];
        }
        
        if (type === 'CR_WOMAN_30_39') {
            return [
                { value: 0, position: 2, color: "#FF5722" },
                { value: 20, position: 20.5, color: "#FF9800" },
                { value: 28, position: 40.5, color: "#4CAF50" },
                { value: 34, position: 60.5, color: "#337535" },
                { value: 45, position: 80.5, color: "#224e23" },
                { value: 100.0, position: 99, color: "#224e23" }
            ];
        }
        
        if (type === 'CR_WOMAN_40_49') {
            return [
                { value: 0, position: 2, color: "#FF5722" },
                { value: 17, position: 20.5, color: "#FF9800" },
                { value: 24, position: 40.5, color: "#4CAF50" },
                { value: 31, position: 60.5, color: "#337535" },
                { value: 42, position: 80.5, color: "#224e23" },
                { value: 100.0, position: 99, color: "#224e23" }
            ];
        }
        
        if (type === 'CR_WOMAN_50_59') {
            return [
                { value: 0, position: 2, color: "#FF5722" },
                { value: 15, position: 20.5, color: "#FF9800" },
                { value: 21, position: 40.5, color: "#4CAF50" },
                { value: 28, position: 60.5, color: "#337535" },
                { value: 38, position: 80.5, color: "#224e23" },
                { value: 100.0, position: 99, color: "#224e23" }
            ];
        }
        
        if (type === 'CR_WOMAN_60_69') {
            return [
                { value: 0, position: 2, color: "#FF5722" },
                { value: 13, position: 20.5, color: "#FF9800" },
                { value: 18, position: 40.5, color: "#4CAF50" },
                { value: 24, position: 60.5, color: "#337535" },
                { value: 35, position: 80.5, color: "#224e23" },
                { value: 100.0, position: 99, color: "#224e23" }
            ];
        }

        if (type === 'FB_ALL_20_29') {
            return [
                { value: 0, position: 2, color: "#FF5722" },
                { value: 10, position: 20.5, color: "#FF9800" },
                { value: 22, position: 40.5, color: "#4CAF50" },
                { value: 29, position: 60.5, color: "#337535" },
                { value: 36, position: 80.5, color: "#224e23" },
                { value: 100.0, position: 99, color: "#224e23" }
            ];
        }
        
        if (type === 'FB_ALL_30_39') {
            return [
                { value: 0, position: 2, color: "#FF5722" },
                { value: 7, position: 20.5, color: "#FF9800" },
                { value: 17, position: 40.5, color: "#4CAF50" },
                { value: 22, position: 60.5, color: "#337535" },
                { value: 30, position: 80.5, color: "#224e23" },
                { value: 100.0, position: 99, color: "#224e23" }
            ];
        }
        
        if (type === 'FB_ALL_40_49') {
            return [
                { value: 0, position: 2, color: "#FF5722" },
                { value: 5, position: 20.5, color: "#FF9800" },
                { value: 13, position: 40.5, color: "#4CAF50" },
                { value: 17, position: 60.5, color: "#337535" },
                { value: 25, position: 80.5, color: "#224e23" },
                { value: 100.0, position: 99, color: "#224e23" }
            ];
        }
        
        if (type === 'FB_ALL_50_59') {
            return [
                { value: 0, position: 2, color: "#FF5722" },
                { value: 2, position: 20.5, color: "#FF9800" },
                { value: 10, position: 40.5, color: "#4CAF50" },
                { value: 13, position: 60.5, color: "#337535" },
                { value: 21, position: 80.5, color: "#224e23" },
                { value: 100.0, position: 99, color: "#224e23" }
            ];
        }
        
        if (type === 'FB_ALL_60_69') {
            return [
                { value: 0, position: 2, color: "#FF5722" },
                { value: 2, position: 20.5, color: "#FF9800" },
                { value: 8, position: 40.5, color: "#4CAF50" },
                { value: 11, position: 60.5, color: "#337535" },
                { value: 18, position: 80.5, color: "#224e23" },
                { value: 100.0, position: 99, color: "#224e23" }
            ];
        }

        if (type === 'FB_MAN_20_29') {
            return [
                { value: 0, position: 2, color: "#FF5722" },
                { value: 17, position: 20.5, color: "#FF9800" },
                { value: 22, position: 40.5, color: "#4CAF50" },
                { value: 29, position: 60.5, color: "#337535" },
                { value: 36, position: 80.5, color: "#224e23" },
                { value: 100.0, position: 99, color: "#224e23" }
            ];
        }
        
        if (type === 'FB_MAN_30_39') {
            return [
                { value: 0, position: 2, color: "#FF5722" },
                { value: 12, position: 20.5, color: "#FF9800" },
                { value: 17, position: 40.5, color: "#4CAF50" },
                { value: 22, position: 60.5, color: "#337535" },
                { value: 30, position: 80.5, color: "#224e23" },
                { value: 100.0, position: 99, color: "#224e23" }
            ];
        }
        
        if (type === 'FB_MAN_40_49') {
            return [
                { value: 0, position: 2, color: "#FF5722" },
                { value: 10, position: 20.5, color: "#FF9800" },
                { value: 13, position: 40.5, color: "#4CAF50" },
                { value: 17, position: 60.5, color: "#337535" },
                { value: 25, position: 80.5, color: "#224e23" },
                { value: 100.0, position: 99, color: "#224e23" }
            ];
        }
        
        if (type === 'FB_MAN_50_59') {
            return [
                { value: 0, position: 2, color: "#FF5722" },
                { value: 7, position: 20.5, color: "#FF9800" },
                { value: 10, position: 40.5, color: "#4CAF50" },
                { value: 13, position: 60.5, color: "#337535" },
                { value: 21, position: 80.5, color: "#224e23" },
                { value: 100.0, position: 99, color: "#224e23" }
            ];
        }
        
        if (type === 'FB_MAN_60_69') {
            return [
                { value: 0, position: 2, color: "#FF5722" },
                { value: 5, position: 20.5, color: "#FF9800" },
                { value: 8, position: 40.5, color: "#4CAF50" },
                { value: 11, position: 60.5, color: "#337535" },
                { value: 18, position: 80.5, color: "#224e23" },
                { value: 100.0, position: 99, color: "#224e23" }
            ];
        }

        if (type === 'FB_WOMAN_20_29') {
            return [
                { value: 0, position: 2, color: "#FF5722" },
                { value: 10, position: 20.5, color: "#FF9800" },
                { value: 15, position: 40.5, color: "#4CAF50" },
                { value: 21, position: 60.5, color: "#337535" },
                { value: 30, position: 80.5, color: "#224e23" },
                { value: 100.0, position: 99, color: "#224e23" }
            ];
        }
        
        if (type === 'FB_WOMAN_30_39') {
            return [
                { value: 0, position: 2, color: "#FF5722" },
                { value: 7, position: 20.5, color: "#FF9800" },
                { value: 13, position: 40.5, color: "#4CAF50" },
                { value: 20, position: 60.5, color: "#337535" },
                { value: 27, position: 80.5, color: "#224e23" },
                { value: 100.0, position: 99, color: "#224e23" }
            ];
        }
        
        if (type === 'FB_WOMAN_40_49') {
            return [
                { value: 0, position: 2, color: "#FF5722" },
                { value: 5, position: 20.5, color: "#FF9800" },
                { value: 11, position: 40.5, color: "#4CAF50" },
                { value: 15, position: 60.5, color: "#337535" },
                { value: 24, position: 80.5, color: "#224e23" },
                { value: 100.0, position: 99, color: "#224e23" }
            ];
        }
        
        if (type === 'FB_WOMAN_50_59') {
            return [
                { value: 0, position: 2, color: "#FF5722" },
                { value: 2, position: 20.5, color: "#FF9800" },
                { value: 7, position: 40.5, color: "#4CAF50" },
                { value: 11, position: 60.5, color: "#337535" },
                { value: 21, position: 80.5, color: "#224e23" },
                { value: 100.0, position: 99, color: "#224e23" }
            ];
        }
        
        if (type === 'FB_WOMAN_60_69') {
            return [
                { value: 0, position: 2, color: "#FF5722" },
                { value: 2, position: 20.5, color: "#FF9800" },
                { value: 5, position: 40.5, color: "#4CAF50" },
                { value: 12, position: 60.5, color: "#337535" },
                { value: 17, position: 80.5, color: "#224e23" },
                { value: 100.0, position: 99, color: "#224e23" }
            ];
        }

        if (type === 'RA_ALL_15_19') {
            return [
                { value: 0, position: 2, color: "#FF5722" },
                { value: 12, position: 20.5, color: "#FF9800" },
                { value: 23, position: 40.5, color: "#4CAF50" },
                { value: 29, position: 60.5, color: "#337535" },
                { value: 38, position: 80.5, color: "#224e23" },
                { value: 100.0, position: 99, color: "#224e23" }
            ];
        }
        
        if (type === 'RA_ALL_20_29') {
            return [
                { value: 0, position: 2, color: "#FF5722" },
                { value: 10, position: 20.5, color: "#FF9800" },
                { value: 22, position: 40.5, color: "#4CAF50" },
                { value: 29, position: 60.5, color: "#337535" },
                { value: 36, position: 80.5, color: "#224e23" },
                { value: 100.0, position: 99, color: "#224e23" }
            ];
        }
        
        if (type === 'RA_ALL_30_39') {
            return [
                { value: 0, position: 2, color: "#FF5722" },
                { value: 8, position: 20.5, color: "#FF9800" },
                { value: 17, position: 40.5, color: "#4CAF50" },
                { value: 22, position: 60.5, color: "#337535" },
                { value: 30, position: 80.5, color: "#224e23" },
                { value: 100.0, position: 99, color: "#224e23" }
            ];
        }
        
        if (type === 'RA_ALL_40_49') {
            return [
                { value: 0, position: 2, color: "#FF5722" },
                { value: 5, position: 20.5, color: "#FF9800" },
                { value: 13, position: 40.5, color: "#4CAF50" },
                { value: 17, position: 60.5, color: "#337535" },
                { value: 22, position: 80.5, color: "#224e23" },
                { value: 100.0, position: 99, color: "#224e23" }
            ];
        }
        
        if (type === 'RA_ALL_50_59') {
            return [
                { value: 0, position: 2, color: "#FF5722" },
                { value: 2, position: 20.5, color: "#FF9800" },
                { value: 10, position: 40.5, color: "#4CAF50" },
                { value: 13, position: 60.5, color: "#337535" },
                { value: 21, position: 80.5, color: "#224e23" },
                { value: 100.0, position: 99, color: "#224e23" }
            ];
        }
        
        if (type === 'RA_ALL_60_69') {
            return [
                { value: 0, position: 2, color: "#FF5722" },
                { value: 1, position: 20.5, color: "#FF9800" },
                { value: 8, position: 40.5, color: "#4CAF50" },
                { value: 11, position: 60.5, color: "#337535" },
                { value: 18, position: 80.5, color: "#224e23" },
                { value: 100.0, position: 99, color: "#224e23" }
            ];
        }
        
        if (type === 'RA_MAN_15_19') {
            return [
                { value: 0, position: 2, color: "#FF5722" },
                { value: 18, position: 20.5, color: "#FF9800" },
                { value: 23, position: 40.5, color: "#4CAF50" },
                { value: 29, position: 60.5, color: "#337535" },
                { value: 39, position: 80.5, color: "#224e23" },
                { value: 100.0, position: 99, color: "#224e23" }
            ];
        }
        
        if (type === 'RA_MAN_20_29') {
            return [
                { value: 0, position: 2, color: "#FF5722" },
                { value: 17, position: 20.5, color: "#FF9800" },
                { value: 22, position: 40.5, color: "#4CAF50" },
                { value: 29, position: 60.5, color: "#337535" },
                { value: 36, position: 80.5, color: "#224e23" },
                { value: 100.0, position: 99, color: "#224e23" }
            ];
        }
        
        if (type === 'RA_MAN_30_39') {
            return [
                { value: 0, position: 2, color: "#FF5722" },
                { value: 12, position: 20.5, color: "#FF9800" },
                { value: 17, position: 40.5, color: "#4CAF50" },
                { value: 22, position: 60.5, color: "#337535" },
                { value: 30, position: 80.5, color: "#224e23" },
                { value: 100.0, position: 99, color: "#224e23" }
            ];
        }
        
        if (type === 'RA_MAN_40_49') {
            return [
                { value: 0, position: 2, color: "#FF5722" },
                { value: 10, position: 20.5, color: "#FF9800" },
                { value: 13, position: 40.5, color: "#4CAF50" },
                { value: 17, position: 60.5, color: "#337535" },
                { value: 22, position: 80.5, color: "#224e23" },
                { value: 100.0, position: 99, color: "#224e23" }
            ];
        }
        
        if (type === 'RA_MAN_50_59') {
            return [
                { value: 0, position: 2, color: "#FF5722" },
                { value: 7, position: 20.5, color: "#FF9800" },
                { value: 10, position: 40.5, color: "#4CAF50" },
                { value: 13, position: 60.5, color: "#337535" },
                { value: 21, position: 80.5, color: "#224e23" },
                { value: 100.0, position: 99, color: "#224e23" }
            ];
        }
        
        if (type === 'RA_MAN_60_69') {
            return [
                { value: 0, position: 2, color: "#FF5722" },
                { value: 5, position: 20.5, color: "#FF9800" },
                { value: 8, position: 40.5, color: "#4CAF50" },
                { value: 11, position: 60.5, color: "#337535" },
                { value: 18, position: 80.5, color: "#224e23" },
                { value: 100.0, position: 99, color: "#224e23" }
            ];
        }
        
        if (type === 'RA_WOMAN_15_19') {
            return [
                { value: 0, position: 2, color: "#FF5722" },
                { value: 12, position: 20.5, color: "#FF9800" },
                { value: 18, position: 40.5, color: "#4CAF50" },
                { value: 25, position: 60.5, color: "#337535" },
                { value: 33, position: 80.5, color: "#224e23" },
                { value: 100.0, position: 99, color: "#224e23" }
            ];
        }
        
        if (type === 'RA_WOMAN_20_29') {
            return [
                { value: 0, position: 2, color: "#FF5722" },
                { value: 10, position: 20.5, color: "#FF9800" },
                { value: 15, position: 40.5, color: "#4CAF50" },
                { value: 21, position: 60.5, color: "#337535" },
                { value: 30, position: 80.5, color: "#224e23" },
                { value: 100.0, position: 99, color: "#224e23" }
            ];
        }
        
        if (type === 'RA_WOMAN_30_39') {
            return [
                { value: 0, position: 2, color: "#FF5722" },
                { value: 8, position: 20.5, color: "#FF9800" },
                { value: 13, position: 40.5, color: "#4CAF50" },
                { value: 20, position: 60.5, color: "#337535" },
                { value: 27, position: 80.5, color: "#224e23" },
                { value: 100.0, position: 99, color: "#224e23" }
            ];
        }
        
        if (type === 'RA_WOMAN_40_49') {
            return [
                { value: 0, position: 2, color: "#FF5722" },
                { value: 5, position: 20.5, color: "#FF9800" },
                { value: 11, position: 40.5, color: "#4CAF50" },
                { value: 15, position: 60.5, color: "#337535" },
                { value: 24, position: 80.5, color: "#224e23" },
                { value: 100.0, position: 99, color: "#224e23" }
            ];
        }
        
        if (type === 'RA_WOMAN_50_59') {
            return [
                { value: 0, position: 2, color: "#FF5722" },
                { value: 2, position: 20.5, color: "#FF9800" },
                { value: 7, position: 40.5, color: "#4CAF50" },
                { value: 11, position: 60.5, color: "#337535" },
                { value: 21, position: 80.5, color: "#224e23" },
                { value: 100.0, position: 99, color: "#224e23" }
            ];
        }
        
        if (type === 'RA_WOMAN_60_69') {
            return [
                { value: 0, position: 2, color: "#FF5722" },
                { value: 1, position: 20.5, color: "#FF9800" },
                { value: 5, position: 40.5, color: "#4CAF50" },
                { value: 12, position: 60.5, color: "#337535" },
                { value: 17, position: 80.5, color: "#224e23" },
                { value: 100.0, position: 99, color: "#224e23" }
            ];
        }

        if (type === 'SA_ALL_20_29') {
            return [
                { value: 0, position: 2, color: "#FF5722" },
                { value: 25, position: 20.5, color: "#FF9800" },
                { value: 33, position: 40.5, color: "#4CAF50" },
                { value: 37, position: 60.5, color: "#337535" },
                { value: 41, position: 80.5, color: "#224e23" },
                { value: 100.0, position: 99, color: "#224e23" }
            ];
        }
        
        if (type === 'SA_ALL_30_39') {
            return [
                { value: 0, position: 2, color: "#FF5722" },
                { value: 23, position: 20.5, color: "#FF9800" },
                { value: 32, position: 40.5, color: "#4CAF50" },
                { value: 36, position: 60.5, color: "#337535" },
                { value: 41, position: 80.5, color: "#224e23" },
                { value: 100.0, position: 99, color: "#224e23" }
            ];
        }
        
        if (type === 'SA_ALL_40_49') {
            return [
                { value: 0, position: 2, color: "#FF5722" },
                { value: 18, position: 20.5, color: "#FF9800" },
                { value: 30, position: 40.5, color: "#4CAF50" },
                { value: 34, position: 60.5, color: "#337535" },
                { value: 38, position: 80.5, color: "#224e23" },
                { value: 100.0, position: 99, color: "#224e23" }
            ];
        }
        
        if (type === 'SA_ALL_50_59') {
            return [
                { value: 0, position: 2, color: "#FF5722" },
                { value: 16, position: 20.5, color: "#FF9800" },
                { value: 30, position: 40.5, color: "#4CAF50" },
                { value: 33, position: 60.5, color: "#337535" },
                { value: 39, position: 80.5, color: "#224e23" },
                { value: 100.0, position: 99, color: "#224e23" }
            ];
        }
        
        if (type === 'SA_ALL_60_69') {
            return [
                { value: 0, position: 2, color: "#FF5722" },
                { value: 15, position: 20.5, color: "#FF9800" },
                { value: 27, position: 40.5, color: "#4CAF50" },
                { value: 31, position: 60.5, color: "#337535" },
                { value: 35, position: 80.5, color: "#224e23" },
                { value: 100.0, position: 99, color: "#224e23" }
            ];
        }
        
        if (type === 'SA_MAN_20_29') {
            return [
                { value: 0, position: 2, color: "#FF5722" },
                { value: 25, position: 20.5, color: "#FF9800" },
                { value: 30, position: 40.5, color: "#4CAF50" },
                { value: 34, position: 60.5, color: "#337535" },
                { value: 40, position: 80.5, color: "#224e23" },
                { value: 100.0, position: 99, color: "#224e23" }
            ];
        }
        
        if (type === 'SA_MAN_30_39') {
            return [
                { value: 0, position: 2, color: "#FF5722" },
                { value: 23, position: 20.5, color: "#FF9800" },
                { value: 28, position: 40.5, color: "#4CAF50" },
                { value: 33, position: 60.5, color: "#337535" },
                { value: 38, position: 80.5, color: "#224e23" },
                { value: 100.0, position: 99, color: "#224e23" }
            ];
        }
        
        if (type === 'SA_MAN_40_49') {
            return [
                { value: 0, position: 2, color: "#FF5722" },
                { value: 18, position: 20.5, color: "#FF9800" },
                { value: 24, position: 40.5, color: "#4CAF50" },
                { value: 29, position: 60.5, color: "#337535" },
                { value: 35, position: 80.5, color: "#224e23" },
                { value: 100.0, position: 99, color: "#224e23" }
            ];
        }
        
        if (type === 'SA_MAN_50_59') {
            return [
                { value: 0, position: 2, color: "#FF5722" },
                { value: 16, position: 20.5, color: "#FF9800" },
                { value: 24, position: 40.5, color: "#4CAF50" },
                { value: 28, position: 60.5, color: "#337535" },
                { value: 35, position: 80.5, color: "#224e23" },
                { value: 100.0, position: 99, color: "#224e23" }
            ];
        }
        
        if (type === 'SA_MAN_60_69') {
            return [
                { value: 0, position: 2, color: "#FF5722" },
                { value: 15, position: 20.5, color: "#FF9800" },
                { value: 20, position: 40.5, color: "#4CAF50" },
                { value: 25, position: 60.5, color: "#337535" },
                { value: 33, position: 80.5, color: "#224e23" },
                { value: 100.0, position: 99, color: "#224e23" }
            ];
        }
        
        if (type === 'SA_WOMAN_20_29') {
            return [
                { value: 0, position: 2, color: "#FF5722" },
                { value: 28, position: 20.5, color: "#FF9800" },
                { value: 33, position: 40.5, color: "#4CAF50" },
                { value: 37, position: 60.5, color: "#337535" },
                { value: 41, position: 80.5, color: "#224e23" },
                { value: 100.0, position: 99, color: "#224e23" }
            ];
        }
        
        if (type === 'SA_WOMAN_30_39') {
            return [
                { value: 0, position: 2, color: "#FF5722" },
                { value: 27, position: 20.5, color: "#FF9800" },
                { value: 32, position: 40.5, color: "#4CAF50" },
                { value: 36, position: 60.5, color: "#337535" },
                { value: 41, position: 80.5, color: "#224e23" },
                { value: 100.0, position: 99, color: "#224e23" }
            ];
        }
        
        if (type === 'SA_WOMAN_40_49') {
            return [
                { value: 0, position: 2, color: "#FF5722" },
                { value: 25, position: 20.5, color: "#FF9800" },
                { value: 30, position: 40.5, color: "#4CAF50" },
                { value: 34, position: 60.5, color: "#337535" },
                { value: 38, position: 80.5, color: "#224e23" },
                { value: 100.0, position: 99, color: "#224e23" }
            ];
        }
        
        if (type === 'SA_WOMAN_50_59') {
            return [
                { value: 0, position: 2, color: "#FF5722" },
                { value: 25, position: 20.5, color: "#FF9800" },
                { value: 30, position: 40.5, color: "#4CAF50" },
                { value: 33, position: 60.5, color: "#337535" },
                { value: 39, position: 80.5, color: "#224e23" },
                { value: 100.0, position: 99, color: "#224e23" }
            ];
        }
        
        if (type === 'SA_WOMAN_60_69') {
            return [
                { value: 0, position: 2, color: "#FF5722" },
                { value: 23, position: 20.5, color: "#FF9800" },
                { value: 27, position: 40.5, color: "#4CAF50" },
                { value: 31, position: 60.5, color: "#337535" },
                { value: 35, position: 80.5, color: "#224e23" },
                { value: 100.0, position: 99, color: "#224e23" }
            ];
        }
        
        return [];
    };

    // Função para calcular a posição exata do IMC na barra
    const getImcPosition = (imc: number, type: string) => {
        const imcRanges = getImcRanges(type); // Obtém a faixa correta
    
        if (imcRanges.length === 0) return `calc(0% - 4px)`; // Caso não tenha uma faixa definida
    
        let previous = imcRanges[0];
    
        for (let i = 1; i < imcRanges.length; i++) {
            if (imc < imcRanges[i].value) {
                const percentDiff = (imc - previous.value) / (imcRanges[i].value - previous.value);
                const position = previous.position + percentDiff * (imcRanges[i].position - previous.position);
                return `calc(${position}% - 4px)`;
            }
            previous = imcRanges[i];
        }
    
        return `calc(${imcRanges[imcRanges.length - 1].position}% - 4px)`;
    };

    // Função para obter a cor do IMC atual
    const getImcColor = (imc: number, type: string) => {
        const imcRanges = getImcRanges(type); // Obtém a faixa correta
    
        for (let i = imcRanges.length - 1; i >= 0; i--) {
            if (imc >= imcRanges[i].value) {
                return imcRanges[i].color;
            }
        }
        
        return "#000000"; // Cor padrão se não encontrar
    };

    return {
        protocolsOptions,
        getReviewClassification,
        getImcPosition,
        getImcColor,
        protocolsOptionsCardio,
    };
};

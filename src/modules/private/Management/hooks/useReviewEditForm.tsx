import { SelectChangeEvent } from '@mui/material';
import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import { useBackendForFrontend } from '../../../common/hooks/useBackendForFrontend';
import { DrawerProps, FindReviewQuestionsResponse } from '../../../common/types';
import { FormatAndValidateCNPJ, FormatAndValidateCPF, FormatAndValidateRG, GetErrorMessage, ReviewCreateVariables, ValidateFormReviewUpsert } from '../../../common/utils';
import { ReviewsProps, StudentRegisterProps } from '../components/Drawer/types';
import { MutationReviewUpsert, QueryFindReviewQuestions } from '../components/Graphql';
import { QueryFindStudent } from '../pages/Gym/graphql';
import { FindStudentResponse } from '../pages/Gym/types';

interface ResponseItem {
    question: string;
    response: string;
    category: string;
}

export const useReviewEditForm = ({
    closeDrawer,
    enqueueSnackbar,
    data,
    refreshInternal,
}: DrawerProps) => {

    const { request } = useBackendForFrontend();
    const [isLoading, setIsLoading] = useState(false);
    const [isNoConfigPlans, setIsConfigPlans] = useState(false);
    const [charactersRemaining, setCharactersRemaining] = useState<Record<string, number>>({
        observation: 300, // Inicializa com o contador para o campo principal
    });
    const [responseEvaluator, setResponseEvaluator] = useState<FindStudentResponse | null>();
    const [activeStep, setActiveStep] = useState(0);
    const [attemptCount, setAttemptCount] = useState(0);
    const [responseReviewQuestions, setResponseReviewQuestions] = useState<FindReviewQuestionsResponse | null>();
    const companyCode = Number(localStorage.getItem('@iflexfit:companyCode'));
    const profileCode = Number(localStorage.getItem('@iflexfit:profileCode'));
    const calledRef = useRef(false);

    const formatMeasurement = (question: string) => {
        const value = data.response.find((item: ResponseItem) => 
            item.category === 'MEASURES' && item.question === question
        )?.response;
    
        return value !== undefined && value !== null && !isNaN(Number(value)) 
            ? Number(value).toFixed(1).replace('.', ',') 
            : '';
    };

    const [formData, setFormData] = useState<ReviewsProps['formData']>({
        companyCode: companyCode,
        reviewCode: data.reviewCode,
        profileCode: data.evaluatorCode,
        evaluatorSearch: data.evaluator,
        studentCode: data.profileCode,
        gender: data.gender,
        dueDate: data.dueDate.split('/').reverse().join('-'),
        observation: data.observation,
        pescoço: formatMeasurement('Pescoço'),
        ombro: formatMeasurement('Ombro'),
        braçorelaxadodireito: formatMeasurement('Braço Relaxado Direito'),
        braçorelaxadoesquerdo: formatMeasurement('Braço Relaxado Esquerdo'),
        braçocontraídodireito: formatMeasurement('Braço Contraído Direito'),
        braçocontraídoesquerdo: formatMeasurement('Braço Contraído Esquerdo'),
        antebraçodireito: formatMeasurement('Antebraço Direito'),
        antebraçoesquerdo: formatMeasurement('Antebraço Esquerdo'),
        tóraxrelaxado: formatMeasurement('Tórax Relaxado'),
        tóraxinspirado: formatMeasurement('Tórax Inspirado'),
        coxadireita: formatMeasurement('Coxa Direita'),
        coxaesquerda: formatMeasurement('Coxa Esquerda'),
        panturrilhadireita: formatMeasurement('Panturrilha Direita'),
        panturrilhaesquerda: formatMeasurement('Panturrilha Esquerda'),
        age: data.age,
        imc: data.imc,
        iac: data.iac,
        sd: data.sumFolds,
        rcq: data.rcq,
        mm: '',
        mg: '',
        mr: '',
        mo: '',
        vo: data.vo,
        abdominalrepetições: data.response.find((item: ResponseItem) => item.category === 'NEUROMOTORS' && item.question === 'Abdominal Repetições')?.response,
        flexãodebraçosrepetições: data.response.find((item: ResponseItem) => item.category === 'NEUROMOTORS' && item.question === 'Flexão de Braços Repetições')?.response,
        sentarealcançar: data.response.find((item: ResponseItem) => item.category === 'NEUROMOTORS' && item.question === 'Sentar e Alcançar')?.response,
        massamuscular: data.muscleMass,
        massagorda: data.fatMass,
        massamagra: data.leanMass,
        massaresidual: data.residualMass,
        massamagrakg: Number((data.leanMass / 100) * data.weight.replace(',', '.')).toFixed(2),
        massagordakg: Number((data.fatMass / 100) * data.weight.replace(',', '.')).toFixed(2),
        massaossea: data.boneMass,
        águacorporaltotal: data.waterBody,
        taxametabólicabasal: data.basalMetabolic,
        idadecorporal: data.ageBody,
        weight: data.weight,
        height: data.height,
        hip: data.hip ? Number(data.hip).toFixed(1).replace('.', ',') : '',
        waist: data.waist ? Number(data.waist).toFixed(1).replace('.', ',') : '',
        protocol: data.protocol,
        protocolCardio: data.protocolCardio,
        subscapularis: data.subscapularis ? Number(data.subscapularis).toFixed(1).replace('.', ',') : '',
        triceps: data.triceps ? Number(data.triceps).toFixed(1).replace('.', ',') : '',
        chest: data.chest ? Number(data.chest).toFixed(1).replace('.', ',') : '',
        middleAxillary: data.middleAxillary ? Number(data.middleAxillary).toFixed(1).replace('.', ',') : '',
        suprailiac: data.suprailiac ? Number(data.suprailiac).toFixed(1).replace('.', ',') : '',
        abdominal: data.abdominal ? Number(data.abdominal).toFixed(1).replace('.', ',') : '',
        medialThigh: data.medialThigh ? Number(data.medialThigh).toFixed(1).replace('.', ',') : '',
        wristBistyloid: data.wristBistyloid ? Number(data.wristBistyloid).toFixed(1).replace('.', ',') : '',
        femurBistyloid: data.femurBistyloid ? Number(data.femurBistyloid).toFixed(1).replace('.', ',') : '',
        medialCalf: data.medialCalf ? Number(data.medialCalf).toFixed(1).replace('.', ',') : '',
        biceps: data.biceps ? Number(data.biceps).toFixed(1).replace('.', ',') : '',
        abdome: data.abdome ? Number(data.abdome).toFixed(1).replace('.', ',') : '',
        distânciapercorrida: data.response.find((item: ResponseItem) => item.category === 'CARDIORESPIRATORY' && item.question === 'Distância Percorrida')?.response,
        tempogasto: data.response.find((item: ResponseItem) => item.category === 'CARDIORESPIRATORY' && item.question === 'Tempo Gasto')?.response,
        frequênciacardíaca: data.response.find((item: ResponseItem) => item.category === 'CARDIORESPIRATORY' && item.question === 'Frequência Cardíaca')?.response,
        algummédicojádissequevocêpossuialgumproblemadecoraçãoequesódeveriarealizaratividadefísicasupervisionadoporprofissionais: data.response.find((item: ResponseItem) => item.category === 'PAR_Q' && item.question === 'Algum médico já disse que você possui algum problema de coração e que só deveria realizar atividade física supervisionado por profissionais?')?.response,
        vocêsentedoresnopeitoquandopraticaatividadefísica: data.response.find((item: ResponseItem) => item.category === 'PAR_Q' && item.question === 'Você sente dores no peito quando pratica atividade física?')?.response,
        noúltimomêsvocêsentiudoresnopeitoquandopraticaatividadefísica: data.response.find((item: ResponseItem) => item.category === 'PAR_Q' && item.question === 'No último mês, você sentiu dores no peito quando pratica atividade física?')?.response,
        vocêapresentadesequilíbriodevidoatonturaeouperdadeconsciência: data.response.find((item: ResponseItem) => item.category === 'PAR_Q' && item.question === 'Você apresenta desequilíbrio devido a tontura e/ou perda de consciência?')?.response,
        vocêpossuialgumproblemaósseoouarticularquepoderiaserpioradopelaatividadefísica: data.response.find((item: ResponseItem) => item.category === 'PAR_Q' && item.question === 'Você possui algum problema ósseo ou articular que poderia ser piorado pela atividade física?')?.response,
        vocêtomaatualmentealgummedicamentoparapressãoarterialeouproblemadecoração: data.response.find((item: ResponseItem) => item.category === 'PAR_Q' && item.question === 'Você toma atualmente algum medicamento para pressão arterial e/ou problema de coração?')?.response,
        sabedealgumaoutrarazãopelaqualvocênãodevepraticaratividadefísica: data.response.find((item: ResponseItem) => item.category === 'PAR_Q' && item.question === 'Sabe de alguma outra razão pela qual você não deve praticar atividade física?')?.response,
        quaissãoseusobjetivoscomrelaçãoaatividadefísica: data.response.find((item: ResponseItem) => item.category === 'ANAMNESE' && item.question === 'Quais são seus objetivos com relação a atividade física?')?.response,
        praticaatividadefísicaatualmentequaiseháquantotempo: data.response.find((item: ResponseItem) => item.category === 'ANAMNESE' && item.question === 'Pratica atividade física atualmente? Quais e há quanto tempo?')?.response,
        realizaacompanhamentocomnutricionistaounutricionistaesportivo: data.response.find((item: ResponseItem) => item.category === 'ANAMNESE' && item.question === 'Realiza acompanhamento com Nutricionista ou Nutricionista Esportivo?')?.response,
        qualseriasuamédiadehorasdesonodiário: data.response.find((item: ResponseItem) => item.category === 'ANAMNESE' && item.question === 'Qual seria sua média de horas de sono diário?')?.response,
        utilizaalgumtipodemedicamentodeusocontinuoqual: data.response.find((item: ResponseItem) => item.category === 'ANAMNESE' && item.question === 'Utiliza algum tipo de medicamento de uso continuo? Qual?')?.response,
        jápassouporalgumtipodecirurgianosúltimos6mesesqual: data.response.find((item: ResponseItem) => item.category === 'ANAMNESE' && item.question === 'Já passou por algum tipo de cirurgia nos últimos 6 meses? Qual?')?.response,
        possuialgumarecomendaçãoourestriçãomédicaparapráticadeexercícios: data.response.find((item: ResponseItem) => item.category === 'ANAMNESE' && item.question === 'Possui alguma recomendação ou restrição médica para prática de exercícios?')?.response,
        possuidiabetesoualgumaoutradoença: data.response.find((item: ResponseItem) => item.category === 'ANAMNESE' && item.question === 'Possui Diabetes ou alguma outra doença?')?.response,
        possuialgumaalteraçãocardíacaqual: data.response.find((item: ResponseItem) => item.category === 'ANAMNESE' && item.question === 'Possui alguma alteração cardíaca? Qual?')?.response,
        existemproblemascardíacosnafamíliaquem: data.response.find((item: ResponseItem) => item.category === 'ANAMNESE' && item.question === 'Existem problemas cardíacos na família? Quem?')?.response,
        suapressãoarterialéaltabaixaounormal12x8: data.response.find((item: ResponseItem) => item.category === 'ANAMNESE' && item.question === 'Sua pressão arterial é alta, baixa ou normal (12x8)?')?.response,
        jásentiuousentedoresnopeito: data.response.find((item: ResponseItem) => item.category === 'ANAMNESE' && item.question === 'Já sentiu ou sente dores no peito?')?.response,
        sentedoresnopeitoaorealizaralgumaatividadefísica: data.response.find((item: ResponseItem) => item.category === 'ANAMNESE' && item.question === 'Sente dores no peito ao realizar alguma atividade física?')?.response,
        sentiuousentedoresnacolunaconstantesemqualregião: data.response.find((item: ResponseItem) => item.category === 'ANAMNESE' && item.question === 'Sentiu ou sente dores na coluna constantes? Em qual região?')?.response,
        jádesmaioualgumavez: data.response.find((item: ResponseItem) => item.category === 'ANAMNESE' && item.question === 'Já desmaiou alguma vez?')?.response,
        éfumanteháquantosanos: data.response.find((item: ResponseItem) => item.category === 'ANAMNESE' && item.question === 'É fumante? Há quantos anos?')?.response,
        tomaalgumtipodeesteroideanabólico: data.response.find((item: ResponseItem) => item.category === 'ANAMNESE' && item.question === 'Toma algum tipo de esteroide anabólico?')?.response,
        possuialgumtraumaoulesão: data.response.find((item: ResponseItem) => item.category === 'ANAMNESE' && item.question === 'Possui algum trauma ou lesão?')?.response,
        observações: data.response.find((item: ResponseItem) => item.category === 'ANAMNESE' && item.question === 'Observações')?.response,
    });

    const [errors, setErrors] = useState<ReviewsProps['errors']>({
        evaluatorSearchError: '',
        weightError: '',
        heightError: '',
    });

    const infoCompleted = formData.weight != '' && formData.height != '' && formData.profileCode != 0;

    const dynamicSteps = infoCompleted ? ['Informações', 'Anamnese', 'Par-Q', 'Perímetros', 'Dobras Cutâneas', 'Diâmetros', 'Composição', 'IMC e IAC', 'RCQ', 'Cardiorrespiratória', 'Neuromotores'] : ['Informações'];

    const handleTextFieldChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        let updatedValue = value;

        if (name === 'observation' && value.length <= 300) {
            setFormData(prevState => ({
                ...prevState,
                [name]: value,
            }));
            
            setCharactersRemaining((prevState) => ({
                ...prevState,
                [name]: 300 - value.length,
            }));
        }

        // Lógica para formatação e validação do CPF e CNPJ
        if (name === 'evaluatorSearch' && value) {
            // Remove todos os caracteres não numéricos para validações numéricas
            const numericValue = value.replace(/\D/g, '');
        
            // Verifica se contém caracteres alfabéticos
            const containsLetters = /[A-Za-z]/.test(value);
        
            // Cenário 1: Validação mínima de 6 caracteres (alfanumérico ou numérico)
            if (value.length < 2) {
                setResponseEvaluator(null);

                setErrors(prevErrors => ({
                    ...prevErrors,
                    searchFindEvaluatorError: '',
                }));

                setFormData(prevState => ({
                    ...prevState,
                    [name]: value // Mantém o valor original
                }));
        
                return; // Interrompe processamento adicional
            }
        
            // Cenário 2: Formatação e validação apenas para números
            let formatted = value; // Valor inicial (não formatado)
            let isValid = false; // Flag de validação
        
            if (!containsLetters) {
                // Apenas números: decidir tipo de documento
                if (numericValue.length === 11) {
                    // CPF
                    ({ formatted, isValid } = FormatAndValidateCPF(numericValue));
                } else if (numericValue.length === 14) {
                    // CNPJ
                    ({ formatted, isValid } = FormatAndValidateCNPJ(numericValue));
                } else if (numericValue.length === 9) {
                    // RG
                    ({ formatted, isValid } = FormatAndValidateRG(numericValue));
                }
            } else {
                isValid = value.length >= 2; // Apenas valida comprimento
            }
        
            // Atualiza o estado com o valor formatado ou mantido
            setFormData(prevState => ({
                ...prevState,
                [name]: formatted // Valor final
            }));
        
            // Atualiza mensagens de erro
            setErrors(prevErrors => ({
                ...prevErrors,
                indicationSearchError: isValid ? '' : 'Documento inválido'
            }));

            handleSearchChange(value, isValid);

            return;
        }

        // Buscando todos os campos que são textos
        const isTextField = responseReviewQuestions?.findReviewQuestions.filter((question) => question.category === 'ANAMNESE')
            .some((question) => name === question.question.replace(/[\s?,()/]/g, '').toLowerCase()) || name === 'distânciapercorrida' || name === 'frequênciacardíaca' || name === 'tempogasto' || name === 'flexãodebraçosrepetições' || name === 'abdominalrepetições' || name === 'evaluatorSearch' || name === 'dueDate' || name === 'observation';
    
        if (!isTextField) {
            const numericValue = value.replace(/\D/g, '');

            if (numericValue.length > 1) {
                updatedValue = numericValue.slice(0, -1) + ',' + numericValue.slice(-1);
            } else {
                updatedValue = numericValue;
            }
        }

        if (name === 'tempogasto') {
            // Remove qualquer caractere que não seja número
            const sanitizedValue = value.replace(/\D/g, '');
        
            let minutes = 0;
            let seconds = 0;
        
            if (sanitizedValue.length <= 2) {
                // Se tem até 2 dígitos, são apenas segundos
                seconds = parseInt(sanitizedValue, 10) || 0;
            } else {
                // Se tem mais de 2 dígitos, separa minutos e segundos
                minutes = parseInt(sanitizedValue.slice(0, sanitizedValue.length - 2), 10) || 0;
                seconds = parseInt(sanitizedValue.slice(-2), 10) || 0;
            }
        
            // Garante que os segundos não ultrapassem 59
            if (seconds > 59) {
                seconds = 59;
            }
        
            // Garante que os minutos não ultrapassem 59
            if (minutes > 59) {
                minutes = 59;
            }
        
            updatedValue = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        }

        if (name === 'frequênciacardíaca') {
            updatedValue = value.slice(0, 3);
        }

        if (name === 'flexãodebraçosrepetições') {
            updatedValue = value;
        }

        if (name === 'abdominalrepetições') {
            updatedValue = value;
        }

        if (name === 'sentarealcançar') {
            updatedValue = value;
        }

        const height =
                name === 'height'
                    ? parseFloat(updatedValue.replace(',', '.')) / 100 || 0
                    : parseFloat(String(formData.height).replace(',', '.')) / 100 || 0;

        const heightCm =
            name === 'height'
                ? parseFloat(updatedValue.replace(',', '.')) || 0
                : parseFloat(String(formData.height).replace(',', '.')) || 0;

        const weight =
            name === 'weight'
                ? parseFloat(updatedValue.replace(',', '.')) || 0
                : parseFloat(String(formData.weight).replace(',', '.')) || 0;
        
        const hip =
            name === 'hip'
                ? parseFloat(updatedValue.replace(',', '.')) || 0
                : parseFloat(String(formData.hip).replace(',', '.')) || 0;

        const waist =
            name === 'waist'
                ? parseFloat(updatedValue.replace(',', '.')) || 0
                : parseFloat(String(formData.waist).replace(',', '.')) || 0;

        if (formData.protocol === 'JPW78807') {
            const fieldsJPW78807 = [
                'subscapularis',
                'triceps',
                'chest',
                'middleAxillary',
                'suprailiac',
                'abdominal',
                'medialThigh',
            ];

            const sd = fieldsJPW78807.reduce((acc, field) => {
                const value =
                    name === field
                        ? parseFloat(updatedValue.replace(',', '.')) || 0
                        : parseFloat(String(formData[field]).replace(',', '.')) || 0;
                return acc + value;
            }, 0);

            if (data.gender === 'MAN') {
                const density = 1.112 - 0.00043499 * sd + 0.00000055 * Math.pow(sd, 2) - 0.00028826 * data.age;

                // Bicompartimental
                const massagorda = (4.95 / density - 4.5) * 100;
                const massamagra = 100 - massagorda;

                // Tetracompartimental
                const biestiloidePunho =
                    name === 'wristBistyloid'
                        ? parseFloat(updatedValue.replace(',', '.')) / 1000 || 0
                        : parseFloat(String(formData.wristBistyloid).replace(',', '.')) / 1000 || 0;
                const biepicondiloFemur =
                    name === 'femurBistyloid'
                        ? parseFloat(updatedValue.replace(',', '.')) / 1000 || 0
                        : parseFloat(String(formData.femurBistyloid).replace(',', '.')) / 1000 || 0;

                const massaresidual = weight * 0.241;
                const massaossea = 3.02 * Math.pow((height ** 2 * biestiloidePunho * biepicondiloFemur * 400), 0.712);
                const massamuscular = weight - (massagorda + massaossea + massaresidual);

                const massamagraKg = (massamagra / 100) * weight;
                const massagordaKg = (massagorda / 100) * weight;
                const águacorporaltotal = (massamagraKg * 0.73) / weight * 100;

                const taxametabólicabasal = 10 * weight + 6.25 * height - 5 * data.age + 5;

                const ajustePorTMB = (taxametabólicabasal - 1200) / 100;
                const ajustePorGordura = (massagordaKg - 20) / 2;
                const idadecorporal = Math.max(10, data.age + ajustePorTMB + ajustePorGordura);

                setFormData(prevState => ({
                    ...prevState,
                    [name]: updatedValue,
                    massagorda: massagorda.toFixed(2),
                    massamagra: massamagra.toFixed(2),
                    massamagrakg: massamagraKg.toFixed(2),
                    massagordakg: massagordaKg.toFixed(2),
                    massaresidual: massaresidual.toFixed(2),
                    massaossea: massaossea.toFixed(2),
                    massamuscular: massamuscular.toFixed(2),
                    águacorporaltotal: águacorporaltotal.toFixed(2),
                    taxametabólicabasal: taxametabólicabasal.toFixed(2),
                    idadecorporal: idadecorporal.toFixed(0)
                }));
            } else if (data.gender === 'WOMAN') {
                const density = 1.097 - 0.00046971 * sd + 0.00000056 * Math.pow(sd, 2) - 0.00012828 * data.age;

                // Bicompartimental
                const massagorda = (4.95 / density - 4.5) * 100;
                const massamagra = 100 - massagorda;

                // Tetracompartimental
                const biestiloidePunho =
                    name === 'wristBistyloid'
                        ? parseFloat(updatedValue.replace(',', '.')) / 1000 || 0
                        : parseFloat(String(formData.wristBistyloid).replace(',', '.')) / 1000 || 0;
                const biepicondiloFemur =
                    name === 'femurBistyloid'
                        ? parseFloat(updatedValue.replace(',', '.')) / 1000 || 0
                        : parseFloat(String(formData.femurBistyloid).replace(',', '.')) / 1000 || 0;

                const massaresidual = weight * 0.209;
                const massaossea = 3.02 * Math.pow((height ** 2 * biestiloidePunho * biepicondiloFemur * 400), 0.712);
                const massamuscular = weight - (massagorda + massaossea + massaresidual);

                const massamagraKg = (massamagra / 100) * weight;
                const massagordaKg = (massagorda / 100) * weight;
                const águacorporaltotal = (massamagraKg * 0.73) / weight * 100;

                const taxametabólicabasal = 10 * weight + 6.25 * heightCm - 5 * data.age - 161;

                const ajustePorTMB = (taxametabólicabasal - 1200) / 100;
                const ajustePorGordura = (massagordaKg - 20) / 2;
                const idadecorporal = Math.max(10, data.age + ajustePorTMB + ajustePorGordura);

                setFormData(prevState => ({
                    ...prevState,
                    [name]: updatedValue,
                    sd: sd,
                    massagorda: massagorda.toFixed(2),
                    massamagra: massamagra.toFixed(2),
                    massamagrakg: massamagraKg.toFixed(2),
                    massagordakg: massagordaKg.toFixed(2),
                    massaresidual: massaresidual.toFixed(2),
                    massaossea: massaossea.toFixed(2),
                    massamuscular: massamuscular.toFixed(2),
                    águacorporaltotal: águacorporaltotal.toFixed(2),
                    taxametabólicabasal: taxametabólicabasal.toFixed(2),
                    idadecorporal: idadecorporal.toFixed(0)
                }));
            } else {
                const densityMan = 1.112 - 0.00043499 * sd + 0.00000055 * Math.pow(sd, 2) - 0.00028826 * data.age;
                const densityWoman = 1.097 - 0.00046971 * sd + 0.00000056 * Math.pow(sd, 2) - 0.00012828 * data.age;
                const densityAverage = (densityMan + densityWoman) / 2;
                const fatPercentage = (4.95 / densityAverage - 4.5) * 100;

                // Bicompartimental
                const massagorda = fatPercentage;
                const massamagra = 100 - fatPercentage;

                // Tetracompartimental
                const biestiloidePunho =
                    name === 'wristBistyloid'
                        ? parseFloat(updatedValue.replace(',', '.')) / 1000 || 0
                        : parseFloat(String(formData.wristBistyloid).replace(',', '.')) / 1000 || 0;
                const biepicondiloFemur =
                    name === 'femurBistyloid'
                        ? parseFloat(updatedValue.replace(',', '.')) / 1000 || 0
                        : parseFloat(String(formData.femurBistyloid).replace(',', '.')) / 1000 || 0;

                const massaresidualMan = weight * 0.241;
                const massaresidualWoman = weight * 0.209;

                const massaresidual = (massaresidualMan + massaresidualWoman) / 2;
                const massaossea = 3.02 * Math.pow((height ** 2 * biestiloidePunho * biepicondiloFemur * 400), 0.712);
                const massamuscular = weight - (massagorda + massaossea + massaresidual);

                const massamagraKg = (massamagra / 100) * weight;
                const massagordaKg = (massagorda / 100) * weight;
                const águacorporaltotal = (massamagraKg * 0.73) / weight * 100;

                const taxametabólicabasal = 370 + (21.6 * massamagraKg);

                const ajustePorTMB = (taxametabólicabasal - 1200) / 100;
                const ajustePorGordura = (massagordaKg - 20) / 2;
                const idadecorporal = Math.max(10, data.age + ajustePorTMB + ajustePorGordura);

                setFormData(prevState => ({
                    ...prevState,
                    [name]: updatedValue,
                    sd: sd,
                    massagorda: massagorda.toFixed(2),
                    massamagra: massamagra.toFixed(2),
                    massamagrakg: massamagraKg.toFixed(2),
                    massagordakg: massagordaKg.toFixed(2),
                    massaresidual: massaresidual.toFixed(2),
                    massaossea: massaossea.toFixed(2),
                    massamuscular: massamuscular.toFixed(2),
                    águacorporaltotal: águacorporaltotal.toFixed(2),
                    taxametabólicabasal: taxametabólicabasal.toFixed(2),
                    idadecorporal: idadecorporal.toFixed(0)
                }));
            }
        }

        if (formData.protocol === 'JPW78803') {
            const fieldsJPW78803 = [
                'triceps',
                'suprailiac',
                'medialThigh',
            ];

            const sd = fieldsJPW78803.reduce((acc, field) => {
                const value =
                    name === field
                        ? parseFloat(updatedValue.replace(',', '.')) || 0
                        : parseFloat(String(formData[field]).replace(',', '.')) || 0;
                return acc + value;
            }, 0);

            if (data.gender === 'MAN') {
                const density = 1.10938 - 0.0008267 * sd + 0.0000016 * Math.pow(sd, 2) - 0.0002574 * data.age;

                // Bicompartimental
                const massagorda = (4.95 / density - 4.5) * 100;
                const massamagra = 100 - massagorda;

                // Tetracompartimental
                const biestiloidePunho =
                    name === 'wristBistyloid'
                        ? parseFloat(updatedValue.replace(',', '.')) / 1000 || 0
                        : parseFloat(String(formData.wristBistyloid).replace(',', '.')) / 1000 || 0;
                const biepicondiloFemur =
                    name === 'femurBistyloid'
                        ? parseFloat(updatedValue.replace(',', '.')) / 1000 || 0
                        : parseFloat(String(formData.femurBistyloid).replace(',', '.')) / 1000 || 0;

                const massaresidual = weight * 0.241;
                const massaossea = 3.02 * Math.pow((height ** 2 * biestiloidePunho * biepicondiloFemur * 400), 0.712);
                const massamuscular = weight - (massagorda + massaossea + massaresidual);

                const massamagraKg = (massamagra / 100) * weight;
                const massagordaKg = (massagorda / 100) * weight;
                const águacorporaltotal = (massamagraKg * 0.73) / weight * 100;

                const taxametabólicabasal = 10 * weight + 6.25 * height - 5 * data.age + 5;

                const ajustePorTMB = (taxametabólicabasal - 1200) / 100;
                const ajustePorGordura = (massagordaKg - 20) / 2;
                const idadecorporal = Math.max(10, data.age + ajustePorTMB + ajustePorGordura);

                setFormData(prevState => ({
                    ...prevState,
                    [name]: updatedValue,
                    massagorda: massagorda.toFixed(2),
                    massamagra: massamagra.toFixed(2),
                    massamagrakg: massamagraKg.toFixed(2),
                    massagordakg: massagordaKg.toFixed(2),
                    massaresidual: massaresidual.toFixed(2),
                    massaossea: massaossea.toFixed(2),
                    massamuscular: massamuscular.toFixed(2),
                    águacorporaltotal: águacorporaltotal.toFixed(2),
                    taxametabólicabasal: taxametabólicabasal.toFixed(2),
                    idadecorporal: idadecorporal.toFixed(0)
                }));
            } else if (data.gender === 'WOMAN') {
                const density = 1.0994921 - 0.0009929 * sd + 0.0000023 * Math.pow(sd, 2) - 0.0001392 * data.age;

                // Bicompartimental
                const massagorda = (4.95 / density - 4.5) * 100;
                const massamagra = 100 - massagorda;

                // Tetracompartimental
                const biestiloidePunho =
                    name === 'wristBistyloid'
                        ? parseFloat(updatedValue.replace(',', '.')) / 1000 || 0
                        : parseFloat(String(formData.wristBistyloid).replace(',', '.')) / 1000 || 0;
                const biepicondiloFemur =
                    name === 'femurBistyloid'
                        ? parseFloat(updatedValue.replace(',', '.')) / 1000 || 0
                        : parseFloat(String(formData.femurBistyloid).replace(',', '.')) / 1000 || 0;

                const massaresidual = weight * 0.209;
                const massaossea = 3.02 * Math.pow((height ** 2 * biestiloidePunho * biepicondiloFemur * 400), 0.712);
                const massamuscular = weight - (massagorda + massaossea + massaresidual);

                const massamagraKg = (massamagra / 100) * weight;
                const massagordaKg = (massagorda / 100) * weight;
                const águacorporaltotal = (massamagraKg * 0.73) / weight * 100;

                const taxametabólicabasal = 10 * weight + 6.25 * heightCm - 5 * data.age - 161;

                const ajustePorTMB = (taxametabólicabasal - 1200) / 100;
                const ajustePorGordura = (massagordaKg - 20) / 2;
                const idadecorporal = Math.max(10, data.age + ajustePorTMB + ajustePorGordura);

                setFormData(prevState => ({
                    ...prevState,
                    [name]: updatedValue,
                    massagorda: massagorda.toFixed(2),
                    massamagra: massamagra.toFixed(2),
                    massamagrakg: massamagraKg.toFixed(2),
                    massagordakg: massagordaKg.toFixed(2),
                    massaresidual: massaresidual.toFixed(2),
                    massaossea: massaossea.toFixed(2),
                    massamuscular: massamuscular.toFixed(2),
                    águacorporaltotal: águacorporaltotal.toFixed(2),
                    taxametabólicabasal: taxametabólicabasal.toFixed(2),
                    idadecorporal: idadecorporal.toFixed(0)
                }));
            } else {
                const densityMan = 1.10938 - 0.0008267 * sd + 0.0000016 * Math.pow(sd, 2) - 0.0002574 * data.age;
                const densityWoman = 1.0994921 - 0.0009929 * sd + 0.0000023 * Math.pow(sd, 2) - 0.0001392 * data.age;
                const densityAverage = (densityMan + densityWoman) / 2;
                const fatPercentage = (4.95 / densityAverage - 4.5) * 100;

                // Bicompartimental
                const massagorda = fatPercentage;
                const massamagra = 100 - fatPercentage;

                // Tetracompartimental
                const biestiloidePunho =
                    name === 'wristBistyloid'
                        ? parseFloat(updatedValue.replace(',', '.')) / 1000 || 0
                        : parseFloat(String(formData.wristBistyloid).replace(',', '.')) / 1000 || 0;
                const biepicondiloFemur =
                    name === 'femurBistyloid'
                        ? parseFloat(updatedValue.replace(',', '.')) / 1000 || 0
                        : parseFloat(String(formData.femurBistyloid).replace(',', '.')) / 1000 || 0;

                const massaresidualMan = weight * 0.241;
                const massaresidualWoman = weight * 0.209;

                const massaresidual = (massaresidualMan + massaresidualWoman) / 2;
                const massaossea = 3.02 * Math.pow((height ** 2 * biestiloidePunho * biepicondiloFemur * 400), 0.712);
                const massamuscular = weight - (massagorda + massaossea + massaresidual);

                const massamagraKg = (massamagra / 100) * weight;
                const massagordaKg = (massagorda / 100) * weight;
                const águacorporaltotal = (massamagraKg * 0.73) / weight * 100;

                const taxametabólicabasal = 370 + (21.6 * massamagraKg);

                const ajustePorTMB = (taxametabólicabasal - 1200) / 100;
                const ajustePorGordura = (massagordaKg - 20) / 2;
                const idadecorporal = Math.max(10, data.age + ajustePorTMB + ajustePorGordura);

                setFormData(prevState => ({
                    ...prevState,
                    [name]: updatedValue,
                    massagorda: massagorda.toFixed(2),
                    massamagra: massamagra.toFixed(2),
                    massamagrakg: massamagraKg.toFixed(2),
                    massagordakg: massagordaKg.toFixed(2),
                    massaresidual: massaresidual.toFixed(2),
                    massaossea: massaossea.toFixed(2),
                    massamuscular: massamuscular.toFixed(2),
                    águacorporaltotal: águacorporaltotal.toFixed(2),
                    taxametabólicabasal: taxametabólicabasal.toFixed(2),
                    idadecorporal: idadecorporal.toFixed(0)
                }));
            }
        }

        if (formData.protocol === 'P954') {
            const fieldsP954 = [
                'subscapularis',
                'triceps',
                'suprailiac',
                'medialCalf',
            ];

            const sd = fieldsP954.reduce((acc, field) => {
                const value =
                    name === field
                        ? parseFloat(updatedValue.replace(',', '.')) || 0
                        : parseFloat(String(formData[field]).replace(',', '.')) || 0;
                return acc + value;
            }, 0);

            const density = 1.10726863 - 0.00081201 * sd + 0.00000212 * Math.pow(sd, 2) - 0.00041761 * data.age;
            const fatPercentage = (4.95 / density - 4.5) * 100;

            // Bicompartimental
            const massagorda = fatPercentage;
            const massamagra = 100 - fatPercentage;

            // Tetracompartimental
            const biestiloidePunho =
                name === 'wristBistyloid'
                    ? parseFloat(updatedValue.replace(',', '.')) / 1000 || 0
                    : parseFloat(String(formData.wristBistyloid).replace(',', '.')) / 1000 || 0;
            const biepicondiloFemur =
                name === 'femurBistyloid'
                    ? parseFloat(updatedValue.replace(',', '.')) / 1000 || 0
                    : parseFloat(String(formData.femurBistyloid).replace(',', '.')) / 1000 || 0;

            const massaresidualMan = weight * 0.241;
            const massaresidualWoman = weight * 0.209;

            const massaresidual = (massaresidualMan + massaresidualWoman) / 2;
            const massaossea = 3.02 * Math.pow((height ** 2 * biestiloidePunho * biepicondiloFemur * 400), 0.712);
            const massamuscular = weight - (massagorda + massaossea + massaresidual);

            const massamagraKg = (massamagra / 100) * weight;
            const massagordaKg = (massagorda / 100) * weight;
            const águacorporaltotal = (massamagraKg * 0.73) / weight * 100;

            const taxametabólicabasal = 370 + (21.6 * massamagraKg);

            const ajustePorTMB = (taxametabólicabasal - 1200) / 100;
            const ajustePorGordura = (massagordaKg - 20) / 2;
            const idadecorporal = Math.max(10, data.age + ajustePorTMB + ajustePorGordura);

            setFormData(prevState => ({
                ...prevState,
                [name]: updatedValue,
                massagorda: massagorda.toFixed(2),
                massamagra: massamagra.toFixed(2),
                massamagrakg: massamagraKg.toFixed(2),
                massagordakg: massagordaKg.toFixed(2),
                massaresidual: massaresidual.toFixed(2),
                massaossea: massaossea.toFixed(2),
                massamuscular: massamuscular.toFixed(2),
                águacorporaltotal: águacorporaltotal.toFixed(2),
                taxametabólicabasal: taxametabólicabasal.toFixed(2),
                idadecorporal: idadecorporal.toFixed(0)
            }));
        }

        if (formData.protocol === 'G853') {
            const fieldsG853 = [
                'triceps',
                'suprailiac',
                'abdominal',
            ];

            const sd = fieldsG853.reduce((acc, field) => {
                const value =
                    name === field
                        ? parseFloat(updatedValue.replace(',', '.')) || 0
                        : parseFloat(String(formData[field]).replace(',', '.')) || 0;
                return acc + value;
            }, 0);

            const density = 1.17136 - 0.06706 * Math.log10(sd);
            const fatPercentage = (4.95 / density - 4.5) * 100;

            // Bicompartimental
            const massagorda = fatPercentage;
            const massamagra = 100 - fatPercentage;

            // Tetracompartimental
            const biestiloidePunho =
                name === 'wristBistyloid'
                    ? parseFloat(updatedValue.replace(',', '.')) / 1000 || 0
                    : parseFloat(String(formData.wristBistyloid).replace(',', '.')) / 1000 || 0;
            const biepicondiloFemur =
                name === 'femurBistyloid'
                    ? parseFloat(updatedValue.replace(',', '.')) / 1000 || 0
                    : parseFloat(String(formData.femurBistyloid).replace(',', '.')) / 1000 || 0;

            const massaresidualMan = weight * 0.241;
            const massaresidualWoman = weight * 0.209;

            const massaresidual = (massaresidualMan + massaresidualWoman) / 2;
            const massaossea = 3.02 * Math.pow((height ** 2 * biestiloidePunho * biepicondiloFemur * 400), 0.712);
            const massamuscular = weight - (massagorda + massaossea + massaresidual);

            const massamagraKg = (massamagra / 100) * weight;
            const massagordaKg = (massagorda / 100) * weight;
            const águacorporaltotal = (massamagraKg * 0.73) / weight * 100;

            const taxametabólicabasal = 370 + (21.6 * massamagraKg);

            const ajustePorTMB = (taxametabólicabasal - 1200) / 100;
            const ajustePorGordura = (massagordaKg - 20) / 2;
            const idadecorporal = Math.max(10, data.age + ajustePorTMB + ajustePorGordura);

            setFormData(prevState => ({
                ...prevState,
                [name]: updatedValue,
                massagorda: massagorda.toFixed(2),
                massamagra: massamagra.toFixed(2),
                massamagrakg: massamagraKg.toFixed(2),
                massagordakg: massagordaKg.toFixed(2),
                massaresidual: massaresidual.toFixed(2),
                massaossea: massaossea.toFixed(2),
                massamuscular: massamuscular.toFixed(2),
                águacorporaltotal: águacorporaltotal.toFixed(2),
                taxametabólicabasal: taxametabólicabasal.toFixed(2),
                idadecorporal: idadecorporal.toFixed(0)
            }));
        }

        if (formData.protocol === 'G943') {
            const fieldsG943 = [
                'subscapularis',
                'suprailiac',
                'medialThigh',
            ];

            const sd = fieldsG943.reduce((acc, field) => {
                const value =
                    name === field
                        ? parseFloat(updatedValue.replace(',', '.')) || 0
                        : parseFloat(String(formData[field]).replace(',', '.')) || 0;
                return acc + value;
            }, 0);

            if (data.gender === 'MAN') {
                const density = 1.17136 - 0.06706 * Math.log10(sd);

                // Bicompartimental
                const massagorda = (4.95 / density - 4.5) * 100;
                const massamagra = 100 - massagorda;

                // Tetracompartimental
                const biestiloidePunho =
                    name === 'wristBistyloid'
                        ? parseFloat(updatedValue.replace(',', '.')) / 1000 || 0
                        : parseFloat(String(formData.wristBistyloid).replace(',', '.')) / 1000 || 0;
                const biepicondiloFemur =
                    name === 'femurBistyloid'
                        ? parseFloat(updatedValue.replace(',', '.')) / 1000 || 0
                        : parseFloat(String(formData.femurBistyloid).replace(',', '.')) / 1000 || 0;

                const massaresidual = weight * 0.241;
                const massaossea = 3.02 * Math.pow((height ** 2 * biestiloidePunho * biepicondiloFemur * 400), 0.712);
                const massamuscular = weight - (massagorda + massaossea + massaresidual);

                const massamagraKg = (massamagra / 100) * weight;
                const massagordaKg = (massagorda / 100) * weight;
                const águacorporaltotal = (massamagraKg * 0.73) / weight * 100;

                const taxametabólicabasal = 10 * weight + 6.25 * height - 5 * data.age + 5;

                const ajustePorTMB = (taxametabólicabasal - 1200) / 100;
                const ajustePorGordura = (massagordaKg - 20) / 2;
                const idadecorporal = Math.max(10, data.age + ajustePorTMB + ajustePorGordura);

                setFormData(prevState => ({
                    ...prevState,
                    [name]: updatedValue,
                    massagorda: massagorda.toFixed(2),
                    massamagra: massamagra.toFixed(2),
                    massamagrakg: massamagraKg.toFixed(2),
                    massagordakg: massagordaKg.toFixed(2),
                    massaresidual: massaresidual.toFixed(2),
                    massaossea: massaossea.toFixed(2),
                    massamuscular: massamuscular.toFixed(2),
                    águacorporaltotal: águacorporaltotal.toFixed(2),
                    taxametabólicabasal: taxametabólicabasal.toFixed(2),
                    idadecorporal: idadecorporal.toFixed(0)
                }));
            } else if (data.gender === 'WOMAN') {
                const density = 1.16650 - 0.07063 * Math.log10(sd);

                // Bicompartimental
                const massagorda = (4.95 / density - 4.5) * 100;
                const massamagra = 100 - massagorda;

                // Tetracompartimental
                const biestiloidePunho =
                    name === 'wristBistyloid'
                        ? parseFloat(updatedValue.replace(',', '.')) / 1000 || 0
                        : parseFloat(String(formData.wristBistyloid).replace(',', '.')) / 1000 || 0;
                const biepicondiloFemur =
                    name === 'femurBistyloid'
                        ? parseFloat(updatedValue.replace(',', '.')) / 1000 || 0
                        : parseFloat(String(formData.femurBistyloid).replace(',', '.')) / 1000 || 0;

                const massaresidual = weight * 0.209;
                const massaossea = 3.02 * Math.pow((height ** 2 * biestiloidePunho * biepicondiloFemur * 400), 0.712);
                const massamuscular = weight - (massagorda + massaossea + massaresidual);

                const massamagraKg = (massamagra / 100) * weight;
                const massagordaKg = (massagorda / 100) * weight;
                const águacorporaltotal = (massamagraKg * 0.73) / weight * 100;

                const taxametabólicabasal = 10 * weight + 6.25 * heightCm - 5 * data.age - 161;

                const ajustePorTMB = (taxametabólicabasal - 1200) / 100;
                const ajustePorGordura = (massagordaKg - 20) / 2;
                const idadecorporal = Math.max(10, data.age + ajustePorTMB + ajustePorGordura);

                setFormData(prevState => ({
                    ...prevState,
                    [name]: updatedValue,
                    massagorda: massagorda.toFixed(2),
                    massamagra: massamagra.toFixed(2),
                    massamagrakg: massamagraKg.toFixed(2),
                    massagordakg: massagordaKg.toFixed(2),
                    massaresidual: massaresidual.toFixed(2),
                    massaossea: massaossea.toFixed(2),
                    massamuscular: massamuscular.toFixed(2),
                    águacorporaltotal: águacorporaltotal.toFixed(2),
                    taxametabólicabasal: taxametabólicabasal.toFixed(2),
                    idadecorporal: idadecorporal.toFixed(0)
                }));
            } else {
                const densityMan = 1.17136 - 0.06706 * Math.log10(sd);
                const densityWoman = 1.16650 - 0.07063 * Math.log10(sd);
                const densityAverage = (densityMan + densityWoman) / 2;
                const fatPercentage = (4.95 / densityAverage - 4.5) * 100;

                // Bicompartimental
                const massagorda = fatPercentage;
                const massamagra = 100 - fatPercentage;

                // Tetracompartimental
                const biestiloidePunho =
                    name === 'wristBistyloid'
                        ? parseFloat(updatedValue.replace(',', '.')) / 1000 || 0
                        : parseFloat(String(formData.wristBistyloid).replace(',', '.')) / 1000 || 0;
                const biepicondiloFemur =
                    name === 'femurBistyloid'
                        ? parseFloat(updatedValue.replace(',', '.')) / 1000 || 0
                        : parseFloat(String(formData.femurBistyloid).replace(',', '.')) / 1000 || 0;

                const massaresidualMan = weight * 0.241;
                const massaresidualWoman = weight * 0.209;

                const massaresidual = (massaresidualMan + massaresidualWoman) / 2;
                const massaossea = 3.02 * Math.pow((height ** 2 * biestiloidePunho * biepicondiloFemur * 400), 0.712);
                const massamuscular = weight - (massagorda + massaossea + massaresidual);

                const massamagraKg = (massamagra / 100) * weight;
                const massagordaKg = (massagorda / 100) * weight;
                const águacorporaltotal = (massamagraKg * 0.73) / weight * 100;

                const taxametabólicabasal = 370 + (21.6 * massamagraKg);

                const ajustePorTMB = (taxametabólicabasal - 1200) / 100;
                const ajustePorGordura = (massagordaKg - 20) / 2;
                const idadecorporal = Math.max(10, data.age + ajustePorTMB + ajustePorGordura);

                setFormData(prevState => ({
                    ...prevState,
                    [name]: updatedValue,
                    massagorda: massagorda.toFixed(2),
                    massamagra: massamagra.toFixed(2),
                    massamagrakg: massamagraKg.toFixed(2),
                    massagordakg: massagordaKg.toFixed(2),
                    massaresidual: massaresidual.toFixed(2),
                    massaossea: massaossea.toFixed(2),
                    massamuscular: massamuscular.toFixed(2),
                    águacorporaltotal: águacorporaltotal.toFixed(2),
                    taxametabólicabasal: taxametabólicabasal.toFixed(2),
                    idadecorporal: idadecorporal.toFixed(0)
                }));
            }
        }

        if (formData.protocol === 'F684') {
            const fieldsF684 = [
                'subscapularis',
                'triceps',
                'suprailiac',
                'abdominal',
            ];

            const sd = fieldsF684.reduce((acc, field) => {
                const value =
                    name === field
                        ? parseFloat(updatedValue.replace(',', '.')) || 0
                        : parseFloat(String(formData[field]).replace(',', '.')) || 0;
                return acc + value;
            }, 0);

            // Bicompartimental
            const massagorda = 0.153 * sd + 5.783;
            const massamagra = 100 - massagorda;

            // Tetracompartimental
            const biestiloidePunho =
                name === 'wristBistyloid'
                    ? parseFloat(updatedValue.replace(',', '.')) / 1000 || 0
                    : parseFloat(String(formData.wristBistyloid).replace(',', '.')) / 1000 || 0;
            const biepicondiloFemur =
                name === 'femurBistyloid'
                    ? parseFloat(updatedValue.replace(',', '.')) / 1000 || 0
                    : parseFloat(String(formData.femurBistyloid).replace(',', '.')) / 1000 || 0;

            const massaresidualMan = weight * 0.241;
            const massaresidualWoman = weight * 0.209;

            const massaresidual = (massaresidualMan + massaresidualWoman) / 2;
            const massaossea = 3.02 * Math.pow((height ** 2 * biestiloidePunho * biepicondiloFemur * 400), 0.712);
            const massamuscular = weight - (massagorda + massaossea + massaresidual);

            const massamagraKg = (massamagra / 100) * weight;
            const massagordaKg = (massagorda / 100) * weight;
            const águacorporaltotal = (massamagraKg * 0.73) / weight * 100;

            const taxametabólicabasal = 370 + (21.6 * massamagraKg);

            const ajustePorTMB = (taxametabólicabasal - 1200) / 100;
            const ajustePorGordura = (massagordaKg - 20) / 2;
            const idadecorporal = Math.max(10, data.age + ajustePorTMB + ajustePorGordura);

            setFormData(prevState => ({
                ...prevState,
                [name]: updatedValue,
                massagorda: massagorda.toFixed(2),
                massamagra: massamagra.toFixed(2),
                massamagrakg: massamagraKg.toFixed(2),
                massagordakg: massagordaKg.toFixed(2),
                massaresidual: massaresidual.toFixed(2),
                massaossea: massaossea.toFixed(2),
                massamuscular: massamuscular.toFixed(2),
                águacorporaltotal: águacorporaltotal.toFixed(2),
                taxametabólicabasal: taxametabólicabasal.toFixed(2),
                idadecorporal: idadecorporal.toFixed(0)
            }));
        }

        if (formData.protocol === 'DR674') {
            const fieldsDR674 = [
                'subscapularis',
                'triceps',
                'biceps',
                'suprailiac',
            ];

            const sd = fieldsDR674.reduce((acc, field) => {
                const value =
                    name === field
                        ? parseFloat(updatedValue.replace(',', '.')) || 0
                        : parseFloat(String(formData[field]).replace(',', '.')) || 0;
                return acc + value;
            }, 0);

            const density = 1.1610 - 0.0632 * Math.log10(sd);

            // Bicompartimental
            const massagorda = (4.95 / density - 4.5) * 100;
            const massamagra = 100 - massagorda;

            // Tetracompartimental
            const biestiloidePunho =
                name === 'wristBistyloid'
                    ? parseFloat(updatedValue.replace(',', '.')) / 1000 || 0
                    : parseFloat(String(formData.wristBistyloid).replace(',', '.')) / 1000 || 0;
            const biepicondiloFemur =
                name === 'femurBistyloid'
                    ? parseFloat(updatedValue.replace(',', '.')) / 1000 || 0
                    : parseFloat(String(formData.femurBistyloid).replace(',', '.')) / 1000 || 0;

            const massaresidualMan = weight * 0.241;
            const massaresidualWoman = weight * 0.209;

            const massaresidual = (massaresidualMan + massaresidualWoman) / 2;
            const massaossea = 3.02 * Math.pow((height ** 2 * biestiloidePunho * biepicondiloFemur * 400), 0.712);
            const massamuscular = weight - (massagorda + massaossea + massaresidual);

            const massamagraKg = (massamagra / 100) * weight;
            const massagordaKg = (massagorda / 100) * weight;
            const águacorporaltotal = (massamagraKg * 0.73) / weight * 100;

            const taxametabólicabasal = 370 + (21.6 * massamagraKg);

            const ajustePorTMB = (taxametabólicabasal - 1200) / 100;
            const ajustePorGordura = (massagordaKg - 20) / 2;
            const idadecorporal = Math.max(10, data.age + ajustePorTMB + ajustePorGordura);

            setFormData(prevState => ({
                ...prevState,
                [name]: updatedValue,
                massagorda: massagorda.toFixed(2),
                massamagra: massamagra.toFixed(2),
                massamagrakg: massamagraKg.toFixed(2),
                massagordakg: massagordaKg.toFixed(2),
                massaresidual: massaresidual.toFixed(2),
                massaossea: massaossea.toFixed(2),
                massamuscular: massamuscular.toFixed(2),
                águacorporaltotal: águacorporaltotal.toFixed(2),
                taxametabólicabasal: taxametabólicabasal.toFixed(2),
                idadecorporal: idadecorporal.toFixed(0)
            }));
        }

        if (formData.protocol === 'L964') {
            const fieldsL964 = [
                'subscapularis',
                'triceps',
                'biceps',
                'suprailiac',
            ];

            const sd = fieldsL964.reduce((acc, field) => {
                const value =
                    name === field
                        ? parseFloat(updatedValue.replace(',', '.')) || 0
                        : parseFloat(String(formData[field]).replace(',', '.')) || 0;
                return acc + value;
            }, 0);

            const density = 1.1862 - 0.0684 * Math.log10(sd) - 0.000601 * data.age;

            // Bicompartimental
            const massagorda = (4.95 / density - 4.5) * 100;
            const massamagra = 100 - massagorda;

            // Tetracompartimental
            const biestiloidePunho =
                name === 'wristBistyloid'
                    ? parseFloat(updatedValue.replace(',', '.')) / 1000 || 0
                    : parseFloat(String(formData.wristBistyloid).replace(',', '.')) / 1000 || 0;
            const biepicondiloFemur =
                name === 'femurBistyloid'
                    ? parseFloat(updatedValue.replace(',', '.')) / 1000 || 0
                    : parseFloat(String(formData.femurBistyloid).replace(',', '.')) / 1000 || 0;

            const massaresidualMan = weight * 0.241;
            const massaresidualWoman = weight * 0.209;

            const massaresidual = (massaresidualMan + massaresidualWoman) / 2;
            const massaossea = 3.02 * Math.pow((height ** 2 * biestiloidePunho * biepicondiloFemur * 400), 0.712);
            const massamuscular = weight - (massagorda + massaossea + massaresidual);

            const massamagraKg = (massamagra / 100) * weight;
            const massagordaKg = (massagorda / 100) * weight;
            const águacorporaltotal = (massamagraKg * 0.73) / weight * 100;

            const taxametabólicabasal = 370 + (21.6 * massamagraKg);

            const ajustePorTMB = (taxametabólicabasal - 1200) / 100;
            const ajustePorGordura = (massagordaKg - 20) / 2;
            const idadecorporal = Math.max(10, data.age + ajustePorTMB + ajustePorGordura);

            setFormData(prevState => ({
                ...prevState,
                [name]: updatedValue,
                massagorda: massagorda.toFixed(2),
                massamagra: massamagra.toFixed(2),
                massamagrakg: massamagraKg.toFixed(2),
                massagordakg: massagordaKg.toFixed(2),
                massaresidual: massaresidual.toFixed(2),
                massaossea: massaossea.toFixed(2),
                massamuscular: massamuscular.toFixed(2),
                águacorporaltotal: águacorporaltotal.toFixed(2),
                taxametabólicabasal: taxametabólicabasal.toFixed(2),
                idadecorporal: idadecorporal.toFixed(0)
            }));
        }

        if (formData.protocol === 'T847') {
            const fieldsT847 = [
                'subscapularis',
                'triceps',
                'middleAxillary',
                'suprailiac',
                'abdominal',
                'medialThigh',
                'medialCalf',
            ];

            const sd = fieldsT847.reduce((acc, field) => {
                const value =
                    name === field
                        ? parseFloat(updatedValue.replace(',', '.')) || 0
                        : parseFloat(String(formData[field]).replace(',', '.')) || 0;
                return acc + value;
            }, 0);

            const density = 1.1091 - 0.00052 * sd + 0.00000032 * Math.pow(sd, 2);

            // Bicompartimental
            const massagorda = (4.95 / density - 4.5) * 100;
            const massamagra = 100 - massagorda;

            // Tetracompartimental
            const biestiloidePunho =
                name === 'wristBistyloid'
                    ? parseFloat(updatedValue.replace(',', '.')) / 1000 || 0
                    : parseFloat(String(formData.wristBistyloid).replace(',', '.')) / 1000 || 0;
            const biepicondiloFemur =
                name === 'femurBistyloid'
                    ? parseFloat(updatedValue.replace(',', '.')) / 1000 || 0
                    : parseFloat(String(formData.femurBistyloid).replace(',', '.')) / 1000 || 0;

            const massaresidualMan = weight * 0.241;
            const massaresidualWoman = weight * 0.209;

            const massaresidual = (massaresidualMan + massaresidualWoman) / 2;
            const massaossea = 3.02 * Math.pow((height ** 2 * biestiloidePunho * biepicondiloFemur * 400), 0.712);
            const massamuscular = weight - (massagorda + massaossea + massaresidual);

            const massamagraKg = (massamagra / 100) * weight;
            const massagordaKg = (massagorda / 100) * weight;
            const águacorporaltotal = (massamagraKg * 0.73) / weight * 100;

            const taxametabólicabasal = 370 + (21.6 * massamagraKg);

            const ajustePorTMB = (taxametabólicabasal - 1200) / 100;
            const ajustePorGordura = (massagordaKg - 20) / 2;
            const idadecorporal = Math.max(10, data.age + ajustePorTMB + ajustePorGordura);

            setFormData(prevState => ({
                ...prevState,
                [name]: updatedValue,
                massagorda: massagorda.toFixed(2),
                massamagra: massamagra.toFixed(2),
                massamagrakg: massamagraKg.toFixed(2),
                massagordakg: massagordaKg.toFixed(2),
                massaresidual: massaresidual.toFixed(2),
                massaossea: massaossea.toFixed(2),
                massamuscular: massamuscular.toFixed(2),
                águacorporaltotal: águacorporaltotal.toFixed(2),
                taxametabólicabasal: taxametabólicabasal.toFixed(2),
                idadecorporal: idadecorporal.toFixed(0)
            }));
        }

        if (formData.protocol === 'T843') {
            const fieldsT843 = [
                'subscapularis',
                'triceps',
                'middleAxillary',
            ];

            const sd = fieldsT843.reduce((acc, field) => {
                const value =
                    name === field
                        ? parseFloat(updatedValue.replace(',', '.')) || 0
                        : parseFloat(String(formData[field]).replace(',', '.')) || 0;
                return acc + value;
            }, 0);

            const density = 1.1136 - 0.00154 * sd + 0.00000516 * Math.pow(sd, 2);

            // Bicompartimental
            const massagorda = (4.95 / density - 4.5) * 100;
            const massamagra = 100 - massagorda;

            // Tetracompartimental
            const biestiloidePunho =
                name === 'wristBistyloid'
                    ? parseFloat(updatedValue.replace(',', '.')) / 1000 || 0
                    : parseFloat(String(formData.wristBistyloid).replace(',', '.')) / 1000 || 0;
            const biepicondiloFemur =
                name === 'femurBistyloid'
                    ? parseFloat(updatedValue.replace(',', '.')) / 1000 || 0
                    : parseFloat(String(formData.femurBistyloid).replace(',', '.')) / 1000 || 0;

            const massaresidualMan = weight * 0.241;
            const massaresidualWoman = weight * 0.209;

            const massaresidual = (massaresidualMan + massaresidualWoman) / 2;
            const massaossea = 3.02 * Math.pow((height ** 2 * biestiloidePunho * biepicondiloFemur * 400), 0.712);
            const massamuscular = weight - (massagorda + massaossea + massaresidual);

            const massamagraKg = (massamagra / 100) * weight;
            const massagordaKg = (massagorda / 100) * weight;
            const águacorporaltotal = (massamagraKg * 0.73) / weight * 100;

            const taxametabólicabasal = 370 + (21.6 * massamagraKg);

            const ajustePorTMB = (taxametabólicabasal - 1200) / 100;
            const ajustePorGordura = (massagordaKg - 20) / 2;
            const idadecorporal = Math.max(10, data.age + ajustePorTMB + ajustePorGordura);

            setFormData(prevState => ({
                ...prevState,
                [name]: updatedValue,
                massagorda: massagorda.toFixed(2),
                massamagra: massamagra.toFixed(2),
                massamagrakg: massamagraKg.toFixed(2),
                massagordakg: massagordaKg.toFixed(2),
                massaresidual: massaresidual.toFixed(2),
                massaossea: massaossea.toFixed(2),
                massamuscular: massamuscular.toFixed(2),
                águacorporaltotal: águacorporaltotal.toFixed(2),
                taxametabólicabasal: taxametabólicabasal.toFixed(2),
                idadecorporal: idadecorporal.toFixed(0)
            }));
        }

        if (formData.protocol === 'W88PO') {
            const abdome =
                    name === 'abdome'
                        ? parseFloat(updatedValue.replace(',', '.')) || 0
                        : parseFloat(String(formData.abdome).replace(',', '.')) || 0;

            if (data.gender === 'MAN') {
                // Bicompartimental
                const massagorda = 0.31457 * abdome - 0.10969 * weight + 10.8336;
                const massamagra = 100 - massagorda;

                // Tetracompartimental
                const biestiloidePunho =
                    name === 'wristBistyloid'
                        ? parseFloat(updatedValue.replace(',', '.')) / 1000 || 0
                        : parseFloat(String(formData.wristBistyloid).replace(',', '.')) / 1000 || 0;
                const biepicondiloFemur =
                    name === 'femurBistyloid'
                        ? parseFloat(updatedValue.replace(',', '.')) / 1000 || 0
                        : parseFloat(String(formData.femurBistyloid).replace(',', '.')) / 1000 || 0;

                const massaresidual = weight * 0.241;
                const massaossea = 3.02 * Math.pow((height ** 2 * biestiloidePunho * biepicondiloFemur * 400), 0.712);
                const massamuscular = weight - (massagorda + massaossea + massaresidual);

                const massamagraKg = (massamagra / 100) * weight;
                const massagordaKg = (massagorda / 100) * weight;
                const águacorporaltotal = (massamagraKg * 0.73) / weight * 100;

                const taxametabólicabasal = 10 * weight + 6.25 * height - 5 * data.age + 5;

                const ajustePorTMB = (taxametabólicabasal - 1200) / 100;
                const ajustePorGordura = (massagordaKg - 20) / 2;
                const idadecorporal = Math.max(10, data.age + ajustePorTMB + ajustePorGordura);

                setFormData(prevState => ({
                    ...prevState,
                    [name]: updatedValue,
                    massagorda: massagorda.toFixed(2),
                    massamagra: massamagra.toFixed(2),
                    massamagrakg: massamagraKg.toFixed(2),
                    massagordakg: massagordaKg.toFixed(2),
                    massaresidual: massaresidual.toFixed(2),
                    massaossea: massaossea.toFixed(2),
                    massamuscular: massamuscular.toFixed(2),
                    águacorporaltotal: águacorporaltotal.toFixed(2),
                    taxametabólicabasal: taxametabólicabasal.toFixed(2),
                    idadecorporal: idadecorporal.toFixed(0)
                }));
            } else if (data.gender === 'WOMAN') {
                // Bicompartimental
                const massagorda = 0.11077 * abdome - 0.17666 * heightCm + 0.14354 * weight + 51.03301;
                const massamagra = 100 - massagorda;

                // Tetracompartimental
                const biestiloidePunho =
                    name === 'wristBistyloid'
                        ? parseFloat(updatedValue.replace(',', '.')) / 1000 || 0
                        : parseFloat(String(formData.wristBistyloid).replace(',', '.')) / 1000 || 0;
                const biepicondiloFemur =
                    name === 'femurBistyloid'
                        ? parseFloat(updatedValue.replace(',', '.')) / 1000 || 0
                        : parseFloat(String(formData.femurBistyloid).replace(',', '.')) / 1000 || 0;

                const massaresidual = weight * 0.209;
                const massaossea = 3.02 * Math.pow((height ** 2 * biestiloidePunho * biepicondiloFemur * 400), 0.712);
                const massamuscular = weight - (massagorda + massaossea + massaresidual);

                const massamagraKg = (massamagra / 100) * weight;
                const massagordaKg = (massagorda / 100) * weight;
                const águacorporaltotal = (massamagraKg * 0.73) / weight * 100;

                const taxametabólicabasal = 10 * weight + 6.25 * heightCm - 5 * data.age - 161;

                const ajustePorTMB = (taxametabólicabasal - 1200) / 100;
                const ajustePorGordura = (massagordaKg - 20) / 2;
                const idadecorporal = Math.max(10, data.age + ajustePorTMB + ajustePorGordura);

                setFormData(prevState => ({
                    ...prevState,
                    [name]: updatedValue,
                    massagorda: massagorda.toFixed(2),
                    massamagra: massamagra.toFixed(2),
                    massamagrakg: massamagraKg.toFixed(2),
                    massagordakg: massagordaKg.toFixed(2),
                    massaresidual: massaresidual.toFixed(2),
                    massaossea: massaossea.toFixed(2),
                    massamuscular: massamuscular.toFixed(2),
                    águacorporaltotal: águacorporaltotal.toFixed(2),
                    taxametabólicabasal: taxametabólicabasal.toFixed(2),
                    idadecorporal: idadecorporal.toFixed(0)
                }));
            } else {
                const densityMan = 0.31457 * abdome - 0.10969 * weight + 10.8336;
                const densityWoman = 0.11077 * abdome - 0.17666 * heightCm + 0.14354 * weight + 51.03301;

                // Bicompartimental
                const massagorda = (densityMan + densityWoman) / 2;
                const massamagra = 100 - massagorda;

                // Tetracompartimental
                const biestiloidePunho =
                    name === 'wristBistyloid'
                        ? parseFloat(updatedValue.replace(',', '.')) / 1000 || 0
                        : parseFloat(String(formData.wristBistyloid).replace(',', '.')) / 1000 || 0;
                const biepicondiloFemur =
                    name === 'femurBistyloid'
                        ? parseFloat(updatedValue.replace(',', '.')) / 1000 || 0
                        : parseFloat(String(formData.femurBistyloid).replace(',', '.')) / 1000 || 0;

                const massaresidualMan = weight * 0.241;
                const massaresidualWoman = weight * 0.209;

                const massaresidual = (massaresidualMan + massaresidualWoman) / 2;
                const massaossea = 3.02 * Math.pow((height ** 2 * biestiloidePunho * biepicondiloFemur * 400), 0.712);
                const massamuscular = weight - (massagorda + massaossea + massaresidual);

                const massamagraKg = (massamagra / 100) * weight;
                const massagordaKg = (massagorda / 100) * weight;
                const águacorporaltotal = (massamagraKg * 0.73) / weight * 100;

                const taxametabólicabasal = 370 + (21.6 * massamagraKg);

                const ajustePorTMB = (taxametabólicabasal - 1200) / 100;
                const ajustePorGordura = (massagordaKg - 20) / 2;
                const idadecorporal = Math.max(10, data.age + ajustePorTMB + ajustePorGordura);

                setFormData(prevState => ({
                    ...prevState,
                    [name]: updatedValue,
                    massagorda: massagorda.toFixed(2),
                    massamagra: massamagra.toFixed(2),
                    massamagrakg: massamagraKg.toFixed(2),
                    massagordakg: massagordaKg.toFixed(2),
                    massaresidual: massaresidual.toFixed(2),
                    massaossea: massaossea.toFixed(2),
                    massamuscular: massamuscular.toFixed(2),
                    águacorporaltotal: águacorporaltotal.toFixed(2),
                    taxametabólicabasal: taxametabólicabasal.toFixed(2),
                    idadecorporal: idadecorporal.toFixed(0)
                }));
            }
        }

        if (formData.protocolCardio === 'COO12') {
            const distancia =
                name === 'distânciapercorrida'
                    ? parseFloat(updatedValue.replace(',', '.')) || 0
                    : parseFloat(String(formData.distânciapercorrida).replace(',', '.')) || 0;

            const vo = (distancia - 504.1) / 44.9;

            setFormData(prevState => ({
                ...prevState,
                [name]: updatedValue,
                vo: vo.toFixed(2),
            }));
        }

        if (formData.protocolCardio === 'M1609') {
            const t =
                name === 'tempogasto'
                    ? updatedValue
                        .split(':')
                        .map(Number)
                        .reduce((acc, curr, index) => acc + curr / Math.pow(60, index), 0)
                    : (String(formData.tempogasto).split(':')
                        .map(Number)
                        .reduce((acc, curr, index) => acc + curr / Math.pow(60, index), 0)) || 0;

            const fc =
                name === 'frequênciacardíaca'
                    ? parseFloat(updatedValue.replace(',', '.')) || 0
                    : parseFloat(String(formData.frequênciacardíaca).replace(',', '.')) || 0;

            const vo = 132.853 - (0.0769 * weight / 0.454) - (0.3877 * data.age) + (6.315 * (data.gender === 'MAN' ? 1 : 0)) - (3.2649 * t) - (0.1565 * fc);

            setFormData(prevState => ({
                ...prevState,
                [name]: updatedValue,
                vo: vo.toFixed(2),
            }));
        }

        setFormData(prevState => ({
            ...prevState,
            [name]: updatedValue,
            imc: height === 0 ? 0 : parseFloat((weight / (height ** 2)).toFixed(1)),
            iac: height === 0 ? 0 : parseFloat(((hip / (height * Math.sqrt(height))) - 18).toFixed(2)),
            rcq: hip === 0 ? 0 : parseFloat((waist / hip).toFixed(2)),
        }));
    };

    function useDebounce(callback: (value: string, isValid: boolean) => void, delay: number) {
        const timeoutRef = useRef<NodeJS.Timeout | null>(null);

        return (value: string, isValid: boolean) => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
            timeoutRef.current = setTimeout(() => {
                callback(value, isValid);
            }, delay);
        };
    }

    const handleSearchChange = useDebounce(async (value: string, isValid: boolean) => {
            if (value.length === 2) {
                setResponseEvaluator(null);
                return;
            }
    
            if (!isValid) {
                setErrors(prevErrors => ({
                    ...prevErrors,
                    searchFindStudentError: '',
                }));
                return;
            }
    
            try {
                const response: FindStudentResponse = await request(QueryFindStudent, { companyCode: companyCode, search: value });
                setResponseEvaluator(response);
            } catch (error: unknown) {
                setResponseEvaluator(null);
                setErrors(prevErrors => ({
                    ...prevErrors,
                    searchFindStudentError: 'Avaliador não encontrado.',
                }));
    
                const genericError = 'Ops! Algo deu errado ao localizar avaliador. Tente novamente!';
                const errorMessage = GetErrorMessage(error, genericError);
                enqueueSnackbar(errorMessage, { variant: 'error' });
            }
        }, 650);

    const validateForm = () => {        
        let newErrors: StudentRegisterProps['errors'] = {};
        newErrors = ValidateFormReviewUpsert(formData, activeStep);
        setErrors(newErrors);
        
        return Object.keys(newErrors).length === 0;
    };

    const handleContinue = () => {
        if (validateForm()) {
            setActiveStep((prevStep) => prevStep + 1);
        }
    };

    const handleCloseModal = () => {
        setIsConfigPlans(false);
        closeDrawer();
    };

    const findReviewQuestions = useCallback(async () => {
        try {
            const response: FindReviewQuestionsResponse = await request(QueryFindReviewQuestions);

            setResponseReviewQuestions(response);
        } catch (error) {            
            setAttemptCount(prevCount => prevCount + 1);
            if (attemptCount >= 5) {
                return enqueueSnackbar('Erro ao buscar questões de avaliações. Entre em contato com nosso suporte.', { variant: 'error' });
            }
            enqueueSnackbar('Erro ao buscar questões de avaliações.', { variant: 'error' });
        }
    }, [attemptCount, enqueueSnackbar, request]);

    useEffect(() => {
        if (!calledRef.current) {
            calledRef.current = true;

            const fetchData = async () => {
                await findReviewQuestions();
            };

            fetchData();
        }

        if (responseEvaluator) {
            formData.profileCode = responseEvaluator.findStudent.profileCode;
        } else {
            formData.profileCode = profileCode;
        }
    }, [findReviewQuestions, formData, profileCode, responseEvaluator]);

    const handleBack = () => {
        setActiveStep((prevStep) => prevStep - 1);
    };

    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        const formattedName = name.toLowerCase().replace(/\s/g, '').replace('?', '');

        setFormData(prevState => ({
            ...prevState,
            [formattedName]: value
        }));
    };

    const handleFinish = async () => {
        if (validateForm()) {
            setIsLoading(true);
            try {
                const variables = ReviewCreateVariables(formData, 'UPDATE');
                await request(MutationReviewUpsert, variables);

                enqueueSnackbar('Avaliação alterada com sucesso!', { variant: 'success' });
                closeDrawer();
                refreshInternal?.();
            } catch (error: unknown) {
                setAttemptCount(prevCount => prevCount + 1);
                if (attemptCount >= 5) {
                    return enqueueSnackbar('Erro ao alterar avaliação. Entre em contato com nosso suporte.', { variant: 'error' });
                }

                const genericError = 'Ops! Algo deu errado ao alterar avaliação. Tente novamente!'
                const errorMessage = GetErrorMessage(error, genericError);
                enqueueSnackbar(errorMessage, { variant: 'error' });
            } finally {
                setIsLoading(false);
            }
        }
    };

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

    const handleSelectMuiChange = (event: SelectChangeEvent<string>) => {
        const { name, value } = event.target;

        const resetFields = [
            'JPW78807',
            'JPW78803',
            'P954',
            'G853',
            'G943',
            'F684',
            'DR674',
            'L964',
            'T847',
            'T843',
            'W88PO',
        ];

        const resetFieldsCardio = [
            'COO12',
            'M1609',
        ];
    
        // Verifica se o valor selecionado está na lista de valores que devem limpar os campos
        if (resetFieldsCardio.includes(value)) {
            // Campos que você quer limpar
            const fieldsToClear = [
                'distânciapercorrida',
                'tempogasto',
                'frequênciacardíaca',
            ];
    
            // Limpa os campos especificados
            const updatedFormData = fieldsToClear.reduce((acc: { [key: string]: string }, field) => {
                acc[field] = '';
                return acc;
            }, {});
    
            // Atualiza o estado, mantendo os valores anteriores para os outros campos
            setFormData(prevState => ({
                ...prevState,
                ...updatedFormData,
                [name]: value,
                vo: 0,
            }));
        }

        if (resetFields.includes(value)) {
            // Campos que você quer limpar
            const fieldsToClear = [
                'subscapularis',
                'triceps',
                'chest',
                'middleAxillary',
                'suprailiac',
                'abdominal',
                'medialThigh',
                'medialCalf',
                'biceps',
                'abdome',
            ];
    
            // Limpa os campos especificados
            const updatedFormData = fieldsToClear.reduce((acc: { [key: string]: string }, field) => {
                acc[field] = '';
                return acc;
            }, {});
    
            // Atualiza o estado, mantendo os valores anteriores para os outros campos
            setFormData(prevState => ({
                ...prevState,
                ...updatedFormData,
                [name]: value,
                massamuscular: 0,
                massagorda: '',
                massamagra: '',
                massaossea: 0,
                águacorporaltotal: 0,
                taxametabólicabasal: 0,
                idadecorporal: 0,
                massagordakg: 0,
                massamagrakg: 0,
            }));
        }

        setFormData(prevState => ({
            ...prevState,
            [name]: value, 
        }));
    };

    const protocolMapping: { [protocol: string]: string[] } = {
        JPW78807: [
            'subscapularis',
            'triceps',
            'chest',
            'middleAxillary',
            'suprailiac',
            'abdominal',
            'medialThigh',
            'wristBistyloid',
            'femurBistyloid',
            'height',
            'weight',
        ],
        JPW78803: [
            'triceps',
            'suprailiac',
            'medialThigh',
            'wristBistyloid',
            'femurBistyloid',
            'height',
            'weight',
        ],
        P954: [
            'subscapularis',
            'triceps',
            'suprailiac',
            'medialCalf',
            'wristBistyloid',
            'femurBistyloid',
            'height',
            'weight',
        ],
        G853: [
            'triceps',
            'suprailiac',
            'abdominal',
            'wristBistyloid',
            'femurBistyloid',
            'height',
            'weight',
        ],
        G943: [
            'subscapularis',
            'suprailiac',
            'medialThigh',
            'wristBistyloid',
            'femurBistyloid',
            'height',
            'weight',
        ],
        F684: [
            'subscapularis',
            'triceps',
            'suprailiac',
            'abdominal',
            'wristBistyloid',
            'femurBistyloid',
            'height',
            'weight',
        ],
        DR674: [
            'subscapularis',
            'triceps',
            'biceps',
            'suprailiac',
            'wristBistyloid',
            'femurBistyloid',
            'height',
            'weight',
        ],
        L964: [
            'subscapularis',
            'triceps',
            'biceps',
            'suprailiac',
            'wristBistyloid',
            'femurBistyloid',
            'height',
            'weight',
        ],
        T847: [
            'subscapularis',
            'triceps',
            'middleAxillary',
            'suprailiac',
            'abdominal',
            'medialThigh',
            'medialCalf',
            'wristBistyloid',
            'femurBistyloid',
            'height',
            'weight',
        ],
        T843: [
            'subscapularis',
            'triceps',
            'middleAxillary',
            'wristBistyloid',
            'femurBistyloid',
            'height',
            'weight',
        ],
        W88PO: [
            'abdome',
            'wristBistyloid',
            'femurBistyloid',
            'height',
            'weight',
        ],
        COO12: [
            'distânciapercorrida',
        ],
        M1609: [
            'tempogasto',
            'frequênciacardíaca',
            'weight'
        ],
    };

    const protocolsOptionsCardio = [
        { value: 'noSelect', label: 'Selecione um protocolo', isDisabled: true },
        { value: 'COO12', label: 'Cooper - 12 minutos' },
        { value: 'M1609', label: '1 Milha - 1609 metros' },
    ];

    const filteredQuestionsCardio = responseReviewQuestions?.findReviewQuestions.filter((question) => {
        // Normaliza a chave da pergunta
        const questionKey = question.question.replace(/[\s?]/g, '').toLowerCase();
        
        // Se o protocolo selecionado tiver um mapeamento, filtra as perguntas permitidas
        const allowedKeys = protocolMapping[formData.protocolCardio as keyof typeof protocolMapping];
        if (allowedKeys) {
        return allowedKeys.includes(questionKey);
        }
        // Se não houver mapeamento definido, exibe todas as perguntas de ADIPOMETRY
        return true;
    });

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

    // Pegando a cor correspondente
    const imcColorAll = getImcColor(Number(formData.imc), 'IMC_ALL');
    const imcColorElderly = getImcColor(Number(formData.imc), 'IMC_ELDERLY');
    const imcColorMan = getImcColor(Number(formData.imc), 'IMC_MAN');
    const imcColorWoman = getImcColor(Number(formData.imc), 'IMC_WOMAN');
    const imcColorIacWoman = getImcColor(Number(formData.iac), 'IAC_WOMAN');
    const imcColorIacMan = getImcColor(Number(formData.iac), 'IAC_MAN');
    const imcColorIacAll = getImcColor(Number(formData.iac), 'IAC_ALL');
    const rcqColorAll = getImcColor(Number(formData.rcq), 'RCQ_ALL');
    const rcqColorMan60and69 = getImcColor(Number(formData.rcq), 'RCQ_MAN_60_69');
    const rcqColorMan50and59 = getImcColor(Number(formData.rcq), 'RCQ_MAN_50_59');
    const rcqColorMan40and49 = getImcColor(Number(formData.rcq), 'RCQ_MAN_40_49');
    const rcqColorMan30and39 = getImcColor(Number(formData.rcq), 'RCQ_MAN_30_39');
    const rcqColorMan20and29 = getImcColor(Number(formData.rcq), 'RCQ_MAN_20_29');
    const rcqColorWoman60and69 = getImcColor(Number(formData.rcq), 'RCQ_WOMAN_60_69');
    const rcqColorWoman50and59 = getImcColor(Number(formData.rcq), 'RCQ_WOMAN_50_59');
    const rcqColorWoman40and49 = getImcColor(Number(formData.rcq), 'RCQ_WOMAN_40_49');
    const rcqColorWoman30and39 = getImcColor(Number(formData.rcq), 'RCQ_WOMAN_30_39');

    return {
        setFormData,
        setErrors,
        isLoading,
        isNoConfigPlans,
        formData,
        errors,
        activeStep,
        dynamicSteps,
        handleTextFieldChange,
        handleBack,
        handleContinue,
        handleFinish,
        charactersRemaining,
        handleCloseModal,
        handleRadioChange,
        responseReviewQuestions,
        setActiveStep,
        handleSelectMuiChange,
        protocolsOptions,
        getReviewClassification,
        getImcPosition,
        imcColorAll,
        imcColorElderly,
        imcColorMan,
        imcColorWoman,
        imcColorIacWoman,
        imcColorIacMan,
        imcColorIacAll,
        rcqColorAll,
        rcqColorMan60and69,
        rcqColorMan50and59,
        rcqColorMan40and49,
        rcqColorMan30and39,
        rcqColorMan20and29,
        rcqColorWoman60and69,
        rcqColorWoman50and59,
        rcqColorWoman40and49,
        rcqColorWoman30and39,
        getImcColor,
        protocolsOptionsCardio,
        filteredQuestionsCardio,
        responseEvaluator,
        infoCompleted
    };
};

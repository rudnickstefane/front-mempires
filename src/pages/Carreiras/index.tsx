import { Button, TextField } from "@mui/material";
import { PiSmileySadLight } from "react-icons/pi";
import Select, { StylesConfig } from 'react-select';
import makeAnimated from 'react-select/animated';
import { ContentHeader, ContentImage, GradientBottomHeader, GradientOverlay, GradientTopHeader, PromoText, TextContainer } from '../../components/Header/styles.d';
import { Destaque, DestaqueTitle, GradientHeaderEnd } from '../../components/Styles/styles.d';
import '../../input.css';

interface Option {
    value: string;
    label: string;
}

const customStyles: StylesConfig<Option, true> = {
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
    option: (provided, state) => ({
        ...provided,
        fontFamily: 'Poppins, sans-serif',
        backgroundColor: state.isSelected ? '#ff0336' : provided.backgroundColor,
        '&:hover': {
            backgroundColor: '#ff0336',
            color: 'white',
            cursor: 'pointer',
        },
    }),
};

function Carreiras() {

    interface ColourOption {
        readonly value: string;
        readonly label: string;
        readonly isFixed?: boolean;
        readonly isDisabled?: boolean;
    }

    const jobTypes: readonly ColourOption[] = [
        { value: 'talents', label: 'Banco de Talentos', isFixed: true },
        { value: 'full-time', label: 'Tempo Integral' },
        { value: 'part-time', label: 'Meio Período' },
        { value: 'contract', label: 'Contrato' },
        { value: 'internship', label: 'Estágio' },
    ];

    const seniorityLevels = [
        { value: 'junior', label: 'Júnior' },
        { value: 'mid', label: 'Pleno' },
        { value: 'senior', label: 'Sênior' },
        { value: 'lead', label: 'Líder' },
        { value: 'especialist', label: 'Especialista' },
        { value: 'manager', label: 'Gerente' },

    ];

    const animatedComponents = makeAnimated();

    const customNoOptionsMessage = () => "Nenhuma opção disponível";

    return (
        <>
            <ContentHeader>
                <GradientTopHeader></GradientTopHeader>
                <ContentImage>
                    <GradientOverlay>
                    </GradientOverlay>
                </ContentImage>
                <GradientBottomHeader></GradientBottomHeader>
                <TextContainer>
                    <PromoText>
                        <DestaqueTitle className="bg-primary text-white">Carreiras</DestaqueTitle>
                        <div className='flex flex-col'>
                            <span className="text-[24px]">Pronto para <span className='text-[17px]'>um</span></span><span className="text-[34px] mb-10">Upgrade na sua carreira?</span>
                            <p className='text-[17px] font-light text-[#cbcbcb]'>Venha se juntar ao nosso <b className='font-bold '>time</b> e descubra benefícios que vão além da academia. Com oportunidades para <b className='font-bold'>crescimento</b> e <b className='font-bold'>desenvolvimento</b>, nosso time é como um bom treino – só melhora com a companhia certa.</p><br />
                        </div>
                    </PromoText>
                </TextContainer>
            </ContentHeader>

            <GradientHeaderEnd />
            {/* Highlight Section */}
            <Destaque className="py-16 shadow-lg rounded-lg">
                <div className="container mx-auto">
                    <DestaqueTitle className="bg-primary text-white">Venha ser Flex</DestaqueTitle>
                    <p className="text-3xl text-black">Encontre sua vaga</p>
                    <div className="mt-5">
                        <p>Um bom treino começa com um ótimo time! Venha se juntar a nós e dê um impulso na sua carreira enquanto ajuda a moldar o futuro da nossa empresa.</p>
                        {/* Search Bar */}
                        <form className="flex mt-5 flex-col">
                            {/* Job Search Input */}
                            <div className="col-span-2 w-full">
                                <TextField
                                    fullWidth
                                    label="Pesquisar vagas..."
                                    variant="outlined"
                                />
                            </div>

                            {/* Job Type Select */}
                            <div className="flex flex-row w-full z-[1] mt-5 text-[16px]">
                                <Select
                                    placeholder="Tipo de Vaga"
                                    closeMenuOnSelect={false}
                                    components={animatedComponents}
                                    isMulti
                                    options={jobTypes}
                                    styles={customStyles}
                                    noOptionsMessage={customNoOptionsMessage}
                                />
                                <Select
                                    className='ml-5'
                                    placeholder="Nível de Senioridade"
                                    closeMenuOnSelect={false}
                                    components={animatedComponents}
                                    isMulti
                                    options={seniorityLevels}
                                    styles={customStyles}
                                    noOptionsMessage={customNoOptionsMessage}
                                />
                            </div>



                            {/* Search Button */}
                            <div className="mt-5">
                                <Button
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    style={{ backgroundColor: '#ff0336', color: 'white', fontFamily: 'Poppins', height: '3rem' }}
                                >
                                    Buscar
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </Destaque>

            {/* Features Section */}
            <section className="py-16 mt-5 items-center justify-center flex">
                {/* Job Listings - Placeholder for future implementation */}
                <div className="job-listings items-center justify-center flex flex-col">
                    {/* Implementar lógica para exibir vagas buscadas */}
                    <div className="color-primary text-4xl mb-4"><PiSmileySadLight size={50} /></div>
                    <p className="text-gray-500">Nenhuma vaga encontrada.</p>
                </div>
            </section>
        </>
    );
}

export default Carreiras;
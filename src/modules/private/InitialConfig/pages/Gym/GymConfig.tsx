import { Box, Skeleton, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import logo from '../../../../../modules/assets/images/icon.png';
import { AccessRestrict } from '../../../../common/pages/AccessRestrict';
import { HeaderStep, HeaderStepIcons } from '../../../../common/ui/Header';
import { useSignUpConfigGym } from './hooks';
import { FinishStepConfigGym, FiveStepConfigGym, FourStepConfigGym, OneStepConfigGym, ThreeStepConfigGym, TwoStepConfigGym } from './steps';

export const GymConfig = () => {
    const {
        step,
        name,
        formData,
        isLoading,
        setFormData,
        stepOneErrors,
        setStepOneErrors,
        stepOneFormData,
        setStepOneFormData,
        stepTwoErrors,
        setStepTwoErrors,
        stepTwoFormData,
        setStepTwoFormData,
        stepThreeErrors,
        setStepThreeErrors,
        stepThreeFormData,
        setStepThreeFormData,
        stepFourErrors,
        setStepFourErrors,
        handleContinue,
        handleFinish,
        handleAccess,
        handleBack,
        isAuthorized,
    } = useSignUpConfigGym();

    return (
        <AccessRestrict isAuthorized={isAuthorized}>
            <Box>
                <Box className='!flex flex-row justify-around items-center my-[1.1rem]'>
                    <Link to="/">
                        <Box className='flex w-32 items-center'>
                            <img src={logo} alt="Logo" className='w-[3.7rem]' />
                            <Box className='ml-3 text-[2rem] color-primary font-intro mt-[.35rem]'>iFlex</Box>
                        </Box>
                    </Link>
                    {name ? (
                        <Typography className="!text-[1.4rem] !font-light">
                            Olá, {name ? name.split(' ')[0] : 'Visitante'}!
                        </Typography>
                    ) : (
                        <Skeleton variant="rounded" animation="wave" width={190} height={38} className="m-3 mb-0" />
                    )}
                </Box>
                <Box className='flex flex-col items-center justify-center my-7'>
                    <HeaderStep title="Configurações Iniciais" description='Essas são as principais configurações. Você poderá alterá-las futuramente.' />
                    <HeaderStepIcons currentStep={step} />
                    {(() => {
                        switch (step) {
                            case 0:
                                return (
                                    <>
                                        <OneStepConfigGym
                                            formData={stepOneFormData}
                                            setFormData={setStepOneFormData}
                                            errors={stepOneErrors}
                                            setErrors={setStepOneErrors}
                                            handleContinue={handleContinue}
                                        />
                                    </>
                                );

                            case 1:
                                return (
                                    <>
                                        <TwoStepConfigGym
                                            formData={stepTwoFormData}
                                            setFormData={setStepTwoFormData}
                                            errors={stepTwoErrors}
                                            setErrors={setStepTwoErrors}
                                            handleContinue={handleContinue}
                                            handleBack={handleBack}
                                        />
                                    </>
                                );

                            case 2:
                                return (
                                    <>
                                        <ThreeStepConfigGym
                                            formData={stepThreeFormData}
                                            setFormData={setStepThreeFormData}
                                            errors={stepThreeErrors}
                                            setErrors={setStepThreeErrors}
                                            handleContinue={handleContinue}
                                            handleBack={handleBack}
                                        />
                                    </>
                                );
                            
                            case 3:
                                return (
                                    <>
                                        <FourStepConfigGym
                                            formData={formData}
                                            setFormData={setFormData}
                                            errors={stepFourErrors}
                                            setErrors={setStepFourErrors}
                                            handleContinue={handleContinue}
                                            handleBack={handleBack}
                                        />
                                    </>
                                );

                            case 4:
                                return (
                                    <>
                                        <FiveStepConfigGym
                                            formData={formData}
                                            setFormData={setFormData}
                                            errors={stepFourErrors}
                                            setErrors={setStepFourErrors}
                                            handleFinish={handleFinish}
                                            handleBack={handleBack}
                                            isLoading={isLoading}
                                        />
                                    </>
                                );

                            case 5:
                                return (
                                    <>
                                        <FinishStepConfigGym
                                            handleAccess={handleAccess}
                                        />
                                    </>
                                );

                            default:
                                break;
                        }
                    })()}
                </Box>
            </Box>
        </AccessRestrict>
    );
};

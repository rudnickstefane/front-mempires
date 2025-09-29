import { Box, Button, Divider, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { CgGym } from 'react-icons/cg';
import { FaUserDoctor } from 'react-icons/fa6';
import { LiaTruckLoadingSolid } from 'react-icons/lia';
import { MdOutlineSportsGymnastics } from 'react-icons/md';
import { SignUpFormsType } from '../../common/types';
import { SignUpGymForm, SignUpNutritionistForm, SignUpPersonalForm, SignUpSupplierForm } from './pages';

function SignUp() {
    const [formType, setFormType] = useState<SignUpFormsType[keyof SignUpFormsType] | null>(null);

    const { enqueueSnackbar } = useSnackbar();

    const renderFormContent = () => {
        switch (formType) {
            case 'Gym':
                return <SignUpGymForm enqueueSnackbar={enqueueSnackbar} />;
            case 'Supplier':
                return <SignUpSupplierForm enqueueSnackbar={enqueueSnackbar} />;
            case 'Nutritionist':
                return <SignUpNutritionistForm enqueueSnackbar={enqueueSnackbar} />;
            case 'Personal':
                return <SignUpPersonalForm enqueueSnackbar={enqueueSnackbar} />;
            default:
                break;
        }
    };
        

    return (
        <>
            <Box className='flex flex-col justify-center items-center my-7'>
                {!formType && (
                    <Box className='w-[500px] rounded-lg p-10 shadow-lg bg-white'>
                        <Box className='flex justify-center'>
                            <Typography className='!text-3xl text-[#333333]'>Eu sou</Typography>
                        </Box>
                        <Divider className='!my-5' />
                        <Box className='flex flex-col justify-center'>
                            <Button
                                variant="outlined"
                                startIcon={<CgGym className='mx-2.5'/>}
                                className='flex flex-row text-left !justify-start'
                                onClick={() => {setFormType('Gym')}}
                                sx={{
                                textTransform: 'none',
                                backgroundColor: 'transparent',
                                color: '#4b5563',
                                borderColor: '#0000003b',
                                '&:hover': {
                                    color: '#ff0336',
                                    backgroundColor: '#ff335f1d',
                                    borderColor: '#ff0336',
                                },
                                }}
                            >
                                <Box className='flex flex-col font-poppins'>Academia
                                    <Typography className='!text-[0.8rem]'>
                                        Cadastre sua academia para gerenciar alunos e planos de forma prática.
                                    </Typography>
                                </Box>
                            </Button>
                            <Button
                                variant="outlined"
                                startIcon={<LiaTruckLoadingSolid className='mx-2.5'/>}
                                className='flex flex-row text-left !justify-start !mt-5'
                                onClick={() => setFormType('Supplier')}
                                sx={{
                                textTransform: 'none',
                                backgroundColor: 'transparent',
                                color: '#4b5563',
                                borderColor: '#0000003b',
                                '&:hover': {
                                    color: '#ff0336',
                                    backgroundColor: '#ff335f1d',
                                    borderColor: '#ff0336',
                                },
                                }}
                                disabled={true}
                            >
                                <Box className='flex flex-col font-poppins'>Fornecedor
                                    <Typography className='!text-[0.8rem]'>
                                        Cadastre sua empresa para fornecer produtos e serviços às academias.
                                    </Typography>
                                </Box>
                            </Button>
                            <Button
                                variant="outlined"
                                startIcon={<FaUserDoctor className='mx-2.5'/>}
                                className='flex flex-row text-left !justify-start !mt-5'
                                onClick={() => setFormType('Nutritionist')}
                                sx={{
                                textTransform: 'none',
                                backgroundColor: 'transparent',
                                color: '#4b5563',
                                borderColor: '#0000003b',
                                '&:hover': {
                                    color: '#ff0336',
                                    backgroundColor: '#ff335f1d',
                                    borderColor: '#ff0336',
                                },
                                }}
                                disabled={true}
                            >
                                <Box className='flex flex-col font-poppins'>Nutricionista
                                    <Typography className='!text-[0.8rem]'>
                                        Cadastre-se para oferecer planos nutricionais personalizados aos alunos das academias.
                                        </Typography>
                                </Box>
                            </Button>
                            <Button
                                variant="outlined"
                                startIcon={<MdOutlineSportsGymnastics className='mx-2.5'/>}
                                className='flex flex-row text-left !justify-start !mt-5'
                                onClick={() => setFormType('Personal')}
                                sx={{
                                textTransform: 'none',
                                backgroundColor: 'transparent',
                                color: '#4b5563',
                                borderColor: '#0000003b',
                                '&:hover': {
                                    color: '#ff0336',
                                    backgroundColor: '#ff335f1d',
                                    borderColor: '#ff0336',
                                },
                                }}
                                disabled={true}
                            >
                                <Box className='flex flex-col font-poppins'>Personal Trainer
                                    <Typography className='!text-[0.8rem]'>
                                        Cadastre-se para gerenciar treinos e acompanhar seus alunos.
                                    </Typography>
                                </Box>
                            </Button>
                        </Box>
                    </Box>
                )}
                {renderFormContent()}
            </Box>
        </>
    );
}

export default SignUp;

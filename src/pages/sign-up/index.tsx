import { useState } from 'react';
import { HeaderLight } from '../../components/Header/light';
import { SignUpGymForm } from './forms/sign-up-gym-forms';
import { ButtonCustom, SignInUp } from './styles.d';
import { SignUpFormsType } from './types/sign-up-forms.types';

const formComponents: { [key in SignUpFormsType]: React.ComponentType } = {
    Gym: SignUpGymForm,
    Supplier: SignUpGymForm,
    Nutritionist: SignUpGymForm,
    PersonalTrainer: SignUpGymForm,
};

function SignUp() {

    const [selectedForm, setSelectedForm] = useState<SignUpFormsType | null>(null);

    const SelectedFormComponent = selectedForm ? formComponents[selectedForm] : null;

    return (
        <>
            <HeaderLight />
            <SignInUp className='mx-20 mt-7 flex flex-row'>
                {!selectedForm && (
                    <div className='w-[100%] p-10 bg-white mt-5'>
                        <div className='flex justify-center border-b-[1px] pb-5 mb-5'>
                            <h1 className='text-3xl text-[#333333]'>Eu sou</h1>
                        </div>
                        <div className='flex justify-center'>
                            <ButtonCustom
                                variant="outlined"
                                size="large"
                                style={{ margin: '10px', width: '50%' }}
                                onClick={() => setSelectedForm('Gym')}>
                                Academia
                            </ButtonCustom>
                            <ButtonCustom
                                variant="outlined"
                                size="large"
                                style={{ margin: '10px', width: '50%' }}>
                                Fornecedor
                            </ButtonCustom>
                            <ButtonCustom
                                variant="outlined"
                                size="large"
                                style={{ margin: '10px', width: '50%' }}>
                                Nutricionista
                            </ButtonCustom>
                            <ButtonCustom
                                variant="outlined"
                                size="large"
                                style={{ margin: '10px', width: '50%' }}>
                                Personal Trainer
                            </ButtonCustom>
                        </div>
                    </div>
                )}
                {SelectedFormComponent && <SelectedFormComponent />}
            </SignInUp>
        </>
    );
}

export default SignUp;

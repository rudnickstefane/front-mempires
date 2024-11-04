import { Box } from '@mui/material';
import { HeaderLight } from '../../../components/Header/light';
import { GymConfigForm } from './config';

export function GymConfig() {

    return (
        <>
            <HeaderLight />
            <Box className='flex flex-col items-center'>
                <Box className='flex flex-auto w-auto h-auto'>
                    <Box className='flex flex-col items-center'>
                        <GymConfigForm />
                    </Box>
                </Box>
            </Box>
        </>
    );
}

import { Box } from '@mui/material';
import { HeaderMenu } from '../../menu';
import { ContentImage, GradientOverlay } from '../styles.d';

export function Header() {

    return (
        <>
            <HeaderMenu />
            <Box className='flex h-[39rem] bg-[#08041b]'>
                <Box className='absolute w-full h-[7rem] bg-gradient-to-b from-[#08041b]'></Box>
                <ContentImage>
                    <GradientOverlay>
                    </GradientOverlay>
                </ContentImage>
                <Box className='absolute w-full h-[39rem] bg-gradient-to-t from-[#08041b]'></Box>
            </Box>
            <Box className="absolute md:ml-28 ml-11 w-10 h-0 border-l-[2rem] border-r-[2rem] border-b-[2rem] border-transparent border-b-[#ff0336] mx-auto -mt-5"></Box>
            <Box className="w-full bg-primary h-4"></Box>
        </>
    );
}

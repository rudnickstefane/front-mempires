import { Box, Button } from '@mui/material';
import * as motion from "motion/react-client";
import { BsAndroid2, BsApple, BsGooglePlay } from 'react-icons/bs';
import { Menu } from '../../../../components/Menu';
import { useHomeHeaderLogic } from './hooks';

export function HomeHeader() {
  const {
    ref,
    controls,
    containerVariants,
    childVariants,
  } = useHomeHeaderLogic();
  
  return (
    <>
      <Box className='h-[47.5rem]'>
        <Menu />
        <Box className='flex justify-center mt-6 relative'>
          <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={controls}
          >
            <Box className='flex flex-col items-center justify-center w-full z-10 relative'>
              <motion.div variants={childVariants}>
                <Box className='logo mt-10 mb-16'></Box>
              </motion.div>
              <Box className='flex flex-row gap-16'>
                <motion.div variants={childVariants}>
                  <Button
                    className='!normal-case font-secondary !rounded-xl !bg-black !text-white w-[190px] h-[60px] !leading-5'
                    disableElevation
                    startIcon={<BsApple size={34}/>}
                  >
                    <Box className='flex flex-col items-start'>
                      <Box className='uppercase text-xs'>Em breve na</Box>
                      <Box className='text-[1.2rem] font-bold'>App Store</Box>
                    </Box>
                  </Button>
                </motion.div>
                <motion.div variants={childVariants}>
                  <Button
                    className='!normal-case font-secondary !rounded-xl !bg-black !text-white w-[190px] h-[60px] !leading-5'
                    disableElevation
                    startIcon={<BsGooglePlay size={34}/>}
                  >
                    <Box className='flex flex-col items-start'>
                      <Box className='uppercase text-xs'>Em breve no</Box>
                      <Box className='text-[1.2rem] font-bold'>Google Play</Box>
                    </Box>
                  </Button>
                </motion.div>
                <motion.div variants={childVariants}>
                  <Button
                    className='!normal-case font-secondary !rounded-xl !bg-black !text-white w-[190px] h-[60px] !leading-5'
                    disableElevation
                    startIcon={<BsAndroid2 size={34}/>}
                  >
                    <Box className='flex flex-col items-start'>
                      <Box className='uppercase text-xs'>Em breve o</Box>
                      <Box className='text-[1.2rem] font-bold'>.APK</Box>
                    </Box>
                  </Button>
                </motion.div>
              </Box>
            </Box>
          </motion.div>
        </Box>
        <Box className="gradient-box" />
      </Box>
    </>
  );
}

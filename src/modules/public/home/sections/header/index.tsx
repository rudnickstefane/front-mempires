import { Box } from '@mui/material';
import Announcement from '@sr/modules/components/sliders/announcement';
import * as motion from "motion/react-client";
import { Menu } from '../../../../components/Menu';
import { useHomeHeaderLogic } from './hooks';

export function HomeHeader() {
  const {
    ref,
    controls,
    containerVariants,
    childVariants,
  } = useHomeHeaderLogic();

  const slides = [
    { id: 1, imageUrl: "@sr/modules/assets/images/header-box.png", link: "#" },
  ];
  
  return (
    <>
      <Box className='bg-theme h-[47.5rem]'>
        <Menu />
        <Box className='flex justify-center mt-6 z-[1] relative'>
          <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={controls}
          >
            <motion.div variants={childVariants} className='flex justify-center w-full z-10 relative'>
              <Box className='logo'></Box>
            </motion.div>
            <Box className="bg-header-box rounded-3xl w-full md:w-[70rem] h-[30rem] -mt-56 flex flex-row items-end text-center">
              <motion.div variants={childVariants} className='w-full'>
                <Box className="w-full h-[30rem] flex items-center justify-center">
                  <Announcement slides={slides} className='rounded-xl'/>
                </Box>
              </motion.div>
            </Box>
          </motion.div>
        </Box>
        <Box className="gradient-box" />
      </Box>
    </>
  );
}

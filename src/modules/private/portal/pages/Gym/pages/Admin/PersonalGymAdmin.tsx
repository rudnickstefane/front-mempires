import { Box, Divider, Typography } from "@mui/material";
import { MdKeyboardArrowRight } from "react-icons/md";

export default function PersonalGymAdmin() {
    return (
        <Box>
            <Box className="overflow-x-auto max-h-[calc(100vh-60px)] p-5 pb-[4rem]">
                <Box className="flex flex-row w-full">
                    <Box className="bg-white w-full rounded-3xl shadow-md p-5 border border-[#EAECF0]">
                        <Box className='flex flex-row justify-between items-center'>
                            <Box>
                                <Typography className='flex flex-row items-center !text-[2.25rem] text-[#212121]'>
                                    Personal Trainers
                                </Typography>
                                <Typography className='flex flex-row items-center !text-[.85rem] !mt-4'>
                                    Administrativo<MdKeyboardArrowRight />Personal Trainers
                                </Typography>
                            </Box>
                        </Box>
                        <Divider className='!my-5 w-full bg-[#e2e2e4]' />
                        <Box className="flex flex-col items-center mb-5">
                            <Box className="text-[#E94560] text-[2.5rem] mb-3">Oops!</Box>
                            <Typography>Essa funcionalidade estará disponível em breve.</Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}

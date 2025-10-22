import { Box } from "@mui/material";
import '../../../input.css';
import Footer from "../../components/Footer";
import { HomeHeader } from "./sections/header";

export default function Home() {
  return (
    <>
      <HomeHeader />
      <Box className='p-5'>
      </Box>
      <Footer />
    </>
  );
}
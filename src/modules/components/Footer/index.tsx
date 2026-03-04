import { Box } from "@mui/material";
import { Typography } from "@sr/common/iu/components/Typography";
import { Logo } from "@sr/modules/common/ui/Logo";
import { FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { HashLink as Link } from "react-router-hash-link";

function Footer() {
  return (
    <Box
      component="section"
      id="contact"
      className="pt-20 bg-primary-950 text-white"
    >
      <Box className="flex flex-col mx-auto max-w-screen-2xl px-6 gap-20">
        <Box className="flex flex-col md:flex-row gap-10 justify-center items-start w-full">
          {/* Coluna 1: Logo e Descrição */}
          <Box className="flex flex-col w-full">
            <Logo className="text-3xl transition-all duration-300 text-white" />
            <Typography className="mt-5 text-sm leading-relaxed max-w-xs">
              Transformando a gestão de convênios farmacêuticos com tecnologia.
            </Typography>
            <Box className="flex mt-7 space-x-4">
              {[
                {
                  to: "https://linkedin.com/company/benefycare",
                  icon: <FaLinkedinIn size={17} className="text-primary" />,
                },
                {
                  to: "https://instagram.com/benefycare",
                  icon: <FaInstagram size={20} className="text-primary" />,
                },
              ].map((link, index) => (
                <Link
                  key={index}
                  to={link.to}
                  target="_blank"
                  rel="noopener noreferrer"
                  className=" p-3 rounded-full transition-colors duration-300 !w-10 !h-10 flex justify-center items-center bg-white/10 hover:bg-white/20"
                >
                  {link.icon}
                </Link>
              ))}
            </Box>
          </Box>

          <Box className="flex flex-col gap-5 w-full">
            <Typography className="text-xl font-semibold">Soluções</Typography>
            <Box className="flex flex-col gap-3">
              {[
                { to: "#funcionalidades", text: "Gestão de Convênios" },
                { to: "#diferenciais", text: "Programa de Cashback" },
                { to: "#diferenciais", text: "Segurança e Token" },
              ].map((link, index) => (
                <Box key={index}>
                  <Link
                    smooth
                    to={link.to}
                    className="text-gray-300 hover:text-white no-underline text-sm transition-all duration-300"
                  >
                    {link.text}
                  </Link>
                </Box>
              ))}
            </Box>
          </Box>

          <Box className="flex flex-col gap-5 w-full">
            <Typography className="text-xl font-semibold">
              Vamos impulsionar seu negócio?
            </Typography>
            <Typography className="text-sm text-gray-300">
              Agende uma demonstração, tire dúvidas comerciais ou contrate a
              BenefyCare para sua rede agora mesmo.
            </Typography>
            <Link
              to="mailto:contato@benefycare.com.br"
              className="text-white font-medium no-underline border-b border-white/20 pb-1 w-fit hover:border-white transition-all"
            >
              contato@benefycare.com.br
            </Link>
          </Box>
        </Box>

        <Box className="flex flex-col md:flex-row text-center py-10 items-center justify-between border-solid border-0 border-t border-white/10">
          <Typography className="text-sm text-gray-400">
            © {new Date().getFullYear()} BenefyCare. Tecnologia para gestão de
            benefícios e saúde.
          </Typography>
          <Typography className="text-sm text-gray-400 mt-2 md:mt-0">
            -/-
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default Footer;

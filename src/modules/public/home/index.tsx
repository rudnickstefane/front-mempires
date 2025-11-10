import { VolumeUp } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import Announcement from "@sr/modules/components/sliders/announcement";
import { motion, useAnimation } from "framer-motion";
import { VolumeOff } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import "../../../input.css";
import Footer from "../../components/Footer";
import { HomeHeader } from "./sections/header";
import HomeSlideComponent from "./sections/slider";

export default function Home() {
  const [playing, setPlaying] = useState(false);
  const [audioInitialized, setAudioInitialized] = useState(false);
  const [wasPlayingBeforeHidden, setWasPlayingBeforeHidden] = useState(false);

  const { ref, inView } = useInView({ threshold: 0.2 });
  const controls = useAnimation();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Variantes de animação
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.3, when: "beforeChildren" } },
  };

  const childVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } },
  };

  // Inicializa o áudio
  useEffect(() => {
    const audio = new Audio("/mempires.mp3");
    audio.loop = true;
    audioRef.current = audio;
    return () => audio.pause();
  }, []);

  // Inicia o áudio (após interação do usuário)
  const startAudio = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || audioInitialized) return;

    audio.play()
      .then(() => {
        setAudioInitialized(true);
        setPlaying(true);
      })
      .catch(() => {});
  }, [audioInitialized]);

  // Alterna entre play/pause
  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const toggle = playing
      ? Promise.resolve(audio.pause())
      : audio.play().then(() => setAudioInitialized(true));

    toggle.then(() => setPlaying(!playing));
  }, [playing]);

  // Inicia áudio no primeiro clique
  useEffect(() => {
    const handleClick = () => startAudio();
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [startAudio]);

  // Pausa quando sai da aba e retoma apenas se estava tocando antes
  useEffect(() => {
    const handleVisibilityChange = () => {
      const audio = audioRef.current;
      if (!audio || !audioInitialized) return;

      if (document.hidden) {
        setWasPlayingBeforeHidden(playing);
        playing && audio.pause();
        setPlaying(false);
        return;
      }

      if (wasPlayingBeforeHidden) {
        audio.play().then(() => setPlaying(true)).catch(() => {});
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [audioInitialized, playing, wasPlayingBeforeHidden]);

  // Controla animações de entrada
  useEffect(() => {
    controls.start(inView ? "visible" : "hidden");
  }, [inView, controls]);

  const slides = [{ id: 1, imageUrl: "@sr/modules/assets/images/header-box.png", link: "#" }];

  return (
    <>
      <HomeHeader />

      {/* Controle de áudio */}
      <IconButton
        onClick={togglePlay}
        sx={{
          position: "fixed",
          bottom: 16,
          right: 16,
          color: "white",
          zIndex: 1000,
          backgroundColor: "rgba(0,0,0,0.5)",
          "&:hover": { backgroundColor: "rgba(0,0,0,0.7)" },
        }}
      >
        {playing ? <VolumeUp /> : <VolumeOff />}
      </IconButton>

      <Box className="p-5 mx-auto w-full max-w-screen-2xl">
        <HomeSlideComponent />
        <motion.div ref={ref} variants={containerVariants} initial="hidden" animate={controls}>
          <Box className="mt-10 bg-secondary rounded-3xl w-full p-16 flex flex-row items-center">
            <motion.div variants={childVariants} className="w-full">
              <img
                src=""
                alt="Uma pessoa com um celular no colo e seu gato olhando para a janela"
                className="w-full h-auto"
              />
            </motion.div>

            <motion.div variants={childVariants} className="w-full">
              <Box className="text-white">
                <Typography variant="h4" className="text-white !font-bold !mb-6">
                  Do sofá da sua casa para o lar dos seus sonhos.
                </Typography>
                <Typography className="text-white">
                  Comunicação descomplicada, a gente conecta você ao imóvel ideal.
                </Typography>
              </Box>
            </motion.div>
          </Box>
        </motion.div>

        <Box className="bg-header-box rounded-3xl w-full md:w-[70rem] h-[30rem] flex flex-row items-end text-center">
          <motion.div variants={childVariants} className="w-full">
            <Box className="w-full h-[30rem] flex items-center justify-center">
              <Announcement slides={slides} className="rounded-xl" />
            </Box>
          </motion.div>
        </Box>
      </Box>

      <Footer />
    </>
  );
}

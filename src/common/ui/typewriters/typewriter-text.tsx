import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";

interface TypewriterTextProps {
  messages: string[];
}

export const TypewriterText = ({ messages }: TypewriterTextProps) => {
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loop, setLoop] = useState(0);

  useEffect(() => {
    const currentMessage = messages[loop % messages.length];

    // Determinamos o próximo estado do texto sem blocos if/else
    const nextText = isDeleting
      ? currentMessage.substring(0, displayText.length - 1)
      : currentMessage.substring(0, displayText.length + 1);

    const timer = setTimeout(
      () => {
        setDisplayText(nextText);

        // Lógica de virada de estado baseada em booleanos simples
        const finishedTyping = !isDeleting && displayText === currentMessage;
        const finishedDeleting = isDeleting && displayText === "";

        // Se terminou de escrever, começa a apagar em 2s
        finishedTyping && setIsDeleting(true);

        // Se terminou de apagar, pula para a próxima frase
        if (finishedDeleting) {
          setIsDeleting(false);
          setLoop((prev) => prev + 1);
        }
      },
      isDeleting ? 40 : 100,
    );

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, loop, messages]);

  return (
    <Typography className="flex flex-row !text-white !text-5xl !font-light !font-manrope !mt-5">
      Para você
      <Box component="span" className="font-bold ml-3 flex flex-row">
        {displayText}
        <Box
          component="span"
          className="w-1 bg-white inline-block align-middle ml-1"
          sx={{
            animation: "pulse 1.2s ease-in-out infinite",
            "@keyframes pulse": {
              "0%, 100%": { opacity: 1 },
              "50%": { opacity: 0 },
            },
          }}
        />
      </Box>
    </Typography>
  );
};

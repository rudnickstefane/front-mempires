import { Cancel } from "@mui/icons-material";
import { Box, Stack } from "@mui/material";
import { Typography } from "@sr/common/iu/components/Typography";
import { CloseCircle, TickCircle } from "iconsax-react";
import { useMemo } from "react";

interface Props {
  password: string;
}

export function PasswordStrength({ password }: Props) {
  const criteria = useMemo(
    () => [
      {
        label: "Pelo menos 1 letra maiúscula (A-Z)",
        met: /[A-Z]/.test(password),
      },
      {
        label: "Pelo menos 1 letra minúscula (a-z)",
        met: /[a-z]/.test(password),
      },
      { label: "Pelo menos 1 número (0-9)", met: /[0-9]/.test(password) },
      {
        label: "Pelo menos 1 caractere especial",
        met: /[^A-Za-z0-9]/.test(password),
      },
      { label: "Mínimo 8 caracteres", met: password.length >= 8 },
    ],
    [password],
  );

  const forbidden = useMemo(() => {
    const checkSequentials = (str: string) => {
      const s = str.toLowerCase();
      for (let i = 0; i < s.length - 2; i++) {
        const char1 = s.charCodeAt(i);
        const char2 = s.charCodeAt(i + 1);
        const char3 = s.charCodeAt(i + 2);
        if (char2 === char1 + 1 && char3 === char2 + 1) return true;
      }
      return false;
    };

    const hasRepeated = /(.)\1/.test(password);
    const hasSequentials = checkSequentials(password);

    return { hasSequentials, hasRepeated };
  }, [password]);

  const strength = useMemo(() => {
    if (!password) return 0;
    const metCount = criteria.filter((c) => c.met).length;
    let score = (metCount / criteria.length) * 100;

    if (forbidden.hasSequentials || forbidden.hasRepeated) score *= 0.2;
    return score;
  }, [criteria, password, forbidden]);

  const config = useMemo(() => {
    if (!password)
      return {
        label: "Aguardando...",
        textColor: "text-gray-400",
        barColor: "bg-gray-200",
      };

    if (forbidden.hasSequentials || forbidden.hasRepeated) {
      return {
        label: "Remova os padrões proibidos",
        textColor: "text-red-600",
        barColor: "bg-red-600",
      };
    }

    if (strength < 60)
      return {
        label: "Senha Fraca",
        textColor: "text-red-500",
        barColor: "bg-red-500",
      };
    if (strength < 100)
      return {
        label: "Senha Razoável",
        textColor: "text-orange-500",
        barColor: "bg-orange-500",
      };

    return {
      label: "Senha Segura",
      textColor: "text-green-600",
      barColor: "bg-green-600 font-bold",
    };
  }, [password, strength, forbidden]);

  return (
    <Box className="flex flex-col gap-6">
      <Box className="w-full">
        <Box className="flex justify-between items-center mb-1">
          <Typography className="text-xs font-medium text-gray-500">
            Força da Senha
          </Typography>
          <Typography
            className={`text-xs font-semibold text-gray-600 transition-colors duration-300 ${config.textColor}`}
          >
            {config.label}
          </Typography>
        </Box>
        <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-500 ease-out ${config.barColor}`}
            style={{ width: `${strength}%` }}
          />
        </div>
      </Box>

      <Stack spacing={1}>
        <Typography className="font-medium text-xs text-gray-500">
          Deve conter:
        </Typography>
        <Box className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {criteria.map((c, i) => (
            <Box key={i} className="flex items-center gap-2">
              {c.met ? (
                <TickCircle
                  variant="Bold"
                  size={16}
                  className="text-green-500"
                />
              ) : (
                <CloseCircle
                  variant="Linear"
                  size={16}
                  className="text-gray-400"
                />
              )}
              <Typography
                className={`text-xs ${c.met ? "text-green-600" : "text-gray-500"}`}
              >
                {c.label}
              </Typography>
            </Box>
          ))}
        </Box>
      </Stack>

      {(forbidden.hasSequentials || forbidden.hasRepeated) && (
        <Box className="mt-1 p-3 bg-red-50 border-solid border border-red-100 rounded-lg">
          <Typography className="text-[10px] font-bold text-red-600 uppercase mb-1.5">
            Atenção: Remova para prosseguir
          </Typography>
          <Stack spacing={0.5}>
            {forbidden.hasSequentials && (
              <Box className="flex items-center gap-2">
                <Cancel className="text-red-400 text-sm" />
                <Typography className="text-xs text-red-700 font-medium">
                  Dígitos ou letras sequenciais (ex: 123, abc)
                </Typography>
              </Box>
            )}
            {forbidden.hasRepeated && (
              <Box className="flex items-center gap-2">
                <Cancel className="text-red-400 text-sm" />
                <Typography className="text-xs text-red-700 font-medium">
                  Caracteres repetidos (ex: aaa, 111)
                </Typography>
              </Box>
            )}
          </Stack>
        </Box>
      )}
    </Box>
  );
}

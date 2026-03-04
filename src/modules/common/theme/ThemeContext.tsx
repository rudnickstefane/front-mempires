import { useCallback, useEffect, useState } from "react";

type ThemeMode = "default" | "system" | "light" | "dark";
type EffectiveTheme = "light" | "dark" | "rainy" | "sunset";

export const useThemeDarkMode = () => {
  const [themeMode, setThemeMode] = useState<ThemeMode>("default");

  // 🔹 Função para determinar o tema baseado no horário (para modo default)
  const getTimeBasedTheme = useCallback((): EffectiveTheme => {
    const hour = new Date().getHours();

    const themeRules = [
      { test: hour >= 5 && hour < 12, value: "light" as EffectiveTheme },
      {
        test: hour >= 12 && hour < 15,
        value:
          Math.random() < 0.3
            ? ("rainy" as EffectiveTheme)
            : ("afternoon" as EffectiveTheme),
      },
      { test: hour >= 15 && hour < 17, value: "sunset" as EffectiveTheme },
      { test: hour >= 17 && hour < 19, value: "nightfall" as EffectiveTheme },
      { test: true, value: "dark" as EffectiveTheme },
    ];

    const rule = themeRules.find((rule) => rule.test)!;
    return rule.value;
  }, []);

  // 🔹 Função para aplicar tema no body
  const applyTheme = useCallback(
    (mode: ThemeMode) => {
      let effectiveTheme: EffectiveTheme;

      if (mode === "system") {
        const prefersDark = window.matchMedia(
          "(prefers-color-scheme: dark)",
        ).matches;
        effectiveTheme = prefersDark ? "dark" : "light";
      } else if (mode === "default") {
        // Para modo padrão, usa o tema baseado no horário
        effectiveTheme = getTimeBasedTheme();
      } else {
        // Para light e dark, usa diretamente
        effectiveTheme = mode;
      }

      effectiveTheme = "light";

      // Remove temas antigos e adiciona o novo
      document.body.removeAttribute("data-theme");
      document.body.setAttribute("data-theme", effectiveTheme);

      // Salva no cache apenas o modo selecionado, não o effectiveTheme
      localStorage.setItem("themeMode", mode);
    },
    [getTimeBasedTheme],
  );

  useEffect(() => {
    // 🔹 Carrega o tema salvo do cache (localStorage)
    const savedTheme = localStorage.getItem("themeMode") as ThemeMode | null;

    if (savedTheme) {
      applyTheme(savedTheme);
      setThemeMode(savedTheme);
    } else {
      applyTheme("default");
      setThemeMode("default");
    }
  }, [applyTheme]);

  // 🔹 Altera o tema manualmente
  const changeTheme = useCallback(
    (mode: ThemeMode) => {
      setThemeMode(mode);
      applyTheme(mode);
    },
    [applyTheme],
  );

  return { themeMode, changeTheme };
};

import { useEffect, useState } from "react";

const fetchDarkModeFromDatabase = async (): Promise<boolean | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(null); // Simula que o banco pode não ter um valor salvo (null)
    }, 1000);
  });
};

export const useThemeDarkMode = () => {
  const [darkMode, setDarkMode] = useState<boolean | null>(null);

  useEffect(() => {
    const getDarkModeStatus = async () => {
      const savedTheme = await fetchDarkModeFromDatabase();

      if (savedTheme !== null) {
        setDarkMode(savedTheme);
      } else {
        // Se o banco não tiver um valor salvo, usa a preferência do sistema
        const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        setDarkMode(systemPrefersDark);
      }
    };

    getDarkModeStatus();
  }, []);

  useEffect(() => {
    if (darkMode !== null) {
      document.body.setAttribute("data-theme", darkMode ? "dark" : "light");
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  return { darkMode, toggleDarkMode };
};
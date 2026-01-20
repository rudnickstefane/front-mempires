type ObfuscateType =
  | "document"
  | "email"
  | "name"
  | "date"
  | "phone"
  | "address"
  | "text";

/**
 * Obfusca dados sensíveis preservando contexto para o usuário.
 */
export const obfuscate = (
  value: string | undefined | null,
  type: ObfuscateType = "text",
): string => {
  if (!value?.trim()) return "-";
  const str = value.trim();

  const strategies: Record<ObfuscateType, () => string> = {
    name: () =>
      str
        .split(" ")
        .map((w) => (w.length <= 1 ? w : w[0] + "*".repeat(w.length - 1)))
        .join(" "),
    address: () => strategies.name(),

    email: () => {
      const [user, domain] = str.split("@");
      if (!user || !domain) return str;
      const [main, ...ext] = domain.split(".");
      const maskedUser = `${user.slice(0, 2)}****`;
      const maskedDomain = main.length > 2 ? `***${main.slice(-2)}` : "***";
      return `${maskedUser}@${maskedDomain}.${ext.join(".")}`;
    },

    date: () => str.replace(/^(\d{2})\/(\d{2})\/\d{2}(\d{2})$/, "**/**/**$3"),

    phone: () => {
      const clean = str.replace(/\D/g, "");
      return clean.length >= 4
        ? `(${clean.slice(0, 2)}) *****-**${clean.slice(-2)}`
        : str;
    },

    document: () => {
      const clean = str.replace(/[^a-zA-Z0-9]/g, "");

      if (clean.length === 8)
        return `${clean.slice(0, 2)}***-${clean.slice(5)}`;
      if (clean.length === 11)
        return clean.replace(/^(\d{3})\d{6}(\d{2})$/, "$1.***.***-$2");
      if (clean.length === 9)
        return clean.replace(/^(\d{2})\d{6}([0-9X])$/, "$1.***.***-$2");

      return `${clean.slice(0, 3)}****${clean.slice(-1)}`;
    },

    text: () => `${str.slice(0, 2)}****`,
  };

  return (strategies[type] || strategies.text)();
};

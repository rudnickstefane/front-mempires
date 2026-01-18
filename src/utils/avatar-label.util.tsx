export const avatarLabel = (name?: string): string => {
  if (!name) return "";

  const names = name.trim().split(/\s+/);

  if (names.length === 0) return "";
  if (names.length === 1) return names[0].charAt(0).toUpperCase();

  const firstInitial = names[0].charAt(0);
  const lastInitial = names[names.length - 1].charAt(0);

  return (firstInitial + lastInitial).toUpperCase();
};

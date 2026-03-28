export const segmentDetails: Record<
  string,
  { label: string; color: string; bgColor: string }
> = {
  PHARMA: { label: "Farmácia", color: "#1e40af", bgColor: "#dbeafe" },
  MARKET: { label: "Alimentos", color: "#166534", bgColor: "#dcfce7" },
  HEALTH: { label: "Saúde", color: "#86198f", bgColor: "#f5d0fe" },
};

export const entityDetails: Record<
  string,
  { label: string; color: string; bgColor: string }
> = {
  NETWORK: { label: "Rede", color: "#92400e", bgColor: "#fef3c7" },
  INDEPENDENT: { label: "Independente", color: "#374151", bgColor: "#f3f4f6" },
  ASSOCIATION: { label: "Associação", color: "#075985", bgColor: "#e0f2fe" },
};

export const entityBadges: Record<
  string,
  { label: string; color: string; bgColor: string }
> = {
  NETWORK: {
    label: "Rede & Grupo",
    color: "#374151",
    bgColor: "#f3f4f6",
  },
  INDEPENDENT: { label: "Independente", color: "#374151", bgColor: "#3498db" },
  ASSOCIATION: {
    label: "Associação",
    color: "#FFF",
    bgColor: "#2980b9",
  },
  WAITING_RESPONSE: {
    label: "Aguardando resposta",
    color: "#FFF",
    bgColor: "#1c2227",
  },
  CANCELED: { label: "Cancelado", color: "#FFF", bgColor: "#e74c3c" },
  PENDING: { label: "Pendente", color: "#FFF", bgColor: "#1f73b7" },
  IN_PROGRESS: {
    label: "Em andamento",
    color: "#FFF",
    bgColor: "#cd3642",
  },
  NEW: { label: "Novo", color: "#4c2c17", bgColor: "#fca347" },
  WAITING_CONFIRMATION: {
    label: "Aguardando Confirmação",
    color: "#FFF",
    bgColor: "#95a5a6",
  }, // Cinza claro
  ATTEMPTED: {
    label: "Tentativa Sem Retorno",
    color: "#FFF",
    bgColor: "#d35400",
  }, // Laranja queimado
  NO_ANSWER: {
    label: "Sem Resposta",
    color: "#FFF",
    bgColor: "#bdc3c7",
  }, // Cinza prateado
  FOLLOW_UP: {
    label: "Acompanhamento",
    color: "#FFF",
    bgColor: "#16a085",
  }, // Verde-azulado
  EXPIRED: { label: "Expirado", color: "#FFF", bgColor: "#c0392b" }, // Vermelho escuro
  CLOSED: { label: "Encerrado", color: "#FFF", bgColor: "#27ae60" },
  FAILED: { label: "Falhou", color: "#FFF", bgColor: "#e74c3c" }, // Vermelho para falha
  ESCALATED: { label: "Escalado", color: "#FFF", bgColor: "#8e44ad" }, // Roxo para escalonamento
  BLACKLISTED: {
    label: "Bloqueado",
    color: "#FFF",
    bgColor: "#2c3e50",
  },
  FEATURE: { label: "Novidade", color: "#4c2c17", bgColor: "#fca347" },
  FIX: { label: "Correção", color: "#FFF", bgColor: "#ff0336" },
  EVOLUTION: { label: "Evolução", color: "#FFF", bgColor: "#007bff" },
  UPDATE: { label: "Atualização", color: "#FFF", bgColor: "#27ae60" },
};

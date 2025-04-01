export const StatusMapper: Record<string, { label: string; color: string, backgroundColor: string }> = {
    RESOLVED: { label: 'Resolvido', color: '#FFF', backgroundColor: '#5c6970'},
    SCHEDULED: { label: 'Agendado', color: '#FFF', backgroundColor: '#3498db' }, // Azul para planejamento
    RESCHEDULED: { label: 'Reagendado', color: '#FFF', backgroundColor: '#2980b9' },
    WAITING_RESPONSE: { label: 'Aguardando resposta', color: '#FFF', backgroundColor: '#1c2227'},
    CANCELED: { label: 'Cancelado', color: '#FFF', backgroundColor: '#e74c3c' },
    PENDING: { label: 'Pendente', color: '#FFF', backgroundColor: '#1f73b7'},
    IN_PROGRESS: { label: 'Em andamento', color: '#FFF', backgroundColor: '#cd3642'},
    NEW: { label: 'Novo', color: '#4c2c17', backgroundColor: '#fca347'},
    WAITING_CONFIRMATION: { label: 'Aguardando Confirmação', color: '#FFF', backgroundColor: '#95a5a6' }, // Cinza claro
    ATTEMPTED: { label: 'Tentativa Sem Retorno', color: '#FFF', backgroundColor: '#d35400' }, // Laranja queimado
    NO_ANSWER: { label: 'Sem Resposta', color: '#FFF', backgroundColor: '#bdc3c7' }, // Cinza prateado
    FOLLOW_UP: { label: 'Acompanhamento', color: '#FFF', backgroundColor: '#16a085' }, // Verde-azulado
    EXPIRED: { label: 'Expirado', color: '#FFF', backgroundColor: '#c0392b' }, // Vermelho escuro
    CLOSED: { label: 'Encerrado', color: '#FFF', backgroundColor: '#27ae60' },
    FAILED: { label: 'Falhou', color: '#FFF', backgroundColor: '#e74c3c' }, // Vermelho para falha
    ESCALATED: { label: 'Escalado', color: '#FFF', backgroundColor: '#8e44ad' }, // Roxo para escalonamento
    BLACKLISTED: { label: 'Bloqueado', color: '#FFF', backgroundColor: '#2c3e50' },
    FEATURE: { label: 'Novidade', color: '#4c2c17', backgroundColor: '#fca347'},
    FIX: { label: 'Correção', color: '#FFF', backgroundColor: '#ff0336'},
    EVOLUTION: { label: 'Evolução', color: '#FFF', backgroundColor: '#007bff'},
    UPDATE: { label: 'Atualização', color: '#FFF', backgroundColor: '#27ae60'},
};

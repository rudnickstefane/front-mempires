import { ContactTypeEnum } from "../enums";

export const listContactType = {
  types: [
    { label: "Principal", value: ContactTypeEnum.MAIN },
    { label: "Administrativo", value: ContactTypeEnum.ADMINISTRATIVE },
    { label: "Representante Legal", value: ContactTypeEnum.REPRESENTATIVE },
    { label: "Financeiro/Faturamento", value: ContactTypeEnum.FINANCIAL },
    { label: "Responsável Técnico", value: ContactTypeEnum.TECHNICAL },
    { label: "Comercial/Negócios", value: ContactTypeEnum.COMMERCIAL },
    {
      label: "Operacional/Gerente de Loja",
      value: ContactTypeEnum.OPERATIONAL,
    },
    { label: "Marketing/Comunicação", value: ContactTypeEnum.MARKETING },
    { label: "Logística/Expedição", value: ContactTypeEnum.LOGISTICS },
    { label: "Jurídico (Contratos/LGPD)", value: ContactTypeEnum.LEGAL },
    { label: "Suporte/Atendimento", value: ContactTypeEnum.SUPPORT },
    { label: "Outros", value: ContactTypeEnum.OTHERS },
  ],
};

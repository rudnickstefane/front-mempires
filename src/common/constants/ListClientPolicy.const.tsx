import { BrandClientPolicyEnum } from "../enums";

export const listClientPolicy = {
  brand: [
    {
      label: "Todos os convênios",
      value: BrandClientPolicyEnum.ALL,
    },
    {
      label: "Somente convênios selecionados",
      value: BrandClientPolicyEnum.EXCLUSIVE,
    },
  ],
};

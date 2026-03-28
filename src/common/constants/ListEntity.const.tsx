import { EntityEnum } from "../enums";

export const listEntity = {
  entities: [
    {
      label: "Independente (Loja única / Autônomo)",
      value: EntityEnum.INDEPENDENT,
    },
    {
      label: "Rede & Grupo (Matriz & Filiais / Franquias)",
      value: EntityEnum.NETWORK,
    },
    {
      label: "Associação / Sindicato / Cooperativa",
      value: EntityEnum.ASSOCIATION,
    },
  ],
};

import { OperationEnum, OriginEnum } from "@sr/common/enums";
import { EstablishmentProps } from "./EstablishmentProps.type";

export type DrawerFormEstablishmentProps = EstablishmentProps & {
  origin?: OriginEnum;
  operation?: OperationEnum;
  _tempType?: string;
  _tempDescription?: string;
  _tempPhone?: string;
  _tempEmail?: string;
};

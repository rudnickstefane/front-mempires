import { OperationEnum, OriginEnum } from "@sr/common/enums";
import { PartnerProps } from "./PartnerProps.type";

export type DrawerFormPartnerProps = PartnerProps & {
  origin?: OriginEnum;
  operation?: OperationEnum;
  storeCount?: number;
  _tempType?: string;
  _tempDescription?: string;
  _tempEmail?: string;
};

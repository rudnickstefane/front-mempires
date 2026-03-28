import { OperationEnum, OriginEnum } from "@sr/common/enums";
import { PartnerProps } from "./PartnerProps.type";

export type DrawerFormPartnerProps = PartnerProps & {
  origin?: OriginEnum;
  operation?: OperationEnum;
  storeCount?: number;
};

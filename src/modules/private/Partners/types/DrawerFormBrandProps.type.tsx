import { OperationEnum, OriginEnum } from "@sr/common/enums";
import { BrandProps } from "./BrandProps.type";

export type DrawerFormBrandProps = BrandProps & {
  origin?: OriginEnum;
  operation?: OperationEnum;
  establishmentsCount?: number;
  _tempType?: string;
  _tempDescription?: string;
  _tempPhone?: string;
  _tempEmail?: string;
};

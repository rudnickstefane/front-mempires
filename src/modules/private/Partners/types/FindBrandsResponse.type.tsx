import { PageInfoProps } from "@sr/common/types";
import { BrandEdgeProps } from "./BrandEdgeProps.type";

export type FindBrandsResponse = {
  totalCount: number;
  pageInfo: PageInfoProps;
  edges: BrandEdgeProps[];
};

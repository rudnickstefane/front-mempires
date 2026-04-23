import { PageInfoProps } from "@sr/common/types";
import { EstablishmentEdgeProps } from "./EstablishmentEdgeProps.type";

export type FindEstablishmentsResponse = {
  totalCount: number;
  pageInfo: PageInfoProps;
  edges: EstablishmentEdgeProps[];
};

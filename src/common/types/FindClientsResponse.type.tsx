import { PageInfoProps } from "@sr/common/types";
import { ClientEdgeProps } from "./ClientEdgeProps.type";

export type FindClientsResponse = {
  totalCount: number;
  pageInfo: PageInfoProps;
  edges: ClientEdgeProps[];
};

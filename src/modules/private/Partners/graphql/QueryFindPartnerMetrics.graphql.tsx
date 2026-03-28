import { gql } from "graphql-request";

export const QueryFindPartnerMetrics = gql`
  query FindPartnerMetrics {
    findPartnerMetrics {
      totalGeneral
      totalCurrentMonth
      totalActive
      totalInactive
      growthPercentage
    }
  }
`;

import { gql } from 'graphql-request';

export const QueryFindStudentsMetrics = gql`
  query FindStudentsMetrics($companyCode: Int!) {
    findStudentMetrics(companyCode: $companyCode) {
      newStudents {
        value
        percentageChange
      }
      newVisitors {
        value
        percentageChange
      }
      activeStudents {
        value
      }
      reEnrollments {
        value
      }
      terminations {
        value
      }
    }
  }
`;

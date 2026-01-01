import { gql } from 'graphql-request';

export const QueryFindReviews = gql`
  query QueryFindReviews($companyCode: Int!, $studentCode: Int!) {
    findReviews(companyCode: $companyCode, studentCode: $studentCode) {
      reviewCode
      student
      evaluatorCode
      evaluator
      age
      gender
      protocol
      protocolCardio
      fatMass
      leanMass
      imc
      iac
      rcq
      vo
      residualMass
      boneMass
      muscleMass
      waterBody
      ageBody
      basalMetabolic
      sumFolds
      height
      weight
      waist
      abdome
      hip
      subscapularis
      triceps
      biceps
      chest
      middleAxillary
      suprailiac
      abdominal
      medialThigh
      medialCalf
      wristBistyloid
      femurBistyloid
      dueDate
      observation
      response {
        category
        question
        response
      }
      createdAt
      updatedAt
    }
  }
`;

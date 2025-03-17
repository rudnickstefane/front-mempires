import { gql } from 'graphql-request';

export const QueryFindTransactions = gql`
  query FindTransactions($issuerCode: Int, $recipientCode: Int) {
    findTransactions(issuerCode: $issuerCode, recipientCode: $recipientCode) {
      transactionCode
      type
      name
      recipientUser
      recipientCompany
      originCode
      cashBoxName
      cashBoxCode
      canceledUserName
      reversedUserName
      updatedUserName
      rewardsCredit
      amount
      mainAmount
      secondaryAmount
      proofPayment
      reversed
      reversedProofPayment
      canceledProofPayment
      change
      fees
      description
      dueDate
      receivedDate
      expenseDate
      canceledDate
      reversedDate
      canceledReason
      reversedReason
      expenseType
      paymentStatus
      paymentMethod
      originPayment
      secondaryPaymentMethod
      createdAt
      updatedAt
    }
  }
`;

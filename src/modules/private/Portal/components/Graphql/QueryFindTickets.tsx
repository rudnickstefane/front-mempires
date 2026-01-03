import { gql } from 'graphql-request';

export const QueryFindTickets = gql`
  query QueryFindTickets($request: String!, $issuerCode: Int, $recipientCode: Int) {
    findTickets(request: $request, issuerCode: $issuerCode, recipientCode: $recipientCode) {
      ticketCode
      issuerUserCode
      issuerCompanyCode
      recipientUserCode
      recipientCompanyCode
      name
      description
      method
      queue
      type
      category
      status
      priority
      sentMessage
      duration
      observation
      responsibleCode
      responsible
      scheduledAt
      rescheduledAt
      finishedAt
      messages {
        messageCode
        sentUserCode
        sentCompanyCode
        receivedUserCode
        receivedCompanyCode
        nameSentUser
        nameSentCompany
        nameReceivedUser
        nameReceivedCompany
        title
        email
        phone
        message
        read
        observation
        createdAt
        updatedAt
        deletedAt
      }
      createdAt
      updatedAt
      deletedAt
    }
  }
`;

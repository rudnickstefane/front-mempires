import { gql } from 'graphql-request';

export const QueryFindTickets = gql`
  query QueryFindTickets($request: String!, $issuerCode: Int, $recipientCode: Int) {
    findTickets(request: $request, issuerCode: $issuerCode, recipientCode: $recipientCode) {
      ticketCode
      issuerUserCode
      nameIssuerUser
      issuerCompanyCode
      nameIssuerCompany
      recipientUserCode
      nameRecipientUser
      recipientCompanyCode
      nameRecipientCompany
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

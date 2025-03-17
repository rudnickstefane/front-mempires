import { ReviewsForm } from "../../../../../common/types";

export const TicketUpsertVariables = (
  formData: ReviewsForm,
) => {
  return {
    input: {
      action: formData.action,
      issuerUserCode: formData.issuerUserCode ? formData.issuerUserCode : null,
      issuerCompanyCode: formData.issuerCompanyCode ? formData.issuerCompanyCode : null,
      recipientUserCode: formData.recipientUserCode ? formData.recipientUserCode : null,
      recipientCompanyCode: formData.recipientCompanyCode ? formData.recipientCompanyCode : null,
      name: formData.name,
      description: formData.description ? formData.description : null,
      method: formData.method,
      queue: formData.queue,
      type: formData.type,
      category: formData.category,
      status: formData.status,
      priority: formData.priority,
      sentMessage: formData.sentMessage,
      duration: formData.duration ? formData.duration : null,
      observation: formData.observation ? formData.observation : null,
      responsibleCode: formData.responsibleCode ? formData.responsibleCode : null,
      scheduledAt: formData.scheduledAt ? formData.scheduledAt : null,
      rescheduledAt: formData.rescheduledAt ? formData.rescheduledAt : null,
      finishedAt: formData.finishedAt ? formData.finishedAt : null,
      messages: {
        sentUserCode: formData.sentUserCode ? formData.sentUserCode : null,
        sentCompanyCode: formData.sentCompanyCode ? formData.sentCompanyCode : null,
        receivedUserCode: formData.receivedUserCode ? formData.receivedUserCode : null,
        receivedCompanyCode: formData.receivedCompanyCode ? formData.receivedCompanyCode : null,
        title: formData.title ? formData.title : null,
        email: formData.email ? formData.email : null,
        phone: formData.phone ? formData.phone : null,
        message: formData.message,
        observation: formData.observation ? formData.observation : null,
      },
    },
  }
};
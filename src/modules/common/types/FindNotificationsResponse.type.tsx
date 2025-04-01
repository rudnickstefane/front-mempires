export type FindNotificationsResponse = {
  findNotifications: Array<{
    notificationCode: string;
    userName: string;
    companyName: string;
    title: string;
    description: string;
    path: string;
    read: boolean;
    createdAt: string;
    updatedAt: string;
    deletedAt: string;
  }>;
};

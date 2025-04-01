export type GroupData = {
  groupCode: string;
  name: string;
  description: string;
  status: string;
  totalContributors: string;
  permissions: Array<{
    permissionCode: string;
    name: string;
    path: string;
    permission: string;
  }>;
  createdAt: string;
  updatedAt: string;
};

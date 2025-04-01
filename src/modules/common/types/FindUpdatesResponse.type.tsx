export type FindUpdatesResponse = {
  findUpdates: Array<{
    updateCode: string;
    description: string;
    type: string;
    version: string;
    impact: string;
    message: string;
    target: string;
    profileCode: string;
    responsible: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string;
  }>;
};

export type FindEstablishmentsVariables = {
  brandCode: string;
  partnerCode: string;
  take: number;
  skip: number;
  filter?: {
    search?: string;
    isActive?: boolean;
  };
  orderBy?: {
    field?: string;
    direction?: string;
  };
};

export type CreateAccessTokenResponse = {
  createAccessToken: {
    token: string;
    user: {
      id: number;
      profileCode: string;
      name: string;
      code: string;
      uuid: string;
      email: string;
      pendingEmail: boolean;
      profiles: {
        partner: Array<{
          code: string;
          fantasyName: string;
          companyCode: string;
          status: string;
          isMaster: boolean;
          permissions: string;
        }>;
        client: Array<{
          code: string;
          fantasyName: string;
          companyCode: string;
          status: string;
          isMaster: boolean;
          permissions: string;
        }>;
        affiliate: Array<{
          code: string;
          fantasyName: string;
          companyCode: string;
          status: string;
          isMaster: boolean;
          permissions: string;
        }>;
        establishment: Array<{
          code: string;
          fantasyName: string;
          companyCode: string;
          status: string;
          isMaster: boolean;
          permissions: string;
        }>;
        brands: Array<{
          code: string;
          fantasyName: string;
          companyCode: string;
          status: string;
          isMaster: boolean;
          permissions: string;
        }>;
        beneficiary: {
          card: string;
          type: string;
          status: string;
        };
      };
      createdAt: string;
      updatedAt: string;
    };
  };
};

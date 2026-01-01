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
        partner: {
          code: string;
          fantasyName: string;
          companyCode: string;
          status: string;
          isMaster: boolean;
          permissions: string;
        };
        client: {
          code: string;
          fantasyName: string;
          companyCode: string;
          status: string;
          isMaster: boolean;
          permissions: string;
        };
        affiliate: {
          code: string;
          fantasyName: string;
          companyCode: string;
          status: string;
          isMaster: boolean;
          permissions: string;
        };
        establishment: {
          code: string;
          fantasyName: string;
          companyCode: string;
          status: string;
          isMaster: boolean;
          permissions: string;
        };
        brands: {
          code: string;
          fantasyName: string;
          companyCode: string;
          status: string;
          isMaster: boolean;
          permissions: string;
        };
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

export type CreateTokenResponse = {
    createToken: {
      token: string;
      user: {
        id: number;
        uuid: string;
        email: string;
        name: string;
        profileCode: string;
        status: string;
        code: string;
        profiles: {
          role: string;
          status: string;
          companyCode: string;
          fantasyName: string;
          ownershipType: string;
          assignment: string;
        }[];
      };
    };
  };
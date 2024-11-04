import axios from 'axios';
import { SignUpGymResponse } from '../../pages/sign-up/contracts/sign-up-gym-response';
import { SignUpGymData } from '../../pages/sign-up/types/sign-up-gym-data.types';

const GRAPHQL_ENDPOINT = 'http://0.0.0.0:3003/graphql';

export const registerAcademy = async (input: SignUpGymData): Promise<SignUpGymResponse> => {
    try {
        const response = await axios.post(GRAPHQL_ENDPOINT, {
            query: `
              mutation createUser(
                $name: String!,
                $email: String!,
                $password: String!,
                $fantasyName: String!,
                $companyPhone: String!
              ) {
                createUser(
                  type: "register"
                  name: $name
                  email: $email
                  password: $password
                  fantasy_name: $fantasyName
                  company_phone: $companyPhone
                  role: Master
                  status: Active
                ) {
                  status
                  ruleType
                  message
                }
              }
            `,
            variables: {
                name: input.name,
                email: input.email,
                password: input.password,
                fantasyName: input.fantasyName,
                companyPhone: input.companyPhone,
            },
        }, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        console.log(response);

        return response.data.data.createUser;
    } catch (error) {
        console.error("Error registering academy:", error);
        throw error;
    }
};

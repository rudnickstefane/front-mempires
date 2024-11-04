import axios from 'axios';
import { SignUpGymResponse } from '../../pages/sign-up/contracts/sign-up-gym-response';

const GRAPHQL_ENDPOINT = 'http://0.0.0.0:3003/graphql';

export const configAcademy = async (email: string): Promise<SignUpGymResponse> => {
    try {
        const response = await axios.post(GRAPHQL_ENDPOINT, {
            query: `
                mutation createUser {
  createUser(
    type: "register"
    username: "rudnicks"
    password: "N0gu31r4@!"
    name: "Rudnick"
    email: "rudnick.noguesira.7b@gmail.com"
    role: Master
    status: Active
  ) {
    status
    ruleType
    message
  }
}
            `,
            variables: { email },
        }, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return response.data.data.registerAcademy;
    } catch (error) {
        console.error("Error registering academy:", error);
        throw error;
    }
};

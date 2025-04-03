import { useSnackbar } from 'notistack';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MutationConfirmMail } from '../../common/graphql';
import { useBackendForFrontend } from '../../common/hooks/useBackendForFrontend';
import { GetErrorMessage } from '../../common/utils';

function ConfirmMail() {
    
    const navigate = useNavigate();
    const calledRef = useRef(false);
    const { uuid, token } = useParams();
    const { enqueueSnackbar } = useSnackbar();
    const { request } = useBackendForFrontend();
    const [attemptCount, setAttemptCount] = useState(0);
    const endpoint = import.meta.env.VITE_APP_BFF_FUNCIONAL_ACESSO_URL;

    useEffect(() => {
        if (!calledRef.current) {
            calledRef.current = true;

            const confirmMail = async () => {
                const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
                const tokenRegex = /^[a-f0-9]{64}$/i;

                if (!uuid || !uuidRegex.test(uuid) || !token || !tokenRegex.test(token)) {
                    navigate('/entrar');
                }

                try {
                    const variables = {
                        uuid: uuid,
                        token: `${uuid}/${token}`,
                    };

                    await request(MutationConfirmMail, variables);
                    navigate('/entrar');
                    enqueueSnackbar('E-mail confirmado com sucesso!', { variant: 'success' });
                } catch (error: unknown) {
                    navigate('/entrar');
                    setAttemptCount(prevCount => prevCount + 1);
                    if (attemptCount >= 5) {
                        return enqueueSnackbar('Erro ao validar e-mail. Entre em contato com nosso suporte.', { variant: 'error' });
                    }

                    const genericError = 'Ops! Algo deu errado ao validar seu e-mail. Tente novamente!'
                    const errorMessage = GetErrorMessage(error, genericError);
                    enqueueSnackbar(errorMessage, { variant: 'error' });
                }
            }

            confirmMail();
        }
    }, [uuid, token, navigate, endpoint, request, attemptCount, enqueueSnackbar]);

    return (
        <></>
    );
}

export default ConfirmMail;

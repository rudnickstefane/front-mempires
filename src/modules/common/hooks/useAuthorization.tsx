import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type Profile = {
  role: string;
  status: string;
  companyCode: string;
}

type DecodedToken = {
  exp: number;
  profileCode: string;
  email: string;
  profiles?: Profile[];
  sub: string;
}

const getDecodedToken = (token: string): DecodedToken | null => {
  try {
    return jwtDecode<DecodedToken>(token);
  } catch (error) {
    return null;
  }
};

const isTokenValid = (decodedToken: DecodedToken | null): boolean => {
  if (!decodedToken) return false;
  return decodedToken.exp * 1000 < Date.now();
};

export const useAuthorization = (initialConfig: boolean = false) => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [role, setRole] = useState<string>();
  const navigate = useNavigate();
  const status = localStorage.getItem('@iflexfit:status');

  useEffect(() => {
    const checkAuthorization = async () => {
      const userToken = localStorage.getItem('@iflexfit:token');
      if (!userToken) {
        setIsAuthorized(false);
        return;
      }

      const decodedToken = getDecodedToken(userToken);
      const profile = decodedToken?.profiles?.[0];
      setRole(profile?.role);

      const isPendingGym = status === 'PENDING' && profile?.role === 'GYM';
      const isStudent = profile?.role === 'STUDENT';
      const isInitialConfig = isPendingGym || initialConfig;

      if (!isTokenValid(decodedToken) && isPendingGym && isInitialConfig) {
        navigate('/academia/configuracoes');
        setIsAuthorized(true);
        return;
      }

      if (isStudent) {
        setIsAuthorized(false);
        return;
      }

      if (!isTokenValid(decodedToken) && !isInitialConfig) {
        setIsAuthorized(true);
        return;
      }
    };

    checkAuthorization();
  }, [navigate, initialConfig, status]);

  return { isAuthorized, role };
};

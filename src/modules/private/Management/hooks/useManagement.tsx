import { useAuthorization } from '../../../common/hooks';

export const useManagement = () => {
    // const { themeClasses, toggleDarkMode } = useThemeDarkMode();

    const { isAuthorized, role } = useAuthorization();

    return {
        role,
        isAuthorized,
    };
};

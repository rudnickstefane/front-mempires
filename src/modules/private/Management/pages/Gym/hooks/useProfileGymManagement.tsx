import { useSnackbar } from 'notistack';
import { useRef, useState } from 'react';
import { useBackendForFrontend } from '../../../../../common/hooks/useBackendForFrontend';
import { FindProfileDetailsResponse } from '../../../../../common/types';
import { GetErrorMessage, SendCroppedImageVariables } from '../../../../../common/utils';
import { EditProfileDrawer } from '../../../components/Drawer';
import { EditProfileDrawerProps } from '../../../components/Drawer/types';
import { MutationSendCroppedImage } from '../../../components/Graphql/MutationSendCroppedImage';

type ProfileGymManagementProps = {
    data: FindProfileDetailsResponse | undefined;
    refresh: () => Promise<void>;
}

export const useProfileGymManagement = ({ data, refresh }: ProfileGymManagementProps) => {

    const { enqueueSnackbar } = useSnackbar();
    const { request } = useBackendForFrontend();
    const [isLoading, setIsLoading] = useState(false);
    const [activeDrawerStep, setActiveDrawerStep] = useState(0);
    const [attemptCount, setAttemptCount] = useState(0);
    const profileCode = Number(localStorage.getItem('@iflexfit:profileCode'));

    {/* Drawers */}
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [drawerType, setDrawerType] = useState<EditProfileDrawerProps[keyof EditProfileDrawerProps] | null>(null);

    const renderDrawerContent = () => {
        switch (drawerType) {
            case 'EditInfos':
                return <EditProfileDrawer
                        closeDrawer={closeDrawer}
                        enqueueSnackbar={enqueueSnackbar}
                        data={data}
                        initialStep={activeDrawerStep}
                        refresh={refresh}
                    />
            
            default:
                break;
        }
    };

    const closeDrawer = () => {
        setDrawerType(null);
        setIsDrawerOpen(false);
    };

    const openDrawer = (type: EditProfileDrawerProps[keyof EditProfileDrawerProps], initialStep: number = 0) => {
        setDrawerType(type);
        setIsDrawerOpen(true);
        setActiveDrawerStep(initialStep);
    };

    const [image, setImage] = useState<string | null>(null); // Imagem carregada
    const [croppedImage, setCroppedImage] = useState<string | null>(null); // Imagem recortada
    const [isDialogOpen, setIsDialogOpen] = useState(false); // Controle do modal
    const cropperRef = useRef<HTMLImageElement>(null); // Referência para o Cropper

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setImage(reader.result as string);
                setIsDialogOpen(true); // Abre o modal para recorte
            };
            reader.readAsDataURL(file);
        }
    };

    const handleCrop = async () => {
        if (cropperRef.current) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const cropper = (cropperRef.current as any).cropper;
            const croppedDataURL = cropper.getCroppedCanvas().toDataURL();
            setIsLoading(true);
            try {
                const variables = SendCroppedImageVariables(profileCode, 'PROFILE', croppedDataURL);
                await request(MutationSendCroppedImage, variables);
                enqueueSnackbar('Foto de perfil alterada com sucesso!', { variant: 'success' });
                setIsDialogOpen(false);
                setCroppedImage(croppedDataURL);
                refresh?.();
            } catch (error: unknown) {
                setAttemptCount(prevCount => prevCount + 1);
                if (attemptCount >= 5) {
                    return enqueueSnackbar('Erro ao alterar foto de perfil. Entre em contato com nosso suporte.', { variant: 'error' });
                }
                enqueueSnackbar('Ops! Algo deu errado ao alterar sua foto de perfil. Tente novamente!', { variant: 'error' });
            } finally {
                setIsLoading(false);
            }
        }
    };

    const handleDeleteImage = async () => {
        try {
            const variables = SendCroppedImageVariables(profileCode, 'PROFILE', 'data:(.+);base64,', 'DELETE');
            await request(MutationSendCroppedImage, variables);
            setCroppedImage(null);

            enqueueSnackbar('Foto de perfil excluída com sucesso!', { variant: 'success' });
            refresh?.();
        } catch (error: unknown) {
            setAttemptCount(prevCount => prevCount + 1);
            if (attemptCount >= 5) {
                return enqueueSnackbar('Erro ao excluir de perfil. Entre em contato com nosso suporte.', { variant: 'error' });
            }

            const genericError = 'Ops! Algo deu errado ao excluir de perfil. Tente novamente!'
            const errorMessage = GetErrorMessage(error, genericError);
            enqueueSnackbar(errorMessage, { variant: 'error' });
        }
    };

    return {
        isLoading,
        renderDrawerContent,
        isDrawerOpen,
        openDrawer,
        closeDrawer,
        handleImageUpload,
        handleCrop,
        image,
        croppedImage,
        isDialogOpen,
        setIsDialogOpen,
        cropperRef,
        profileCode,
        handleDeleteImage
    };
};

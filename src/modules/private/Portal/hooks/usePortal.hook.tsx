import { notify } from "@sr/common/iu/components/notifications";
import { storage } from "@sr/common/storage";
import { useCallback, useEffect, useRef, useState } from "react";
import { TbSmartHome } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { useBackend } from "../../../common/hooks/useBackend";
import {
  FindCompanyDetailsResponse,
  FindNotificationsResponse,
  FindProfileDetailsResponse,
} from "../../../common/types";
import { ManagementProps } from "../../../common/types/ManagementProps.type";
import {
  QueryFindNotifications,
  QueryFindProfileDetails,
} from "../components/Graphql";
import { QueryFindCompanyDetails } from "../components/Graphql/QueryFindCompanyDetails";
import { useSidebarHook } from "../components/Sidebar/hooks";
import { MutationNotificationUpsert } from "../pages/home/graphql";
import { AdminGymDrawerType } from "../pages/home/types";
import { GymManagementType } from "../pages/home/types/gym-management.types";
import { ResourceBoxProps } from "../pages/home/types/gym-resource-box.types";

export const usePortalHook = ({ permissions }: ManagementProps) => {
  const { request } = useBackend();
  const sidebar = useSidebarHook();
  const [isProfileLoading, setIsProfileLoading] = useState(false);
  const [isCompanyLoading, setIsCompanyLoading] = useState(false);
  const [activeComponent, setActiveComponent] =
    useState<GymManagementType>("Home");
  const [selectedResource, setSelectedResource] =
    useState<ResourceBoxProps | null>({
      name: "Início",
      icon: TbSmartHome,
      onClick: () => openComponent("Home"),
    });
  const [responseProfileDetails, setResponseProfileDetails] =
    useState<FindProfileDetailsResponse>();
  const [responseCompanyDetails, setResponseCompanyDetails] =
    useState<FindCompanyDetailsResponse>();
  const [responseNotifications, setResponseNotifications] =
    useState<FindNotificationsResponse>();
  const { profileCode, companyCode } = storage.getMany<{
    profileCode: string;
    companyCode: string;
  }>(["profileCode", "companyCode"]);

  const calledRef = useRef(false);
  const navigate = useNavigate();

  const menuExcludedPaths =
    permissions && permissions.length > 0
      ? permissions
          .find((perm: { module: string }) => perm.module === "MENU")
          ?.items.filter(
            (item: { permission: string }) => item.permission === "NONE"
          )
          ?.map((item: { path: string }) => item.path) || []
      : [];

  const companyPermissions =
    permissions && permissions.length > 0
      ? permissions.find(
          (perm: { module: string }) => perm.module === "COMPANY"
        )?.items || []
      : [];

  const companyPermission = companyPermissions.find(
    (item: { path: string }) => item.path === "Company"
  )?.permission;
  const isCompanyDisabled = companyPermission === "NONE" ? true : false;

  const formatNotificationTime = (createdAt: string): string => {
    if (!createdAt) return "";

    // Extraindo data e hora da string "dd/MM/yyyy às HHhmm"
    const [datePart, timePart] = createdAt.split(" às ");
    const [day, month, year] = datePart.split("/").map(Number);
    const [hours, minutes] = timePart.split("h").map(Number);

    // Criando objeto Date corretamente
    const notificationDate = new Date(year, month - 1, day, hours, minutes);
    const now = new Date();

    // Comparando a data da notificação com a data de hoje
    const sameDay =
      now.getDate() === notificationDate.getDate() &&
      now.getMonth() === notificationDate.getMonth() &&
      now.getFullYear() === notificationDate.getFullYear();

    if (sameDay) {
      // Se for o mesmo dia, mostra a diferença em horas ou minutos
      const diffMs = now.getTime() - notificationDate.getTime();
      const diffMinutes = Math.floor(diffMs / 60000);
      const diffHours = Math.floor(diffMinutes / 60);

      if (diffMinutes < 1) return "agora";
      if (diffMinutes < 60) return `há ${diffMinutes}m`;
      return `há ${diffHours}h`;
    } else {
      // Se não for o mesmo dia, mostra a data completa
      return createdAt;
    }
  };

  const handleNotificationRead = async (notificationCode: string) => {
    const variables = {
      input: {
        action: "READ_UPDATE",
        notificationCode: Number(notificationCode),
      },
    };

    await request(MutationNotificationUpsert, variables);
    refresh("findNotifications");
  };

  const findProfileDetails = useCallback(async () => {
    setIsProfileLoading(true);
    try {
      const response: FindProfileDetailsResponse = await request(
        QueryFindProfileDetails,
        { profileCode }
      );

      setResponseProfileDetails(response);
      setIsProfileLoading(false);
    } catch {
      notify.error("Ocorreu um erro ao buscar as informações do seu perfil.");
    }
  }, [profileCode, request]);

  const findCompanyDetails = useCallback(async () => {
    setIsCompanyLoading(true);
    try {
      const response: FindCompanyDetailsResponse = await request(
        QueryFindCompanyDetails,
        { companyCode }
      );

      setResponseCompanyDetails(response);
      setIsCompanyLoading(false);
    } catch {
      notify.error("Ocorreu um erro ao buscar as informações da academia.");
    }
  }, [companyCode, request]);

  const findNotifications = useCallback(async () => {
    try {
      const response: FindNotificationsResponse = await request(
        QueryFindNotifications,
        { companyCode, profileCode }
      );

      setResponseNotifications(response);
    } catch {
      notify.error("Ocorreu um erro ao buscar as notificações.");
    }
  }, [companyCode, profileCode, request]);

  useEffect(() => {
    if (!calledRef.current) {
      calledRef.current = true;

      const fetchData = async () => {
        await findProfileDetails();
        await findCompanyDetails();
        await findNotifications();
      };

      fetchData();
    }
  }, [
    findProfileDetails,
    findCompanyDetails,
    findNotifications,
    selectedResource,
  ]);

  const refresh = async (source: unknown) => {
    switch (source) {
      case "findProfileDetails":
        await findProfileDetails();
        break;

      case "findCompanyDetails":
        await findCompanyDetails();
        break;

      case "findNotifications":
        await findNotifications();
        break;

      default:
        break;
    }
  };

  const finishSession = () => {
    // localStorage.clear();
    notify.success("Sua sessão foi encerrada com sucesso. Até logo!");
    navigate("/entrar");
  };

  const openComponent = (type: GymManagementType) => {
    setActiveComponent(type);
  };

  useEffect(() => {
    // Configura o intervalo para chamar a cada 30 segundos
    const intervalId = setInterval(() => {
      findNotifications();
    }, 60 * 1000); // 30 segundos em milissegundos

    // Limpa o intervalo quando o componente desmontar
    return () => clearInterval(intervalId);
  }, [findNotifications]);

  {
    /* Drawers */
  }
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerType, setDrawerType] = useState<
    AdminGymDrawerType[keyof AdminGymDrawerType] | null
  >(null);

  const openDrawer = (type: AdminGymDrawerType[keyof AdminGymDrawerType]) => {
    setDrawerType(type);
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerType(null);
    setIsDrawerOpen(false);
  };

  const renderDrawerContent = () => {
    switch (drawerType) {
      default:
        break;
    }
  };

  const [anchorEls, setAnchorEls] = useState<{
    [key: string]: HTMLElement | null;
  }>({});

  // Função para abrir o menu
  const handleOpen = (
    event: React.MouseEvent<HTMLElement>,
    viewCode: string
  ) => {
    setAnchorEls((prev) => ({ ...prev, [viewCode]: event.currentTarget }));
  };

  // Função para fechar o menu
  const handleClose = (viewCode: string) => {
    setAnchorEls((prev) => ({ ...prev, [viewCode]: null }));
  };

  return {
    sidebar,
    isProfileLoading,
    isCompanyLoading,
    responseProfileDetails,
    responseCompanyDetails,
    selectedResource,
    setSelectedResource,
    refresh,
    finishSession,
    renderDrawerContent,
    isDrawerOpen,
    closeDrawer,
    openDrawer,
    anchorEls,
    handleOpen,
    handleClose,
    responseNotifications,
    formatNotificationTime,
    handleNotificationRead,
    menuExcludedPaths,
    isCompanyDisabled,
    toggleMenu: sidebar.toggleMenu,
    renderModule: sidebar.renderModule,
    openComponent: sidebar.openComponent,
    expandedMenus: sidebar.expandedMenus,
    toggleSubMenu: sidebar.toggleSubMenu,
    responseMenus: sidebar.responseMenus,
    sidebarCollapsed: sidebar.isCollapsed,
    activeComponent: sidebar.activeComponent,
    setExpandedMenus: sidebar.setExpandedMenus,
    setActiveComponent: sidebar.setActiveComponent,
  };
};

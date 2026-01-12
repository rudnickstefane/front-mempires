import { notify } from "@sr/common/iu/components/notifications";
import { useBackend } from "@sr/modules/common/hooks";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FindMenusResponse } from "../../../../../common/types";
import { ResourceBoxProps } from "../../../pages/home/types/gym-resource-box.types";
import { QueryFindMenus } from "../../Graphql";

export const useSidebarHook = () => {
  const { request } = useBackend();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMenuLoading, setIsMenuLoading] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState<number[]>([]);
  const [responseMenus, setResponseMenus] =
    useState<FindMenusResponse | null>();
  const [selectedResource, setSelectedResource] =
    useState<ResourceBoxProps | null>({
      name: "Início",
    });

  const calledRef = useRef(false);
  const navigate = useNavigate();

  const findMenu = useCallback(async () => {
    setIsMenuLoading(true);
    try {
      const response: FindMenusResponse = await request(QueryFindMenus);
      setResponseMenus(response);
      setIsMenuLoading(false);
    } catch {
      notify.error("Tivemos um problema ao exibir os menus.");
    }
  }, [request]);

  useEffect(() => {
    if (!calledRef.current) {
      calledRef.current = true;

      const fetchData = async () => {
        await findMenu();
      };

      fetchData();
    }
  }, [findMenu]);

  const finishSession = () => {
    // localStorage.clear();
    notify.success("Sua sessão foi encerrada com sucesso. Até logo!");
    navigate("/login");
  };

  const toggleSubMenu = (menuId: number) => {
    setExpandedMenus((prev) => (prev.includes(menuId) ? [] : [menuId]));
  };

  const toggleMenu = () => {
    setIsCollapsed((prev) => !prev);
  };

  return {
    selectedResource,
    setSelectedResource,
    isMenuLoading,
    responseMenus,
    isCollapsed,
    expandedMenus,
    setExpandedMenus,
    toggleMenu,
    toggleSubMenu,
    finishSession,
  };
};

import { notify } from "@sr/common/iu/components/notifications";
import { storage } from "@sr/common/storage";
import { useBackend } from "@sr/modules/common/hooks";
import { FindUserDetailsResponse } from "@sr/modules/common/types";
import { useCallback, useEffect, useRef, useState } from "react";
import { QueryFindUserDetails } from "../../Graphql";

export const useProfileHook = () => {
  const calledRef = useRef(false);
  const { request } = useBackend();
  const profileCode = storage.get<string>("profileCode");
  const [isProfileLoading, setIsProfileLoading] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState<number[]>([]);
  const [responseProfileDetails, setResponseProfileDetails] =
    useState<FindUserDetailsResponse>();

  const findUserDetails = useCallback(async () => {
    setIsProfileLoading(true);
    try {
      const response = await request<FindUserDetailsResponse>(
        QueryFindUserDetails,
        { profileCode }
      );

      setResponseProfileDetails(response);
      setIsProfileLoading(false);
    } catch {
      notify.error("Ocorreu um erro ao buscar as informações do seu perfil.");
    }
  }, [profileCode, request]);

  useEffect(() => {
    if (!calledRef.current) {
      calledRef.current = true;

      const fetchData = async () => {
        await findUserDetails();
      };

      fetchData();
    }
  }, [findUserDetails]);

  return {
    isProfileLoading,
    responseProfileDetails,
    expandedMenus,
    setExpandedMenus,
  };
};

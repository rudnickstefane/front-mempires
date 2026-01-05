import { useCallback, useEffect, useRef, useState } from "react";
import { useAuthorization, useBackend } from "../../../common/hooks";
import { FindPermissionsResponse } from "../../../common/types";
import { QueryFindPermissions } from "../components/Graphql";

export const useManagement = () => {
  const calledRef = useRef(false);
  const { request } = useBackend();
  const { isAuthorized, role } = useAuthorization();
  const profileCode = Number(localStorage.getItem("@iflexfit:profileCode"));
  const [permissions, setResponsePermissions] =
    useState<FindPermissionsResponse | null>(null);

  const findPermissions = useCallback(async () => {
    const response: { findPermissions: FindPermissionsResponse } =
      await request(QueryFindPermissions, { profileCode: profileCode });

    setResponsePermissions(response.findPermissions);
  }, [profileCode, request]);

  useEffect(() => {
    if (!calledRef.current) {
      calledRef.current = true;

      const fetchData = async () => {
        await findPermissions();
      };

      fetchData();
    }
  }, [findPermissions]);

  return {
    role,
    isAuthorized,
    permissions,
  };
};

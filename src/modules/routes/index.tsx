import React from "react";
import { Route, Routes } from "react-router-dom";
import { AccessRestrict } from "../common/pages/AccessRestrict";
import Page404 from "../common/pages/Error404";
import InactivitySignIn from "../common/pages/InactivitySignIn";
import { GymConfig } from "../private/InitialConfig";
import Portal from "../private/Portal";
import { useManagement } from "../private/Portal/hooks";
import SignIn from "../public/sign-in";
import SignUp from "../public/signup";
import { PrivateRoutes } from "./mapper/PrivateRoutes.mapper";
import { PublicRoutes } from "./mapper/PublicRoutes.mapper";

function AppRoutes() {
  const { isAuthorized, role, permissions } = useManagement();

  return (
    <Routes>
      {/* Rotas públicas */}
      {PublicRoutes.map(({ path, element, index }) => (
        <Route key={path} path={path} element={element} index={index} />
      ))}

      {/* Rotas privadas */}
      {PrivateRoutes.map(({ path, element, meta }) => {
        const canAccess = role ? meta?.roles.includes(role) : false;

        return (
          <Route
            key={path}
            path={path}
            element={
              <AccessRestrict isAuthorized={true && true}>
                <InactivitySignIn />
                {/* Passa permissions/role para os componentes */}
                {React.cloneElement(element, {
                  permissions,
                  role,
                })}
              </AccessRestrict>
            }
          />
        );
      })}

      <Route path="*" element={<Page404 />} />
      {/* <Route index element={<Home />} />
      <Route path='/recovery' element={<Recovery />} /> */}
      {/* <Route path='/confirm/mail/:uuid/:token' element={<ConfirmMail />} />
      <Route path='/password/reset/:uuid/:token' element={<ResetPassword />} /> */}
      <Route path="/login" element={<SignIn />} />
      <Route path="/cadastro" element={<SignUp />} />
      <Route path="/academia/configuracoes" element={<GymConfig />} />
      {/* <Route path='/carreiras' element={<Carreiras />} />
      <Route path='/planos/academia' element={<GymPlans />} /> */}
      <Route path="/portal" element={<Portal />} />
    </Routes>
  );
}

export default AppRoutes;

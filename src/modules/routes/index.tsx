import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { AccessRestrict } from '../common/pages/AccessRestrict'
import Page404 from '../common/pages/Error404'
import InactivitySignIn from '../common/pages/InactivitySignIn'
import { useManagement } from '../private/Management/hooks'
import { PrivateRoutes } from './mapper/PrivateRoutes.mapper'
import { PublicRoutes } from './mapper/PublicRoutes.mapper'

function AppRoutes() {
  const {
    isAuthorized,
    role,
    permissions,
  } = useManagement();

  return (
    <Routes>
      {/* Rotas públicas */}
      {PublicRoutes.map(({ path, element, index}) => (
        <Route key={path} path={path} element={element} index={index}/>
      ))}

      {/* Rotas privadas */}
      {PrivateRoutes.map(({ path, element, meta }) => {
        const canAccess = role ? meta?.roles.includes(role) : false;

        return (
          <Route
            key={path}
            path={path}
            element={
              <AccessRestrict isAuthorized={isAuthorized && canAccess}>
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

      <Route path='*' element={<Page404 />} />
      {/* <Route index element={<Home />} />
      <Route path='/recovery' element={<Recovery />} />
      <Route path='/confirm/mail/:uuid/:token' element={<ConfirmMail />} />
      <Route path='/password/reset/:uuid/:token' element={<ResetPassword />} />
      <Route path='/cadastro' element={<SignUp />} />
      <Route path='/academia/configuracoes' element={<GymConfig />} />
      <Route path='/carreiras' element={<Carreiras />} />
      <Route path='/planos/academia' element={<GymPlans />} />
      <Route path='/gestao' element={<Management />} /> */}
    </Routes>
  )
}

export default AppRoutes
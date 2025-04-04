import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Page404 from '../modules/common/pages/Error404'
import { GymConfig } from '../modules/private/InitialConfig'
import Management from '../modules/private/Management'
import ConfirmMail from '../modules/public/Account/ConfirmMail'
import Recovery from '../modules/public/Account/Recovery'
import ResetPassword from '../modules/public/Account/ResetPassword'
import SignIn from '../modules/public/SignIn'
import SignUp from '../modules/public/SignUp'
import Carreiras from '../pages/Carreiras'
import Home from '../pages/Home'
import PageBase from '../pages/PageBase'
import { GymPlans } from '../pages/plans/gym'
import { NutritionistPlans } from '../pages/plans/nutritionist'
import Incentivo from '../pages/Programas/Incentivo'

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<PageBase />}>
                    <Route index element={<Home />} />
                    <Route path='/entrar' element={<SignIn />} />
                    <Route path='/recovery' element={<Recovery />} />
                    <Route path='/confirm/mail/:uuid/:token' element={<ConfirmMail />} />
                    <Route path='/password/reset/:uuid/:token' element={<ResetPassword />} />
                    <Route path='/cadastro' element={<SignUp />} />
                    <Route path='/programas/incentivo' element={<Incentivo />} />
                    <Route path='/academia/configuracoes' element={<GymConfig />} />
                    <Route path='/carreiras' element={<Carreiras />} />
                    <Route path='/planos/academia' element={<GymPlans />} />
                    <Route path='/planos/nutricionista' element={<NutritionistPlans />} />
                    <Route path='/gestao' element={<Management />} />
                    <Route path='*' element={<Page404 />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes
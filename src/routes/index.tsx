import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Management from '../modules/private/Management'
import Carreiras from '../pages/Carreiras'
import Home from '../pages/Home'
import Page404 from '../pages/Page404'
import PageBase from '../pages/PageBase'
import { GymPlans } from '../pages/plans/gym'
import { NutritionistPlans } from '../pages/plans/nutritionist'
import Incentivo from '../pages/Programas/Incentivo'
import Entrar from '../pages/sign-in'
import SignUp from '../pages/sign-up'
import { GymConfig } from '../pages/sign-up/gym'

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<PageBase />}>
                    <Route index element={<Home />} />
                    <Route path='/entrar' element={<Entrar />} />
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
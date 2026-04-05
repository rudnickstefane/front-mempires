import Partners from "../../Partners";
import { PartnerDetailsPage } from "../../Partners/pages";
import Profile from "../../Profile";
import { SecurityPage } from "../../Profile/pages";
import HomeGymManagement from "../pages/home/pages/Home/HomeGymManagement";
import { RendererModulesType } from "../pages/home/types/gym-management.types";

export const modulesRegistry: Partial<
  Record<
    RendererModulesType,
    { title?: string; subtitle?: string; component: React.ReactNode }
  >
> = {
  Home: {
    title: "home.title",
    subtitle: "home.subtitle",
    component: <HomeGymManagement />,
  },
  Profile: {
    title: "profile.title",
    subtitle: "profile.subtitle",
    component: <Profile />,
  },
  partners: {
    title: "partner.title",
    subtitle: "partner.subtitle",
    component: <Partners />,
  },
  Security: {
    title: "security.title",
    subtitle: "security.subtitle",
    component: <SecurityPage />,
  },
  PartnerDetails: {
    subtitle: "security.subtitle",
    component: <PartnerDetailsPage />,
  },
};

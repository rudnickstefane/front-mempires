import ConfirmMail from "@sr/modules/public/Account/ConfirmMail";
import Recovery from "@sr/modules/public/Account/Recovery";
import ResetPassword from "@sr/modules/public/Account/ResetPassword";
import Home from "@sr/modules/public/home";
import Listing from "@sr/modules/public/listing";

export const PublicRoutes = [
  {
    path: "/",
    element: <Home />,
    index: true,
  },
  {
    path: "/:action/:property/:city/:price/:room?",
    element: <Listing />,
  },
  {
    path: "recovery",
    element: <Recovery />,
  },
  {
    path: "/confirm/mail/:uuid/:token",
    element: <ConfirmMail />,
  },
  {
    path: "/password/reset/:uuid/:token",
    element: <ResetPassword />,
  },
  {
    path: "/confirm/mail/:uuid/:token",
    element: <ConfirmMail />,
  },
];
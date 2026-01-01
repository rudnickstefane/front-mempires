import Management from "@sr/modules/private/portal";

export const PrivateRoutes = [
  {
    path: "/portal",
    element: <Management />,
    meta: {
      roles: ["RENTWELL", "GYM", "RENTER"],
    },
  },
];

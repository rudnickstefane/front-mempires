import Management from "@sr/modules/private/Management";

export const PrivateRoutes = [
  {
    path: "/gestao",
    element: <Management />,
    meta: {
      roles: [
        "RENTWELL",
        "COMPANY",
        "RENTER",
      ],
    }
  },
];
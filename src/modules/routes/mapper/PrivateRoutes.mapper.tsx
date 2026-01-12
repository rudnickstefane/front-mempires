import Portal from "@sr/modules/private";

export const PrivateRoutes = [
  {
    path: "/portal",
    element: <Portal />,
    meta: {
      roles: ["RENTWELL", "GYM", "RENTER"],
    },
  },
];

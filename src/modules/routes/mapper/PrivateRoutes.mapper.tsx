import Portal from "@sr/modules/private/portal";

export const PrivateRoutes = [
  {
    path: "/portal",
    element: <Portal />,
    meta: {
      roles: ["RENTWELL", "GYM", "RENTER"],
    },
  },
];

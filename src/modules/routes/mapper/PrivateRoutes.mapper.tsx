import Portal from "@sr/modules/private/Portal";

export const PrivateRoutes = [
  {
    path: "/portal",
    element: <Portal />,
    meta: {
      roles: ["RENTWELL", "GYM", "RENTER"],
    },
  },
];

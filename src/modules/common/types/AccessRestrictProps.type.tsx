import { ReactNode } from "react";

export type AccessRestrictProps = {
  isAuthorized: boolean;
  children: ReactNode;
};

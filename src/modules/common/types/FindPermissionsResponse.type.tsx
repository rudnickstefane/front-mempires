export type FindPermissionsResponse = {
  plan: string;
  module: string;
  items: Array<{ path: string; permission: string }>;
}[];
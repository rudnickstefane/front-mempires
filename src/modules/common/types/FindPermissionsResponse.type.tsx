export type FindPermissionsResponse = {
  module: string;
  items: Array<{ path: string; permission: string }>;
}[];
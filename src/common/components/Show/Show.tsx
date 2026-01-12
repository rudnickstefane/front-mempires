import { ShowProps } from "@sr/common/types";

export function Show(props: ShowProps) {
  const { hidden, children } = props;

  if (hidden) {
    return null;
  }

  return <>{children}</>;
}

import { IconType } from "react-icons/lib";

export type ResourceBoxProps = {
    icon: IconType;
    type?: string;
    menu?: string;
    name: string;
    subName?: string;
    description: string;
    isMenuCollapsed?: boolean;
}
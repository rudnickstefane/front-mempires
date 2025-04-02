import { IconType } from 'react-icons';

export type ResourceBoxProps = {
    icon: IconType;
    type?: string;
    menu?: string;
    name: string;
    subName?: string;
    description?: string;
    isMenuCollapsed?: boolean;
    hasSubMenu?: boolean;
    isExpanded?: boolean;
    hasPermission?:boolean;
    onClick?: () => void;
}
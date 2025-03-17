
export type ResourceBoxProps = {
    icon: string;
    type?: string;
    menu?: string;
    name: string;
    subName?: string;
    description?: string;
    isMenuCollapsed?: boolean;
    hasSubMenu?: boolean;
    isExpanded?: boolean;
    onClick: () => void;
}
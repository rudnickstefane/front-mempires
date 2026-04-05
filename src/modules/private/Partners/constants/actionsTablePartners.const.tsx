/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import { useNavigationStore } from "@sr/store";
import {
  Box1,
  Buildings2,
  DiscountShape,
  DocumentText1,
  Edit,
  More,
  Setting2,
  Trash,
  UserSquare,
} from "iconsax-react";
import { useState } from "react";
import { PartnerProps } from "../types";

export const PartnerActions = ({
  partner,
  onEdit,
  onDelete,
}: {
  partner: PartnerProps;
  onEdit: () => void;
  onDelete: (code: string, name: string) => void;
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const push = useNavigationStore((state) => state.push);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNavigate = (module: any, params = {}) => {
    handleClose();
    push(module, { partnerCode: partner.partnerCode, ...params });
  };

  const menuItems = [
    {
      label: "Mais detalhes",
      icon: <DocumentText1 size={20} variant="Linear" />,
      action: () => handleNavigate("PartnerDetails"),
    },
    {
      label: "Configurações",
      icon: <Setting2 size={20} variant="Linear" />,
      action: () => handleNavigate("Settings"),
    },
    {
      label: "Bandeiras e Lojas",
      icon: <Buildings2 size={20} variant="Linear" />,
      action: () => handleNavigate("Company"),
    },
    {
      label: "Contatos",
      icon: <UserSquare size={20} variant="Linear" />,
      action: () => handleNavigate("Support"),
    },
    {
      label: "Produtos e Famílias",
      icon: <Box1 size={20} variant="Linear" />,
      action: () => handleNavigate("Products"),
    },
    {
      label: "Regras de descontos",
      icon: <DiscountShape size={20} variant="Linear" />,
      action: () => handleNavigate("Finance"),
    },
    {
      label: "Alterar",
      icon: <Edit size={20} variant="Linear" />,
      action: () => {
        handleClose();
        onEdit();
      },
      color: "text-primary",
    },
    {
      label: "Excluir",
      icon: <Trash size={20} variant="Linear" />,
      action: () => {
        handleClose();
        onDelete(partner.partnerCode || "", partner.company.fantasyName);
      },
      color: "text-red-600",
    },
  ];

  return (
    <>
      <IconButton onClick={handleClick}>
        <More size={20} />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        slotProps={{
          paper: {
            className:
              "shadow-lg rounded-xl border border-gray-100 min-w-[220px] py-2",
          },
        }}
      >
        {menuItems.map((item, index) => (
          <MenuItem key={index} onClick={item.action} className="py-2">
            <ListItemIcon className={item.color || "text-neutral-900"}>
              {item.icon}
            </ListItemIcon>
            <ListItemText
              primary={item.label}
              slotProps={{
                primary: {
                  className: `text-sm ${item.color || "text-neutral-900"}`,
                },
              }}
            />
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

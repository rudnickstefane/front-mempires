/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import { useNavigationStore } from "@sr/store";
import { DocumentText1, Edit, More, Trash } from "iconsax-react";
import { useState } from "react";
import { BrandProps } from "../types";

export const BrandsActions = ({
  brand,
  onEdit,
  onDelete,
}: {
  brand: BrandProps;
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
    push(module, {
      brandCode: brand.brandCode,
      partnerCode: brand.partnerCode,
      ...params,
    });
  };

  const menuItems = [
    {
      label: "Mais detalhes",
      icon: <DocumentText1 size={20} variant="Linear" />,
      action: () => handleNavigate("BrandDetails"),
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
        onDelete(brand.brandCode || "", brand.company.fantasyName);
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
            className: "shadow-lg rounded-xl border border-gray-100 py-1",
          },
        }}
      >
        {menuItems.map((item, index) => (
          <MenuItem key={index} onClick={item.action} className="py-2">
            <ListItemIcon
              className={`${item.color || "text-neutral-900"} !min-w-7`}
            >
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

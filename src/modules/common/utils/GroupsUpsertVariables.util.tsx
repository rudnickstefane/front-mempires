import { ReviewsForm } from "../types";

export const GroupsUpsertVariables = (
  formData: ReviewsForm,
) => {

  const dataPermissions = [
    { key: "permissionMenuAdmin", name: "Administrativo", path: "Admin", module: "MENU" },
    { key: "permissionMenuFinance", name: "Financeiro", path: "Finance", module: "MENU" },
    { key: "permissionMenuIntegration", name: "Integrações", path: "Integration", module: "MENU"  },
    { key: "permissionMenuDashboard", name: "Relatórios", path: "Dashboard", module: "MENU"  },
    { key: "permissionMenuPrograms", name: "Programas", path: "Programs", module: "MENU"  },
    { key: "permissionProfileCompany", name: "Perfil da Empresa", path: "Company", module: "COMPANY"  },
  ];

  const permissions = dataPermissions.map((permission) => ({
    name: permission.name,
    path: permission.path,
    permission: formData[permission.key] || "NONE",
    module: permission.module,
  }));

  return {
    input: {
      action: formData.action,
      groupCode: formData.groupCode,
      companyCode: formData.companyCode,
      status: formData.status,
      name: formData.name,
      description: formData.description,
      permissions: permissions,
    },
  }
};
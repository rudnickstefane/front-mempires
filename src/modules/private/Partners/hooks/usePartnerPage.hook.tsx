/* eslint-disable @typescript-eslint/no-explicit-any */
import { DrawerButtons } from "@sr/common/components/Drawer/DrawerButtons";
import { CompanyForm, ContactsForm } from "@sr/common/components/Forms";
import { Show } from "@sr/common/components/Show";
import { dialogConfirmConfig } from "@sr/common/configs";
import { useMultiStepForm, usePaginationHook } from "@sr/common/hooks";
import { FormController } from "@sr/common/iu/components/Forms";
import { notify } from "@sr/common/iu/components/notifications";
import { DialogConfirmType } from "@sr/common/types";
import { ConfirmDialogProps } from "@sr/common/types/ConfirmDialogProps.type";
import { useFormik } from "formik";
import { useCallback, useMemo, useState } from "react";
import * as Hook from ".";
import { initialPartnerValues, stepPartnerFields } from "../constants";
import { columnsPartners } from "../constants/columnsPartners.const";
import { DrawerFormPartnerProps } from "../types";
import { formPartnerValidationSchema } from "../validation";

export const usePartnerPageHook = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { page, limit, setPage, setLimit } = usePaginationHook(10);
  const skip = (page - 1) * limit;

  const { mutateAsync: upsertPartner } = Hook.useUpsertPartner();

  const metricsQuery = Hook.useFindPartnerMetrics();
  const { data: partnersData, isPending } = Hook.useFindPartners({
    take: limit,
    skip: skip,
  });

  const metricsData = metricsQuery.data;

  const rows = useMemo(() => {
    return (
      partnersData?.edges?.map(({ node }) => ({
        ...node,
        partnerCode: node.partnerCode,
        fantasyName: node.company?.fantasyName || "N/A",
        cnpj: node.company?.code || "",
        storesCount: node.storeCount || 0,
        isActive: node.details?.status === "ACTIVE",
      })) || []
    );
  }, [partnersData]);

  const [confirmData, setConfirmData] = useState<{
    isOpen: boolean;
    type: DialogConfirmType;
    title: string;
    subtitle?: string;
    buttonText: string;
    partnerCode?: string;
  }>({
    isOpen: false,
    type: "ACTIVE",
    title: "",
    buttonText: "",
  });

  const openConfirmDelete = useCallback((partnerCode: string, name: string) => {
    setConfirmData({
      isOpen: true,
      partnerCode,
      type: "DELETE",
      title: `Deseja excluir o parceiro ${name}?`,
      subtitle:
        "Esta ação é irreversível. Todos os dados vinculados a este parceiro serão removidos permanentemente.",
      buttonText: "Excluir",
    });
  }, []);

  const openConfirmToggle = useCallback(
    (partnerCode: string, name: string, isActive: boolean) => {
      const nextStatus = isActive ? "INACTIVE" : "ACTIVE";

      setConfirmData({
        isOpen: true,
        partnerCode,
        type: nextStatus,
        title: `Deseja ${nextStatus === "ACTIVE" ? "ativar" : "desativar"} o parceiro ${name}?`,
        subtitle:
          nextStatus === "INACTIVE"
            ? "Esta ação impedirá o acesso do parceiro ao portal e suspenderá todas as funcionalidades e integrações ativas."
            : undefined,
        buttonText: nextStatus === "ACTIVE" ? "Ativar" : "Desativar",
      });
    },
    [],
  );

  const columns = useMemo(() => {
    return columnsPartners(openConfirmToggle, openConfirmDelete);
  }, [openConfirmToggle, openConfirmDelete]);

  const handleConfirmAction = async () => {
    const { partnerCode, type } = confirmData;
    if (!partnerCode || !type) return;

    try {
      if (type === "DELETE") {
        // Chame seu hook de delete aqui (ex: deletePartner({ partnerCode }))
        console.log("Deletando parceiro:", partnerCode);
        notify.success("Parceiro excluído com sucesso.");
      } else {
        await upsertPartner({
          data: {
            origin: "PORTAL",
            operation: "UPDATE",
            partnerCode: partnerCode,
            details: { status: type },
          },
        });
      }
      setConfirmData((prev) => ({ ...prev, isOpen: false }));
    } catch (error) {
      notify.error("Erro ao processar solicitação.");
    }
  };

  const stepsConfig = useMemo(
    () => [
      {
        key: "company",
        title: "Dados do parceiro",
        component: <CompanyForm />,
      },
      { key: "contacts", title: "Contato", component: <ContactsForm /> },
    ],
    [],
  );

  const handlerOnSubmit = async (values: DrawerFormPartnerProps) => {
    const payload = {
      data: {
        origin: "PORTAL",
        operation: "CREATE",
        fee: parseFloat(String(values.fee)),
        rewardsRate: parseFloat(String(values.rewardsRate)),
        segment: values.segment,
        entity: values.entity,
        company: { ...values.company },
        address: { ...values.address },
        details: { ...values.details, status: "ACTIVE" },
        contacts: Object.values(values.contacts || {}).map((c: any) => ({
          description: String(c.description),
          phone: String(c.phone),
          email: String(c.email),
          type: c.type,
        })),
      },
    };

    await upsertPartner(payload, {
      onSuccess: () => {
        setIsDrawerOpen(false);
      },
    });
  };

  const formData = useFormik<DrawerFormPartnerProps>({
    initialValues: initialPartnerValues(partnersData),
    validationSchema: formPartnerValidationSchema,
    enableReinitialize: true,
    validateOnMount: true,
    onSubmit: handlerOnSubmit,
  });

  const {
    activeStep,
    setActiveStep,
    handleNext,
    handleBack,
    isStepValid,
    onStepClick,
  } = useMultiStepForm({
    totalSteps: stepsConfig.length,
    formData,
    stepFields: stepPartnerFields,
    stepsConfig,
  });

  const openDrawer = async (step = 0) => {
    const initialValues = initialPartnerValues(partnersData);
    formData.resetForm({ values: initialValues });

    await formData.validateForm(initialValues);

    setIsDrawerOpen(true);
    setActiveStep(step);
  };

  const isCompanyLoaded =
    !!formData.values.company.businessName && !!formData.values.address.address;

  const drawerContentProps = {
    header: {
      title: "Novo Parceiro",
      headerStep: `Etapa ${activeStep + 1} de ${stepsConfig.length}`,
    },
    steps: stepsConfig.map((s) => s.title),
    activeStep: activeStep,
    isValid: isStepValid(activeStep),
    onStepClick: onStepClick,
    content: (
      <FormController value={formData}>
        {stepsConfig[activeStep].component}
        <Show hidden={activeStep === 0 && !isCompanyLoaded}>
          <DrawerButtons
            activeStep={activeStep}
            title={stepsConfig.map((s) => s.title)}
            onClose={() => setIsDrawerOpen(false)}
            handleBack={handleBack}
            handleNext={handleNext}
            isValid={isStepValid(activeStep)}
            isLoading={formData.isSubmitting}
            isDirty={formData.dirty}
          />
        </Show>
      </FormController>
    ),
  };

  const config = dialogConfirmConfig[confirmData.type];

  const confirmProps: ConfirmDialogProps = {
    isOpen: confirmData.isOpen,
    title: confirmData.title,
    subtitle: confirmData.subtitle,
    buttonText: confirmData.buttonText,
    buttonColor: config.buttonColor,
    icon: config.icon,
    iconBgColor: config.iconBgColor,
    iconColor: config.iconColor,
    alertVariant: config.alertVariant,
    closeModal: () => setConfirmData((prev) => ({ ...prev, isOpen: false })),
    confirmDialog: handleConfirmAction,
  };

  return {
    partnersData,
    isPending,
    columns,
    rows,
    metrics: metricsData,
    pagination: {
      page,
      limit,
      total: partnersData?.totalCount || 0,
    },
    setPage,
    setLimit,
    confirmProps,
    openConfirmToggle,
    isDrawerOpen,
    drawerContentProps,
    openDrawer,
    closeDrawer: () => setIsDrawerOpen(false),
  };
};

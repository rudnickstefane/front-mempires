/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box } from "@mui/material";
import { useEffect, useRef } from "react";
import { Modal, ModalHeader } from "../Modal";
import { useModal } from "../Modal/hooks";

interface DrawerContentType {
  header: {
    title: string;
    headerStep?: string;
  };
  steps?: string[];
  activeStep?: number;
  content?: React.ReactNode;
  onStepClick?: (step: number) => void;
}

interface ContainerProps {
  header?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
  moduleKey?: string;
  isDrawerOpen?: boolean;
  onCloseDrawer?: () => void;
  drawerContent?: DrawerContentType;
  modal?: {
    title?: string;
    description?: string;
    icon?: React.ReactNode;
    content: React.ReactNode;
  };
  containerRef?: React.RefObject<any>;
}

export function ModuleViewport(props: Readonly<ContainerProps>) {
  const { children, header, moduleKey, modal } = props;

  const { closeModal } = useModal();

  const viewportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    viewportRef.current?.scrollTo({ top: 0, behavior: "auto" });
  }, [moduleKey]);

  return (
    <>
      <Modal
        header={
          <ModalHeader
            icon={modal?.icon}
            title={modal?.title}
            description={modal?.description}
            onClick={closeModal}
          />
        }
        fullWidth
      >
        {modal?.content}
      </Modal>

      <Box
        ref={viewportRef}
        className={`overflow-x-auto max-h-[calc(100vh-60px)] p-5 pb-[4rem] bg-[#F6FAFD] h-screen ${props.className}`}
      >
        {header && <Box className="mb-5">{header}</Box>}

        <Box className="flex flex-row w-full">
          <Box className="w-full">{children}</Box>
        </Box>
      </Box>
    </>
  );
}

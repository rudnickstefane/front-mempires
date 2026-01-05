/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Button, Skeleton, Tooltip, Typography } from "@mui/material";
import { FormatCode } from "@sr/modules/common/utils/FormatCodeAndIdentity.util";

export const CompanySection = ({ methods }: any) => {
  const {
    responseCompanyDetails,
    isCompanyLoading,
    isCompanyDisabled,
    handleOpen,
    setActiveComponent,
    setSelectedResource,
    setExpandedMenus,
  } = methods;

  return (
    <Box className="flex flex-row items-center w-full">
      <Tooltip title="Meus Dados" placement="bottom" arrow>
        <Button
          className="!justify-start flex flex-row !bg-transparent w-full items-center !p-0 !text-[#08041b] hover:!text-[var(--color-primary)]"
          disabled={isCompanyDisabled}
          onClick={() => {
            setSelectedResource(null);
            setExpandedMenus([]);
            setActiveComponent("Company");
          }}
        >
          <Box className="flex flex-col text-left px-2 overflow-hidden transition-all duration-300 max-w-[15rem]">
            {isCompanyLoading ? (
              <>
                <Skeleton variant="text" animation="wave" className="w-40" />
                <Skeleton
                  variant="text"
                  animation="wave"
                  className="w-28 !-mt-[.35rem]"
                />
              </>
            ) : (
              <>
                <Typography className="truncate uppercase !text-sm !font-semibold w-full">
                  {responseCompanyDetails?.findCompanyDetails.fantasyName}
                </Typography>
                <Typography className="!text-xs truncate uppercase text-neutral-700">
                  {responseCompanyDetails?.findCompanyDetails?.code
                    ? FormatCode(
                        responseCompanyDetails?.findCompanyDetails?.code
                      )
                    : ""}
                </Typography>
              </>
            )}
          </Box>
        </Button>
      </Tooltip>
      <Box>
        <Button
          className="flex flex-row !p-0 !bg-transparent !text-xs !uppercase items-center !text-[1.25rem] !font-semibold !text-[var(--color-primary)]"
          onClick={(event) => {
            handleOpen(event, "menuProfile");
          }}
        >
          Trocar
        </Button>
      </Box>
    </Box>
  );
};

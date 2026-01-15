/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Button, Skeleton, Typography } from "@mui/material";
import { FormatCode } from "@sr/modules/common/utils/FormatCodeAndIdentity.util";
import { avatarLabel } from "@sr/utils";

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

  const fantasyName = responseCompanyDetails?.findCompanyDetails.fantasyName;

  return (
    <Box className="flex items-center w-[348px] gap-3">
      <Button
        className="!justify-center flex flex-row !bg-transparent items-center !px-3 !py-2 !text-rhino-950 !rounded-xl hover:!bg-primary-100 gap-3 whitespace-nowrap"
        disabled={isCompanyDisabled}
        onClick={() => {
          setSelectedResource(null);
          setExpandedMenus([]);
          setActiveComponent("Company");
        }}
      >
        <Box className="flex flex-col text-left transition-all duration-300 max-w-[15rem]">
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
              <Box className="w-full flex flex-row items-center gap-3">
                {!fantasyName ? (
                  <Skeleton
                    variant="rectangular"
                    width="100%"
                    height="100%"
                    className="rounded-full"
                  />
                ) : (
                  <Box className="w-9 h-9 rounded-lg flex items-center justify-center bg-primary-gradient">
                    <Typography className="!text-sm !font-bold !text-white !font-poppins">
                      {avatarLabel(fantasyName)}
                    </Typography>
                  </Box>
                )}
                <Box>
                  <Typography className="!font-poppins !truncate uppercase !text-sm !font-semibold w-full max-w-[9.9rem]">
                    {fantasyName}
                  </Typography>
                  <Typography className="!font-poppins !text-xs truncate uppercase text-rhino-800">
                    {responseCompanyDetails?.findCompanyDetails?.code
                      ? FormatCode(
                          responseCompanyDetails?.findCompanyDetails?.code
                        )
                      : ""}
                  </Typography>
                </Box>
              </Box>
            </>
          )}
        </Box>
      </Button>
      <Button
        className="!bg-transparent !text-orange transition-colors h-9 !rounded-lg !px-3 hover:!bg-orange/10 !font-semibold !text-xs"
        onClick={(event) => {
          handleOpen(event, "menuProfile");
        }}
      >
        Trocar
      </Button>
    </Box>
  );
};

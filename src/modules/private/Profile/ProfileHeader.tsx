import { Box, Button, Skeleton, Typography } from "@mui/material";
import { ProfileProps } from "@sr/common/types";
import { avatarLabel } from "@sr/utils";

export function ProfileHeader({ data }: Readonly<ProfileProps>) {
  return (
    <Box className="flex flex-row items-center">
      <Box
        component="label"
        className="relative md:w-[8.373rem] md:h-[7.407rem] w-[8.373rem] h-[7.4067rem] !mr-3 !rounded-3xl !mt-1 group !color-secondary shadow-md"
      >
        <Button
          component="label"
          className="!m-0 !p-0 w-full h-full !rounded-3xl"
        >
          {data?.loading ? (
            <Skeleton
              variant="rectangular"
              width="100%"
              height="100%"
              className="rounded-3xl"
            />
          ) : (
            <Typography className="!text-[3rem] !font-bold text-[#646464] font-ubuntu">
              {avatarLabel(data.profile?.name)}
            </Typography>
          )}
          <Box className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[#08041b4f] hover:bg-[#08041b6b] rounded-3xl"></Box>
        </Button>
      </Box>
      <Box className="w-full md:mt-0 mt-5">
        {data?.loading ? (
          <>
            <Skeleton
              variant="text"
              className="w-[40%] !h-[4rem]"
              animation="wave"
            />
            <Box className="flex flex-row items-center -mt-3">
              <Skeleton
                variant="text"
                className="!w-[20%] mr-1.5"
                animation="wave"
              />
            </Box>
            <Skeleton
              variant="text"
              className="!w-[15%] !h-[1.7rem] mr-1.5 !mt-1"
              animation="wave"
            />
            <Skeleton
              variant="text"
              className="!w-[35%] !h-[1.6rem] !-mt-[.1rem]"
              animation="wave"
            />
          </>
        ) : (
          <>
            <Typography className="md:!text-[2rem] !text-[1.5rem] truncate max-w-[55vw]">
              {data.profile?.name}
            </Typography>
            <Typography className="flex flex-row items-center !text-[.9rem]">
              {data.profile?.contact?.email}
            </Typography>
          </>
        )}
      </Box>
    </Box>
  );
}

import { Box, Button, Skeleton } from "@mui/material";
import { notify } from "@sr/common/iu/components/notifications";
import { Typography } from "@sr/common/iu/components/Typography";
import { storage } from "@sr/common/storage";
import { Animated } from "@sr/common/ui/motion";
import { avatarLabel } from "@sr/utils";
import { Copy, Sms, TickSquare } from "iconsax-react";
import { useState } from "react";
import { ProfileWidgetProps } from "../../types";

export function UserSummaryWidget({ data }: Readonly<ProfileWidgetProps>) {
  const [copied, setCopied] = useState(false);
  const profileCode = `PFL-${storage.get<string>("profileCode")}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(profileCode);
      setCopied(true);

      setTimeout(() => setCopied(false), 2000);

      notify.success("Código copiado.");
    } catch (err) {
      const msg = "Ocorreu um erro ao copiar o código de perfil.";
      notify.error(msg);
    }
  };

  const calculateProgress = () => {
    if (!data?.profile) return 0;
    const fields = [
      data.profile.name,
      data.profile.code,
      data.profile.identity,
      data.profile.birthDate,
      data.profile.gender,
      data.profile.address?.zipCode,
      data.profile.address?.address,
      data.profile.address?.number,
      data.profile.address?.district,
      data.profile.address?.city,
      data.profile.address?.state,
      data.profile.contact?.email,
      data.profile.contact?.phone,
    ];
    const filledFields = fields.filter((field) => !!field).length;
    return Math.round((filledFields / fields.length) * 100);
  };

  const progress = calculateProgress();

  return (
    <Box className="flex flex-col">
      <Box className="w-full flex justify-between items-center">
        <Box className="w-full flex flex-row items-center">
          <Box
            className={`w-16 h-16 rounded-2xl flex items-center justify-center ${data?.loading ? "" : "bg-primary-gradient"}`}
          >
            {data?.loading ? (
              <Skeleton
                variant="rectangular"
                width="100%"
                height="100%"
                className="rounded-2xl"
              />
            ) : (
              <Typography className="!text-[22px] !font-bold !text-white !font-manrope">
                {avatarLabel(data.profile?.name)}
              </Typography>
            )}
          </Box>
          <Box className="md:mt-0 mt-5">
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
              <Box>
                <Box className="ml-3">
                  <Typography className="!text-lg !font-manrope !font-semibold truncate max-w-[55vw]">
                    {data.profile?.name}
                  </Typography>
                  <Typography className="!font-manrope flex flex-row items-center !text-sm !text-neutral-500">
                    <Sms type="linear" size={19} className="mr-2" />
                    {data.profile?.contact?.email}
                  </Typography>
                </Box>
              </Box>
            )}
          </Box>
        </Box>

        <Box className="flex flex-col lg:flex-row text-right gap-y-1 lg:gap-x-4 w-full items-end lg:items-center justify-end">
          <Typography
            translateId="profile.code"
            className="text-xs !text-neutral-500 font-manrope"
          />
          <Button
            variant="outlined"
            onClick={handleCopy}
            className={`flex items-center gap-2 !px-3 !py-2 !rounded-lg font-medium !font-manrope hover:bg-muted/80 transition-colors !text-sm !text-neutral-700 w-40 ${
              copied
                ? "!bg-success-50 !border-success-500"
                : "!bg-neutral-100 !border-neutral-200"
            }`}
          >
            {profileCode}
            {copied ? (
              <TickSquare
                size={17}
                variant="Bold"
                className="text-success-500"
              />
            ) : (
              <Copy type="linear" size={17} />
            )}
          </Button>
        </Box>
      </Box>
      {!data.loading && progress < 100 && (
        <Box className="mt-6 w-full">
          <Box className="flex justify-between items-center mb-2">
            <Typography className="!font-manrope !font-semibold !text-sm">
              Complete seu perfil
            </Typography>
            <Typography className="!font-manrope !font-semibold !text-sm !text-orange-500">
              {progress}%
            </Typography>
          </Box>

          <Box className="w-full h-2 bg-neutral-200 rounded-full overflow-hidden">
            <Animated
              variant="progress"
              custom={progress}
              className="h-full rounded-full bg-orange-500"
              style={{
                background:
                  "linear-gradient(135deg, bg-orange-500 0%, bg-orange-900 100%)",
              }}
            />
          </Box>

          <Typography className="!font-manrope !text-xs !text-neutral-700 !mt-2 leading-tight">
            Complete seu perfil para ter acesso a todos os benefícios da
            plataforma.
          </Typography>
        </Box>
      )}
    </Box>
  );
}

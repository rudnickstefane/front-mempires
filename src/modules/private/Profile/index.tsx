import {
  Box,
  Button,
  Divider,
  Drawer,
  Skeleton,
  Tooltip,
  Typography,
} from "@mui/material";
import { storage } from "@sr/common/storage";
import { LuShieldAlert } from "react-icons/lu";
import { PiUserSquareLight } from "react-icons/pi";
import { TbEdit } from "react-icons/tb";
import { FindProfileDetailsResponse } from "../../common/types";
import { FormatIdentity, FormatZipCode } from "../../common/utils";
import { useProfileGymManagement } from "../Portal/pages/home/hooks";

type GymProfileManagementProps = {
  data: FindProfileDetailsResponse | undefined;
  refresh: () => Promise<void>;
  isProfileLoading: boolean;
};

export default function GymProfileManagement({
  data,
  refresh,
  isProfileLoading,
}: GymProfileManagementProps) {
  const { renderDrawerContent, isDrawerOpen, openDrawer, closeDrawer } =
    useProfileGymManagement({ data, refresh });

  return (
    <>
      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={closeDrawer}
        disableEnforceFocus
        PaperProps={{
          className: "w-[60%] p-8",
        }}
      >
        {renderDrawerContent()}
      </Drawer>

      <Box className="overflow-x-auto max-h-[calc(100vh-60px)] p-5 pb-[4rem]">
        <Box className="flex flex-row items-center">
          <Box
            component="label"
            className="relative md:w-[8.373rem] md:h-[7.407rem] w-[8.373rem] h-[7.4067rem] !mr-3 !rounded-3xl !mt-1 group !color-secondary shadow-md"
          >
            <Button
              component="label"
              className="!m-0 !p-0 w-full h-full !rounded-3xl"
            >
              <PiUserSquareLight className="text-[7rem] text-[#646464]" />
              <Box className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[#08041b4f] hover:bg-[#08041b6b] rounded-3xl"></Box>
            </Button>
          </Box>
          <Box className="w-full md:mt-0 mt-5">
            {isProfileLoading ? (
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
                <Typography className="md:!text-[2rem] !text-[1.5rem] whitespace-nowrap overflow-hidden text-ellipsis max-w-[55vw]">
                  {data?.findProfileDetails.name}
                </Typography>
                <Typography className="flex flex-row items-center !text-[.9rem]">
                  {data.findProfileDetails?.contact[0].email}
                </Typography>
              </>
            )}
          </Box>
        </Box>

        <Box className="flex flex-row w-full mt-5">
          <Box className="bg-white w-full rounded-3xl shadow-md p-5 border border-[#EAECF0]">
            <Box className="flex flex-row justify-between items-center">
              <Box>
                <Typography className="flex flex-row items-center !text-[2.25rem] text-[#212121]">
                  Meus Dados
                </Typography>
                <Typography className="flex flex-row items-center !text-[.85rem] !mt-4">
                  Informações Cadastrais
                </Typography>
              </Box>
              <Box>
                <Typography className="flex flex-row items-center !text-[.85rem] !mt-4">
                  Código: PFL-{storage.get<string>("profileCode")}
                </Typography>
              </Box>
            </Box>
            <Divider className="!my-5 w-full bg-[#e2e2e4]" />
            <Box className="mt-5 border border-neutral-300 rounded-lg p-5">
              <Box className="!text-neutral20 !font-roboto !text-base !font-semibold !flex !items-center !gap-4">
                Dados Pessoais
                <Button
                  className="!min-w-5 !mr-5"
                  sx={{
                    color: "#4b5563",
                    fontWeight: "normal",
                    padding: 0,
                    transition:
                      "transform 0.3s, background-color 0.3s, color 0.3s,",
                    "&:hover": {
                      background: "white",
                      color: "#ff0336",
                    },
                  }}
                  onClick={() => openDrawer("EditInfos", 0)}
                >
                  <TbEdit size={24} />
                </Button>
              </Box>
              {isProfileLoading ? (
                <>
                  {Array.from({ length: Math.min(5) }).map((_, index) => (
                    <Box key={index} className="flex flex-col">
                      <Skeleton
                        variant="text"
                        animation="wave"
                        className="w-[30%] !h-[2.1rem] !mt-2"
                      />
                    </Box>
                  ))}
                </>
              ) : (
                <>
                  <Box className="grid grid-cols-[10rem,1fr]">
                    <Typography className="!text-neutral-700 !font-roboto !text-sm !mt-4">
                      Nome
                    </Typography>
                    <Typography className="!text-neutral-700 !font-roboto !text-sm !mt-4 !font-semibold">
                      {data?.findProfileDetails.name || ""}
                    </Typography>
                  </Box>
                  <Box className="grid grid-cols-[10rem,1fr]">
                    <Typography className="!text-neutral-700 !font-roboto !text-sm !mt-4">
                      Data de Nascimento
                    </Typography>
                    <Typography className="!text-neutral-700 !font-roboto !text-sm !mt-4 !font-semibold">
                      {data?.findProfileDetails.birthDate || ""}
                    </Typography>
                  </Box>
                  <Box className="grid grid-cols-[10rem,1fr]">
                    <Typography className="!text-neutral-700 !font-roboto !text-sm !mt-4">
                      CPF
                    </Typography>
                    <Typography className="!text-neutral-700 !font-roboto !text-sm !mt-4 !font-semibold">
                      {data?.findProfileDetails.identity
                        ? FormatIdentity(data?.findProfileDetails.identity)
                        : ""}
                    </Typography>
                  </Box>
                </>
              )}
            </Box>

            <Box className="mt-5 border border-neutral-300 rounded-lg p-5">
              <Box className="!text-neutral20 !font-roboto !text-base !font-semibold !flex !items-center !gap-4">
                Endereço
                <Button
                  className="!min-w-5 !mr-5"
                  sx={{
                    color: "#4b5563",
                    fontWeight: "normal",
                    padding: 0,
                    transition:
                      "transform 0.3s, background-color 0.3s, color 0.3s,",
                    "&:hover": {
                      background: "white",
                      color: "#ff0336",
                    },
                  }}
                  onClick={() => openDrawer("EditInfos", 1)}
                >
                  <TbEdit size={24} />
                </Button>
              </Box>
              {isProfileLoading ? (
                <>
                  {Array.from({ length: Math.min(7) }).map((_, index) => (
                    <Box key={index} className="flex flex-col">
                      <Skeleton
                        variant="text"
                        animation="wave"
                        className="w-[30%] !h-[2.1rem] !mt-2"
                      />
                    </Box>
                  ))}
                </>
              ) : (
                <>
                  <Box className="grid grid-cols-[10rem,1fr]">
                    <Typography className="!text-neutral-700 !font-roboto !text-sm !mt-4">
                      CEP
                    </Typography>
                    <Typography className="!text-neutral-700 !font-roboto !text-sm !mt-4 !font-semibold">
                      {data?.findProfileDetails.zipCode
                        ? FormatZipCode(data.findProfileDetails.zipCode)
                        : ""}
                    </Typography>
                  </Box>
                  <Box className="grid grid-cols-[10rem,1fr]">
                    <Typography className="!text-neutral-700 !font-roboto !text-sm !mt-4">
                      Logradouro
                    </Typography>
                    <Typography className="!text-neutral-700 !font-roboto !text-sm !mt-4 !font-semibold">
                      {data?.findProfileDetails.address || ""}
                    </Typography>
                  </Box>
                  <Box className="grid grid-cols-[10rem,1fr]">
                    <Typography className="!text-neutral-700 !font-roboto !text-sm !mt-4">
                      Número
                    </Typography>
                    <Typography className="!text-neutral-700 !font-roboto !text-sm !mt-4 !font-semibold">
                      {data?.findProfileDetails.number || ""}
                    </Typography>
                  </Box>
                  <Box className="grid grid-cols-[10rem,1fr]">
                    <Typography className="!text-neutral-700 !font-roboto !text-sm !mt-4">
                      Complemento
                    </Typography>
                    <Typography className="!text-neutral-700 !font-roboto !text-sm !mt-4 !font-semibold">
                      {data?.findProfileDetails.complement || ""}
                    </Typography>
                  </Box>
                  <Box className="grid grid-cols-[10rem,1fr]">
                    <Typography className="!text-neutral-700 !font-roboto !text-sm !mt-4">
                      Bairro
                    </Typography>
                    <Typography className="!text-neutral-700 !font-roboto !text-sm !mt-4 !font-semibold">
                      {data?.findProfileDetails.district || ""}
                    </Typography>
                  </Box>
                  <Box className="grid grid-cols-[10rem,1fr]">
                    <Typography className="!text-neutral-700 !font-roboto !text-sm !mt-4">
                      Cidade
                    </Typography>
                    <Typography className="!text-neutral-700 !font-roboto !text-sm !mt-4 !font-semibold">
                      {data?.findProfileDetails.city || ""}
                    </Typography>
                  </Box>
                  <Box className="grid grid-cols-[10rem,1fr]">
                    <Typography className="!text-neutral-700 !font-roboto !text-sm !mt-4">
                      Estado
                    </Typography>
                    <Typography className="!text-neutral-700 !font-roboto !text-sm !mt-4 !font-semibold">
                      {data?.findProfileDetails.state || ""}
                    </Typography>
                  </Box>
                </>
              )}
            </Box>

            <Box className="mt-5 border border-neutral-300 rounded-lg p-5 pb-0">
              <Box className="!text-neutral20 !font-roboto text-base font-semibold flex md:items-center !gap-4 mb-3 md:flex-row flex-col justify-between">
                <Box>
                  Contato
                  <Button
                    className="!min-w-5 !ml-4"
                    sx={{
                      color: "#4b5563",
                      fontWeight: "normal",
                      padding: 0,
                      transition:
                        "transform 0.3s, background-color 0.3s, color 0.3s,",
                      "&:hover": {
                        background: "white",
                        color: "#ff0336",
                      },
                    }}
                    onClick={() => openDrawer("EditInfos", 2)}
                  >
                    <TbEdit size={24} />
                  </Button>
                </Box>
                {data &&
                  data.findProfileDetails?.contact?.filter(
                    (contact) => contact.emailStatus === "PENDING"
                  ).length > 0 && (
                    <Box className="bg-[#fff9ee] border border-[#faa200] rounded-lg font-semibold flex flex-row items-center justify-center text-[#faa200] py-1 px-2 uppercase text-[.8rem] font-poppins">
                      <LuShieldAlert className="text-[#faa200] text-[1.3rem] mr-2" />
                      {data.findProfileDetails?.contact?.filter(
                        (contact) => contact.emailStatus === "PENDING"
                      ).length > 1
                        ? "Existem e-mails não confirmados"
                        : "Existe um e-mail não confirmado"}
                    </Box>
                  )}
              </Box>
              {isProfileLoading ? (
                <Skeleton
                  variant="text"
                  animation="wave"
                  className="w-[30%] !h-[10rem] !-my-[2.1rem]"
                />
              ) : (
                <Box className="flex flex-wrap justify-between">
                  {data?.findProfileDetails.contact
                    .sort((a) => (a.type === "MAIN" ? -1 : 1))
                    .map((contact) => (
                      <Box
                        key={contact.contactCode}
                        className="bg-[#F3F3F4] md:w-[49%] w-full rounded-lg p-5 pt-[14px] grid grid-cols-[5.5rem,1fr] mb-5"
                      >
                        <Typography className="!text-neutral-700 !font-roboto !text-sm !mt-4">
                          Descrição
                        </Typography>
                        <Typography className="!text-neutral-700 !font-roboto !text-sm !mt-4 !font-semibold break-words overflow-hidden">
                          {contact.description || ""}
                        </Typography>
                        <Typography className="!text-neutral-700 !font-roboto !text-sm !mt-4">
                          Telefone
                        </Typography>
                        <Typography className="!text-neutral-700 !font-roboto !text-sm !mt-4 !font-semibold">
                          {contact.phone || ""}
                        </Typography>
                        <Typography className="!text-neutral-700 !font-roboto !text-sm !mt-4">
                          E-mail
                        </Typography>
                        {contact.emailStatus === "PENDING" ? (
                          <Tooltip
                            placement="bottom"
                            title={
                              <>
                                Este e-mail ainda não foi confirmado. Clique
                                para reenviar o e-mail de confirmação.
                                <br />
                                <br />
                                Após o envio, não se esqueça de verificar sua
                                caixa de entrada e a pasta de spam.
                              </>
                            }
                            arrow
                          >
                            <Typography className="!font-roboto !text-sm !mt-4 !font-semibold !text-[#faa200] cursor-pointer break-words overflow-hidden">
                              {contact.email || ""}
                            </Typography>
                          </Tooltip>
                        ) : (
                          <Typography className="!text-neutral-700 !font-roboto !text-sm !mt-4 !font-semibold break-words overflow-hidden">
                            {contact.email || ""}
                          </Typography>
                        )}
                      </Box>
                    ))}
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}

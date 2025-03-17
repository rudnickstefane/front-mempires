import { Box, Button, Divider, Typography } from '@mui/material';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import { useRef } from 'react';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { PiPrinterDuotone } from 'react-icons/pi';
import { useReactToPrint } from 'react-to-print';
import { DrawerProps } from '../../../../common/types';
import { useReviewDetailForm } from '../../hooks';

interface ResponseItem {
  question: string;
  response: string;
  category: string;
}

export const ReviewDetailDrawer = ({
  closeDrawer,
  data,
}: DrawerProps) => {

  const cutaneousFields = [
    { key: 'subscapularis', label: 'Subescapular' },
    { key: 'triceps', label: 'Tríceps' },
    { key: 'biceps', label: 'Bíceps' },
    { key: 'chest', label: 'Tórax' },
    { key: 'middleAxillary', label: 'Axilar Média' },
    { key: 'suprailiac', label: 'Suprailíaca' },
    { key: 'abdominal', label: 'Abdominal' },
    { key: 'medialThigh', label: 'Coxa Medial' },
    { key: 'medialCalf', label: 'Panturrilha Medial' }
  ];

  const measuresFields = [
    { key: 'waist', label: 'Cintura' },
    { key: 'abdome', label: 'Abdome' },
    { key: 'hip', label: 'Quadril' },
  ];

  const diametersFields = [
    { key: 'wristBistyloid', label: 'Biestilóide do Punho' },
    { key: 'femurBistyloid', label: 'Biepicôndilo do Fêmur' },
  ];

  const hasCutaneousFields = cutaneousFields.some(fold => Number(data[fold.key]) > 0);
  const hasMeasuresFields = measuresFields.some(fold => Number(data[fold.key]) > 0);
  const hasDiametersFields = diametersFields.some(fold => Number(data[fold.key]) > 0);
  const hasPerimeters = data?.response?.filter((item: ResponseItem) => item.category === 'MEASURES').length > 0;
  const flexionValue = data.response.find((item: ResponseItem) => item.category === 'NEUROMOTORS' && item.question === 'Flexão de Braços Repetições')?.response;
  const abdominalValue = data.response.find((item: ResponseItem) => item.category === 'NEUROMOTORS' && item.question === 'Abdominal Repetições')?.response;
  const sitreachValue = data.response.find((item: ResponseItem) => item.category === 'NEUROMOTORS' && item.question === 'Sentar e Alcançar')?.response;
  const hasAnyData = hasPerimeters || hasMeasuresFields || hasCutaneousFields || hasDiametersFields;

  const massamagra = data.leanMass;
  const massagorda = data.fatMass;
  const massamagrakg = (massamagra / 100) * data.weight.replace(',', '.');
  const massagordakg = (massagorda / 100) * data.weight.replace(',', '.');

  const componentRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({
    contentRef: componentRef, // Usar contentRef ao invés de content
    documentTitle: `avaliação-${data.reviewCode}`,
    pageStyle: `
      @media print {
        .print-content {
          padding: 2rem;
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }

        .notPrint {
          display: none !important;
        }

        .break-before {
          page-break-before: always;
        }
      }
    `,
  });

  const onPrintClick = () => {
    handlePrint();
  };

  const tretacompartimentalData = [
    {
      label: 'Massa Gorda',
      value: massagordakg.toFixed(2),
      color: '#FF9800'
    },
    {
      label: 'Massa Residual',
      value: data.residualMass,
      color: '#4CAF50'
    },
    {
      label: 'Massa Óssea',
      value: data.boneMass,
      color: '#673AB7'
    },
    {
      label: 'Massa Muscular',
      value: data.muscleMass,
      color: '#D32F2F'
    },
  ];

  const valueFormatter = (item: { label: string; value: number }) => {
    return `${item.value}kg`;
  };    

  const size = {
    width: 300,
    height: 200,
  };

  const dataPie = {
    data: tretacompartimentalData,
    valueFormatter,
  };

  const {
    protocolsOptions,
    protocolsOptionsCardio,
    getImcColor,
    getImcPosition,
    getReviewClassification
  } = useReviewDetailForm();

  const protocolLabel = protocolsOptions.find(option => option.value === data.protocol)?.label || data.protocol;
  const protocolCardioLabel = protocolsOptionsCardio.find(option => option.value === data.protocolCardio)?.label || data.protocolCardio;

  const isAll = !data.gender || data.gender === 'OTHERS';
  const isMan = data.gender === 'MAN';
  const isWoman = data.gender === 'WOMAN';

  return (
    <Box>
      <Box ref={componentRef} className='print-content'>
        <Box className='flex justify-between'>
          <Typography className='!font-semibold !text-3xl !text-left !text-neutral20'>
            Detalhes da Avaliação
          </Typography>
          <Box className='flex justify-end items-center'>
            <Button
              onClick={closeDrawer}
              className='flex flex-row items-center font-poppins !min-w-10 !mx-1 !rounded-full !min-h-10 notPrint'
              sx={{
                color: '#4b5563',
                transition: 'transform 0.3s, background-color 0.3s, color 0.3s',
                '&:hover': {
                  color: '#ff0336',
                },
              }}
            >
              <IoIosCloseCircleOutline className='text-[1.5rem]' />
            </Button>
          </Box>
        </Box>
        <Box className='w-full flex flex-col justify-start items-center gap-4 mt-8'>
          <Box className='flex w-full'>
            <Box className='flex flex-col w-full md:pr-0 pr-2'>
              <Box className='flex flex-col rounded-xl w-full p-5 border border-[#EAECF0]'>
                <Box className='flex flex-row justify-between items-center'>
                  <Typography className='!font-light !text-[1.5rem]'>{data.student}</Typography>
                    <Button
                      onClick={onPrintClick}
                      variant="contained"
                      color="primary"
                      className='shadow-lg notPrint'
                      startIcon={<PiPrinterDuotone />}
                      sx={{
                        backgroundColor: '#f4f4f4',
                        color: '#181818',
                        height: '3rem',
                        '&:hover': {
                          backgroundColor: '#d4d4d8',
                        },
                      }}
                    >
                      Imprimir
                    </Button>
                </Box>
              </Box>
              <Box className='flex flex-col rounded-xl w-full p-5 border border-[#EAECF0] mt-5'>
                <Box className='flex flex-row justify-between items-center'>
                  <Box className='flex flex-col rounded-xl w-full p-1'>
                    <Box className='flex flex-col'>
                      <Typography className='!font-light !text-[1.5rem]'>Informações</Typography>
                    </Box>
                    <Divider className='!my-5' />
                    <Box className='flex flex-col'>
                      <Box className="w-full flex flex-row justify-between items-center">
                        <Typography className="!font-light text-gray-600">Número da avaliação</Typography>
                        <Typography className="!text-[1.1rem] !font-poppins">ALC-{data.reviewCode}</Typography>
                      </Box>
                      <Box className="w-full flex flex-row justify-between items-center mt-3">
                        <Typography className="!font-light text-gray-600">Avaliador</Typography>
                        <Typography className="!text-[1.1rem] !font-poppins">{data.evaluator}</Typography>
                      </Box>
                      <Box className="w-full flex flex-row justify-between items-center mt-3">
                        <Typography className="!font-light text-gray-600">Data da avaliação</Typography>
                        <Typography className="!text-[1.1rem] !font-poppins">{data.createdAt}</Typography>
                      </Box>
                      <Box className="w-full flex flex-row justify-between items-center mt-3">
                        <Typography className="!font-light text-gray-600">Próxima avaliação</Typography>
                        <Typography className="!text-[1.1rem] !font-poppins">{data.dueDate ? data.dueDate : '---'}</Typography>
                      </Box>
                      <Box className="w-full flex flex-row justify-between items-center mt-3">
                        <Typography className="!font-light text-gray-600">Peso</Typography>
                        <Typography className="!text-[1.1rem] !font-poppins">{data.weight} kg</Typography>
                      </Box>
                      <Box className="w-full flex flex-row justify-between items-center mt-3">
                        <Typography className="!font-light text-gray-600">Altura</Typography>
                        <Typography className="!text-[1.1rem] !font-poppins">{data.height} cm</Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
              <Box className='flex flex-col rounded-xl w-full p-5 border border-[#EAECF0] mt-5 notPrint'>
                <Box className="flex flex-col">
                  <Typography className="!font-light !text-[1.5rem]">Observações Internas</Typography>
                </Box>
                <Divider className="!my-5" />
                <Typography className="!font-light">{data.observation}</Typography>
              </Box>
              {data?.response?.filter((item: ResponseItem) => item.category === 'PAR_Q').length > 0 && (
                <Box className='flex flex-col rounded-xl w-full p-5 mt-5 border border-[#EAECF0]'>
                  <Box className="flex flex-col">
                    <Typography className="!font-light !text-[1.5rem]">Par-Q</Typography>
                  </Box>
                  <Divider className="!my-5" />
                  <Box className="flex flex-col">
                    {data.response
                      .filter((item: ResponseItem) => item.category === 'PAR_Q')
                      .map((item: ResponseItem, index: number) => (
                        <Box key={index} className="w-full flex flex-row mb-3">
                          <Box className="!font-light text-black !text-[.9rem]">
                            {item.question} <span
                              className={`font-semibold ${
                                item.response === 'yes' ? 'text-orange-700' : 'text-green-600'
                              }`}
                            >
                              {item.response === 'yes' ? 'Sim' : 'Não'}
                            </span>
                          </Box>
                        </Box>
                      ))}
                  </Box>
                </Box>
              )}
              {data?.response?.filter((item: ResponseItem) => item.category === 'ANAMNESE').length > 0 && (
                <Box
                  className={`flex flex-col rounded-xl w-full p-5 mt-5 border border-[#EAECF0] ${
                    data?.response?.filter((item: ResponseItem) => item.category === 'PAR_Q').length > 4 ||
                    data?.response?.filter((item: ResponseItem) => item.category === 'ANAMNESE').length > 3
                      ? 'break-before'
                      : ''
                  }`}
                >
                  <Box className="flex flex-col">
                    <Typography className="!font-light !text-[1.5rem]">Anamnese</Typography>
                  </Box>
                  <Divider className="!my-5" />
                  <Box className="flex flex-col">
                    {data.response
                      .filter((item: ResponseItem) => item.category === 'ANAMNESE')
                      .map((item: ResponseItem, index: number) => (
                        <Box key={index} className="w-full flex flex-col justify-between mb-3">
                          <Box className="!font-light text-black !text-[.9rem]">
                            {item.question}{item.question === 'Observações' ? ':' : ''} <span className='font-semibold text-green-600'>{item.response}
                            </span>
                          </Box>
                        </Box>
                      ))}
                  </Box>
                </Box>
              )}
              {hasAnyData && (
                <Box
                  className={`flex flex-col rounded-xl w-full p-5 mt-5 border border-[#EAECF0] ${
                    data?.response?.filter((item: ResponseItem) => item.category === 'ANAMNESES').length > 0 ||
                    data?.response?.filter((item: ResponseItem) => item.category === 'MEASURES').length > 7
                      ? 'break-before'
                      : ''
                  }`}
                >
                  <Box className="flex flex-col">
                    <Typography className="!font-light !text-[1.5rem]">Medidas</Typography>
                  </Box>
                  <Divider className="!my-5" />

                  <Box className='flex flex-row justify-between'>
                    {/* Seção Perímetros */}
                    {(hasPerimeters || hasMeasuresFields) && (
                      <Box className='flex flex-col border-r w-full pr-5 border-[#EAECF0]'>
                        <Typography className="!font-light !text-[1.2rem] mb-2">Perímetros</Typography>
                        <Divider className="!my-3" />
                        <Box className="flex flex-col">
                          {/* Dados do data.response */}
                          {hasPerimeters && data.response
                            .filter((item: ResponseItem) => item.category === 'MEASURES')
                            .map((item: ResponseItem, index: number) => (
                              <Box key={`response-${index}`} className="w-full flex flex-col justify-between mb-3">
                                <Typography className="!font-light text-gray-600 !text-[.8rem]">{item.question}</Typography>
                                <Typography className="!text-[.8rem] !font-poppins !font-semibold">
                                  {Number(item.response).toFixed(1).replace('.', ',')} cm
                                </Typography>
                              </Box>
                            ))}
                          {/* Dados do measuresFields */}
                          {hasMeasuresFields && measuresFields.map(({ key, label }) => (
                            Number(data[key]) > 0 && (
                              <Box key={key} className="w-full flex flex-col justify-between mb-3">
                                <Typography className="!font-light text-gray-600 !text-[.8rem]">{label}</Typography>
                                <Typography className="!text-[.8rem] !font-poppins !font-semibold">
                                  {Number(data[key]).toFixed(1).replace('.', ',')} cm
                                </Typography>
                              </Box>
                            )
                          ))}
                        </Box>
                      </Box>
                    )}

                    {/* Seção Dobras Cutâneas */}
                    {hasCutaneousFields && (
                      <Box className='flex flex-col border-r px-5 w-full border-[#EAECF0]'>
                        <Typography className="!font-light !text-[1.2rem] mb-2 mt-5">Dobras Cutâneas</Typography>
                        <Divider className="!my-3" />
                        <Box className="flex flex-col">
                          {cutaneousFields.map(({ key, label }) => (
                            Number(data[key]) > 0 && (
                              <Box key={key} className="w-full flex flex-col justify-between mb-3">
                                <Typography className="!font-light text-gray-600 !text-[.8rem]">{label}</Typography>
                                <Typography className="!text-[.8rem] !font-poppins !font-semibold">
                                  {Number(data[key]).toFixed(1).replace('.', ',')} mm
                                </Typography>
                              </Box>
                            )
                          ))}
                        </Box>
                      </Box>
                    )}

                    {/* Seção Diâmetros */}
                    {hasDiametersFields && (
                      <Box className='flex flex-col w-full pl-5'>
                        <Typography className="!font-light !text-[1.2rem] mb-2 mt-5">Diâmetros</Typography>
                        <Divider className="!my-3" />
                        <Box className="flex flex-col">
                          {diametersFields.map(({ key, label }) => (
                            Number(data[key]) > 0 && (
                              <Box key={key} className="w-full flex flex-col justify-between mb-3">
                                <Typography className="!font-light text-gray-600 !text-[.8rem]">{label}</Typography>
                                <Typography className="!text-[.8rem] !font-poppins !font-semibold">
                                  {Number(data[key]).toFixed(1).replace('.', ',')} cm
                                </Typography>
                              </Box>
                            )
                          ))}
                        </Box>
                      </Box>
                    )}
                  </Box>
                </Box>
              )}
              {massamagrakg > 0 && massagorda > 0 && data.sumFolds > 0 && (
                <Box
                  className={`flex flex-col rounded-xl w-full p-5 mt-5 border border-[#EAECF0] ${massamagrakg > 0 && massagorda > 0 && data.sumFolds > 0 ? 'break-before' : ''
                  }`}
                >
                  <Box className="flex flex-row justify-between items-center">
                    <Typography className="!font-light !text-[1.3rem]">Bicompartimental</Typography>
                    <Typography className="!font-light !text-[.9rem]">Protocolo: {protocolLabel}</Typography>
                  </Box>
                  <Divider className="!my-5" />
                  <Box className='w-full flex flex-row justify-between'>
                      <Box className='flex flex-col items-center text-[#4caf50] text-[1.5rem] font-bold mx-5'>
                          <Box className='flex flex-row'>
                              {String(massamagra).replace('.', ',')}%
                              <Box className='text-[.8rem] font-normal mt-3 ml-2'>({Number(massamagrakg).toFixed(2).replace('.', ',')}kg)</Box>
                          </Box>
                          <Box className='text-[.8rem] uppercase font-normal '>Massa Magra</Box>
                      </Box>
                      <Box className='flex flex-col items-center text-[#FF9800] text-[1.5rem] font-bold mx-5'>
                          <Box className='flex flex-row'>
                              {String(massagorda).replace('.', ',')}%
                              <Box className='text-[.8rem] font-normal mt-3 ml-2'>({Number(massagordakg).toFixed(2).replace('.', ',')}kg)</Box>
                          </Box>
                          <Box className='text-[.8rem] uppercase font-normal '>Massa Gorda</Box>
                      </Box>
                  </Box>
                  <Box className="w-full mt-1 relative">
                    <Box className="w-full h-4 flex rounded-lg overflow-hidden border border-gray-300">
                        <Box className="bg-[#4caf50]" style={{ width: `${massamagra}%` }}></Box> {/* Peso normal */}
                        <Box className="bg-[#FF9800]" style={{ width: `${massagorda}%` }}></Box> {/* Sobrepeso */}
                    </Box>
                  </Box>
                </Box>
              )}
              {massagorda > 0 && data.sumFolds > 0 && data.residualMass > 0 && data.boneMass > 0 && data.muscleMass > 0 && (
                <Box className='flex flex-col rounded-xl w-full p-5 mt-5 border border-[#EAECF0]'>
                  <Box className="flex flex-row justify-between items-center">
                    <Typography className="!font-light !text-[1.3rem]">Tetracompartimental</Typography>
                    <Typography className="!font-light !text-[.9rem]">Protocolo: {protocolLabel}</Typography>
                  </Box>
                  <Divider className="!my-5" />
                  <Box className='w-full flex flex-row justify-between'>
                    <Box className='w-[210px]'>
                      <PieChart
                          series={[{
                              innerRadius: 20,
                              outerRadius: 100,
                              paddingAngle: 5,
                              cornerRadius: 7,
                              startAngle: -45,
                              cx: 100,
                              arcLabel: (item) => `${item.value}kg`,
                              arcLabelMinAngle: 35,
                              arcLabelRadius: '70%',
                              data: dataPie.data,
                          },
                          ]}
                          slotProps={{
                              legend: {
                                  hidden: true,
                              },
                          }}
                          sx={{
                              [`& .${pieArcLabelClasses.root}`]: {
                              fontWeight: 'bold',
                              fill: 'white',
                              fontSize: 15,
                              },
                          }}
                          {...size}
                      />
                    </Box>
                    <Box className='flex flex-col justify-center'>
                      <Box className='flex flex-row items-center text-[1.5rem]'>
                        <Box className='w-3 h-3 bg-[#FF9800] rounded-sm'></Box>
                        <Box className='text-[.8rem] font-normal ml-2'><span className='uppercase'>Massa Gorda</span> ({Number(massagordakg).toFixed(2).replace('.', ',')}kg)</Box>
                      </Box>
                      <Box className='flex flex-row items-center text-[1.5rem] mt-3'>
                        <Box className='w-3 h-3 bg-[#4CAF50] rounded-sm'></Box>
                        <Box className='text-[.8rem] font-normal ml-2'><span className='uppercase'>Massa Residual</span> ({String(data.residualMass).replace('.', ',')}kg)</Box>
                      </Box>
                      <Box className='flex flex-row items-center text-[1.5rem] mt-3'>
                        <Box className='w-3 h-3 bg-[#673AB7] rounded-sm'></Box>
                        <Box className='text-[.8rem] font-normal ml-2'><span className='uppercase'>Massa Óssea</span> ({String(data.boneMass).replace('.', ',')}kg)</Box>
                      </Box>
                      <Box className='flex flex-row items-center text-[1.5rem] mt-3'>
                        <Box className='w-3 h-3 bg-[#D32F2F] rounded-sm'></Box>
                        <Box className='text-[.8rem] font-normal ml-2'><span className='uppercase'>Massa Muscular</span> ({String(data.muscleMass).replace('.', ',')}kg)</Box>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              )}
              {massagorda > 0 && data.sumFolds > 0 && (
                <Box className='flex flex-col rounded-xl w-full p-5 mt-5 border border-[#EAECF0]'>
                  <Box className="flex flex-row">
                    <Typography className="!font-light !text-[1.3rem]">Classificação de Massa Gorda</Typography>
                  </Box>
                  <Divider className="!my-5" />
                  <Box className='flex flex-row justify-between items-center'>
                    {data.age < 19 && isAll && (
                      <Box className="flex flex-row" style={{ color: getImcColor(massagorda, 'CMG_ALL_20') }}>
                        <Typography variant="h4" className="!font-bold">{massagorda.replace('.', ',')}</Typography>
                        <Typography className="!ml-1 !mt-[.9rem]">%</Typography>
                      </Box>
                    )}

                    {data.age > 18 && data.age <= 20 && isAll && (
                      <Box className="flex flex-row" style={{ color: getImcColor(massagorda, 'CMG_ALL_20') }}>
                        <Typography variant="h4" className="!font-bold">{massagorda.replace('.', ',')}</Typography>
                        <Typography className="!ml-1 !mt-[.9rem]">%</Typography>
                      </Box>
                    )}

                    {data.age >= 20 && data.age <= 29 && isAll && (
                      <Box className="flex flex-row" style={{ color: getImcColor(massagorda, 'CMG_ALL_20_29') }}>
                        <Typography variant="h4" className="!font-bold">{massagorda.replace('.', ',')}</Typography>
                        <Typography className="!ml-1 !mt-[.9rem]">%</Typography>
                      </Box>
                    )}

                    {data.age >= 30 && data.age <= 39 && isAll && (
                      <Box className="flex flex-row" style={{ color: getImcColor(massagorda, 'CMG_ALL_30_39') }}>
                        <Typography variant="h4" className="!font-bold">{massagorda.replace('.', ',')}</Typography>
                        <Typography className="!ml-1 !mt-[.9rem]">%</Typography>
                      </Box>
                    )}

                    {data.age >= 40 && data.age <= 49 && isAll && (
                      <Box className="flex flex-row" style={{ color: getImcColor(massagorda, 'CMG_ALL_40_49') }}>
                        <Typography variant="h4" className="!font-bold">{massagorda.replace('.', ',')}</Typography>
                        <Typography className="!ml-1 !mt-[.9rem]">%</Typography>
                      </Box>
                    )}

                    {data.age >= 50 && data.age <= 59 && isAll && (
                      <Box className="flex flex-row" style={{ color: getImcColor(massagorda, 'CMG_ALL_50_59') }}>
                        <Typography variant="h4" className="!font-bold">{massagorda.replace('.', ',')}</Typography>
                        <Typography className="!ml-1 !mt-[.9rem]">%</Typography>
                      </Box>
                    )}

                    {data.age > 59 && isAll && (
                      <Box className="flex flex-row" style={{ color: getImcColor(massagorda, 'CMG_ALL_59') }}>
                        <Typography variant="h4" className="!font-bold">{massagorda.replace('.', ',')}</Typography>
                        <Typography className="!ml-1 !mt-[.9rem]">%</Typography>
                      </Box>
                    )}

                    {data.age < 19 && isMan && (
                      <Box className="flex flex-row" style={{ color: getImcColor(massagorda, 'CMG_MAN_20') }}>
                        <Typography variant="h4" className="!font-bold">{massagorda.replace('.', ',')}</Typography>
                        <Typography className="!ml-1 !mt-[.9rem]">%</Typography>
                      </Box>
                    )}

                    {data.age > 18 && data.age <= 20 && isMan && (
                      <Box className="flex flex-row" style={{ color: getImcColor(massagorda, 'CMG_MAN_20') }}>
                        <Typography variant="h4" className="!font-bold">{massagorda.replace('.', ',')}</Typography>
                        <Typography className="!ml-1 !mt-[.9rem]">%</Typography>
                      </Box>
                    )}

                    {data.age >= 20 && data.age <= 29 && isMan && (
                      <Box className="flex flex-row" style={{ color: getImcColor(massagorda, 'CMG_MAN_20_29') }}>
                        <Typography variant="h4" className="!font-bold">{massagorda.replace('.', ',')}</Typography>
                        <Typography className="!ml-1 !mt-[.9rem]">%</Typography>
                      </Box>
                    )}

                    {data.age >= 30 && data.age <= 39 && isMan && (
                      <Box className="flex flex-row" style={{ color: getImcColor(massagorda, 'CMG_MAN_30_39') }}>
                        <Typography variant="h4" className="!font-bold">{massagorda.replace('.', ',')}</Typography>
                        <Typography className="!ml-1 !mt-[.9rem]">%</Typography>
                      </Box>
                    )}

                    {data.age >= 40 && data.age <= 49 && isMan && (
                      <Box className="flex flex-row" style={{ color: getImcColor(massagorda, 'CMG_MAN_40_49') }}>
                        <Typography variant="h4" className="!font-bold">{massagorda.replace('.', ',')}</Typography>
                        <Typography className="!ml-1 !mt-[.9rem]">%</Typography>
                      </Box>
                    )}

                    {data.age >= 50 && data.age <= 59 && isMan && (
                      <Box className="flex flex-row" style={{ color: getImcColor(massagorda, 'CMG_MAN_50_59') }}>
                        <Typography variant="h4" className="!font-bold">{massagorda.replace('.', ',')}</Typography>
                        <Typography className="!ml-1 !mt-[.9rem]">%</Typography>
                      </Box>
                    )}

                    {data.age > 59 && isMan && (
                      <Box className="flex flex-row" style={{ color: getImcColor(massagorda, 'CMG_MAN_59') }}>
                        <Typography variant="h4" className="!font-bold">{massagorda.replace('.', ',')}</Typography>
                        <Typography className="!ml-1 !mt-[.9rem]">%</Typography>
                      </Box>
                    )}

                    {data.age < 19 && isWoman && (
                      <Box className="flex flex-row" style={{ color: getImcColor(massagorda, 'CMG_WOMAN_20') }}>
                        <Typography variant="h4" className="!font-bold">{massagorda.replace('.', ',')}</Typography>
                        <Typography className="!ml-1 !mt-[.9rem]">%</Typography>
                      </Box>
                    )}

                    {data.age > 18 && data.age <= 20 && isWoman && (
                      <Box className="flex flex-row" style={{ color: getImcColor(massagorda, 'CMG_WOMAN_20') }}>
                        <Typography variant="h4" className="!font-bold">{massagorda.replace('.', ',')}</Typography>
                        <Typography className="!ml-1 !mt-[.9rem]">%</Typography>
                      </Box>
                    )}

                    {data.age >= 20 && data.age <= 29 && isWoman && (
                      <Box className="flex flex-row" style={{ color: getImcColor(massagorda, 'CMG_WOMAN_20_29') }}>
                        <Typography variant="h4" className="!font-bold">{massagorda.replace('.', ',')}</Typography>
                        <Typography className="!ml-1 !mt-[.9rem]">%</Typography>
                      </Box>
                    )}

                    {data.age >= 30 && data.age <= 39 && isWoman && (
                      <Box className="flex flex-row" style={{ color: getImcColor(massagorda, 'CMG_WOMAN_30_39') }}>
                        <Typography variant="h4" className="!font-bold">{massagorda.replace('.', ',')}</Typography>
                        <Typography className="!ml-1 !mt-[.9rem]">%</Typography>
                      </Box>
                    )}

                    {data.age >= 40 && data.age <= 49 && isWoman && (
                      <Box className="flex flex-row" style={{ color: getImcColor(massagorda, 'CMG_WOMAN_40_49') }}>
                        <Typography variant="h4" className="!font-bold">{massagorda.replace('.', ',')}</Typography>
                        <Typography className="!ml-1 !mt-[.9rem]">%</Typography>
                      </Box>
                    )}

                    {data.age >= 50 && data.age <= 59 && isWoman && (
                      <Box className="flex flex-row" style={{ color: getImcColor(massagorda, 'CMG_WOMAN_50_59') }}>
                        <Typography variant="h4" className="!font-bold">{massagorda.replace('.', ',')}</Typography>
                        <Typography className="!ml-1 !mt-[.9rem]">%</Typography>
                      </Box>
                    )}

                    {data.age > 59 && isWoman && (
                      <Box className="flex flex-row" style={{ color: getImcColor(massagorda, 'CMG_WOMAN_59') }}>
                        <Typography variant="h4" className="!font-bold">{massagorda.replace('.', ',')}</Typography>
                        <Typography className="!ml-1 !mt-[.9rem]">%</Typography>
                      </Box>
                    )}

                    <Box>
                      {data.age < 20 && isAll && (
                        <Typography className={`text-sm rounded-lg px-3 py-2 text-white`} style={{ background: getImcColor(massagorda, 'CMG_ALL_20') }}>
                            {getReviewClassification(massagorda, data.age, data.gender, 'CMG_ALL_20')}
                        </Typography>
                      )}

                      {data.age >= 20 && data.age <= 29 && isAll && (
                        <Typography className={`text-sm rounded-lg px-3 py-2 text-white`} style={{ background: getImcColor(massagorda, 'CMG_ALL_20_29') }}>
                            {getReviewClassification(massagorda, data.age, data.gender, 'CMG_ALL_20_29')}
                        </Typography>
                      )}

                      {data.age >= 30 && data.age <= 39 && isAll && (
                        <Typography className={`text-sm rounded-lg px-3 py-2 text-white`} style={{ background: getImcColor(massagorda, 'CMG_ALL_30_39') }}>
                            {getReviewClassification(massagorda, data.age, data.gender, 'CMG_ALL_30_39')}
                        </Typography>
                      )}

                      {data.age >= 40 && data.age <= 49 && isAll && (
                        <Typography className={`text-sm rounded-lg px-3 py-2 text-white`} style={{ background: getImcColor(massagorda, 'CMG_ALL_40_49') }}>
                            {getReviewClassification(massagorda, data.age, data.gender, 'CMG_ALL_40_49')}
                        </Typography>
                      )}

                      {data.age >= 50 && data.age <= 59 && isAll && (
                        <Typography className={`text-sm rounded-lg px-3 py-2 text-white`} style={{ background: getImcColor(massagorda, 'CMG_ALL_50_59') }}>
                            {getReviewClassification(massagorda, data.age, data.gender, 'CMG_ALL_50_59')}
                        </Typography>
                      )}

                      {data.age > 59 && isAll && (
                        <Typography className={`text-sm rounded-lg px-3 py-2 text-white`} style={{ background: getImcColor(massagorda, 'CMG_ALL_59') }}>
                            {getReviewClassification(massagorda, data.age, data.gender, 'CMG_ALL_59')}
                        </Typography>
                      )}

                      {data.age < 20 && isMan && (
                      <Typography className={`text-sm rounded-lg px-3 py-2 text-white`} style={{ background: getImcColor(massagorda, 'CMG_MAN_20') }}>
                          {getReviewClassification(massagorda, data.age, data.gender, 'CMG_MAN_20')}
                      </Typography>
                      )}

                      {data.age >= 20 && data.age <= 29 && isMan && (
                        <Typography className={`text-sm rounded-lg px-3 py-2 text-white`} style={{ background: getImcColor(massagorda, 'CMG_MAN_20_29') }}>
                            {getReviewClassification(massagorda, data.age, data.gender, 'CMG_MAN_20_29')}
                        </Typography>
                      )}

                      {data.age >= 30 && data.age <= 39 && isMan && (
                        <Typography className={`text-sm rounded-lg px-3 py-2 text-white`} style={{ background: getImcColor(massagorda, 'CMG_MAN_30_39') }}>
                            {getReviewClassification(massagorda, data.age, data.gender, 'CMG_MAN_30_39')}
                        </Typography>
                      )}

                      {data.age >= 40 && data.age <= 49 && isMan && (
                        <Typography className={`text-sm rounded-lg px-3 py-2 text-white`} style={{ background: getImcColor(massagorda, 'CMG_MAN_40_49') }}>
                            {getReviewClassification(massagorda, data.age, data.gender, 'CMG_MAN_40_49')}
                        </Typography>
                      )}

                      {data.age >= 50 && data.age <= 59 && isMan && (
                        <Typography className={`text-sm rounded-lg px-3 py-2 text-white`} style={{ background: getImcColor(massagorda, 'CMG_MAN_50_59') }}>
                            {getReviewClassification(massagorda, data.age, data.gender, 'CMG_MAN_50_59')}
                        </Typography>
                      )}

                      {data.age > 59 && isMan && (
                        <Typography className={`text-sm rounded-lg px-3 py-2 text-white`} style={{ background: getImcColor(massagorda, 'CMG_MAN_59') }}>
                            {getReviewClassification(massagorda, data.age, data.gender, 'CMG_MAN_59')}
                        </Typography>
                      )}

                      {data.age < 20 && isWoman && (
                      <Typography className={`text-sm rounded-lg px-3 py-2 text-white`} style={{ background: getImcColor(massagorda, 'CMG_WOMAN_20') }}>
                          {getReviewClassification(massagorda, data.age, data.gender, 'CMG_WOMAN_20')}
                      </Typography>
                      )}

                      {data.age >= 20 && data.age <= 29 && isWoman && (
                        <Typography className={`text-sm rounded-lg px-3 py-2 text-white`} style={{ background: getImcColor(massagorda, 'CMG_WOMAN_20_29') }}>
                            {getReviewClassification(massagorda, data.age, data.gender, 'CMG_WOMAN_20_29')}
                        </Typography>
                      )}

                      {data.age >= 30 && data.age <= 39 && isWoman && (
                        <Typography className={`text-sm rounded-lg px-3 py-2 text-white`} style={{ background: getImcColor(massagorda, 'CMG_WOMAN_30_39') }}>
                            {getReviewClassification(massagorda, data.age, data.gender, 'CMG_WOMAN_30_39')}
                        </Typography>
                      )}

                      {data.age >= 40 && data.age <= 49 && isWoman && (
                        <Typography className={`text-sm rounded-lg px-3 py-2 text-white`} style={{ background: getImcColor(massagorda, 'CMG_WOMAN_40_49') }}>
                            {getReviewClassification(massagorda, data.age, data.gender, 'CMG_WOMAN_40_49')}
                        </Typography>
                      )}

                      {data.age >= 50 && data.age <= 59 && isWoman && (
                        <Typography className={`text-sm rounded-lg px-3 py-2 text-white`} style={{ background: getImcColor(massagorda, 'CMG_WOMAN_50_59') }}>
                            {getReviewClassification(massagorda, data.age, data.gender, 'CMG_WOMAN_50_59')}
                        </Typography>
                      )}

                      {data.age > 59 && isWoman && (
                        <Typography className={`text-sm rounded-lg px-3 py-2 text-white`} style={{ background: getImcColor(massagorda, 'CMG_WOMAN_59') }}>
                            {getReviewClassification(massagorda, data.age, data.gender, 'CMG_WOMAN_59')}
                        </Typography>
                      )}
                    </Box>
                  </Box>

                  <Box className="w-full mt-5 relative">
                    <Box className="w-full h-4 flex rounded-lg overflow-hidden border border-gray-300">
                      {data.age < 20 && (
                        <>
                          <Box className="bg-[#FFD700] w-[16.7%]"></Box>
                          <Box className="bg-[#FFC107] w-[16.7%]"></Box>
                          <Box className="bg-[#4CAF50] w-[16.7%]"></Box>
                          <Box className="bg-[#FF9800] w-[16.7%]"></Box>
                          <Box className="bg-[#FF5722] w-[16.7%]"></Box>
                          <Box className="bg-[#D32F2F] w-[16.7%]"></Box>
                        </>
                      )}

                      {data.age >= 20 && (
                        <>
                          <Box className="bg-[#224e23] w-[20%]"></Box>
                          <Box className="bg-[#337535] w-[20%]"></Box>
                          <Box className="bg-[#4CAF50] w-[20%]"></Box>
                          <Box className="bg-[#FF9800] w-[20%]"></Box>
                          <Box className="bg-[#FF5722] w-[20%]"></Box>
                        </>
                      )}
                    </Box>

                    {data.age < 20 && isAll && (
                      <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(massagorda, 'CMG_ALL_20') }} />
                    )}

                    {data.age >= 20 && data.age <= 29 && isAll && (
                        <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(massagorda, 'CMG_ALL_20_29') }} />
                    )}

                    {data.age >= 30 && data.age <= 39 && isAll && (
                        <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(massagorda, 'CMG_ALL_30_39') }} />
                    )}

                    {data.age >= 40 && data.age <= 49 && isAll && (
                        <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(massagorda, 'CMG_ALL_40_49') }} />
                    )}

                    {data.age >= 50 && data.age <= 59 && isAll && (
                        <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(massagorda, 'CMG_ALL_50_59') }} />
                    )}

                    {data.age > 59 && isAll && (
                        <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(massagorda, 'CMG_ALL_59') }} />
                    )}

                    {data.age < 20 && isMan && (
                      <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(massagorda, 'CMG_MAN_20') }} />
                    )}

                    {data.age >= 20 && data.age <= 29 && isMan && (
                        <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(massagorda, 'CMG_MAN_20_29') }} />
                    )}

                    {data.age >= 30 && data.age <= 39 && isMan && (
                        <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(massagorda, 'CMG_MAN_30_39') }} />
                    )}

                    {data.age >= 40 && data.age <= 49 && isMan && (
                        <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(massagorda, 'CMG_MAN_40_49') }} />
                    )}

                    {data.age >= 50 && data.age <= 59 && isMan && (
                        <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(massagorda, 'CMG_MAN_50_59') }} />
                    )}

                    {data.age > 59 && isMan && (
                        <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(massagorda, 'CMG_MAN_59') }} />
                    )}

                    {data.age < 20 && isWoman && (
                      <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(massagorda, 'CMG_WOMAN_20') }} />
                    )}

                    {data.age >= 20 && data.age <= 29 && isWoman && (
                        <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(massagorda, 'CMG_WOMAN_20_29') }} />
                    )}

                    {data.age >= 30 && data.age <= 39 && isWoman && (
                        <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(massagorda, 'CMG_WOMAN_30_39') }} />
                    )}

                    {data.age >= 40 && data.age <= 49 && isWoman && (
                        <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(massagorda, 'CMG_WOMAN_40_49') }} />
                    )}

                    {data.age >= 50 && data.age <= 59 && isWoman && (
                        <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(massagorda, 'CMG_WOMAN_50_59') }} />
                    )}

                    {data.age > 59 && isWoman && (
                        <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(massagorda, 'CMG_WOMAN_59') }} />
                    )}
                  </Box>

                  <Box className="w-full flex justify-between mt-2 mb-5 text-xs text-gray-700 relative">
                    {data.age < 20 && isAll && (
                      <>
                        <Typography className="absolute left-[16%]">5</Typography>
                        <Typography className="absolute left-[32%]">16</Typography>
                        <Typography className="absolute right-[48%]">26</Typography>
                        <Typography className="absolute right-[31.9%]">31</Typography>
                        <Typography className="absolute right-[14.6%]">37</Typography>
                      </>
                    )}

                    {data.age >= 20 && data.age <= 29 && isAll && (
                      <>
                        <Typography className="absolute left-[19%]">11</Typography>
                        <Typography className="absolute left-[38.5%]">20</Typography>
                        <Typography className="absolute right-[37.7%]">29</Typography>
                        <Typography className="absolute right-[18.6%]">32</Typography>
                      </>
                    )}

                    {data.age >= 30 && data.age <= 39 && isAll && (
                      <>
                        <Typography className="absolute left-[19%]">12</Typography>
                        <Typography className="absolute left-[38.5%]">21</Typography>
                        <Typography className="absolute right-[37.7%]">30</Typography>
                        <Typography className="absolute right-[18.6%]">33</Typography>
                      </>
                    )}

                    {data.age >= 40 && data.age <= 49 && isAll && (
                      <>
                        <Typography className="absolute left-[19%]">14</Typography>
                        <Typography className="absolute left-[38.5%]">22</Typography>
                        <Typography className="absolute right-[37.7%]">31</Typography>
                        <Typography className="absolute right-[18.6%]">34</Typography>
                      </>
                    )}

                    {data.age >= 50 && data.age <= 59 && isAll && (
                      <>
                        <Typography className="absolute left-[19%]">15</Typography>
                        <Typography className="absolute left-[38.5%]">23</Typography>
                        <Typography className="absolute right-[37.7%]">32</Typography>
                        <Typography className="absolute right-[18.6%]">35</Typography>
                      </>
                    )}

                    {data.age > 59 && isAll && (
                      <>
                        <Typography className="absolute left-[19%]">16</Typography>
                        <Typography className="absolute left-[38.5%]">24</Typography>
                        <Typography className="absolute right-[37.7%]">33</Typography>
                        <Typography className="absolute right-[18.6%]">36</Typography>
                      </>
                    )}

                    {data.age < 20 && isMan && (
                      <>
                        <Typography className="absolute left-[16%]">5</Typography>
                        <Typography className="absolute left-[32%]">11</Typography>
                        <Typography className="absolute right-[48%]">21</Typography>
                        <Typography className="absolute right-[31.9%]">26</Typography>
                        <Typography className="absolute right-[14.6%]">32</Typography>
                      </>
                    )}

                    {data.age >= 20 && data.age <= 29 && isMan && (
                      <>
                        <Typography className="absolute left-[19%]">11</Typography>
                        <Typography className="absolute left-[38.5%]">14</Typography>
                        <Typography className="absolute right-[37.7%]">21</Typography>
                        <Typography className="absolute right-[18.6%]">24</Typography>
                      </>
                    )}

                    {data.age >= 30 && data.age <= 39 && isMan && (
                      <>
                        <Typography className="absolute left-[19%]">12</Typography>
                        <Typography className="absolute left-[38.5%]">15</Typography>
                        <Typography className="absolute right-[37.7%]">22</Typography>
                        <Typography className="absolute right-[18.6%]">25</Typography>
                      </>
                    )}

                    {data.age >= 40 && data.age <= 49 && isMan && (
                      <>
                        <Typography className="absolute left-[19%]">14</Typography>
                        <Typography className="absolute left-[38.5%]">17</Typography>
                        <Typography className="absolute right-[37.7%]">24</Typography>
                        <Typography className="absolute right-[18.6%]">27</Typography>
                      </>
                    )}

                    {data.age >= 50 && data.age <= 59 && isMan && (
                      <>
                        <Typography className="absolute left-[19%]">15</Typography>
                        <Typography className="absolute left-[38.5%]">18</Typography>
                        <Typography className="absolute right-[37.7%]">25</Typography>
                        <Typography className="absolute right-[18.6%]">28</Typography>
                      </>
                    )}

                    {data.age > 59 && isMan && (
                      <>
                        <Typography className="absolute left-[19%]">16</Typography>
                        <Typography className="absolute left-[38.5%]">19</Typography>
                        <Typography className="absolute right-[37.7%]">26</Typography>
                        <Typography className="absolute right-[18.6%]">29</Typography>
                      </>
                    )}

                    {data.age < 20 && isWoman && (
                      <>
                        <Typography className="absolute left-[16%]">12</Typography>
                        <Typography className="absolute left-[32%]">16</Typography>
                        <Typography className="absolute right-[48%]">26</Typography>
                        <Typography className="absolute right-[31.9%]">31</Typography>
                        <Typography className="absolute right-[14.6%]">37</Typography>
                      </>
                    )}

                    {data.age >= 20 && data.age <= 29 && isWoman && (
                      <>
                        <Typography className="absolute left-[19%]">16</Typography>
                        <Typography className="absolute left-[38.5%]">20</Typography>
                        <Typography className="absolute right-[37.7%]">29</Typography>
                        <Typography className="absolute right-[18.6%]">32</Typography>
                      </>
                    )}

                    {data.age >= 30 && data.age <= 39 && isWoman && (
                      <>
                        <Typography className="absolute left-[19%]">17</Typography>
                        <Typography className="absolute left-[38.5%]">21</Typography>
                        <Typography className="absolute right-[37.7%]">30</Typography>
                        <Typography className="absolute right-[18.6%]">33</Typography>
                      </>
                    )}

                    {data.age >= 40 && data.age <= 49 && isWoman && (
                      <>
                        <Typography className="absolute left-[19%]">18</Typography>
                        <Typography className="absolute left-[38.5%]">22</Typography>
                        <Typography className="absolute right-[37.7%]">31</Typography>
                        <Typography className="absolute right-[18.6%]">34</Typography>
                      </>
                    )}

                    {data.age >= 50 && data.age <= 59 && isWoman && (
                      <>
                        <Typography className="absolute left-[19%]">19</Typography>
                        <Typography className="absolute left-[38.5%]">23</Typography>
                        <Typography className="absolute right-[37.7%]">32</Typography>
                        <Typography className="absolute right-[18.6%]">35</Typography>
                      </>
                    )}

                    {data.age > 59 && isWoman && (
                      <>
                        <Typography className="absolute left-[19%]">20</Typography>
                        <Typography className="absolute left-[38.5%]">24</Typography>
                        <Typography className="absolute right-[37.7%]">33</Typography>
                        <Typography className="absolute right-[18.6%]">36</Typography>
                      </>
                    )}
                  </Box>
                </Box>
              )}
              {data.waterBody > 0 && data.sumFolds > 0 && data.ageBody > 0 && data.basalMetabolic > 0 && (
                <Box className='flex flex-col rounded-xl w-full p-5 mt-5 border border-[#EAECF0]'>
                  <Box className="flex flex-row">
                    <Typography className="!font-light !text-[1.3rem]">Análise Corporal</Typography>
                  </Box>
                  <Divider className="!my-5" />
                  <Box className='w-full flex flex-row justify-between'>
                    <Box className='flex flex-row items-center text-[1.5rem]'>
                      <Box className='w-3 h-3 bg-[#2e96ff] rounded-sm'></Box>
                      <Box className='text-[.8rem] uppercase font-normal ml-2'>Água Corporal ({data.waterBody.replace('.', ',')}%)</Box>
                    </Box>
                    <Box className='flex flex-row items-center text-[1.5rem]'>
                      <Box className='w-3 h-3 bg-[#4CAF50] rounded-sm'></Box>
                      <Box className='text-[.8rem] font-normal ml-2'><span className='uppercase'>Idade Corporal</span> ({data.ageBody} anos)</Box>
                    </Box>
                    <Box className='flex flex-row items-center text-[1.5rem]'>
                      <Box className='w-3 h-3 bg-[#673AB7] rounded-sm'></Box>
                      <Box className='text-[.8rem] font-normal ml-2'><span className='uppercase'>Taxa Metabólica Basal</span> ({data.basalMetabolic.replace('.', ',')}kcal)</Box>
                    </Box>
                  </Box>
                </Box>
              )}
              {data.imc >= 1 && (
                <Box
                  className={`flex flex-col rounded-xl w-full p-5 mt-5 border border-[#EAECF0] ${(data.waterBody > 0 && data.sumFolds > 0 && data.ageBody > 0 && data.basalMetabolic > 0 && data?.response?.filter((item: ResponseItem) => item.category === 'MEASURES').length > 5) || massagorda > 0 && data.sumFolds > 0 && data.residualMass > 0 && data.boneMass > 0 && data.muscleMass > 0 || data?.response?.filter((item: ResponseItem) => item.category === 'MEASURES').length > 5 ? 'break-before' : ''
                  }`}
                >
                  <Box className="flex flex-row">
                    <Typography className="!font-light !text-[1.3rem]">Índice de Massa Corporal (IMC)</Typography>
                  </Box>
                  <Divider className="!my-5" />
                  <Box className='flex flex-row justify-between items-center'>
                    {data.age >= 20 && data.age <= 64 && (isAll || isMan || isWoman) && (
                      <Box className="flex flex-row" style={{ color: getImcColor(data.imc, 'IMC_ALL') }}>
                        <Typography variant="h4" className="!font-bold">{data.imc.replace('.', ',')}</Typography>
                        <Typography className="!ml-1 !mt-[.9rem]">kg/m²</Typography>
                      </Box>
                    )}

                    {data.age >= 65 && (isAll || isMan || isWoman) && (
                      <Box className="flex flex-row" style={{ color: getImcColor(data.imc, 'IMC_ELDERLY') }}>
                        <Typography variant="h4" className="!font-bold">{data.imc.replace('.', ',')}</Typography>
                        <Typography className="!ml-1 !mt-[.9rem]">kg/m²</Typography>
                      </Box>
                    )}

                    {data.age <= 19 && isMan && (
                      <Box className="flex flex-row" style={{ color: getImcColor(data.imc, 'IMC_MAN') }}>
                        <Typography variant="h4" className="!font-bold">{data.imc.replace('.', ',')}</Typography>
                        <Typography className="!ml-1 !mt-[.9rem]">kg/m²</Typography>
                      </Box>
                    )}

                    {data.age <= 19 && isWoman && (
                      <Box className="flex flex-row" style={{ color: getImcColor(data.imc, 'IMC_WOMAN') }}>
                        <Typography variant="h4" className="!font-bold">{data.imc.replace('.', ',')}</Typography>
                        <Typography className="!ml-1 !mt-[.9rem]">kg/m²</Typography>
                      </Box>
                    )}

                    <Box>
                      {data.age >= 20 && data.age <= 64 && (isAll || isMan || isWoman) && (
                        <Typography className={`text-sm rounded-lg px-3 py-2 text-white`} style={{ background: getImcColor(data.imc, 'IMC_ALL') }}>
                            {getReviewClassification(data.imc, data.age, data.gender, 'IMC_IAC')}
                        </Typography>
                      )}

                      {data.age >= 65 && (isAll || isMan || isWoman) && (
                        <Typography className={`text-sm rounded-lg px-3 py-2 text-white`} style={{ background: getImcColor(data.imc, 'IMC_ELDERLY') }}>
                          {getReviewClassification(data.imc, data.age, data.gender, 'IMC_IAC')}
                        </Typography>
                      )}

                      {data.age <= 19 && isMan && (
                        <Typography className={`text-sm rounded-lg px-3 py-2 text-white`} style={{ background: getImcColor(data.imc, 'IMC_MAN') }}>
                          {getReviewClassification(data.imc, data.age, data.gender, 'IMC_IAC')}
                        </Typography>
                      )}

                      {data.age <= 19 && isWoman && (
                        <Typography className={`text-sm rounded-lg px-3 py-2 text-white`} style={{ background: getImcColor(data.imc, 'IMC_WOMAN') }}>
                          {getReviewClassification(data.imc, data.age, data.gender, 'IMC_IAC')}
                        </Typography>
                      )}
                    </Box>
                  </Box>

                  <Box className="w-full mt-5 relative">
                    <Box className="w-full h-4 flex rounded-lg overflow-hidden border border-gray-300">
                      {data.age >= 20 && data.age <= 64 && (isAll || isMan || isWoman) && (
                        <>
                          <Box className="bg-[#FFD700] w-[10%]"></Box> {/* Muito abaixo do peso */}
                          <Box className="bg-[#FFC107] w-[10%]"></Box> {/* Abaixo do peso */}
                          <Box className="bg-[#4CAF50] w-[27%]"></Box> {/* Peso normal */}
                          <Box className="bg-[#FF9800] w-[15%]"></Box> {/* Sobrepeso */}
                          <Box className="bg-[#FF5722] w-[15%]"></Box> {/* Obesidade Grau I */}
                          <Box className="bg-[#D32F2F] w-[10%]"></Box> {/* Obesidade Grau II */}
                          <Box className="bg-[#B71C1C] flex-1"></Box>  {/* Obesidade Mórbida */}
                        </>
                      )}

                      {data.age >= 65 && (isAll || isMan || isWoman) && (
                        <>
                          <Box className="bg-[#FFC107] w-[30%]"></Box> {/* Abaixo do peso */}
                          <Box className="bg-[#4CAF50] w-[34%]"></Box> {/* Peso normal */}
                          <Box className="bg-[#FF9800] w-[37.4%]"></Box> {/* Sobrepeso */}
                        </>
                      )}

                      {data.age <= 19 && isMan && (
                        <>
                          <Box className="bg-[#FFC107] w-[33.4%]"></Box> {/* Abaixo do peso */}
                          <Box className="bg-[#4CAF50] w-[33.4%]"></Box> {/* Peso normal */}
                          <Box className="bg-[#FF9800] w-[33.4%]"></Box> {/* Sobrepeso */}
                        </>
                      )}

                      {data.age <= 19 && isWoman && (
                        <>
                          <Box className="bg-[#FFC107] w-[33.4%]"></Box> {/* Abaixo do peso */}
                          <Box className="bg-[#4CAF50] w-[33.4%]"></Box> {/* Peso normal */}
                          <Box className="bg-[#FF9800] w-[33.4%]"></Box> {/* Sobrepeso */}
                        </>
                      )}
                    </Box>

                    {data.age >= 20 && data.age <= 64 && (isAll || isMan || isWoman) && (
                      <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(data.imc, 'IMC_ALL') }} />
                    )}

                    {data.age >= 65 && (isAll || isMan || isWoman) && (
                      <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(data.imc, 'IMC_ELDERLY') }} />
                    )}

                    {data.age <= 19 && isMan && (
                      <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(data.imc, 'IMC_MAN') }} />
                    )}

                    {data.age <= 19 && isWoman && (
                      <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(data.imc, 'IMC_WOMAN') }} />
                    )}
                  </Box>

                  <Box className="w-full flex justify-between mt-2 mb-5 text-xs text-gray-700 relative">
                    {data.age >= 20 && data.age <= 64 && (isAll || isMan || isWoman) && (
                      <>
                        <Typography className="absolute left-[8.5%]">17,0</Typography>
                        <Typography className="absolute left-[18.5%]">18,5</Typography>
                        <Typography className="absolute left-[44.7%]">25,0</Typography>
                        <Typography className="absolute left-[59.9%]">30,0</Typography>
                        <Typography className="absolute left-[74.6%]">35,0</Typography>
                        <Typography className="absolute right-[10.6%]">40,0</Typography>
                      </>
                    )}

                    {data.age >= 65 && (isAll || isMan || isWoman) && (
                      <>
                        <Typography className="absolute left-[27.5%]">22,0</Typography>
                        <Typography className="absolute left-[61%]">27,0</Typography>
                      </>
                    )}

                    {data.age <= 19 && isMan && (
                      <>
                        <Typography className="absolute left-[31%]">14,42</Typography>
                        <Typography className="absolute left-[63%]">30,66</Typography>
                      </>
                    )}

                    {data.age <= 19 && isWoman && (
                      <>
                        <Typography className="absolute left-[31%]">14,23</Typography>
                        <Typography className="absolute left-[63%]">30,72</Typography>
                      </>
                    )}
                  </Box>
                </Box>
              )}
              {data.iac >= 1 && (
                <Box className='flex flex-col rounded-xl w-full p-5 mt-5 border border-[#EAECF0]'>
                  <Box className="flex flex-row">
                    <Typography className="!font-light !text-[1.3rem]">Índice de Adiposidade Corporal (IAC)</Typography>
                  </Box>
                  <Divider className="!my-5" />
                  <Box className='flex flex-row justify-between items-center'>
                    {isAll && (
                      <Box className="flex flex-row" style={{ color: getImcColor(data.iac, 'IAC_ALL') }}>
                        <Typography variant="h4" className="!font-bold">{data.iac.replace('.', ',')}</Typography>
                        <Typography className="!ml-1 !mt-[.9rem]">%</Typography>
                      </Box>
                    )}

                    {isMan && (
                      <Box className="flex flex-row" style={{ color: getImcColor(data.iac, 'IAC_MAN') }}>
                        <Typography variant="h4" className="!font-bold">{data.iac.replace('.', ',')}</Typography>
                        <Typography className="!ml-1 !mt-[.9rem]">%</Typography>
                      </Box>
                    )}

                    {isWoman && (
                      <Box className="flex flex-row" style={{ color: getImcColor(data.iac, 'IAC_WOMAN') }}>
                        <Typography variant="h4" className="!font-bold">{data.iac.replace('.', ',')}</Typography>
                        <Typography className="!ml-1 !mt-[.9rem]">%</Typography>
                      </Box>
                    )}

                    <Box>
                      {isAll && (
                        <Typography className={`text-sm rounded-lg px-3 py-2 text-white`} style={{ background: getImcColor(data.iac, 'IAC_ALL') }}>
                            {getReviewClassification(data.iac, 2, data.gender, 'IMC_IAC')}
                        </Typography>
                      )}

                      {isMan && (
                        <Typography className={`text-sm rounded-lg px-3 py-2 text-white`} style={{ background: getImcColor(data.imc, 'IAC_MAN') }}>
                          {getReviewClassification(data.imc, 0, data.gender, 'IMC_IAC')}
                        </Typography>
                      )}

                      {isWoman && (
                        <Typography className={`text-sm rounded-lg px-3 py-2 text-white`} style={{ background: getImcColor(data.imc, 'IAC_WOMAN') }}>
                          {getReviewClassification(data.imc, 1, data.gender, 'IMC_IAC')}
                        </Typography>
                      )}
                    </Box>
                  </Box>

                  <Box className="w-full mt-5 relative">
                    <Box className="w-full h-4 flex rounded-lg overflow-hidden border border-gray-300">
                      <Box className="bg-[#FFC107] w-[25%]"></Box> {/* Abaixo do peso */}
                      <Box className="bg-[#4CAF50] w-[25%]"></Box> {/* Peso normal */}
                      <Box className="bg-[#FF9800] w-[25%]"></Box> {/* Sobrepeso */}
                      <Box className="bg-[#FF5722] w-[25%]"></Box> {/* Obesidade Grau I */}
                    </Box>

                    {isAll && (
                      <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(data.iac, 'IAC_ALL') }} />
                    )}

                    {isMan && (
                      <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(data.iac, 'IAC_MAN') }} />
                    )}

                    {isWoman && (
                      <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(data.iac, 'IAC_WOMAN') }} />
                    )}
                  </Box>

                  <Box className="w-full flex justify-between mt-2 mb-5 text-xs text-gray-700 relative">
                    {isAll && (
                      <>
                        <Typography className="absolute left-[24.5%]">8</Typography>
                        <Typography className="absolute left-[48.5%]">32</Typography>
                        <Typography className="absolute right-[23.5%]">38</Typography>
                      </>
                    )}

                    {isMan && (
                      <>
                        <Typography className="absolute left-[24.5%]">8</Typography>
                        <Typography className="absolute left-[48.5%]">20</Typography>
                        <Typography className="absolute right-[23.5%]">25</Typography>
                      </>
                    )}

                    {isWoman && (
                      <>
                        <Typography className="absolute left-[24.5%]">21</Typography>
                        <Typography className="absolute left-[48.5%]">33</Typography>
                        <Typography className="absolute right-[23.5%]">38</Typography>
                      </>
                    )}
                  </Box>
                </Box>
              )}
              {data.rcq > 0 && data.age >= 20 && data.age <= 69 && (
                <Box className='flex flex-col rounded-xl w-full p-5 mt-5 border border-[#EAECF0]'>
                  <Box className="flex flex-row">
                    <Typography className="!font-light !text-[1.3rem]">Relação de Cintura x Quadril (RCQ)</Typography>
                  </Box>
                  <Divider className="!my-5" />
                  <Box className='flex flex-row justify-between items-center'>
                    {data.age >= 20 && data.age <= 69 && isAll && (
                      <Box className="flex flex-row" style={{ color: getImcColor(data.rcq, 'RCQ_ALL') }}>
                        <Typography variant="h4" className="!font-bold">{Number(data.rcq).toFixed(2).replace('.', ',')}</Typography>
                      </Box>
                    )}

                    {data.age >= 20 && data.age <= 29 && isMan && (
                      <Box className="flex flex-row" style={{ color: getImcColor(data.rcq, 'RCQ_MAN_20_29') }}>
                        <Typography variant="h4" className="!font-bold">{Number(data.rcq).toFixed(2).replace('.', ',')}</Typography>
                        <Typography className="!ml-1 !mt-[.9rem]">%</Typography>
                      </Box>
                    )}

                    {data.age >= 30 && data.age <= 39 && isMan && (
                      <Box className="flex flex-row" style={{ color: getImcColor(data.rcq, 'RCQ_MAN_30_39') }}>
                        <Typography variant="h4" className="!font-bold">{Number(data.rcq).toFixed(2).replace('.', ',')}</Typography>
                        <Typography className="!ml-1 !mt-[.9rem]">%</Typography>
                      </Box>
                    )}

                    {data.age >= 40 && data.age <= 49 && isMan && (
                      <Box className="flex flex-row" style={{ color: getImcColor(data.rcq, 'RCQ_MAN_40_49') }}>
                        <Typography variant="h4" className="!font-bold">{Number(data.rcq).toFixed(2).replace('.', ',')}</Typography>
                        <Typography className="!ml-1 !mt-[.9rem]">%</Typography>
                      </Box>
                    )}

                    {data.age >= 50 && data.age <= 59 && isMan && (
                      <Box className="flex flex-row" style={{ color: getImcColor(data.rcq, 'RCQ_MAN_50_59') }}>
                        <Typography variant="h4" className="!font-bold">{Number(data.rcq).toFixed(2).replace('.', ',')}</Typography>
                        <Typography className="!ml-1 !mt-[.9rem]">%</Typography>
                      </Box>
                    )}

                    {data.age >= 60 && data.age <= 69 && isMan && (
                      <Box className="flex flex-row" style={{ color: getImcColor(data.rcq, 'RCQ_MAN_60_69') }}>
                        <Typography variant="h4" className="!font-bold">{Number(data.rcq).toFixed(2).replace('.', ',')}</Typography>
                        <Typography className="!ml-1 !mt-[.9rem]">%</Typography>
                      </Box>
                    )}

                    {data.age >= 20 && data.age <= 29 && isWoman && (
                      <Box className="flex flex-row" style={{ color: getImcColor(data.rcq, 'RCQ_WOMAN_20_29') }}>
                        <Typography variant="h4" className="!font-bold">{Number(data.rcq).toFixed(2).replace('.', ',')}</Typography>
                        <Typography className="!ml-1 !mt-[.9rem]">%</Typography>
                      </Box>
                    )}

                    {data.age >= 30 && data.age <= 39 && isWoman && (
                      <Box className="flex flex-row" style={{ color: getImcColor(data.rcq, 'RCQ_WOMAN_30_39') }}>
                        <Typography variant="h4" className="!font-bold">{Number(data.rcq).toFixed(2).replace('.', ',')}</Typography>
                        <Typography className="!ml-1 !mt-[.9rem]">%</Typography>
                      </Box>
                    )}

                    {data.age >= 40 && data.age <= 49 && isWoman && (
                      <Box className="flex flex-row" style={{ color: getImcColor(data.rcq, 'RCQ_WOMAN_40_49') }}>
                        <Typography variant="h4" className="!font-bold">{Number(data.rcq).toFixed(2).replace('.', ',')}</Typography>
                        <Typography className="!ml-1 !mt-[.9rem]">%</Typography>
                      </Box>
                    )}

                    {data.age >= 50 && data.age <= 59 && isWoman && (
                      <Box className="flex flex-row" style={{ color: getImcColor(data.rcq, 'RCQ_WOMAN_50_59') }}>
                        <Typography variant="h4" className="!font-bold">{Number(data.rcq).toFixed(2).replace('.', ',')}</Typography>
                        <Typography className="!ml-1 !mt-[.9rem]">%</Typography>
                      </Box>
                    )}

                    {data.age >= 60 && data.age <= 69 && isWoman && (
                      <Box className="flex flex-row" style={{ color: getImcColor(data.rcq, 'RCQ_WOMAN_60_69') }}>
                        <Typography variant="h4" className="!font-bold">{Number(data.rcq).toFixed(2).replace('.', ',')}</Typography>
                        <Typography className="!ml-1 !mt-[.9rem]">%</Typography>
                      </Box>
                    )}

                    <Box>
                      {data.age >= 20 && data.age <= 69 && isAll && (
                        <Typography className={`text-sm rounded-lg px-3 py-2 text-white`} style={{ background: getImcColor(data.rcq, 'RCQ_ALL') }}>
                          {getReviewClassification(data.rcq, data.age, data.gender, 'RCQ_ALL')}
                        </Typography>
                      )}

                      {data.age >= 20 && data.age <= 29 && isMan && (
                        <Typography className={`text-sm rounded-lg px-3 py-2 text-white`} style={{ background: getImcColor(data.rcq, 'RCQ_MAN_20_29') }}>
                          {getReviewClassification(data.rcq, data.age, data.gender, 'RCQ_MAN_20_29')}
                        </Typography>
                      )}

                      {data.age >= 30 && data.age <= 39 && isMan && (
                        <Typography className={`text-sm rounded-lg px-3 py-2 text-white`} style={{ background: getImcColor(data.rcq, 'RCQ_MAN_30_39') }}>
                          {getReviewClassification(data.rcq, data.age, data.gender, 'RCQ_MAN_30_39')}
                        </Typography>
                      )}

                      {data.age >= 40 && data.age <= 49 && isMan && (
                        <Typography className={`text-sm rounded-lg px-3 py-2 text-white`} style={{ background: getImcColor(data.rcq, 'RCQ_MAN_40_49') }}>
                          {getReviewClassification(data.rcq, data.age, data.gender, 'RCQ_MAN_40_49')}
                        </Typography>
                      )}

                      {data.age >= 50 && data.age <= 59 && isMan && (
                        <Typography className={`text-sm rounded-lg px-3 py-2 text-white`} style={{ background: getImcColor(data.rcq, 'RCQ_MAN_50_59') }}>
                          {getReviewClassification(data.rcq, data.age, data.gender, 'RCQ_MAN_50_59')}
                        </Typography>
                      )}

                      {data.age >= 60 && data.age <= 69 && isMan && (
                        <Typography className={`text-sm rounded-lg px-3 py-2 text-white`} style={{ background: getImcColor(data.rcq, 'RCQ_MAN_60_69') }}>
                          {getReviewClassification(data.rcq, data.age, data.gender, 'RCQ_MAN_60_69')}
                        </Typography>
                      )}

                      {data.age >= 20 && data.age <= 29 && isWoman && (
                        <Typography className={`text-sm rounded-lg px-3 py-2 text-white`} style={{ background: getImcColor(data.rcq, 'RCQ_WOMAN_20_29') }}>
                          {getReviewClassification(data.rcq, data.age, data.gender, 'RCQ_WOMAN_20_29')}
                        </Typography>
                      )}

                      {data.age >= 30 && data.age <= 39 && isWoman && (
                        <Typography className={`text-sm rounded-lg px-3 py-2 text-white`} style={{ background: getImcColor(data.rcq, 'RCQ_WOMAN_30_39') }}>
                          {getReviewClassification(data.rcq, data.age, data.gender, 'RCQ_WOMAN_30_39')}
                        </Typography>
                      )}

                      {data.age >= 40 && data.age <= 49 && isWoman && (
                        <Typography className={`text-sm rounded-lg px-3 py-2 text-white`} style={{ background: getImcColor(data.rcq, 'RCQ_WOMAN_40_49') }}>
                          {getReviewClassification(data.rcq, data.age, data.gender, 'RCQ_WOMAN_40_49')}
                        </Typography>
                      )}

                      {data.age >= 50 && data.age <= 59 && isWoman && (
                        <Typography className={`text-sm rounded-lg px-3 py-2 text-white`} style={{ background: getImcColor(data.rcq, 'RCQ_WOMAN_50_59') }}>
                          {getReviewClassification(data.rcq, data.age, data.gender, 'RCQ_WOMAN_50_59')}
                        </Typography>
                      )}

                      {data.age >= 60 && data.age <= 69 && isWoman && (
                        <Typography className={`text-sm rounded-lg px-3 py-2 text-white`} style={{ background: getImcColor(data.rcq, 'RCQ_WOMAN_60_69') }}>
                          {getReviewClassification(data.rcq, data.age, data.gender, 'RCQ_WOMAN_60_69')}
                        </Typography>
                      )}
                    </Box>
                  </Box>

                  <Box className="w-full mt-5 relative">
                    <Box className="w-full h-4 flex rounded-lg overflow-hidden border border-gray-300">
                      <Box className="bg-[#4CAF50] w-[25%]"></Box>
                      <Box className="bg-[#FF9800] w-[25%]"></Box>
                      <Box className="bg-[#FF5722] w-[25%]"></Box>
                      <Box className="bg-[#D32F2F] w-[25%]"></Box>
                    </Box>

                    {data.age >= 20 && data.age <= 69 && isAll && (
                      <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(data.rcq, 'RCQ_ALL') }} />
                    )}

                    {data.age >= 20 && data.age <= 29 && isMan && (
                      <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(data.rcq, 'RCQ_MAN_20_29') }} />
                    )}

                    {data.age >= 30 && data.age <= 39 && isMan && (
                      <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(data.rcq, 'RCQ_MAN_30_39') }} />
                    )}

                    {data.age >= 40 && data.age <= 49 && isMan && (
                      <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(data.rcq, 'RCQ_MAN_40_49') }} />
                    )}

                    {data.age >= 50 && data.age <= 59 && isMan && (
                      <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(data.rcq, 'RCQ_MAN_50_59') }} />
                    )}

                    {data.age >= 60 && data.age <= 69 && isMan && (
                      <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(data.rcq, 'RCQ_MAN_60_69') }} />
                    )}

                    {data.age >= 20 && data.age <= 29 && isWoman && (
                      <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(data.rcq, 'RCQ_WOMAN_20_29') }} />
                    )}

                    {data.age >= 30 && data.age <= 39 && isWoman && (
                      <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(data.rcq, 'RCQ_WOMAN_30_39') }} />
                    )}

                    {data.age >= 40 && data.age <= 49 && isWoman && (
                      <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(data.rcq, 'RCQ_WOMAN_40_49') }} />
                    )}

                    {data.age >= 50 && data.age <= 59 && isWoman && (
                      <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(data.rcq, 'RCQ_WOMAN_50_59') }} />
                    )}

                    {data.age >= 60 && data.age <= 69 && isWoman && (
                      <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(data.rcq, 'RCQ_WOMAN_60_69') }} />
                    )}
                  </Box>

                  <Box className="w-full flex justify-between mt-2 mb-5 text-xs text-gray-700 relative">
                    {data.age >= 20 && data.age <= 69 && isAll && (
                      <>
                        <Typography className="absolute left-[23%]">0,71</Typography>
                        <Typography className="absolute left-[48%]">0,96</Typography>
                        <Typography className="absolute right-[22.6%]">1,03</Typography>
                      </>
                    )}

                    {data.age >= 20 && data.age <= 29 && isMan && (
                      <>
                        <Typography className="absolute left-[23%]">0,83</Typography>
                        <Typography className="absolute left-[48%]">0,89</Typography>
                        <Typography className="absolute right-[22.6%]">0,94</Typography>
                      </>
                    )}

                    {data.age >= 30 && data.age <= 39 && isMan && (
                      <>
                        <Typography className="absolute left-[23%]">0,84</Typography>
                        <Typography className="absolute left-[48%]">0,92</Typography>
                        <Typography className="absolute right-[22.6%]">0,96</Typography>
                      </>
                    )}

                    {data.age >= 40 && data.age <= 49 && isMan && (
                      <>
                        <Typography className="absolute left-[23%]">0,88</Typography>
                        <Typography className="absolute left-[48%]">0,96</Typography>
                        <Typography className="absolute right-[22.6%]">1,00</Typography>
                      </>
                    )}

                    {data.age >= 50 && data.age <= 59 && isMan && (
                      <>
                        <Typography className="absolute left-[23%]">0,90</Typography>
                        <Typography className="absolute left-[48%]">0,97</Typography>
                        <Typography className="absolute right-[22.6%]">1,02</Typography>
                      </>
                    )}

                    {data.age >= 60 && data.age <= 69 && isMan && (
                      <>
                        <Typography className="absolute left-[23%]">0,91</Typography>
                        <Typography className="absolute left-[48%]">0,99</Typography>
                        <Typography className="absolute right-[22.6%]">1,03</Typography>
                      </>
                    )}

                    {data.age >= 20 && data.age <= 29 && isWoman && (
                      <>
                        <Typography className="absolute left-[23%]">0,71</Typography>
                        <Typography className="absolute left-[48%]">0,78</Typography>
                        <Typography className="absolute right-[22.6%]">0,82</Typography>
                      </>
                    )}

                    {data.age >= 30 && data.age <= 39 && isWoman && (
                      <>
                        <Typography className="absolute left-[23%]">0,72</Typography>
                        <Typography className="absolute left-[48%]">0,79</Typography>
                        <Typography className="absolute right-[22.6%]">0,84</Typography>
                      </>
                    )}

                    {data.age >= 40 && data.age <= 49 && isWoman && (
                      <>
                        <Typography className="absolute left-[23%]">0,73</Typography>
                        <Typography className="absolute left-[48%]">0,80</Typography>
                        <Typography className="absolute right-[22.6%]">0,87</Typography>
                      </>
                    )}

                    {data.age >= 50 && data.age <= 59 && isWoman && (
                      <>
                        <Typography className="absolute left-[23%]">0,74</Typography>
                        <Typography className="absolute left-[48%]">0,82</Typography>
                        <Typography className="absolute right-[22.6%]">0,88</Typography>
                      </>
                    )}

                    {data.age >= 60 && data.age <= 69 && isWoman && (
                      <>
                        <Typography className="absolute left-[23%]">0,76</Typography>
                        <Typography className="absolute left-[48%]">0,84</Typography>
                        <Typography className="absolute right-[22.6%]">0,90</Typography>
                      </>
                    )}
                  </Box>
                </Box>
              )}
              {data.vo > 0 && data.age >= 20 && data.age <= 69 && (
                <Box className='flex flex-col rounded-xl w-full p-5 mt-5 border border-[#EAECF0]'>
                  <Box className="flex flex-row justify-between items-center">
                    <Typography className="!font-light !text-[1.3rem] flex flex-row items-center">Cardiorrespiratória <span className='text-[.9rem] mt-1 ml-2'>(Consumo Máximo de Oxigênio)</span></Typography>
                    <Typography className="!font-light !text-[.9rem]">Protocolo: {protocolCardioLabel}</Typography>
                  </Box>
                  <Divider className="!my-5" />
                  <Box className='flex flex-row justify-between items-center'>
                    {data.age >= 20 && data.age <= 29 && isAll && (
                      <Box className="flex flex-row" style={{ color: getImcColor(data.vo, 'CR_ALL_20_29') }}>
                        <Typography variant="h4" className="!font-bold">{Number(data.vo).toFixed(2).replace('.', ',')}</Typography>
                        <Typography className="!ml-1 !mt-[.9rem]">ml/kg.min</Typography>
                      </Box>
                    )}

                    {data.age >= 30 && data.age <= 39 && isAll && (
                      <Box className="flex flex-row" style={{ color: getImcColor(data.vo, 'CR_ALL_30_39') }}>
                        <Typography variant="h4" className="!font-bold">{Number(data.vo).toFixed(2).replace('.', ',')}</Typography>
                        <Typography className="!ml-1 !mt-[.9rem]">ml/kg.min</Typography>
                      </Box>
                    )}

                    {data.age >= 40 && data.age <= 49 && isAll && (
                      <Box className="flex flex-row" style={{ color: getImcColor(data.vo, 'CR_ALL_40_49') }}>
                        <Typography variant="h4" className="!font-bold">{Number(data.vo).toFixed(2).replace('.', ',')}</Typography>
                        <Typography className="!ml-1 !mt-[.9rem]">ml/kg.min</Typography>
                      </Box>
                    )}

                    {data.age >= 50 && data.age <= 59 && isAll && (
                      <Box className="flex flex-row" style={{ color: getImcColor(data.vo, 'CR_ALL_50_59') }}>
                        <Typography variant="h4" className="!font-bold">{Number(data.vo).toFixed(2).replace('.', ',')}</Typography>
                        <Typography className="!ml-1 !mt-[.9rem]">ml/kg.min</Typography>
                      </Box>
                    )}

                    {data.age >= 60 && data.age <= 69 && isAll && (
                      <Box className="flex flex-row" style={{ color: getImcColor(data.vo, 'CR_ALL_60_69') }}>
                        <Typography variant="h4" className="!font-bold">{Number(data.vo).toFixed(2).replace('.', ',')}</Typography>
                        <Typography className="!ml-1 !mt-[.9rem]">ml/kg.min</Typography>
                      </Box>
                    )}

                    {data.age >= 20 && data.age <= 29 && isMan && (
                      <Box className="flex flex-row" style={{ color: getImcColor(data.vo, 'CR_MAN_20_29') }}>
                        <Typography variant="h4" className="!font-bold">{Number(data.vo).toFixed(2).replace('.', ',')}</Typography>
                        <Typography className="!ml-1 !mt-[.9rem]">ml/kg.min</Typography>
                      </Box>
                    )}

                    {data.age >= 30 && data.age <= 39 && isMan && (
                      <Box className="flex flex-row" style={{ color: getImcColor(data.vo, 'CR_MAN_30_39') }}>
                        <Typography variant="h4" className="!font-bold">{Number(data.vo).toFixed(2).replace('.', ',')}</Typography>
                        <Typography className="!ml-1 !mt-[.9rem]">ml/kg.min</Typography>
                      </Box>
                    )}

                    {data.age >= 40 && data.age <= 49 && isMan && (
                      <Box className="flex flex-row" style={{ color: getImcColor(data.vo, 'CR_MAN_40_49') }}>
                        <Typography variant="h4" className="!font-bold">{Number(data.vo).toFixed(2).replace('.', ',')}</Typography>
                        <Typography className="!ml-1 !mt-[.9rem]">ml/kg.min</Typography>
                      </Box>
                    )}

                    {data.age >= 50 && data.age <= 59 && isMan && (
                      <Box className="flex flex-row" style={{ color: getImcColor(data.vo, 'CR_MAN_50_59') }}>
                        <Typography variant="h4" className="!font-bold">{Number(data.vo).toFixed(2).replace('.', ',')}</Typography>
                        <Typography className="!ml-1 !mt-[.9rem]">ml/kg.min</Typography>
                      </Box>
                    )}

                    {data.age >= 60 && data.age <= 69 && isMan && (
                      <Box className="flex flex-row" style={{ color: getImcColor(data.vo, 'CR_MAN_60_69') }}>
                        <Typography variant="h4" className="!font-bold">{Number(data.vo).toFixed(2).replace('.', ',')}</Typography>
                        <Typography className="!ml-1 !mt-[.9rem]">ml/kg.min</Typography>
                      </Box>
                    )}

                    {data.age >= 20 && data.age <= 29 && isWoman && (
                      <Box className="flex flex-row" style={{ color: getImcColor(data.vo, 'CR_WOMAN_20_29') }}>
                        <Typography variant="h4" className="!font-bold">{Number(data.vo).toFixed(2).replace('.', ',')}</Typography>
                        <Typography className="!ml-1 !mt-[.9rem]">ml/kg.min</Typography>
                      </Box>
                    )}

                    {data.age >= 30 && data.age <= 39 && isWoman && (
                      <Box className="flex flex-row" style={{ color: getImcColor(data.vo, 'CR_WOMAN_30_39') }}>
                        <Typography variant="h4" className="!font-bold">{Number(data.vo).toFixed(2).replace('.', ',')}</Typography>
                        <Typography className="!ml-1 !mt-[.9rem]">ml/kg.min</Typography>
                      </Box>
                    )}

                    {data.age >= 40 && data.age <= 49 && isWoman && (
                      <Box className="flex flex-row" style={{ color: getImcColor(data.vo, 'CR_WOMAN_40_49') }}>
                        <Typography variant="h4" className="!font-bold">{Number(data.vo).toFixed(2).replace('.', ',')}</Typography>
                        <Typography className="!ml-1 !mt-[.9rem]">ml/kg.min</Typography>
                      </Box>
                    )}

                    {data.age >= 50 && data.age <= 59 && isWoman && (
                      <Box className="flex flex-row" style={{ color: getImcColor(data.vo, 'CR_WOMAN_50_59') }}>
                        <Typography variant="h4" className="!font-bold">{Number(data.vo).toFixed(2).replace('.', ',')}</Typography>
                        <Typography className="!ml-1 !mt-[.9rem]">ml/kg.min</Typography>
                      </Box>
                    )}

                    {data.age >= 60 && data.age <= 69 && isWoman && (
                      <Box className="flex flex-row" style={{ color: getImcColor(data.vo, 'CR_WOMAN_60_69') }}>
                        <Typography variant="h4" className="!font-bold">{Number(data.vo).toFixed(2).replace('.', ',')}</Typography>
                        <Typography className="!ml-1 !mt-[.9rem]">ml/kg.min</Typography>
                      </Box>
                    )}

                    <Box>
                      {data.age >= 20 && data.age <= 29 && isAll && (
                        <Typography className={`text-sm rounded-lg px-3 py-2 text-white`} style={{ background: getImcColor(data.vo, 'CR_ALL_20_29') }}>
                          {getReviewClassification(data.vo, data.age, data.gender, 'CR_ALL_20_29')}
                        </Typography>
                      )}

                      {data.age >= 30 && data.age <= 39 && isAll && (
                        <Typography className={`text-sm rounded-lg px-3 py-2 text-white`} style={{ background: getImcColor(data.vo, 'CR_ALL_30_39') }}>
                          {getReviewClassification(data.vo, data.age, data.gender, 'CR_ALL_30_39')}
                        </Typography>
                      )}

                      {data.age >= 40 && data.age <= 49 && isAll && (
                        <Typography className={`text-sm rounded-lg px-3 py-2 text-white`} style={{ background: getImcColor(data.vo, 'CR_ALL_40_49') }}>
                          {getReviewClassification(data.vo, data.age, data.gender, 'CR_ALL_40_49')}
                        </Typography>
                      )}

                      {data.age >= 50 && data.age <= 59 && isAll && (
                        <Typography className={`text-sm rounded-lg px-3 py-2 text-white`} style={{ background: getImcColor(data.vo, 'CR_ALL_50_59') }}>
                          {getReviewClassification(data.vo, data.age, data.gender, 'CR_ALL_50_59')}
                        </Typography>
                      )}

                      {data.age >= 60 && data.age <= 69 && isAll && (
                        <Typography className={`text-sm rounded-lg px-3 py-2 text-white`} style={{ background: getImcColor(data.vo, 'CR_ALL_60_69') }}>
                          {getReviewClassification(data.vo, data.age, data.gender, 'CR_ALL_60_69')}
                        </Typography>
                      )}

                      {data.age >= 20 && data.age <= 29 && isMan && (
                        <Typography className={`text-sm rounded-lg px-3 py-2 text-white`} style={{ background: getImcColor(data.vo, 'CR_MAN_20_29') }}>
                          {getReviewClassification(data.vo, data.age, data.gender, 'CR_MAN_20_29')}
                        </Typography>
                      )}

                      {data.age >= 30 && data.age <= 39 && isMan && (
                        <Typography className={`text-sm rounded-lg px-3 py-2 text-white`} style={{ background: getImcColor(data.vo, 'CR_MAN_30_39') }}>
                          {getReviewClassification(data.vo, data.age, data.gender, 'CR_MAN_30_39')}
                        </Typography>
                      )}

                      {data.age >= 40 && data.age <= 49 && isMan && (
                        <Typography className={`text-sm rounded-lg px-3 py-2 text-white`} style={{ background: getImcColor(data.vo, 'CR_MAN_40_49') }}>
                          {getReviewClassification(data.vo, data.age, data.gender, 'CR_MAN_40_49')}
                        </Typography>
                      )}

                      {data.age >= 50 && data.age <= 59 && isMan && (
                        <Typography className={`text-sm rounded-lg px-3 py-2 text-white`} style={{ background: getImcColor(data.vo, 'CR_MAN_50_59') }}>
                          {getReviewClassification(data.vo, data.age, data.gender, 'CR_MAN_50_59')}
                        </Typography>
                      )}

                      {data.age >= 60 && data.age <= 69 && isMan && (
                        <Typography className={`text-sm rounded-lg px-3 py-2 text-white`} style={{ background: getImcColor(data.vo, 'CR_MAN_60_69') }}>
                          {getReviewClassification(data.vo, data.age, data.gender, 'CR_MAN_60_69')}
                        </Typography>
                      )}

                      {data.age >= 20 && data.age <= 29 && isWoman && (
                        <Typography className={`text-sm rounded-lg px-3 py-2 text-white`} style={{ background: getImcColor(data.vo, 'CR_WOMAN_20_29') }}>
                          {getReviewClassification(data.vo, data.age, data.gender, 'CR_WOMAN_20_29')}
                        </Typography>
                      )}

                      {data.age >= 30 && data.age <= 39 && isWoman && (
                        <Typography className={`text-sm rounded-lg px-3 py-2 text-white`} style={{ background: getImcColor(data.vo, 'CR_WOMAN_30_39') }}>
                          {getReviewClassification(data.vo, data.age, data.gender, 'CR_WOMAN_30_39')}
                        </Typography>
                      )}

                      {data.age >= 40 && data.age <= 49 && isWoman && (
                        <Typography className={`text-sm rounded-lg px-3 py-2 text-white`} style={{ background: getImcColor(data.vo, 'CR_WOMAN_40_49') }}>
                          {getReviewClassification(data.vo, data.age, data.gender, 'CR_WOMAN_40_49')}
                        </Typography>
                      )}

                      {data.age >= 50 && data.age <= 59 && isWoman && (
                        <Typography className={`text-sm rounded-lg px-3 py-2 text-white`} style={{ background: getImcColor(data.vo, 'CR_WOMAN_50_59') }}>
                          {getReviewClassification(data.vo, data.age, data.gender, 'CR_WOMAN_50_59')}
                        </Typography>
                      )}

                      {data.age >= 60 && data.age <= 69 && isWoman && (
                        <Typography className={`text-sm rounded-lg px-3 py-2 text-white`} style={{ background: getImcColor(data.vo, 'CR_WOMAN_60_69') }}>
                          {getReviewClassification(data.vo, data.age, data.gender, 'CR_WOMAN_60_69')}
                        </Typography>
                      )}
                    </Box>
                  </Box>

                  <Box className="w-full mt-5 relative">
                    <Box className="w-full h-4 flex rounded-lg overflow-hidden border border-gray-300">
                      <Box className="bg-[#FF5722] w-[20%]"></Box>
                      <Box className="bg-[#FF9800] w-[20%]"></Box>
                      <Box className="bg-[#4CAF50] w-[20%]"></Box>
                      <Box className="bg-[#337535] w-[20%]"></Box>
                      <Box className="bg-[#224e23] w-[20%]"></Box>
                    </Box>

                    {data.age >= 20 && data.age <= 29 && isAll && (
                      <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(data.vo, 'CR_ALL_20_29') }} />
                    )}

                    {data.age >= 30 && data.age <= 39 && isAll && (
                      <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(data.vo, 'CR_ALL_30_39') }} />
                    )}

                    {data.age >= 40 && data.age <= 49 && isAll && (
                      <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(data.vo, 'CR_ALL_40_49') }} />
                    )}

                    {data.age >= 50 && data.age <= 59 && isAll && (
                      <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(data.vo, 'CR_ALL_50_59') }} />
                    )}

                    {data.age >= 60 && data.age <= 69 && isAll && (
                      <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(data.vo, 'CR_ALL_60_69') }} />
                    )}

                    {data.age >= 20 && data.age <= 29 && isMan && (
                      <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(data.vo, 'CR_MAN_20_29') }} />
                    )}

                    {data.age >= 30 && data.age <= 39 && isMan && (
                      <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(data.vo, 'CR_MAN_30_39') }} />
                    )}

                    {data.age >= 40 && data.age <= 49 && isMan && (
                      <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(data.vo, 'CR_MAN_40_49') }} />
                    )}

                    {data.age >= 50 && data.age <= 59 && isMan && (
                      <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(data.vo, 'CR_MAN_50_59') }} />
                    )}

                    {data.age >= 60 && data.age <= 69 && isMan && (
                      <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(data.vo, 'CR_MAN_60_69') }} />
                    )}

                    {data.age >= 20 && data.age <= 29 && isWoman && (
                      <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(data.vo, 'CR_WOMAN_20_29') }} />
                    )}

                    {data.age >= 30 && data.age <= 39 && isWoman && (
                      <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(data.vo, 'CR_WOMAN_30_39') }} />
                    )}

                    {data.age >= 40 && data.age <= 49 && isWoman && (
                      <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(data.vo, 'CR_WOMAN_40_49') }} />
                    )}

                    {data.age >= 50 && data.age <= 59 && isWoman && (
                      <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(data.vo, 'CR_WOMAN_50_59') }} />
                    )}

                    {data.age >= 60 && data.age <= 69 && isWoman && (
                      <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(data.vo, 'CR_WOMAN_60_69') }} />
                    )}
                  </Box>

                  <Box className="w-full flex justify-between mt-2 mb-5 text-xs text-gray-700 relative">
                    {data.age >= 20 && data.age <= 29 && isAll && (
                      <>
                        <Typography className="absolute left-[18.5%]">24</Typography>
                        <Typography className="absolute left-[38.5%]">34</Typography>
                        <Typography className="absolute right-[38%]">43</Typography>
                        <Typography className="absolute right-[18.2%]">53</Typography>
                      </>
                    )}

                    {data.age >= 30 && data.age <= 39 && isAll && (
                      <>
                        <Typography className="absolute left-[18.5%]">20</Typography>
                        <Typography className="absolute left-[38.5%]">31</Typography>
                        <Typography className="absolute right-[38%]">39</Typography>
                        <Typography className="absolute right-[18.2%]">49</Typography>
                      </>
                    )}

                    {data.age >= 40 && data.age <= 49 && isAll && (
                      <>
                        <Typography className="absolute left-[18.5%]">17</Typography>
                        <Typography className="absolute left-[38.5%]">27</Typography>
                        <Typography className="absolute right-[38%]">36</Typography>
                        <Typography className="absolute right-[18.2%]">45</Typography>
                      </>
                    )}

                    {data.age >= 50 && data.age <= 59 && isAll && (
                      <>
                        <Typography className="absolute left-[18.5%]">15</Typography>
                        <Typography className="absolute left-[38.5%]">25</Typography>
                        <Typography className="absolute right-[38%]">34</Typography>
                        <Typography className="absolute right-[18.2%]">43</Typography>
                      </>
                    )}

                    {data.age >= 60 && data.age <= 69 && isAll && (
                      <>
                        <Typography className="absolute left-[18.5%]">13</Typography>
                        <Typography className="absolute left-[38.5%]">23</Typography>
                        <Typography className="absolute right-[38%]">31</Typography>
                        <Typography className="absolute right-[18.2%]">41</Typography>
                      </>
                    )}

                    {data.age >= 20 && data.age <= 29 && isMan && (
                      <>
                        <Typography className="absolute left-[18.5%]">25</Typography>
                        <Typography className="absolute left-[38.5%]">34</Typography>
                        <Typography className="absolute right-[38%]">43</Typography>
                        <Typography className="absolute right-[18.2%]">53</Typography>
                      </>
                    )}

                    {data.age >= 30 && data.age <= 39 && isMan && (
                      <>
                        <Typography className="absolute left-[18.5%]">23</Typography>
                        <Typography className="absolute left-[38.5%]">31</Typography>
                        <Typography className="absolute right-[38%]">39</Typography>
                        <Typography className="absolute right-[18.2%]">49</Typography>
                      </>
                    )}

                    {data.age >= 40 && data.age <= 49 && isMan && (
                      <>
                        <Typography className="absolute left-[18.5%]">20</Typography>
                        <Typography className="absolute left-[38.5%]">27</Typography>
                        <Typography className="absolute right-[38%]">36</Typography>
                        <Typography className="absolute right-[18.2%]">45</Typography>
                      </>
                    )}

                    {data.age >= 50 && data.age <= 59 && isMan && (
                      <>
                        <Typography className="absolute left-[18.5%]">18</Typography>
                        <Typography className="absolute left-[38.5%]">25</Typography>
                        <Typography className="absolute right-[38%]">34</Typography>
                        <Typography className="absolute right-[18.2%]">43</Typography>
                      </>
                    )}

                    {data.age >= 60 && data.age <= 69 && isMan && (
                      <>
                        <Typography className="absolute left-[18.5%]">16</Typography>
                        <Typography className="absolute left-[38.5%]">23</Typography>
                        <Typography className="absolute right-[38%]">31</Typography>
                        <Typography className="absolute right-[18.2%]">41</Typography>
                      </>
                    )}

                    {data.age >= 20 && data.age <= 29 && isWoman && (
                      <>
                        <Typography className="absolute left-[18.5%]">24</Typography>
                        <Typography className="absolute left-[38.5%]">31</Typography>
                        <Typography className="absolute right-[38%]">38</Typography>
                        <Typography className="absolute right-[18.2%]">49</Typography>
                      </>
                    )}

                    {data.age >= 30 && data.age <= 39 && isWoman && (
                      <>
                        <Typography className="absolute left-[18.5%]">20</Typography>
                        <Typography className="absolute left-[38.5%]">28</Typography>
                        <Typography className="absolute right-[38%]">34</Typography>
                        <Typography className="absolute right-[18.2%]">45</Typography>
                      </>
                    )}

                    {data.age >= 40 && data.age <= 49 && isWoman && (
                      <>
                        <Typography className="absolute left-[18.5%]">17</Typography>
                        <Typography className="absolute left-[38.5%]">24</Typography>
                        <Typography className="absolute right-[38%]">31</Typography>
                        <Typography className="absolute right-[18.2%]">42</Typography>
                      </>
                    )}

                    {data.age >= 50 && data.age <= 59 && isWoman && (
                      <>
                        <Typography className="absolute left-[18.5%]">15</Typography>
                        <Typography className="absolute left-[38.5%]">21</Typography>
                        <Typography className="absolute right-[38%]">28</Typography>
                        <Typography className="absolute right-[18.2%]">38</Typography>
                      </>
                    )}

                    {data.age >= 60 && data.age <= 69 && isWoman && (
                      <>
                        <Typography className="absolute left-[18.5%]">13</Typography>
                        <Typography className="absolute left-[38.5%]">18</Typography>
                        <Typography className="absolute right-[38%]">24</Typography>
                        <Typography className="absolute right-[18.2%]">35</Typography>
                      </>
                    )}
                  </Box>
                </Box>
              )}
              {flexionValue && data.age >= 20 && data.age <= 69 && (
                <Box
                  className={`flex flex-col rounded-xl w-full p-5 mt-5 border border-[#EAECF0] ${data.vo > 0 && data.age >= 20 && data.age <= 69 ? 'break-before' : ''
                  }`}
                >
                  <Box className="flex flex-row justify-between items-center">
                    <Typography className="!font-light !text-[1.3rem]">Índice de Flexão de Braços (IFB)</Typography>
                  </Box>
                  <Divider className="!my-5" />
                  <Box className='flex flex-row justify-between items-center'>
                    {data.age >= 20 && data.age <= 29 && isAll && (
                      <Box className="flex flex-row" style={{ color: getImcColor(flexionValue, 'FB_ALL_20_29') }}>
                        <Typography variant="h4" className="!font-bold">{flexionValue}</Typography>
                        <Typography className="!ml-1 !mt-[.9rem]">repetições</Typography>
                      </Box>
                    )}

                    {data.age >= 30 && data.age <= 39 && isAll && (
                      <Box className="flex flex-row" style={{ color: getImcColor(flexionValue, 'FB_ALL_30_39') }}>
                        <Typography variant="h4" className="!font-bold">{flexionValue}</Typography>
                        <Typography className="!ml-1 !mt-[.9rem]">repetições</Typography>
                      </Box>
                    )}

                    {data.age >= 40 && data.age <= 49 && isAll && (
                      <Box className="flex flex-row" style={{ color: getImcColor(flexionValue, 'FB_ALL_40_49') }}>
                        <Typography variant="h4" className="!font-bold">{flexionValue}</Typography>
                        <Typography className="!ml-1 !mt-[.9rem]">repetições</Typography>
                      </Box>
                    )}

                    {data.age >= 50 && data.age <= 59 && isAll && (
                      <Box className="flex flex-row" style={{ color: getImcColor(flexionValue, 'FB_ALL_50_59') }}>
                        <Typography variant="h4" className="!font-bold">{flexionValue}</Typography>
                        <Typography className="!ml-1 !mt-[.9rem]">repetições</Typography>
                      </Box>
                    )}

                    {data.age >= 60 && data.age <= 69 && isAll && (
                      <Box className="flex flex-row" style={{ color: getImcColor(flexionValue, 'FB_ALL_60_69') }}>
                        <Typography variant="h4" className="!font-bold">{flexionValue}</Typography>
                        <Typography className="!ml-1 !mt-[.9rem]">repetições</Typography>
                      </Box>
                    )}

                    {data.age >= 20 && data.age <= 29 && isMan && (
                      <Box className="flex flex-row" style={{ color: getImcColor(flexionValue, 'FB_MAN_20_29') }}>
                        <Typography variant="h4" className="!font-bold">{flexionValue}</Typography>
                        <Typography className="!ml-1 !mt-[.9rem]">repetições</Typography>
                      </Box>
                    )}

                    {data.age >= 30 && data.age <= 39 && isMan && (
                      <Box className="flex flex-row" style={{ color: getImcColor(flexionValue, 'FB_MAN_30_39') }}>
                        <Typography variant="h4" className="!font-bold">{flexionValue}</Typography>
                        <Typography className="!ml-1 !mt-[.9rem]">repetições</Typography>
                      </Box>
                    )}

                    {data.age >= 40 && data.age <= 49 && isMan && (
                      <Box className="flex flex-row" style={{ color: getImcColor(flexionValue, 'FB_MAN_40_49') }}>
                        <Typography variant="h4" className="!font-bold">{flexionValue}</Typography>
                        <Typography className="!ml-1 !mt-[.9rem]">repetições</Typography>
                      </Box>
                    )}

                    {data.age >= 50 && data.age <= 59 && isMan && (
                      <Box className="flex flex-row" style={{ color: getImcColor(flexionValue, 'FB_MAN_50_59') }}>
                        <Typography variant="h4" className="!font-bold">{flexionValue}</Typography>
                        <Typography className="!ml-1 !mt-[.9rem]">repetições</Typography>
                      </Box>
                    )}

                    {data.age >= 60 && data.age <= 69 && isMan && (
                      <Box className="flex flex-row" style={{ color: getImcColor(flexionValue, 'FB_MAN_60_69') }}>
                        <Typography variant="h4" className="!font-bold">{flexionValue}</Typography>
                        <Typography className="!ml-1 !mt-[.9rem]">repetições</Typography>
                      </Box>
                    )}

                    {data.age >= 20 && data.age <= 29 && isWoman && (
                      <Box className="flex flex-row" style={{ color: getImcColor(flexionValue, 'FB_WOMAN_20_29') }}>
                        <Typography variant="h4" className="!font-bold">{flexionValue}</Typography>
                        <Typography className="!ml-1 !mt-[.9rem]">repetições</Typography>
                      </Box>
                    )}

                    {data.age >= 30 && data.age <= 39 && isWoman && (
                      <Box className="flex flex-row" style={{ color: getImcColor(flexionValue, 'FB_WOMAN_30_39') }}>
                        <Typography variant="h4" className="!font-bold">{flexionValue}</Typography>
                        <Typography className="!ml-1 !mt-[.9rem]">repetições</Typography>
                      </Box>
                    )}

                    {data.age >= 40 && data.age <= 49 && isWoman && (
                      <Box className="flex flex-row" style={{ color: getImcColor(flexionValue, 'FB_WOMAN_40_49') }}>
                        <Typography variant="h4" className="!font-bold">{flexionValue}</Typography>
                        <Typography className="!ml-1 !mt-[.9rem]">repetições</Typography>
                      </Box>
                    )}

                    {data.age >= 50 && data.age <= 59 && isWoman && (
                      <Box className="flex flex-row" style={{ color: getImcColor(flexionValue, 'FB_WOMAN_50_59') }}>
                        <Typography variant="h4" className="!font-bold">{flexionValue}</Typography>
                        <Typography className="!ml-1 !mt-[.9rem]">repetições</Typography>
                      </Box>
                    )}

                    {data.age >= 60 && data.age <= 69 && isWoman && (
                      <Box className="flex flex-row" style={{ color: getImcColor(flexionValue, 'FB_WOMAN_60_69') }}>
                        <Typography variant="h4" className="!font-bold">{flexionValue}</Typography>
                        <Typography className="!ml-1 !mt-[.9rem]">repetições</Typography>
                      </Box>
                    )}

                    <Box>
                      {data.age >= 20 && data.age <= 29 && isAll && (
                        <Typography className={`text-sm rounded-lg px-3 py-2 text-white`} style={{ background: getImcColor(flexionValue, 'FB_ALL_20_29') }}>
                          {getReviewClassification(flexionValue, data.age, data.gender, 'FB_ALL_20_29')}
                        </Typography>
                      )}

                      {data.age >= 30 && data.age <= 39 && isAll && (
                        <Typography className={`text-sm rounded-lg px-3 py-2 text-white`} style={{ background: getImcColor(flexionValue, 'FB_ALL_30_39') }}>
                          {getReviewClassification(flexionValue, data.age, data.gender, 'FB_ALL_30_39')}
                        </Typography>
                      )}

                      {data.age >= 40 && data.age <= 49 && isAll && (
                        <Typography className={`text-sm rounded-lg px-3 py-2 text-white`} style={{ background: getImcColor(flexionValue, 'FB_ALL_40_49') }}>
                          {getReviewClassification(flexionValue, data.age, data.gender, 'FB_ALL_40_49')}
                        </Typography>
                      )}

                      {data.age >= 50 && data.age <= 59 && isAll && (
                        <Typography className={`text-sm rounded-lg px-3 py-2 text-white`} style={{ background: getImcColor(flexionValue, 'FB_ALL_50_59') }}>
                          {getReviewClassification(flexionValue, data.age, data.gender, 'FB_ALL_50_59')}
                        </Typography>
                      )}

                      {data.age >= 60 && data.age <= 69 && isAll && (
                        <Typography className={`text-sm rounded-lg px-3 py-2 text-white`} style={{ background: getImcColor(flexionValue, 'FB_ALL_60_69') }}>
                          {getReviewClassification(flexionValue, data.age, data.gender, 'FB_ALL_60_69')}
                        </Typography>
                      )}

                      {data.age >= 20 && data.age <= 29 && isMan && (
                        <Typography className={`text-sm rounded-lg px-3 py-2 text-white`} style={{ background: getImcColor(flexionValue, 'FB_MAN_20_29') }}>
                          {getReviewClassification(flexionValue, data.age, data.gender, 'FB_MAN_20_29')}
                        </Typography>
                      )}

                      {data.age >= 30 && data.age <= 39 && isMan && (
                        <Typography className={`text-sm rounded-lg px-3 py-2 text-white`} style={{ background: getImcColor(flexionValue, 'FB_MAN_30_39') }}>
                          {getReviewClassification(flexionValue, data.age, data.gender, 'FB_MAN_30_39')}
                        </Typography>
                      )}

                      {data.age >= 40 && data.age <= 49 && isMan && (
                        <Typography className={`text-sm rounded-lg px-3 py-2 text-white`} style={{ background: getImcColor(flexionValue, 'FB_MAN_40_49') }}>
                          {getReviewClassification(flexionValue, data.age, data.gender, 'FB_MAN_40_49')}
                        </Typography>
                      )}

                      {data.age >= 50 && data.age <= 59 && isMan && (
                        <Typography className={`text-sm rounded-lg px-3 py-2 text-white`} style={{ background: getImcColor(flexionValue, 'FB_MAN_50_59') }}>
                          {getReviewClassification(flexionValue, data.age, data.gender, 'FB_MAN_50_59')}
                        </Typography>
                      )}

                      {data.age >= 60 && data.age <= 69 && isMan && (
                        <Typography className={`text-sm rounded-lg px-3 py-2 text-white`} style={{ background: getImcColor(flexionValue, 'FB_MAN_60_69') }}>
                          {getReviewClassification(flexionValue, data.age, data.gender, 'FB_MAN_60_69')}
                        </Typography>
                      )}

                      {data.age >= 20 && data.age <= 29 && isWoman && (
                        <Typography className={`text-sm rounded-lg px-3 py-2 text-white`} style={{ background: getImcColor(flexionValue, 'FB_WOMAN_20_29') }}>
                          {getReviewClassification(flexionValue, data.age, data.gender, 'FB_WOMAN_20_29')}
                        </Typography>
                      )}

                      {data.age >= 30 && data.age <= 39 && isWoman && (
                        <Typography className={`text-sm rounded-lg px-3 py-2 text-white`} style={{ background: getImcColor(flexionValue, 'FB_WOMAN_30_39') }}>
                          {getReviewClassification(flexionValue, data.age, data.gender, 'FB_WOMAN_30_39')}
                        </Typography>
                      )}

                      {data.age >= 40 && data.age <= 49 && isWoman && (
                        <Typography className={`text-sm rounded-lg px-3 py-2 text-white`} style={{ background: getImcColor(flexionValue, 'FB_WOMAN_40_49') }}>
                          {getReviewClassification(flexionValue, data.age, data.gender, 'FB_WOMAN_40_49')}
                        </Typography>
                      )}

                      {data.age >= 50 && data.age <= 59 && isWoman && (
                        <Typography className={`text-sm rounded-lg px-3 py-2 text-white`} style={{ background: getImcColor(flexionValue, 'FB_WOMAN_50_59') }}>
                          {getReviewClassification(flexionValue, data.age, data.gender, 'FB_WOMAN_50_59')}
                        </Typography>
                      )}

                      {data.age >= 60 && data.age <= 69 && isWoman && (
                        <Typography className={`text-sm rounded-lg px-3 py-2 text-white`} style={{ background: getImcColor(flexionValue, 'FB_WOMAN_60_69') }}>
                          {getReviewClassification(flexionValue, data.age, data.gender, 'FB_WOMAN_60_69')}
                        </Typography>
                      )}
                    </Box>
                  </Box>

                  <Box className="w-full mt-5 relative">
                    <Box className="w-full h-4 flex rounded-lg overflow-hidden border border-gray-300">
                      <Box className="bg-[#FF5722] w-[20%]"></Box>
                      <Box className="bg-[#FF9800] w-[20%]"></Box>
                      <Box className="bg-[#4CAF50] w-[20%]"></Box>
                      <Box className="bg-[#337535] w-[20%]"></Box>
                      <Box className="bg-[#224e23] w-[20%]"></Box>
                    </Box>

                    {data.age >= 20 && data.age <= 29 && isAll && (
                      <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(flexionValue, 'FB_ALL_20_29') }} />
                    )}

                    {data.age >= 30 && data.age <= 39 && isAll && (
                      <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(flexionValue, 'FB_ALL_30_39') }} />
                    )}

                    {data.age >= 40 && data.age <= 49 && isAll && (
                      <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(flexionValue, 'FB_ALL_40_49') }} />
                    )}

                    {data.age >= 50 && data.age <= 59 && isAll && (
                      <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(flexionValue, 'FB_ALL_50_59') }} />
                    )}

                    {data.age >= 60 && data.age <= 69 && isAll && (
                      <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(flexionValue, 'FB_ALL_60_69') }} />
                    )}

                    {data.age >= 20 && data.age <= 29 && isMan && (
                      <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(flexionValue, 'FB_MAN_20_29') }} />
                    )}

                    {data.age >= 30 && data.age <= 39 && isMan && (
                      <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(flexionValue, 'FB_MAN_30_39') }} />
                    )}

                    {data.age >= 40 && data.age <= 49 && isMan && (
                      <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(flexionValue, 'FB_MAN_40_49') }} />
                    )}

                    {data.age >= 50 && data.age <= 59 && isMan && (
                      <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(flexionValue, 'FB_MAN_50_59') }} />
                    )}

                    {data.age >= 60 && data.age <= 69 && isMan && (
                      <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(flexionValue, 'FB_MAN_60_69') }} />
                    )}

                    {data.age >= 20 && data.age <= 29 && isWoman && (
                      <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(flexionValue, 'FB_WOMAN_20_29') }} />
                    )}

                    {data.age >= 30 && data.age <= 39 && isWoman && (
                      <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(flexionValue, 'FB_WOMAN_30_39') }} />
                    )}

                    {data.age >= 40 && data.age <= 49 && isWoman && (
                      <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(flexionValue, 'FB_WOMAN_40_49') }} />
                    )}

                    {data.age >= 50 && data.age <= 59 && isWoman && (
                      <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(flexionValue, 'FB_WOMAN_50_59') }} />
                    )}

                    {data.age >= 60 && data.age <= 69 && isWoman && (
                      <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(flexionValue, 'FB_WOMAN_60_69') }} />
                    )}
                  </Box>

                  <Box className="w-full flex justify-between mt-2 mb-5 text-xs text-gray-700 relative">
                    {data.age >= 20 && data.age <= 29 && isAll && (
                      <>
                        <Typography className="absolute left-[19%]">10</Typography>
                        <Typography className="absolute left-[38.5%]">22</Typography>
                        <Typography className="absolute right-[38%]">29</Typography>
                        <Typography className="absolute right-[18.2%]">36</Typography>
                      </>
                    )}

                    {data.age >= 30 && data.age <= 39 && isAll && (
                      <>
                        <Typography className="absolute left-[19.5%]">7</Typography>
                        <Typography className="absolute left-[38.5%]">17</Typography>
                        <Typography className="absolute right-[38%]">22</Typography>
                        <Typography className="absolute right-[18.2%]">30</Typography>
                      </>
                    )}

                    {data.age >= 40 && data.age <= 49 && isAll && (
                      <>
                        <Typography className="absolute left-[19.5%]">5</Typography>
                        <Typography className="absolute left-[38.5%]">13</Typography>
                        <Typography className="absolute right-[38%]">17</Typography>
                        <Typography className="absolute right-[18.2%]">25</Typography>
                      </>
                    )}

                    {data.age >= 50 && data.age <= 59 && isAll && (
                      <>
                        <Typography className="absolute left-[19.5%]">2</Typography>
                        <Typography className="absolute left-[38.5%]">10</Typography>
                        <Typography className="absolute right-[38%]">13</Typography>
                        <Typography className="absolute right-[18.2%]">21</Typography>
                      </>
                    )}

                    {data.age >= 60 && data.age <= 69 && isAll && (
                      <>
                        <Typography className="absolute left-[19.5%]">2</Typography>
                        <Typography className="absolute left-[39.5%]">8</Typography>
                        <Typography className="absolute right-[38%]">11</Typography>
                        <Typography className="absolute right-[18.2%]">18</Typography>
                      </>
                    )}

                    {data.age >= 20 && data.age <= 29 && isMan && (
                      <>
                        <Typography className="absolute left-[19.5%]">17</Typography>
                        <Typography className="absolute left-[38.5%]">22</Typography>
                        <Typography className="absolute right-[38%]">29</Typography>
                        <Typography className="absolute right-[18.2%]">36</Typography>
                      </>
                    )}

                    {data.age >= 30 && data.age <= 39 && isMan && (
                      <>
                        <Typography className="absolute left-[19%]">12</Typography>
                        <Typography className="absolute left-[38.5%]">17</Typography>
                        <Typography className="absolute right-[38%]">22</Typography>
                        <Typography className="absolute right-[18.2%]">30</Typography>
                      </>
                    )}

                    {data.age >= 40 && data.age <= 49 && isMan && (
                      <>
                        <Typography className="absolute left-[19%]">20</Typography>
                        <Typography className="absolute left-[38.5%]">27</Typography>
                        <Typography className="absolute right-[38%]">36</Typography>
                        <Typography className="absolute right-[18.2%]">45</Typography>
                      </>
                    )}

                    {data.age >= 50 && data.age <= 59 && isMan && (
                      <>
                        <Typography className="absolute left-[19%]">10</Typography>
                        <Typography className="absolute left-[38.5%]">13</Typography>
                        <Typography className="absolute right-[38%]">17</Typography>
                        <Typography className="absolute right-[18.2%]">25</Typography>
                      </>
                    )}

                    {data.age >= 60 && data.age <= 69 && isMan && (
                      <>
                        <Typography className="absolute left-[19.5%]">5</Typography>
                        <Typography className="absolute left-[39.5%]">8</Typography>
                        <Typography className="absolute right-[38%]">11</Typography>
                        <Typography className="absolute right-[18.2%]">18</Typography>
                      </>
                    )}

                    {data.age >= 20 && data.age <= 29 && isWoman && (
                      <>
                        <Typography className="absolute left-[19%]">10</Typography>
                        <Typography className="absolute left-[38.5%]">15</Typography>
                        <Typography className="absolute right-[38%]">21</Typography>
                        <Typography className="absolute right-[18.2%]">30</Typography>
                      </>
                    )}

                    {data.age >= 30 && data.age <= 39 && isWoman && (
                      <>
                        <Typography className="absolute left-[19.5%]">7</Typography>
                        <Typography className="absolute left-[38.5%]">13</Typography>
                        <Typography className="absolute right-[38%]">20</Typography>
                        <Typography className="absolute right-[18.2%]">27</Typography>
                      </>
                    )}

                    {data.age >= 40 && data.age <= 49 && isWoman && (
                      <>
                        <Typography className="absolute left-[19.5%]">5</Typography>
                        <Typography className="absolute left-[38.5%]">11</Typography>
                        <Typography className="absolute right-[38%]">15</Typography>
                        <Typography className="absolute right-[18.2%]">24</Typography>
                      </>
                    )}

                    {data.age >= 50 && data.age <= 59 && isWoman && (
                      <>
                        <Typography className="absolute left-[19.5%]">2</Typography>
                        <Typography className="absolute left-[39.5%]">7</Typography>
                        <Typography className="absolute right-[38%]">11</Typography>
                        <Typography className="absolute right-[18.2%]">21</Typography>
                      </>
                    )}

                    {data.age >= 60 && data.age <= 69 && isWoman && (
                      <>
                        <Typography className="absolute left-[19.5%]">2</Typography>
                        <Typography className="absolute left-[39.5%]">5</Typography>
                        <Typography className="absolute right-[38%]">12</Typography>
                        <Typography className="absolute right-[18.2%]">17</Typography>
                      </>
                    )}
                  </Box>
                </Box>
              )}
              {abdominalValue && data.age >= 15 && data.age <= 69 && (
                <Box className='flex flex-col rounded-xl w-full p-5 mt-5 border border-[#EAECF0]'>
                  <Box className="flex flex-row justify-between items-center">
                    <Typography className="!font-light !text-[1.3rem]">Índice de Resistência Abdominal (IRA)</Typography>
                  </Box>
                  <Divider className="!my-5" />
                  <Box className='flex flex-row justify-between items-center'>
                    {data.age >= 15 && data.age <= 19 && isAll && (
                      <Box className="flex flex-row" style={{ color: getImcColor(abdominalValue, 'RA_ALL_15_19') }}>
                        <Typography variant="h4" className="!font-bold">{abdominalValue}</Typography>
                        <Typography className="!ml-1 !mt-[.9rem]">repetições</Typography>
                      </Box>
                    )}

                    {data.age >= 20 && data.age <= 29 && isAll && (
                      <Box className="flex flex-row" style={{ color: getImcColor(abdominalValue, 'RA_ALL_20_29') }}>
                        <Typography variant="h4" className="!font-bold">{abdominalValue}</Typography>
                        <Typography className="!ml-1 !mt-[.9rem]">repetições</Typography>
                      </Box>
                    )}

                    {data.age >= 30 && data.age <= 39 && isAll && (
                      <Box className="flex flex-row" style={{ color: getImcColor(abdominalValue, 'RA_ALL_30_39') }}>
                        <Typography variant="h4" className="!font-bold">{abdominalValue}</Typography>
                        <Typography className="!ml-1 !mt-[.9rem]">repetições</Typography>
                      </Box>
                    )}

                    {data.age >= 40 && data.age <= 49 && isAll && (
                      <Box className="flex flex-row" style={{ color: getImcColor(abdominalValue, 'RA_ALL_40_49') }}>
                        <Typography variant="h4" className="!font-bold">{abdominalValue}</Typography>
                        <Typography className="!ml-1 !mt-[.9rem]">repetições</Typography>
                      </Box>
                    )}

                    {data.age >= 50 && data.age <= 59 && isAll && (
                      <Box className="flex flex-row" style={{ color: getImcColor(abdominalValue, 'RA_ALL_50_59') }}>
                        <Typography variant="h4" className="!font-bold">{abdominalValue}</Typography>
                        <Typography className="!ml-1 !mt-[.9rem]">repetições</Typography>
                      </Box>
                    )}

                    {data.age >= 60 && data.age <= 69 && isAll && (
                      <Box className="flex flex-row" style={{ color: getImcColor(abdominalValue, 'RA_ALL_60_69') }}>
                        <Typography variant="h4" className="!font-bold">{abdominalValue}</Typography>
                        <Typography className="!ml-1 !mt-[.9rem]">repetições</Typography>
                      </Box>
                    )}

                    {data.age >= 15 && data.age <= 19 && isMan && (
                      <Box className="flex flex-row" style={{ color: getImcColor(abdominalValue, 'RA_MAN_15_19') }}>
                        <Typography variant="h4" className="!font-bold">{abdominalValue}</Typography>
                        <Typography className="!ml-1 !mt-[.9rem]">repetições</Typography>
                      </Box>
                    )}

                    {data.age >= 20 && data.age <= 29 && isMan && (
                      <Box className="flex flex-row" style={{ color: getImcColor(abdominalValue, 'RA_MAN_20_29') }}>
                        <Typography variant="h4" className="!font-bold">{abdominalValue}</Typography>
                        <Typography className="!ml-1 !mt-[.9rem]">repetições</Typography>
                      </Box>
                    )}

                    {data.age >= 30 && data.age <= 39 && isMan && (
                      <Box className="flex flex-row" style={{ color: getImcColor(abdominalValue, 'RA_MAN_30_39') }}>
                        <Typography variant="h4" className="!font-bold">{abdominalValue}</Typography>
                        <Typography className="!ml-1 !mt-[.9rem]">repetições</Typography>
                      </Box>
                    )}

                    {data.age >= 40 && data.age <= 49 && isMan && (
                      <Box className="flex flex-row" style={{ color: getImcColor(abdominalValue, 'RA_MAN_40_49') }}>
                        <Typography variant="h4" className="!font-bold">{abdominalValue}</Typography>
                        <Typography className="!ml-1 !mt-[.9rem]">repetições</Typography>
                      </Box>
                    )}

                    {data.age >= 50 && data.age <= 59 && isMan && (
                      <Box className="flex flex-row" style={{ color: getImcColor(abdominalValue, 'RA_MAN_50_59') }}>
                        <Typography variant="h4" className="!font-bold">{abdominalValue}</Typography>
                        <Typography className="!ml-1 !mt-[.9rem]">repetições</Typography>
                      </Box>
                    )}

                    {data.age >= 60 && data.age <= 69 && isMan && (
                      <Box className="flex flex-row" style={{ color: getImcColor(abdominalValue, 'RA_MAN_60_69') }}>
                        <Typography variant="h4" className="!font-bold">{abdominalValue}</Typography>
                        <Typography className="!ml-1 !mt-[.9rem]">repetições</Typography>
                      </Box>
                    )}

                    {data.age >= 15 && data.age <= 19 && isWoman && (
                      <Box className="flex flex-row" style={{ color: getImcColor(abdominalValue, 'RA_WOMAN_15_19') }}>
                        <Typography variant="h4" className="!font-bold">{abdominalValue}</Typography>
                        <Typography className="!ml-1 !mt-[.9rem]">repetições</Typography>
                      </Box>
                    )}

                    {data.age >= 20 && data.age <= 29 && isWoman && (
                      <Box className="flex flex-row" style={{ color: getImcColor(abdominalValue, 'RA_WOMAN_20_29') }}>
                        <Typography variant="h4" className="!font-bold">{abdominalValue}</Typography>
                        <Typography className="!ml-1 !mt-[.9rem]">repetições</Typography>
                      </Box>
                    )}

                    {data.age >= 30 && data.age <= 39 && isWoman && (
                      <Box className="flex flex-row" style={{ color: getImcColor(abdominalValue, 'RA_WOMAN_30_39') }}>
                        <Typography variant="h4" className="!font-bold">{abdominalValue}</Typography>
                        <Typography className="!ml-1 !mt-[.9rem]">repetições</Typography>
                      </Box>
                    )}

                    {data.age >= 40 && data.age <= 49 && isWoman && (
                      <Box className="flex flex-row" style={{ color: getImcColor(abdominalValue, 'RA_WOMAN_40_49') }}>
                        <Typography variant="h4" className="!font-bold">{abdominalValue}</Typography>
                        <Typography className="!ml-1 !mt-[.9rem]">repetições</Typography>
                      </Box>
                    )}

                    {data.age >= 50 && data.age <= 59 && isWoman && (
                      <Box className="flex flex-row" style={{ color: getImcColor(abdominalValue, 'RA_WOMAN_50_59') }}>
                        <Typography variant="h4" className="!font-bold">{abdominalValue}</Typography>
                        <Typography className="!ml-1 !mt-[.9rem]">repetições</Typography>
                      </Box>
                    )}

                    {data.age >= 60 && data.age <= 69 && isWoman && (
                      <Box className="flex flex-row" style={{ color: getImcColor(abdominalValue, 'RA_WOMAN_60_69') }}>
                        <Typography variant="h4" className="!font-bold">{abdominalValue}</Typography>
                        <Typography className="!ml-1 !mt-[.9rem]">repetições</Typography>
                      </Box>
                    )}

                    <Box>
                      {data.age >= 15 && data.age <= 19 && isAll && (
                        <Typography className={`text-sm rounded-lg px-3 py-2 text-white`} style={{ background: getImcColor(abdominalValue, 'RA_ALL_15_19') }}>
                          {getReviewClassification(abdominalValue, data.age, data.gender, 'RA_ALL_15_19')}
                        </Typography>
                      )}

                      {data.age >= 20 && data.age <= 29 && isAll && (
                        <Typography className={`text-sm rounded-lg px-3 py-2 text-white`} style={{ background: getImcColor(abdominalValue, 'RA_ALL_20_29') }}>
                          {getReviewClassification(abdominalValue, data.age, data.gender, 'RA_ALL_20_29')}
                        </Typography>
                      )}

                      {data.age >= 30 && data.age <= 39 && isAll && (
                        <Typography className={`text-sm rounded-lg px-3 py-2 text-white`} style={{ background: getImcColor(abdominalValue, 'RA_ALL_30_39') }}>
                          {getReviewClassification(abdominalValue, data.age, data.gender, 'RA_ALL_30_39')}
                        </Typography>
                      )}

                      {data.age >= 40 && data.age <= 49 && isAll && (
                        <Typography className={`text-sm rounded-lg px-3 py-2 text-white`} style={{ background: getImcColor(abdominalValue, 'RA_ALL_40_49') }}>
                          {getReviewClassification(abdominalValue, data.age, data.gender, 'RA_ALL_40_49')}
                        </Typography>
                      )}

                      {data.age >= 50 && data.age <= 59 && isAll && (
                        <Typography className={`text-sm rounded-lg px-3 py-2 text-white`} style={{ background: getImcColor(abdominalValue, 'RA_ALL_50_59') }}>
                          {getReviewClassification(abdominalValue, data.age, data.gender, 'RA_ALL_50_59')}
                        </Typography>
                      )}

                      {data.age >= 60 && data.age <= 69 && isAll && (
                        <Typography className={`text-sm rounded-lg px-3 py-2 text-white`} style={{ background: getImcColor(abdominalValue, 'RA_ALL_60_69') }}>
                          {getReviewClassification(abdominalValue, data.age, data.gender, 'RA_ALL_60_69')}
                        </Typography>
                      )}

                      {data.age >= 15 && data.age <= 19 && isMan && (
                        <Typography className={`text-sm rounded-lg px-3 py-2 text-white`} style={{ background: getImcColor(abdominalValue, 'RA_MAN_15_19') }}>
                          {getReviewClassification(abdominalValue, data.age, data.gender, 'RA_MAN_15_19')}
                        </Typography>
                      )}

                      {data.age >= 20 && data.age <= 29 && isMan && (
                        <Typography className={`text-sm rounded-lg px-3 py-2 text-white`} style={{ background: getImcColor(abdominalValue, 'RA_MAN_20_29') }}>
                          {getReviewClassification(abdominalValue, data.age, data.gender, 'RA_MAN_20_29')}
                        </Typography>
                      )}

                      {data.age >= 30 && data.age <= 39 && isMan && (
                        <Typography className={`text-sm rounded-lg px-3 py-2 text-white`} style={{ background: getImcColor(abdominalValue, 'RA_MAN_30_39') }}>
                          {getReviewClassification(abdominalValue, data.age, data.gender, 'RA_MAN_30_39')}
                        </Typography>
                      )}

                      {data.age >= 40 && data.age <= 49 && isMan && (
                        <Typography className={`text-sm rounded-lg px-3 py-2 text-white`} style={{ background: getImcColor(abdominalValue, 'RA_MAN_40_49') }}>
                          {getReviewClassification(abdominalValue, data.age, data.gender, 'RA_MAN_40_49')}
                        </Typography>
                      )}

                      {data.age >= 50 && data.age <= 59 && isMan && (
                        <Typography className={`text-sm rounded-lg px-3 py-2 text-white`} style={{ background: getImcColor(abdominalValue, 'RA_MAN_50_59') }}>
                          {getReviewClassification(abdominalValue, data.age, data.gender, 'RA_MAN_50_59')}
                        </Typography>
                      )}

                      {data.age >= 60 && data.age <= 69 && isMan && (
                        <Typography className={`text-sm rounded-lg px-3 py-2 text-white`} style={{ background: getImcColor(abdominalValue, 'RA_MAN_60_69') }}>
                          {getReviewClassification(abdominalValue, data.age, data.gender, 'RA_MAN_60_69')}
                        </Typography>
                      )}

                      {data.age >= 15 && data.age <= 19 && isWoman && (
                        <Typography className={`text-sm rounded-lg px-3 py-2 text-white`} style={{ background: getImcColor(abdominalValue, 'RA_WOMAN_15_19') }}>
                          {getReviewClassification(abdominalValue, data.age, data.gender, 'RA_WOMAN_15_19')}
                        </Typography>
                      )}

                      {data.age >= 20 && data.age <= 29 && isWoman && (
                        <Typography className={`text-sm rounded-lg px-3 py-2 text-white`} style={{ background: getImcColor(abdominalValue, 'RA_WOMAN_20_29') }}>
                          {getReviewClassification(abdominalValue, data.age, data.gender, 'RA_WOMAN_20_29')}
                        </Typography>
                      )}

                      {data.age >= 30 && data.age <= 39 && isWoman && (
                        <Typography className={`text-sm rounded-lg px-3 py-2 text-white`} style={{ background: getImcColor(abdominalValue, 'RA_WOMAN_30_39') }}>
                          {getReviewClassification(abdominalValue, data.age, data.gender, 'RA_WOMAN_30_39')}
                        </Typography>
                      )}

                      {data.age >= 40 && data.age <= 49 && isWoman && (
                        <Typography className={`text-sm rounded-lg px-3 py-2 text-white`} style={{ background: getImcColor(abdominalValue, 'RA_WOMAN_40_49') }}>
                          {getReviewClassification(abdominalValue, data.age, data.gender, 'RA_WOMAN_40_49')}
                        </Typography>
                      )}

                      {data.age >= 50 && data.age <= 59 && isWoman && (
                        <Typography className={`text-sm rounded-lg px-3 py-2 text-white`} style={{ background: getImcColor(abdominalValue, 'RA_WOMAN_50_59') }}>
                          {getReviewClassification(abdominalValue, data.age, data.gender, 'RA_WOMAN_50_59')}
                        </Typography>
                      )}

                      {data.age >= 60 && data.age <= 69 && isWoman && (
                        <Typography className={`text-sm rounded-lg px-3 py-2 text-white`} style={{ background: getImcColor(abdominalValue, 'RA_WOMAN_60_69') }}>
                          {getReviewClassification(abdominalValue, data.age, data.gender, 'RA_WOMAN_60_69')}
                        </Typography>
                      )}
                    </Box>
                  </Box>

                  <Box className="w-full mt-5 relative">
                    <Box className="w-full h-4 flex rounded-lg overflow-hidden border border-gray-300">
                      <Box className="bg-[#FF5722] w-[20%]"></Box>
                      <Box className="bg-[#FF9800] w-[20%]"></Box>
                      <Box className="bg-[#4CAF50] w-[20%]"></Box>
                      <Box className="bg-[#337535] w-[20%]"></Box>
                      <Box className="bg-[#224e23] w-[20%]"></Box>
                    </Box>

                    {data.age >= 15 && data.age <= 19 && isAll && (
                      <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(abdominalValue, 'RA_ALL_15_19') }} />
                    )}

                    {data.age >= 20 && data.age <= 29 && isAll && (
                      <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(abdominalValue, 'RA_ALL_20_29') }} />
                    )}

                    {data.age >= 30 && data.age <= 39 && isAll && (
                      <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(abdominalValue, 'RA_ALL_30_39') }} />
                    )}

                    {data.age >= 40 && data.age <= 49 && isAll && (
                      <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(abdominalValue, 'RA_ALL_40_49') }} />
                    )}

                    {data.age >= 50 && data.age <= 59 && isAll && (
                      <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(abdominalValue, 'RA_ALL_50_59') }} />
                    )}

                    {data.age >= 60 && data.age <= 69 && isAll && (
                      <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(abdominalValue, 'RA_ALL_60_69') }} />
                    )}

                    {data.age >= 15 && data.age <= 19 && isMan && (
                      <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(abdominalValue, 'RA_MAN_15_19') }} />
                    )}

                    {data.age >= 20 && data.age <= 29 && isMan && (
                      <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(abdominalValue, 'RA_MAN_20_29') }} />
                    )}

                    {data.age >= 30 && data.age <= 39 && isMan && (
                      <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(abdominalValue, 'RA_MAN_30_39') }} />
                    )}

                    {data.age >= 40 && data.age <= 49 && isMan && (
                      <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(abdominalValue, 'RA_MAN_40_49') }} />
                    )}

                    {data.age >= 50 && data.age <= 59 && isMan && (
                      <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(abdominalValue, 'RA_MAN_50_59') }} />
                    )}

                    {data.age >= 60 && data.age <= 69 && isMan && (
                      <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(abdominalValue, 'RA_MAN_60_69') }} />
                    )}

                    {data.age >= 15 && data.age <= 19 && isWoman && (
                      <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(abdominalValue, 'RA_WOMAN_15_19') }} />
                    )}

                    {data.age >= 20 && data.age <= 29 && isWoman && (
                      <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(abdominalValue, 'RA_WOMAN_20_29') }} />
                    )}

                    {data.age >= 30 && data.age <= 39 && isWoman && (
                      <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(abdominalValue, 'RA_WOMAN_30_39') }} />
                    )}

                    {data.age >= 40 && data.age <= 49 && isWoman && (
                      <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(abdominalValue, 'RA_WOMAN_40_49') }} />
                    )}

                    {data.age >= 50 && data.age <= 59 && isWoman && (
                      <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(abdominalValue, 'RA_WOMAN_50_59') }} />
                    )}

                    {data.age >= 60 && data.age <= 69 && isWoman && (
                      <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(abdominalValue, 'RA_WOMAN_60_69') }} />
                    )}
                  </Box>

                  <Box className="w-full flex justify-between mt-2 mb-5 text-xs text-gray-700 relative">
                    {data.age >= 15 && data.age <= 19 && isAll && (
                      <>
                        <Typography className="absolute left-[19%]">12</Typography>
                        <Typography className="absolute left-[38.5%]">23</Typography>
                        <Typography className="absolute right-[38%]">29</Typography>
                        <Typography className="absolute right-[18.2%]">39</Typography>
                      </>
                    )}

                    {data.age >= 20 && data.age <= 29 && isAll && (
                      <>
                        <Typography className="absolute left-[19%]">10</Typography>
                        <Typography className="absolute left-[38.5%]">22</Typography>
                        <Typography className="absolute right-[38%]">29</Typography>
                        <Typography className="absolute right-[18.2%]">36</Typography>
                      </>
                    )}

                    {data.age >= 30 && data.age <= 39 && isAll && (
                      <>
                        <Typography className="absolute left-[19.5%]">8</Typography>
                        <Typography className="absolute left-[38.5%]">17</Typography>
                        <Typography className="absolute right-[38%]">22</Typography>
                        <Typography className="absolute right-[18.2%]">30</Typography>
                      </>
                    )}

                    {data.age >= 40 && data.age <= 49 && isAll && (
                      <>
                        <Typography className="absolute left-[19.5%]">5</Typography>
                        <Typography className="absolute left-[38.5%]">13</Typography>
                        <Typography className="absolute right-[38%]">17</Typography>
                        <Typography className="absolute right-[18.2%]">22</Typography>
                      </>
                    )}

                    {data.age >= 50 && data.age <= 59 && isAll && (
                      <>
                        <Typography className="absolute left-[19.5%]">2</Typography>
                        <Typography className="absolute left-[38.5%]">10</Typography>
                        <Typography className="absolute right-[38%]">13</Typography>
                        <Typography className="absolute right-[18.2%]">21</Typography>
                      </>
                    )}

                    {data.age >= 60 && data.age <= 69 && isAll && (
                      <>
                        <Typography className="absolute left-[19.5%]">1</Typography>
                        <Typography className="absolute left-[39.5%]">8</Typography>
                        <Typography className="absolute right-[38%]">13</Typography>
                        <Typography className="absolute right-[18.2%]">18</Typography>
                      </>
                    )}

                    {data.age >= 15 && data.age <= 19 && isMan && (
                      <>
                        <Typography className="absolute left-[19%]">18</Typography>
                        <Typography className="absolute left-[38.5%]">23</Typography>
                        <Typography className="absolute right-[38%]">29</Typography>
                        <Typography className="absolute right-[18.2%]">39</Typography>
                      </>
                    )}

                    {data.age >= 20 && data.age <= 29 && isMan && (
                      <>
                        <Typography className="absolute left-[19%]">17</Typography>
                        <Typography className="absolute left-[38.5%]">22</Typography>
                        <Typography className="absolute right-[38%]">29</Typography>
                        <Typography className="absolute right-[18.2%]">36</Typography>
                      </>
                    )}

                    {data.age >= 30 && data.age <= 39 && isMan && (
                      <>
                        <Typography className="absolute left-[19%]">12</Typography>
                        <Typography className="absolute left-[38.5%]">17</Typography>
                        <Typography className="absolute right-[38%]">22</Typography>
                        <Typography className="absolute right-[18.2%]">30</Typography>
                      </>
                    )}

                    {data.age >= 40 && data.age <= 49 && isMan && (
                      <>
                        <Typography className="absolute left-[19%]">10</Typography>
                        <Typography className="absolute left-[38.5%]">13</Typography>
                        <Typography className="absolute right-[38%]">17</Typography>
                        <Typography className="absolute right-[18.2%]">22</Typography>
                      </>
                    )}

                    {data.age >= 50 && data.age <= 59 && isMan && (
                      <>
                        <Typography className="absolute left-[19.5%]">7</Typography>
                        <Typography className="absolute left-[38.5%]">10</Typography>
                        <Typography className="absolute right-[38%]">13</Typography>
                        <Typography className="absolute right-[18.2%]">21</Typography>
                      </>
                    )}

                    {data.age >= 60 && data.age <= 69 && isMan && (
                      <>
                        <Typography className="absolute left-[19.5%]">5</Typography>
                        <Typography className="absolute left-[39.5%]">8</Typography>
                        <Typography className="absolute right-[38%]">11</Typography>
                        <Typography className="absolute right-[18.2%]">18</Typography>
                      </>
                    )}

                    {data.age >= 15 && data.age <= 19 && isWoman && (
                      <>
                        <Typography className="absolute left-[19%]">12</Typography>
                        <Typography className="absolute left-[38.5%]">18</Typography>
                        <Typography className="absolute right-[38%]">25</Typography>
                        <Typography className="absolute right-[18.2%]">33</Typography>
                      </>
                    )}

                    {data.age >= 20 && data.age <= 29 && isWoman && (
                      <>
                        <Typography className="absolute left-[19%]">10</Typography>
                        <Typography className="absolute left-[38.5%]">15</Typography>
                        <Typography className="absolute right-[38%]">21</Typography>
                        <Typography className="absolute right-[18.2%]">30</Typography>
                      </>
                    )}

                    {data.age >= 30 && data.age <= 39 && isWoman && (
                      <>
                        <Typography className="absolute left-[19.5%]">8</Typography>
                        <Typography className="absolute left-[38.5%]">13</Typography>
                        <Typography className="absolute right-[38%]">20</Typography>
                        <Typography className="absolute right-[18.2%]">27</Typography>
                      </>
                    )}

                    {data.age >= 40 && data.age <= 49 && isWoman && (
                      <>
                        <Typography className="absolute left-[19.5%]">5</Typography>
                        <Typography className="absolute left-[38.5%]">11</Typography>
                        <Typography className="absolute right-[38%]">15</Typography>
                        <Typography className="absolute right-[18.2%]">24</Typography>
                      </>
                    )}

                    {data.age >= 50 && data.age <= 59 && isWoman && (
                      <>
                        <Typography className="absolute left-[19.5%]">2</Typography>
                        <Typography className="absolute left-[39.5%]">7</Typography>
                        <Typography className="absolute right-[38%]">11</Typography>
                        <Typography className="absolute right-[18.2%]">21</Typography>
                      </>
                    )}

                    {data.age >= 60 && data.age <= 69 && isWoman && (
                      <>
                        <Typography className="absolute left-[19.5%]">1</Typography>
                        <Typography className="absolute left-[39.5%]">5</Typography>
                        <Typography className="absolute right-[38%]">12</Typography>
                        <Typography className="absolute right-[18.2%]">17</Typography>
                      </>
                    )}
                  </Box>
                </Box>
              )}
              {sitreachValue && data.age >= 20 && data.age <= 69 && (
                <Box className='flex flex-col rounded-xl w-full p-5 mt-5 border border-[#EAECF0]'>
                  <Box className="flex flex-row justify-between items-center">
                    <Typography className="!font-light !text-[1.3rem]">Índice Flexibilidade (IF)</Typography>
                  </Box>
                  <Divider className="!my-5" />
                  <Box className='flex flex-row justify-between items-center'>
                    {data.age >= 20 && data.age <= 29 && isAll && (
                      <Box className="flex flex-row" style={{ color: getImcColor(sitreachValue, 'SA_ALL_20_29') }}>
                        <Typography variant="h4" className="!font-bold">{sitreachValue}</Typography>
                        <Typography className="!ml-1 !mt-[.9rem]">de flexibilidade</Typography>
                      </Box>
                    )}

                    {data.age >= 30 && data.age <= 39 && isAll && (
                      <Box className="flex flex-row" style={{ color: getImcColor(sitreachValue, 'SA_ALL_30_39') }}>
                        <Typography variant="h4" className="!font-bold">{sitreachValue}</Typography>
                        <Typography className="!ml-1 !mt-[.9rem]">de flexibilidade</Typography>
                      </Box>
                    )}

                    {data.age >= 40 && data.age <= 49 && isAll && (
                      <Box className="flex flex-row" style={{ color: getImcColor(sitreachValue, 'SA_ALL_40_49') }}>
                        <Typography variant="h4" className="!font-bold">{sitreachValue}</Typography>
                        <Typography className="!ml-1 !mt-[.9rem]">de flexibilidade</Typography>
                      </Box>
                    )}

                    {data.age >= 50 && data.age <= 59 && isAll && (
                      <Box className="flex flex-row" style={{ color: getImcColor(sitreachValue, 'SA_ALL_50_59') }}>
                        <Typography variant="h4" className="!font-bold">{sitreachValue}</Typography>
                        <Typography className="!ml-1 !mt-[.9rem]">de flexibilidade</Typography>
                      </Box>
                    )}

                    {data.age >= 60 && data.age <= 69 && isAll && (
                      <Box className="flex flex-row" style={{ color: getImcColor(sitreachValue, 'SA_ALL_60_69') }}>
                        <Typography variant="h4" className="!font-bold">{sitreachValue}</Typography>
                        <Typography className="!ml-1 !mt-[.9rem]">de flexibilidade</Typography>
                      </Box>
                    )}

                    {data.age >= 20 && data.age <= 29 && isMan && (
                      <Box className="flex flex-row" style={{ color: getImcColor(sitreachValue, 'SA_MAN_20_29') }}>
                        <Typography variant="h4" className="!font-bold">{sitreachValue}</Typography>
                        <Typography className="!ml-1 !mt-[.9rem]">de flexibilidade</Typography>
                      </Box>
                    )}

                    {data.age >= 30 && data.age <= 39 && isMan && (
                      <Box className="flex flex-row" style={{ color: getImcColor(sitreachValue, 'SA_MAN_30_39') }}>
                        <Typography variant="h4" className="!font-bold">{sitreachValue}</Typography>
                        <Typography className="!ml-1 !mt-[.9rem]">de flexibilidade</Typography>
                      </Box>
                    )}

                    {data.age >= 40 && data.age <= 49 && isMan && (
                      <Box className="flex flex-row" style={{ color: getImcColor(sitreachValue, 'SA_MAN_40_49') }}>
                        <Typography variant="h4" className="!font-bold">{sitreachValue}</Typography>
                        <Typography className="!ml-1 !mt-[.9rem]">de flexibilidade</Typography>
                      </Box>
                    )}

                    {data.age >= 50 && data.age <= 59 && isMan && (
                      <Box className="flex flex-row" style={{ color: getImcColor(sitreachValue, 'SA_MAN_50_59') }}>
                        <Typography variant="h4" className="!font-bold">{sitreachValue}</Typography>
                        <Typography className="!ml-1 !mt-[.9rem]">de flexibilidade</Typography>
                      </Box>
                    )}

                    {data.age >= 60 && data.age <= 69 && isMan && (
                      <Box className="flex flex-row" style={{ color: getImcColor(sitreachValue, 'SA_MAN_60_69') }}>
                        <Typography variant="h4" className="!font-bold">{sitreachValue}</Typography>
                        <Typography className="!ml-1 !mt-[.9rem]">de flexibilidade</Typography>
                      </Box>
                    )}

                    {data.age >= 20 && data.age <= 29 && isWoman && (
                      <Box className="flex flex-row" style={{ color: getImcColor(sitreachValue, 'SA_WOMAN_20_29') }}>
                        <Typography variant="h4" className="!font-bold">{sitreachValue}</Typography>
                        <Typography className="!ml-1 !mt-[.9rem]">de flexibilidade</Typography>
                      </Box>
                    )}

                    {data.age >= 30 && data.age <= 39 && isWoman && (
                      <Box className="flex flex-row" style={{ color: getImcColor(sitreachValue, 'SA_WOMAN_30_39') }}>
                        <Typography variant="h4" className="!font-bold">{sitreachValue}</Typography>
                        <Typography className="!ml-1 !mt-[.9rem]">de flexibilidade</Typography>
                      </Box>
                    )}

                    {data.age >= 40 && data.age <= 49 && isWoman && (
                      <Box className="flex flex-row" style={{ color: getImcColor(sitreachValue, 'SA_WOMAN_40_49') }}>
                        <Typography variant="h4" className="!font-bold">{sitreachValue}</Typography>
                        <Typography className="!ml-1 !mt-[.9rem]">de flexibilidade</Typography>
                      </Box>
                    )}

                    {data.age >= 50 && data.age <= 59 && isWoman && (
                      <Box className="flex flex-row" style={{ color: getImcColor(sitreachValue, 'SA_WOMAN_50_59') }}>
                        <Typography variant="h4" className="!font-bold">{sitreachValue}</Typography>
                        <Typography className="!ml-1 !mt-[.9rem]">de flexibilidade</Typography>
                      </Box>
                    )}

                    {data.age >= 60 && data.age <= 69 && isWoman && (
                      <Box className="flex flex-row" style={{ color: getImcColor(sitreachValue, 'SA_WOMAN_60_69') }}>
                        <Typography variant="h4" className="!font-bold">{sitreachValue}</Typography>
                        <Typography className="!ml-1 !mt-[.9rem]">de flexibilidade</Typography>
                      </Box>
                    )}

                    <Box>
                      {data.age >= 20 && data.age <= 29 && isAll && (
                        <Typography className={`text-sm rounded-lg px-3 py-2 text-white`} style={{ background: getImcColor(sitreachValue, 'SA_ALL_20_29') }}>
                          {getReviewClassification(sitreachValue, data.age, data.gender, 'SA_ALL_20_29')}
                        </Typography>
                      )}

                      {data.age >= 30 && data.age <= 39 && isAll && (
                        <Typography className={`text-sm rounded-lg px-3 py-2 text-white`} style={{ background: getImcColor(sitreachValue, 'SA_ALL_30_39') }}>
                          {getReviewClassification(sitreachValue, data.age, data.gender, 'SA_ALL_30_39')}
                        </Typography>
                      )}

                      {data.age >= 40 && data.age <= 49 && isAll && (
                        <Typography className={`text-sm rounded-lg px-3 py-2 text-white`} style={{ background: getImcColor(sitreachValue, 'SA_ALL_40_49') }}>
                          {getReviewClassification(sitreachValue, data.age, data.gender, 'SA_ALL_40_49')}
                        </Typography>
                      )}

                      {data.age >= 50 && data.age <= 59 && isAll && (
                        <Typography className={`text-sm rounded-lg px-3 py-2 text-white`} style={{ background: getImcColor(sitreachValue, 'SA_ALL_50_59') }}>
                          {getReviewClassification(sitreachValue, data.age, data.gender, 'SA_ALL_50_59')}
                        </Typography>
                      )}

                      {data.age >= 60 && data.age <= 69 && isAll && (
                        <Typography className={`text-sm rounded-lg px-3 py-2 text-white`} style={{ background: getImcColor(sitreachValue, 'SA_ALL_60_69') }}>
                          {getReviewClassification(sitreachValue, data.age, data.gender, 'SA_ALL_60_69')}
                        </Typography>
                      )}

                      {data.age >= 20 && data.age <= 29 && isMan && (
                        <Typography className={`text-sm rounded-lg px-3 py-2 text-white`} style={{ background: getImcColor(sitreachValue, 'SA_MAN_20_29') }}>
                          {getReviewClassification(sitreachValue, data.age, data.gender, 'SA_MAN_20_29')}
                        </Typography>
                      )}

                      {data.age >= 30 && data.age <= 39 && isMan && (
                        <Typography className={`text-sm rounded-lg px-3 py-2 text-white`} style={{ background: getImcColor(sitreachValue, 'SA_MAN_30_39') }}>
                          {getReviewClassification(sitreachValue, data.age, data.gender, 'SA_MAN_30_39')}
                        </Typography>
                      )}

                      {data.age >= 40 && data.age <= 49 && isMan && (
                        <Typography className={`text-sm rounded-lg px-3 py-2 text-white`} style={{ background: getImcColor(sitreachValue, 'SA_MAN_40_49') }}>
                          {getReviewClassification(sitreachValue, data.age, data.gender, 'SA_MAN_40_49')}
                        </Typography>
                      )}

                      {data.age >= 50 && data.age <= 59 && isMan && (
                        <Typography className={`text-sm rounded-lg px-3 py-2 text-white`} style={{ background: getImcColor(sitreachValue, 'SA_MAN_50_59') }}>
                          {getReviewClassification(sitreachValue, data.age, data.gender, 'SA_MAN_50_59')}
                        </Typography>
                      )}

                      {data.age >= 60 && data.age <= 69 && isMan && (
                        <Typography className={`text-sm rounded-lg px-3 py-2 text-white`} style={{ background: getImcColor(sitreachValue, 'SA_MAN_60_69') }}>
                          {getReviewClassification(sitreachValue, data.age, data.gender, 'SA_MAN_60_69')}
                        </Typography>
                      )}

                      {data.age >= 20 && data.age <= 29 && isWoman && (
                        <Typography className={`text-sm rounded-lg px-3 py-2 text-white`} style={{ background: getImcColor(sitreachValue, 'SA_WOMAN_20_29') }}>
                          {getReviewClassification(sitreachValue, data.age, data.gender, 'SA_WOMAN_20_29')}
                        </Typography>
                      )}

                      {data.age >= 30 && data.age <= 39 && isWoman && (
                        <Typography className={`text-sm rounded-lg px-3 py-2 text-white`} style={{ background: getImcColor(sitreachValue, 'SA_WOMAN_30_39') }}>
                          {getReviewClassification(sitreachValue, data.age, data.gender, 'SA_WOMAN_30_39')}
                        </Typography>
                      )}

                      {data.age >= 40 && data.age <= 49 && isWoman && (
                        <Typography className={`text-sm rounded-lg px-3 py-2 text-white`} style={{ background: getImcColor(sitreachValue, 'SA_WOMAN_40_49') }}>
                          {getReviewClassification(sitreachValue, data.age, data.gender, 'SA_WOMAN_40_49')}
                        </Typography>
                      )}

                      {data.age >= 50 && data.age <= 59 && isWoman && (
                        <Typography className={`text-sm rounded-lg px-3 py-2 text-white`} style={{ background: getImcColor(sitreachValue, 'SA_WOMAN_50_59') }}>
                          {getReviewClassification(sitreachValue, data.age, data.gender, 'SA_WOMAN_50_59')}
                        </Typography>
                      )}

                      {data.age >= 60 && data.age <= 69 && isWoman && (
                        <Typography className={`text-sm rounded-lg px-3 py-2 text-white`} style={{ background: getImcColor(sitreachValue, 'SA_WOMAN_60_69') }}>
                          {getReviewClassification(sitreachValue, data.age, data.gender, 'SA_WOMAN_60_69')}
                        </Typography>
                      )}
                    </Box>
                  </Box>

                  <Box className="w-full mt-5 relative">
                    <Box className="w-full h-4 flex rounded-lg overflow-hidden border border-gray-300">
                      <Box className="bg-[#FF5722] w-[20%]"></Box>
                      <Box className="bg-[#FF9800] w-[20%]"></Box>
                      <Box className="bg-[#4CAF50] w-[20%]"></Box>
                      <Box className="bg-[#337535] w-[20%]"></Box>
                      <Box className="bg-[#224e23] w-[20%]"></Box>
                    </Box>

                    {data.age >= 20 && data.age <= 29 && isAll && (
                      <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(sitreachValue, 'SA_ALL_20_29') }} />
                    )}

                    {data.age >= 30 && data.age <= 39 && isAll && (
                      <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(sitreachValue, 'SA_ALL_30_39') }} />
                    )}

                    {data.age >= 40 && data.age <= 49 && isAll && (
                      <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(sitreachValue, 'SA_ALL_40_49') }} />
                    )}

                    {data.age >= 50 && data.age <= 59 && isAll && (
                      <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(sitreachValue, 'SA_ALL_50_59') }} />
                    )}

                    {data.age >= 60 && data.age <= 69 && isAll && (
                      <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(sitreachValue, 'SA_ALL_60_69') }} />
                    )}

                    {data.age >= 20 && data.age <= 29 && isMan && (
                      <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(sitreachValue, 'SA_MAN_20_29') }} />
                    )}

                    {data.age >= 30 && data.age <= 39 && isMan && (
                      <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(sitreachValue, 'SA_MAN_30_39') }} />
                    )}

                    {data.age >= 40 && data.age <= 49 && isMan && (
                      <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(sitreachValue, 'SA_MAN_40_49') }} />
                    )}

                    {data.age >= 50 && data.age <= 59 && isMan && (
                      <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(sitreachValue, 'SA_MAN_50_59') }} />
                    )}

                    {data.age >= 60 && data.age <= 69 && isMan && (
                      <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(sitreachValue, 'SA_MAN_60_69') }} />
                    )}

                    {data.age >= 20 && data.age <= 29 && isWoman && (
                      <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(sitreachValue, 'SA_WOMAN_20_29') }} />
                    )}

                    {data.age >= 30 && data.age <= 39 && isWoman && (
                      <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(sitreachValue, 'SA_WOMAN_30_39') }} />
                    )}

                    {data.age >= 40 && data.age <= 49 && isWoman && (
                      <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(sitreachValue, 'SA_WOMAN_40_49') }} />
                    )}

                    {data.age >= 50 && data.age <= 59 && isWoman && (
                      <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(sitreachValue, 'SA_WOMAN_50_59') }} />
                    )}

                    {data.age >= 60 && data.age <= 69 && isWoman && (
                      <Box className="absolute top-[-3.7px] w-1 h-6 bg-black rounded-sm" style={{ left: getImcPosition(sitreachValue, 'SA_WOMAN_60_69') }} />
                    )}
                  </Box>

                  <Box className="w-full flex justify-between mt-2 mb-5 text-xs text-gray-700 relative">
                    {data.age >= 20 && data.age <= 29 && isAll && (
                      <>
                        <Typography className="absolute left-[19%]">25</Typography>
                        <Typography className="absolute left-[38.5%]">33</Typography>
                        <Typography className="absolute right-[38.5%]">37</Typography>
                        <Typography className="absolute right-[18.2%]">41</Typography>
                      </>
                    )}

                    {data.age >= 30 && data.age <= 39 && isAll && (
                      <>
                        <Typography className="absolute left-[19%]">23</Typography>
                        <Typography className="absolute left-[38.5%]">32</Typography>
                        <Typography className="absolute right-[38.5%]">36</Typography>
                        <Typography className="absolute right-[18.2%]">41</Typography>
                      </>
                    )}

                    {data.age >= 40 && data.age <= 49 && isAll && (
                      <>
                        <Typography className="absolute left-[19%]">18</Typography>
                        <Typography className="absolute left-[38.5%]">30</Typography>
                        <Typography className="absolute right-[38.5%]">34</Typography>
                        <Typography className="absolute right-[18.2%]">38</Typography>
                      </>
                    )}

                    {data.age >= 50 && data.age <= 59 && isAll && (
                      <>
                        <Typography className="absolute left-[19%]">16</Typography>
                        <Typography className="absolute left-[38.5%]">30</Typography>
                        <Typography className="absolute right-[38.5%]">33</Typography>
                        <Typography className="absolute right-[18.2%]">39</Typography>
                      </>
                    )}

                    {data.age >= 60 && data.age <= 69 && isAll && (
                      <>
                        <Typography className="absolute left-[19%]">15</Typography>
                        <Typography className="absolute left-[38.5%]">27</Typography>
                        <Typography className="absolute right-[38.5%]">31</Typography>
                        <Typography className="absolute right-[18.2%]">35</Typography>
                      </>
                    )}

                    {data.age >= 15 && data.age <= 19 && isMan && (
                      <>
                        <Typography className="absolute left-[19%]">18</Typography>
                        <Typography className="absolute left-[38.5%]">23</Typography>
                        <Typography className="absolute right-[38.5%]">29</Typography>
                        <Typography className="absolute right-[18.2%]">39</Typography>
                      </>
                    )}

                    {data.age >= 20 && data.age <= 29 && isMan && (
                      <>
                        <Typography className="absolute left-[19%]">25</Typography>
                        <Typography className="absolute left-[38.5%]">30</Typography>
                        <Typography className="absolute right-[38.5%]">34</Typography>
                        <Typography className="absolute right-[18.2%]">40</Typography>
                      </>
                    )}

                    {data.age >= 30 && data.age <= 39 && isMan && (
                      <>
                        <Typography className="absolute left-[19%]">23</Typography>
                        <Typography className="absolute left-[38.5%]">28</Typography>
                        <Typography className="absolute right-[38.5%]">33</Typography>
                        <Typography className="absolute right-[18.2%]">38</Typography>
                      </>
                    )}

                    {data.age >= 40 && data.age <= 49 && isMan && (
                      <>
                        <Typography className="absolute left-[19%]">18</Typography>
                        <Typography className="absolute left-[38.5%]">24</Typography>
                        <Typography className="absolute right-[38.5%]">29</Typography>
                        <Typography className="absolute right-[18.2%]">35</Typography>
                      </>
                    )}

                    {data.age >= 50 && data.age <= 59 && isMan && (
                      <>
                        <Typography className="absolute left-[19%]">16</Typography>
                        <Typography className="absolute left-[38.5%]">24</Typography>
                        <Typography className="absolute right-[38.5%]">28</Typography>
                        <Typography className="absolute right-[18.2%]">35</Typography>
                      </>
                    )}

                    {data.age >= 60 && data.age <= 69 && isMan && (
                      <>
                        <Typography className="absolute left-[19%]">15</Typography>
                        <Typography className="absolute left-[30.5%]">20</Typography>
                        <Typography className="absolute right-[38.5%]">25</Typography>
                        <Typography className="absolute right-[18.2%]">33</Typography>
                      </>
                    )}

                    {data.age >= 20 && data.age <= 29 && isWoman && (
                      <>
                        <Typography className="absolute left-[19%]">28</Typography>
                        <Typography className="absolute left-[38.5%]">33</Typography>
                        <Typography className="absolute right-[38.5%]">37</Typography>
                        <Typography className="absolute right-[18.2%]">41</Typography>
                      </>
                    )}

                    {data.age >= 30 && data.age <= 39 && isWoman && (
                      <>
                        <Typography className="absolute left-[19%]">27</Typography>
                        <Typography className="absolute left-[38.5%]">32</Typography>
                        <Typography className="absolute right-[38.5%]">36</Typography>
                        <Typography className="absolute right-[18.2%]">41</Typography>
                      </>
                    )}

                    {data.age >= 40 && data.age <= 49 && isWoman && (
                      <>
                        <Typography className="absolute left-[19%]">25</Typography>
                        <Typography className="absolute left-[38.5%]">30</Typography>
                        <Typography className="absolute right-[38.5%]">34</Typography>
                        <Typography className="absolute right-[18.2%]">38</Typography>
                      </>
                    )}

                    {data.age >= 50 && data.age <= 59 && isWoman && (
                      <>
                        <Typography className="absolute left-[19%]">25</Typography>
                        <Typography className="absolute left-[38.5%]">30</Typography>
                        <Typography className="absolute right-[38.5%]">33</Typography>
                        <Typography className="absolute right-[18.2%]">39</Typography>
                      </>
                    )}

                    {data.age >= 60 && data.age <= 69 && isWoman && (
                      <>
                        <Typography className="absolute left-[19%]">23</Typography>
                        <Typography className="absolute left-[38.5%]">27</Typography>
                        <Typography className="absolute right-[38.5%]">31</Typography>
                        <Typography className="absolute right-[18.2%]">35</Typography>
                      </>
                    )}
                  </Box>
                </Box>
              )}
              <Box className='flex flex-row justify-between mt-5 notPrint'>
                <Button
                  onClick={closeDrawer}
                  variant="outlined"
                  sx={{
                    backgroundColor: 'transparent',
                    color: '#4b5563',
                    height: '3rem',
                    borderColor: '#4b5563',
                    '&:hover': {
                      backgroundColor: '#d4d4d8',
                      borderColor: '#4b5563',
                    },
                  }}
                >
                  Fechar
                </Button>
                <Button
                  onClick={onPrintClick}
                  variant="contained"
                  color="primary"
                  className='shadow-lg'
                  startIcon={<PiPrinterDuotone />}
                  sx={{
                    backgroundColor: '#f4f4f4',
                    color: '#181818',
                    height: '3rem',
                    '&:hover': {
                      backgroundColor: '#d4d4d8',
                    },
                  }}
                >
                  Imprimir
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
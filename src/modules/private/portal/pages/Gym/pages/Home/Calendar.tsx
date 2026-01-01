// /* eslint-disable @typescript-eslint/no-unused-vars */
// import { Box, Button, Modal, Tooltip, Typography } from '@mui/material';
// import { SetStateAction, useState } from 'react';
// import { IoMdAddCircleOutline } from 'react-icons/io';
// import { TbChevronLeft, TbChevronRight } from 'react-icons/tb';

// // Simulação de dados de reservas
// const reservas = [
//   { id: 1, start: '2024-12-01T00:00:00', end: '2024-12-01T23:59:59', type: 'reserva', client: 'Rudnick Stefan', description: 'Avaliação física' },
//   { id: 2, start: '2024-12-05T10:00:00', end: '2024-12-05T12:00:00', type: 'reserva', client: 'Ana Souza', description: 'Consulta médica' },
//   { id: 3, start: '2024-12-05T15:00:00', end: '2024-12-05T16:30:00', type: 'agendamento', client: 'Carlos Silva', description: 'Avaliação física' },
//   { id: 4, start: '2024-12-10T08:00:00', end: '2024-12-10T10:00:00', type: 'agendamento', client: 'Mariana Costa', description: 'Treinamento' },
//   { id: 5, start: '2024-12-10T08:00:00', end: '2024-12-10T10:00:00', type: 'agendamento', client: 'João Pereira', description: 'Consulta nutricional' },
//   { id: 6, start: '2024-12-10T08:00:00', end: '2024-12-10T10:00:00', type: 'agendamento', client: 'Lucas Almeida', description: 'Treinamento' },
// ];

// const Calendar = () => {
//     const [currentDate, setCurrentDate] = useState(new Date());
//     const [selectedDate, setSelectedDate] = useState<string | null>(null);
//     const [openDetailsModal, setOpenDetailsModal] = useState(false);
// const [openEditModal, setOpenEditModal] = useState(false);
// const [selectedReservation, setSelectedReservation] = useState(null);


//     const getDaysInMonth = (year: number, month: number) => {
//         return new Date(year, month + 1, 0).getDate();
//     };

//     const daysInMonth = getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth());
//     const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

//     const handlePrevMonth = () => {
//         setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
//     };

//     const handleNextMonth = () => {
//         setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
//     };

//     const handleDayClick = (date: string | null) => {
//         setSelectedDate(date);
//         setOpenDetailsModal(true);
//     };

//     const handleReservationClick = (reservation: SetStateAction<null>) => {
//         setSelectedReservation(reservation);  // Define a reserva selecionada
//         setOpenEditModal(true); // Abre o modal de edição para a reserva
//     };    

//     const formattedDate = (day: number) => `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

//     const getReservationsForDate = (date: string | number | Date) => {
//         return reservas.filter(
//             (reserva) =>
//             new Date(reserva.start).toDateString() <= new Date(date).toDateString() &&
//             new Date(reserva.end).toDateString() >= new Date(date).toDateString()
//         );
//     };

//     const renderReservationStyle = (date: number) => {
//         const dayReservations = getReservationsForDate(date);
    
//         if (dayReservations.length === 0) return 'transparent'; // Disponível
    
//         // Verifica se há reservas (tipo "reserva")
//         const reservaStyle = dayReservations.some((reserva) => reserva.type === 'reserva') ? '#ff0336' : '';
    
//         // Verifica se há agendamentos (tipo "agendamento")
//         const agendamentoStyle = dayReservations.some((reserva) => reserva.type === 'agendamento') ? '#ff8c00' : '';

//         // Se somente uma das condições for verdadeira, aplica a cor correspondente
//         return reservaStyle || agendamentoStyle || 'transparent'; // Disponível
//     };

//     return (
//         <Box className="w-full">
//             <Box className='flex justify-end -mt-[3rem]'>
//                 <Button
//                     className='!min-w-5 !mr-5'
//                     sx={{
//                         color: '#4b5563',
//                         fontWeight: 'normal',
//                         padding: 0,
//                         transition: 'transform 0.3s, background-color 0.3s, color 0.3s,',
//                         '&:hover': {
//                             background: 'white',
//                             color: '#ff0336',
//                         },
//                     }}
//                     onClick={handlePrevMonth}>
//                     <TbChevronLeft size={24} />
//                 </Button>
//                 <Button
//                     className='!min-w-5'
//                     sx={{
//                         color: '#4b5563',
//                         fontWeight: 'normal',
//                         padding: 0,
//                         transition: 'transform 0.3s, background-color 0.3s, color 0.3s,',
//                         '&:hover': {
//                             background: 'white',
//                             color: '#ff0336',
//                         },
//                     }}
//                     onClick={handleNextMonth}>
//                     <TbChevronRight size={24} />
//                 </Button>
//             </Box>

//             <Box className="flex justify-between items-center my-5">
//                 <Typography variant="h6" className="text-[1.3rem] font-poppins">
//                     {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
//                 </Typography>

//                 <Box className="flex flex-row items-center justify-center">
//                     <Box className="flex items-center">
//                         <Box className="w-5 h-5 bg-[#ff0336] mr-2 rounded-full" />
//                         <Typography variant="body2">Reserva</Typography>
//                     </Box>
//                     <Box className="flex items-center mx-5">
//                         <Box className="w-5 h-5 bg-orange-400 mr-2 rounded-full" />
//                         <Typography variant="body2">Agendamento</Typography>
//                     </Box>
//                     <Box className="flex items-center">
//                         <Box className="w-5 h-5 bg-transparent border-2 border-gray-400 mr-2 rounded-full" />
//                         <Typography variant="body2">Disponível</Typography>
//                     </Box>
//                 </Box>
//             </Box>

//             {/* Corpo do calendário */}
//             <Box className="grid grid-cols-7 gap-3 text-center">
//                 {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'].map((day) => (
//                     <Typography key={day} className="font-semibold text-gray-500">
//                         {day}
//                     </Typography>
//                 ))}

//                 {/* Espaço vazio antes do primeiro dia */}
//                 {Array.from({ length: firstDayOfMonth }).map((_, index) => (
//                     <Box key={`empty-${index}`} />
//                 ))}

//                 {/* Dias do mês */}
//                 {Array.from({ length: daysInMonth }).map((_, day) => {
//                     const date = formattedDate(day + 1);
//                     const dayReservations = getReservationsForDate(date);

//                     return (
//                     <Box key={date} className="flex flex-col items-center bg-[#f3f3f3] rounded-lg">
//                             <Button
//                                 className="!rounded-t-lg !w-full flex !flex-col !h-full !justify-start"
//                                 sx={{
//                                     backgroundColor: renderReservationStyle(day + 1),
//                                     color: 'black',
//                                     fontWeight: 'light',
//                                     padding: '10px',
//                                     width: '40px',
//                                     height: '40px',
//                                     '&:hover': { backgroundColor: renderReservationStyle(day + 1) },
//                                 }}
//                                 onClick={() => handleDayClick(date)}
//                             >
//                                 {day + 1}
//                                 {/* Mostrar reservas */}

//                         {dayReservations.length <= 2
//                             ? dayReservations.map((reserva) => (
//                                 <Tooltip
//                                     placement="right"
//                                     title={<Box key={reserva.id}>
//                                                 {reserva.client} - {reserva.description}
//                                             </Box>
//                                     }
//                                     arrow
//                                 >
//                                     <Box
//                                         key={reserva.id}
//                                         className={`rounded-lg ${reserva.type === 'reserva' ? 'bg-[#ff0336]' : 'bg-[#ff8c00]'} text-white px-2 py-1 m-1 whitespace-nowrap overflow-hidden text-ellipsis w-full text-[.7rem] cursor-pointer`}
//                                     >
//                                         {reserva.client} - {reserva.description}
//                                     </Box>
//                                 </Tooltip>
//                             ))
//                             : (
//                                 <>
//                                     <Tooltip
//                                         placement="right"
//                                         title={<Box key={dayReservations[0].id}>
//                                                     {dayReservations[0].client} - {dayReservations[0].description}
//                                                 </Box>
//                                         }
//                                         arrow
//                                     >
//                                         <Box
//                                             className={`rounded-lg ${dayReservations[0].type === 'reserva' ? 'bg-[#ff0336]' : 'bg-[#ff8c00]'} text-white px-2 py-1 m-1 whitespace-nowrap overflow-hidden text-ellipsis w-full text-[.7rem] cursor-pointer`}
//                                         >
//                                             {dayReservations[0].client} - {dayReservations[0].description}
//                                         </Box>
//                                     </Tooltip>
//                                     <Tooltip
//     title={
//         dayReservations.length > 1 ? (
//             dayReservations.slice(1).map((reserva) => (
//                 <div key={reserva.id}>
//                     {reserva.client} - {reserva.description}
//                 </div>
//             ))
//         ) : (
//             `+${dayReservations.length - 1}`
//         )
//     }
//     placement="right"
//     arrow
// >
//     <Box className='cursor-pointer rounded-lg bg-[#d9d9d9] text-black px-2 py-1 m-1 max-w-[3rem] text-[.7rem]'>
//         +{dayReservations.length - 1}
//     </Box>
// </Tooltip>
//                                 </>
//                             )}
                        
//                             </Button>

//                     </Box>
//                     );
//                 })}
//             </Box>

//             {openDetailsModal && selectedDate && (
//                 <Modal open={openDetailsModal} onClose={() => setOpenDetailsModal(false)}>
//                     <Box className="bg-white p-5 rounded-lg w-[400px] mx-auto mt-20">
//                         <Typography variant="h6" gutterBottom>
//                             Detalhes para {selectedDate}
//                         </Typography>
//                         <Button
//                     startIcon={<IoMdAddCircleOutline />}
//                     className='!min-w-5 !mr-5'
//                     style={{ textTransform: 'none', fontFamily: 'Poppins' }}
//                     sx={{
//                         color: '#4b5563',
//                         fontWeight: 'normal',
//                         padding: 0,
//                         transition: 'transform 0.3s, background-color 0.3s, color 0.3s,',
//                         '&:hover': {
//                             background: 'white',
//                             color: '#ff0336',
//                         },
//                     }}
//                 >Novo</Button>
//                         {getReservationsForDate(selectedDate).map((reserva) => (
//                             <Box
//                                 key={reserva.id}
//                                 className="cursor-pointer"
//                                 // onClick={() => handleReservationClick(reserva)} // Abre o modal de edição da reserva
//                             >
//                                 <Typography variant="body2">{reserva.client} - {reserva.description}</Typography>
//                             </Box>
//                         ))}
//                     </Box>
//                 </Modal>
//             )}


//         </Box>
//     );
// };

// export default Calendar;

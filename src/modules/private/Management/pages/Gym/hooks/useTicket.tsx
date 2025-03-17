import { SelectChangeEvent } from '@mui/material';
import { VariantType } from 'notistack';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useBackendForFrontend } from '../../../../../common/hooks/useBackendForFrontend';
import { FindTicketsResponse, TicketData } from '../../../../../common/types';
import { EditStudentDrawer, TicketCreateDrawer } from '../../../components/Drawer';
import { QueryFindTickets } from '../../../components/Graphql';
import { TicketDetails } from '../../Support/pages/Protocols/Details';
import { AdminGymDetailsProps, AdminGymDrawerType } from '../types';

export const useTicket = ({
    enqueueSnackbar
}: {
    enqueueSnackbar: (message: string, options?: { variant: VariantType }) => void;
}) => {

    const { request } = useBackendForFrontend();
    const [isLoading, setIsLoading] = useState(false);
    const companyCode = Number(localStorage.getItem('@iflexfit:companyCode'));
    const [responseTickets, setresponseTickets] = useState<FindTicketsResponse | null>();
    const [alterStudent, setAlterStudent] = useState<TicketData | null>();
    const [ticketDetails, setTicketDetails] = useState<TicketData | null>();
    const [attemptCount, setAttemptCount] = useState(0);
    const [isDetailsView, setIsDetailsView] = useState(false);
    const calledRef = useRef(false);
    const [activeDrawerStep, setActiveDrawerStep] = useState(0);
    const [activeContentStep, setActiveContentStep] = useState(0);

    // Estado de controle de paginação e busca
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchText, setSearchText] = useState("");

    // Aplicar filtragem de alunos
    const filteredPlans = (responseTickets?.findTickets || []).filter((ticket) => {
        const searchLower = searchText.trim().toLowerCase();

        // Extrair número do formato STD-52
        const extractedTicketCode = searchLower.startsWith('prt-') 
            ? searchLower.replace('prt-', '') 
            : null;

        return (
            ticket.name?.toLowerCase().includes(searchLower) ||
            (ticket.ticketCode && extractedTicketCode && ticket.ticketCode.toString() === extractedTicketCode)
        );
    });

    // Cálculo para paginação com base nos itens filtrados
    const totalItems = filteredPlans.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
    const ticketsToDisplay = filteredPlans.slice(startIndex, endIndex);

    // Handlers
    const handleItemsPerPageChange = (event: SelectChangeEvent<number>) => {
        setItemsPerPage(Number(event.target.value)); // Atualiza itens por página
        setCurrentPage(1); // Reset para a primeira página
    };

    const handlePageChange = (_: unknown, page: number) => {
        setCurrentPage(page); // Atualiza página atual
    };

    const [anchorEls, setAnchorEls] = useState<{ [key: string]: HTMLElement | null }>({});

    // Função para abrir o menu
    const handleOpenMore = (event: React.MouseEvent<HTMLElement>, ticketCode: string) => {
        setAnchorEls((prev) => ({ ...prev, [ticketCode]: event.currentTarget }));
    };

    // Função para fechar o menu
    const handleCloseMore = (ticketCode: string) => {
        setAnchorEls((prev) => ({ ...prev, [ticketCode]: null }));
    };

    const handleMoreDetails = (ticketCode: string) => {
        const ticketDetail = responseTickets?.findTickets?.find((ticket) => ticket.ticketCode === ticketCode);
        if (ticketDetail) {
            setTicketDetails(ticketDetail);
        } 
        setIsDetailsView(true);
        openContent('TicketDetail');
        handleCloseMore(ticketCode);
    };

    const isMenuOpen = (ticketCode: string) => Boolean(anchorEls[ticketCode]);

    const [componentType, setComponentType] = useState<AdminGymDetailsProps[keyof AdminGymDetailsProps] | null>(null);

    {/* Drawers */}
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [drawerType, setDrawerType] = useState<AdminGymDrawerType[keyof AdminGymDrawerType] | null>(null);

    const findTickets = useCallback(async () => {
            setIsLoading(true);
            try {
                const response: FindTicketsResponse = await request(QueryFindTickets, { request: 'COMPANY_ISSUER_TO_ALL', issuerCode: companyCode });

                setresponseTickets(response);
            } catch (error) {
                setAttemptCount(prevCount => prevCount + 1);
                if (attemptCount >= 5) {
                    return enqueueSnackbar('Erro ao buscar protocolos. Entre em contato com nosso suporte.', { variant: 'error' });
                }
                enqueueSnackbar('Erro ao buscar seus protocolos.', { variant: 'error' });
            } finally {
                setIsLoading(false);
            }
        }, [attemptCount, companyCode, enqueueSnackbar, request]);

    useEffect(() => {
        if (!calledRef.current) {
            calledRef.current = true;

            const fetchData = async () => {
                await findTickets();
            };

            fetchData();
        }
    }, [findTickets]);

    const renderDrawerContent = () => {
        switch (drawerType) {
            case 'TicketCreate':
                return (
                    <TicketCreateDrawer 
                        closeDrawer={closeDrawer} 
                        enqueueSnackbar={enqueueSnackbar} 
                        refresh={() => refresh('findTickets')}
                    />
                );

            case 'EditStudent':
                return (
                    <EditStudentDrawer 
                        closeDrawer={closeDrawer} 
                        enqueueSnackbar={enqueueSnackbar}
                        data={alterStudent}
                        initialStep={activeDrawerStep}
                        refresh={() => refresh('findTickets')}
                    />
                );

            default:
                break;
        }
    };

    const handleBackToTable = () => {
        setIsDetailsView(false);
    };

    const renderComponentContent = () => {
        switch (componentType) {
            case 'TicketDetail':
                return (
                    <TicketDetails
                        closeDrawer={closeDrawer} 
                        enqueueSnackbar={enqueueSnackbar}
                        data={ticketDetails}
                        initialStep={activeContentStep}
                        refresh={() => refresh('findStudents')}
                        onBack={handleBackToTable}
                    />
                );

            default:
                break;
        }
    };

    const refresh = async (source: unknown) => {

        switch (source) {
            case 'findTickets':
                await findTickets();
                break;
            
            default:
                break;
        }
    };

    const closeDrawer = () => {
        setDrawerType(null);
        setIsDrawerOpen(false);
    };

    const openDrawer = (type: AdminGymDrawerType[keyof AdminGymDrawerType], initialStep: number = 0) => {
        setDrawerType(type);
        setIsDrawerOpen(true);
        setActiveDrawerStep(initialStep);
    };

    const openContent = (type: AdminGymDetailsProps[keyof AdminGymDetailsProps], initialStep: number = 0) => {
        setComponentType(type);
        setActiveContentStep(initialStep);
    };

    return {
        isLoading,
        responseTickets,
        renderDrawerContent,
        openDrawer,
        closeDrawer,
        isDrawerOpen,
        itemsPerPage,
        handleItemsPerPageChange,
        startIndex,
        endIndex,
        totalItems,
        totalPages,
        currentPage,
        handlePageChange,
        searchText,
        setSearchText,
        filteredPlans,
        anchorEls,
        handleOpenMore,
        handleCloseMore,
        handleMoreDetails,
        isMenuOpen,
        ticketsToDisplay,
        isDetailsView,
        renderComponentContent
    };
};

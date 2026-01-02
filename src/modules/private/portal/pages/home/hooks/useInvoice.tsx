import { SelectChangeEvent } from '@mui/material';
import { VariantType } from 'notistack';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useBackendForFrontend } from '../../../../../common/hooks/useBackendForFrontend';
import { FindTransactionsResponse, TransactionData } from '../../../../../common/types';
import { PayTransactionDrawer, TransactionDetailDrawer } from '../../../components/Drawer';
import { QueryFindTransactions } from '../../../components/Graphql';
import { AdminGymDetailsProps } from '../types';

export const useInvoice = ({
    enqueueSnackbar
}: {
    enqueueSnackbar: (message: string, options?: { variant: VariantType }) => void;
}) => {

    const { request } = useBackendForFrontend();
    const companyCode = Number(localStorage.getItem('@iflexfit:companyCode'));
    const [responseTransactions, setResponseTransactions] = useState<FindTransactionsResponse | null>();
    const [transactionDetail, setTransactionDetail] = useState<TransactionData | null>();
    const [attemptCount, setAttemptCount] = useState(0);
    const calledRef = useRef(false);

    // Estado de controle de paginação e busca
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchText, setSearchText] = useState("");

    // Aplicar filtragem de planos
    const filteredTransactions = (responseTransactions?.findTransactions || []).filter((transaction) => {
        const searchLower = searchText.trim().toLowerCase();

        // Extrair número do formato STD-52
        const extractedProfileCode = searchLower.startsWith('tra-') 
            ? searchLower.replace('fta-', '') 
            : null;

        const matchesSearch =
        transaction.description?.toLowerCase().includes(searchLower) ||
        transaction.amount?.toString().toLowerCase().includes(searchLower) ||
        (transaction.transactionCode && extractedProfileCode && transaction.transactionCode.toString() === extractedProfileCode);

        return matchesSearch;
    });

    // Cálculo para paginação com base nos itens filtrados
    const totalItems = filteredTransactions.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
    const transactionsToDisplay = filteredTransactions.slice(startIndex, endIndex);

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
    const handleOpenMore = (event: React.MouseEvent<HTMLElement>, classCode: string) => {
        setAnchorEls((prev) => ({ ...prev, [classCode]: event.currentTarget }));
    };

    // Função para fechar o menu
    const handleCloseMore = (classCode: string) => {
        setAnchorEls((prev) => ({ ...prev, [classCode]: null }));
    };

    const handleMoreDetails = (transactionCode: string) => {
        const transactionDetail = responseTransactions?.findTransactions?.find((transaction) => transaction.transactionCode === transactionCode);

        setTransactionDetail(transactionDetail);

        openDrawer('TransactionDetail');
        handleCloseMore(transactionCode);
    };

    const isMenuOpen = (classCode: string) => Boolean(anchorEls[classCode]);

    {/* Drawers */}
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [drawerType, setDrawerType] = useState<AdminGymDetailsProps[keyof AdminGymDetailsProps] | null>(null);
    
    const renderDrawerContent = () => {
        switch (drawerType) {
            case 'TransactionDetail':
                return (
                    <TransactionDetailDrawer 
                        closeDrawer={closeDrawerDetails} 
                        enqueueSnackbar={enqueueSnackbar}
                        data={transactionDetail}
                    />
                );

            case 'ReceiveTransaction':
                return (
                    <PayTransactionDrawer 
                        closeDrawer={closeDrawerDetails} 
                        enqueueSnackbar={enqueueSnackbar}
                        data={transactionDetail}
                        refresh={() => refresh('findTransactions')}
                    />
                );

            default:
                break;
        }
    };

    const refresh = async (source: unknown) => {

        switch (source) {
            case 'findTransactions':
                await findTransactions();
                break;
            
            default:
                break;
        }
    };

    const closeDrawerDetails = () => {
        setDrawerType(null);
        setIsDrawerOpen(false);
    };

    const openDrawer = (type: AdminGymDetailsProps[keyof AdminGymDetailsProps]) => {
        setDrawerType(type);
        setIsDrawerOpen(true);
    };

    const closeDrawer = () => {
        setDrawerType(null);
        setIsDrawerOpen(false);
    };

    const findTransactions = useCallback(async () => {
        try {
            const response: FindTransactionsResponse = await request(QueryFindTransactions, { recipientCode: companyCode });

            setResponseTransactions(response);
        } catch (error) {
            
            setAttemptCount(prevCount => prevCount + 1);
            if (attemptCount >= 5) {
                return enqueueSnackbar('Erro ao buscar faturas. Entre em contato com nosso suporte.', { variant: 'error' });
            }
            enqueueSnackbar('Erro ao buscar suas faturas.', { variant: 'error' });
        }
    }, [attemptCount, companyCode, enqueueSnackbar, request]);

    useEffect(() => {
        if (!calledRef.current) {
            calledRef.current = true;

            const fetchData = async () => {
                await findTransactions();
            };

            fetchData();
        }
    }, [findTransactions]);

    const handleReceiveTransaction = (transactionCode: string) => {
        const transactionDetail = responseTransactions?.findTransactions?.find((transaction) => transaction.transactionCode === transactionCode);

        setTransactionDetail(transactionDetail);

        openDrawer('ReceiveTransaction');
        handleCloseMore(transactionCode);
    };

    return {
        responseTransactions,
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
        filteredTransactions,
        anchorEls,
        handleOpenMore,
        handleCloseMore,
        handleMoreDetails,
        isMenuOpen,
        transactionsToDisplay,
        handleReceiveTransaction,
    };
};

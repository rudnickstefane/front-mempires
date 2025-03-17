import { SelectChangeEvent } from '@mui/material';
import { useCallback, useEffect, useRef, useState } from 'react';
import { MultiValue, SingleValue } from 'react-select';
import { useBackendForFrontend } from '../../../common/hooks/useBackendForFrontend';
import { DrawerProps, FindReviewQuestionsResponse, FindReviewsResponse, FindStudentPlansResponse, FindTransactionsResponse, ReviewData, StudentData, StudentPlanData, TransactionData } from '../../../common/types';
import { OptionSelect } from '../../../common/ui/types';
import { FormatText, GetErrorMessage, SendCroppedImageVariables } from '../../../common/utils';
import { CreateTransactionDrawer, EditStudentDrawer, EditTransactionDrawer, ReceiveTransactionDrawer, ReversedTransactionDrawer, ReviewCreateDrawer, ReviewDetailDrawer, ReviewEditDrawer, StudentPlanCreateDrawer, StudentPlanDetailDrawer, TransactionDetailDrawer } from '../components/Drawer';
import { MutationReviewUpsert, MutationStudentUpsert, MutationTransactionsUpSert, QueryFindReviewQuestions, QueryFindReviews, QueryFindStudentPlans, QueryFindTransactions } from '../components/Graphql';
import { MutationSendCroppedImage } from '../components/Graphql/MutationSendCroppedImage';
import { AdminGymDetailsProps } from '../pages/Gym/types';

export const useStudentAlterForm = ({
    closeDrawer,
    enqueueSnackbar,
    data,
    refresh,
}: DrawerProps & { data: StudentData }) => {

    const { request } = useBackendForFrontend();
    const [isLoading, setIsLoading] = useState(false);
    const [attemptCount, setAttemptCount] = useState(0);
    const [responseTransactions, setResponseTransactions] = useState<FindTransactionsResponse | null>();
    const [responseStudentPlans, setResponseStudentPlans] = useState<FindStudentPlansResponse | null>();
    const [responseReviews, setResponseReviews] = useState<FindReviewsResponse | null>();
    const [responseReviewQuestions, setResponseReviewQuestions] = useState<FindReviewQuestionsResponse | null>();
    const [transactionDetail, setTransactionDetail] = useState<TransactionData | null>();
    const [reviewDetail, setReviewDetail] = useState<ReviewData | null>();
    const [studentPlanDetail, setStudentPlanDetail] = useState<StudentPlanData | null>();
    const calledRef = useRef(false);
    const [modalConfirmDelete, setModalConfirmDelete] = useState(false);
    const [modalConfirmReprocess, setModalConfirmReprocess] = useState(false);
    const [modalConfirmCancel, setModalConfirmCancel] = useState<boolean>(false);
    const companyCode = Number(localStorage.getItem('@iflexfit:companyCode'));
    const profileCode = Number(localStorage.getItem('@iflexfit:profileCode'));
    const [advancedSearch, setAdvancedSearch] = useState(false);
    const [reviewCreate, setReviewCreate] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState<string[]>([]);
    const [cancelReason, setCancelReason] = useState('');

    const parseAmount = (amount: string): number => {
        if (!amount) return 0;
        return parseFloat(amount.replace(".", "").replace(",", "."));
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleReasonChange = (e: any) => {
        setCancelReason(FormatText(e.target.value));
    };

    // Função para formatar valores no padrão PT-BR
    const formatAmount = (amount: number): string => {
        return amount.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    };

    // Calcular totais de valores pendentes e vencidos
    const calculateTotals = () => {
        const totals = {
        pendingTotal: 0,
        overdueTotal: 0,
        };

        (responseTransactions?.findTransactions || []).forEach((transaction) => {
        const isPending = transaction.paymentStatus === "PENDING";

        const amount = parseAmount(transaction.amount);

        if (isPending) {
            totals.pendingTotal += amount;
        }

        });

        return totals;
    };

    // Obter os totais calculados
    const { pendingTotal } = calculateTotals();

    // Estado de controle de paginação e busca
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchText, setSearchText] = useState("");

    // Aplicar filtragem de alunos
    const filteredTransactions = (responseTransactions?.findTransactions || []).filter((transaction) => {
        const searchLower = searchText.trim().toLowerCase();

        // Extrair número do formato STD-52
        const extractedProfileCode = searchLower.startsWith('tra-') 
            ? searchLower.replace('tra-', '') 
            : null;

        const matchesSearch =
        transaction.description?.toLowerCase().includes(searchLower) ||
        transaction.amount?.toString().toLowerCase().includes(searchLower) ||
        (transaction.transactionCode && extractedProfileCode && transaction.transactionCode.toString() === extractedProfileCode);
    
        const matchesStatus = selectedStatus.length === 0 || selectedStatus.includes(transaction.paymentStatus);
    
        return matchesSearch && matchesStatus;
    });

    // Cálculo para paginação com base nos itens filtrados
    const totalItems = filteredTransactions.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
    const transactions = filteredTransactions.slice(startIndex, endIndex);

    const filteredPlans = (responseStudentPlans?.findStudentPlans || []).filter(() => {
        const matchesStatus = selectedStatus.length === 0;
    
        return matchesStatus;
    });

    const totalItemsPlans = filteredPlans.length;
    const totalPagesPlans = Math.ceil(totalItemsPlans / itemsPerPage);
    const startIndexPlans = (currentPage - 1) * itemsPerPage;
    const endIndexPlans = Math.min(startIndex + itemsPerPage, totalItemsPlans);
    const studentPlans = filteredPlans.slice(startIndexPlans, endIndexPlans);

    const filteredReviews = (responseReviews?.findReviews || []).filter(() => {
        const matchesStatus = selectedStatus.length === 0;
    
        return matchesStatus;
    });

    const totalItemsReviews = filteredReviews.length;
    const totalPagesReviews = Math.ceil(totalItemsReviews / itemsPerPage);
    const startIndexReviews = (currentPage - 1) * itemsPerPage;
    const endIndexReviews = Math.min(startIndex + itemsPerPage, totalItemsReviews);
    const reviews = filteredReviews.slice(startIndexReviews, endIndexReviews);

    // Handlers
    const handleItemsPerPageChange = (event: SelectChangeEvent<number>) => {
        setItemsPerPage(Number(event.target.value)); // Atualiza itens por página
        setCurrentPage(1); // Reset para a primeira página
    };

    const handlePageChange = (_: unknown, page: number) => {
        setCurrentPage(page); // Atualiza página atual
    };

    const detailsViews = [
        { view: 'PROFILE', name: 'Dados do Aluno' },
        { view: 'FINANCE', name: 'Financeiro' },
        { view: 'PLAN', name: 'Plano' },
        { view: 'TRAININGS', name: 'Treinos' },
        { view: 'REVIEWS', name: 'Avaliações' },
    ];

    const [activeView, setActiveView] = useState<string>(detailsViews[0].view);
    const [hoveredView, setHoveredView] = useState<string | null>(null);

    const findTransactions = useCallback(async () => {
        try {
            const response: FindTransactionsResponse = await request(QueryFindTransactions, { recipientCode: Number(data.profileCode) });

            setResponseTransactions(response);
        } catch (error) {
            
            setAttemptCount(prevCount => prevCount + 1);
            if (attemptCount >= 5) {
                return enqueueSnackbar('Erro ao buscar transações. Entre em contato com nosso suporte.', { variant: 'error' });
            }
            enqueueSnackbar('Erro ao buscar as transações do aluno.', { variant: 'error' });
        }
    }, [attemptCount, data.profileCode, enqueueSnackbar, request]);

    const findStudentPlans = useCallback(async () => {
        try {
            const response: FindStudentPlansResponse = await request(QueryFindStudentPlans, { companyCode: companyCode, studentCode: Number(data.profileCode) });

            setResponseStudentPlans(response);
        } catch (error) {            
            setAttemptCount(prevCount => prevCount + 1);
            if (attemptCount >= 5) {
                return enqueueSnackbar('Erro ao buscar planos associados ao aluno. Entre em contato com nosso suporte.', { variant: 'error' });
            }
            enqueueSnackbar('Erro ao buscar planos associados ao aluno.', { variant: 'error' });
        }
    }, [attemptCount, companyCode, data.profileCode, enqueueSnackbar, request]);

    const findReviews = useCallback(async () => {
        try {
            const response: FindReviewsResponse = await request(QueryFindReviews, { companyCode: companyCode, studentCode: Number(data.profileCode) });

            setResponseReviews(response);
        } catch (error) {            
            setAttemptCount(prevCount => prevCount + 1);
            if (attemptCount >= 5) {
                return enqueueSnackbar('Erro ao buscar avaliações associados ao aluno. Entre em contato com nosso suporte.', { variant: 'error' });
            }
            enqueueSnackbar('Erro ao buscar avaliações associados ao aluno.', { variant: 'error' });
        }
    }, [attemptCount, companyCode, data.profileCode, enqueueSnackbar, request]);

    const findReviewQuestions = useCallback(async () => {
        try {
            const response: FindReviewQuestionsResponse = await request(QueryFindReviewQuestions);

            setResponseReviewQuestions(response);
        } catch (error) {            
            setAttemptCount(prevCount => prevCount + 1);
            if (attemptCount >= 5) {
                return enqueueSnackbar('Erro ao buscar questões de avaliações. Entre em contato com nosso suporte.', { variant: 'error' });
            }
            enqueueSnackbar('Erro ao buscar questões de avaliações.', { variant: 'error' });
        }
    }, [attemptCount, enqueueSnackbar, request]);

    useEffect(() => {
        if (!calledRef.current) {
            calledRef.current = true;

            const fetchData = async () => {
                await findTransactions();
                await findStudentPlans();
                await findReviews();
                await findReviewQuestions();
            };

            fetchData();
        }
    }, [findTransactions, findStudentPlans, findReviews, findReviewQuestions]);

    {/* Drawers */}
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [drawerType, setDrawerType] = useState<AdminGymDetailsProps[keyof AdminGymDetailsProps] | null>(null);
    const [activeDrawerStep, setActiveDrawerStep] = useState(0);

    const renderDrawerContent = () => {
            switch (drawerType) {
                case 'EditStudent':
                    return (
                        <EditStudentDrawer 
                            closeDrawer={closeDrawerDetails} 
                            enqueueSnackbar={enqueueSnackbar}
                            data={data}
                            initialStep={activeDrawerStep}
                            refresh={() => refresh?.()}
                        />
                    );

                case 'TransactionDetail':
                    return (
                        <TransactionDetailDrawer 
                            closeDrawer={closeDrawerDetails} 
                            enqueueSnackbar={enqueueSnackbar}
                            data={transactionDetail}
                        />
                    );

                case 'ReversedTransaction':
                    return (
                        <ReversedTransactionDrawer
                            closeDrawer={closeDrawerDetails} 
                            enqueueSnackbar={enqueueSnackbar}
                            data={transactionDetail}
                            refreshInternal={() => refreshInternal('findTransactions')}
                        />
                    );

                case 'ReceiveTransaction':
                    return (
                        <ReceiveTransactionDrawer 
                            closeDrawer={closeDrawerDetails} 
                            enqueueSnackbar={enqueueSnackbar}
                            data={transactionDetail}
                            refreshInternal={() => refreshInternal('findTransactions')}
                            refresh={() => refresh?.()}
                        />
                    );

                case 'CreateTransaction':
                    return (
                        <CreateTransactionDrawer 
                            closeDrawer={closeDrawerDetails} 
                            enqueueSnackbar={enqueueSnackbar}
                            data={transactionDetail}
                            refreshInternal={() => refreshInternal('findTransactions')}
                        />
                    );

                case 'EditTransaction':
                    return (
                        <EditTransactionDrawer 
                            closeDrawer={closeDrawerDetails} 
                            enqueueSnackbar={enqueueSnackbar}
                            data={transactionDetail}
                            refreshInternal={() => refreshInternal('findTransactions')}
                        />
                    );

                case 'StudentPlanCreate':
                    return (
                        <StudentPlanCreateDrawer 
                            closeDrawer={closeDrawerDetails} 
                            enqueueSnackbar={enqueueSnackbar}
                            data={data}
                            refreshInternal={() => refreshInternal('findStudentPlans')}
                        />
                    );

                case 'StudentPlanDetail':
                    return (
                        <StudentPlanDetailDrawer 
                            closeDrawer={closeDrawerDetails} 
                            enqueueSnackbar={enqueueSnackbar}
                            data={studentPlanDetail}
                        />
                    );

                case 'ReviewCreate':
                    return (
                        <ReviewCreateDrawer 
                            closeDrawer={closeDrawerDetails} 
                            enqueueSnackbar={enqueueSnackbar}
                            data={data}
                            refreshInternal={() => refreshInternal('findReviews')}
                        />
                    );

                case 'ReviewDetail':
                    return (
                        <ReviewDetailDrawer 
                            closeDrawer={closeDrawerDetails} 
                            enqueueSnackbar={enqueueSnackbar}
                            data={reviewDetail}
                        />
                    );

                case 'ReviewEdit':
                    return (
                        <ReviewEditDrawer 
                            closeDrawer={closeDrawerDetails} 
                            enqueueSnackbar={enqueueSnackbar}
                            data={reviewDetail}
                            refreshInternal={() => refreshInternal('findReviews')}
                        />
                    );

                default:
                    break;
            }
        };

    const closeDrawerDetails = () => {
        setDrawerType(null);
        setIsDrawerOpen(false);
    };
    
    const openDrawer = (type: AdminGymDetailsProps[keyof AdminGymDetailsProps], initialStep: number = 0) => {
        setDrawerType(type);
        setIsDrawerOpen(true);
        setActiveDrawerStep(initialStep);
    };

    const [image, setImage] = useState<string | null>(null); // Imagem carregada
    const [croppedImage, setCroppedImage] = useState<string | null>(null); // Imagem recortada
    const [isDialogOpen, setIsDialogOpen] = useState(false); // Controle do modal
    const cropperRef = useRef<HTMLImageElement>(null); // Referência para o Cropper

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setImage(reader.result as string);
                setIsDialogOpen(true); // Abre o modal para recorte
            };
            reader.readAsDataURL(file);
        }
    };

    const handleCrop = async () => {
        if (cropperRef.current) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const cropper = (cropperRef.current as any).cropper;
            const croppedDataURL = cropper.getCroppedCanvas().toDataURL();
            setIsLoading(true);
            try {
                const variables = SendCroppedImageVariables(data.profileCode, 'STUDENT', croppedDataURL);
                await request(MutationSendCroppedImage, variables);
                enqueueSnackbar('Foto da matricula alterada com sucesso!', { variant: 'success' });
                setIsDialogOpen(false);
                setCroppedImage(croppedDataURL);
                refresh?.();
            } catch (error: unknown) {
                setAttemptCount(prevCount => prevCount + 1);
                if (attemptCount >= 5) {
                    return enqueueSnackbar('Erro ao alterar foto da matricula. Entre em contato com nosso suporte.', { variant: 'error' });
                }

                const genericError = 'Ops! Algo deu errado ao alterar foto da matricula. Tente novamente!'
                const errorMessage = GetErrorMessage(error, genericError);
                enqueueSnackbar(errorMessage, { variant: 'error' });
            } finally {
                setIsLoading(false);
            }
        }
    };

    const handleDeleteImage = async () => {
        try {
            const variables = SendCroppedImageVariables(data.profileCode, 'STUDENT', 'data:(.+);base64,', 'DELETE');
            await request(MutationSendCroppedImage, variables);

            enqueueSnackbar('Foto da matricula excluída com sucesso!', { variant: 'success' });
            refresh?.();
        } catch (error: unknown) {
            setAttemptCount(prevCount => prevCount + 1);
            if (attemptCount >= 5) {
                return enqueueSnackbar('Erro ao excluir foto da matricula. Entre em contato com nosso suporte.', { variant: 'error' });
            }

            const genericError = 'Ops! Algo deu errado ao excluir foto da matricula. Tente novamente!'
            const errorMessage = GetErrorMessage(error, genericError);
            enqueueSnackbar(errorMessage, { variant: 'error' });
        }
    };

    const [anchorEls, setAnchorEls] = useState<{ [key: string]: HTMLElement | null }>({});

    // Função para abrir o menu
    const handleOpenMore = (event: React.MouseEvent<HTMLElement>, transactionCode: string) => {
        setAnchorEls((prev) => ({ ...prev, [transactionCode]: event.currentTarget }));
    };

    // Função para fechar o menu
    const handleCloseMore = (transactionCode: string) => {
        setAnchorEls((prev) => ({ ...prev, [transactionCode]: null }));
    };

    const handleMoreDetails = (transactionCode: string) => {
        const transactionDetail = responseTransactions?.findTransactions?.find((transaction) => transaction.transactionCode === transactionCode);

        setTransactionDetail(transactionDetail);

        openDrawer('TransactionDetail');
        handleCloseMore(transactionCode);
    };

    const handleMoreDetailsReview = (reviewCode: string) => {
        const reviewDetail = responseReviews?.findReviews?.find((review) => review.reviewCode === reviewCode);

        setReviewDetail(reviewDetail);

        openDrawer('ReviewDetail');
        handleCloseMore(reviewCode);
    };

    const handleStudentPlansMoreDetails = (studentPlanCode: string) => {
        const studentPlanDetail = responseStudentPlans?.findStudentPlans?.find((plan) => plan.studentPlanCode === studentPlanCode);

        setStudentPlanDetail(studentPlanDetail);

        openDrawer('StudentPlanDetail');
        handleCloseMore(studentPlanCode);
    };

    const handleReceiveTransaction = (transactionCode: string) => {
        const transactionDetail = responseTransactions?.findTransactions?.find((transaction) => transaction.transactionCode === transactionCode);

        setTransactionDetail(transactionDetail);

        openDrawer('ReceiveTransaction');
        handleCloseMore(transactionCode);
    };

    const handleReversedTransaction = (transactionCode: string) => {
        const transactionDetail = responseTransactions?.findTransactions?.find((transaction) => transaction.transactionCode === transactionCode);

        setTransactionDetail(transactionDetail);

        openDrawer('ReversedTransaction');
        handleCloseMore(transactionCode);
    };

    const handleAlterTransaction = (transactionCode: string) => {
        const transactionDetail = responseTransactions?.findTransactions?.find((transaction) => transaction.transactionCode === transactionCode);

        setTransactionDetail(transactionDetail);

        openDrawer('EditTransaction');
        handleCloseMore(transactionCode);
    };

    const handleAlterReview = (reviewCode: string) => {
        const reviewDetail = responseReviews?.findReviews?.find((review) => review.reviewCode === reviewCode);

        setReviewDetail(reviewDetail);

        openDrawer('ReviewEdit');
        handleCloseMore(reviewCode);
    };

    const handleCreateTransaction = () => {
        setTransactionDetail({
            request: 'STUDENT',
            profileCode: data.profileCode,
            ...transactionDetail
        } as TransactionData);
        openDrawer('CreateTransaction');
    };

    const handleStudentPlanCreate = () => {
        openDrawer('StudentPlanCreate');
    };

    const handleAdvancedSearch = () => {
        setAdvancedSearch((prevState) => !prevState);

        if (advancedSearch) {
            setSelectedStatus([]);
        }
    };

    const handleReviewCreate = () => {
        setReviewCreate((prevState) => !prevState);
    };

    useEffect(() => {
        if (modalConfirmCancel) {
            const handleKeyDown = (event: KeyboardEvent) => {
                event.stopPropagation(); // Impede que o evento afete o menu
            };
    
            document.addEventListener("keydown", handleKeyDown, true);
    
            return () => {
                document.removeEventListener("keydown", handleKeyDown, true);
            };
        }
    }, [modalConfirmCancel]);

    const handleConfirmCancel = () => {
        setModalConfirmCancel(true);
        setCancelReason('');
    };

    const handleCloseConfirmCancel = () => {
        setModalConfirmCancel(false);
        setCancelReason('');
    };

    const handleCancelTransaction = async (transactionCode: string) => {
        try {
            const variables = {
                data: {
                    operation: 'UPDATE',
                    input: {
                        transactionCode: Number(transactionCode),
                        action: 'CANCEL',
                        canceledReason: cancelReason,
                        canceledUserCode: profileCode,
                    },
                },
            }

            await request(MutationTransactionsUpSert, variables);
            setModalConfirmCancel(false);
            handleCloseMore(transactionCode);

            enqueueSnackbar('Transação cancelada com sucesso', { variant: 'success' });
            refreshInternal('findTransactions');
        } catch (error: unknown) {
            setAttemptCount(prevCount => prevCount + 1);
            if (attemptCount >= 5) {
                return enqueueSnackbar('Erro ao cancelar transação. Entre em contato com nosso suporte.', { variant: 'error' });
            }

            const genericError = 'Ops! Algo deu errado ao cancelar transação. Tente novamente!'
            const errorMessage = GetErrorMessage(error, genericError);
            enqueueSnackbar(errorMessage, { variant: 'error' });
        }
    };

    const handleConfirmReprocess = () => {
        setModalConfirmReprocess(true);
    };

    const handleCloseConfirmReprocess = () => {
        setModalConfirmReprocess(false);
    };

    const handleReprocessTransaction = async (transactionCode: string) => {
        try {
            const variables = {
                data: {
                    operation: 'UPDATE',
                    input: {
                        transactionCode: Number(transactionCode),
                        action: 'REPROCESS',
                    },
                },
            }

            await request(MutationTransactionsUpSert, variables);
            setModalConfirmReprocess(false);
            handleCloseMore(transactionCode);

            enqueueSnackbar('Transação reprocessada com sucesso', { variant: 'success' });
            refreshInternal('findTransactions');
        } catch (error: unknown) {
            setAttemptCount(prevCount => prevCount + 1);
            if (attemptCount >= 5) {
                return enqueueSnackbar('Erro ao reprocessar transação. Entre em contato com nosso suporte.', { variant: 'error' });
            }

            const genericError = 'Ops! Algo deu errado ao reprocessar transação. Tente novamente!'
            const errorMessage = GetErrorMessage(error, genericError);
            enqueueSnackbar(errorMessage, { variant: 'error' });
        }
    };

    const handleConfirmDelete = () => {
        setModalConfirmDelete(true);
    };

    const handleCloseConfirmDelete = () => {
        setModalConfirmDelete(false);
    };
    
    const handleDeleteTransaction = async (transactionCode: string) => {
        const code = Number(transactionCode);

        try {
            const variables = {
                data: {
                    operation: 'DELETE',
                    input: {
                        transactionCode: code,
                    }
                }
            };

            await request(MutationTransactionsUpSert, variables);
            setModalConfirmDelete(false);
            handleCloseMore(transactionCode);

            enqueueSnackbar('Transação excluída com sucesso', { variant: 'success' });
            refreshInternal('findTransactions');
        } catch (error: unknown) {
            setAttemptCount(prevCount => prevCount + 1);
            if (attemptCount >= 5) {
                return enqueueSnackbar('Erro ao excluir transação. Entre em contato com nosso suporte.', { variant: 'error' });
            }

            const genericError = 'Ops! Algo deu errado ao excluir transação. Tente novamente!'
            const errorMessage = GetErrorMessage(error, genericError);
            enqueueSnackbar(errorMessage, { variant: 'error' });
        }
    };

    const handleDeleteReview = async (reviewCode: string) => {
        const code = Number(reviewCode);

        try {
            const variables = {
                input: {
                    action: 'DELETE',
                    reviewCode: code,
                    companyCode: companyCode,
                    studentCode: Number(data.profileCode),
                }
            };

            await request(MutationReviewUpsert, variables);
            setModalConfirmDelete(false);
            handleCloseMore(reviewCode);

            enqueueSnackbar('Avaliação excluída com sucesso', { variant: 'success' });
            refreshInternal('findReviews');
        } catch (error: unknown) {
            setAttemptCount(prevCount => prevCount + 1);
            if (attemptCount >= 5) {
                return enqueueSnackbar('Erro ao excluir avaliação. Entre em contato com nosso suporte.', { variant: 'error' });
            }

            const genericError = 'Ops! Algo deu errado ao excluir avaliação. Tente novamente!'
            const errorMessage = GetErrorMessage(error, genericError);
            enqueueSnackbar(errorMessage, { variant: 'error' });
        }
    };

    const refreshInternal = async (source: unknown) => {

        switch (source) {
            case 'findTransactions':
                await findTransactions();
                break;

            case 'findStudentPlans':
                await findStudentPlans();
                break;

            case 'findReviews':
                await findReviews();
                break;
            
            default:
                break;
        }
    };
    
    const isMenuOpen = (profileCode: string) => Boolean(anchorEls[profileCode]);

    const handleSelectChange = (
        newValue: SingleValue<OptionSelect> | MultiValue<OptionSelect>,
        fieldName: string
    ) => {
        let selectedValues: string | string[];

        if (fieldName === 'status') {
            selectedValues = Array.isArray(newValue)
                ? (newValue as OptionSelect[]).map(option => option.value)
                : (newValue as OptionSelect)?.value
                ? [(newValue as OptionSelect).value]
                : [];
            setSelectedStatus(selectedValues);
        }
    };

    const [focusedFields, setFocusedFields] = useState<{
        status: boolean;
    }>({
        status: false,
    });

    const handleFocus = (field: string, value: boolean) => {
        setFocusedFields((prev) => ({ ...prev, [field]: value }));
    };

    const filterStatusOptions = [
        { value: 'noSelect', label: 'Selecione um ou mais status', isDisabled: true },
        { value: 'CANCELED', label: 'Cancelado' },
        { value: 'FAILED', label: 'Falhou' },
        { value: 'PAID', label: 'Pago' },
        { value: 'PARTIALLY_REVERSED', label: 'Reembolso Parcial' },
        { value: 'PENDING', label: 'Pendente' },
        { value: 'PENDING_REVERSED', label: 'Reembolso Pendente' },
        { value: 'REVERSED', label: 'Reembolsado' },
    ];

    const handleStatusPlan = async (studentCode: string, studentPlanCode: string, status: string) => {
        try {
            const variables = {
                data: {
                    origin: 'GYM',
                    type: 'UPDATE',
                    input: {
                        action: 'HANDLE_STATUS_PLAN',
                        studentCode: Number(studentCode),
                        studentPlanCode: Number(studentPlanCode),
                        status: status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE',
                    }
                }
            };

            await request(MutationStudentUpsert, variables);

            const message = status === 'ACTIVE' 
            ? 'Plano do aluno desativado com sucesso!' 
            : 'Plano do aluno ativado com sucesso!';
            enqueueSnackbar(message, { variant: 'success' });
            refreshInternal('findStudentPlans');
        } catch (error: unknown) {
            setAttemptCount(prevCount => prevCount + 1);
            if (attemptCount >= 5) {
                return enqueueSnackbar('Erro ao ativar/desativar plano do aluno. Entre em contato com nosso suporte.', { variant: 'error' });
            }

            const genericError = 'Ops! Algo deu errado ao ativar/desativar plano do aluno. Tente novamente!'
            const errorMessage = GetErrorMessage(error, genericError);
            enqueueSnackbar(errorMessage, { variant: 'error' });
        }
    };

    return {
        anchorEls,
        handleOpenMore,
        handleCloseMore,
        handleAlterTransaction,
        handleDeleteTransaction,
        handleConfirmDelete,
        handleMoreDetails,
        handleMoreDetailsReview,
        isMenuOpen,
        modalConfirmDelete,
        handleCloseConfirmDelete,
        itemsPerPage,
        handleItemsPerPageChange,
        startIndex,
        endIndex,
        totalItems,
        totalItemsPlans,
        totalItemsReviews,
        totalPages,
        totalPagesPlans,
        totalPagesReviews,
        currentPage,
        handlePageChange,
        searchText,
        setSearchText,
        isLoading,
        handleDeleteImage,
        renderDrawerContent,
        isDrawerOpen,
        openDrawer,
        closeDrawer,
        closeDrawerDetails,
        handleImageUpload,
        handleCrop,
        image,
        croppedImage,
        isDialogOpen,
        setIsDialogOpen,
        cropperRef,
        setActiveView,
        activeView,
        detailsViews,
        setHoveredView,
        hoveredView,
        transactions,
        pendingTotal,
        formatAmount,
        advancedSearch,
        handleSelectChange,
        handleFocus,
        focusedFields,
        filterStatusOptions,
        selectedStatus,
        handleAdvancedSearch,
        handleReprocessTransaction,
        handleConfirmReprocess,
        handleCloseConfirmReprocess,
        modalConfirmReprocess,
        handleCancelTransaction,
        handleConfirmCancel,
        handleCloseConfirmCancel,
        modalConfirmCancel,
        handleReversedTransaction,
        handleReasonChange,
        cancelReason,
        handleReceiveTransaction,
        handleCreateTransaction,
        responseTransactions,
        studentPlans,
        handleStatusPlan,
        handleStudentPlanCreate,
        handleStudentPlansMoreDetails,
        handleReviewCreate,
        responseReviewQuestions,
        reviews,
        reviewCreate,
        startIndexPlans,
        endIndexPlans,
        startIndexReviews,
        endIndexReviews,
        handleDeleteReview,
        handleAlterReview
    };
};

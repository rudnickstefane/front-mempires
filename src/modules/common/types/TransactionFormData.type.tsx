export type TransactionFormData = {
    description?: string;
    dueDate?: string;
    type?: string;
    reversed?: string;
    fees?: string;
    reversedReason?: string;
    reversedType?: string;
    receiveType?: string;
    amount?: string;
    change?: string;
    canceledReason?: string;
    paymentMethod?: string;
    secondaryPaymentMethod?: string;
    mainAmount?: string;
    secondaryAmount?: string;
    missingValue?: string;
    proofPayment?: string;
    rewardsCredit?: string;
    yesConvert?: boolean;
    noConvert?: boolean;
}
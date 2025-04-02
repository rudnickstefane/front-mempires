export type VisitRegisterFormErrors = {
    nameError: string;
    identityError: string;
    referralSourceError: string;
    modalitiesError: string;
    emailError: string;
    phoneError: string;
    indicationSearchError: string;
    searchFindStudentError: string;
    [key: string]: string | number | boolean | string[] | null;
}
import { useState } from "react";

export function useSignatureForm() {
    const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

    const handlePlanSelection = (plan: string) => {
        setSelectedPlan(selectedPlan === plan ? null : plan);
    };

    const plans = {
        Essential: {
            name: "Essential",
            monthly: "199,90",
            quarterly: "539,90",
            yearly: "1.919,00",
            quarterlyMonthly: "179,97",
            yearlyMonthly: "159,92",
            features: [
                "Alunos Ilimitados",
                "Check-in & Check-out",
                "Integrações",
                "Fornecedores",
                "Nutricionistas",
                "Personal Trainers",
            ],
        },
        Business: {
            name: "Business",
            monthly: "399,90",
            quarterly: "1.079,90",
            yearly: "3.839,00",
            quarterlyMonthly: "359,97",
            yearlyMonthly: "319,92",
            features: [
                "Aplicativo",
                "Programas",
                "Relatórios Completos",
            ],
        },
        Imaginative: {
            name: "Imaginative",
            monthly: "699,90",
            quarterly: "1.889,90",
            yearly: "6.719,00",
            quarterlyMonthly: "629,97",
            yearlyMonthly: "559,92",
            features: [
                "Relatórios Avançados",
                "Programas Exclusivos",
                "Site da Academia",
            ],
        },
    };

    return {
        plans,
        selectedPlan,
        setSelectedPlan: handlePlanSelection,
    };
}
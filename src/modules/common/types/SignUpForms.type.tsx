export type SignUpForms = {
    Gym: 'Gym',
    Supplier: 'Supplier',
    Nutritionist: 'Nutritionist',
    Personal: 'Personal Trainer',
};

export type SignUpFormsType = keyof SignUpForms;
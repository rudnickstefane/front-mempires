export type SignUpForms = {
    Gym: 'Gym',
    Supplier: 'Supplier',
    Nutritionist: 'Nutritionist',
    PersonalTrainer: 'Personal Trainer',
};

export type SignUpFormsType = keyof SignUpForms;
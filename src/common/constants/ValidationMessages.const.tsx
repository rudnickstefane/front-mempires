export const validationMessages = {
  required: "Este campo tem o preenchimento obrigatório.",
  invalidEmail: "O e-mail informado é inválido.",
  minItems: (min: number) => `Adicione pelo menos ${min} contato(s).`,
  maxLength: (max: number) => `Máximo de ${max} caracteres permitidos.`,
};

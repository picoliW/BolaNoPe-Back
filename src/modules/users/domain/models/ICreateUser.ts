export interface ICreateUser {
  name: string;
  cpf: string;
  birth: string;
  email: string;
  password: string;
  cep: string;
  patio?: string;
  complement?: string;
  neighborhood?: string;
  locality?: string;
  uf?: string;
}

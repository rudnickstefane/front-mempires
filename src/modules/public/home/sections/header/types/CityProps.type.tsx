export type CityPropsType = {
    id: number;
    nome: string;
    microrregiao: {
        id: number;
        nome: string;
        mesorregiao: {
        id: number;
        nome: string;
        UF: {
            id: number;
            nome: string;
            sigla: string;
        }
        }
    }
}
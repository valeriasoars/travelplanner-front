export interface ResponseModel<T>{
    mensagem: string,
    erro: string,
    token: string,
    dados: T,
    saldo: T
}
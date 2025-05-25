export enum StatusViagem {
  EmPlanejamento = 'em planejamento',
  Cancelada = 'cancelada',
  Concluida = 'concluída'
}

export interface ViagemModel{
    _id: string,
    destino: string,
    orcamentoTotal: number,
    dataInicio: Date,
    dataFim: Date,
    // status: StatusViagem
}
export interface Cliente {
    id: number,
    noCliente: string,
    celCliente: string,
    emailCliente: string
}

export interface ClienteComanda {
    noCliente: string,
}

export interface Produto {
    id: number,
    noProduto: string,
    vrProduto: number,
    idTipoProduto: number,
    tipoProduto: string
}

export interface Comanda {
    id: number,
    noCliente: string,
    situacaoComanda: string,
    dtComanda: string,
    vrComanda: number,
}

export interface Lancamento {
    id: number,
    noProduto: string,
    quantidade: number,
    dtLancamento: string,
    vrUnitario: number,
    vrTotal: number,
}

export interface Pagamento {
    id: number,
    tipoPagamento: string,
    dtPagamento: string,
    vrPagamento: number,
}

export interface RelatorioPagamento {
    id: number,
    idComanda: number,
    noCliente: string,
    tipoPagamento: string,
    dtPagamento: string,
    vrPagamento: number,
}

export interface RelatorioProduto {
    idProduto: number,
    noProduto: string,
    quantidade: string,
    vrUnitario: number,
    vrTotal: number,
}

export interface Categoria {
    id: number,
    noTipoProduto: string,
}

export interface Comanda {
    idCliente: number,
    situacaoComanda: string,
}

export interface Usuario {
    id: number,
    noUsuario: string,
    perfil: string,
}

export interface Home {
    sistema: string,
    link: string
    icon: string
}

export interface User {
    id: number,
    noUsuario: string,
    perfil: string,
    token: string
}

export interface UserToAuth {
    noUsuario: string,
    coSenha: string,
}

export interface Options {
    label: string,
    value: number
}
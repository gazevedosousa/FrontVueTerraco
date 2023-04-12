import { QTableProps } from "quasar";

export const colunaCliente: QTableProps['columns'] = [
  {
    name: 'id',
    required: true,
    label: '#',
    align: 'center',
    field: 'id',
    sortable: true
  },
  {
    name: 'noCliente',
    required: true,
    label: 'Cliente',
    align: 'center',
    field: 'noCliente',
    sortable: true
  },
  {
    name: 'celCliente',
    required: true,
    label: 'Celular',
    align: 'center',
    field: 'celCliente',
    sortable: true
  },
  {
    name: 'emailCliente',
    required: true,
    label: 'Email',
    align: 'center',
    field: 'emailCliente',
    sortable: true
  },
  {
    name: 'acoes',
    required: true,
    label: 'Ações',
    align: 'center',
    field: row => row
  },
];

export const colunaCadastroComanda: QTableProps['columns'] = [
  {
    name: 'noCliente',
    required: true,
    label: 'Cliente',
    align: 'center',
    field: 'noCliente',
    sortable: true
  }
];

export const colunaComanda: QTableProps['columns'] = [
  {
    name: 'id',
    required: true,
    label: '#',
    align: 'center',
    field: 'id',
    sortable: true
  },
  {
    name: 'noCliente',
    required: true,
    label: 'Cliente',
    align: 'center',
    field: 'noCliente',
    sortable: true
  },
  {
    name: 'situacaoComanda',
    required: true,
    label: 'Situação',
    align: 'center',
    field: 'situacaoComanda',
    sortable: true,
  },
  {
    name: 'dtComanda',
    required: true,
    label: 'Data da Comanda',
    align: 'center',
    field: 'dtComanda',
    sortable: true,
  },
  {
    name: 'vrComanda',
    required: true,
    label: 'Valor da Comanda',
    align: 'center',
    field: 'vrComanda',
    sortable: true
  },
  {
    name: 'acoes',
    required: true,
    label: 'Ações',
    align: 'center',
    field: row => row
  }
];

export const colunaLancamentos: QTableProps['columns'] = [
  {
    name: 'id',
    required: true,
    label: '#',
    align: 'center',
    field: 'id',
    sortable: true
  },
  {
    name: 'noProduto',
    required: true,
    label: 'Produto',
    align: 'center',
    field: 'noProduto',
    sortable: true
  },
  {
    name: 'dtLancamento',
    required: true,
    label: 'Data do Lançamento',
    align: 'center',
    field: 'dtLancamento',
    sortable: true,
  },
  {
    name: 'vrUnitario',
    required: true,
    label: 'Valor Unitário',
    align: 'center',
    field: 'vrUnitario',
    sortable: true
  },
  {
    name: 'quantidade',
    required: true,
    label: 'Quantidade',
    align: 'center',
    field: 'quantidade',
    sortable: true,
  },
  {
    name: 'vrTotal',
    required: true,
    label: 'Valor Total',
    align: 'center',
    field: 'vrTotal',
    sortable: true
  },
  {
    name: 'acoes',
    required: true,
    label: 'Ações',
    align: 'center',
    field: row => row
  }
];

export const colunaPagamentos: QTableProps['columns'] = [
  {
    name: 'id',
    required: true,
    label: '#',
    align: 'center',
    field: 'id',
    sortable: true
  },
  {
    name: 'tipoPagamento',
    required: true,
    label: 'Tipo de Pagamento',
    align: 'center',
    field: 'tipoPagamento',
    sortable: true
  },
  {
    name: 'dtPagamento',
    required: true,
    label: 'Data do Pagamento',
    align: 'center',
    field: 'dtPagamento',
    sortable: true,
  },
  {
    name: 'vrPagamento',
    required: true,
    label: 'Valor do Pagamento',
    align: 'center',
    field: 'vrPagamento',
    sortable: true
  },
  {
    name: 'acoes',
    required: true,
    label: 'Ações',
    align: 'center',
    field: row => row
  }
];

export const colunaHome: QTableProps['columns'] = [
  {
    name: 'sistema',
    required: true,
    label: 'Menu',
    align: 'center',
    field: 'sistema',
  },
  {
    name: 'acoes',
    required: true,
    label: 'Link',
    align: 'center',
    field: row => row
  }
];

export const colunaCategoria: QTableProps['columns'] = [
  {
    name: 'id',
    required: true,
    label: '#',
    align: 'center',
    field: 'id',
    sortable: true
  },
  {
    name: 'noTipoProduto',
    required: true,
    label: 'Categoria',
    align: 'center',
    field: 'noTipoProduto',
    sortable: true
  },
  {
    name: 'acoes',
    required: true,
    label: 'Ações',
    align: 'center',
    field: row => row
  },
];

export const colunaProduto: QTableProps['columns'] = [
  {
    name: 'id',
    required: true,
    label: '#',
    align: 'center',
    field: 'id',
    sortable: true
  },
  {
    name: 'noProduto',
    required: true,
    label: 'Produto',
    align: 'center',
    field: 'noProduto',
    sortable: true
  },
  {
    name: 'tipoProduto',
    required: true,
    label: 'Categoria',
    align: 'center',
    field: 'tipoProduto',
    sortable: true
  },
  {
    name: 'vrProduto',
    required: true,
    label: 'Valor',
    align: 'center',
    field: 'vrProduto',
    sortable: true
  },
  {
    name: 'acoes',
    required: true,
    label: 'Ações',
    align: 'center',
    field: row => row
  },
];

export const colunaRelatorioPagamento: QTableProps['columns'] = [
  {
    name: 'id',
    required: true,
    label: '#',
    align: 'center',
    field: 'id',
    sortable: true
  },
  {
    name: 'idComanda',
    required: true,
    label: '# Comanda',
    align: 'center',
    field: 'idComanda',
    sortable: true
  },
  {
    name: 'noCliente',
    required: true,
    label: 'Cliente',
    align: 'center',
    field: 'noCliente',
    sortable: true
  },
  {
    name: 'tipoPagamento',
    required: true,
    label: 'Tipo de Pagamento',
    align: 'center',
    field: 'tipoPagamento',
    sortable: true
  },
  {
    name: 'dtPagamento',
    required: true,
    label: 'Data do Pagamento',
    align: 'center',
    field: 'dtPagamento',
    sortable: true,
  },
  {
    name: 'vrPagamento',
    required: true,
    label: 'Valor do Pagamento',
    align: 'center',
    field: 'vrPagamento',
    sortable: true
  }
];

export const colunaRelatorioProduto: QTableProps['columns'] = [
  {
    name: 'idProduto',
    required: true,
    label: '#',
    align: 'center',
    field: 'idProduto',
    sortable: true
  },
  {
    name: 'noProduto',
    required: true,
    label: 'Produto',
    align: 'center',
    field: 'noProduto',
    sortable: true
  },
  {
    name: 'quantidade',
    required: true,
    label: 'Quantidade',
    align: 'center',
    field: 'quantidade',
    sortable: true
  },
  {
    name: 'vrUnitario',
    required: true,
    label: 'Valor Unitário',
    align: 'center',
    field: 'vrUnitario',
    sortable: true
  },
  {
    name: 'vrTotal',
    required: true,
    label: 'Valor Total',
    align: 'center',
    field: 'vrTotal',
    sortable: true
  }
];

export const colunaUsuario: QTableProps['columns'] = [
  {
    name: 'id',
    required: true,
    label: '#',
    align: 'center',
    field: 'id',
    sortable: true
  },
  {
    name: 'noUsuario',
    required: true,
    label: 'Usuário',
    align: 'center',
    field: 'noUsuario',
    sortable: true
  },
  {
    name: 'perfil',
    required: true,
    label: 'Perfil',
    align: 'center',
    field: 'perfil',
    sortable: true
  },
  {
    name: 'acoes',
    required: true,
    label: 'Ações',
    align: 'center',
    field: row => row
  },
];
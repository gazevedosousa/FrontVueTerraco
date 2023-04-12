import { formatPrice, formatDate } from "src/services/utils/utils";
import { Lancamento, Pagamento, RelatorioPagamento, RelatorioProduto } from "src/interfaces/interfaces";

export const detalhaComandaPdfTable = (lancamentos: Array<Lancamento>, 
    pagamentos: Array<Pagamento>, 
    id: Number, 
    situacaoComanda: string,
    vrTotalLancamentos: number,
    vrTotalPagamentos: number,
    vrComanda: number,
    noCliente: string) => {
let table = "<div class='text-h4 q-mt-lg q-mb-lg'>Comanda " + id + " - " + noCliente + "</div>"
    table += "<div class='q-table__container q-table--horizontal-separator column no-wrap q-table--no-wrap'>";
    table +=      "<div class='q-table__top row items-center'>";
    table +=        "<div class='q-table__control'>";
    table +=          "<div class='q-table__title'>Lançamentos</div>" +
                    "</div>" +
                "</div>";
    table +=        "<table class='q-table>";
    table +=          "<thead>";
    table +=            "<tr>";
    table +=              "<th class='q-th text-center'></th>";
    table +=              "<th class='q-th text-center'>#</th>";
    table +=              "<th class='q-th text-center'>Produto</th>";
    table +=              "<th class='q-th text-center'>Data do Lançamento</th>";
    table +=              "<th class='q-th text-center'>Valor Unitário</th>";
    table +=              "<th class='q-th text-center'>Quantidade</th>";
    table +=              "<th class='q-th text-center'>Valor Total</th>";
    table +=            "</tr>";
    table +=          "</thead>";
    table +=          "<tbody>";

lancamentos.map(lancamento => {
    table += "<tr class='q-tr'>";
    table +=  "<td class='q-td text-center'>" + lancamento.id + "</td>";
    table +=  "<td class='q-td text-center'>" + lancamento.noProduto + "</td>";
    table +=  "<td class='q-td text-center'>" + formatDate(lancamento.dtLancamento) + "</td>";
    table +=  "<td class='q-td text-center'>" + formatPrice(lancamento.vrUnitario) + "</td>";
    table +=  "<td class='q-td text-center'>" + lancamento.quantidade + "</td>";
    table +=  "<td class='q-td text-center'>" + formatPrice(lancamento.vrTotal) + "</td>";
    table += "</tr>";
})

    table += "</tbody>";
    table += "</table>";
    table += "</div>";
    table += "</div>";

    table += "<div class='q-table__container q-table--horizontal-separator column no-wrap q-table--no-wrap q-mt-lg q-mb-lg'>";
    table +=      "<div class='q-table__top row items-center'>";
    table +=        "<div class='q-table__control'>";
    table +=          "<div class='q-table__title'>Pagamentos</div>" +
                    "</div>" +
                "</div>";
    table +=        "<table class='q-table>";
    table +=          "<thead>";
    table +=            "<tr>";
    table +=              "<th class='q-th text-center'></th>";
    table +=              "<th class='q-th text-center'>#</th>";
    table +=              "<th class='q-th text-center'>Tipo de Pagamento</th>";
    table +=              "<th class='q-th text-center'>Data do Pagamento</th>";
    table +=              "<th class='q-th text-center'>Valor do Pagamento</th>";
    table +=            "</tr>";
    table +=          "</thead>";
    table +=          "<tbody>";

    pagamentos.map(pagamento => {
        table += "<tr class='q-tr'>";
        table +=  "<td class='q-td text-center'>" + pagamento.id + "</td>";
        table +=  "<td class='q-td text-center'>" + pagamento.tipoPagamento + "</td>";
        table +=  "<td class='q-td text-center'>" + formatDate(pagamento.dtPagamento) + "</td>";
        table +=  "<td class='q-td text-center'>" + formatPrice(pagamento.vrPagamento) + "</td>";
        table += "</tr>";
    })

    table += "</tbody>";
    table += "</table>";
    table += "</div>";
    table += "</div>";

    table += "<div class='q-mt-lg text-center'>";
    table +=  "<div class='q-card__section q-card__section--vert text-subtitle1 text-weight-bold'>";
    table +=    "Situação da Comanda - " + situacaoComanda;
    table +=  "</div>";
    table +=  "<div class='q-card__section q-card__section--vert text-subtitle1'>";
    table +=    "Valor total de Lançamentos - " + formatPrice(vrTotalLancamentos);
    table +=  "</div>";
    table +=  "<div class='q-card__section q-card__section--vert text-subtitle1'>";
    table +=    "Valor total de Pagamentos - " + formatPrice(vrTotalPagamentos);
    table +=  "</div>";
    table +=  "<div class='q-card__section q-card__section--vert text-subtitle1 text-weight-bold'>";
    table +=    "Total a Pagar - " + formatPrice(vrComanda);
    table +=  "</div>";
    table += "</div>";

    return table;
}

export const pagamentosPdfTable = (data: String, 
    pagamentos: Array<RelatorioPagamento>, 
    vrTotalPagamentos: number) => {
let table = "<div class='text-h4 q-mt-lg q-mb-lg'>Relatório de pagamentos - " + data + "</div>"
    table += "<div class='q-table__container q-table--horizontal-separator column no-wrap q-table--no-wrap'>";
    table +=        "<table class='q-table>";
    table +=          "<thead>";
    table +=            "<tr>";
    table +=              "<th class='q-th text-center'></th>";
    table +=              "<th class='q-th text-center'>#</th>";
    table +=              "<th class='q-th text-center'># Comanda</th>";
    table +=              "<th class='q-th text-center'>Cliente</th>";
    table +=              "<th class='q-th text-center'>Tipo de Pagamento</th>";
    table +=              "<th class='q-th text-center'>Data do Pagamento</th>";
    table +=              "<th class='q-th text-center'>Valor do Pagamento</th>";
    table +=            "</tr>";
    table +=          "</thead>";
    table +=          "<tbody>";

    pagamentos.map(pagamento => {
        table += "<tr class='q-tr'>";
        table +=  "<td class='q-td text-center'>" + pagamento.id + "</td>";
        table +=  "<td class='q-td text-center'>" + pagamento.idComanda + "</td>";
        table +=  "<td class='q-td text-center'>" + pagamento.noCliente + "</td>";
        table +=  "<td class='q-td text-center'>" + pagamento.tipoPagamento + "</td>";
        table +=  "<td class='q-td text-center'>" + formatDate(pagamento.dtPagamento) + "</td>";
        table +=  "<td class='q-td text-center'>" + formatPrice(pagamento.vrPagamento) + "</td>";
        table += "</tr>";
    })

    table += "</tbody>";
    table += "</table>";
    table += "</div>";
    table += "</div>";

    table += "<div class='q-mt-lg text-center'>";
    table +=  "<div class='q-card__section q-card__section--vert text-subtitle1 text-weight-bold'>";
    table +=    "Valor Total dos Pagamentos - " + formatPrice(vrTotalPagamentos);
    table +=  "</div>";
    table += "</div>";

    return table;
}

export const produtosPdfTable = (data: String, 
    produtos: Array<RelatorioProduto>, 
    vrTotal: number) => {
let table = "<div class='text-h4 q-mt-lg q-mb-lg'>Relatório de produtos - " + data + "</div>"
    table += "<div class='q-table__container q-table--horizontal-separator column no-wrap q-table--no-wrap'>";
    table +=        "<table class='q-table>";
    table +=          "<thead>";
    table +=            "<tr>";
    table +=              "<th class='q-th text-center'></th>";
    table +=              "<th class='q-th text-center'>#</th>";
    table +=              "<th class='q-th text-center'>Produto</th>";
    table +=              "<th class='q-th text-center'>Quantidade</th>";
    table +=              "<th class='q-th text-center'>Valor Unitário</th>";
    table +=              "<th class='q-th text-center'>Valor Total</th>";
    table +=            "</tr>";
    table +=          "</thead>";
    table +=          "<tbody>";

    produtos.map(produto => {
        table += "<tr class='q-tr'>";
        table +=  "<td class='q-td text-center'>" + produto.idProduto + "</td>";
        table +=  "<td class='q-td text-center'>" + produto.noProduto + "</td>";
        table +=  "<td class='q-td text-center'>" + produto.quantidade + "</td>";
        table +=  "<td class='q-td text-center'>" + formatPrice(produto.vrUnitario) + "</td>";
        table +=  "<td class='q-td text-center'>" + formatPrice(produto.vrTotal) + "</td>";
        table += "</tr>";
    })

    table += "</tbody>";
    table += "</table>";
    table += "</div>";
    table += "</div>";

    table += "<div class='q-mt-lg text-center'>";
    table +=  "<div class='q-card__section q-card__section--vert text-subtitle1 text-weight-bold'>";
    table +=    "Valor Total da Venda dos Produtos - " + formatPrice(vrTotal);
    table +=  "</div>";
    table += "</div>";

    return table;
}
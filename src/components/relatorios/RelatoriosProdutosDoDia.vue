<template>
    <div class="q-pa-md">
      <q-table
        :title="`Relatório de Produtos - Data ${formatDate((data as string))}`"
        :rows="relatorio"
        :columns="colunaRelatorioProduto"
        row-key="id"
        :filter="filter"
        rows-per-page-label="Registros por página"
        :pagination-label="(firstRowIndex, endRowIndex, totalRowsNumber) => {
          return `Registros ${firstRowIndex} - ${endRowIndex} de ${totalRowsNumber} registros`
        }"
        no-data-label="Nenhum Registro Encontrado"
        no-results-label="Nenhum Registro Encontrado">
      <template v-slot:top-right>
            <BtnDownloadPDF tooltip="Download PDF" @download-p-d-f="dowloadPdf()"/>
            <BtnLink
              tooltip="Relatórios"
              icon-name="manage_search"
              @route-push="() => router.push('/relatorios')" />
            <q-input dense debounce="300" color="grey-9" v-model="filter">
                <template v-slot:append>
                    <q-icon name="search" />
                </template>
            </q-input>
        </template>
        <template v-slot:body="props">
            <q-tr :props="props" >
                <q-td key="idProduto" :props="props">
                    {{ props.row.idProduto }}
                </q-td>
                <q-td key="noProduto" :props="props">
                    {{ props.row.noProduto }}
                </q-td>
                <q-td key="dtLancamento" :props="props">
                    {{ formatDate(props.row.dtLancamento) }}
                </q-td>
                <q-td key="quantidade" :props="props">
                    {{ props.row.quantidade }}
                </q-td>
                <q-td key="vrUnitario" :props="props">
                    {{ formatPrice(props.row.vrUnitario) }}
                </q-td>
                <q-td key="vrTotal" :props="props">
                    {{ formatPrice(props.row.vrTotal) }}
                </q-td>
            </q-tr>
        </template>
      </q-table>
      <CardRelatorioProduto :vrTotal="formatPrice(vrTotal)"/> 
    </div>
</template>

<script setup lang="ts">
    import { useRouter, useRoute } from 'vue-router';
    import { ref } from 'vue';
    import { useQuasar } from 'quasar';
    import { RelatorioProduto } from 'src/interfaces/interfaces';
    import { colunaRelatorioProduto } from 'src/layouts/colunas/colunas';
    import { produtosPdfTable } from 'src/layouts/tabelas/tabelas';
    import { formatDate, formatPrice } from 'src/services/utils/utils';
    import ApiService from 'src/services/http/api';
    import BtnLink from 'src/components/shared/BtnLink.vue';
    import BtnDownloadPDF from 'src/components/shared/BtnDownloadPDF.vue';
    import CardRelatorioProduto from 'src/components/shared/CardRelatorioProduto.vue';
    //@ts-ignore
    import html2pdf from "html2pdf.js";

    const router = useRouter();
    const route = useRoute();
    const relatorio = ref<RelatorioProduto[]>();
    const filter = ref('');
    const vrTotal = ref(0);
    const $q = useQuasar();
    const api = new ApiService();

    const data = route.params.data;
    //@ts-ignore
    let getRows = [];
    let pegouProduto = false;
    
    $q.loading.show({
        delay: 400,
        message: 'Recuperando Informações do Banco de Dados'
    });

    api.get(`api/lancamentos/porData/${data}`)
        .then((response => {
            relatorio.value = response.data;
            relatorio.value?.map((relatorio => {
                if(getRows.length === 0){
                    getRows.push(
                        {
                            idProduto: relatorio.idProduto,
                            noProduto: relatorio.noProduto,
                            quantidade: relatorio.quantidade,
                            vrUnitario: relatorio.vrUnitario,
                            vrTotal: relatorio.vrTotal,
                        }
                    );
                } else {
                    //@ts-ignore
                    getRows.map((row) => {
                        if(row.idProduto == relatorio.idProduto && row.vrUnitario == relatorio.vrUnitario){
                            row.quantidade += relatorio.quantidade
                            row.vrTotal += relatorio.vrTotal
                            pegouProduto = true
                        } 
                    });
                    if(!pegouProduto){
                        //@ts-ignore
                        getRows.push(
                            {
                                idProduto: relatorio.idProduto,
                                noProduto: relatorio.noProduto,
                                quantidade: relatorio.quantidade,
                                vrUnitario: relatorio.vrUnitario,
                                vrTotal: relatorio.vrTotal,
                            }
                        );
                    }
                }

                pegouProduto = false;
                vrTotal.value += relatorio.vrTotal;
            }))
            //@ts-ignore
            relatorio.value = getRows;
        })).catch((e) => {
            $q.notify({
                color: 'negative',
                position: 'top',
                message: e.response.data,
                icon: 'report_problem'
            });
        }).finally(() => {
            $q.loading.hide();
        });

    const dowloadPdf = () => {
      //@ts-ignore
      const table = produtosPdfTable(formatDate((data as string)), relatorio.value, vrTotal.value);
                
      html2pdf(table, {
        filename: `Relatorio Produtos - ${formatDate((data as string))}`
      });
    }
</script>
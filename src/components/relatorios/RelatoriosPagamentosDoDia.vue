<template>
    <div class="q-pa-md">
      <q-table
        :title="`Relatório de Pagamentos - Data ${formatDate((data as string))}`"
        :rows="relatorio"
        :columns="colunaRelatorioPagamento"
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
                <q-td key="id" :props="props">
                    {{ props.row.id }}
                </q-td>
                <q-td key="idComanda" :props="props">
                    {{ props.row.idComanda }}
                </q-td>
                <q-td key="noCliente" :props="props">
                    {{ props.row.noCliente }}
                </q-td>
                <q-td key="tipoPagamento" :props="props">
                    {{ props.row.tipoPagamento }}
                </q-td>
                <q-td key="dtPagamento" :props="props">
                    {{ formatDate(props.row.dtPagamento) }}
                </q-td>
                <q-td key="vrPagamento" :props="props">
                    {{ formatPrice(props.row.vrPagamento) }}
                </q-td>
            </q-tr>
        </template>
      </q-table>
      <CardRelatorioPagamento :vrTotal="formatPrice(vrTotal)"/> 
    </div>
</template>

<script setup lang="ts">
    import { useRouter, useRoute } from 'vue-router';
    import { ref } from 'vue';
    import { useQuasar } from 'quasar';
    import { RelatorioPagamento } from 'src/interfaces/interfaces';
    import { colunaRelatorioPagamento } from 'src/layouts/colunas/colunas';
    import { pagamentosPdfTable } from 'src/layouts/tabelas/tabelas';
    import { formatDate, formatPrice } from 'src/services/utils/utils';
    import ApiService from 'src/services/http/api';
    import BtnLink from '.src/components/shared/BtnLink.vue';
    import BtnDownloadPDF from '.src/components/shared/BtnDownloadPDF.vue';
    import CardRelatorioPagamento from 'src/components/shared/CardRelatorioPagamento.vue';
    //@ts-ignore
    import html2pdf from "html2pdf.js";

    const router = useRouter();
    const route = useRoute();
    const relatorio = ref<RelatorioPagamento[]>();
    const filter = ref('');
    const vrTotal = ref(0);
    const $q = useQuasar();
    const api = new ApiService();
    
    const data = route.params.data;

    $q.loading.show({
        delay: 400,
        message: 'Recuperando Informações do Banco de Dados'
    });

    api.get(`/pagamento/porData/${data}`)
        .then((response => {
            relatorio.value = response.data;
            relatorio.value?.map((relatorio => {
                vrTotal.value += relatorio.vrPagamento;
            }));
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
      const table = pagamentosPdfTable(formatDate((data as string)), relatorio.value, vrTotal.value);
                
      html2pdf(table, {
        filename: `Relatorio Pagamentos - ${formatDate((data as string))}`
      });
    }
</script>
<template>
    <div class="q-pa-md" id="pageDetalha">
      <div class="text-h4 q-mb-lg">{{ `Comanda ${route.params.id} - ${comanda?.noCliente}`  }}</div>
      <q-table
        title="Lançamentos"
        :rows="lancamentos"
        :columns="colunaLancamentos"
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
          <BtnLink icon-name="note_alt" tooltip="Comandas" @route-push="() => router.push('/comandas')"/>
          <template v-if="comanda?.situacaoComanda != `PAGA`">
            <BtnCadastrar tooltip="Lançar Produto" @cadastrar="lancarProduto()"/>
          </template>
          <template v-else>
            <template v-if="user.perfil == 'ADMINISTRADOR'">
              <BtnReabrirComanda class="q-mr-lg" :tooltip="`${route.params.id}`" @reabrir="() => {
                //@ts-ignore
                reabrir(route.params.id)
              }"/>
            </template>
          </template>
          <q-space />
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
              <q-td key="noProduto" :props="props">
                  {{ props.row.noProduto }}
              </q-td>
              <q-td key="dtLancamento" :props="props">
                  {{ formatDate(props.row.dtLancamento) }}
              </q-td>
              <q-td key="vrUnitario" :props="props">
                  {{ formatPrice(props.row.vrUnitario) }}
              </q-td>
              <q-td key="quantidade" :props="props">
                  {{ props.row.quantidade }}
              </q-td>
              <q-td key="vrTotal" :props="props">
                  {{ formatPrice(props.row.vrTotal) }}
              </q-td>
              <template v-if="comanda?.situacaoComanda == `PAGA`">
                <q-td class="text-center">-</q-td>
              </template>
              <template v-else>
                <q-td key="acoes" :props="props">
                  <BtnExcluir :tooltip="`Lançamento ${props.row.id}`" 
                    @excluir="excluirLancamento(props.row.id)"/>
                </q-td>
              </template>
          </q-tr>
        </template>
      </q-table>

      <q-table
        title="Pagamentos"
        :rows="pagamentos"
        :columns="colunaPagamentos"
        row-key="id"
        :filter="filter"
        rows-per-page-label="Registros por página"
        :pagination-label="(firstRowIndex, endRowIndex, totalRowsNumber) => {
          return `Registros ${firstRowIndex} - ${endRowIndex} de ${totalRowsNumber} registros`
        }"
        no-data-label="Nenhum Registro Encontrado"
        no-results-label="Nenhum Registro Encontrado"
        class="q-mt-sm">
        <template v-slot:top-right>
            <template v-if="comanda?.situacaoComanda != `PAGA`">
              <template v-if="
                //@ts-ignore
                comanda?.vrComanda > 0">
                <BtnCadastrar icon-name="attach_money" 
                  color="green-9" 
                  tooltip="Realizar Pagamento" 
                  @cadastrar="cadastrarPagamento()"/>
              </template>        
              <template v-else>
                <template v-if="user.perfil == 'ADMINISTRADOR'">
                  <BtnFecharComanda icon-name="assignment_late" 
                    @fechar-comanda="fecharComanda()"
                    class="q-mr-lg"/>
                </template>
              </template>        
            </template>
            <q-space />
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
                <q-td key="tipoPagamento" :props="props">
                    {{ props.row.tipoPagamento }}
                </q-td>
                <q-td key="dtPagamento" :props="props">
                    {{ formatDate(props.row.dtPagamento) }}
                </q-td>
                <q-td key="vrPagamento" :props="props">
                    {{ formatPrice(props.row.vrPagamento) }}
                </q-td>
                <template v-if="comanda?.situacaoComanda == `PAGA`">
                  <q-td class="text-center">-</q-td>
                </template>
                <template v-else>
                  <q-td key="acoes" :props="props">
                    <BtnExcluir :tooltip="`Pagamento ${props.row.id}`" 
                      @excluir="excluirPagamento(props.row.id)"/>
                  </q-td>
                </template>
            </q-tr>
        </template>
      </q-table>

      <CardComanda :situacao-comanda="comanda?.situacaoComanda"
        :vr-total-lancamentos="formatPrice(vrTotalLancamentos)"
        :vr-total-pagamentos="formatPrice(vrTotalPagamentos)"
        :vr-comanda="formatPrice(vrComanda)"/>
    </div>
</template>

<script setup lang="ts">
    import { useRoute, useRouter } from 'vue-router';
    import { ref } from 'vue';
    import { useQuasar } from 'quasar';
    import { Lancamento, Pagamento, Comanda } from 'src/interfaces/interfaces';
    import { detalhaComandaPdfTable } from 'src/layouts/tabelas/tabelas';
    import { colunaLancamentos, colunaPagamentos } from 'src/layouts/colunas/colunas';
    import { formatPrice, formatDate, user } from 'src/services/utils/utils';
    import ApiService from 'src/services/http/api';
    import BtnCadastrar from 'src/components/shared/BtnCadastrar.vue';
    import BtnExcluir from 'src/components/shared/BtnExcluir.vue';
    import BtnReabrirComanda from 'src/components/shared/BtnReabrirComanda.vue';
    import BtnDownloadPDF from 'src/components/shared/BtnDownloadPDF.vue';
    import BtnLink from 'src/components/shared/BtnLink.vue';
    import CardComanda from 'src/components/shared/CardComanda.vue';
    import BtnFecharComanda from 'src/components/shared/BtnFecharComanda.vue';
    //@ts-ignore
    import html2pdf from "html2pdf.js";
    
    const router = useRouter();
    const route = useRoute();
    const filter = ref('');
    const lancamentos = ref<Lancamento[]>();
    const pagamentos = ref<Pagamento[]>();
    const comanda = ref<Comanda>();
    const vrTotalLancamentos = ref(0);
    const vrTotalPagamentos = ref(0);
    const vrComanda = ref();
    const $q = useQuasar();
    const api = new ApiService();
  
    $q.loading.show({
      delay: 400,
      message: 'Recuperando Informações do Banco de Dados'
    });
  
    api.get(`lancamentos/comanda/${route.params.id}`)
      .then((response => {
        lancamentos.value = response.data;
        lancamentos.value?.map((lancamento) => {
          vrTotalLancamentos.value += lancamento.vrTotal;
        });

        api.get(`pagamento/comanda/${route.params.id}`)
          .then(response => {
            pagamentos.value = response.data;
            pagamentos.value?.map((pagamento) => {
              vrTotalPagamentos.value += pagamento.vrPagamento;
            });

            api.get(`comanda/${route.params.id}`)
              .then(response => {
                comanda.value = response.data;
                vrComanda.value = comanda.value?.vrComanda;
              });
          });
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

    const excluirLancamento = async (id : Number) => {
      $q.loading.show({
        delay: 400,
        message: 'Recuperando Informações do Banco de Dados'
      });

      api.delete(`/lancamentos/${id}/deletar`)
        .then(() => {
          vrTotalLancamentos.value = 0;
          vrTotalPagamentos.value = 0;

          api.get(`lancamentos/comanda/${route.params.id}`)
            .then((response => {
              lancamentos.value = response.data;
              lancamentos.value?.map((lancamento) => {
                vrTotalLancamentos.value += lancamento.vrTotal;
              });

              api.get(`pagamento/comanda/${route.params.id}`)
                .then(response => {
                  pagamentos.value = response.data;
                  pagamentos.value?.map((pagamento) => {
                    vrTotalPagamentos.value += pagamento.vrPagamento;
                  });
                  api.get(`comanda/${route.params.id}`)
                    .then(response => {
                      comanda.value = response.data;
                    });
                });
            }));
            $q.notify({
              color: 'positive',
              position: 'top',
              message: 'Lançamento excluído com sucesso',
              icon: "check"
            });
        }).catch((e) => {
          $q.notify({
            color: 'negative',
            position: 'top',
            message: e.response.data,
            icon: 'report_problem'
          });
        }).finally(() => {
          $q.loading.hide();
        });
    }

    const excluirPagamento = async (id : Number) => {
      $q.loading.show({
        delay: 400,
        message: 'Recuperando Informações do Banco de Dados'
      });

      api.delete(`/pagamento/${id}/deletar`)
        .then(() => {
          vrTotalLancamentos.value = 0;
          vrTotalPagamentos.value = 0;

          api.get(`lancamentos/comanda/${route.params.id}`)
            .then((response => {
              lancamentos.value = response.data;
              lancamentos.value?.map((lancamento) => {
                vrTotalLancamentos.value += lancamento.vrTotal;
              });
              api.get(`pagamento/comanda/${route.params.id}`)
                .then(response => {
                  pagamentos.value = response.data;
                  pagamentos.value?.map((pagamento) => {
                    vrTotalPagamentos.value += pagamento.vrPagamento;
                  });

                  api.get(`comanda/${route.params.id}`)
                    .then(response => {
                      comanda.value = response.data;
                    });
                });
            }));

            $q.notify({
              color: 'positive',
              position: 'top',
              message: 'Pagamento excluído com sucesso',
              icon: "check"
            });

        }).catch((e) => {
          $q.notify({
            color: 'negative',
            position: 'top',
            message: e.response.data,
            icon: 'report_problem'
          });
        }).finally(() => {
          $q.loading.hide();
        });
    }

    const reabrir = (id: Number) => {
      vrTotalLancamentos.value = 0;
      vrTotalPagamentos.value = 0;

      api.putWithoutObject(`comanda/${id}/reabrirComanda`)
        .then(() => {
          $q.loading.show({
          delay: 400,
          message: 'Recuperando Informações do Banco de Dados'
        });
      
        api.get(`lancamentos/comanda/${route.params.id}`)
          .then((response => {
            lancamentos.value = response.data;
            lancamentos.value?.map((lancamento) => {
              vrTotalLancamentos.value += lancamento.vrTotal;
            });
            api.get(`pagamento/comanda/${route.params.id}`)
              .then(response => {
                pagamentos.value = response.data;
                pagamentos.value?.map((pagamento) => {
                  vrTotalPagamentos.value += pagamento.vrPagamento;
                });
                api.get(`comanda/${route.params.id}`)
                  .then(response => {
                    comanda.value = response.data;
                  });
              });
              $q.notify({
                color: 'positive',
                position: 'top',
                message: 'Comanda Reaberta com sucesso',
                icon: "check"
              });
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
        });
    }

    const fecharComanda = () => {
      vrTotalLancamentos.value = 0;
      vrTotalPagamentos.value = 0;

      api.putWithoutObject(`comanda/${route.params.id}/fecharComanda`)
        .then(() => {
          $q.notify({
            color: 'positive',
            position: 'top',
            message: 'Comanda Fechada com sucesso.',
            icon: "check"
          });

          api.get(`lancamentos/comanda/${route.params.id}`)
            .then((response => {
              lancamentos.value = response.data;
              lancamentos.value?.map((lancamento) => {
                vrTotalLancamentos.value += lancamento.vrTotal;
              });

              api.get(`pagamento/comanda/${route.params.id}`)
                .then(response => {
                  pagamentos.value = response.data;
                  pagamentos.value?.map((pagamento) => {
                    vrTotalPagamentos.value += pagamento.vrPagamento;
                  });
                  api.get(`comanda/${route.params.id}`)
                    .then(response => {
                      comanda.value = response.data;
                    });
                });
            }));
        }).catch((e) => {
            $q.notify({
              color: 'negative',
              position: 'top',
              message: e.response.data,
              icon: 'report_problem'
            });
          });
    }

    const lancarProduto = () => {
      router.push({path: `/comandas/${route.params.id}/lancamento`});
    }
  
    const cadastrarPagamento = () => {
      router.push({path: `/comandas/${route.params.id}/pagamento`});
    }

    const dowloadPdf = () => {
      //@ts-ignore
      const table = detalhaComandaPdfTable(lancamentos.value, 
        pagamentos.value, 
        route.params.id, 
        comanda.value?.situacaoComanda, 
        vrTotalLancamentos.value, 
        vrTotalPagamentos.value, 
        vrComanda.value,
        comanda.value?.noCliente)
                
      html2pdf(table, {
        filename: `Detalhes Comanda ${route.params.id} - ${comanda.value?.noCliente}`
      });
    }

  
</script>
<template>
    <div class="q-pa-md">
      <q-table
        title="Comandas"
        :rows="comandas"
        :columns="colunaComanda"
        row-key="id"
        :filter="filter"
        rows-per-page-label="Registros por página"
        :pagination-label="(firstRowIndex, endRowIndex, totalRowsNumber) => {
          return `Registros ${firstRowIndex} - ${endRowIndex} de ${totalRowsNumber} registros`
        }"
        no-data-label="Nenhum Registro Encontrado"
        no-results-label="Nenhum Registro Encontrado">
        <template v-slot:top-right>
            <BtnCadastrar tooltip="Abrir Comanda" @cadastrar="cadastrar()"/>
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
                <q-td key="noCliente" :props="props">
                    {{ props.row.noCliente }}
                </q-td>
                <q-td key="situacaoComanda" :props="props">
                    {{ props.row.situacaoComanda }}
                </q-td>
                <q-td key="dtComanda" :props="props">
                    {{ formatDate(props.row.dtComanda) }}
                </q-td>
                <q-td key="vrComanda" :props="props">
                    {{ formatPrice(props.row.vrComanda) }}
                </q-td>
                <q-td key="acoes" :props="props">
                    <BtnDetalhar :tooltip="`Comanda ${props.row.id}`" @detalhar="detalhar(props.row.id)"/>
                    <template v-if="props.row.situacaoComanda == 'ABERTA'">
                      <BtnExcluir :tooltip="`Comanda ${props.row.id}`" @excluir="excluir(props.row.id)" />
                    </template>
                    <template v-else>
                      <template v-if="user.perfil == 'ADMINISTRADOR'">
                        <BtnReabrirComanda :tooltip="`${props.row.id}`" @reabrir="reabrir(props.row.id)"/>
                      </template>
                    </template>
                </q-td>
            </q-tr>
        </template>
      </q-table>
    </div>
</template>

<script setup lang="ts">
  import { useRouter } from 'vue-router';
  import { ref } from 'vue';
  import { useQuasar } from 'quasar';
  import { Comanda } from 'src/interfaces/interfaces';
  import { colunaComanda } from 'src/layouts/colunas/colunas';
  import { formatPrice, formatDate, user } from 'src/services/utils/utils';
  import ApiService from 'src/services/http/api';
  import BtnCadastrar from 'src/components/shared/BtnCadastrar.vue';
  import BtnExcluir from 'src/components/shared/BtnExcluir.vue';
  import BtnDetalhar from 'src/components/shared/BtnDetalhar.vue';
  import BtnReabrirComanda from 'src/components/shared/BtnReabrirComanda.vue';
    
  const router = useRouter();
  const filter = ref('');
  const comandas = ref<Comanda[]>();
  const $q = useQuasar();
  const api = new ApiService();

  $q.loading.show({
    delay: 400,
    message: 'Recuperando Informações do Banco de Dados'
  });

  api.get('comanda/todas')
    .then((response => {
      comandas.value = response.data;
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

    
  const excluir = async (id : Number) => {
    $q.loading.show({
      delay: 400,
      message: 'Recuperando Informações do Banco de Dados'
    });

    api.delete(`/comanda/${id}/deletar`)
      .then(() => {
        api.get('comanda/todas')
          .then((response => {
            comandas.value = response.data;
            $q.notify({
              color: 'positive',
              position: 'top',
              message: 'Comanda excluída com sucesso',
              icon: "check"
            });
        }));
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

    const reabrir = (id: number) => {
    $q.loading.show({
      delay: 400,
      message: 'Recuperando Informações do Banco de Dados'
    });

    api.putWithoutObject(`comanda/${id}/reabrirComanda`)
      .then(() => {
        api.get('comanda/todas')
          .then((response => {
            comandas.value = response.data;
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

    const cadastrar = () => {
      router.push({path: '/comandas/cadastrar'});
    }

    const detalhar = (id: number) => {
      router.push({path: `/comandas/${id}` });
    }
      
</script>
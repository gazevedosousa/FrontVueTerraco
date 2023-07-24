<template>
  <div class="q-pa-md">
    <q-table
      title="Clientes"
      :rows="clientes"
      :columns="colunaCliente"
      row-key="id"
      :filter="filter"
      rows-per-page-label="Registros por página"
      :pagination-label="(firstRowIndex, endRowIndex, totalRowsNumber) => {
        return `Registros ${firstRowIndex} - ${endRowIndex} de ${totalRowsNumber} registros`
      }"
      no-data-label="Nenhum Registro Encontrado"
      no-results-label="Nenhum Registro Encontrado">
      <template v-slot:top-right>
        <BtnCadastrar tooltip="Cadastrar Cliente" @cadastrar="cadastrar()"/>
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
          <q-td key="celCliente" :props="props">
            {{ props.row.celCliente }}
          </q-td>
          <q-td key="emailCliente" :props="props">
            {{ props.row.emailCliente }}
          </q-td>
          <q-td key="acoes" :props="props">
            <BtnEditar :tooltip="props.row.noCliente" @editar="editar(props.row.id)" />
            <BtnExcluir :tooltip="props.row.noCliente" @excluir="excluir(props.row.id)" />
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
  import { Cliente } from 'src/interfaces/interfaces';
  import { colunaCliente } from 'src/layouts/colunas/colunas';
  import ApiService from 'src/services/http/api';
  import BtnCadastrar from 'src/components/shared/BtnCadastrar.vue';
  import BtnEditar from 'src/components/shared/BtnEditar.vue';
  import BtnExcluir from 'src/components/shared/BtnExcluir.vue';

  const router = useRouter();
  const filter = ref('');
  const clientes = ref<Cliente[]>();
  const $q = useQuasar();
  const api = new ApiService();

  $q.loading.show({
    delay: 400,
    message: 'Recuperando Informações do Banco de Dados'
  });

  api.get('api/cliente/todos')
    .then((response => {
      clientes.value = response.data;
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
    
    api.delete(`api/cliente/${id}/deletar`)
      .then(() => {
        api.get('api/cliente/todos')
          .then((response => {
            clientes.value = response.data;
          })).catch((e) => {
            $q.notify({
              color: 'negative',
              position: 'top',
              message: e.response.data,
              icon: 'report_problem'
            });
          });
        $q.notify({
            color: 'positive',
            position: 'top',
            message: 'Cliente excluído com sucesso',
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
    
  const cadastrar = () => {
    router.push({path: '/clientes/cadastrar'});
  }

  const editar = (id: Number) => {
    router.push({path: `/clientes/editar/${id}`});
  }

</script>

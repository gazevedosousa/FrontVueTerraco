<template>
  <div class="q-pa-md">
    <q-table
      title="Clientes"
      :rows="clientes"
      :columns="colunaCadastroComanda"
      row-key="noCliente"
      :filter="filter"
      v-model:selected="selected"
      selection="single"
      rows-per-page-label="Registros por página"
      :pagination-label="(firstRowIndex, endRowIndex, totalRowsNumber) => {
        return `Registros ${firstRowIndex} - ${endRowIndex} de ${totalRowsNumber} registros`
      }"
      :selected-rows-label="(numberOfRows: number) => {
        return `${numberOfRows} registro selecionado` 
      }"
      no-data-label="Nenhum Registro Encontrado"
      no-results-label="Nenhum Registro Encontrado">
      <template v-slot:top-right>
        <q-input dense debounce="300" color="grey-9" v-model="filter">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
    </q-table>

    <template class="row items-center justify-evenly">
      <q-btn color="grey-9" class="q-mt-lg" @click="abrir()">
        Abrir Comanda
      </q-btn>
      <q-btn class="q-mt-lg" color="grey-6" label="Voltar" @click="() => router.go(-1)"/>
    </template>
  </div>
</template>

<script setup lang="ts">
  import { useRouter } from 'vue-router';
  import { ref } from 'vue';
  import { useQuasar } from 'quasar';
  import { Cliente } from 'src/interfaces/interfaces';
  import { colunaCadastroComanda } from 'src/layouts/colunas/colunas';
  import ApiService from 'src/services/http/api';

  const router = useRouter();
  const filter = ref('');
  const selected = ref([]);
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

  const abrir = async () => {
    if(!selected.value[0]){
      $q.notify({
          color: 'negative',
          position: 'top',
          message: 'Selecione um cliente para abrir a comanda',
          icon: 'report_problem'
        });
      return
    }

    const form = {
      //@ts-ignore
      idCliente: selected.value[0].id,
      situacaoComanda: "ABERTA"
    }

    await api.post('api/comanda/criar', JSON.stringify(form))
      .then(() => {
        $q.notify({
          color: 'positive',
          position: 'top',
          message: 'Comanda cadastrada com sucesso',
          icon: "check"
        });
        router.push('/comandas');
      }).catch((e) => {
        $q.notify({
          color: 'negative',
          position: 'top',
          message: e.response.data,
          icon: 'report_problem'
        });
      });
  }

</script>
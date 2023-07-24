<template>
  <div class="q-pa-md">
    <q-table
      title="Categorias"
      :rows="categorias"
      :columns="colunaCategoria"
      row-key="id"
      :filter="filter"
      rows-per-page-label="Registros por página"
      :pagination-label="(firstRowIndex, endRowIndex, totalRowsNumber) => {
        return `Registros ${firstRowIndex} - ${endRowIndex} de ${totalRowsNumber} registros`
      }"
      no-data-label="Nenhum Registro Encontrado"
      no-results-label="Nenhum Registro Encontrado">
      <template v-slot:top-right>
        <BtnLink class="q-mr-sm" 
          icon-name="shopping_cart" 
          tooltip="Produtos" 
          @route-push="() => router.push('/produtos')"/>
        <BtnCadastrar tooltip="Cadastrar Categoria" @cadastrar="cadastrar()" />
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
          <q-td key="noTipoProduto" :props="props">
              {{ props.row.noTipoProduto }}
          </q-td>
          <q-td key="acoes" :props="props">
            <BtnExcluir
              :tooltip="`${props.row.noTipoProduto}`"
              @excluir="excluir(props.row.id)" />
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
  import { Categoria } from 'src/interfaces/interfaces';
  import { colunaCategoria } from 'src/layouts/colunas/colunas';
  import ApiService from 'src/services/http/api';
  import BtnCadastrar from 'src/components/shared/BtnCadastrar.vue';
  import BtnExcluir from 'src/components/shared/BtnExcluir.vue';
  import BtnLink from 'src/components/shared/BtnLink.vue';

  const router = useRouter();
  const $q = useQuasar();
  const filter = ref('');
  const categorias = ref<Categoria[]>();
  const api = new ApiService();

  $q.loading.show({
    delay: 400,
    message: 'Recuperando Informações do Banco de Dados'
  });

  api.get('api/tipoProduto/todos')
    .then((response => {
      categorias.value = response.data;
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

    api.delete(`api/tipoProduto/${id}/deletar`)
      .then(() => {
        api.get('api/tipoProduto/todos')
          .then((response => {
            categorias.value = response.data;
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
            message: 'Categoria excluída com sucesso',
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
    router.push({path: 'categorias/cadastrar'});
  }

</script>
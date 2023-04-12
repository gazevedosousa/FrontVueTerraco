<template>
    <div class="q-pa-md">
      <q-table
        title="Produtos"
        :rows="produtos"
        :columns="colunaProduto"
        row-key="id"
        :filter="filter"
        rows-per-page-label="Registros por página"
        :pagination-label="(firstRowIndex, endRowIndex, totalRowsNumber) => {
          return `Registros ${firstRowIndex} - ${endRowIndex} de ${totalRowsNumber} registros`
        }"
        no-data-label="Nenhum Registro Encontrado"
        no-results-label="Nenhum Registro Encontrado">
        <template v-slot:top-right>
          <template v-if="user.perfil == 'ADMINISTRADOR'">
            <BtnLink
              tooltip="Categorias"
              icon-name="list"
              @route-push="() => router.push('/produtos/categorias')" />
            <BtnCadastrar
              icon-name="add"
              tooltip="Cadastrar Produto"
              @cadastrar="cadastrar()" />
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
                <q-td key="tipoProduto" :props="props">
                    {{ props.row.tipoProduto }}
                </q-td>
                <q-td key="vrProduto" :props="props">
                    {{ formatPrice(props.row.vrProduto) }}
                </q-td>
                <q-td key="acoes" :props="props">
                  <template v-if="user.perfil == 'ADMINISTRADOR'">
                    <BtnEditar
                      :tooltip="`${props.row.noProduto}`"
                      @editar="editar(props.row.id)" />
                    <BtnExcluir
                      :tooltip="`${props.row.noProduto}`"
                      @excluir="excluir(props.row.id)" />
                  </template>
                  <template v-else>
                    -
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
  import { Produto } from 'src/interfaces/interfaces';
  import { colunaProduto } from 'src/layouts/colunas/colunas';
  import { formatPrice, user } from 'src/services/utils/utils';
  import ApiService from 'src/services/http/api';
  import BtnCadastrar from 'src/components/shared/BtnCadastrar.vue';
  import BtnEditar from 'src/components/shared/BtnEditar.vue';
  import BtnExcluir from 'src/components/shared/BtnExcluir.vue';
  import BtnLink from 'src/components/shared/BtnLink.vue';
  
  const router = useRouter();
  const filter = ref('');
  const produtos = ref<Produto[]>();
  const $q = useQuasar();
  const api = new ApiService();
  
  $q.loading.show({
    delay: 400,
    message: 'Recuperando Informações do Banco de Dados'
  });

  api.get('produto/todos')
    .then((response => {
      produtos.value = response.data;
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

    api.delete(`/produto/${id}/deletar`)
      .then(() => {
        api.get('produto/todos')
          .then((response => {
            produtos.value = response.data;
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
            message: 'Produto excluído com sucesso',
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
    router.push({path: '/produtos/cadastrar'});
  }
  
  const editar = (id: Number) => {
    router.push({path: `/produtos/editar/${id}`});
  }
  
</script>
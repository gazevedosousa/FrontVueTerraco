<template>
  <div class="q-pa-md">
    <div class="q-gutter-md">
      <q-card flat bordered>
        <q-card-section>
          <div class="text-h6">Lançar Produto na Comanda #{{ route.params.id }}</div>
        </q-card-section>
        <q-card-section class="q-pt-none" style="width: 500px">
          <q-form class="column" @submit="lancar()">
            <q-select
              v-model="form.idProduto"
              color="grey-9"
              hint="Escolha o Produto"
              :options="options"
              label="Produto"
              emit-value
              map-options
              behavior="menu"
              use-input
              input-debounce="0"
              @filter="filterFn"
              :rules="[selectRequired]" />
              <q-input
                v-model="form.quantidade"
                type="number"
                hint="Digite a Quantidade"
                :rules="[requiredRule]" />
            <q-btn class="q-mt-lg" color="grey-9" label="Lançar" type="submit"/>
            <q-btn class="q-mt-sm" color="grey-6" label="Voltar" @click="() => router.go(-1)"/>
          </q-form>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useRoute, useRouter } from 'vue-router';
  import { ref } from 'vue';
  import { useQuasar } from 'quasar';
  import { Produto, Options } from 'src/interfaces/interfaces';
  import { selectRequired, requiredRule } from 'src/services/utils/utils';
  import ApiService from 'src/services/http/api';

  const router = useRouter();
  const route = useRoute();
  const form = ref({
    idComanda: route.params.id,
    idProduto: null,
    quantidade: null,
  });
  const getOptions: Array<Options> = [];
  const options = ref(getOptions);
  const produtos = ref<Produto[]>();
  const $q = useQuasar();
  const api = new ApiService();

  api.get('api/produto/todos')
    .then((response => {
      produtos.value = response.data;
      produtos.value?.map((produto: Produto) => {
          getOptions.push({
            label: produto.noProduto,
            value: produto.id
          });
        });

        options.value = getOptions;
    })).catch((e) => {
      $q.notify({
        color: 'negative',
        position: 'top',
        message: e.response.data,
        icon: 'report_problem'
      });
    });

  const lancar = async () => {
    await api.post('api/lancamentos/criar', JSON.stringify(form.value))
      .then(() => {
        $q.notify({
          color: 'positive',
          position: 'top',
          message: 'Produto lançado na comanda com sucesso',
          icon: "check"
        })
        router.push({path: `/comandas/${route.params.id}`});
      }).catch((e) => {
        $q.notify({
          color: 'negative',
          position: 'top',
          message: e.response.data,
          icon: 'report_problem'
        });
      });
  }

  const filterFn = (val: string, update: any) => {
    if (val === null) {
      update(() => {
        options.value = getOptions;
      })
      return;
    }
    update(() => {
      const needle = val.toLowerCase();
      options.value = getOptions.filter(v => v.label.toLowerCase().indexOf(needle) > -1);
    });
  }

</script>

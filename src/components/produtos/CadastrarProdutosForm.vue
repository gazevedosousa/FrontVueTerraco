<template>
  <div class="q-pa-md">
    <div class="q-gutter-md">
      <q-card flat bordered>
        <q-card-section>
          <div class="text-h6">Cadastrar Produto</div>
        </q-card-section>
        <q-card-section class="q-pt-none" style="width: 500px">
          <q-form class="column" @submit="cadastra()">
            <q-input
              name="noProduto"
              hint="Digite o Produto"
              color="grey-9"
              v-model="form.noProduto"
              label="Produto"
              lazy-rules
              :rules="[requiredRule]" />
            <q-select
              v-model="form.tipoProduto"
              hint="Escolha a Categoria"
              color="grey-9"
              :options="options"
              label="Categoria"
              emit-value
              map-options
              :rules="[selectRequired]" />
            <q-field
              label="Valor do Produto"
              hint="Digite o Valor Produto"
              v-model="form.vrProduto"
              :rules="[requiredRule]"
              color="grey-9">
              <template v-slot:control="{}">
                  <input
                    v-model="form.vrProduto"
                    v-on:keyup="(e: Event) => formatMoney((e.target as HTMLInputElement).value)"
                    v-masks:currency
                    class="q-field__input text-right table__input" />
              </template>
            </q-field>
            <q-btn class="q-mt-lg" color="grey-9" label="Cadastrar" type="submit"/>
            <q-btn class="q-mt-sm" color="grey-6" label="Voltar" @click="() => router.go(-1)"/>
          </q-form>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useRouter } from 'vue-router';
  import { ref } from 'vue';
  import { useQuasar } from 'quasar';
  import { Categoria, Options } from 'src/interfaces/interfaces';
  import { selectRequired, requiredRule } from 'src/services/utils/utils';
  import ApiService from 'src/services/http/api';

  const router = useRouter();
  const form = ref({
    noProduto: '',
    tipoProduto: null,
    vrProduto: ''
  });
  const categorias = ref<Categoria[]>();
  const options = ref();
  const $q = useQuasar();
  const api = new ApiService();

  const getOptions: Array<Options> = [];

    $q.loading.show({
      delay: 400,
      message: 'Recuperando Informações do Banco de Dados'
    });

    api.get('api/tipoProduto/todos')
      .then((response => {
        categorias.value = response.data
        categorias.value?.map((categoria: Categoria) => {
          getOptions.push({
            label: categoria.noTipoProduto,
            value: categoria.id
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
      }).finally(() => {
        $q.loading.hide();
      });

  const cadastra = async () => {

    const sendForm = {
      noProduto: form.value.noProduto,
      vrProduto: form.value.vrProduto.substring(3).replaceAll('.','').replace(',','.'),
      idTipoProduto: form.value.tipoProduto,
    }

    await api.post('api/produto/criar', JSON.stringify(sendForm))
      .then(() => {
        $q.notify({
          color: 'positive',
          position: 'top',
          message: 'Produto cadastrado com sucesso',
          icon: "check"
        });
        router.push({path: '/produtos'});
      }).catch((e) => {
        $q.notify({
          color: 'negative',
          position: 'top',
          message: e.response.data,
          icon: 'report_problem'
        });
      });
  }

  const formatMoney = (val : string) => {
    form.value.vrProduto =
        val
          .replace(/\D/g, '')
          .replace(/^0+/, '')
          .replace(/^(\d{1})$/, 'R$ 0,0$1')
          .replace(/^(\d{2})$/, 'R$ 0,$1')
          .replace(/^(\d{1,3})(\d{2})$/, 'R$ $1,$2')
          .replace(/^(\d{1,3})(\d{3})(\d{2})$/, 'R$ $1.$2,$3')
          .replace(/^(\d{1,3})(\d{3})(\d{3})(\d{2})$/, 'R$ $1.$2.$3,$4')
          .replace(/^(\d{1,3})(\d{3})(\d{3})(\d{3})(\d{2})$/, 'R$ $1.$2.$3.$4,$5')
          .replace(/^(\d{1,3})(\d{3})(\d{3})(\d{3})(\d{3})(\d{2}).*$/, 'R$ $1.$2.$3.$4.$5,$6');
  }

</script>

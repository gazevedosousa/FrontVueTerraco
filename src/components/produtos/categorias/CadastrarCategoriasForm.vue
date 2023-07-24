<template>
  <div class="q-pa-md">
    <div class="q-gutter-md">
      <q-card flat bordered>
        <q-card-section>
          <div class="text-h6">Cadastrar Categoria</div>
        </q-card-section>
        <q-card-section class="q-pt-none" style="width: 500px">
          <q-form class="column" @submit="cadastra()">
            <q-input
              name="noTipoProduto"
              hint="Digite a Categoria"
              color="grey-9"
              v-model="form.noTipoProduto"
              label="Categoria"
              lazy-rules
              :rules="[requiredRule]" />
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
  import { requiredRule } from 'src/services/utils/utils';
  import ApiService from 'src/services/http/api';

  const router = useRouter();
  const form = ref({
    noTipoProduto: ''
  });
  const $q = useQuasar();
  const api = new ApiService();

  const cadastra = async () => {
    await api.post('api/tipoProduto/criar', JSON.stringify(form.value))
      .then(() => {
        $q.notify({
          color: 'positive',
          position: 'top',
          message: 'Categoria cadastrada com sucesso',
          icon: "check"
        });
        router.push({path: '/produtos/categorias'});
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

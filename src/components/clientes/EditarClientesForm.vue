<template>
  <div class="q-pa-md">
    <div class="q-gutter-md">
      <q-card flat bordered>
        <q-card-section>
          <div class="text-h6">Cadastrar Cliente</div>
        </q-card-section>
        <q-card-section class="q-pt-none" style="width: 500px">
          <q-form class="column" @submit="atualizar()">
            <q-input
              hint="Digite o Nome"
              color="grey-9"
              v-model="form.noCliente"
              label="Nome"
              lazy-rules
              :rules="[requiredRule]"
              readonly />
            <q-input
              hint="Digite o Telefone"
              color="grey-9"
              v-model="form.celCliente"
              label="Telefone"
              v-mask="['(##) ####-####', '(##) #####-####']" />
            <q-input
              hint="Digite o Email"
              color="grey-9"
              v-model="form.emailCliente"
              label="Email"
              :rules="[validEmail]" />
            <q-btn class="q-mt-lg" color="grey-9" label="Cadastrar" type="submit"/>
            <q-btn class="q-mt-sm" color="grey-6" label="Voltar" @click="() => router.go(-1)"/>
          </q-form>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useRouter, useRoute } from 'vue-router';
  import { ref } from 'vue';
  import { useQuasar } from 'quasar';
  import { validEmail, requiredRule } from 'src/services/utils/utils';
  import ApiService from 'src/services/http/api';

  const router = useRouter();
  const route = useRoute();
  const form = ref({
    noCliente: '',
    emailCliente: '',
    celCliente: ''
  });
  const $q = useQuasar();
  const api = new ApiService();

  $q.loading.show({
    delay: 400,
    message: 'Recuperando Informações do Banco de Dados'
  });

  api.get(`cliente/${route.params.id}`)
    .then((response => {
      form.value.noCliente = response.data.noCliente;
      form.value.emailCliente = response.data.emailCliente;
      form.value.celCliente = response.data.celCliente;
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

  const atualizar = async () => {
    await api.put(`cliente/${route.params.id}/atualizar`, JSON.stringify(form.value))
      .then(() => {
        $q.notify({
          color: 'positive',
          position: 'top',
          message: 'Cliente atualizado com sucesso',
          icon: "check"
        });
        router.push({path: '/clientes'});
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

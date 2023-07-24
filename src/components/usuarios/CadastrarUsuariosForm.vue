<template>
  <div class="q-pa-md">
    <div class="q-gutter-md">
      <q-card flat bordered>
        <q-card-section>
          <div class="text-h6">Cadastrar Usuário</div>
        </q-card-section>
        <q-card-section class="q-pt-none" style="width: 500px">
          <q-form class="column" @submit="cadastra()">
            <q-input
              hint="Digite o Usuário"
              color="grey-9"
              v-model="form.noUsuario"
              label="Usuário"
              lazy-rules
              :rules="[requiredRule]" />
            <q-input
              color="grey-9"
              v-model="form.coSenha"
              hint="Digite a Senha"
              :type="isPwd ? 'password' : 'text'"
              label="Senha"
              :rules="[requiredRule]">
                <template v-slot:append>
                  <q-icon
                    :name="isPwd ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="isPwd = !isPwd"
                  />
                </template>
              </q-input>
              <q-select v-model="form.perfil" 
                hint="Escolha o Perfil" 
                color="grey-9"
                :options="perfilUsuarioOptions" 
                label="Perfil" 
                emit-value 
                map-options 
                :rules="[selectRequired]" />
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
  import { perfilUsuarioOptions } from 'src/layouts/options/options';
  import { selectRequired, requiredRule } from 'src/services/utils/utils';
  import ApiService from 'src/services/http/apiSignUpSignIn';

  const router = useRouter();
  const form = ref({
    noUsuario: '',
    perfil: null,
    coSenha: ''
  });
  const isPwd = ref(true);
  const $q = useQuasar();
  const api = new ApiService()

  const cadastra = async () => {
    await api.post('usuario/criar', JSON.stringify(form.value))
      .then(() => {
        $q.notify({
          color: 'positive',
          position: 'top',
          message: 'Usuário cadastrado com sucesso',
          icon: "check"
        });
        router.push({path: '/usuarios'});
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

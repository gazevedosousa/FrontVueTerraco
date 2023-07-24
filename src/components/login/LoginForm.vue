<template>
  <div class="q-pa-md">
    <div class="q-gutter-md" style="max-width: 300px">
      <q-form class="column" @submit="login()">
        <q-input
          name="noUsuario"
          color="grey-9"
          v-model="form.noUsuario"
          label="Usuário"
          :rules="[requiredRule]" />
        <q-input
          name="coSenha"
          color="grey-9"
          v-model="form.coSenha"
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
        <q-btn class="q-my-lg" color="grey-9" label="Login" type="submit"/>
      </q-form>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { auth } from 'src/stores/auth';
  import { ref } from 'vue';
  import { useQuasar } from 'quasar';
  import { UserToAuth } from 'src/interfaces/interfaces';
  import { requiredRule } from 'src/services/utils/utils';
  import ApiService from 'src/services/http/apiSignUpSignIn';

  const autenticar = auth()
  const form = ref<UserToAuth>({
    noUsuario: '',
    coSenha: ''
  });
  const isPwd = ref(true);
  const $q = useQuasar();
  const api = new ApiService();

  const login = async () => {
    await api.post('usuario/autenticar', JSON.stringify(form.value))
      .then((response) => {
        autenticar.login(response);
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

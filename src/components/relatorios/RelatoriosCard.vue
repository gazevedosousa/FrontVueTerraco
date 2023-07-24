<template>
    <div class="q-pa-md">
    <div class="q-gutter-md">
      <q-card flat bordered>
        <q-card-section>
          <div class="text-h6">Relatórios</div>
        </q-card-section>
        <q-card-section class="q-pt-none" style="width: 500px">
          <q-form class="column" @submit="geraRelatorio()">
            <q-select
              v-model="tipoRelatorio"
              hint="Escolha o Relatório"
              :options="relatorioOptions"
              label="Relatório"
              emit-value
              map-options
              :rules="[selectRequired]"
              @update:model-value="() => relatorio = ''" />

            <template v-if="tipoRelatorio == 1 || tipoRelatorio == 3">
                <q-input
                  color="grey-9"
                  :type="('month' as any)"
                  v-model="relatorio"
                  :rules="[requiredRule]" />
            </template>
            <template v-if="tipoRelatorio == 2 || tipoRelatorio == 4">
                <q-input
                  color="grey-9"
                  type="date"
                  v-model="relatorio"
                  :rules="[requiredRule]" />
            </template>
            <q-btn
              class="q-mt-lg"
              color="grey-9"
              label="Gera Relatório"
              type="submit" />
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
    import { Cliente, Options } from 'src/interfaces/interfaces';
    import { relatorioOptions } from 'src/layouts/options/options';
    import { selectRequired, requiredRule } from 'src/services/utils/utils';
    import ApiService from 'src/services/http/api';

    const router = useRouter();
    const tipoRelatorio = ref(null);
    const relatorio = ref('');
    const clientes = ref<Cliente[]>();
    const optionsClientes = ref();
    const $q = useQuasar();
    const api = new ApiService();

    const getOptions: Array<Options> = [];

    $q.loading.show({
      delay: 400,
      message: 'Recuperando Informações do Banco de Dados'
    });

    api.get('api/cliente/todos')
      .then((response => {
        clientes.value = response.data
        clientes.value?.map((cliente: Cliente) => {
          getOptions.push({
            label: cliente.noCliente,
            value: cliente.id
          });
        });

        optionsClientes.value = getOptions;

      })).catch((e) => {
        $q.notify({
          color: 'negative',
          position: 'top',
          message: e.response.data,
          icon: 'report_problem'
        });
      }).finally(() => {
        $q.loading.hide();
      })

    const geraRelatorio = () => {
        if(tipoRelatorio.value == 1){
            router.push(`relatorios/pagamentos/doMes/${relatorio.value}`);
        } else if(tipoRelatorio.value == 2){
            router.push(`relatorios/pagamentos/doDia/${relatorio.value}`);
        } else if(tipoRelatorio.value == 3){
            router.push(`relatorios/produtos/doMes/${relatorio.value}`);
        } else if(tipoRelatorio.value == 4){
            router.push(`relatorios/produtos/doDia/${relatorio.value}`);
        } else {
            $q.notify({
                color: 'negative',
                position: 'top',
                message: 'Selecione um Tipo de Relatório',
                icon: 'report_problem'
            });
        }
    }

</script>

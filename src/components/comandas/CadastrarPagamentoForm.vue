<template>
  <div class="q-pa-md">
    <div class="q-gutter-md">
      <q-card flat bordered>
        <q-card-section>
          <div class="text-h6">Cadastrar Pagamento para a Comanda #{{ route.params.id }}</div>
          <div class="text-h6">Valor Total a Pagar {{ 
              //@ts-ignore 
              formatPrice(comanda?.vrComanda) 
            }}</div>
        </q-card-section>
        <q-card-section class="q-pt-none" style="width: 500px">
          <q-form class="column" @submit="pagar()">
            <q-select
              v-model="form.tipoPagamento"
              hint="Escolha o Tipo de Pagamento"
              color="grey-9"
              :options="pagamentoOptions"
              label="Tipo de Pagamento"
              emit-value
              map-options
              :rules="[selectRequired]" />
            <template v-if="form.tipoPagamento == 'DINHEIRO'">
              <q-field
                label="Valor do Pagamento"
                hint="Digite o Valor Pagamento"
                v-model="form.vrPagamento"
                :rules="[requiredRule, zeroValue]"
                color="grey-9">
                <template v-slot:control="{}">
                    <input
                      v-model="form.vrPagamento"
                      v-on:keyup="(e: Event) => formatMoney((e.target as HTMLInputElement).value)"
                      v-masks:currency
                      class="q-field__input text-right table__input" />
                </template>
              </q-field>
              <q-field
                label="Troco"
                v-model="form.troco"
                readonly>
                <template v-slot:control="{}">
                    <input
                      v-model="form.troco"
                      v-masks:currency
                      v-on:change="(e: Event) => formatMoney((e.target as HTMLInputElement).value)"
                      class="q-field__input text-right table__input"
                      readonly />
                </template>
              </q-field>
            </template>
            <template v-else>
              <q-field
                label="Valor do Pagamento"
                hint="Digite o Valor Pagamento"
                v-model="form.vrPagamento"
                :rules="[requiredRule, valueRequired, zeroValue]">
                <template v-slot:control="{}">
                    <input
                      v-model="form.vrPagamento"
                      v-on:keyup="(e: Event) => formatMoney((e.target as HTMLInputElement).value)"
                      v-masks:currency
                      class="q-field__input text-right table__input" />
                </template>
              </q-field>
            </template>
            <q-btn class="q-mt-lg" color="grey-9" label="Pagar" type="submit"/>
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
  import { Comanda } from 'src/interfaces/interfaces';
  import { pagamentoOptions } from 'src/layouts/options/options';
  import { selectRequired, requiredRule, stringToFloat, formatPrice } from 'src/services/utils/utils';
  import ApiService from 'src/services/http/api';

  const route = useRoute();
  const router = useRouter();
  const form = ref({
    idComanda: route.params.id,
    tipoPagamento: null,
    vrPagamento: '',
    troco: ''
  });
  const comanda = ref<Comanda>();
  const $q = useQuasar();
  const api = new ApiService();
  
  api.get(`comanda/${route.params.id}`)
    .then(response => {
      comanda.value = response.data;
    }).catch((e) => {
        $q.notify({
          color: 'negative',
          position: 'top',
          message: e.response.data,
          icon: 'report_problem'
        });
      });

  const pagar = async () => {

    let vrPagamento = 0;
    let fechaComanda = false;

    const float = stringToFloat(form.value.vrPagamento);

    //@ts-ignore
    if(float - comanda.value?.vrComanda < 0){
      vrPagamento = float;
    } else {
      //@ts-ignore
      vrPagamento = comanda.value?.vrComanda;
      fechaComanda = true;
    }

    const sendForm = {
      idComanda: form.value.idComanda,
      tipoPagamento: form.value.tipoPagamento,
      vrPagamento: vrPagamento,
    }

    await api.post('pagamento/criar', JSON.stringify(sendForm))
      .then(() => {
        if(fechaComanda){
          api.putWithoutObject(`comanda/${route.params.id}/fecharComanda`)
            .then(() => {
              $q.notify({
                color: 'positive',
                position: 'top',
                message: 'Pagamento Cadastrado com sucesso. Comanda PAGA',
                icon: "check"
              });
              router.push({path: `/comandas/${route.params.id}`});
            });
        } else {
          $q.notify({
            color: 'positive',
            position: 'top',
            message: 'Pagamento Cadastrado com sucesso. Comanda ainda ABERTA',
            icon: "check"
          });
          router.push({path: `/comandas/${route.params.id}`})
        }
      }).catch((e) => {
        $q.notify({
          color: 'negative',
          position: 'top',
          message: e.response.data,
          icon: 'report_problem'
        });
      });
  }

  //@ts-ignore
  const valueRequired = (val: number) => (val && stringToFloat(form.value.vrPagamento) <= comanda.value?.vrComanda) ||
  'Valor do Pagamento Superior ao Total a Pagar';
  const zeroValue = (val: number) => (val && stringToFloat(form.value.vrPagamento) > 0) ||
  'Valor do Pagamento deve ser superior a R$ 0,00';

  const formatMoney = (val : string) => {
    form.value.vrPagamento =
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

    if(form.value.vrPagamento === ''){
      form.value.troco = 'R$ 0,00';
    } else {
      const float = stringToFloat(form.value.vrPagamento);
      //@ts-ignore
      if(float - comanda.value?.vrComanda <= 0){
        form.value.troco = 'R$ 0,00';
      } else {
        //@ts-ignore
        form.value.troco = formatPrice((float - comanda.value?.vrComanda));
      }
    }
  }

</script>

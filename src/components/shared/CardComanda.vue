<template>
    <q-card
      class="q-mt-sm text-center">
      <q-card-section class="text-subtitle1 text-weight-bold">
        {{ `Situação da Comanda - ${situacaoComanda}` }}
      </q-card-section>
      <q-card-section class="text-subtitle1">
        {{ `Valor total de Lançamentos - ${vrTotalLancamentos}` }}
      </q-card-section>
      <q-card-section class="text-subtitle1">
        {{ `Valor total de Pagamentos  - ${vrTotalPagamentos}` }}
      </q-card-section>
      <template v-if="situacaoComanda != `PAGA`">
        <q-card-section class="text-subtitle1 text-weight-bold">
          {{ `Total a Pagar  - ${ vrComanda }` }}
        </q-card-section>
      </template>
    </q-card>
</template>

<script lang="ts" setup>

    defineProps({
        situacaoComanda: String,
        vrTotalLancamentos: String,
        vrTotalPagamentos: String,
        vrComanda: String,
    });

</script>
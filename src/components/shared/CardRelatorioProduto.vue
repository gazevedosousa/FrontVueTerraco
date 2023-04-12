<template>
    <q-card
        class="q-mt-sm text-center"
      >
        <q-card-section class="text-subtitle1 text-weight-bold">
          {{ `Valor Total dos Produtos Vendidos - ${vrTotal}` }}
        </q-card-section>
      </q-card>
</template>

<script lang="ts" setup>

    defineProps({
        vrTotal: String,
    })

</script>
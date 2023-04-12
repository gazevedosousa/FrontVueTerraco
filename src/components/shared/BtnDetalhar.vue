<template>
    <q-btn class="q-mr-sm" color="grey-6" @click="emit('detalhar')">
        <q-icon name="remove_red_eye" size="20px"></q-icon>
        <q-tooltip anchor="top middle" self="bottom middle">
            {{ `Detalhar Comanda ${tooltip}` }}
        </q-tooltip>
    </q-btn>
</template>

<script lang="ts" setup>

    defineProps({
        tooltip: String
    });

    const emit = defineEmits(['detalhar']);

</script>
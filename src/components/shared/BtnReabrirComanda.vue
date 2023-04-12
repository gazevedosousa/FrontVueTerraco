<template>
    <q-btn color="warning" @click="emit('reabrir')">
        <q-icon name="assignment_return" size="20px"></q-icon>
        <q-tooltip anchor="top middle" self="bottom middle">
            {{ `Reabrir Comanda ${tooltip}` }}
        </q-tooltip>
    </q-btn>
</template>

<script lang="ts" setup>

    defineProps({
        tooltip: String
    });

    const emit = defineEmits(['reabrir']);

</script>
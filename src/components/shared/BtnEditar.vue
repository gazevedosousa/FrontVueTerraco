<template>
    <q-btn class="q-mr-sm" color="grey-6"  @click="emit('editar')">
        <q-icon name="edit" size="20px"></q-icon>
        <q-tooltip anchor="top middle" self="bottom middle">
            {{ `Editar ${tooltip}` }}
        </q-tooltip>
    </q-btn>
</template>

<script lang="ts" setup>

    defineProps({
        tooltip: String
    });

    const emit = defineEmits(['editar']);

</script>
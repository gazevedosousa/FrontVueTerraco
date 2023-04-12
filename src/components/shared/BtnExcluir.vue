<template>
    <q-btn color="red-10"  @click="emit('excluir')">
        <q-icon :name="iconName" size="20px"></q-icon>
        <q-tooltip anchor="top middle" self="bottom middle">
            {{ `Excluir ${tooltip}` }}
        </q-tooltip>
    </q-btn>
</template>

<script lang="ts" setup>

    defineProps({
        tooltip: String,
        iconName: {
            type: String,
            default: "delete_forever"
        }
    });

    const emit = defineEmits(['excluir']);

</script>
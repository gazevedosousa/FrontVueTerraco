<template>
    <q-btn color="red-10"  @click="emit('fecharComanda')">
        <q-icon :name="iconName" size="20px"></q-icon>
        <q-tooltip anchor="top middle" self="bottom middle">
            Fechar Comanda
        </q-tooltip>
    </q-btn>
</template>

<script lang="ts" setup>

    defineProps({
        iconName: {
            type: String,
            default: "delete_forever"
        }
    });

    const emit = defineEmits(['fecharComanda']);

</script>
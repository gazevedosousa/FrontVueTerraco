<template>
    <q-btn color="grey-9" class="q-mr-sm" @click="emit('downloadPDF')">
        <q-icon :name="iconName" size="20px"></q-icon>
        <q-tooltip anchor="top middle" self="bottom middle">
            {{ tooltip }}
        </q-tooltip>
    </q-btn>
</template>

<script lang="ts" setup>

    defineProps({
        tooltip: String,
        iconName: {
            type: String,
            default: "picture_as_pdf"
        }
    });

    const emit = defineEmits(['downloadPDF']);

</script>
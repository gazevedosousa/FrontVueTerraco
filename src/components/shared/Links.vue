<template>
  <q-item
    clickable
    tag="a"
    target="_blank"
    @click="(e) => router.push(link)"
  >
    <q-item-section
      v-if="icon"
      avatar>
      <q-icon :name="icon" />
    </q-item-section>
    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
      <q-item-label caption>{{ caption }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

  export interface LinkInterface {
      title: string;
      caption?: string;
      link?: string;
      icon?: string;
      func?: any
  }
    
  const router = useRouter();

  withDefaults(defineProps<LinkInterface>(), {
    caption: '',
    link: '#',
    icon: '',
  });
  
</script>

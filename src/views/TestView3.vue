<template>
  <div class="q-pa-md">
    <div class="q-gutter-md" style="max-width: 300px">
      <q-input outlined v-model="text" label="Filled" name="amount" />

      <q-input outlined v-model="set" label="Outlined" name="salary" />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const text = ref("Jonathan");
const set = ref("Bethel");
</script>

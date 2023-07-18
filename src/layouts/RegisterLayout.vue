<template>
  <q-layout
    view="lHh lpr lFf"
    style="height: 400px"
    class="shadow-2 rounded-borders"
  >
    <q-header reveal elevated>
      <q-toolbar>
        <q-btn flat round dense icon="menu" class="q-mr-sm" />
        <q-avatar>
          <img src="http://localhost/backend/pic/SEI.png" />
        </q-avatar>

        <q-toolbar-title>DOST - SEI</q-toolbar-title>

        <q-btn flat round dense icon="work" to="/" />
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer reveal elevated>
      <q-avatar>
        <img src="http://localhost/backend/pic/SEI.png" />
      </q-avatar>
      <q-toolbar>
        <q-toolbar-title>DOST - SEI</q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script setup>
import { ref } from "vue";
</script>

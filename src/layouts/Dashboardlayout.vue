<template>
  <q-layout view="lHr lpR lFf">
    <q-header reveal elevated class="bg-cyan-13 text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          <q-avatar>
            <img src="http://localhost/backend/pic/admin.png" />
          </q-avatar>
          Administrator View
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered>
      <q-scroll-area
        style="
          height: calc(70% - 150px);
          margin-top: 300px;
          border-right: 1px solid #ddd;
        "
      >
        <q-list padding>
          <q-item clickable v-ripple tag="a" to="/dash">
            <q-item-section avatar>
              <q-icon name="work" />
            </q-item-section>

            <q-item-section> Position Profile </q-item-section>
          </q-item>

          <q-item clickable v-ripple tag="a" to="/applicants">
            <q-item-section avatar>
              <q-icon name="groups" />
            </q-item-section>

            <q-item-section> Applications </q-item-section>
          </q-item>

          <q-item clickable v-ripple tag="a" to="/salary">
            <q-item-section avatar>
              <q-icon name="payments" />
            </q-item-section>

            <q-item-section> Salary Grade</q-item-section>
          </q-item>

          <q-item clickable v-ripple tag="a" to="/survey">
            <q-item-section avatar>
              <q-icon name="question_answer" />
            </q-item-section>

            <q-item-section> Survey </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>

      <q-img
        class="absolute-top"
        src="https://cdn.quasar.dev/img/material.png"
        style="height: 300px"
      >
        <div class="absolute-bottom bg-transparent">
          <q-avatar size="100px" class="q-mb-sm">
            <img src="http://localhost/backend/pic/SEI.png" />
          </q-avatar>
          <div class="text-weight-bold">HRMU ADMINS</div>
          <div>@DOST-SEI</div>
        </div>
      </q-img>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    const leftDrawerOpen = ref(false);

    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
};
</script>

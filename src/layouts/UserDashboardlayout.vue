<template>
  <q-layout view="lHr lpR lFf">
    <q-header reveal elevated class="bg-cyan-13 text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          <q-avatar>
            <img src="http://localhost/backend/pic/Human.png" />
          </q-avatar>
          Applicants View
        </q-toolbar-title>

        <q-btn-dropdown
          stretch
          flat
          label="Setting"
          icon="settings_applications"
        >
          <q-list>
            <q-item-label header>Accounts</q-item-label>
            <q-item
              v-for="n in 1"
              :key="`x.${n}`"
              clickable
              v-close-popup
              tabindex="0"
              to="/"
              @click="fixed = true"
            >
              <q-item-section avatar>
                <q-avatar icon="work" color="cyan-13" text-color="white" />
              </q-item-section>

              <q-item-section>
                <q-item-label>View Positions</q-item-label>
              </q-item-section>

              <q-item-section side> </q-item-section>
            </q-item>

            <q-separator inset spaced />

            <q-item
              v-for="n in 1"
              :key="`y.${n}`"
              clickable
              v-close-popup
              tabindex="0"
              to="/"
              @click="logOut"
            >
              <q-item-section avatar>
                <q-avatar icon="logout" color="cyan-13" text-color="white" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Log Out</q-item-label>
              </q-item-section>
              <q-item-section side> </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
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
          <q-item clickable v-ripple tag="a" to="/userdash">
            <q-item-section avatar>
              <q-icon name="inbox" />
            </q-item-section>

            <q-item-section> Applicants Profile </q-item-section>
          </q-item>

          <q-item clickable v-ripple tag="a" to="/jobup">
            <q-item-section avatar>
              <q-icon name="work" />
            </q-item-section>

            <q-item-section>Job Application Status</q-item-section>
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
          <div class="text-weight-bold">{{ user.email }}</div>
          <div>
            {{ user.first_name }}
            {{ user.last_name }}
          </div>
        </div>
      </q-img>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, inject } from "vue";

const axios = inject("$axios");
const user = inject("$user");

const leftDrawerOpen = ref(false);

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
};

const logOut = () => {
  axios.post("/index.php?authlogout").then(function (response) {
    console.log(response.data);
  });
};
</script>

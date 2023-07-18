<template>
  <q-layout view="hHh lpR fFf">
    <q-header reveal elevated class="bg-cyan-13 text-black">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="http://localhost/backend/pic/SEI.png" />
          </q-avatar>
          DOST - SEI CAREERS
        </q-toolbar-title>

        <q-space />

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
              to="/jobup"
              @click="fixed = true"
            >
              <q-item-section avatar>
                <q-avatar
                  icon="account_circle"
                  color="orange-8"
                  text-color="white"
                />
              </q-item-section>

              <q-item-section>
                <q-item-label>View Profile</q-item-label>
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
              <!-- @click="fixs = true" -->
              <q-item-section avatar>
                <q-avatar icon="logout" color="orange-8" text-color="white" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Log Out</q-item-label>
              </q-item-section>
              <q-item-section side> </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </q-toolbar>

      <q-tabs v-model="tab">
        <q-route-tab name="images" label="CAREERS" to="/apply" />
        <!-- <q-route-tab name="videos" label="APPLICATION FORM" to="/agreement" /> -->
      </q-tabs>
    </q-header>

    <!-- Login Starts Here  -->

    <q-dialog v-model="fixed">
      <q-card>
        <q-card-section>
          <div class="text-h6">Login</div>
        </q-card-section>

        <q-separator />

        <q-card-section style="max-height: 50vh" class="scroll">
          <div class="q-pa-md" style="max-width: 500px">
            <q-form
              id="authForm"
              @submit.prevent="logIn"
              @reset="onReset"
              class="q-gutter-md"
            >
              <q-input
                rounded
                outlined
                required
                v-model="email"
                type="email"
                name="email"
                label="Email Address *"
                hint="Email"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Please type something',
                ]"
              >
                <template v-slot:before>
                  <q-icon name="account_circle" />
                </template>
              </q-input>

              <q-input
                rounded
                outlined
                required
                name="password"
                :type="isPwd ? 'password' : 'text'"
                v-model="password"
                label="Password *"
                hint="Password"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Please type something',
                ]"
              >
                <template v-slot:before>
                  <q-icon name="key" />
                </template>
                <template v-slot:append>
                  <q-icon
                    :name="isPwd ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="isPwd = !isPwd"
                  />
                </template>
              </q-input>

              <div class="row justify-end">
                <q-btn flat label="Close" color="orange-8" v-close-popup />
                <q-btn label="Login" type="submit" color="orange-8" />
              </div>
            </q-form>
          </div>
        </q-card-section>

        <q-separator />
      </q-card>
    </q-dialog>

    <!-- Login ends here  -->

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer reveal elevated class="bg-cyan-13 text-black">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
          </q-avatar>
          <div>DOST - SEI</div>
          <!-- <a href="/modal">test</a> -->
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script setup>
import { useQuasar } from "quasar";
import { ref, onMounted, reactive, inject } from "vue";
import { RouterLink, RouterView } from "vue-router";
import axios from "axios";
import { isTemplateNode } from "@vue/compiler-core";

const user = inject("$user");

const email = ref();
const password = ref();
const fixed = ref();
const fixs = ref();
const isPwd = ref(true);

const isPwds = ref(true);
const $q = useQuasar();

const keymonitor = () => {
  if (event.key == "Enetr") {
    app.checkLogin();
  }
};

const logIn = () => {
  var formData = new FormData(document.getElementById("authForm"));

  axios
    .post("http://localhost/backend/index.php?auth", formData, {
      withCredentials: true,
    })
    .then(function (response) {
      console.log(response.data);
      // if (response.data.error) {
      //   app.errorMessage = response.data.message;
      // } else {
      //   app.successMessage = response.data.message;
      //   app.logDetails = { email: "", password: "" };

      // }
    });
};

const logOut = () => {
  axios
    .post("http://localhost/backend/index.php?authlogout")
    .then(function (response) {
      console.log(response.data);
    });
};

const toFormData = () => {
  var form_data = new FormData();
  for (var key in obj) {
    form_data.append(key, obj[key]);
  }
  return form_data;
};
</script>

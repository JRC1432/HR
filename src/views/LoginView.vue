<template>
  <div class="q-pa-md" style="max-width: 500px">
    <q-card-section>
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
          :rules="[(val) => (val && val.length > 0) || 'Please type something']"
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
          :rules="[(val) => (val && val.length > 0) || 'Please type something']"
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
    </q-card-section>
  </div>
</template>

<script setup>
import { useQuasar } from "quasar";
import { ref, onMounted, reactive, inject } from "vue";
import { RouterLink, RouterView } from "vue-router";
import axios from "axios";
import { isTemplateNode } from "@vue/compiler-core";

const email = ref();
const password = ref();
const fixed = ref();
const fixs = ref();
const isPwd = ref(true);

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

const toFormData = () => {
  var form_data = new FormData();
  for (var key in obj) {
    form_data.append(key, obj[key]);
  }
  return form_data;
};
</script>

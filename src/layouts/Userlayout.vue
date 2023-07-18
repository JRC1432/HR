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
          :label="user?.id == null ? 'Log In / Register' : user.first_name"
          icon="group"
        >
          <q-list v-if="user?.id">
            <q-item-label header>Accounts</q-item-label>
            <q-item
              clickable
              v-close-popup
              tabindex="0"
              to="/userdash"
              @click="fixed = true"
            >
              <q-item-section avatar>
                <q-avatar
                  icon="account_circle"
                  color="cyan-13"
                  text-color="white"
                />
              </q-item-section>

              <q-item-section>
                <q-item-label>View Profile</q-item-label>
              </q-item-section>

              <q-item-section side> </q-item-section>
            </q-item>

            <q-separator inset spaced />

            <q-item clickable v-close-popup tabindex="0" @click="logOut" to="/">
              <!-- @click="fixs = true" -->
              <q-item-section avatar>
                <q-avatar icon="logout" color="cyan-13" text-color="white" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Log Out</q-item-label>
              </q-item-section>
              <q-item-section side> </q-item-section>
            </q-item>
          </q-list>
          <q-list v-else>
            <q-item-label header>Accounts</q-item-label>
            <q-item clickable v-close-popup tabindex="0" @click="fixed = true">
              <q-item-section avatar>
                <q-avatar
                  icon="account_circle"
                  color="cyan-13"
                  text-color="white"
                />
              </q-item-section>

              <q-item-section>
                <q-item-label>Log In</q-item-label>
              </q-item-section>

              <q-item-section side> </q-item-section>
            </q-item>

            <q-separator inset spaced />

            <q-item
              clickable
              v-close-popup
              tabindex="0"
              @click="fixs = true"
              to="/agreement"
            >
              <q-item-section avatar>
                <q-avatar
                  icon="assignment"
                  color="cyan-13"
                  text-color="white"
                />
              </q-item-section>
              <q-item-section>
                <q-item-label>Register</q-item-label>
              </q-item-section>
              <q-item-section side> </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </q-toolbar>

      <q-tabs v-model="tab">
        <q-route-tab name="images" label="CAREERS" to="/" />
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
              <q-btn
                flat
                rounded
                color="red"
                label="Reset Password?"
                @click="reset = true"
              />

              <div class="row justify-end">
                <q-btn flat label="Close" color="cyan-13" v-close-popup />
                <q-btn label="Login" type="submit" color="cyan-13" />
              </div>
            </q-form>
          </div>
        </q-card-section>

        <q-separator />
      </q-card>
    </q-dialog>

    <!-- Reset Password -->

    <q-dialog v-model="SuccessCode" persistent>
      <q-card style="min-width: 500px; width: 500px">
        <q-card-section>
          <div class="text-h6">Password Reset</div>
        </q-card-section>
        <q-separator />
        <q-card-section>
          <form id="regForm3" @submit.prevent="Resetpass" class="q-gutter-md">
            <q-input
              rounded
              outlined
              readonly
              v-model="state.resetemailadd"
              name="emailreset"
              label="Email Address"
            />
            <div>
              <!-- <span
                class="error"
                v-for="error in v$.emailreset.$errors"
                :key="error.$uid"
              >
                {{ error.$message }}
              </span> -->
            </div>
            <q-input
              v-model="state.passwords"
              rounded
              outlined
              :type="isPwds ? 'password' : 'text'"
              label="Password"
              name="passwords"
            >
              <template v-slot:append>
                <q-icon
                  :name="isPwds ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwds = !isPwds"
                />
              </template>
            </q-input>
            <div>
              <span
                class="error"
                v-for="error in v$.passwords.$errors"
                :key="error.$uid"
              >
                {{ error.$message }}
              </span>
            </div>
            <q-input
              v-model="state.confirmpasswords"
              rounded
              outlined
              :type="isPwds ? 'password' : 'text'"
              label="Confirm Password"
              name="confirmpasswords"
            >
              <template v-slot:append>
                <q-icon
                  :name="isPwds ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwds = !isPwds"
                />
              </template>
            </q-input>

            <div>
              <span
                class="error"
                v-for="error in v$.confirmpasswords.$errors"
                :key="error.$uid"
              >
                {{ error.$message }}
              </span>
            </div>

            <q-card-actions align="right">
              <q-btn flat label="Close" color="red-13" v-close-popup />
              <q-btn color="cyan-13" label="Submit" type="submit" />
            </q-card-actions>
          </form>
        </q-card-section>
      </q-card>
    </q-dialog>

    <!-- Email Verification -->

    <q-dialog v-model="reset" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Email Address Verification</div>
        </q-card-section>
        <q-card-section>
          <form id="regForm" @submit.prevent="Vmail" class="q-gutter-md">
            <q-input
              dense
              v-model="state.resetemailadd"
              name="emailaddress"
              autofocus
              @keyup.enter="prompt = false"
              type="email"
              hint="Email"
              lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || 'Please type something',
              ]"
            />

            <q-card-actions align="right">
              <q-btn flat label="close" color="red-13" v-close-popup />
              <q-btn color="green" flat label="Submit" type="submit" />
            </q-card-actions>
          </form>
        </q-card-section>
      </q-card>
    </q-dialog>

    <!-- Verification Code -->

    <q-dialog v-model="VerifyMe" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Verification Code</div>
        </q-card-section>
        <q-card-section>
          <form id="regForm2" @submit.prevent="VerifyCode" class="q-gutter-md">
            <q-input
              dense
              v-model="state.rvcode"
              name="vcode"
              autofocus
              @keyup.enter="prompt = false"
              hint="Verification Code"
              lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || 'Please type something',
              ]"
            />

            <q-card-actions align="right">
              <q-btn flat label="close" color="red-13" v-close-popup />
              <q-btn color="green" flat label="Verify" type="submit" />
            </q-card-actions>
          </form>
        </q-card-section>
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
            <img src="http://localhost/backend/pic/SEI.png" />
          </q-avatar>
          <div>DOST - SEI</div>
          <!-- <a href="/modal">test</a> -->
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

/

<script setup>
import { useQuasar } from "quasar";
import { ref, onMounted, reactive, inject, computed } from "vue";
import { RouterLink, RouterView } from "vue-router";

import { isTemplateNode } from "@vue/compiler-core";
import router from "../router";
import useVuelidate from "@vuelidate/core";
import { required, minLength, sameAs, helpers } from "@vuelidate/validators";

const axios = inject("$axios");
const user = inject("$user");
const email = ref();
const password = ref();
const fixed = ref();
const fixs = ref();
const isPwd = ref(true);
const VerifyMe = ref(false);
const reset = ref(false);
const SuccessCode = ref(false);

const isPwds = ref(true);
const $q = useQuasar();

const state = reactive({
  rvcode: "",
  resetemailadd: "",

  passwords: "",
  confirmpasswords: "",
});

const rules = computed(() => {
  return {
    rvcode: {
      required,
    },
    resetemailadd: { required },
    passwords: { required, minLength: minLength(8) },
    confirmpasswords: { required, sameAs: sameAs(state.passwords) },
  };
});

const v$ = useVuelidate(rules, state);

const Resetpass = async () => {
  const result = await v$.value.$validate();

  if (result) {
    var formData = new FormData(document.getElementById("regForm3"));
    axios
      .post("http://localhost/backend/update.php?passwordReset", formData)
      .then(function (response) {
        // app.salaryList = response.data.salary;

        if (response.data == true) {
          $q.notify({
            color: "green",
            message: "Password Has Been Reset",
          });
          SuccessCode.value = false;
        } else {
          $q.notify({
            color: "red",
            textColor: "white",
            message: "Unable to Reset the password",
          });
        }
      });
  } else {
    $q.notify({
      color: "red",
      textColor: "white",
      message: "Unable to Reset the password",
    });
  }
};

const Vmail = () => {
  var formData = new FormData(document.getElementById("regForm"));
  axios
    .post("http://localhost/backend/create.php?verify", formData)
    .then(function (response) {
      // app.salaryList = response.data.salary;

      if (response.data == true) {
        $q.notify({
          color: "green",
          message: "Please Check your E-mail for Verification Code",
        });
        VerifyMe.value = true;
        reset.value = false;
      } else {
        $q.notify({
          color: "red",
          textColor: "white",
          message: "Please Enter a Valid Email Address",
        });
      }
    });
};

const VerifyCode = () => {
  var formData = new FormData(document.getElementById("regForm2"));
  axios
    .post("http://localhost/backend/index.php?verifycodes", formData)
    .then(function (response) {
      // app.salaryList = response.data.salary;

      if (response.data == true) {
        $q.notify({
          color: "green",
          message: "Account Verified",
        });
        SuccessCode.value = true;
        VerifyMe.value = false;
      } else {
        $q.notify({
          color: "red",
          textColor: "white",
          message: "Verification Code Failed",
        });
      }
    });
};

const keymonitor = () => {
  if (event.key == "Enetr") {
    app.checkLogin();
  }
};
const logOut = () => {
  axios.post("/index.php?authlogout").then(function (response) {
    location.reload();
    console.log(response.data);
  });
};
const logIn = () => {
  var formData = new FormData(document.getElementById("authForm"));

  axios.post("/index.php?auth", formData).then(function (response) {
    location.reload();
    console.log(response.data);
    // if (response.data == false) {
    //   $q.notify({
    //     color: "cyan-13",
    //     textColor: "black",
    //     message: "Login Failed",
    //   });
    // } else {
    //   $q.notify({
    //     color: "cyan-13",
    //     textColor: "black",
    //     message: "login Failed",
    //   });
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

<style scope>
span.error {
  color: red;
}
</style>

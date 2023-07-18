<template>
  <!-- Register starts here -->

  <q-card>
    <q-card-section>
      <div class="text-h6">Registration</div>
    </q-card-section>

    <q-separator />

    <q-card-section style="max-height: 50vh" class="scroll">
      <div class="q-pa-md">
        <form id="regForm" @submit.prevent="Register" class="q-gutter-md">
          <q-input
            rounded
            outlined
            v-model="state.fname"
            name="fname"
            label="First Name"
          />
          <q-input
            rounded
            outlined
            v-model="state.lname"
            name="lname"
            label="Last Name"
          />
          <q-input
            rounded
            outlined
            v-model="state.remail"
            name="remail"
            label="E-mail"
          />
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

          <!-- <div class="row justify-end"> -->
          <q-card-actions align="right">
            <q-btn flat label="Back" color="red-13" to="/" />
            <q-btn color="cyan-13" label="Submit" type="submit" />
          </q-card-actions>
          <!-- </div> -->
        </form>
      </div>
    </q-card-section>
  </q-card>

  <!-- Registration Ends Here -->
</template>
<script setup>
import { useQuasar } from "quasar";
import { ref, onMounted, reactive, inject } from "vue";
import { RouterLink, RouterView } from "vue-router";
import axios from "axios";
import { isTemplateNode } from "@vue/compiler-core";

const fixed = ref();
const fixs = ref();
const $q = useQuasar();
const isPwds = ref(true);

const state = reactive({
  fname: "SG ",
  lname: "0",
  remail: "@",
  passwords: "",
});

// Registration

const Register = () => {
  var formData = new FormData(document.getElementById("regForm"));

  axios
    .post("http://localhost/backend/create.php?register", formData)
    .then(function (response) {
      // app.salaryList = response.data.salary;

      if (response.data == true) {
        fixed.value = false;
        $q.notify({
          color: "Green",
          message: "Registration Successful",
        });
      } else {
        $q.notify({
          color: "red",
          textColor: "white",
          message: "User not Registered Successfully",
        });
      }
    });
};
</script>

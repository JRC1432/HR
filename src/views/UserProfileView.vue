<template>
  <div class="q-pa-md">
    <label name="userid" hidden>{{ user.id }}</label>
    <br />
    <!-- <label name="careerid">{{ cid }}</label> -->

    <div class="bg-cyan-3 text-black">
      <q-toolbar>
        <q-btn flat round dense icon="assignment_ind" />

        <q-toolbar-title>Applicant Registration Information</q-toolbar-title>
      </q-toolbar>
      <q-toolbar inset>
        <q-breadcrumbs active-color="cyan-13" style="font-size: 16px">
          <q-breadcrumbs-el
            label="Applicant Profile"
            icon="account_circle"
            to="/userdash"
          />
        </q-breadcrumbs>
      </q-toolbar>
    </div>
  </div>

  <div class="q-pa-md">
    <div class="q-col-gutter-md row items-start">
      <div class="col-xs-12 col-sm-4 col-md-4">
        <q-input
          outlined
          v-model="state.fname"
          hint="First Name"
          :dense="dense"
          disable
          readonly
        />
      </div>
      <div class="col-xs-12 col-sm-4 col-md-4">
        <q-input
          outlined
          v-model="state.mname"
          hint="Middle Initial"
          :dense="dense"
          disable
          readonly
        />
      </div>
      <div class="col-xs-12 col-sm-4 col-md-4">
        <q-input
          outlined
          v-model="state.lname"
          hint="Last Name"
          :dense="dense"
          disable
          readonly
        />
      </div>
      <div class="col-xs-12 col-sm-4 col-md-4">
        <q-input
          outlined
          v-model="state.bdate"
          hint="Birthdate"
          :dense="dense"
          disable
          readonly
        />
      </div>
      <div class="col-xs-12 col-sm-4 col-md-4">
        <q-input
          outlined
          v-model="state.sex"
          hint="SEX"
          :dense="dense"
          disable
          readonly
        />
      </div>
      <div class="col-xs-12 col-sm-4 col-md-4">
        <q-input
          outlined
          v-model="state.cnumber"
          hint="Contact Number"
          :dense="dense"
          disable
          readonly
        />
      </div>
      <div class="col-xs-12 col-sm-4 col-md-4">
        <q-input
          outlined
          v-model="state.mail"
          hint="Email Address"
          :dense="dense"
          disable
          readonly
        />
      </div>
    </div>
    <br />

    <div class="bg-cyan-3 text-black">
      <q-toolbar>
        <q-btn flat round dense icon="work" />

        <q-toolbar-title>Career Details</q-toolbar-title>
      </q-toolbar>
    </div>
    <br />

    <div class="q-col-gutter-md row items-start">
      <div class="col-xs-12 col-sm-6 col-md-6">
        <q-input
          outlined
          v-model="state.pnumber"
          hint="Plantilla Item No."
          :dense="dense"
          disable
          readonly
        />
      </div>

      <div class="col-xs-12 col-sm-6 col-md-6">
        <q-input
          outlined
          v-model="state.jtitle"
          hint="Job Title"
          :dense="dense"
          disable
          readonly
        />
      </div>
      <div class="col-xs-12 col-sm-6 col-md-6">
        <q-input
          outlined
          v-model="state.educ"
          hint="Education"
          :dense="dense"
          disable
          readonly
        />
      </div>
      <!-- <div class="col-xs-12 col-sm-2 col-md-2">
        <q-input
          outlined
          v-model="state.sal"
          hint="Salary Grade"
          :dense="dense"
          disable
          readonly
        />
      </div>
      <div class="col-xs-12 col-sm-4 col-md-4">
        <q-input
          outlined
          v-model="state.amountsal"
          hint="Amount"
          :dense="dense"
          disable
          readonly
        />
      </div> -->

      <div class="col-12">
        <q-input
          outlined
          v-model="state.add"
          hint="Address"
          :dense="dense"
          disable
          readonly
        />
      </div>
    </div>

    <br />

    <div class="bg-cyan-3 text-black">
      <q-toolbar>
        <q-btn flat round dense icon="file_open" />

        <q-toolbar-title>Files</q-toolbar-title>
      </q-toolbar>
    </div>
    <br />

    <div class="q-col-gutter-md row items-start">
      <div class="col-xs-12 col-sm-3 col-md-3">
        <q-btn
          outline
          round
          color="green"
          icon="file_open"
          :href="'http://localhost/backend/' + regcvs"
          target="_blank"
        />
        <label>Curriculumn Vitae</label>
      </div>
      <div class="col-xs-12 col-sm-3 col-md-3">
        <q-btn
          outline
          round
          color="green"
          icon="file_open"
          :href="'http://localhost/backend/' + regpds"
          target="_blank"
        />
        <label>Personal Data Sheet</label>
      </div>
      <div class="col-xs-12 col-sm-3 col-md-3">
        <q-btn
          outline
          round
          color="green"
          icon="file_open"
          :href="'http://localhost/backend/' + regwes"
          target="_blank"
        />
        <label>Work Experience Sheet</label>
      </div>
      <div class="col-xs-12 col-sm-3 col-md-3">
        <q-btn
          outline
          round
          color="green"
          icon="file_open"
          :href="'http://localhost/backend/' + regdipl"
          target="_blank"
        />
        <label>Diploma</label>
      </div>
      <div class="col-xs-12 col-sm-3 col-md-3">
        <q-btn
          outline
          round
          color="green"
          icon="file_open"
          :href="'http://localhost/backend/' + regtor"
          target="_blank"
        />
        <label>TOR</label>
      </div>
      <div class="col-xs-12 col-sm-3 col-md-3">
        <q-btn
          outline
          round
          color="green"
          icon="file_open"
          :href="'http://localhost/backend/' + regligibility"
          target="_blank"
        />
        <label>Eligibility</label>
      </div>
      <div class="col-xs-12 col-sm-3 col-md-3">
        <q-btn
          outline
          round
          color="green"
          icon="file_open"
          :href="'http://localhost/backend/' + regapp"
          target="_blank"
        />
        <label>Application Letter</label>
      </div>
      <div class="col-xs-12 col-sm-3 col-md-3">
        <q-btn
          outline
          round
          color="green"
          icon="file_open"
          :href="'http://localhost/backend/' + regtraincert"
          target="_blank"
        />
        <label>Training Certificate</label>
      </div>
      <div class="col-xs-12 col-sm-3 col-md-3">
        <q-btn
          outline
          round
          color="green"
          icon="file_open"
          :href="'http://localhost/backend/' + regper"
          target="_blank"
        />
        <label>Performance Evaluation</label>
      </div>
      <!-- <q-btn @click="test" color="red" label="Test" /> -->
    </div>
  </div>
</template>
<script setup>
import { useQuasar } from "quasar";
import { ref, onMounted, reactive, inject } from "vue";
import { useRoute } from "vue-router";

import { isTemplateNode } from "@vue/compiler-core";

const router = useRoute;

const axios = inject("$axios");
const user = inject("$user");
const $q = useQuasar();

const cid = ref();

const regcvs = ref();
const regpds = ref();
const regwes = ref();
const regdipl = ref();
const regtor = ref();
const regligibility = ref();
const regapp = ref();
const regtraincert = ref();
const regper = ref();
const careerid = cid;

const state = reactive({
  fname: "",
  mname: "",
  lname: "",
  bdate: "",
  sex: "",
  cnumber: "",
  mail: "",
  pnumber: "",
  jtitle: "",
  educ: "",
  eligibility: "",
  sal: "",
  amountsal: "",
  add: "",
});

onMounted(() => {
  readReg();
});

const readReg = () => {
  var formData = new FormData();
  formData.append("userid", user.id);
  axios
    .post("http://localhost/backend/index.php?readappreg", formData)
    .then((response) => {
      cid.value = response.data.job_id;
      state.fname = response.data.first_name;
      state.mname = response.data.regmidname;
      state.lname = response.data.last_name;
      state.bdate = response.data.regdate;
      state.sex = response.data.gender;
      state.cnumber = response.data.contact;
      state.mail = response.data.email;
      state.pnumber = response.data.plantilla;
      state.jtitle = response.data.regjob;
      state.educ = response.data.educ;
      state.add = response.data.area;

      regcvs.value = response.data.cv;
      regpds.value = response.data.pds;
      regwes.value = response.data.wes;
      regdipl.value = response.data.diploma;
      regtor.value = response.data.tor;
      regligibility.value = response.data.eligibility;
      regapp.value = response.data.appletter;
      regtraincert.value = response.data.traincert;
      regper.value = response.data.per;
    });
};

// const test = () => {
//   console.log(cid.value);
// };

// onMounted(() => {
//   readSalary();
// });

// const readSalary = () => {
//   console.log(user.id);
//   var formData = new FormData();
//   formData.append("sal_id", cid.value);

//   axios
//     .post("http://localhost/backend/index.php?readsalids", formData)
//     .then((response) => {
//       state.sal = response.data.salgrade;
//       state.amountsal = response.data.amount;
//     });
// };
</script>

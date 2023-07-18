<template>
  <br />
  <div class="q-pa-md q-gutter-sm">
    <q-banner rounded class="bg-cyan-13 text-black">
      <h2>CAREERS</h2>
      <template v-slot:action> </template>
    </q-banner>
  </div>

  <br />
  <br />
  <br />

  <div class="q-pa-md">
    <q-table
      ref="tableRef"
      title="List of Careers"
      :rows="rows"
      :columns="columns"
      row-key="id"
      :loading="loading"
      :filter="filter"
      separator="cell"
      v-model:selected="selected"
    >
      <template v-slot:top-right>
        <!-- Search Bar -->
        <q-input
          rounded
          outlined
          debounce="300"
          v-model="filter"
          placeholder="Search"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>

      <!-- End of Search Bar -->

      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn
            class="bi bi-info-circle"
            color="cyan-13"
            @click="show(props)"
            icon="dehaze"
          >
          </q-btn>
        </q-td>
      </template>
    </q-table>
  </div>
  <q-dialog v-model="fixed">
    <q-card>
      <q-card-section>
        <div class="text-h6">{{ jobname }}</div>
      </q-card-section>

      <q-separator />

      <q-card-section style="max-height: 50vh" class="scroll">
        <div class="text-h7">Position Title: {{ jobname }}</div>
        <div class="text-h7">Plantilla Item Number: {{ plantillaitem }}</div>
        <div class="text-h7">Eligibility: {{ eligible }}</div>
        <div class="text-h7">Area of Assignment: {{ location }}</div>
        <div class="text-h7">Salary Grade: {{ sg }} Amount: ₱ {{ val }}</div>
        <br />
        <div class="text-h7">Education:</div>
        <div class="text-h7">{{ educt }}</div>
        <br />
        <div class="text-h7">Experience:</div>
        <div class="text-h7">{{ experyrs }} {{ exper }}</div>
        <br />
        <div class="text-h7">Trainings:</div>
        <div class="text-h7">{{ trainshrs }} {{ trains }}</div>
        <br />
        <div class="text-h7">COMPETENCIES:</div>
        <ul>
          <template v-for="des in desc" :key="des.desc">
            <li>{{ des.description }}</li>
          </template>
        </ul>
        <br />
        <div class="text-h7">DUTIES AND RESPONSIBILITIES:</div>
        <ul>
          <template v-for="ddes in ddesc" :key="ddes.ddesc">
            <li>{{ ddes.description }}</li>
          </template>
        </ul>
      </q-card-section>

      <q-separator />

      <q-card-actions align="right">
        <q-btn flat label="Close" color="red-13" v-close-popup />
        <q-btn
          flat
          label="Apply Now!"
          color="cyan-13"
          v-close-popup
          :to="user?.id ? '/application/' + jobid : '/agreement'"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { useQuasar } from "quasar";
import { ref, onMounted, reactive, inject } from "vue";
import { useRoute } from "vue-router";

import { isTemplateNode } from "@vue/compiler-core";

const php = { style: "currency", currency: "PHP" };

const router = useRoute;

const axios = inject("$axios");
const user = inject("$user");
const $q = useQuasar();
const columns = [
  {
    name: "jobtitle",
    label: "Position Title",
    field: "jobtitle",
    align: "left",
    sortable: true,
  },
  {
    name: "plantilla",
    label: "Plantilla",
    field: "plantilla",
    align: "left",
    sortable: true,
  },
  {
    name: "salgrade",
    label: "Salary Grade",
    field: "salgrade",
    align: "left",
    sortable: true,
  },
  {
    name: "amount",
    label: "Salary Per Month",
    field: "amount",
    align: "left",
    sortable: true,
    format: Intl.NumberFormat("en-US", php).format,
  },
  {
    name: "area",
    label: "Office Designation",
    field: "area",
    align: "left",
    sortable: true,
  },

  {
    name: "enddate",
    label: "End Date",
    field: "enddate",
    align: "left",
    sortable: true,
  },
  { name: "actions", label: "Actions", field: "", align: "center" },
];

const editModal = ref(false);
const fixed = ref(false);
const salaryList = [];
const tableRef = ref();
const rows = ref([]);
const filter = ref("");
const loading = ref(false);
const selected = ref([]);

// Back-End
const jobname = ref();
const plantillaitem = ref();
const location = ref();
const sg = ref();
const val = ref();
const eligible = ref();
const desc = ref();
const ddesc = ref();
const educt = ref();
const exper = ref();
const jobid = ref();

const experyrs = ref();
const trains = ref();
const trainshrs = ref();

// const editRow = ref(false);
// const deleteRow = ref(false);
const pagination = ref({
  sortBy: "desc",
  descending: false,
  page: 1,
  rowsPerPage: 10,
  // rowsNumber: 10,
});

const showDetails = (e, row, index) => {
  e.preventDefault();
  console.log(row);
};

onMounted(() => {
  readjob();
});

// readJob
const readjob = () => {
  axios
    .get("http://localhost/backend/index.php?readJob")
    .then(function (response) {
      rows.value = response.data;
    });
};

const show = (props) => {
  fixed.value = true;
  console.log(props.row.job_id);
  jobid.value = props.row.job_id;
  jobname.value = props.row.jobtitle;
  plantillaitem.value = props.row.plantilla;
  location.value = props.row.area;
  sg.value = props.row.salgrade;
  val.value = props.row.amount;
  eligible.value = props.row.eligibility;
  educt.value = props.row.educ;
  exper.value = props.row.exp;
  experyrs.value = props.row.yrsexp;
  trains.value = props.row.training;
  trainshrs.value = props.row.hrstraining;

  desc.value = props.row.description;
  ddesc.value = props.row.description;

  var formData = new FormData();
  formData.append("job_id", props.row.job_id);

  axios
    .post("http://localhost/backend/index.php?readcompetency", formData)
    .then(function (response) {
      desc.value = response.data;
    });

  axios
    .post("http://localhost/backend/index.php?readduty", formData)
    .then(function (response) {
      ddesc.value = response.data;
    });
};
</script>

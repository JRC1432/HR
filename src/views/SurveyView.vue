<template>
  <div class="q-pa-md">
    <q-table
      ref="tableRef"
      title="Survey Lists"
      :rows="rows"
      :columns="columns"
      row-key="id"
      :loading="loading"
      separator="cell"
      :filter="filter"
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
    </q-table>
  </div>
</template>

<script setup>
import { useQuasar } from "quasar";
import { ref, onMounted, reactive, inject } from "vue";
import axios from "axios";
import { isTemplateNode } from "@vue/compiler-core";

const tableRef = ref();
const rows = ref([]);
const filter = ref("");

const $q = useQuasar();
const columns = [
  {
    name: "reg_id",
    label: "Registration ID",
    field: "reg_id",
    align: "left",
    sortable: true,
  },
  {
    name: "regfirstname",
    label: "Fist Name",
    field: "regfirstname",
    align: "left",
    sortable: true,
  },
  {
    name: "reglastname",
    label: "Last Name",
    field: "reglastname",
    align: "left",
    sortable: true,
  },
  {
    name: "regemail",
    label: "E-mail",
    field: "regemail",
    align: "left",
    sortable: true,
  },
  {
    name: "vacancy",
    label: "Job Posting",
    field: "vacancy",
    align: "left",
    sortable: true,
  },
  {
    name: "description",
    label: "Feedback Description",
    field: "description",
    align: "left",
    sortable: true,
  },
  {
    name: "star",
    label: "Survey Points",
    field: "star",
    align: "left",
    sortable: true,
  },
  {
    name: "datetime",
    label: "Date and Time",
    field: "datetime",
    align: "left",
    sortable: true,
  },
];

const pagination = ref({
  sortBy: "desc",
  descending: false,
  page: 1,
  rowsPerPage: 10,
});

onMounted(() => {
  readSurvey();
});

const readSurvey = () => {
  axios
    .get("http://localhost/backend/index.php?readsurveys")
    .then(function (response) {
      rows.value = response.data;
    });
};
</script>

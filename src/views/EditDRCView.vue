<template>
  <div class="q-pa-md">
    <div class="bg-cyan text-white">
      <q-toolbar>
        <q-btn flat round dense icon="assignment_ind" />

        <q-toolbar-title>Position Lists Directory</q-toolbar-title>

        <!-- <q-btn flat round dense icon="sim_card" class="q-mr-xs" />
        <q-btn flat round dense icon="gamepad" /> -->
      </q-toolbar>
      <q-toolbar inset>
        <q-breadcrumbs active-color="white" style="font-size: 16px">
          <q-breadcrumbs-el label="Positions" icon="work" to="/dash" />
          <q-breadcrumbs-el
            label="Update Position"
            icon="add"
            :to="'/updateJob/' + jobids"
          />
          <q-breadcrumbs-el
            label="Update Competencies"
            :to="'/editdrc/' + jobids"
          />
          <q-breadcrumbs-el
            label="Update Duties & Responsibilities"
            :to="'/editduties/' + jobids"
          />
        </q-breadcrumbs>
      </q-toolbar>
    </div>

    <!-- <label name="jobidssss">{{ jobids }}</label> -->

    <q-table
      ref="tableRef"
      title="List of Competencies"
      :rows="rows"
      :columns="columns"
      row-key="id"
      :loading="false"
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
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn
            dense
            round
            flat
            color="red"
            @click="deleteRow(props)"
            icon="delete"
          ></q-btn>
        </q-td>
      </template>
    </q-table>

    <br />

    <!-- Comptencies Starts Here -->
    <form id="form3" @submit.prevent="editcompetencies">
      <div class="col-12">
        <q-table
          title="Competencies"
          :rows="maincrows"
          :columns="compcolumns"
          row-key="name"
        >
          <template v-slot:header="props">
            <q-tr :props="props">
              <q-th auto-width />
              <q-th v-for="col in props.cols" :key="col.name" :props="props">
                {{ col.label }}
              </q-th>
            </q-tr>
          </template>

          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td auto-width>
                <q-btn
                  size="sm"
                  color="accent"
                  round
                  dense
                  @click="props.expand = !props.expand"
                  :icon="props.expand ? 'remove' : 'add'"
                />
              </q-td>
              <q-td v-for="col in props.cols" :key="col.name" :props="props">
                {{ col.value }}
              </q-td>
            </q-tr>
            <q-tr v-show="props.expand" :props="props">
              <q-td colspan="100%">
                <div class="text-left">
                  <div v-if="props.row.name == 'Core'">
                    <q-card flat bordered>
                      <q-table
                        dense
                        hide-pagination
                        disable-pagination
                        flat
                        :rows="crows"
                        :columns="ccolumns"
                        row-key="name"
                        :selected-rows-label="getSelectedString"
                        selection="multiple"
                        v-model:selected="selected"
                      />
                    </q-card>
                  </div>
                  <div v-if="props.row.name == 'Leadership'">
                    <q-card flat bordered>
                      <q-table
                        dense
                        hide-pagination
                        disable-pagination
                        flat
                        :rows="lrows"
                        :columns="lcolumns"
                        row-key="name"
                        :selected-rows-label="getSelectedString"
                        selection="multiple"
                        v-model:selected="selected"
                      />
                    </q-card>
                  </div>
                  <div v-if="props.row.name == 'Functional'">
                    <q-card flat bordered>
                      <q-table
                        dense
                        flat
                        :rows="frows"
                        :columns="fcolumns"
                        row-key="name"
                        :selected-rows-label="getSelectedString"
                        selection="multiple"
                        v-model:selected="selected"
                      />
                    </q-card>
                  </div>
                </div>
              </q-td>
            </q-tr>
          </template>
        </q-table>
        <br />
        <q-btn
          size="22px"
          class="q-px-xl q-py-xs"
          color="cyan-13"
          label="Add"
          type="submit"
        />
      </div>
    </form>

    <!-- <div class="q-mt-md">Selected: {{ JSON.stringify(selected) }}</div> -->

    <!-- Comptencies Ends Here  -->
  </div>
</template>
<script setup>
import { ref, reactive, onMounted } from "vue";
import { useQuasar } from "quasar";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";

const $q = useQuasar();

const route = useRoute();
const router = useRouter();

const newTodo = ref("");
const todos = ref([]);

const jobids = route.params.id;
const jobidssss = ref();

const editModal = ref(false);
const fixed = ref(false);
const confirm = ref(false);
const salaryList = [];
const tableRef = ref();
const rows = ref([]);

const filter = ref("");
const loading = ref(false);
const selected = ref([]);
// const editRow = ref(false);
// const deleteRow = ref(false);
const pagination = ref({
  sortBy: "desc",
  descending: false,
  page: 1,
  rowsPerPage: 10,
  // rowsNumber: 10,
});
const columns = [
  {
    name: "decription",
    label: "Description",
    field: "description",
    align: "left",
  },
  { name: "actions", label: "Actions", field: "", align: "center" },
];

onMounted(() => {
  editcomp();
});

const editcomp = () => {
  jobidssss.value = route.params.id;
  var formData = new FormData();
  formData.append("jobidssss", jobidssss.value);
  axios
    .post("http://localhost/backend/index.php?editcomp", formData)
    .then((response) => {
      rows.value = response.data;
    });
};

const deleteRow = (props) => {
  console.log(props.row.comp_id);
  var formData = new FormData();
  formData.append("comp_id", props.row.comp_id);
  axios
    .post("http://localhost/backend/delete.php?deletecomp", formData)
    .then(function (response) {
      // app.salaryList = response.data.salary;
      // console.log(response);

      if (response.data == true) {
        $q.notify({
          color: "Green",
          message: "Deleted",
        });
        confirm.value = false;
        editcomp();
      } else {
        $q.notify({
          color: "red",
          textColor: "white",
          message: "Not Deleted",
        });
      }
    });
};

const compcolumns = [
  {
    name: "desc",
    required: true,
    label: "",
    align: "left",
    field: (row) => row.name,
    format: (val) => `${val}`,
    sortable: true,
  },
];

const ccolumns = [
  {
    name: "desc",
    required: true,
    label: "Select All",
    align: "left",
    field: (row) => row.name,
    format: (val) => `${val}`,
    sortable: true,
  },
];
const lcolumns = [
  {
    name: "desc",
    required: true,
    label: "Select All",
    align: "left",
    field: (row) => row.name,
    format: (val) => `${val}`,
    sortable: true,
  },
];

const fcolumns = [
  {
    name: "desc",
    required: true,
    label: "Select All",
    align: "left",
    field: (row) => row.name,
    format: (val) => `${val}`,
    sortable: true,
  },
];

const maincrows = [
  {
    name: "Core",
  },
  {
    name: "Leadership",
  },
  {
    name: "Functional",
  },
];

const crows = ref([
  {
    name: "Exemplifying Integrity",
  },
  {
    name: "Delivering Professional and Excellence Service",
  },
  {
    name: "Solving Problems and Making Decisions",
  },
]);

const lrows = ref([
  {
    name: "Building Collaborative, Inclusive Working Relation...",
  },
  {
    name: "Managing Performance and Coaching Results",
  },
  {
    name: "Leading Change",
  },
  {
    name: "Thinking Strategically and Creatively",
  },
  {
    name: "Creating and Nurturing a High-Perfroming Organization",
  },
]);

const frows = ref([
  {
    name: "Bills Review and Evaluation",
  },
  {
    name: "Financial Management",
  },
  {
    name: "Human Resource Management and Development",
  },
  {
    name: "Information Systems Management",
  },
  {
    name: "Information Technology Management",
  },
  {
    name: "Innovation",
  },
  {
    name: "Internal Audit Mangement",
  },
  {
    name: "Knowledge Management",
  },
  {
    name: "Media and Public Relations Management",
  },
  {
    name: "Monitoring and Evaluation",
  },
  {
    name: "Budget Administration and Control",
  },
  {
    name: "Oral and Written Communication",
  },
  {
    name: "Organizational Development",
  },
  {
    name: "Policy Management",
  },
  {
    name: "Procurement Management",
  },
  {
    name: "Program Management",
  },
  {
    name: "Project Management",
  },
  {
    name: "Records Management",
  },
  {
    name: "Risk Management",
  },
  {
    name: "Scholarship Administration Management",
  },
  {
    name: "Scholarship Funds Management",
  },
  {
    name: "Building Maintenance Management",
  },
  {
    name: "Stakeholders Relationship Management",
  },
  {
    name: "Statistics and Data Analytics",
  },
  {
    name: "STEM Events Management",
  },
  {
    name: "Technical Training Administration",
  },
  {
    name: "Use of Technology",
  },
  {
    name: "Cash Management",
  },
  {
    name: "Change Adaptation",
  },
  {
    name: "Collaboration and Networking",
  },
  {
    name: "Committee/Secretariat Services",
  },
  {
    name: "Documents and Records Management",
  },
]);

const editcompetencies = () => {
  var formData = new FormData(document.getElementById("form3"));
  console.log(JSON.stringify(selected.value));
  formData.append("jobidssss", jobidssss.value);
  formData.append("ccompetencies", JSON.stringify(selected.value));
  // console.log(formData);
  axios
    .post("http://localhost/backend/update.php?editcompetencies", formData)
    .then(function (response) {
      if (response.data == true) {
        $q.notify({
          color: "Green",
          message: "Added Successfully",
        });
        editcomp();
      } else {
        $q.notify({
          color: "red",
          textColor: "white",
          message: "Position Lists not Created",
        });
      }
    });
};
</script>

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
          <q-breadcrumbs-el label="Create New Position" icon="add" to="/jobs" />
        </q-breadcrumbs>
      </q-toolbar>
    </div>

    <q-table
      ref="tableRef"
      title="List of Positions"
      :rows="rows"
      :columns="columns"
      row-key="id"
      :loading="false"
      separator="cell"
      :filter="filter"
      v-model:selected="selected"
    >
      <template #body="props">
        <q-tr :props="props">
          <q-td key="jobtitle">
            {{ props.row.jobtitle }}
          </q-td>
          <q-td key="plantilla">
            {{ props.row.plantilla }}
          </q-td>
          <q-td key="salgrade">
            {{ props.row.salgrade }}
          </q-td>
          <q-td key="area">
            <div
              v-if="
                props.row.area ===
                'Finance and Administrative Division, 1st Level Science Heritage Building, DOST Compd., Bicutan, Taguig City'
              "
            >
              FAD
            </div>

            <div
              v-else-if="
                props.row.area ===
                'Office of the Director, 2nd Level Science Heritage Building, DOST Compd., Bicutan, Taguig City'
              "
            >
              OD
            </div>

            <div
              v-else-if="
                props.row.area ===
                'S&T Scholarship Division, 2nd Level Science Heritage Building, DOST Compd., Bicutan, Taguig City'
              "
            >
              STSD
            </div>

            <div
              v-else-if="
                props.row.area ===
                'S&T Manpower Education Research and Promotion Division, 1st Level Science Heritage Building, DOST Compd., Bicutan, Taguig City'
              "
            >
              STMERD
            </div>
            <div
              v-else-if="
                props.row.area ===
                'Science Education and Innovations Division, 2nd Level Science Heritage Building, DOST Compd., Bicutan, Taguig City'
              "
            >
              SEID
            </div>
          </q-td>
          <q-td key="datetime">
            {{ props.row.datetime }}
          </q-td>
          <q-td key="enddate">
            {{ props.row.enddate }}
          </q-td>
          <q-td key="stats">
            {{ props.row.stats }}
          </q-td>
          <q-td>
            <q-toggle
              v-model="props.row.postopt"
              color="green"
              @update:model-value="open(props)"
            />
          </q-td>
          <q-td>
            <q-btn
              dense
              round
              flat
              color="primary"
              @click="editRow(props)"
              icon="edit"
              :to="'/updateJob/' + props.row.job_id"
            ></q-btn>
            <q-btn
              dense
              round
              flat
              color="red"
              @click="deletePost(props)"
              icon="delete"
            ></q-btn>
            <q-btn
              color="cyan-13"
              class="bi bi-info-circle"
              @click="show(props)"
              icon="dehaze"
            ></q-btn>
          </q-td>
        </q-tr>
      </template>

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

  <!-- Confirmation -->

  <q-dialog v-model="confirm" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <q-avatar icon="work" color="orange-8" text-color="white" />

        <span class="q-ml-sm"
          >Do you want to post this position in careers page?</span
        >
        <div class="justify-center">
          <br />
          <br />
          <h7>Please indicate the End Date below:</h7>
          <br />
          <br />
          <q-input
            v-model="state.date"
            filled
            type="date"
            hint="End date"
            name="date"
          />
        </div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn
          flat
          label="Cancel"
          color="primary"
          @click="readposition"
          v-close-popup
        />
        <q-btn
          flat
          label="Confirm"
          color="orange-8"
          @click="UnFilled"
          v-close-popup
        />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <q-dialog v-model="delconfirm" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <q-avatar icon="delete" color="primary" text-color="white" />
        <span class="q-ml-sm">Do you want to delete this item?</span>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Cancel" color="red" v-close-popup />
        <q-btn
          flat
          label="Confirm"
          color="cyan-13"
          @click="deletsal"
          v-close-popup
        />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <!-- Confirmation End -->

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
        <div class="text-h7">
          Salary Grade: {{ sg }} Amount: ₱. {{ val }} monthly
        </div>
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
        <q-btn flat label="Close" color="primary" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { useQuasar } from "quasar";
import { ref, onMounted, reactive, inject } from "vue";
import axios from "axios";
import { isTemplateNode, transformBind } from "@vue/compiler-core";
import { useRoute, useRouter } from "vue-router";
const $q = useQuasar();

const route = useRoute();
const router = useRouter();

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
    name: "area",
    label: "Office Designation",
    field: "area",
    align: "left",
    sortable: true,
  },
  {
    name: "datetime",
    label: "Date Posted",
    field: "datetime",
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
  {
    name: "stats",
    label: "Status",
    field: "stats",
    align: "left",
    sortable: true,
  },
  { name: "actionssss", label: "Post", field: "", align: "center" },
  { name: "actions", label: "Actions", field: "", align: "center" },
];

const editModal = ref(false);
const fixed = ref(false);
const delconfirm = ref(false);
const salaryList = [];
const tableRef = ref();
const rows = ref([]);
const filter = ref("");
const loading = ref(false);
const selected = ref([]);
const jobid = ref();
const pagination = ref({
  sortBy: "desc",
  descending: false,
  page: 1,
  rowsPerPage: 10,
  // rowsNumber: 10,
});

// Back-End declaration
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

const experyrs = ref();
const trains = ref();
const trainshrs = ref();

const state = reactive({
  date: "",
});

const showDetails = (e, row, index) => {
  e.preventDefault();
  console.log(row);
};

onMounted(() => {
  readposition();
});

// read job
const readposition = () => {
  axios
    .get("http://localhost/backend/index.php?readPosition")
    .then(function (response) {
      rows.value = response.data;
    });
};

const currprops = ref();
// Remove Position

const deletePost = (props) => {
  delconfirm.value = true;
  console.log(props.row.job_id);
  currprops.value = props;
};

const deletsal = () => {
  console.log(currprops.value.row.job_id);
  var formData = new FormData();
  formData.append("job_id", currprops.value.row.job_id);

  axios
    .post("http://localhost/backend/delete.php?deleteposition", formData)
    .then(function (response) {
      // app.salaryList = response.data.salary;
      // console.log(response);

      if (response.data == true) {
        $q.notify({
          color: "red",
          textColor: "white",
          message: "Position Deleted",
        });

        readposition();
        delconfirm.value = false;
      } else {
        $q.notify({
          color: "red",
          textColor: "white",
          message: "Position not deleted",
        });
      }
    });
};

const confirm = ref(false);
const toggleswicth = ref(false);
const currentprops = ref();

const open = (props) => {
  currentprops.value = props;
  state.date = props.row.enddate;

  if (props.row.postopt == true) {
    confirm.value = true;
  } else {
    console.log(props.row.job_id);
    var formData = new FormData();
    formData.append("job_id", props.row.job_id);
    axios
      .post("http://localhost/backend/update.php?updateFilled", formData)
      .then(function (response) {
        if (response.data == true) {
          $q.notify({
            color: "cyan-13",
            textColor: "black",
            message: "The position is now disabled from career page",
          });

          readposition();
        } else {
          $q.notify({
            color: "red",
            textColor: "white",
            message: "Failed response",
          });
        }
      });
  }
};

const UnFilled = () => {
  console.log(currentprops.value.row.job_id);
  var formData = new FormData();
  formData.append("job_id", currentprops.value.row.job_id);
  formData.append("date", state.date);

  axios
    .post("http://localhost/backend/update.php?updateUnfilled", formData)
    .then(function (response) {
      // app.salaryList = response.data.salary;
      // console.log(response);

      if (response.data == true) {
        $q.notify({
          color: "cyan-13",
          textColor: "black",
          message: "The Position is now Available",
        });

        readposition();
      } else {
        $q.notify({
          color: "red",
          textColor: "white",
          message: "Failed response",
        });
      }
    });

  axios
    .post("http://localhost/backend/update.php?updateenddate", formData)
    .then(function (response) {
      // app.salaryList = response.data.salary;
      // console.log(response);

      if (response.data == true) {
        $q.notify({
          color: "cyan-13",
          textColor: "black",
          message: "End Date Updated Successfully",
        });

        readposition();
      } else {
        $q.notify({
          color: "red",
          textColor: "white",
          message: "Failed response",
        });
      }
    });
};

const editRow = (props) => {
  console.log(props.row.job_idjobid);
};

const show = (props) => {
  fixed.value = true;

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

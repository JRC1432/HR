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
    <br />
    <form id="form2" @submit.prevent="updatejob">
      <div class="col-xs-12 col-sm-6">
        <!-- <h2>Update Position</h2> -->
        <!-- <lable name="jobidss">{{ jobids }}</lable> -->

        <div class="q-col-gutter-md row items-start">
          <div class="col-12">
            <q-input
              filled
              v-model="state.upjob"
              label="Required*"
              hint="Position Title"
              name="upjob"
              lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || 'Please type something',
              ]"
            />
          </div>

          <div class="col-xs-12 col-sm-6 col-md-6">
            <!-- Input field start here -->
            <q-input
              filled
              v-model="state.upplantilla"
              label="Required*"
              hint="Plantilla Item No."
              name="upplantilla"
              lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || 'Please type something',
              ]"
            />
          </div>

          <div class="col-xs-12 col-sm-6 col-md-6">
            <q-select
              outlined
              v-model="state.upsalarygrade"
              :options="options"
              label="Salary Grade"
              emit-value
              map-options
              name="upsalarygrade"
            />
          </div>

          <div class="col-xs-12 col-sm-4 col-md-4">
            <label>Status:</label>
            <q-select
              label="Please select the status"
              transition-show="flip-up"
              transition-hide="flip-down"
              filled
              v-model="state.upgroup5"
              :options="statusoption"
              name="upgroup5"
            />
          </div>
          <!-- put here -->

          <div class="col-xs-12 col-sm-4 col-md-4">
            <label>Area of Assignment:</label>
            <q-select
              label="Please select the area of assignment"
              transition-show="flip-up"
              transition-hide="flip-down"
              filled
              v-model="state.upgroup3"
              :options="assignoptions"
              name="upgroup3"
            />
          </div>

          <div class="col-xs-12 col-sm-4 col-md-4">
            <label>Eligibility:</label>
            <q-select
              label="Please select the status"
              transition-show="flip-up"
              transition-hide="flip-down"
              filled
              v-model="state.upgroup2"
              :options="eligibilityoptions"
              name="upgroup2"
            />
          </div>

          <div class="col-12">
            <label>Education: </label>
            <q-select
              label="Please select the status"
              transition-show="flip-up"
              transition-hide="flip-down"
              filled
              v-model="state.upgroup4"
              :options="educoptions"
              name="upgroup4"
              use-input
              new-value-mode
            />
          </div>

          <div class="col-xs-12 col-sm-2 col-md-2">
            <label>Years of Experience:</label>
            <q-input
              v-model.number="state.model1"
              type="number"
              name="upyrsexp"
              filled
            />
          </div>

          <div class="col-xs-10 col-sm-10 col-md-10">
            <label>Experience Description: </label>
            <q-select
              label="Please select the status"
              transition-show="flip-up"
              transition-hide="flip-down"
              filled
              v-model="state.group6"
              :options="expoptions"
              name="upexp"
              use-input
              new-value-mode
            />
          </div>

          <div class="col-xs-12 col-sm-2 col-md-2">
            <label>Hours of Training:</label>
            <q-input
              v-model.number="state.model2"
              type="number"
              name="uphrstraining"
              filled
            />
          </div>

          <div class="col-xs-10 col-sm-10 col-md-10">
            <label>Training Description: </label>
            <q-select
              label="Please select the status"
              transition-show="flip-up"
              transition-hide="flip-down"
              filled
              v-model="state.group7"
              :options="trainoptions"
              name="uptraining"
              use-input
              new-value-mode
            />
          </div>

          <div class="col-xs-12 col-sm-6 col-md-6">
            <label>Please select an end date</label>
            <q-input
              v-model="state.date"
              filled
              type="date"
              hint="Native date"
              name="upenddate"
            />
          </div>

          <div class="col-xs-12 col-sm-6 col-md-6">
            <label>Make this available in careers?</label>
            <q-option-group
              :options="postoption"
              type="radio"
              v-model="state.group8"
              name="uppostopt"
            />
          </div>

          <!-- Duties Start Here -->
          <!-- <div class="col-12">
            <h5>Duties and Responsibilities</h5>

            <label>Lists of Duties and Responsibilities</label>

            <q-input
              outlined
              v-model="newTodo"
              label="Please Type Here..."
              name="newTodo"
            />
            <div class="row justify-end">
              <q-btn
                class="glossy"
                rounded
                color="cyan-13"
                label="Add Tasks"
                @click="addNewTodo"
              />
            </div>

            <ul>
              <li v-for="todo in todos" :key="todo.id">
                <h6>{{ todo.content }}</h6>
                <q-btn
                  @click="removeTodo(index)"
                  class="glossy"
                  rounded
                  color="cyan-13"
                  label="Delete"
                />
              </li>
            </ul>
          </div> -->
          <!-- Duties End Here -->
          <!-- Comptencies Starts Here  -->
          <!-- <div class="col-12">
            <q-table
              title="Competencies"
              :rows="rows"
              :columns="compcolumns"
              row-key="name"
            >
              <template v-slot:header="props">
                <q-tr :props="props">
                  <q-th auto-width />
                  <q-th
                    v-for="col in props.cols"
                    :key="col.name"
                    :props="props"
                  >
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
                  <q-td
                    v-for="col in props.cols"
                    :key="col.name"
                    :props="props"
                  >
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
          </div>

           <div class="q-mt-md">Selected: {{ JSON.stringify(selected) }}</div>

         Comptencies Ends Here   -->
        </div>
      </div>
      <br />
      <div class="row justify-end">
        <q-btn
          size="22px"
          class="q-px-xl q-py-xs"
          color="cyan-13"
          label="Submit"
          type="submit"
        />
      </div>
    </form>
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
const jobsname = route.params.jobtitle;

const selected = ref([]);

const state = reactive({
  upjob: "",
  upplantilla: "",
  group8: "0",
  group7: "",
  group6: "",
  upgroup5: "",
  upgroup4: "",
  upgroup3: "",
  upgroup2: "",
  model1: "",
  model2: "",
  upsalarygrade: "",
  upyrsexp: "",
  uphrstraining: "",
  upenddate: "",
  uptraining: "",
  upexp: "",
  date: "",
  uppostopt: "",
});

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

// Main Row
const rows = [
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

const eligibilityoptions = [
  {
    label: "Career Service Sub-Professional/1st",
    value: "Career Service Sub-Professional/1st",
    color: "orange",
  },
  {
    label: "Career Service Professional/2nd",
    value: "Career Service Professional/2nd",
    color: "orange",
  },
  { label: "RA1080", value: "RA1080", color: "orange" },
];
const assignoptions = [
  {
    label: "FAD",
    value:
      "Finance and Administrative Division, 1st Level Science Heritage Building, DOST Compd., Bicutan, Taguig City",
    color: "orange",
  },
  {
    label: "OD",
    value:
      "Office of the Director, 2nd Level Science Heritage Building, DOST Compd., Bicutan, Taguig City",
    color: "orange",
  },
  {
    label: "STSD",
    value:
      "S&T Scholarship Division, 2nd Level Science Heritage Building, DOST Compd., Bicutan, Taguig City",
    color: "orange",
  },
  {
    label: "STMERD",
    value:
      "S&T Manpower Education Research and Promotion Division, 1st Level Science Heritage Building, DOST Compd., Bicutan, Taguig City",
    color: "orange",
  },
  {
    label: "SEID",
    value:
      "Science Education and Innovations Division, 2nd Level Science Heritage Building, DOST Compd., Bicutan, Taguig City",
    color: "orange",
  },
];
const postoption = [
  { label: "Yes", value: "1", color: "cyan-13" },
  { label: "No", value: "0", color: "cyan-13" },
];
const educoptions = [
  { label: "Required Please Specify", value: "1", color: "orange" },
  { label: "None Required", value: "None Required", color: "orange" },
];
const statusoption = [
  { label: "Filled", value: "Filled", color: "orange" },
  { label: "Unfilled", value: "Unfilled", color: "orange" },
];

const expoptions = [
  { label: "Required Please Specify", value: "1", color: "orange" },
  { label: "None Required", value: "None Required", color: "orange" },
];

const trainoptions = [
  { label: "Required Please Specify", value: "1", color: "orange" },
  { label: "None Required", value: "None Required", color: "orange" },
];

const addNewTodo = () => {
  if (newTodo.value == "") return;
  todos.value.push({
    content: newTodo.value,
  });
  newTodo.value = "";
};

const removeTodo = (index) => {
  todos.value.splice(index, 1);
};

const options = ref();

onMounted(() => {
  populatesalary();
});

const populatesalary = () => {
  axios
    .get("http://localhost/backend/index.php?populate")
    .then(function (response) {
      options.value = response.data;
    });
};

const id = ref();
onMounted(() => {
  readjob();
});

const readjob = () => {
  id.value = route.params.id;
  var formData = new FormData();
  formData.append("job_id", id.value);
  axios
    .post("http://localhost/backend/index.php?readjobid", formData)
    .then((response) => {
      state.upjob = response.data.jobtitle;
      state.upplantilla = response.data.plantilla;
      state.upsalarygrade = response.data.salary_id;
      state.upgroup5 = response.data.stats;
      state.upgroup3 = response.data.area;
      state.upgroup2 = response.data.eligibility;
      state.upgroup4 = response.data.educ;
      state.model1 = response.data.yrsexp;
      state.group6 = response.data.exp;
      state.model2 = response.data.hrstraining;
      state.group7 = response.data.training;
      state.date = response.data.enddate;
    });
};

const getprops = ref();

const updatejob = (props) => {
  getprops.value = props;

  var formData = new FormData(document.getElementById("form2"));
  formData.append("duties", JSON.stringify(todos.value));
  formData.append("ccompetencies", JSON.stringify(selected.value));
  formData.append("upjob", state.upjob);
  formData.append("upplantilla", state.upplantilla);
  formData.append("upsalarygrade", state.upsalarygrade);
  formData.append("upgroup4", state.upgroup4);
  formData.append("model1", state.model1);
  formData.append("group6", state.group6);
  formData.append("model2", state.model2);
  formData.append("group7", state.group7);
  formData.append("group8", state.group8);
  formData.append("date", state.date);
  formData.append("jobidss", jobids);

  axios
    .post("http://localhost/backend/update.php?updatejobs", formData)
    .then(function (response) {
      if (response.data == true) {
        $q.notify({
          color: "Green",
          message: "Updated Successfully",
        });
        window.location.replace("/dash");
      } else {
        $q.notify({
          color: "red",
          textColor: "white",
          message: "Update failed",
        });
      }
    });
};
</script>

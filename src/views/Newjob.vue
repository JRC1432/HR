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
    <br />
    <form id="form2" @submit.prevent="createjob">
      <div class="col-xs-12 col-sm-6">
        <h2>Create New Position</h2>
        .
        <br />
        <br />
        <div class="q-col-gutter-md row items-start">
          <div class="col-12">
            <q-input
              filled
              v-model="state.job"
              label="Required*"
              hint="Position Title"
              name="job"
              lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || 'Please type something',
              ]"
            />
            <div>
              <span
                class="error"
                v-for="error in v$.job.$errors"
                :key="error.$uid"
              >
                {{ error.$message }}
              </span>
            </div>
          </div>

          <div class="col-xs-12 col-sm-6 col-md-6">
            <!-- Input field start here -->
            <q-input
              filled
              v-model="state.plantilla"
              label="Required*"
              hint="Plantilla Item No."
              name="plantilla"
              lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || 'Please type something',
              ]"
            />
            <div>
              <span
                class="error"
                v-for="error in v$.plantilla.$errors"
                :key="error.$uid"
              >
                {{ error.$message }}
              </span>
            </div>
          </div>

          <div class="col-xs-12 col-sm-6 col-md-6">
            <q-select
              outlined
              v-model="state.salarygrade"
              :options="options"
              label="Salary Grade"
              emit-value
              map-options
              name="salarygrade"
            />
          </div>

          <div class="col-xs-12 col-sm-4 col-md-4">
            <label>Status:</label>
            <q-select
              label="Please select the status"
              transition-show="flip-up"
              transition-hide="flip-down"
              filled
              v-model="state.group5"
              :options="statusoption"
              name="group5"
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
              v-model="state.group3"
              :options="assignoptions"
              name="group3"
            />
            <div>
              <span
                class="error"
                v-for="error in v$.group3.$errors"
                :key="error.$uid"
              >
                {{ error.$message }}
              </span>
            </div>
          </div>

          <div class="col-xs-12 col-sm-4 col-md-4">
            <label>Eligibility:</label>
            <q-select
              label="Please select the status"
              transition-show="flip-up"
              transition-hide="flip-down"
              filled
              v-model="state.group2"
              :options="eligibilityoptions"
              name="group2"
            />
          </div>

          <div class="col-12">
            <label>Education: </label>
            <q-select
              label="Please select the status"
              transition-show="flip-up"
              transition-hide="flip-down"
              filled
              v-model="state.group4"
              :options="educoptions"
              name="group4"
              use-input
              new-value-mode
            />
          </div>

          <div class="col-xs-12 col-sm-2 col-md-2">
            <label>Years of Experience:</label>
            <q-input
              v-model.number="state.model1"
              type="number"
              name="yrsexp"
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
              name="exp"
              use-input
              new-value-mode
            />
          </div>

          <div class="col-xs-12 col-sm-2 col-md-2">
            <label>Hours of Training:</label>
            <q-input
              v-model.number="state.model2"
              type="number"
              name="hrstraining"
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
              name="training"
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
              name="date"
            />
          </div>

          <div class="col-xs-12 col-sm-6 col-md-6">
            <label>Make this available in careers?</label>
            <q-option-group
              :options="postoption"
              type="radio"
              v-model="state.group8"
              name="postopt"
            />
          </div>

          <!-- Duties Start Here -->
          <div class="col-12">
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
          </div>
          <!-- Duties End Here -->
          <!-- Comptencies Starts Here -->
          <div class="col-12">
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

          <!-- <div class="q-mt-md">Selected: {{ JSON.stringify(selected) }}</div> -->

          <!-- Comptencies Ends Here  -->
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
import { ref, reactive, onMounted, computed } from "vue";
import { useQuasar } from "quasar";
import axios from "axios";
import useVuelidate from "@vuelidate/core";
import {
  required,
  minLength,
  email,
  sameAs,
  helpers,
} from "@vuelidate/validators";

const $q = useQuasar();

const group2 = ref("1st");

const group3 = ref("FAD");
const group4 = ref("None Required");
const group5 = ref("Unfilled");
const group6 = ref("None Required");
const group7 = ref("None Required");
const group8 = ref("No");

const job = ref(null);
const plantilla = ref(null);
const exp = ref(null);
const filter = ref("");
const editRow = ref(false);
const newTodo = ref("");
const todos = ref([]);
const fixed = ref(false);
const model1 = 0;
const model2 = 0;
const date = ref("");

const text = ref("");
const selected = ref([]);

const state = reactive({
  job: "",
  plantilla: "",
  group8: "0",
  group7: "None Required",
  group6: "None Required",
  group5: "Unfilled",
  group4: "None Required",
  group3: "",
  group2: "Career Service Professional/2nd",
  model1: "0",
  model2: "0",
  salarygrade: "5",
  date: "",
});

const rules = computed(() => {
  return {
    job: {
      required,
    },
    plantilla: { required },
    group8: { required },
    group7: { required },
    group6: { required },
    group5: { required },
    group4: { required },
    group3: { required },
    group2: { required },
    model1: { required },
    model2: { required },
    salarygrade: { required },
    date: { required },
  };
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
    label: "Career Service (Sub-Professional)/1st",
    value: "Career Service (Sub-Professional)/First Level Eligibility",
    color: "orange",
  },
  {
    label: "Career Service (Professional)/2nd",
    value: "Career Service Professional/Second Level Eligibility",
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

const v$ = useVuelidate(rules, state);

const createjob = async () => {
  console.log(v$);
  const result = await v$.value.$validate();

  if (result) {
    var formData = new FormData(document.getElementById("form2"));
    formData.append("duties", JSON.stringify(todos.value));
    formData.append("ccompetencies", JSON.stringify(selected.value));
    // console.log(formData);
    axios
      .post("http://localhost/backend/create.php?createjob", formData)
      .then(function (response) {
        if (response.data == true) {
          $q.notify({
            color: "Green",
            message: "Position Lists Created Successfully",
          });
          window.location.replace("/dash");
        } else {
          $q.notify({
            color: "red",
            textColor: "white",
            message: "Position Lists not Created",
          });
        }
      });
  } else {
    $q.notify({
      color: "red",
      message:
        "Position Lists not Created. Please complete all the needed inputs",
    });
  }
};
</script>

<style scope>
span.error {
  color: red;
}
</style>

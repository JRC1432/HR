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
      title="Lists of Duties and Responsibilities"
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
            @click="deleteDuty(props)"
            icon="delete"
          ></q-btn>
        </q-td>
      </template>
    </q-table>
    <br />

    <!-- Duties Start Here -->
    <form id="form4" @submit.prevent="editduties">
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
      <br />
      <q-btn
        size="22px"
        class="q-px-xl q-py-xs"
        color="cyan-13"
        label="Submit"
        type="submit"
      />
    </form>
    <!-- Duties End Here -->
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

onMounted(() => {
  editdut();
});

const editdut = () => {
  jobidssss.value = route.params.id;
  var formData = new FormData();
  formData.append("jobidssss", jobidssss.value);
  axios
    .post("http://localhost/backend/index.php?editduty", formData)
    .then((response) => {
      rows.value = response.data;
    });
};

const deleteDuty = (props) => {
  console.log(props.row.duties_id);
  var formData = new FormData();
  formData.append("duties_id", props.row.duties_id);
  axios
    .post("http://localhost/backend/delete.php?deleteduty", formData)
    .then(function (response) {
      // app.salaryList = response.data.salary;
      // console.log(response);

      if (response.data == true) {
        $q.notify({
          color: "Green",
          message: "Deleted",
        });

        editdut();
      } else {
        $q.notify({
          color: "red",
          textColor: "white",
          message: "Not Deleted",
        });
      }
    });
};

const editduties = () => {
  var formData = new FormData(document.getElementById("form4"));
  formData.append("jobidssss", jobidssss.value);
  formData.append("duties", JSON.stringify(todos.value));
  // console.log(formData);
  axios
    .post("http://localhost/backend/update.php?editduty", formData)
    .then(function (response) {
      if (response.data == true) {
        $q.notify({
          color: "Green",
          message: "Added Successfully",
        });
        editdut();
      } else {
        $q.notify({
          color: "red",
          textColor: "white",
          message: "Err",
        });
      }
    });
};
</script>

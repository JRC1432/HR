<template>
  <div class="q-pa-md">
    <q-table
      ref="tableRef"
      title="List of Salary Grade"
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

      <template v-slot:body-cell-actionbutton="props">
        <q-td :props="props">
          <q-btn
            dense
            round
            flat
            color="primary"
            icon="edit"
            @click="up(props)"
          ></q-btn>
          <q-btn
            dense
            round
            flat
            color="red"
            @click="del(props)"
            icon="delete"
          ></q-btn>

          <!-- Modal -->

          <q-dialog v-model="confirm" persistent>
            <q-card>
              <q-card-section class="row items-center">
                <q-avatar icon="delete" color="primary" text-color="white" />
                <span class="q-ml-sm">Do you want to delete this item?</span>
              </q-card-section>

              <q-card-actions align="right">
                <q-btn flat label="Cancel" color="red" v-close-popup />
                <q-btn flat label="Confirm" color="cyan-13" @click="delsal" />
              </q-card-actions>
            </q-card>
          </q-dialog>

          <q-dialog v-model="editModal">
            <q-card style="min-width: 300px; width: 300px">
              <form id="form2" @submit.prevent="save2">
                <q-card-section>
                  <div class="text-h6">Update Salary</div>
                </q-card-section>

                <q-separator />

                <q-card-section style="max-height: 50vh" class="scroll">
                  <!-- <p v-for="n in 15" :key="n">Testing</p> -->
                  <div class="row row_width q-col-gutter-sm">
                    <div class="col-xs-12 col-sm-6">
                      <q-input
                        color="orange"
                        filled
                        name="salgrade"
                        v-model="state.upsalarygrade"
                        label="SG"
                        clearable
                      >
                      </q-input>
                    </div>
                    <div class="col-xs-12 col-sm-12">
                      <q-input
                        color="orange"
                        filled
                        name="amount"
                        v-model="state.upamount"
                        label="Step 1"
                        clearable
                      >
                      </q-input>
                    </div>
                    <div class="col-xs-12 col-sm-12">
                      <q-input
                        color="orange"
                        filled
                        name="amounttwo"
                        v-model="state.upamounttwo"
                        label="Step 2"
                        clearable
                      >
                      </q-input>
                    </div>
                    <div class="col-xs-12 col-sm-12">
                      <q-input
                        color="orange"
                        filled
                        name="amounthree"
                        v-model="state.upamounthree"
                        label="Step 3"
                        clearable
                      >
                      </q-input>
                    </div>
                    <div class="col-xs-12 col-sm-12">
                      <q-input
                        color="orange"
                        filled
                        name="amountfour"
                        v-model="state.upamountfour"
                        label="Step 4"
                        clearable
                      >
                      </q-input>
                    </div>
                    <div class="col-xs-12 col-sm-12">
                      <q-input
                        color="orange"
                        filled
                        name="amountfive"
                        v-model="state.upamountfive"
                        label="Step 5"
                        clearable
                      >
                      </q-input>
                    </div>
                    <div class="col-xs-12 col-sm-12">
                      <q-input
                        color="orange"
                        filled
                        name="amountsix"
                        v-model="state.upamountsix"
                        label="Step 6"
                        clearable
                      >
                      </q-input>
                    </div>
                    <div class="col-xs-12 col-sm-12">
                      <q-input
                        color="orange"
                        filled
                        name="amountseven"
                        v-model="state.upamountseven"
                        label="Step 7"
                        clearable
                      >
                      </q-input>
                    </div>
                    <div class="col-xs-12 col-sm-12">
                      <q-input
                        color="orange"
                        filled
                        name="amounteight"
                        v-model="state.upamounteight"
                        label="Step 8"
                        clearable
                      >
                      </q-input>
                    </div>
                  </div>
                </q-card-section>

                <q-separator />

                <q-card-actions align="right">
                  <q-btn flat label="Close" color="primary" v-close-popup />
                  <q-btn flat label="Save" color="primary" type="submit" />
                </q-card-actions>
              </form>
            </q-card>
          </q-dialog>

          <!-- End of Modal -->
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script setup>
import { useQuasar } from "quasar";
import { ref, onMounted, reactive, inject } from "vue";
import axios from "axios";
import { isTemplateNode } from "@vue/compiler-core";

const php = { style: "currency", currency: "PHP" };

const $q = useQuasar();
const columns = [
  {
    name: "salgrade",
    label: "Salary Grade",
    field: "salgrade",
    align: "center",
    sortable: true,
  },
  {
    name: "amount",
    label: "Step 1",
    field: "amount",
    align: "center",
    sortable: true,
    format: Intl.NumberFormat("en-US", php).format,
  },
  {
    name: "amounttwo",
    label: "Step 2",
    field: "amounttwo",
    align: "center",
    sortable: true,
    format: Intl.NumberFormat("en-US", php).format,
  },
  {
    name: "amountthree",
    label: "Step 3",
    field: "amountthree",
    align: "center",
    sortable: true,
    format: Intl.NumberFormat("en-US", php).format,
  },
  {
    name: "amountfour",
    label: "Step 4",
    field: "amountfour",
    align: "center",
    sortable: true,
    format: Intl.NumberFormat("en-US", php).format,
  },
  {
    name: "amountfive",
    label: "Step 5",
    field: "amountfive",
    align: "center",
    sortable: true,
    format: Intl.NumberFormat("en-US", php).format,
  },
  {
    name: "amountsix",
    label: "Step 6",
    field: "amountsix",
    align: "center",
    sortable: true,
    format: Intl.NumberFormat("en-US", php).format,
  },
  {
    name: "amountseven",
    label: "Step 7",
    field: "amountseven",
    align: "center",
    sortable: true,
    format: Intl.NumberFormat("en-US", php).format,
  },
  {
    name: "amounteight",
    label: "Step 8",
    field: "amounteight",
    align: "center",
    sortable: true,
    format: Intl.NumberFormat("en-US", php).format,
  },
  {
    name: "datetime",
    label: "Date and Time Uploaded",
    field: "datetime",
    align: "center",
    sortable: true,
  },
  { name: "actionbutton", label: "Actions", field: "", align: "center" },
];
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

const state = reactive({
  salarygrade: "SG ",
  amount: "0",
  upsalarygrade: "",
  upamount: "₱",
  upamounttwo: "",
  upamounthree: "",
  upamountfour: "",
  upamountfive: "",
  upamountsix: "",
  upamountseven: "",
  upamounteight: "",
  id: "",
});

const showDetails = (e, row, index) => {
  e.preventDefault();
  console.log(row);
};

// Create Salary

const save = () => {
  var formData = new FormData(document.getElementById("form1"));
  // formData.append("name", JSON.stringify(todos.value));

  axios
    .post("http://localhost/backend/index.php?create", formData)
    .then(function (response) {
      // app.salaryList = response.data.salary;
      // console.log(response);

      if (response.data == true) {
        fixed.value = false;
        $q.notify({
          color: "Green",
          message: "New Salary Added Successfully",
        });

        readsalary();
      } else {
        $q.notify({
          color: "red",
          textColor: "white",
          message: "Salary does not created",
        });
      }
    });
};

// Delete Salary
const currentprops = ref();
const del = (props) => {
  confirm.value = true;
  currentprops.value = props;
  console.log(props.row.id);
};

const delsal = () => {
  console.log(currentprops.value.row.id);

  var formData = new FormData();
  formData.append("id", currentprops.value.row.id);

  axios
    .post("http://localhost/backend/delete.php?delete", formData)
    .then(function (response) {
      // app.salaryList = response.data.salary;
      // console.log(response);

      if (response.data == true) {
        $q.notify({
          color: "Green",
          message: "Salary Deleted",
        });
        confirm.value = false;
        readsalary();
      } else {
        $q.notify({
          color: "red",
          textColor: "white",
          message: "Salary not deleted",
        });
      }
    });
};

//Update Salary

const up = (props) => {
  editModal.value = true;
  state.upsalarygrade = props.row.salgrade;
  state.upamount = props.row.amount;
  state.upamounttwo = props.row.amounttwo;
  state.upamounthree = props.row.amountthree;
  state.upamountfour = props.row.amountfour;
  state.upamountfive = props.row.amountfive;
  state.upamountsix = props.row.amountsix;
  state.upamountseven = props.row.amountseven;
  state.upamounteight = props.row.amounteight;
  state.id = props.row.id;
  console.log(props.row.id);
  var formData = new FormData();
  formData.append("id", props.row.id);
};

const save2 = () => {
  var formData = new FormData(document.getElementById("form2"));
  formData.append("upsalarygrade", state.upsalarygrade);
  formData.append("upamount", state.upamount);
  formData.append("upamounttwo", state.upamounttwo);
  formData.append("upamounthree", state.upamounthree);
  formData.append("upamountfour", state.upamountfour);
  formData.append("upamountfive", state.upamountfive);
  formData.append("upamountsix", state.upamountsix);
  formData.append("upamountseven", state.upamountseven);
  formData.append("upamounteight", state.upamounteight);
  formData.append("id", state.id);
  axios
    .post("http://localhost/backend/update.php?updateSalary", formData)
    .then(function (response) {
      // app.salaryList = response.data.salary;
      // console.log(response);

      if (response.data == true) {
        $q.notify({
          color: "Green",
          message: "Salary Updated",
        });

        readsalary();
        editModal.value = false;
      } else {
        $q.notify({
          color: "red",
          textColor: "white",
          message: "Salary not deleted",
        });
      }
    });
};

onMounted(() => {
  readsalary();
});

// readsalary
const readsalary = () => {
  axios
    .get("http://localhost/backend/index.php?read")
    .then(function (response) {
      rows.value = response.data;
    });
};
</script>

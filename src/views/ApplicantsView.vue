<template>
  <div class="q-pa-md">
    <q-table
      ref="tableRef"
      title="Lists of Applicants"
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
            color="green"
            @click="feed(props)"
            icon="feedback"
          ></q-btn>
          <q-btn
            dense
            round
            flat
            color="green"
            @click="descrip(props)"
            icon="timeline"
          ></q-btn>
          <q-btn
            dense
            round
            flat
            color="amber"
            @click="showfile(props)"
            icon="file_open"
          ></q-btn>
          <q-btn
            dense
            round
            flat
            color="red"
            @click="del(props)"
            icon="delete"
          ></q-btn>
        </q-td>

        <q-dialog v-model="fixed">
          <q-card style="min-width: 700px; width: 700px">
            <form id="saveevent" @submit.prevent="savestats">
              <q-card-section>
                <div class="text-h6">Provide Applicant Status</div>
              </q-card-section>

              <q-separator />

              <q-card-section style="max-height: 50vh" class="scroll">
                <div class="col-xs-12 col-sm-6">
                  <div class="q-pa-md">
                    <h7 v-model="state.idonly" name="idonly"
                      >Applicant ID: {{ state.idonly }}</h7
                    >

                    <br />

                    <br />

                    <q-input
                      filled
                      v-model="state.eventtitle"
                      label="Required*"
                      hint="Event Title"
                      name="eventtitle"
                      lazy-rules
                      :rules="[
                        (val) =>
                          (val && val.length > 0) || 'Please type something',
                      ]"
                    />
                    <br />

                    <div class="col-xs-12 col-sm-6">
                      <label>Event Description:</label>
                      <q-input
                        v-model="state.feedback"
                        filled
                        type="textarea"
                        name="feedback"
                      />
                    </div>
                  </div>
                </div>
              </q-card-section>

              <q-separator />

              <q-card-actions align="right">
                <q-btn flat label="Decline" color="red" v-close-popup />
                <q-btn flat label="Submit" color="primary" type="submit" />
              </q-card-actions>
            </form>
          </q-card>
        </q-dialog>

        <q-dialog v-model="delconfirm" persistent>
          <q-card>
            <q-card-section class="row items-center">
              <q-avatar icon="delete" color="primary" text-color="white" />
              <span class="q-ml-sm">Do you want to remove this Applicant?</span>
            </q-card-section>

            <q-card-actions align="right">
              <q-btn flat label="Cancel" color="red" v-close-popup />
              <q-btn
                flat
                label="Confirm"
                color="cyan-13"
                @click="delapplicant"
              />
            </q-card-actions>
          </q-card>
        </q-dialog>

        <q-dialog v-model="timeline">
          <q-card style="min-width: 700px; width: 700px">
            <q-card-section>
              <div class="text-h6">Applicants Timeline</div>
            </q-card-section>
            <q-separator />

            <q-card-section>
              <q-timeline color="secondary">
                <q-timeline-entry heading> Timeline </q-timeline-entry>

                <q-timeline-entry
                  v-for="evntdes in eventdesc"
                  :key="evntdes.eventdesc"
                  :title="evntdes.event_title"
                  :subtitle="evntdes.dateposted"
                  icon="done"
                >
                  <div>
                    {{ evntdes.event_desc }}
                  </div>
                </q-timeline-entry>
              </q-timeline>
            </q-card-section>
            <q-separator />
            <q-card-actions align="right">
              <q-btn flat label="Close" color="red" v-close-popup />
            </q-card-actions>
          </q-card>
        </q-dialog>

        <q-dialog v-model="qcv">
          <q-card style="min-width: 700px; width: 700px">
            <q-card-section>
              <div class="text-h6">Curriculumn Vitae</div>
            </q-card-section>
            <q-separator />

            <q-card-section>
              <iframe
                :src="'http://localhost/backend/' + regcvs"
                width="100%"
                height="1000"
              ></iframe>
            </q-card-section>
            <q-separator />
            <q-card-actions align="right">
              <q-btn flat label="Close" color="red" v-close-popup />
            </q-card-actions>
          </q-card>
        </q-dialog>

        <q-dialog v-model="qpds">
          <q-card style="min-width: 700px; width: 700px">
            <q-card-section>
              <div class="text-h6">Personal Data Sheet</div>
            </q-card-section>
            <q-separator />

            <q-card-section>
              <iframe
                :src="'http://localhost/backend/' + regpds"
                width="100%"
                height="1000"
              ></iframe>
            </q-card-section>
            <q-separator />
            <q-card-actions align="right">
              <q-btn flat label="Close" color="red" v-close-popup />
            </q-card-actions>
          </q-card>
        </q-dialog>

        <q-dialog v-model="qwes">
          <q-card style="min-width: 700px; width: 700px">
            <q-card-section>
              <div class="text-h6">Work Experience Sheet</div>
            </q-card-section>
            <q-separator />

            <q-card-section>
              <iframe
                :src="'http://localhost/backend/' + regwes"
                width="100%"
                height="1000"
              ></iframe>
            </q-card-section>
            <q-separator />
            <q-card-actions align="right">
              <q-btn flat label="Close" color="red" v-close-popup />
            </q-card-actions>
          </q-card>
        </q-dialog>

        <q-dialog v-model="qdp">
          <q-card style="min-width: 700px; width: 700px">
            <q-card-section>
              <div class="text-h6">Diploma</div>
            </q-card-section>
            <q-separator />

            <q-card-section>
              <iframe
                :src="'http://localhost/backend/' + regdipl"
                width="100%"
                height="1000"
              ></iframe>
            </q-card-section>
            <q-separator />
            <q-card-actions align="right">
              <q-btn flat label="Close" color="red" v-close-popup />
            </q-card-actions>
          </q-card>
        </q-dialog>

        <q-dialog v-model="qtor">
          <q-card style="min-width: 700px; width: 700px">
            <q-card-section>
              <div class="text-h6">Transcript of Record</div>
            </q-card-section>
            <q-separator />

            <q-card-section>
              <iframe
                :src="'http://localhost/backend/' + regtor"
                width="100%"
                height="1000"
              ></iframe>
            </q-card-section>
            <q-separator />
            <q-card-actions align="right">
              <q-btn flat label="Close" color="red" v-close-popup />
            </q-card-actions>
          </q-card>
        </q-dialog>

        <q-dialog v-model="qeli">
          <q-card style="min-width: 700px; width: 700px">
            <q-card-section>
              <div class="text-h6">Eligibility</div>
            </q-card-section>
            <q-separator />

            <q-card-section>
              <iframe
                :src="'http://localhost/backend/' + regligibility"
                width="100%"
                height="1000"
              ></iframe>
            </q-card-section>
            <q-separator />
            <q-card-actions align="right">
              <q-btn flat label="Close" color="red" v-close-popup />
            </q-card-actions>
          </q-card>
        </q-dialog>

        <q-dialog v-model="qapp">
          <q-card style="min-width: 700px; width: 700px">
            <q-card-section>
              <div class="text-h6">Application Letter</div>
            </q-card-section>
            <q-separator />

            <q-card-section>
              <iframe
                :src="'http://localhost/backend/' + regapp"
                width="100%"
                height="1000"
              ></iframe>
            </q-card-section>
            <q-separator />
            <q-card-actions align="right">
              <q-btn flat label="Close" color="red" v-close-popup />
            </q-card-actions>
          </q-card>
        </q-dialog>

        <q-dialog v-model="qtc">
          <q-card style="min-width: 700px; width: 700px">
            <q-card-section>
              <div class="text-h6">Training Certificate</div>
            </q-card-section>
            <q-separator />

            <q-card-section>
              <iframe
                :src="'http://localhost/backend/' + regtraincert"
                width="100%"
                height="1000"
              ></iframe>
            </q-card-section>
            <q-separator />
            <q-card-actions align="right">
              <q-btn flat label="Close" color="red" v-close-popup />
            </q-card-actions>
          </q-card>
        </q-dialog>

        <q-dialog v-model="qper">
          <q-card style="min-width: 700px; width: 700px">
            <q-card-section>
              <div class="text-h6">Personal Evaluation Rating</div>
            </q-card-section>
            <q-separator />

            <q-card-section>
              <iframe
                :src="'http://localhost/backend/' + regper"
                width="100%"
                height="1000"
              ></iframe>
            </q-card-section>
            <q-separator />
            <q-card-actions align="right">
              <q-btn flat label="Close" color="red" v-close-popup />
            </q-card-actions>
          </q-card>
        </q-dialog>

        <q-dialog v-model="apfile" persistent>
          <q-card style="min-width: 350px; width: 350px">
            <q-card-section>
              <div class="text-h6">Applicant Files</div>
            </q-card-section>
            <q-separator />
            <q-card-section>
              <div class="q-col-gutter-md row items-start">
                <div class="col-xs-12 col-sm-6 col-md-6">
                  <p>Curriculum Vitae</p>
                </div>
                <div class="col-xs-12 col-sm-6 col-md-6">
                  <q-btn
                    outline
                    color="green"
                    icon="file_open"
                    @click="qcv = true"
                  />
                  <!-- <q-btn
                    outline
                    color="blue"
                    icon="file_download"
                    :href="'http://localhost/backend/' + regcvs"
                    target="_blank"
                  /> -->
                </div>
              </div>
              <div class="q-col-gutter-md row items-start">
                <div class="col-xs-12 col-sm-6 col-md-6">
                  <p>Personal Data Sheet</p>
                </div>
                <div class="col-xs-12 col-sm-6 col-md-6">
                  <q-btn
                    outline
                    color="green"
                    icon="file_open"
                    @click="qpds = true"
                  />
                  <!-- <q-btn
                    outline
                    color="blue"
                    icon="file_download"
                    :href="'http://localhost/backend/' + regpds"
                    target="_blank"
                  /> -->
                </div>
              </div>
              <div class="q-col-gutter-md row items-start">
                <div class="col-xs-12 col-sm-6 col-md-6">
                  <p>Work Experience Sheet</p>
                </div>
                <div class="col-xs-12 col-sm-6 col-md-6">
                  <q-btn
                    outline
                    color="green"
                    icon="file_open"
                    @click="qwes = true"
                  />
                  <!-- <q-btn
                    outline
                    color="blue"
                    icon="file_download"
                    :href="'http://localhost/backend/' + regwes"
                    target="_blank"
                  /> -->
                </div>
              </div>
              <div class="q-col-gutter-md row items-start">
                <div class="col-xs-12 col-sm-6 col-md-6">
                  <p>Diploma</p>
                </div>
                <div class="col-xs-12 col-sm-6 col-md-6">
                  <q-btn
                    outline
                    color="green"
                    icon="file_open"
                    @click="qdp = true"
                  />
                  <!-- <q-btn
                    outline
                    color="blue"
                    icon="file_download"
                    :href="'http://localhost/backend/' + regdipl"
                    target="_blank"
                  /> -->
                </div>
              </div>
              <div class="q-col-gutter-md row items-start">
                <div class="col-xs-12 col-sm-6 col-md-6">
                  <p>Transcript of Records</p>
                </div>
                <div class="col-xs-12 col-sm-6 col-md-6">
                  <q-btn
                    outline
                    color="green"
                    icon="file_open"
                    @click="qtor = true"
                  />
                  <!-- <q-btn
                    outline
                    color="blue"
                    icon="file_download"
                    :href="'http://localhost/backend/' + regtor"
                    target="_blank"
                  /> -->
                </div>
              </div>
              <div class="q-col-gutter-md row items-start">
                <div class="col-xs-12 col-sm-6 col-md-6">
                  <p>Eligibility</p>
                </div>
                <div class="col-xs-12 col-sm-6 col-md-6">
                  <q-btn
                    outline
                    color="green"
                    icon="file_open"
                    @click="qeli = true"
                  />
                  <!-- <q-btn
                    outline
                    color="blue"
                    icon="file_download"
                    :href="'http://localhost/backend/' + regligibility"
                    target="_blank"
                  /> -->
                </div>
              </div>
              <div class="q-col-gutter-md row items-start">
                <div class="col-xs-12 col-sm-6 col-md-6">
                  <p>Application Letter</p>
                </div>
                <div class="col-xs-12 col-sm-6 col-md-6">
                  <q-btn
                    outline
                    color="green"
                    icon="file_open"
                    @click="qapp = true"
                  />
                  <!-- <q-btn
                    outline
                    color="blue"
                    icon="file_download"
                    :href="'http://localhost/backend/' + regapp"
                    target="_blank"
                  /> -->
                </div>
              </div>
              <div class="q-col-gutter-md row items-start">
                <div class="col-xs-12 col-sm-6 col-md-6">
                  <p>Training Certificate</p>
                </div>
                <div class="col-xs-12 col-sm-6 col-md-6">
                  <q-btn
                    outline
                    color="green"
                    icon="file_open"
                    @click="qtc = true"
                  />
                  <!-- <q-btn
                    outline
                    color="blue"
                    icon="file_download"
                    :href="'http://localhost/backend/' + regtraincert"
                    target="_blank"
                  /> -->
                </div>
              </div>
              <div class="q-col-gutter-md row items-start">
                <div class="col-xs-12 col-sm-6 col-md-6">
                  <p>Performance Evaluation Rating</p>
                </div>
                <div class="col-xs-12 col-sm-6 col-md-6">
                  <q-btn
                    outline
                    color="green"
                    icon="file_open"
                    @click="qper = true"
                  />
                  <!-- <q-btn
                    outline
                    color="blue"
                    icon="file_download"
                    :href="'http://localhost/backend/' + regper"
                    target="_blank"
                  /> -->
                </div>
              </div>
            </q-card-section>

            <q-separator />
            <q-card-actions align="right">
              <q-btn flat label="Close" color="red" v-close-popup />
            </q-card-actions>
          </q-card>
        </q-dialog>
      </template>
    </q-table>
  </div>
</template>

<script setup>
import { useQuasar } from "quasar";
import { ref, onMounted, reactive, inject } from "vue";
import axios from "axios";
import { isTemplateNode } from "@vue/compiler-core";

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
    name: "auth_id",
    label: "Applicant ID #",
    field: "auth_id",
    align: "left",
    sortable: true,
  },
  {
    name: "regjob",
    label: "Position Title",
    field: "regjob",
    align: "left",
    sortable: true,
  },
  {
    name: "first_name",
    label: "First Name",
    field: "first_name",
    align: "left",
    sortable: true,
  },
  {
    name: "regmidname",
    label: "M.I",
    field: "regmidname",
    align: "left",
    sortable: true,
  },
  {
    name: "last_name",
    label: "Last Name",
    field: "last_name",
    align: "left",
    sortable: true,
  },
  {
    name: "email",
    label: "E-MAIL",
    field: "email",
    align: "left",
    sortable: true,
  },
  {
    name: "contact",
    label: "Contact Number",
    field: "contact",
    align: "left",
    sortable: true,
  },
  {
    name: "gender",
    label: "SEX",
    field: "gender",
    align: "left",
    sortable: true,
  },
  {
    name: "regdate",
    label: "Birthday",
    field: "regdate",
    align: "left",
    sortable: true,
  },
  {
    name: "license",
    label: "Eligibility/PRC License holder",
    field: "license",
    align: "center",
    sortable: true,
  },
  {
    name: "datetime",
    label: "Application Date",
    field: "datetime",
    align: "left",
    sortable: true,
  },
  { name: "actionbutton", label: "Actions", field: "", align: "center" },
];

const qcv = ref(false);
const qpds = ref(false);
const qwes = ref(false);
const qdp = ref(false);
const qtor = ref(false);
const qeli = ref(false);
const qapp = ref(false);
const qtc = ref(false);
const qper = ref(false);

const editModal = ref(false);
const delconfirm = ref(false);
const fixed = ref(false);
const apfile = ref(false);
const timeline = ref(false);
const salaryList = [];
const tableRef = ref();
const rows = ref([]);
const filter = ref("");
const loading = ref(false);
const selected = ref([]);

const pagination = ref({
  sortBy: "desc",
  descending: false,
  page: 1,
  rowsPerPage: 10,
});

const showDetails = (e, row, index) => {
  e.preventDefault();
  console.log(row);
};

const state = reactive({
  eventtitle: "",
  feedback: "",
  idonly: "",
  appemail: "",
  regcvs: "",
  regpds: "",
  regwes: "",
  regdipl: "",
  regtor: "",
  regligibility: "",
  regapp: "",
  regtraincert: "",
  regper: "",
});

//back End
const idonly = ref();

const eventdesc = ref();

//show feedback

const descrip = (props) => {
  timeline.value = true;

  var formData = new FormData();
  formData.append("auth_id", props.row.auth_id);
  axios
    .post("http://localhost/backend/index.php?readstatus", formData)
    .then((response) => {
      eventdesc.value = response.data;
    });
};

// Create Feedback

const feed = (props) => {
  fixed.value = true;
  console.log(props.row.id);
  state.idonly = props.row.auth_id;
  state.appemail = props.row.email;
  var formData = new FormData();
  formData.append("id", props.row.id);
};

const savestats = () => {
  var formData = new FormData(document.getElementById("saveevent"));
  formData.append("idonly", state.idonly);
  formData.append("email", state.appemail);
  console.log(state.appemail);

  axios
    .post("http://localhost/backend/create.php?event", formData)
    .then(function (response) {
      // app.salaryList = response.data.salary;

      if (response.data == true) {
        fixed.value = false;
        $q.notify({
          color: "cyan-13",
          textColor: "black",
          message: "Timeline Added Successfully and Notify the user via E-mail",
        });
      } else {
        $q.notify({
          color: "red",
          textColor: "white",
          message: "Not Submitted Successfully",
        });
      }
    });
};

const delcurprops = ref();
// Delete Applicant

const del = (props) => {
  delconfirm.value = true;
  console.log(props.row.reg_id);
  delcurprops.value = props;
};

const delapplicant = (props) => {
  console.log(delcurprops.value.row.reg_id);
  var formData = new FormData();
  formData.append("reg_id", delcurprops.value.row.reg_id);

  axios
    .post("http://localhost/backend/delete.php?deleteApplicants", formData)
    .then(function (response) {
      console.log(response.data);

      if (response.data == true) {
        $q.notify({
          color: "Green",
          message: "APPLICANT HAS BEEN REMOVED",
        });
        delconfirm.value = false;
        readApplicant();
      } else {
        $q.notify({
          color: "red",
          textColor: "white",
          message: "Err",
        });
      }
    });
};

onMounted(() => {
  readApplicant();
});

// readApplicant
const readApplicant = () => {
  axios
    .get("http://localhost/backend/index.php?readApplications")
    .then(function (response) {
      rows.value = response.data;
    });
};

// Back-End for Files

const regid = ref();

const regcvs = ref();
const regpds = ref();
const regwes = ref();
const regdipl = ref();
const regtor = ref();
const regligibility = ref();
const regapp = ref();
const regtraincert = ref();
const regper = ref();

const showfile = (props) => {
  apfile.value = true;
  regid.value = props.row.reg_id;
  regcvs.value = props.row.cv;
  regpds.value = props.row.pds;
  regwes.value = props.row.wes;
  regdipl.value = props.row.diploma;
  regtor.value = props.row.tor;
  regligibility.value = props.row.eligibility;
  regapp.value = props.row.appletter;
  regtraincert.value = props.row.traincert;
  regper.value = props.row.per;

  console.log(props.row.cv);
  console.log(props.row.pds);
  console.log(props.row.wes);
  console.log(props.row.diploma);
  console.log(props.row.tor);
  console.log(props.row.eligibility);
  console.log(props.row.appletter);
  console.log(props.row.traincert);
  console.log(props.row.per);

  // var formData = new FormData();
  // formData.append("reg_id", props.row.reg_id);
  // axios
  //   .post("http://localhost/backend/index.php?readfiles", formData)
  //   .then(function (response) {
  //     apfile.value = true;
  //     regcvs.value = response.data.cv;

  //     console.log(regcvs);
  //   });
};
</script>

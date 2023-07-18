<template>
  <form
    enctype="multipart/form-data"
    id="appForm"
    @submit.prevent="saveAppForm"
  >
    <label hidden name="jobsname">{{ jobids }}</label>
    <label hidden name="nonreq">{{ resp }}</label>

    <q-card>
      <q-card-section>
        <div class="text-h6">Application Form</div>
      </q-card-section>

      <!-- Personal Details Starts Here -->
      <div class="row justify-center">
        <div class="col-xs-12 col-sm-6">
          <div class="q-pa-md">
            <div class="q-col-gutter-md row items-start">
              <label name="authname">Applicant ID: {{ user.id }}</label>
              <div class="col-12">
                <q-input
                  standout
                  v-model="state.regjob"
                  hint="Position Title"
                  name="regjob"
                  lazy-rules
                  :rules="[
                    (val) => (val && val.length > 0) || 'Please type something',
                  ]"
                />
                <span
                  class="error"
                  v-for="error in v$.regjob.$errors"
                  :key="error.$uid"
                >
                  {{ error.$message }}
                </span>
              </div>

              <div class="col-xs-12 col-sm-4 col-md-4">
                <!-- Input field start here -->
                <q-input
                  filled
                  v-model="state.regfirstname"
                  label="Required*"
                  hint="First Name"
                  name="regfirstname"
                  lazy-rules
                  :rules="[
                    (val) => (val && val.length > 0) || 'Please type something',
                  ]"
                />
                <span
                  class="error"
                  v-for="error in v$.regfirstname.$errors"
                  :key="error.$uid"
                >
                  {{ error.$message }}
                </span>
              </div>

              <div class="col-xs-12 col-sm-4 col-md-4">
                <q-input
                  filled
                  v-model="state.regmidname"
                  name="regmidname"
                  label="Required*"
                  hint="Middle Name"
                  lazy-rules
                  :rules="[
                    (val) => (val && val.length > 0) || 'Please type something',
                  ]"
                />
                <span
                  class="error"
                  v-for="error in v$.regmidname.$errors"
                  :key="error.$uid"
                >
                  {{ error.$message }}
                </span>
              </div>
              <div class="col-xs-12 col-sm-4 col-md-4">
                <q-input
                  filled
                  v-model="state.reglastname"
                  label="Required*"
                  hint="Last Name"
                  name="reglastname"
                  lazy-rules
                  :rules="[
                    (val) => (val && val.length > 0) || 'Please type something',
                  ]"
                />
                <span
                  class="error"
                  v-for="error in v$.reglastname.$errors"
                  :key="error.$uid"
                >
                  {{ error.$message }}
                </span>
              </div>
              <div class="col-xs-12 col-sm-4 col-md-4">
                <q-input
                  filled
                  v-model="state.date"
                  name="date"
                  mask="date"
                  :rules="['date']"
                  hint="Birthday"
                >
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy
                        cover
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-date v-model="date">
                          <div class="row items-center justify-end">
                            <q-btn
                              v-close-popup
                              label="Close"
                              color="primary"
                              flat
                            />
                          </div>
                        </q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
                <div>
                  <span
                    class="error"
                    v-for="error in v$.date.$errors"
                    :key="error.$uid"
                  >
                    {{ error.$message }}
                  </span>
                </div>
              </div>
              <div class="col-xs-12 col-sm-4 col-md-4">
                <q-select
                  label="Sex"
                  transition-show="flip-up"
                  transition-hide="flip-down"
                  filled
                  v-model="state.gender"
                  :options="sexoption"
                  name="gender"
                />
                <span
                  class="error"
                  v-for="error in v$.gender.$errors"
                  :key="error.$uid"
                >
                  {{ error.$message }}
                </span>
              </div>

              <div class="col-xs-12 col-sm-4 col-md-4">
                <q-input
                  filled
                  v-model="state.contact"
                  label="Required*"
                  hint="Contact Number"
                  name="contact"
                  lazy-rules
                  :rules="[
                    (val) => (val && val.length > 0) || 'Please type something',
                  ]"
                />
                <span
                  class="error"
                  v-for="error in v$.contact.$errors"
                  :key="error.$uid"
                >
                  {{ error.$message }}
                </span>
              </div>

              <div class="col-xs-12 col-sm-6 col-md-6">
                <q-input
                  filled
                  label="Required*"
                  v-model="state.regemail"
                  name="regemail"
                  type="email"
                  hint="Email"
                  lazy-rules
                  :rules="[
                    (val) => (val && val.length > 0) || 'Please type something',
                  ]"
                />
                <span
                  class="error"
                  v-for="error in v$.regemail.$errors"
                  :key="error.$uid"
                >
                  {{ error.$message }}
                </span>
              </div>

              <div class="col-xs-12 col-sm-6 col-md-6">
                <div class="row justify-end">
                  <label
                    >Are you a Career Service Eligibility/PRC License
                    holder?</label
                  >
                  <q-option-group
                    :options="eloptions"
                    type="radio"
                    checked-icon="task_alt"
                    unchecked-icon="panorama_fish_eye"
                    v-model="state.license"
                    name="license"
                  />
                </div>
              </div>
            </div>
            <br />
            <div class="col-12">
              <q-banner dense class="bg-cyan-12 text-black">
                <h2>Requirements</h2>
              </q-banner>
            </div>
            <br />
            <!-- Personal Details Ends Here -->

            <a href="http://localhost/backend/upload/pds.xlsx"
              >Download Personal Data Sheet</a
            >
            <br />
            <a href="http://localhost/backend/upload/wes.docx"
              >Download Work Experience Sheet</a
            >

            <p>
              NOTE: Please upload only PDF,DOC and DOCX only, otherwise the
              files will not be accepted in our system.
            </p>

            <p>
              Please follow the below format of the file name that you are going
              to upload.
            </p>
            <p>*LastName_FirstName_MidName_NameOfFile</p>
            <label>Ex. DelaCruz_Juan_Santos_CV</label>

            <div class="q-col-gutter-md row items-start">
              <div class="col-xs-12 col-sm-4 col-md-4">
                <label></label>
                <br />
                <q-input
                  @update:model-value="
                    (val) => {
                      file = val[0];
                    }
                  "
                  filled
                  type="file"
                  hint="Curriculum Vitae"
                  name="cv"
                  id="cv"
                  v-model="state.cv"
                />
                <span
                  class="error"
                  v-for="error in v$.cv.$errors"
                  :key="error.$uid"
                >
                  {{ error.$message }}
                </span>
              </div>
              <div class="col-xs-12 col-sm-4 col-md-4">
                <br />
                <q-input
                  @update:model-value="
                    (val) => {
                      file1 = val[0];
                    }
                  "
                  filled
                  type="file"
                  hint="Personal Data Sheet(CS Form 212
                rev.2017)"
                  name="pds"
                  id="pds"
                  v-model="state.pds"
                />
                <span
                  class="error"
                  v-for="error in v$.pds.$errors"
                  :key="error.$uid"
                >
                  {{ error.$message }}
                </span>
              </div>
              <div class="col-xs-12 col-sm-4 col-md-4">
                <br />
                <q-input
                  @update:model-value="
                    (val) => {
                      file2 = val[0];
                    }
                  "
                  filled
                  type="file"
                  hint="Work Experience Sheet(CS Form 212
                attachment)"
                  name="wes"
                  id="wes"
                  v-model="state.wes"
                />
                <span
                  class="error"
                  v-for="error in v$.wes.$errors"
                  :key="error.$uid"
                >
                  {{ error.$message }}
                </span>
              </div>

              <div class="col-xs-12 col-sm-4 col-md-4">
                <br />
                <q-input
                  @update:model-value="
                    (val) => {
                      file3 = val[0];
                    }
                  "
                  filled
                  type="file"
                  hint="Diploma"
                  name="diploma"
                  id="diploma"
                  v-model="state.diploma"
                />
                <span
                  class="error"
                  v-for="error in v$.diploma.$errors"
                  :key="error.$uid"
                >
                  {{ error.$message }}
                </span>
              </div>

              <div class="col-xs-12 col-sm-4 col-md-4">
                <br />
                <q-input
                  @update:model-value="
                    (val) => {
                      file4 = val[0];
                    }
                  "
                  filled
                  type="file"
                  hint="TOR"
                  name="tor"
                  id="tor"
                  v-model="state.tor"
                />
                <span
                  class="error"
                  v-for="error in v$.tor.$errors"
                  :key="error.$uid"
                >
                  {{ error.$message }}
                </span>
              </div>

              <div class="col-xs-12 col-sm-4 col-md-4">
                <br />
                <q-input
                  @update:model-value="
                    (val) => {
                      file5 = val[0];
                    }
                  "
                  filled
                  type="file"
                  hint="Certificate of Eligibility/PRC
                License"
                  name="eligibility"
                  id="eligibility"
                  v-model="state.eligibility"
                />
                <span
                  class="error"
                  v-for="error in v$.eligibility.$errors"
                  :key="error.$uid"
                >
                  {{ error.$message }}
                </span>
              </div>
              <div class="col-xs-12 col-sm-4 col-md-4">
                <br />
                <q-input
                  @update:model-value="
                    (val) => {
                      file6 = val[0];
                    }
                  "
                  filled
                  type="file"
                  hint="Application Letter"
                  name="appletter"
                  id="appletter"
                  v-model="state.appletter"
                />
                <span
                  class="error"
                  v-for="error in v$.appletter.$errors"
                  :key="error.$uid"
                >
                  {{ error.$message }}
                </span>
              </div>

              <div class="col-xs-12 col-sm-4 col-md-4">
                <br />
                <q-input
                  @update:model-value="
                    (val) => {
                      file7 = val[0];
                    }
                  "
                  filled
                  type="file"
                  hint="Training Certificate"
                  name="traincert"
                  id="traincert"
                />
              </div>

              <div class="col-xs-12 col-sm-4 col-md-4">
                <br />
                <q-input
                  @update:model-value="
                    (val) => {
                      file8 = val[0];
                    }
                  "
                  filled
                  type="file"
                  hint="Performance Evaluation/Rating for the last
                two rating period."
                  name="per"
                  id="per"
                />
              </div>
            </div>
            <br />
            <br />
            <div class="col-12">
              <q-banner dense class="bg-cyan-12 text-black">
                <h2>Feedback</h2>
              </q-banner>
            </div>
            <br />
            <div class="q-col-gutter-md row items-start">
              <div class="col-12">
                <label>Feedback Description:</label>
                <q-input
                  v-model="state.feedback"
                  filled
                  type="textarea"
                  name="feedback"
                />
                <span
                  class="error"
                  v-for="error in v$.feedback.$errors"
                  :key="error.$uid"
                >
                  {{ error.$message }}
                </span>
              </div>
            </div>

            <div class="col-xs-12 col-sm-6 col-md-6">
              <label>How did you know about our vacancy?</label>
              <q-option-group
                :options="vacoptions"
                type="radio"
                v-model="state.vacgroup"
                name="vacgroup"
              />
            </div>
            <div class="col-xs-12 col-sm-6 col-md-6">
              <div>
                <label
                  >How likely are you to recommend us to a friend or
                  colleague?</label
                >
              </div>

              <q-rating
                name="quality"
                v-model="state.quality"
                max="5"
                size="3.5em"
                color="yellow"
                icon="star_border"
                icon-selected="star"
                no-dimming
              />
            </div>

            <q-dialog v-model="alert" persistent>
              <q-card>
                <q-card-section>
                  <div class="alert"><h5>FAILED TO SUBMIT!!!</h5></div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                  Please complete all the necessary fields needed before
                  submitting the application form.
                </q-card-section>

                <q-card-actions align="right">
                  <q-btn flat label="OK" color="red" v-close-popup />
                </q-card-actions>
              </q-card>
            </q-dialog>
          </div>
        </div>
      </div>
      <q-card-actions align="center" class="bg-white text-teal">
        <q-btn
          size="22px"
          style="width: 500px"
          class="q-px-xl q-py-xs"
          label="Submit"
          color="green"
          @click="confirmed = true"
        />

        <q-dialog v-model="confirmed">
          <q-card>
            <q-card-section class="row items-center">
              <q-avatar icon="description" color="primary" text-color="white" />
              <span class="q-ml-sm"
                >Are you sure you want to upload this document?</span
              >
            </q-card-section>

            <q-card-actions align="right">
              <q-btn flat label="No" color="red" v-close-popup />
              <q-btn
                flat
                label="Yes"
                color="cyan-13"
                @click="confirms = true"
                v-close-popup
              />
            </q-card-actions>
          </q-card>
        </q-dialog>

        <q-dialog v-model="confirms">
          <q-card>
            <q-card-section class="row items-center">
              <span class="q-ml-sm"
                >Uploading an unautheticated document is a crime are you sure to
                submit this file?</span
              >
            </q-card-section>

            <q-card-actions align="right">
              <q-btn flat label="No" color="red" v-close-popup />
              <q-btn
                flat
                label="Yes"
                color="cyan-13"
                @click="createreg"
                v-close-popup
              />
            </q-card-actions>
          </q-card>
        </q-dialog>
      </q-card-actions>
    </q-card>
  </form>
</template>

<script setup>
import { useQuasar } from "quasar";
import { ref, onMounted, reactive, inject, computed } from "vue";

import { isTemplateNode } from "@vue/compiler-core";
import { useRoute, useRouter } from "vue-router";
import useVuelidate from "@vuelidate/core";
import {
  required,
  minLength,
  email,
  sameAs,
  helpers,
} from "@vuelidate/validators";
const $q = useQuasar();

const route = useRoute();
const router = useRouter();

const axios = inject("$axios");
const user = inject("$user");

const jobids = route.params.id;
const resp = ref();
const userid = user.id;

const id = ref();

const alert = ref(false);
const confirms = ref(false);
const confirmed = ref(false);

const state = reactive({
  jobsname: "",
  authname: "",
  regfirstname: user.first_name,
  regmidname: "",
  reglastname: user.last_name,
  date: "2019/02/01",
  regemail: user.email,
  gender: "Male",
  regjob: "",
  contact: "",
  quality: "3",
  vacgroup: "SEI Website Posting",
  license: "Yes",
  cv: "",
  pds: "",
  wes: "",
  diploma: "",
  tor: "",
  eligibility: "",
  appletter: "",
  traincert: "",
  per: "",
  feedback: "",
});

const rules = computed(() => {
  return {
    regjob: { required },
    regfirstname: { required },
    regmidname: { required },
    reglastname: { required },
    regemail: { required, email },
    contact: { required },
    date: { required },
    gender: { required },
    feedback: { required },
    cv: { required },
    pds: { required },
    wes: { required },
    diploma: { required },
    tor: { required },
    eligibility: { required },
    appletter: { required },
  };
});

const v$ = useVuelidate(rules, state);

const createreg = async () => {
  const result = await v$.value.$validate();
  if (result) {
    var formData = new FormData(document.getElementById("appForm"));
    formData.append("jobsname", route.params.id);
    formData.append("authname", user.id);
    formData.append("nonreq", resp.value);
    axios
      .post("http://localhost/backend/create.php?applicant", formData)
      .then(function (response) {
        if (response.data == true) {
          $q.notify({
            color: "cyan-13",
            textColor: "black",
            message: "Application Successfully Submitted",
          });
        } else {
          alert.value = true;
        }
      });
  } else {
    alert.value = true;
  }
};

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
      state.regjob = response.data.jobtitle;
      resp.value = response.data.training;
      console.log(state.regjob);
    });
};

const eloptions = [
  { label: "Yes", value: "Yes" },
  { label: "No", value: "No" },
];

const sexoption = [
  {
    label: "Male",
    value: "Male",
    color: "orange",
  },
  {
    label: "Female",
    value: "Female",
    color: "orange",
  },
];

const vacoptions = [
  {
    label: "SEI Website Posting",
    value: "SEI Website Posting",
    color: "cyan-13",
  },
  {
    label: "SEI Bulletin Board",
    value: "SEI Bulletin Board",
    color: "cyan-13",
  },
  { label: "SEI FB Page", value: "SEI FB Page", color: "cyan-13" },
  {
    label: "DOST Agency Posting",
    value: "DOST Agency Posting",
    color: "cyan-13",
  },
  { label: "CSC Website", value: "CSC Website", color: "cyan-13" },
  { label: "Referral", value: "Referral", color: "cyan-13" },
];
</script>

<style scope>
span.error {
  color: red;
}
div.alert {
  color: red;
}
</style>

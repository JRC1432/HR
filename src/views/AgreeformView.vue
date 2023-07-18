<!-- Stepper -->
<template>
  <div class="q-pa-md">
    <q-stepper v-model="step" vertical color="cyan-13" animated>
      <q-step
        :name="1"
        title="SEI Application Form"
        icon="settings"
        :done="step > 1"
      >
        This form intends to collect your basic information specifically, name
        and contact information as well as supporting documents such as PDS,
        TOR, Diploma, etc. based on the minimum qualification standard <br />
        of the Civil Service Commission (CSC).
        <br />
        Only qualified applicants and with complete requirements shall be
        processed.
        <br />
        Thank you.

        <q-stepper-navigation>
          <q-btn
            @click="step = 2"
            color="cyan-13"
            label="Continue"
            class="text-black"
          />
        </q-stepper-navigation>
      </q-step>

      <q-step
        :name="2"
        title="Data Privacy Notice"
        caption=""
        icon="settings"
        :done="step > 2"
      >
        This privacy notice for personal data is to inform you that your
        personal data is being processed by or on behalf of the Department of
        Science and Technology-Science Education Institute (DOST-SEI),<br />
        pursuant to the statutory requirements of the Data Privacy Act of 2012
        (RA 10173).
        <br />

        We will process your personal data (including your sensitive personal
        data such as information about your education, physical or mental health
        condition, religious belief and administrative/criminal<br />conviction,
        if applicable, and other information we may obtain about you from third
        parties) in order to process your application for employment and to
        communicate with you.
        <br />
        The selection process may involve the supply of further information,
        including panel interviews, and information<br />
        from third parties (including but not limited to, information from your
        previous employer(s), public records, background check agencies)
        regarding your qualifications, education, training, experience,<br />
        eligibility and/or other information for recruitment-related purposes.
        All such information will be kept strictly confidential and used for the
        purpose of evaluating your application only.

        <q-stepper-navigation>
          <q-btn
            @click="step = 3"
            color="cyan-13"
            label="Continue"
            class="text-black"
          />
          <q-btn
            flat
            @click="step = 1"
            color="cyan-13"
            label="Back"
            class="q-ml-sm"
          />
        </q-stepper-navigation>
      </q-step>

      <q-step
        :name="3"
        title="Unsuccessful Application"
        caption=""
        icon="settings"
        :done="step > 3"
      >
        If your application is unsuccessful, we will keep your personal data for
        a period of up to one (1) year in accordance with government policies
        and internal procedures. We <br />may also provide and/or transfer your
        personal data to other agencies within the government, private service
        providers, to determine your suitability for the job.

        <q-stepper-navigation>
          <q-btn
            @click="step = 4"
            color="cyan-13"
            label="Continue"
            class="text-black"
          />
          <q-btn
            flat
            @click="step = 2"
            color="cyan-13"
            label="Back"
            class="q-ml-sm"
          />
        </q-stepper-navigation>
      </q-step>

      <q-step
        :name="4"
        title="Successful Application"
        caption=""
        icon="settings"
        :done="step > 4"
      >
        If your application is successful, we will process your personal data
        for purposes regarding employment with us, including to communicate with
        you, manage, improve and maintain effective human resources
        administration, process your salary, respond to your enquiries or
        complaints, improve and facilitate employee performance and salary
        reviews, monitor compliance with applicable policies and procedures,
        rules and regulations, handbooks and guidelines, code of conduct,
        evaluate your performance, enable us to plan and monitor training
        requirements, conduct health checks on you, facilitate your assignment
        within the Institute and other purposes that are necessary or related to
        your employment with us and other purposes as set out in our Personal
        Data Protection Policy and our employee handbook and/or personal data
        protection compliance manual (collectively referred to as “Purposes”).

        <q-stepper-navigation>
          <q-btn
            @click="step = 5"
            color="cyan-13"
            label="Continue"
            class="text-black"
          />
          <q-btn
            flat
            @click="step = 3"
            color="cyan-13"
            label="Back"
            class="q-ml-sm"
          />
        </q-stepper-navigation>
      </q-step>

      <q-step
        :name="5"
        title="Other Information"
        caption=""
        icon="settings"
        :done="step > 5"
      >
        We will not disclose any of your personal data to any third party
        without your consent, except to the Civil Service Commission (CSC), and
        other regulatory bodies of the government, our professional advisers,
        agents, contractors, third-party service providers, insurance companies,
        banks, and financial institutions, within or outside the Philippines,
        where necessary, for the Purposes mentioned above, to any party who
        undertakes to keep your personal data confidential, to any person as set
        out in our Personal Data Protection Policy and our employee handbook
        and/or personal data protection compliance manual, or to whom we are
        compelled or required under the law to disclose to.
        <br />
        <br />
        It is necessary for us to collect and process your personal data. If you
        do not provide us with your personal data, or do not consent to this
        Personal Data Privacy Notice and our Personal Data Protection Policy, we
        will not be able to assess and process your application, offer you
        employment with us, manage and maintain your employment relationship
        with us, process your personal data for any of the Purposes or offer you
        all employment benefits.

        <br />
        <br />

        We are committed to ensuring that your personal data is stored securely.
        Please note that we may keep your personal data for a reasonable period
        in accordance with existing government policies and our internal
        administrative requirements if you cease to be employed by DOST-SEI.

        <br />
        <br />

        To the extent that the applicable law allows, you have the right as a
        data subject to request for access to, request for a copy of, request to
        update or correct, your personal data held by us.
        <br />
        <br />
        You may address your request(s) or inquiries to:
        <br />
        <br />

        The Data Protection Officer
        <br />

        Science Education Institute<br />
        Department of Science and Technology<br />
        Level 1, Philippine Science Heritage Bldg., DOST Complex<br />
        Gen. Santos Ave., Bicutan,Taguig City Email: dpo@sei.dost.gov.ph<br />
        <br />
        <br />

        We trust that all personal data provided by you is accurate and complete
        and that none of it is misleading or out of date. You will promptly
        update us in the event of any change to your personal data.
        <br />
        <br />

        To the extent that you have provided (or will provide) personal data
        about your family members, spouse and/or other dependents, and persons
        listed as character references, you confirm that you have explained to
        them that their personal data will be provided to, and processed by, us
        and you represent and warrant that you have obtained their consent to
        the processing (including disclosure and transfer) of their personal
        data in accordance with this Personal Data Privacy Notice and our
        Personal Data Protection Policy.

        <q-stepper-navigation>
          <q-btn
            @click="step = 6"
            color="cyan-13"
            label="Continue"
            class="text-black"
          />
          <q-btn
            flat
            @click="step = 4"
            color="cyan-13"
            label="Back"
            class="q-ml-sm"
          />
        </q-stepper-navigation>
      </q-step>

      <q-step
        :name="6"
        title="Acknowledgement of Data Privacy Act.."
        icon="add_comment"
      >
        I hereby acknowledge that as part of my application, the DOST-SEI HRMU
        will process my personal information in accordance to the RA 10173 known
        Data Privacy Act of 2012 and its related issuances.

        <br />
        <br />

        By clicking the agree button you agree to the statement above and ready
        to proceed with the application.
        <q-stepper-navigation>
          <q-btn
            label="I Agree"
            color="cyan-13"
            @click="registerme"
            class="text-black"
          />
          <q-btn
            flat
            @click="step = 5"
            color="cyan-13"
            label="Back "
            class="q-ml-sm"
          />
        </q-stepper-navigation>
      </q-step>
    </q-stepper>

    <q-dialog v-model="reg" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Email Address Verification</div>
        </q-card-section>
        <q-card-section>
          <form id="regForm" @submit.prevent="Vmail" class="q-gutter-md">
            <q-input
              dense
              v-model="state.emailadd"
              name="emailaddress"
              autofocus
              @keyup.enter="prompt = false"
              type="email"
              hint="Email"
              lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || 'Please type something',
              ]"
            />

            <q-card-actions align="right">
              <q-btn flat label="close" color="red-13" v-close-popup />
              <q-btn color="green" flat label="Submit" type="submit" />
            </q-card-actions>
          </form>
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog v-model="VerifyMe" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Verification Code</div>
        </q-card-section>
        <q-card-section>
          <form id="regForm2" @submit.prevent="VerifyCode" class="q-gutter-md">
            <q-input
              dense
              v-model="state.vcode"
              name="vcode"
              autofocus
              @keyup.enter="prompt = false"
              hint="Verification Code"
              lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || 'Please type something',
              ]"
            />

            <q-card-actions align="right">
              <q-btn flat label="close" color="red-13" v-close-popup />
              <q-btn color="green" flat label="Verify" type="submit" />
            </q-card-actions>
          </form>
        </q-card-section>
      </q-card>
    </q-dialog>

    <!-- Registration -->

    <q-dialog v-model="SuccessCode" persistent>
      <q-card style="min-width: 500px; width: 500px">
        <q-card-section>
          <div class="text-h6">Registration</div>
        </q-card-section>
        <q-separator />
        <q-card-section>
          <form id="regForm3" @submit.prevent="Register" class="q-gutter-md">
            <q-input
              rounded
              outlined
              v-model="state.fname"
              name="fname"
              label="First Name"
            />
            <div>
              <span
                class="error"
                v-for="error in v$.fname.$errors"
                :key="error.$uid"
              >
                {{ error.$message }}
              </span>
            </div>
            <q-input
              rounded
              outlined
              v-model="state.lname"
              name="lname"
              label="Last Name"
            />
            <div>
              <span
                class="error"
                v-for="error in v$.lname.$errors"
                :key="error.$uid"
              >
                {{ error.$message }}
              </span>
            </div>
            <q-input
              rounded
              outlined
              readonly
              v-model="state.emailadd"
              name="remail"
              label="Email Address"
            />
            <div>
              <span
                class="error"
                v-for="error in v$.emailadd.$errors"
                :key="error.$uid"
              >
                {{ error.$message }}
              </span>
            </div>
            <q-input
              v-model="state.passwords"
              rounded
              outlined
              :type="isPwds ? 'password' : 'text'"
              label="Password"
              name="passwords"
            >
              <template v-slot:append>
                <q-icon
                  :name="isPwds ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwds = !isPwds"
                />
              </template>
            </q-input>
            <div>
              <span
                class="error"
                v-for="error in v$.passwords.$errors"
                :key="error.$uid"
              >
                {{ error.$message }}
              </span>
            </div>
            <q-input
              v-model="state.confirmpasswords"
              rounded
              outlined
              :type="isPwds ? 'password' : 'text'"
              label="Confirm Password"
              name="confirmpasswords"
            >
              <template v-slot:append>
                <q-icon
                  :name="isPwds ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwds = !isPwds"
                />
              </template>
            </q-input>

            <div>
              <span
                class="error"
                v-for="error in v$.confirmpasswords.$errors"
                :key="error.$uid"
              >
                {{ error.$message }}
              </span>
            </div>

            <q-card-actions align="right">
              <q-btn flat label="Close" color="red-13" to="/" />
              <q-btn color="cyan-13" label="Submit" type="submit" />
            </q-card-actions>
          </form>
        </q-card-section>
      </q-card>
    </q-dialog>
    <q-dialog v-model="frontpage" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="verified" color="green" text-color="white" />
          <span class="q-ml-sm"
            >CONGRATULATIONS!!!! YOU ARE NOW REGISTERED.....</span
          >
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="OK" color="cyan-13" to="/" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { useQuasar } from "quasar";
import { ref, onMounted, reactive, inject, computed } from "vue";
import { RouterLink, RouterView } from "vue-router";
import axios from "axios";
import { isTemplateNode } from "@vue/compiler-core";
import useVuelidate from "@vuelidate/core";
import {
  required,
  minLength,
  email,
  sameAs,
  helpers,
} from "@vuelidate/validators";

const containsUser = (value) => {
  return value.includes("user");
};

const reg = ref(false);
const VerifyMe = ref(false);
const SuccessCode = ref(false);
const frontpage = ref(false);
const fullWidth = ref(false);
const step = ref(1);

const fixed = ref();
const fixs = ref();
const $q = useQuasar();
const isPwds = ref(true);

const state = reactive({
  emailadd: "",
  vcode: "",
  fname: "",
  lname: "",
  confirmpasswords: "",
  passwords: "",
});

const rules = computed(() => {
  return {
    fname: {
      required,
    },
    lname: { required },
    emailadd: { required, email },
    passwords: { required, minLength: minLength(8) },
    confirmpasswords: { required, sameAs: sameAs(state.passwords) },
  };
});

const registerme = () => {
  reg.value = true;
};

const Vmail = () => {
  var formData = new FormData(document.getElementById("regForm"));
  axios
    .post("http://localhost/backend/create.php?verify", formData)
    .then(function (response) {
      // app.salaryList = response.data.salary;

      if (response.data == true) {
        $q.notify({
          color: "green",
          message: "Please Check your E-mail for Verification Code",
        });
        VerifyMe.value = true;
      } else {
        $q.notify({
          color: "red",
          textColor: "white",
          message: "Please Enter a Valid Email Address",
        });
      }
    });
};

const VerifyCode = () => {
  var formData = new FormData(document.getElementById("regForm2"));
  axios
    .post("http://localhost/backend/index.php?verifycodes", formData)
    .then(function (response) {
      // app.salaryList = response.data.salary;

      if (response.data == true) {
        $q.notify({
          color: "green",
          message: "Account Verified",
        });
        SuccessCode.value = true;
      } else {
        $q.notify({
          color: "red",
          textColor: "white",
          message: "Verification Code Failed",
        });
      }
    });
};

const v$ = useVuelidate(rules, state);

const Register = async () => {
  console.log(v$);
  const result = await v$.value.$validate();
  if (result) {
    var formData = new FormData(document.getElementById("regForm3"));

    axios
      .post("http://localhost/backend/create.php?register", formData)
      .then(function (response) {
        // app.salaryList = response.data.salary;

        if (response.data == true) {
          $q.notify({
            color: "green",
            message: "Registration Successful",
          });
          frontpage.value = true;
        } else {
          $q.notify({
            color: "red",
            textColor: "white",
            message: "User not Registered Successfully",
          });
        }
      });
  } else {
    $q.notify({
      color: "red",
      message: "Registration Failed !!! An error occured",
    });
  }
};
</script>

<style scope>
span.error {
  color: red;
}
</style>

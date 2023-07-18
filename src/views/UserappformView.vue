<template>
  <div class="q-pa-md">
    <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
      <div class="row justify-center">
        <div class="col-xs-12 col-sm-6">
          <h2>Application Form</h2>
          .
          <br />
          <br />
          <div class="q-col-gutter-md row items-start">
            <div class="col-12">
              <q-input
                filled
                v-model="regjob"
                label="Required*"
                hint="Job Title"
                name="regjob"
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
                v-model="regfirstname"
                label="Required*"
                hint="First Name"
                name="regfirstname"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Please type something',
                ]"
              />
            </div>

            <div class="col-xs-12 col-sm-6 col-md-6">
              <q-input
                filled
                v-model="reglastname"
                label="Required*"
                hint="Last Name"
                name="reglastname"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Please type something',
                ]"
              />
            </div>

            <div class="col-12">
              <q-input
                filled
                v-model="email"
                label="Required*"
                hint="Email Address"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Please type something',
                ]"
              />
            </div>

            <div class="col-xs-12 col-sm-6 col-md-6">
              <q-input
                v-model="password"
                filled
                :type="isPwd ? 'password' : 'text'"
                label="Required*"
                hint="Password"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Please type something',
                ]"
              >
                <template v-slot:append>
                  <q-icon
                    :name="isPwd ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="isPwd = !isPwd"
                  />
                </template>
              </q-input>
            </div>

            <div class="col-xs-12 col-sm-6 col-md-6">
              <q-input
                filled
                v-model="contact"
                label="Required*"
                hint="Contact number"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Please type something',
                ]"
              />
            </div>

            <div class="col-xs-12 col-sm-6 col-md-6">
              <label
                >Are you a Career Service Eligibility/PRC License holder?</label
              >
              <q-option-group
                :options="cscoptions"
                type="radio"
                v-model="cscgroup"
              />
            </div>

            <div class="col-12">
              <q-banner dense class="bg-orange-8 text-white">
                <h2>Documentary Requirements</h2>
              </q-banner>
            </div>

            <div class="col-xs-12 col-sm-6 col-md-6">
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
                hint="Please upload your CV"
              />
            </div>

            <div class="col-xs-12 col-sm-6 col-md-6">
              <br />
              <q-input
                @update:model-value="
                  (val) => {
                    file1 = val[0];
                  }
                "
                filled
                type="file"
                hint="Please upload your Personal Data Sheet(CS Form 212
                rev.2017)"
              />
            </div>

            <div class="col-xs-12 col-sm-6 col-md-6">
              <br />
              <q-input
                @update:model-value="
                  (val) => {
                    file2 = val[0];
                  }
                "
                filled
                type="file"
                hint="Please upload your Work Experience Sheet(CS Form 212
                attachment)"
              />
            </div>

            <div class="col-xs-12 col-sm-6 col-md-6">
              <br />
              <q-input
                @update:model-value="
                  (val) => {
                    file3 = val[0];
                  }
                "
                filled
                type="file"
                hint="Please upload a copy of your Diploma"
              />
            </div>

            <div class="col-xs-12 col-sm-6 col-md-6">
              <br />
              <q-input
                @update:model-value="
                  (val) => {
                    file4 = val[0];
                  }
                "
                filled
                type="file"
                hint="Please upload your TOR"
              />
            </div>

            <div class="col-xs-12 col-sm-6 col-md-6">
              <br />
              <q-input
                @update:model-value="
                  (val) => {
                    file5 = val[0];
                  }
                "
                filled
                type="file"
                hint="Please upload a copy of your Certificate of Eligibility/PRC
                License"
              />
            </div>

            <div class="col-xs-12 col-sm-6 col-md-6">
              <br />
              <q-input
                @update:model-value="
                  (val) => {
                    file6 = val[0];
                  }
                "
                filled
                type="file"
                hint="Please upload your Application Letter"
              />
            </div>

            <div class="col-xs-12 col-sm-6 col-md-6">
              <br />
              <q-input
                @update:model-value="
                  (val) => {
                    file7 = val[0];
                  }
                "
                filled
                type="file"
                hint="Please upload a copy of your Training Certificates"
              />
            </div>

            <div class="col-xs-12 col-sm-6 col-md-6">
              <br />
              <q-input
                @update:model-value="
                  (val) => {
                    file8 = val[0];
                  }
                "
                filled
                type="file"
                hint="Please upload your Performance Evaluation/Rating for the last
                two rating period"
              />
            </div>

            <div class="col-12">
              <q-banner dense class="bg-orange-8 text-white">
                <h2>Feedback</h2>
              </q-banner>
            </div>

            <div class="col-12">
              <label>Feedback Description:</label>
              <q-input v-model="text" filled type="textarea" />
            </div>

            <div class="col-xs-12 col-sm-6 col-md-6">
              <label>How did you know about our vacancy?</label>
              <q-option-group
                :options="vacoptions"
                type="radio"
                v-model="vacgroup"
              />
            </div>

            <div class="col-xs-12 col-sm-6 col-md-6">
              <label
                >How likely are you to recommend us to a friend or
                colleague?</label
              >
              <q-rating
                name="quality"
                v-model="quality"
                max="5"
                size="3.5em"
                color="yellow"
                icon="star_border"
                icon-selected="star"
                no-dimming
              />

              <q-card
                v-if="submitResult.length > 0"
                flat
                bordered
                class="q-mt-md bg-grey-2"
              >
                <q-card-section
                  >Submitted form contains the following formData (key =
                  value):</q-card-section
                >
                <q-separator />
                <q-card-section class="row q-gutter-sm items-center">
                  <div
                    v-for="(item, index) in submitResult"
                    :key="index"
                    class="q-px-sm q-py-xs bg-grey-8 text-white rounded-borders text-center text-no-wrap"
                  >
                    {{ item.name }} = {{ item.value }}
                  </div>
                </q-card-section>
              </q-card>
            </div>

            <div class="col-xs-12 col-sm-6 col-md-6">
              <div>
                <q-btn
                  label="Submit All Response"
                  type="submit"
                  color="orange-8"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </q-form>
  </div>
</template>

<!-- <script>
  import { ref } from 'vue'
  
  export default {
    setup () {
      return {
        password: ref(''),
        isPwd: ref(true),
  
        email: ref(''),
        search: ref(''),
        tel: ref(''),
        url: ref(''),
        time: ref(''),
        date: ref('')
      }
    }
  }
  </script> -->

<script>
import { useQuasar } from "quasar";
import { ref } from "vue";

export default {
  setup() {
    const $q = useQuasar();

    const firstname = ref(null);
    const lastname = ref(null);
    const email = ref(null);
    const password = ref(null);
    const contact = ref(null);
    const job = ref(null);

    const submitResult = ref([]);

    return {
      firstname,
      lastname,
      email,
      password,
      contact,
      job,
      password: ref(""),
      isPwd: ref(true),
      email: ref(""),
      search: ref(""),
      tel: ref(""),
      url: ref(""),
      time: ref(""),
      cscgroup: ref("1"),
      vacgroup: ref("SEI Website Posting"),
      cscoptions: [
        { label: "Yes", value: "1", color: "green" },
        { label: "No", value: "0", color: "red" },
      ],
      date: ref(""),
      file: ref(null),
      file1: ref(null),
      file2: ref(null),
      file3: ref(null),
      file4: ref(null),
      file5: ref(null),
      file4: ref(null),
      file5: ref(null),
      file6: ref(null),
      file7: ref(null),
      file8: ref(null),
      vacoptions: [
        {
          label: "SEI Website Posting",
          value: "SEI Website Posting",
          color: "orange",
        },
        {
          label: "SEI Bulletin Board",
          value: "SEI Bulletin Board",
          color: "orange",
        },
        { label: "SEI FB Page", value: "SEI FB Page", color: "orange" },
        {
          label: "DOST Agency Posting",
          value: "DOST Agency Posting",
          color: "orange",
        },
        { label: "CSC Website", value: "CSC Website", color: "orange" },
        { label: "Referral", value: "Referral", color: "orange" },
      ],
      quality: ref(3),
      submitResult,

      onSubmit(evt) {
        const formData = new FormData(evt.target);
        const data = [];

        for (const [name, value] of formData.entries()) {
          data.push({
            name,
            value,
          });
        }

        submitResult.value = data;
      },
    };
  },
};

// onSubmit () {
//   if (accept.value !== true) {
//     $q.notify({
//       color: 'red-5',
//       textColor: 'white',
//       icon: 'warning',
//       message: 'You need to accept the license and terms first'
//     })
//   }
//   else {
//     $q.notify({
//       color: 'green-4',
//       textColor: 'white',
//       icon: 'cloud_done',
//       message: 'Submitted'
//     })
//   }
// },

//       onReset () {
//         name.value = null
//         age.value = null
//         accept.value = false
//       }
//     }
//   }
// }
</script>

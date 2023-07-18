<q-dialog v-model="reg" persistent>
  <q-card style="min-width: 500px; width: 500px">
    <q-card-section>
      <div class="text-h6">
        Registration
        <div class="row justify-end">
          <q-btn outline color="red" v-close-popup icon="highlight_off" />
        </div>
      </div>
    </q-card-section>
    <q-separator />
    <q-card-section>
      <form id="regForm" @submit.prevent="Register" class="q-gutter-md">
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
          v-model="state.remail"
          name="remail"
          label="E-mail"
        />
        <div>
          <span
            class="error"
            v-for="error in v$.remail.$errors"
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
          <q-btn flat label="Back" color="red-13" to="/" />
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

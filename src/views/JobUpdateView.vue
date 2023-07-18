<template>
  <div class="q-px-lg q-py-md">
    <q-timeline color="secondary">
      <q-timeline-entry heading>Application Status </q-timeline-entry>

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
  </div>
</template>

<script setup>
import { useQuasar } from "quasar";
import { ref, onMounted, reactive, inject } from "vue";
import { isTemplateNode } from "@vue/compiler-core";
import { useRoute, useRouter } from "vue-router";

const axios = inject("$axios");
const user = inject("$user");

onMounted(() => {
  readstats();
});

const id = ref();
const eventdesc = ref();

const readstats = () => {
  id.value = user.id;
  var formData = new FormData();
  formData.append("auth_id", id.value);
  axios
    .post("http://localhost/backend/index.php?readstatus", formData)
    .then((response) => {
      eventdesc.value = response.data;
    });
};
</script>

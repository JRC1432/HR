import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { Quasar, Notify, Loading, Dialog } from "quasar";
import axiosMain from "axios";

import "./assets/main.css";
// Import icon libraries
import "@quasar/extras/material-icons/material-icons.css";

// Import Quasar css
import "quasar/src/css/index.sass";

// Assumes your root component is App.vue
// and placed in same folder as main.js

var user = [];
var rootDomain = "http://localhost";
const myApp = createApp(App);

const baseURL =
  process.env.NODE_ENV === "development"
    ? rootDomain + "/backend/"
    : "/backend/";
const axios = axiosMain.create({
  baseURL,
  withCredentials: true,
});
myApp.provide("$axios", axios);

router.beforeEach((to, from, next) => {
  // ...
  // explicitly return false to cancel the navigation
  axios
    .get("/index.php?authLog", {
      withCredentials: true,
    })
    .then(function (response) {
      user = response.data;
      // console.log(user);
      myApp.provide("$user", user);

      if (response.data == false && response.data?.email == undefined) {
        next();
      } else {
        next();
      }
    });
});

myApp.use(Quasar, {
  plugins: {
    Notify,
  }, // import Quasar plugins and add here
});

myApp.use(router);

myApp.mount("#app");

myApp.use(Quasar, {
  plugins: {
    Loading,
  },
  config: {
    loading: {
      /* look at QuasarConfOptions from the API card */
    },
  },
});

myApp.use(Quasar, {
  plugins: {
    Dialog,
  },
});

myApp.use(Quasar, {
  plugins: {
    Loading,
  },
  config: {
    loading: {
      /* look at QuasarConfOptions from the API card */
    },
  },
});

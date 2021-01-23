import Vue from "vue";
import Vuelidate from "vuelidate";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueMeta from 'vue-meta'
import tooltipDirective from "@/directives/tooltip.directive";
import messagePlugin from "@/utils/message.plugin";
import titlePlugin from "@/utils/title.plugin";
import Loader from "@/components/Loader";
import Paginate from "vuejs-paginate";
import dateFilter from "./filters/date.filter";
import localizeFilter from "./filters/localize.filter";
import currencyFilter from "./filters/currency.filter";
import "materialize-css";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

Vue.config.productionTip = false;

Vue.filter("fDate", dateFilter);
Vue.filter("fCurrency", currencyFilter);
Vue.filter("fLocalize", localizeFilter);
Vue.directive("tooltip", tooltipDirective);
Vue.use(VueMeta);
Vue.use(Vuelidate);
Vue.use(messagePlugin);
Vue.use(titlePlugin);
Vue.component("Loader", Loader);
Vue.component("Paginate", Paginate);

firebase.initializeApp({
  apiKey: "AIzaSyCF53phtQOMYzQ2WdO9qu17HJX0gBTGdvI",
  authDomain: "vuecrma.firebaseapp.com",
  databaseURL: "https://vuecrma.firebaseio.com",
  projectId: "vuecrma",
  storageBucket: "vuecrma.appspot.com",
  messagingSenderId: "194998618870",
  appId: "1:194998618870:web:8ec0e5312e25369a2d3ad7",
  measurementId: "G-43BTPXXZDF"
});

let app;

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount("#app");
  }
});

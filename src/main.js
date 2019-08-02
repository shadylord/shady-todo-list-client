import Vue from "vue";
import App from "./App.vue";
import Vuelidate from "vuelidate";
import router from "./router";
import store from "./store";

import "../node_modules/bootswatch/dist/flatly/bootstrap.min.css";

Vue.config.productionTip = false;

Vue.use(Vuelidate);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

import Vue from "nativescript-vue";

import Main from "./components/Main.vue";

Vue.config.silent = false;

new Vue({
  render: (h) => h("frame", [h(Main)]),
}).$start();

import Vue from "vue";
import Vuex, { StoreOptions } from "vuex";
import { RootState } from "./types";
import { blog } from "./blog/index";

Vue.use(Vuex);
const store: StoreOptions<RootState> = {
  modules: {
    blog,
  },
};

export default new Vuex.Store<RootState>(store);

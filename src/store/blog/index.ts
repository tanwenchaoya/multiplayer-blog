import { Module } from "vuex";
import { state } from "./state";
import { mutations } from "./mutations";
import { actions } from "./actions";
import { BlogState } from "./types";
import { RootState } from "../types";

const namespaced = true;
export const blog: Module<BlogState, RootState> = {
  namespaced,
  state,
  actions,
  mutations,
};
export default state;

import { BlogState } from "./types";
import { ActionTree } from "vuex";
import { RootState } from "../types";

export const actions: ActionTree<BlogState, RootState> = {
  fetchData({ commit }): void {},
};
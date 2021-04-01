import { BlogState } from "./types";
import { ActionTree } from "vuex";
import { RootState } from "../types";

export const actions: ActionTree<BlogState, RootState> = {
  fetchData({ commit }): void { },
  updateArticle({ commit },{articleId}): void{
    commit('updateArticle',articleId)
  },
   updateShow({ commit },{isShow}): void{
    commit('updateShow',isShow)
  }
};

import { MutationTree } from "vuex";
import { BlogState } from "./types";
export const mutations: MutationTree<BlogState> = {
  updateShow(state, data) {
    console.log(234);
    state.isshow = data;
  },
  updatefont(state, data) {
    console.log(123123);
    state.fontColor = data;
    data ? (state.Color = "#fff") : (state.Color = "#333");
  },
  LoadingTitleChange(state, data) {
    state.LoadingTitle = data.title;
    state.LoadingShow = data.isshow;
  },
  updateArticle(state, articleId) {
    state.updateArticleId = articleId;
  }
};

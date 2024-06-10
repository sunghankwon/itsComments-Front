import { create } from "zustand";

const useCommentsStore = create((set) => ({
  createdComments: [],
  feedComments: [],
  receivedComments: [],
  setUserCreatedComments: (comments) => set({ createdComments: comments }),
  setUserFeedComments: (comments) => set({ feedComments: comments }),
  setUserReceivedComments: (comments) => set({ receivedComments: comments }),
}));

export default useCommentsStore;

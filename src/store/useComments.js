import { create } from "zustand";

const useCommentsStore = create((set) => ({
  createdComments: [],
  receivedComments: [],
  setUserCreatedComments: (comments) => set({ createdComments: comments }),
  setUserReceivedComments: (comments) => set({ receivedComments: comments }),
}));

export default useCommentsStore;

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface NewProjectState {
  prompt: string;
  style: string | null;
  error: string | null;
  id: string | null;
}

interface NewProjectActions {
  setPrompt: (prompt: string) => void;
  setStyle: (style: string) => void;
  resetProject: () => void;
  setError: (error: string | null) => void;
  setId: (id: string) => void;
}

type NewProjectStore = NewProjectState & NewProjectActions;

const initialState: NewProjectState = {
  prompt: "",
  style: null,
  error: null,
  id: null,
};

// New project store to handle project state after creation. The id serves as an indicator that the project has been created. The processing status is determined by the eta field from Firebase Firestore.
export const useNewProjectStore = create<NewProjectStore>()(
  persist(
    (set) => ({
      ...initialState,

      // Actions
      setPrompt: (prompt) => set({ prompt }),

      setStyle: (style) => set({ style }),

      resetProject: () => set(initialState),

      setError: (error) => set({ error }),

      setId: (id) => set({ id }),
    }),
    {
      name: "new-logo-project-storage",
    }
  )
);

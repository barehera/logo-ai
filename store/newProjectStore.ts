import { create } from "zustand";
import { persist } from "zustand/middleware";

// Define the store state interface
interface NewProjectState {
  prompt: string;
  style: string | null;
  error: string | null;
  id: string | null;
}

// Define the store actions interface
interface NewProjectActions {
  setPrompt: (prompt: string) => void;
  setStyle: (style: string) => void;
  resetProject: () => void;
  setError: (error: string | null) => void;
  setId: (id: string) => void;
}

// Combine state and actions into a single store type
type NewProjectStore = NewProjectState & NewProjectActions;

// Initial state
const initialState: NewProjectState = {
  prompt: "",
  style: null,
  error: null,
  id: null,
};

// // Create the store with middleware
// export const useNewProjectStore = create<NewProjectStore>()(
//   persist(
//     (set) => ({
//       // Initial state
//       ...initialState,

//       // Actions
//       setPrompt: (prompt) => set({ prompt }),

//       setStyle: (style) => set({ style }),

//       resetProject: () => set(initialState),

//       setError: (error) => set({ error }),

//       setId: (id) => set({ id }),
//     }),
//     {
//       name: "new-project-storage",
//     }
//   )
// );

export const useNewProjectStore = create<NewProjectStore>((set) => ({
  // Initial state
  ...initialState,

  // Actions
  setPrompt: (prompt) => set({ prompt }),

  setStyle: (style) => set({ style }),

  resetProject: () => set(initialState),

  setError: (error) => set({ error }),

  setId: (id) => set({ id }),
}));

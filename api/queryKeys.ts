// This object contains the query key generators for the queries used in the project.
export const queryKeys = {
  projects: {
    all: ["projects"],
    byId: (id: string) => ["projects", id],
  },
};

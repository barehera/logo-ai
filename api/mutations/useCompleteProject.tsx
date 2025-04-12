import { useMutation, useQueryClient } from "@tanstack/react-query";
import { completeProject } from "../project";
import { queryKeys } from "../queryKeys";
import { ProjectProps } from "@/types/project";
import { useNewProjectStore } from "@/store/newProjectStore";

// This hook provides functionality to mark a project as complete.
// It updates the project's status in Firebase when the estimated time (ETA)
// reaches zero, invalidates related queries, and resets the project creation form.
const useCompleteProject = () => {
  const queryClient = useQueryClient();
  const setPrompt = useNewProjectStore((state) => state.setPrompt);
  const setStyle = useNewProjectStore((state) => state.setStyle);

  return useMutation({
    mutationFn: (id: ProjectProps["id"]) => completeProject(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.projects.all });
      setPrompt("");
      setStyle(null);
    },
  });
};

export default useCompleteProject;

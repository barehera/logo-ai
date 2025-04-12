import { useMutation, useQueryClient } from "@tanstack/react-query";
import { completeProject } from "../project";
import { queryKeys } from "../keys";
import { ProjectProps } from "@/types/project";
import { useNewProjectStore } from "@/store/newProjectStore";

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

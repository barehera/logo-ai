import { useMutation, useQueryClient } from "@tanstack/react-query";
import { completeProject } from "../project";
import { queryKeys } from "../keys";
import { ProjectProps } from "@/types/project";

const useCompleteProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: ProjectProps["id"]) => completeProject(id),
    onSuccess: (_, variables, context) => {
      console.log(variables, context);
      queryClient.invalidateQueries({ queryKey: queryKeys.projects.all });
    },
  });
};

export default useCompleteProject;

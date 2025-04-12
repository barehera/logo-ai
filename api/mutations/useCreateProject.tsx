import { useMutation } from "@tanstack/react-query";
import { createProject } from "../project";
import { ProjectProps } from "@/types/project";
import { useNewProjectStore } from "@/store/newProjectStore";

const useCreateProject = () => {
  const setId = useNewProjectStore((state) => state.setId);
  const setError = useNewProjectStore((state) => state.setError);
  const setPrompt = useNewProjectStore((state) => state.setPrompt);
  const setStyle = useNewProjectStore((state) => state.setStyle);

  return useMutation({
    mutationFn: ({
      prompt,
      style,
    }: {
      prompt: ProjectProps["prompt"];
      style: ProjectProps["style"];
    }) => createProject(prompt, style),
    onMutate: () => {
      setPrompt("");
      setStyle(null);
    },
    onError: (error) => {
      setError(error.message);
    },
    onSuccess: (data) => {
      setId(data.id);
    },
  });
};

export default useCreateProject;

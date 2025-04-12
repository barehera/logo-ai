import useGetProject from "@/api/queries/useGetProject";
import { ProjectProps } from "@/types/project";

const useIsProcessing = (id: ProjectProps["id"]) => {
  const projectQuery = useGetProject(id);

  if (projectQuery.isError) {
    return false;
  }

  return projectQuery.data?.eta > 0;
};

export default useIsProcessing;

import { ProjectProps } from "@/types/project";
import { useQuery } from "@tanstack/react-query";
import { getProject } from "../project";
import { queryKeys } from "../keys";

const useGetProject = (id: ProjectProps["id"]) => {
  return useQuery({
    queryKey: queryKeys.projects.byId(id),
    queryFn: () => getProject(id),
    enabled: !!id,
  });
};

export default useGetProject;

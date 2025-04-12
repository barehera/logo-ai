import useGetProject from "@/api/queries/useGetProject";
import { ProjectProps } from "@/types/project";

// This hook checks if a project is still processing by querying the project's ETA from Firebase Firestore.
const useIsProcessing = (id: ProjectProps["id"]) => {
  const projectQuery = useGetProject(id);

  if (projectQuery.isError) {
    return false;
  }

  return projectQuery.data?.eta > 0;
};

export default useIsProcessing;

import { projectPromptSchema } from "@/constants/schemas";
import { ProjectProps } from "@/types/project";
import { generateRandomEta, sleep } from "@/utils/project";
import firestore from "@react-native-firebase/firestore";

export async function createProject(
  prompt: ProjectProps["prompt"],
  style: ProjectProps["style"]
): Promise<ProjectProps> {
  const result = projectPromptSchema.safeParse(prompt);

  if (!result.success) {
    throw new Error(result.error.errors[0].message);
  }

  const eta = generateRandomEta();

  const docRef = await firestore().collection("projects").add({
    prompt,
    style,
    eta,
    createdAt: firestore.FieldValue.serverTimestamp(),
    updatedAt: firestore.FieldValue.serverTimestamp(),
  });

  const projectId = docRef.id;

  return {
    id: projectId,
    prompt,
    style,
    eta,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}

export async function getProject(id: ProjectProps["id"]) {
  const docRef = firestore().collection("projects").doc(id);
  const doc = await docRef.get();
  return doc.data() as ProjectProps;
}

export async function completeProject(id: ProjectProps["id"]) {
  const docRef = firestore().collection("projects").doc(id);
  await docRef.update({
    eta: 0,
    updatedAt: firestore.FieldValue.serverTimestamp(),
  });
}

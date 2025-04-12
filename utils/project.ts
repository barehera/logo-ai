import { ProjectProps } from "@/types/project";

export const generateRandomId = (): string => {
  return Math.random().toString(36).substring(2, 15);
};

export const generateRandomEta = (): number => {
  // Generate a random number between 30 and 60 (seconds)
  return Math.floor(Math.random() * 31) + 30;
};

export const sleep = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const generateRandomProject = (
  prompt: ProjectProps["prompt"],
  style: ProjectProps["style"]
): ProjectProps => {
  return {
    id: generateRandomId(),
    prompt,
    style,
    eta: generateRandomEta(),
    createdAt: new Date(),
    updatedAt: new Date(),
  };
};

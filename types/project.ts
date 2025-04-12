export interface ProjectProps {
  id: string;
  prompt: string;
  style: string | null;
  eta: number;
  createdAt: Date;
  updatedAt: Date;
}

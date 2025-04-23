
import { Card } from "../ui/card";
import { type Project } from "@/data/projectsData";
import { Images } from "lucide-react";

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

const ProjectCard = ({ project, onClick }: ProjectCardProps) => {
  return (
    <Card 
      className="aspect-square flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors duration-300 border-2 border-kitchen-DEFAULT"
      onClick={onClick}
    >
      <Images className="w-12 h-12 text-kitchen-DEFAULT" />
    </Card>
  );
};

export default ProjectCard;

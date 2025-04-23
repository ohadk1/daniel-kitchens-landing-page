
import { Card } from "../ui/card";
import { type Project } from "@/data/projectsData";

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

const ProjectCard = ({ project, onClick }: ProjectCardProps) => {
  return (
    <Card 
      className="aspect-square overflow-hidden cursor-pointer hover:scale-105 transition-all duration-300 border-2 border-kitchen-DEFAULT"
      onClick={onClick}
    >
      <img 
        src={project.coverImage} 
        alt={project.images[0].alt}
        className="w-full h-full object-cover"
      />
    </Card>
  );
};

export default ProjectCard;

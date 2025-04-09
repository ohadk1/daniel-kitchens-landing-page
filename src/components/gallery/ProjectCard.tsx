
import { Card } from "../ui/card";
import { type Project } from "@/data/projectsData";

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

const ProjectCard = ({ project, onClick }: ProjectCardProps) => {
  return (
    <Card 
      className="overflow-hidden group cursor-pointer hover:shadow-xl transition-all duration-300"
      onClick={onClick}
    >
      <div className="relative h-64 overflow-hidden">
        <img 
          src={project.coverImage} 
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-90">
          <div className="absolute bottom-0 w-full p-4 text-white">
            <h3 className="text-2xl font-bold">{project.title}</h3>
            <p className="text-sm text-white/80">{project.description}</p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ProjectCard;

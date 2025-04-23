
import { type Project } from "@/data/projectsData";
import ProjectCard from "./ProjectCard";

interface ProjectsGridProps {
  projects: Project[];
  onProjectClick: (project: Project) => void;
  className?: string;
}

const ProjectsGrid = ({ projects, onProjectClick, className = "" }: ProjectsGridProps) => {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 ${className}`}>
      {projects.map((project) => (
        <ProjectCard 
          key={project.id} 
          project={project} 
          onClick={() => onProjectClick(project)} 
        />
      ))}
    </div>
  );
};

export default ProjectsGrid;


import { useState } from 'react';
import { kitchenProjects, type Project } from '../data/projectsData';
import ProjectsGrid from './gallery/ProjectsGrid';
import ProjectLightbox from './gallery/ProjectLightbox';

const ProjectGallery = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
  const openProject = (project: Project) => {
    setSelectedProject(project);
    document.body.style.overflow = 'hidden';
  };
  
  const closeProject = () => {
    setSelectedProject(null);
    document.body.style.overflow = 'auto';
  };
  
  const firstRowProjects = kitchenProjects.slice(0, 4);
  const secondRowProjects = kitchenProjects.slice(4, 8);
  
  return (
    <section id="gallery" className="py-20 bg-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center text-kitchen-DEFAULT mb-12">הגלריה שלנו</h2>
        <p className="text-xl text-center text-gray-700 max-w-3xl mx-auto mb-12">
          מבחר מהמטבחים שעיצבנו וייצרנו עבור לקוחותינו. כל מטבח מיוצר בהתאמה אישית לצרכי הלקוח ולחלל הספציפי.
        </p>
        
        {/* Projects grid - First row of four projects */}
        <ProjectsGrid projects={firstRowProjects} onProjectClick={openProject} className="mb-8" />
        
        {/* Projects grid - Second row of four projects */}
        <ProjectsGrid projects={secondRowProjects} onProjectClick={openProject} />
      </div>

      {/* Project Lightbox */}
      {selectedProject && <ProjectLightbox project={selectedProject} onClose={closeProject} />}
    </section>
  );
};

export default ProjectGallery;

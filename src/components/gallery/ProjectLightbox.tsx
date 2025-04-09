import { useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { type Project } from "@/data/projectsData";
interface ProjectLightboxProps {
  project: Project;
  onClose: () => void;
}
const ProjectLightbox = ({
  project,
  onClose
}: ProjectLightboxProps) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const goToNext = () => {
    setSelectedImageIndex(prevIndex => (prevIndex + 1) % project.images.length);
  };
  const goToPrev = () => {
    setSelectedImageIndex(prevIndex => (prevIndex - 1 + project.images.length) % project.images.length);
  };
  return <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
      <button onClick={onClose} className="absolute top-4 right-4 text-white hover:text-kitchen-accent" aria-label="סגור">
        <X size={32} />
      </button>
      
      <button onClick={goToPrev} className="absolute left-4 text-white hover:text-kitchen-accent" aria-label="תמונה קודמת">
        <ChevronLeft size={40} />
      </button>
      
      <div className="max-w-4xl max-h-[80vh]">
        <img src={project.images[selectedImageIndex].url} alt={project.images[selectedImageIndex].alt} className="max-w-full max-h-[90vh] object-cover" />
        <div className="text-white text-center mt-4">
          <h3 className="text-xl font-semibold">{project.title}</h3>
          <p className="mt-2">{project.description}</p>
        </div>
      </div>
      
      <button onClick={goToNext} className="absolute right-4 text-white hover:text-kitchen-accent" aria-label="תמונה הבאה">
        <ChevronRight size={40} />
      </button>
      
      {/* Image thumbnails/navigation */}
      {project.images.length > 1 && <div className="absolute bottom-8 left-0 right-0">
          <div className="flex justify-center gap-2">
            {project.images.map((image, index) => <button key={index} onClick={() => setSelectedImageIndex(index)} className={`w-16 h-12 border-2 transition-all ${index === selectedImageIndex ? 'border-white opacity-100' : 'border-transparent opacity-60 hover:opacity-100'}`}>
                <img src={image.url} alt={`תמונה ממוזערת ${index + 1}`} className="w-full h-full object-cover" />
              </button>)}
          </div>
        </div>}
    </div>;
};
export default ProjectLightbox;

import { useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';

// Define the project structure
interface Project {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  images: {
    url: string;
    alt: string;
  }[];
}

// Sample projects data
const kitchenProjects: Project[] = [
  {
    id: "project1",
    title: "מטבח מודרני",
    description: "מטבח בסגנון מודרני עם חזית לבנה וידיות נסתרות",
    coverImage: "https://i.postimg.cc/rmpLKMQF/20220922-111717-Copy.jpg",
    images: [
      {
        url: "https://i.postimg.cc/rmpLKMQF/20220922-111717-Copy.jpg",
        alt: "מטבח מודרני"
      },
      {
        url: "https://i.postimg.cc/FRnXS8Bb/20220922-111737.jpg",
        alt: "מטבח מודרני - זווית נוספת"
      },
      {
        url: "https://i.postimg.cc/0jMR0nTT/20220922-111747.jpg",
        alt: "מטבח מודרני - פרטים"
      }
    ]
  },
  {
    id: "project2",
    title: "מטבח בגוון טבעי",
    description: "עיצוב מטבח בגוונים טבעיים המשלב עץ וחומרים איכותיים",
    coverImage: "https://i.postimg.cc/FRnXS8Bb/20220922-111737.jpg",
    images: [
      {
        url: "https://i.postimg.cc/FRnXS8Bb/20220922-111737.jpg",
        alt: "מטבח בגוון טבעי"
      },
      {
        url: "https://i.postimg.cc/x1yr5cZ1/20221108-153941-01.jpg",
        alt: "מטבח בגוון טבעי - זווית נוספת"
      }
    ]
  },
  {
    id: "project3",
    title: "מטבח עם משטח עבודה",
    description: "מטבח מרווח עם משטח עבודה גדול ופתרונות אחסון",
    coverImage: "https://i.postimg.cc/0jMR0nTT/20220922-111747.jpg",
    images: [
      {
        url: "https://i.postimg.cc/0jMR0nTT/20220922-111747.jpg",
        alt: "מטבח עם משטח עבודה"
      },
      {
        url: "https://i.postimg.cc/XqRMHF3p/20220922-111754.jpg",
        alt: "מטבח עם משטח עבודה - זווית נוספת"
      }
    ]
  },
  {
    id: "project4",
    title: "מטבח בהתאמה אישית",
    description: "עיצוב מטבח מותאם אישית עם פתרונות פרקטיים",
    coverImage: "https://i.postimg.cc/XqRMHF3p/20220922-111754.jpg",
    images: [
      {
        url: "https://i.postimg.cc/XqRMHF3p/20220922-111754.jpg",
        alt: "מטבח בהתאמה אישית"
      },
      {
        url: "https://i.postimg.cc/wxZdjKJg/20220922-111801.jpg",
        alt: "מטבח בהתאמה אישית - זווית נוספת"
      }
    ]
  },
  {
    id: "project5",
    title: "מטבח מודרני עם אי",
    description: "מטבח מודרני המשלב אי מרכזי לאירוח ובישול",
    coverImage: "https://i.postimg.cc/wxZdjKJg/20220922-111801.jpg",
    images: [
      {
        url: "https://i.postimg.cc/wxZdjKJg/20220922-111801.jpg",
        alt: "מטבח מודרני עם אי"
      },
      {
        url: "https://i.postimg.cc/7YzrCBM7/20220922-111808.jpg",
        alt: "מטבח מודרני עם אי - זווית נוספת"
      }
    ]
  },
  {
    id: "project6",
    title: "מטבח עם מקרר משולב",
    description: "עיצוב הכולל מקרר משולב ביחידות האחסון",
    coverImage: "https://i.postimg.cc/7YzrCBM7/20220922-111808.jpg",
    images: [
      {
        url: "https://i.postimg.cc/7YzrCBM7/20220922-111808.jpg",
        alt: "מטבח עם מקרר משולב"
      },
      {
        url: "https://i.postimg.cc/x1yr5cZ1/20221108-153941-01.jpg",
        alt: "מטבח עם מקרר משולב - זווית נוספת"
      }
    ]
  }
];

const ProjectGallery = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);

  const openProject = (project: Project) => {
    setSelectedProject(project);
    setSelectedImageIndex(0);
    document.body.style.overflow = 'hidden';
  };

  const closeProject = () => {
    setSelectedProject(null);
    document.body.style.overflow = 'auto';
  };

  const goToNext = () => {
    if (selectedProject) {
      setSelectedImageIndex((prevIndex) => 
        (prevIndex + 1) % selectedProject.images.length
      );
    }
  };

  const goToPrev = () => {
    if (selectedProject) {
      setSelectedImageIndex((prevIndex) => 
        (prevIndex - 1 + selectedProject.images.length) % selectedProject.images.length
      );
    }
  };

  return (
    <section id="gallery" className="py-20 bg-[#ccc4b4] bg-opacity-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center text-kitchen-DEFAULT mb-12">הגלריה שלנו</h2>
        <p className="text-xl text-center text-gray-700 max-w-3xl mx-auto mb-12">
          מבחר מהמטבחים שעיצבנו וייצרנו עבור לקוחותינו. כל מטבח מיוצר בהתאמה אישית לצרכי הלקוח ולחלל הספציפי.
        </p>
        
        {/* Projects grid - Two rows of three projects each */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {kitchenProjects.slice(0, 3).map((project) => (
            <Card 
              key={project.id} 
              className="overflow-hidden group cursor-pointer hover:shadow-xl transition-all duration-300"
              onClick={() => openProject(project)}
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
          ))}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {kitchenProjects.slice(3, 6).map((project) => (
            <Card 
              key={project.id} 
              className="overflow-hidden group cursor-pointer hover:shadow-xl transition-all duration-300"
              onClick={() => openProject(project)}
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
          ))}
        </div>
      </div>

      {/* Project Lightbox */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
          <button 
            onClick={closeProject} 
            className="absolute top-4 right-4 text-white hover:text-kitchen-accent" 
            aria-label="סגור"
          >
            <X size={32} />
          </button>
          
          <button 
            onClick={goToPrev} 
            className="absolute left-4 text-white hover:text-kitchen-accent" 
            aria-label="תמונה קודמת"
          >
            <ChevronLeft size={40} />
          </button>
          
          <div className="max-w-4xl max-h-[80vh]">
            <img 
              src={selectedProject.images[selectedImageIndex].url} 
              alt={selectedProject.images[selectedImageIndex].alt} 
              className="max-w-full max-h-[80vh] object-contain" 
            />
            <div className="text-white text-center mt-4">
              <h3 className="text-xl font-semibold">{selectedProject.title}</h3>
              <p className="mt-2">{selectedProject.description}</p>
            </div>
          </div>
          
          <button 
            onClick={goToNext} 
            className="absolute right-4 text-white hover:text-kitchen-accent" 
            aria-label="תמונה הבאה"
          >
            <ChevronRight size={40} />
          </button>
          
          {/* Image thumbnails/navigation */}
          {selectedProject.images.length > 1 && (
            <div className="absolute bottom-8 left-0 right-0">
              <div className="flex justify-center gap-2">
                {selectedProject.images.map((image, index) => (
                  <button 
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`w-16 h-12 border-2 transition-all ${index === selectedImageIndex ? 'border-white opacity-100' : 'border-transparent opacity-60 hover:opacity-100'}`}
                  >
                    <img 
                      src={image.url} 
                      alt={`תמונה ממוזערת ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default ProjectGallery;

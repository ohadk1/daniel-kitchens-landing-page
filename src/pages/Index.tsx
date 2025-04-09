
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import ProjectGallery from "../components/ProjectGallery";
import About from "../components/About";
import Services from "../components/Services";
import Testimonials from "../components/Testimonials";
import CallToAction from "../components/CallToAction";
import Footer from "../components/Footer";
import FloatingButton from "../components/FloatingButton";
import AccessibilityWidget from "../components/AccessibilityWidget";

const Index = () => {
  return (
    <div className="min-h-screen bg-kitchen-light">
      <a href="#main-content" className="skip-to-content">
        דלג לתוכן העיקרי
      </a>
      <Navbar />
      <main id="main-content">
        <Hero />
        <ProjectGallery />
        <About />
        <Services />
        <Testimonials />
        <CallToAction />
      </main>
      <Footer />
      <FloatingButton />
      <AccessibilityWidget />
    </div>
  );
};

export default Index;

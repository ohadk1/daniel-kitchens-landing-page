import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Gallery from "../components/Gallery";
import About from "../components/About";
import Services from "../components/Services";
import Testimonials from "../components/Testimonials";
import CallToAction from "../components/CallToAction";
import Footer from "../components/Footer";
import FloatingButton from "../components/FloatingButton";
const Index = () => {
  return <div className="min-h-screen bg-kitchen-light my-0">
      <Navbar />
      <Hero />
      <Gallery />
      <About />
      <Services />
      <Testimonials />
      <CallToAction />
      <Footer />
      <FloatingButton />
    </div>;
};
export default Index;
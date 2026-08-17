import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import StatsStrip from '@/components/StatsStrip';
import ProjectGallery from '@/components/gallery/ProjectGallery';
import ProcessTimeline from '@/components/ProcessTimeline';
import About from '@/components/About';
import Services from '@/components/Services';
import Testimonials from '@/components/Testimonials';
import CallToAction from '@/components/CallToAction';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import AccessibilityWidget from '@/components/AccessibilityWidget';
import SmoothScroll from '@/components/SmoothScroll';

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:start-4 focus:z-[100] focus:rounded-lg focus:bg-kitchen-wood focus:px-5 focus:py-3 focus:text-white"
      >
        דלג לתוכן העיקרי
      </a>

      <Navbar />

      <main id="main-content">
        <Hero />
        <StatsStrip />
        <ProjectGallery />
        <ProcessTimeline />
        <About />
        <Services />
        <Testimonials />
        <CallToAction />
      </main>

      <Footer />
      <WhatsAppButton />
      <AccessibilityWidget />
    </>
  );
}

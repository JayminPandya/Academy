import Hero from "@/components/Hero";
import Testimonials from "@/components/Testimonials";
import Pricing from "@/components/Pricing/Pricing";
import FAQ from "@/components/FAQ";
import Logos from "@/components/Logos";
import Benefits from "@/components/Benefits/Benefits";
import Container from "@/components/Container";
import Section from "@/components/Section";
import Stats from "@/components/Stats";
import CTA from "@/components/CTA";
import CoachSection from "@/components/CoachSection";
import TournamentModal from "@/components/Banner/TournamentBanner";

const HomePage: React.FC = () => {
  return (
    <>
      <Hero />
      <Container>
        <Stats />
        <Benefits />
        <CoachSection />
        <Testimonials />
        <Pricing />
        <CTA />
        <FAQ />
      </Container>
      <Logos />
    </>
  );
};

export default HomePage;

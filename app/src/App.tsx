import Navigation from './components/Navigation';
import Hero from './sections/Hero';
import About from './sections/About';
import Portfolio from './sections/Portfolio';
import Team from './sections/Team';
import Contact from './sections/Contact';
import Footer from './sections/Footer';

function App() {
  return (
    <div className="relative min-h-screen bg-black text-white overflow-x-hidden">
      {/* Animated Background Orbs */}
      <div className="vortex-bg">
        <div className="vortex-orb vortex-orb-1" />
        <div className="vortex-orb vortex-orb-2" />
        <div className="vortex-orb vortex-orb-3" />
      </div>

      {/* Film Grain Overlay */}
      <div className="film-grain" />

      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <main className="relative z-10">
        <Hero />
        <About />
        <Portfolio />
        <Team />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;

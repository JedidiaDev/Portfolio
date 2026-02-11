import { CustomCursor } from './components/CustomCursor';
import { MatrixRain } from './components/MatrixRain';
import { Header } from './components/header';
import { Footer } from './components/footer';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Projects } from './pages/Projects';
import { Contact } from './pages/Contact';
import { CVModalProvider, useCVModalContext } from './contexts/CVModalContext';
import { CVPreviewModal } from './components/CVPreviewModal';
import './App.css';

function AppContent() {
  const { isOpen, close } = useCVModalContext();

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-x-hidden">
      {/* Matrix rain background effect */}
      <MatrixRain />
      
      {/* Custom cursor */}
      <CustomCursor />
      
      {/* Navigation header */}
      <Header />
      
      {/* Main content */}
      <main className="relative z-10">
        <Home />
        <About />
        <Projects />
        <Contact />
      </main>
      
      {/* Footer */}
      <Footer />

      {/* CV Preview Modal */}
      <CVPreviewModal isOpen={isOpen} onClose={close} />
    </div>
  );
}

function App() {
  return (
    <CVModalProvider>
      <AppContent />
    </CVModalProvider>
  );
}

export default App;


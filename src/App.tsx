import { CustomCursor } from './components/CustomCursor';
import { MatrixRain } from './components/MatrixRain';
import { Header } from './components/header';
import { Footer } from './components/footer';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Projects } from './pages/Projects';
import { Contact } from './pages/Contact';
import './App.css';

function App() {
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
    </div>
  );
}

export default App;


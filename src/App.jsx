import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import CustomCursor from './components/CustomCursor'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Loader from './components/Loader'
import SmoothScroll from './components/SmoothScroll'

function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <CustomCursor />
      <AnimatePresence mode="wait">
        {loading ? (
          <Loader key="loader" />
        ) : (
          <SmoothScroll key="main">
            <Navbar />
            <main>
              <Hero />
              <About />
              <Projects />
              <Skills />
              <Contact />
            </main>
            <Footer />
          </SmoothScroll>
        )}
      </AnimatePresence>
    </>
  )
}

export default App

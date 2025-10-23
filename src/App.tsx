import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ThemeController } from './components/ThemeController';
import { EasterEggSplit } from './components/EasterEggSplit';
import { Home } from './pages/Home';
import { Now } from './pages/Now';

function App() {
  const [easterEggActive, setEasterEggActive] = useState(false);

  return (
    <Router basename="/nathangwang.github.io">
      <ThemeController />
      <div className="relative">
        <Header onLogoTripleClick={() => setEasterEggActive(!easterEggActive)} />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/now" element={<Now />} />
        </Routes>

        <Footer />

        <EasterEggSplit
          isActive={easterEggActive}
          onClose={() => setEasterEggActive(false)}
        />
      </div>
    </Router>
  );
}

export default App;

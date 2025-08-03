import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Componentes y Páginas
import Home from './pages/Home';
import ReservasPage from './pages/Reservas';
import PaginaLegal from './pages/PaginaLegal'; // <-- Importa el nuevo componente
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Carta from './pages/Carta';
import Cocteleria from './pages/Cocteleria';
import Contacto from './pages/Contacto';

function App() {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Navbar />
        <main className="flex-shrink-0">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/carta" element={<Carta />} />
            <Route path="/cocteleria" element={<Cocteleria />} />
            <Route path="/reservas" element={<ReservasPage />} />
            <Route path="/contacto" element={<Contacto />} />
            {/* Esta ruta dinámica debe ir después de las específicas */}
            <Route path="/:slug" element={<PaginaLegal />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

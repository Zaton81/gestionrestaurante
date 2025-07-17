import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => (
  <div>
    <h1>Bienvenido al Restaurante</h1>
    <nav>
      <ul>
        <li><Link to="/carta">Carta</Link></li>
        <li><Link to="/cocteleria">Coctelería</Link></li>
        <li><Link to="/reservas">Reservas</Link></li>
        <li><Link to="/contacto">Contacto</Link></li>
      </ul>
    </nav>
  </div>
);

export default Home; 
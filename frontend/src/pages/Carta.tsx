import React, { useState, useEffect } from 'react';
import {CARTA_TITULO} from "../config/constants"

// Interfaces para la estructura de la carta desde la nueva API
interface Alergeno {
  id: number;
  nombre: string;
  icono: string | null;
}

// Interfaces para la estructura de la carta
interface Plato {
  id: number;
  nombre: string;
  descripcion: string;
  precio: string; 
  alergenos: Alergeno[];
  imagen: string | null;
}

interface Categoria {
  id: number;
  nombre: string;
  descripcion: string;
  platos: Plato[];
}

const Carta: React.FC = () => {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('http://localhost:8000/api/carta/categorias/')
      .then(response => {
        if (!response.ok) {
          throw new Error('La respuesta de la red no fue correcta');
        }
        return response.json();
      })
      .then(data => {
        setCategorias(data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error al cargar la carta:", error);
        setError('No se pudo cargar la carta. Por favor, inténtelo de nuevo más tarde.');
        setLoading(false);
      });
  }, []); // El array vacío asegura que se ejecute solo una vez

  if (loading) {
    return <div className="container my-5 text-center">Cargando la carta...</div>;
  }

  if (error) {
    return <div className="container my-5 alert alert-danger">{error}</div>;
  }

  return (
    <>
    <div className="container mt-5 pt-5">
      <h2 className="text-center mb-5 text-white">{CARTA_TITULO}</h2>
      
      {categorias.map(categoria => (
        <div key={categoria.id} className="card bg-dark bg-opacity-75 text-white mb-5">
          <div className="card-body p-4">
            <h3 className="card-title border-bottom pb-2 mb-4">{categoria.nombre}</h3>
            {categoria.descripcion && (
              <div className="mb-4" dangerouslySetInnerHTML={{ __html: categoria.descripcion }}></div>
            )}

            {categoria.platos.map(plato => (
              <div key={plato.id} className="d-flex justify-content-between align-items-start mb-4 border-bottom pb-3">
                <div className="d-flex align-items-start">
                  {plato.imagen && (
                    <img 
                      src={plato.imagen} 
                      alt={plato.nombre} 
                      className="me-3" 
                      style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '8px' }} 
                    />
                  )}
                  <div>
                    <h5 className="mb-1 text-primary">{plato.nombre}</h5>
                    <div className="mb-2 text-warning" dangerouslySetInnerHTML={{ __html: plato.descripcion }}></div>
                    {plato.alergenos.length > 0 && (
                      <div className="d-flex align-items-center mt-2">
                        {plato.alergenos.map(alergeno => (
                          <img 
                            key={alergeno.id} 
                            src={alergeno.icono || '/placeholder-icon.png'}
                            alt={alergeno.nombre}
                            title={alergeno.nombre}
                            style={{ width: '24px', height: '24px', marginRight: '8px' }}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <h5 className="text-light ms-4" style={{ whiteSpace: 'nowrap' }}>{plato.precio}€</h5>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
    </>
  );
};

export default Carta;
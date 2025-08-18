import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

// Interfaz para los datos de la página que vienen de la API
interface PaginaData {
  slug: string;
  titulo: string;
  contenido: string;
  fecha_modificacion: string;
}

const PaginaLegal: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [pagina, setPagina] = useState<PaginaData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;

    setLoading(true);
    setError(null);

    fetch(`http://localhost:8000/api/pages/${slug}/`)
      .then(response => {
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Página no encontrada.');
          }
          throw new Error('No se pudo cargar el contenido de la página.');
        }
        return response.json();
      })
      .then(data => {
        setPagina(data);
      })
      .catch(err => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return <div className="container my-5 text-center"><h1>Cargando...</h1></div>;
  }

  if (loading) {
    return <div className="container my-5 text-center">Cargando contenido legal...</div>;
  }

  if (error) {
    return <div className="container my-5 alert alert-danger">{error}</div>;
  }

  if (!pagina) {
    return null;
  }


  return (
    <div className="container mt-5 pt-5">
      <div className="card bg-dark bg-opacity-75 text-white">
        <div className="card-body p-4">
          <h2 className="card-title text-center mb-4 text-primary">{pagina.titulo}</h2>
          <div className="card-text" dangerouslySetInnerHTML={{ __html: pagina.contenido }} />
          <div className="text-end mt-4">
            <small>
              Última modificación: {new Date(pagina.fecha_modificacion).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' })}
            </small>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaginaLegal;
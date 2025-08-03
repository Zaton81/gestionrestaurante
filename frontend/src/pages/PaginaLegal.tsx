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

  if (error) {
    return <div className="container my-5 alert alert-danger">{error}</div>;
  }

  if (!pagina) {
    return <div className="container my-5"><h1>Página no encontrada</h1></div>;
  }

  return (
    <div className="container my-5">
      <title>{`${pagina.titulo} - Tu Restaurante`}</title>
      <h1 className="mb-4">{pagina.titulo}</h1>
      <div dangerouslySetInnerHTML={{ __html: pagina.contenido }} />
      <p className="text-muted mt-5"><small>Última actualización: {new Date(pagina.fecha_modificacion).toLocaleDateString('es-ES')}</small></p>
    </div>
  );
};

export default PaginaLegal;
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { RESTAURANT_NAME, RESTAURANT_SLOGAN } from "../config/constants";

interface Pagina {
  slug: string;
  titulo: string;
}

interface SocialLink {
  tipo: string;
  url: string;
  icono?: string;
  nombre: string;
}

const Footer: React.FC = () => {
  const [paginas, setPaginas] = useState<Pagina[]>([]);
  const [sociales, setSociales] = useState<SocialLink[]>([]);

  useEffect(() => {
    // Cargar páginas legales
    fetch("http://localhost:8000/api/pages/")
      .then((res) => res.json())
      .then((data) => setPaginas(data))
      .catch(() => setPaginas([]));
    // Cargar enlaces sociales
    fetch("http://localhost:8000/api/social/")
      .then((res) => res.json())
      .then((data) => setSociales(data))
      .catch(() => setSociales([]));
  }, []);

  return (
    <footer className="bg-dark text-light mt-5 py-4">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-6 mb-3 mb-md-0">
            <ul className="list-inline mb-2">
              {paginas.map((pagina) => (
                <li className="list-inline-item me-3" key={pagina.slug}>
                  <Link className="text-light text-decoration-none" to={`/${pagina.slug}`}>{pagina.titulo}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-md-6 text-md-end">
            {sociales.map((social) => {
              const isEmail = social.url.includes("@") && !social.url.startsWith("http");
              const href = isEmail ? `mailto:${social.url}` : social.url;
              return (
                <a
                  key={social.tipo + social.nombre}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-light ms-3 fs-4"
                  title={social.nombre}
                >
                  {social.icono ? (
                    <i className={social.icono}></i>
                  ) : (
                    <span>{social.nombre}</span>
                  )}
                </a>
              );
            })}
          </div>
        </div>
        <div className="text-center mt-3">
          <small>&copy; {new Date().getFullYear()} {RESTAURANT_NAME}. Todos los derechos reservados.</small>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

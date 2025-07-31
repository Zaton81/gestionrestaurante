import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RESTAURANT_SLOGAN} from "../config/constants";

// Interfaz para los avisos que ya tenías
interface Aviso {
  id: number;
  titulo: string;
  contenido: string;
}

// Nueva interfaz para los horarios que vienen de la API
interface HorarioAPI {
  id: number;
  dia_semana_display: string;
  hora_apertura: string;
  hora_cierre: string;
  cerrado: boolean;
}

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [avisos, setAvisos] = useState<Aviso[]>([]);
  // Nuevo estado para almacenar los horarios de la API
  const [horarios, setHorarios] = useState<HorarioAPI[]>([]);

  useEffect(() => {
    // Cargar avisos 
    fetch("http://localhost:8000/api/avisos/")
      .then((res) => res.json())
      .then((data) => setAvisos(data))
      .catch(() => setAvisos([]));

    // Nueva llamada para cargar los horarios
    fetch("http://localhost:8000/api/horarios/")
      .then((res) => res.json())
      .then((data) => setHorarios(data))
      .catch(() => {
        console.error("Error al cargar los horarios desde la API.");
        setHorarios([]); // En caso de error, dejamos la lista vacía
      });
  }, []); // El array vacío asegura que esto se ejecute solo una vez

  // Función para formatear la hora (de "HH:MM:SS" a "HH:MM")
  const formatTime = (time: string) => time.substring(0, 5);

  return (
    <div className="container my-5">
      <div className="row align-items-center">
        {/* Columna Izquierda: Imagen y lema */}
        <div className="col-md-6 text-center mb-4 mb-md-0">
          <img
            src="/logo.png"
            alt="Logo Restaurante"
            style={{ maxWidth: "70%", height: "auto" }}
          />
          <h3 className="mt-4">{RESTAURANT_SLOGAN}</h3>
        </div>
        {/* Columna Derecha: Horarios y botón */}
        <div className="col-md-6 text-center text-md-start">
          <h4 className="mb-3">Horarios</h4>
          <ul className="list-unstyled mb-4">
            {/* Mapeamos los horarios obtenidos de la API */}
            {horarios.map((h) => (
              <li key={h.id}>
                <strong>{h.dia_semana_display}:</strong>{" "}
                {h.cerrado ? (
                  "Cerrado"
                ) : (
                  `${formatTime(h.hora_apertura)} - ${formatTime(h.hora_cierre)}`
                )}
              </li>
            ))}
          </ul>
          <button
            className="btn btn-danger btn-lg"
            onClick={() => navigate("/reservas")}
          >
            ¡Reserva tu mesa aquí!
          </button>
        </div>
      </div>
      {/* Avisos dinámicos (sin cambios) */}
      {avisos.length > 0 && (
        <div className="mt-5">
          {avisos.map((aviso) => (
            <div
              key={aviso.id}
              className="alert alert-warning"
              dangerouslySetInnerHTML={{ __html: aviso.contenido }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;

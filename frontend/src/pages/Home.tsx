import React from "react";
import { useNavigate } from "react-router-dom";

const horarios = [
  { dia: "Lunes a Viernes", horas: "13:00 - 16:00 / 20:00 - 23:30" },
  { dia: "Sábado", horas: "13:00 - 16:30 / 20:00 - 00:00" },
  { dia: "Domingo", horas: "13:00 - 16:30" },
];

const Home: React.FC = () => {
  const navigate = useNavigate();

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
          <h3 className="mt-4">"El sabor que te hará volver"</h3>
        </div>
        {/* Columna Derecha: Horarios y botón */}
        <div className="col-md-6 text-center text-md-start">
          <h4 className="mb-3">Horarios</h4>
          <ul className="list-unstyled mb-4">
            {horarios.map((h) => (
              <li key={h.dia}>
                <strong>{h.dia}:</strong> {h.horas}
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
    </div>
  );
};

export default Home; 
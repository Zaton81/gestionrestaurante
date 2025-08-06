import React, { useState } from 'react';
import InputField from "../components/InputField";
import TextAreaField from "../components/TextAreaField";
import StatusAlert from "../components/StatusAlert";
import SubmitButton from "../components/SubmitButton";
import { consultarDisponibilidad, crearReserva } from "../services/api";

interface ReservasFormData {
  fecha: string;
  numero_personas: number;
  hora: string;
  nombre_cliente: string;
  email_cliente: string;
  telefono_cliente: string;
  notas: string;
}

const Reservas: React.FC = () => {
  // Estado para gestionar los pasos del formulario y los datos
  const [step, setStep] = useState(1); // 1: Consultar, 2: Rellenar datos, 3: Confirmación
  const [formData, setFormData] = useState<ReservasFormData>({
    fecha: new Date().toISOString().split('T')[0], // Por defecto, hoy
    numero_personas: 2,
    hora: '',
    nombre_cliente: '',
    email_cliente: '',
    telefono_cliente: '',
    notas: '',
  });
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  const [isChecking, setIsChecking] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState({ message: '', type: '' }); // 'success' o 'error'
  const [fieldErrors, setFieldErrors] = useState<Partial<ReservasFormData>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAvailabilityCheck = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsChecking(true);
    setStatus({ message: '', type: '' });
    setAvailableTimes([]);
    try {
      const response = await consultarDisponibilidad(formData.fecha, formData.numero_personas);
      if (response.data.horas_disponibles.length > 0) {
        setAvailableTimes(response.data.horas_disponibles);
        setStep(2);
      } else {
        setStatus({ message: 'No hay horas disponibles para la fecha y el número de personas seleccionados. Por favor, intente con otra fecha.', type: 'error' });
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || 'Error al consultar la disponibilidad. Inténtelo de nuevo.';
      setStatus({ message: errorMessage, type: 'error' });
    } finally {
      setIsChecking(false);
    }
  };

  const validate = (): boolean => {
    const errors: Partial<ReservasFormData> = {};
    if (!formData.nombre_cliente.trim()) errors.nombre_cliente = "El nombre es obligatorio.";
    if (!formData.email_cliente.trim()) errors.email_cliente = "El email es obligatorio.";
    else if (!/^[^@]+@[^@]+\.[^@]+$/.test(formData.email_cliente)) errors.email_cliente = "El email no es válido.";
    if (!formData.telefono_cliente.trim()) errors.telefono_cliente = "El teléfono es obligatorio.";
    else if (!/^[0-9\s+\-()]{7,}$/.test(formData.telefono_cliente)) errors.telefono_cliente = "El teléfono no es válido.";
    if (!formData.hora) errors.hora = "Debe seleccionar una hora para la reserva.";
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleReservationSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    setStatus({ message: '', type: '' });
    try {
      await crearReserva(formData);
      setStep(3); // Ir al paso de confirmación
      setFieldErrors({});
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || 'No se pudo crear la reserva. Por favor, inténtelo de nuevo.';
      setStatus({ message: errorMessage, type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setStep(1);
    setFormData({
      fecha: new Date().toISOString().split('T')[0],
      numero_personas: 2,
      hora: '',
      nombre_cliente: '',
      email_cliente: '',
      telefono_cliente: '',
      notas: '',
    });
    setAvailableTimes([]);
    setStatus({ message: '', type: '' });
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <form onSubmit={handleAvailabilityCheck}>
            <div className="row g-3">
              <div className="col-md-6">
                <InputField
                  label="Fecha"
                  name="fecha"
                  value={formData.fecha}
                  onChange={handleChange}
                  type="date"
                  min={new Date().toISOString().split('T')[0]}
                  required
                />
              </div>
              <div className="col-md-6">
                <InputField
                  label="Nº de Personas"
                  name="numero_personas"
                  value={formData.numero_personas}
                  onChange={handleChange}
                  type="number"
                  min={1}
                  max={20}
                  required
                />
              </div>
            </div>
            <SubmitButton loading={isChecking} text="Consultar Disponibilidad" loadingText="Consultando..." className="btn btn-danger mt-4 w-100" />
          </form>
        );
      case 2:
        // Filtrar horas si la fecha es hoy
        const isToday = formData.fecha === new Date().toISOString().split('T')[0];
        const now = new Date();
        const currentHour = now.getHours();
        const currentMinute = now.getMinutes();
        const filteredTimes = isToday
          ? availableTimes.filter(time => {
              const [hour, minute] = time.split(':').map(Number);
              return hour > currentHour || (hour === currentHour && minute > currentMinute);
            })
          : availableTimes;
        return (
          <form onSubmit={handleReservationSubmit}>
            <div className="mb-4 p-3 bg-light rounded">
              <p className="mb-1"><strong>Fecha:</strong> {new Date(formData.fecha).toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
              <p className="mb-0"><strong>Personas:</strong> {formData.numero_personas}</p>
            </div>
            <div className="mb-4">
              <h5 className="mb-3">Seleccione una hora</h5>
              <div className="d-flex flex-wrap gap-2">
                {filteredTimes.length > 0 ? (
                  filteredTimes.map(time => (
                    <button key={time} type="button" className={`btn ${formData.hora === time ? 'btn-danger' : 'btn-outline-danger'}`} onClick={() => setFormData(prev => ({ ...prev, hora: time }))}>
                      {time}
                    </button>
                  ))
                ) : (
                  <span className="text-muted">No hay horas disponibles para el resto del día.</span>
                )}
              </div>
            </div>
            <h5 className="mb-3">Sus datos</h5>
            <div className="row g-3">
              <div className="col-md-6">
                <InputField
                  label="Nombre"
                  name="nombre_cliente"
                  value={formData.nombre_cliente}
                  onChange={handleChange}
                  required
                />
                {fieldErrors.nombre_cliente && <div className="text-danger">{fieldErrors.nombre_cliente}</div>}
              </div>
              <div className="col-md-6">
                <InputField
                  label="Email"
                  name="email_cliente"
                  value={formData.email_cliente}
                  onChange={handleChange}
                  type="email"
                  required
                />
                {fieldErrors.email_cliente && <div className="text-danger">{fieldErrors.email_cliente}</div>}
              </div>
              <div className="col-md-6">
                <InputField
                  label="Teléfono"
                  name="telefono_cliente"
                  value={formData.telefono_cliente}
                  onChange={handleChange}
                  type="tel"
                  required
                />
                {fieldErrors.telefono_cliente && <div className="text-danger">{fieldErrors.telefono_cliente}</div>}
              </div>
              <div className="col-12">
                <TextAreaField
                  label="Notas (opcional)"
                  name="notas"
                  value={formData.notas}
                  onChange={handleChange}
                  rows={3}
                />
              </div>
              {fieldErrors.hora && <div className="text-danger mt-2">{fieldErrors.hora}</div>}
            </div>
            <div className="d-flex justify-content-between mt-4">
              <button type="button" className="btn btn-secondary" onClick={() => setStep(1)}>Volver</button>
              <SubmitButton loading={isSubmitting} text="Confirmar Reserva" loadingText="Confirmando..." />
            </div>
          </form>
        );
      case 3:
        return (
          <div className="text-center"><svg className="bi bi-check-circle-fill text-success mb-3" width="64" height="64" fill="currentColor" viewBox="0 0 16 16"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/></svg><h4 className="mb-3">¡Reserva Confirmada!</h4><p>Gracias, <strong>{formData.nombre_cliente}</strong>. Hemos recibido su solicitud de reserva.</p><p>Recibirá un correo de confirmación en breve. ¡Le esperamos!</p><button className="btn btn-danger mt-3" onClick={resetForm}>Hacer otra reserva</button></div>
        );
      default: return null;
    }
  };

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-md-8 mx-auto">
          <div className="text-center mb-5">
            <h2 className="text-white">Reservas Online</h2>
            <p className="lead text-white">Asegure su mesa en nuestro restaurante. Complete el formulario para consultar la disponibilidad y realizar su reserva.</p>
          </div>
          <div className="card shadow-sm">
            <div className="card-body p-4 p-md-5">
              {status.message && (<StatusAlert message={status.message} type={status.type as "success" | "error"} />)}
              {renderStepContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reservas;

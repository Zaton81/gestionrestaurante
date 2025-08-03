import React, { useState } from 'react';
import axios from 'axios';

const Reservas: React.FC = () => {
  // Estado para gestionar los pasos del formulario y los datos
  const [step, setStep] = useState(1); // 1: Consultar, 2: Rellenar datos, 3: Confirmación
  const [formData, setFormData] = useState({
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
      const response = await axios.get('http://localhost:8000/api/reservas/disponibilidad/', {
        params: {
          fecha: formData.fecha,
          personas: formData.numero_personas,
        },
      });
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

  const handleReservationSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.hora) {
      setStatus({ message: 'Por favor, seleccione una hora para la reserva.', type: 'error' });
      return;
    }
    setIsSubmitting(true);
    setStatus({ message: '', type: '' });

    try {
      await axios.post('http://localhost:8000/api/reservas/crear/', formData);
      setStep(3); // Ir al paso de confirmación
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
                <label htmlFor="fecha" className="form-label">Fecha</label>
                <input type="date" className="form-control" id="fecha" name="fecha" value={formData.fecha} onChange={handleChange} min={new Date().toISOString().split('T')[0]} required />
              </div>
              <div className="col-md-6">
                <label htmlFor="numero_personas" className="form-label">Nº de Personas</label>
                <input type="number" className="form-control" id="numero_personas" name="numero_personas" value={formData.numero_personas} onChange={handleChange} min="1" max="20" required />
              </div>
            </div>
            <button type="submit" className="btn btn-danger mt-4 w-100" disabled={isChecking}>
              {isChecking ? 'Consultando...' : 'Consultar Disponibilidad'}
            </button>
          </form>
        );
      case 2:
        return (
          <form onSubmit={handleReservationSubmit}>
            <div className="mb-4 p-3 bg-light rounded">
              <p className="mb-1"><strong>Fecha:</strong> {new Date(formData.fecha).toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
              <p className="mb-0"><strong>Personas:</strong> {formData.numero_personas}</p>
            </div>
            <div className="mb-4">
              <h5 className="mb-3">Seleccione una hora</h5>
              <div className="d-flex flex-wrap gap-2">
                {availableTimes.map(time => (
                  <button key={time} type="button" className={`btn ${formData.hora === time ? 'btn-danger' : 'btn-outline-danger'}`} onClick={() => setFormData(prev => ({ ...prev, hora: time }))}>
                    {time}
                  </button>
                ))}
              </div>
            </div>
            <h5 className="mb-3">Sus datos</h5>
            <div className="row g-3">
              <div className="col-md-6"><label htmlFor="nombre_cliente" className="form-label">Nombre</label><input type="text" className="form-control" id="nombre_cliente" name="nombre_cliente" value={formData.nombre_cliente} onChange={handleChange} required /></div>
              <div className="col-md-6"><label htmlFor="email_cliente" className="form-label">Email</label><input type="email" className="form-control" id="email_cliente" name="email_cliente" value={formData.email_cliente} onChange={handleChange} required /></div>
              <div className="col-md-6"><label htmlFor="telefono_cliente" className="form-label">Teléfono</label><input type="tel" className="form-control" id="telefono_cliente" name="telefono_cliente" value={formData.telefono_cliente} onChange={handleChange} required /></div>
              <div className="col-12"><label htmlFor="notas" className="form-label">Notas (opcional)</label><textarea className="form-control" id="notas" name="notas" rows={3} value={formData.notas} onChange={handleChange}></textarea></div>
            </div>
            <div className="d-flex justify-content-between mt-4">
              <button type="button" className="btn btn-secondary" onClick={() => setStep(1)}>Volver</button>
              <button type="submit" className="btn btn-danger" disabled={isSubmitting}>{isSubmitting ? 'Confirmando...' : 'Confirmar Reserva'}</button>
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
            <h2>Reservas Online</h2>
            <p className="lead">Asegure su mesa en nuestro restaurante. Complete el formulario para consultar la disponibilidad y realizar su reserva.</p>
          </div>
          <div className="card shadow-sm">
            <div className="card-body p-4 p-md-5">
              {status.message && (<div className={`alert ${status.type === 'success' ? 'alert-success' : 'alert-danger'}`}>{status.message}</div>)}
              {renderStepContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reservas;

import React, { useState } from 'react';
import { CONTACTO_TITULO, CONTACTO_DESCRIPCION, TELEFONO, EMAIL } from '../config/constants';
import axios from 'axios';

const Contacto: React.FC = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    mensaje: '',
  });

  const [status, setStatus] = useState({ message: '', type: '' }); // type: 'success' or 'error'
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ message: '', type: '' });

    try {
      const response = await axios.post('http://localhost:8000/api/contacto/', formData);
      setStatus({ message: response.data.mensaje, type: 'success' });
      setFormData({ // Reset form
        nombre: '',
        email: '',
        telefono: '',
        mensaje: '',
      });
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || 'Hubo un error al enviar el mensaje. Por favor, inténtalo de nuevo más tarde.';
      setStatus({ message: errorMessage, type: 'error' });
      console.error('Error al enviar el formulario:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container my-5">
      <div className="text-center mb-5">
        <h2>{CONTACTO_TITULO}</h2>
        <p className="lead">{CONTACTO_DESCRIPCION}</p>
      </div>

      <div className="row">
        <div className="col-md-8 mx-auto">
          <div className="card shadow-sm">
            <div className="card-body p-5">
              <div className="row">
                <div className="col-md-7">
                  <h4 className="mb-4">Envíanos un mensaje</h4>                  
                  {status.message && (
                    <div className={`alert ${status.type === 'success' ? 'alert-success' : 'alert-danger'}`}>{status.message}</div>
                  )}
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label htmlFor="nombre" className="form-label">Nombre</label>
                      <input
                        type="text"
                        className="form-control"
                        id="nombre"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="telefono" className="form-label">Teléfono (Opcional)</label>
                      <input
                        type="tel"
                        className="form-control"
                        id="telefono"
                        name="telefono"
                        value={formData.telefono}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="mensaje" className="form-label">Mensaje</label>
                      <textarea
                        className="form-control"
                        id="mensaje"
                        name="mensaje"
                        rows={5}
                        value={formData.mensaje}
                        onChange={handleChange}
                        required
                      ></textarea>
                    </div>
                    <button type="submit" className="btn btn-danger" disabled={isSubmitting}>
                      {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
                    </button>
                  </form>
                </div>
                <div className="col-md-5" style={{ borderLeft: '1px solid #eee', paddingLeft: '2rem' }}>
                  <h4 className="mb-4">Información de Contacto</h4>
                  <p>
                    <strong>Teléfono:</strong><br />
                    <a href={`tel:${TELEFONO}`}>{TELEFONO}</a>
                  </p>
                  <p>
                    <strong>Email:</strong><br />
                    <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
                  </p>
                  <p>
                    Si prefieres, no dudes en llamarnos directamente o enviarnos un correo electrónico.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contacto;
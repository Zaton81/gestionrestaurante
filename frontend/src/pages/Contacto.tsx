import React, { useState } from 'react';
import { CONTACTO_TITULO, CONTACTO_DESCRIPCION, TELEFONO, EMAIL } from '../config/constants';
import InputField from "../components/InputField";
import TextAreaField from "../components/TextAreaField";
import StatusAlert from "../components/StatusAlert";
import SubmitButton from "../components/SubmitButton";
import { enviarContacto } from "../services/api";
import './Contacto.css';

interface ContactoFormData {
  nombre: string;
  email: string;
  telefono: string;
  mensaje: string;
}

const Contacto: React.FC = () => {
  const [formData, setFormData] = useState<ContactoFormData>({
    nombre: '',
    email: '',
    telefono: '',
    mensaje: '',
  });

  const [status, setStatus] = useState({ message: '', type: '' }); // type: 'success' or 'error'
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Partial<ContactoFormData>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validate = (): boolean => {
    const errors: Partial<ContactoFormData> = {};
    if (!formData.nombre.trim()) errors.nombre = "El nombre es obligatorio.";
    if (!formData.email.trim()) errors.email = "El email es obligatorio.";
    else if (!/^[^@]+@[^@]+\.[^@]+$/.test(formData.email)) errors.email = "El email no es válido.";
    if (formData.telefono && !/^[0-9\s+\-()]{7,}$/.test(formData.telefono)) errors.telefono = "El teléfono no es válido.";
    if (!formData.mensaje.trim()) errors.mensaje = "El mensaje es obligatorio.";
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    setStatus({ message: '', type: '' });
    try {
      const response = await enviarContacto(formData);
      setStatus({ message: response.data.mensaje, type: 'success' });
      setFormData({ nombre: '', email: '', telefono: '', mensaje: '' });
      setFieldErrors({});
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
        <h2 className="text-white">{CONTACTO_TITULO}</h2>
        <p className="lead text-white">{CONTACTO_DESCRIPCION}</p>
      </div>

      <div className="row">
        <div className="col-md-8 mx-auto">
          <div className="card shadow-sm" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <div className="card-body p-5">
              <div className="row">
                <div className="col-md-7">
                  <h4 className="mb-4 text-white">Envíanos un mensaje</h4>                  
                  <StatusAlert message={status.message} type={status.type as "success" | "error"} aria-live="polite" />
                  <form onSubmit={handleSubmit} aria-label="Formulario de contacto">
                    <InputField
                      label="Nombre"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleChange}
                      required
                      inputClassName="form-control-dark"
                    />
                    {fieldErrors.nombre && <div className="text-danger">{fieldErrors.nombre}</div>}
                    <InputField
                      label="Email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      type="email"
                      required
                      inputClassName="form-control-dark"
                    />
                    {fieldErrors.email && <div className="text-danger">{fieldErrors.email}</div>}
                    <InputField
                      label="Teléfono (Opcional)"
                      name="telefono"
                      value={formData.telefono}
                      onChange={handleChange}
                      type="tel"
                      inputClassName="form-control-dark"
                    />
                    {fieldErrors.telefono && <div className="text-danger">{fieldErrors.telefono}</div>}
                    <TextAreaField
                      label="Mensaje"
                      name="mensaje"
                      value={formData.mensaje}
                      onChange={handleChange}
                      required
                      rows={5}
                      textAreaClassName="form-control-dark"
                    />
                    {fieldErrors.mensaje && <div className="text-danger">{fieldErrors.mensaje}</div>}
                    <SubmitButton loading={isSubmitting} text="Enviar Mensaje" loadingText="Enviando..." />
                  </form>
                </div>
                <div className="col-md-5" style={{ borderLeft: '1px solid #eee', paddingLeft: '2rem' }}>
                  <h4 className="mb-4 text-white">Información de Contacto</h4>
                  <p className="text-white">
                    <strong>Teléfono:</strong><br />
                    <a href={`tel:${TELEFONO}`}>{TELEFONO}</a>
                  </p>
                  <p className="text-white">
                    <strong>Email:</strong><br />
                    <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
                  </p>
                  <p className="text-white">
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
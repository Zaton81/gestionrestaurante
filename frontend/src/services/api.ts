import axios from "axios";

const API_BASE = "http://localhost:8000/api";

// Contacto
export const enviarContacto = (data: any) =>
  axios.post(`${API_BASE}/contacto/`, data);

// Reservas
export const consultarDisponibilidad = (fecha: string, personas: number) =>
  axios.get(`${API_BASE}/reservas/disponibilidad/`, {
    params: { fecha, personas }
  });

export const crearReserva = (data: any) =>
  axios.post(`${API_BASE}/reservas/crear/`, data);

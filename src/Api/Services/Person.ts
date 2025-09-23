/**
 * Servicio para operaciones relacionadas con la entidad Persona.
 * Incluye registro de aprendiz, obtención y actualización de datos de persona.
 */
import {  RegisterResponse } from "../types/entities/user.types";
import { ENDPOINTS } from "../config/ConfigApi";
import { Person, RegisterPayload } from "../types/entities/person.types";

/**
 * Actualiza la imagen de perfil de una persona.
 * @param id - ID de la persona a actualizar
 * @param imageFile - Archivo de imagen (File)
 * @returns Promesa con el objeto Person actualizado
 */
export async function patchPersonImage(id: string, imageFile: File): Promise<Person> {
  const url = ENDPOINTS.person.IdPerson.replace('{id}', id);
  const formData = new FormData();
  formData.append('image', imageFile);
  const response = await fetch(url, {
    method: 'PATCH',
    body: formData,
  });
  if (!response.ok) {
    throw new Error('Error al actualizar la imagen');
  }
  return response.json();
}

/**
 * Obtiene los datos de una persona por su ID.
 * @param id - ID de la persona
 * @returns Promesa con el objeto Person
 */
export async function getPersonById(id: string): Promise<Person> {
  const url = ENDPOINTS.person.IdPerson.replace('{id}', id);
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Error al obtener los datos de la persona");
  }
  return response.json();
}


/**
 * Registra un nuevo aprendiz en el sistema.
 * @param payload - Datos del aprendiz a registrar
 * @returns Promesa con la respuesta del registro (persona y usuario)
 */
export async function registerAprendiz(payload: RegisterPayload): Promise<RegisterResponse> {
  const response = await fetch(ENDPOINTS.person.registerAprendiz, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  const text = await response.text();
  let data: any = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch (e) {
    // non-json response
  }
  if (!response.ok) {
    // Try to extract message or validation errors
    const message = data?.detail || data?.message || JSON.stringify(data) || 'Error en el registro';
    const err = new Error(String(message));
    // Attach raw body for callers if needed
    (err as any).response = data;
    throw err;
  }
  return data as RegisterResponse;
}

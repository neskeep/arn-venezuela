export interface ProgramaItem {
  hora: string;
  titulo: string;
  descripcion: string;
}

export interface SpeakerItem {
  nombre: string;
  cargo: string;
  foto_url: string;
  bio: string;
}

export interface Evento {
  id: number;
  titulo: string;
  descripcion: string | null;
  fecha: string;
  imagen_url: string | null;
  ubicacion: string | null;
  estado: "activo" | "pasado" | "proximo";
  orden: number;
  tagline: string | null;
  asistentes: number | null;
  highlights: string | null;
  hora: string | null;
  galeria: string | null;
  programa: string | null;
  video_url: string | null;
  cta_url: string | null;
  cta_texto: string | null;
  speakers: string | null;
  created_at: string;
  updated_at: string;
}

export interface Aliado {
  id: number;
  nombre: string;
  logo_url: string;
  website_url: string | null;
  orden: number;
  activo: number;
  created_at: string;
  updated_at: string;
}

export interface MiembroJunta {
  id: number;
  nombre: string;
  cargo: string;
  bio: string | null;
  foto_url: string | null;
  orden: number;
  activo: number;
  created_at: string;
  updated_at: string;
}

export interface AdminUser {
  id: number;
  email: string;
  password_hash: string;
  nombre: string;
  created_at: string;
  updated_at: string;
}

export interface Miembro {
  id: number;
  nombre: string;
  email: string;
  telefono: string | null;
  ciudad: string;
  profesion: string | null;
  area_interes: "liderazgo" | "educacion" | "salud" | "negocios" | "arte" | "tecnologia" | "otro";
  mensaje: string | null;
  estado: "pendiente" | "activo" | "inactivo";
  created_at: string;
  updated_at: string;
}

export interface MiembroRegistro {
  nombre: string;
  email: string;
  telefono?: string;
  ciudad: string;
  profesion?: string;
  area_interes: Miembro["area_interes"] | "";
  mensaje?: string;
}

export interface ApiResponse<T> {
  data: T;
}

export interface ApiListResponse<T> {
  data: T[];
  meta: {
    total: number;
  };
}

export interface ApiError {
  error: {
    message: string;
    statusCode: number;
  };
}

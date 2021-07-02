export interface Estudiante{
  run: string;
  nombres: string;
  apellidos: string;
  correo?: string;
  fechaNacimiento?: string;
  comuna?: string;
  direccion?: string;
  nacionalidad?: string;
  telefono: string;
  carrera: string;
  numeroMatricula: number;
  plan?: string;
  situacionActual: string; //ej: titulado
  situacionActualAño?: number;
  situacionActualPeriodo?: number;
  añoIngreso?: string;
  correoInstitucional: string;
  correoPersonal ?: string;
  rol: string;
  practicaAbilitada: boolean;
  practicaActual: number;
  etapaActual: string;
  estadoEtapaActual: string;
  documentos: string[];
  cod_carrera?: string;
  sexo?: string;
  viaIngreso?: string;
  regular?: string;
  nivel?: number;
  porcentajeAvance?: number;
  ult_punt_prio?: number; //ultimo puntaje de prioridad
  alDia?: string;
  nivel99Aprobado?: string;
}

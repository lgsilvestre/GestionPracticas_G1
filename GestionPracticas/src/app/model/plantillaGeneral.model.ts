export interface PlantillaGeneral{
  // Estudiante
  id?: string;
  nombres: string;
  apellidos: string;
  run: string;
  carrera: string;
  numeroMatricula: number;
  correoInstitucional: string;
  telefono: string;
  contactoEmergencia: string;
  telefonoEmergencia: string;
  // Empresa
  nombreEmpresa: string;
  rutEmpresa: string;
  telefonoEmpresa: string;
  correoEmpresa: string;
  direccionEmpresa: string;
  // Tutor
  nombreTutor: string;
  apellidoTutor: string;
  runTutor: string;
  areaTutor: string;
  puestoTutor: string;
  contactoTutor: string;
  correoTutor: string;
  // Practica
  numeroPractica: string;
  fechaInicio: Date;
  fechaTermino: Date;
  horaInicio: string;
  horaTermino: string;
  duracionJorada: number;
  archivos: string[]; // revisar bien.
  // fin ( por el momento)
  estado: string; // aprobado,rechazado,en revision
}

export interface Practica{
  // Estudiante
  id: string;
  idUser: string;
  nombreEstudiante: string;
  apellidoEstudiante: string;
  carreraEstudiante: string;
  numeroMatricula: string;
  runEstudiante: string;
  numeroContactoEstudiante: string;
  correoEstudiante: string;
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
  // fin ( por el momento)
  estadoDePractica: string; // en curso, en evaluacion, completada.
  calificacion: string;
  retroalimentacion: string;
  // documentos
  urlSeguroDePractica: string;
  nombreArchivoseguro: string;
  urlEvaluacionEmpresa: string;
  nombreArchivoEvaluacionEmpresa: string;
  urlInformePractica: string;
  nombreArchivoInformePractica: string;
  // los nombres de lso archivos son nesesarioa para eliminarlos del store
}

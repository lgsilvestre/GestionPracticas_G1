export interface Practica{
  //Estudiante
  nombreEstudiante:string;
  apellidoEstudiante:string;
  carreraEstudiante:string;
  numeroMatricula:string;
  runEstudiante:string;
  numeroContactoEstudiante:string;
  correoEstudiante:string;
  contactoEmergencia:string;
  telefonoEmergencia:string;
  //Empresa
  nombreEmpresa:string;
  rutEmpresa:string;
  telefonoEmpresa:string;
  correoEmpresa:string;
  direccionEmpresa:string;
  //Tutor
  nombreTutor:string;
  apellidoTutor:string;
  runTutor:string;
  areaTutor:string;
  puestoTutor:string;
  contactoTutor:string;
  correoTutor:string;
  //Practica
  numeroPractica:string;
  fechaInicio:Date;
  fechaTermino:Date;
  horaInicio:string;
  horaTermino:string;
  duracionJorada:number;
  archivoConsentimiento:string; // revisar bien.
  //fin ( por el momento)
  estadoDePractica:string; // en curso, en evaluacion, completada.
  calificacion?:string[];
  retroalimentacion?:string;

}

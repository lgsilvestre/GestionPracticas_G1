import { PlanEstudios } from "./planEstudios.model";

export interface Carrera
{
    nombreCarrera: string;
    nombreEncargadoCarrera: string;
    correoEncargadoCarrera: string;
    telefonoEncargadoCarrera: string;
    planEstudio: PlanEstudios;
}
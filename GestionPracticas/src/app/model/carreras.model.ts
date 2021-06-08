import { PlanEstudios } from "./planEstudios.model";

export interface Carrera
{
    id?: string;
    nombreCarrera?: string;
    nombreEncargadoCarrera?: string;
    correoEncargadoCarrera?: string;
    telefonoEncargadoCarrera?: string;
    planEstudio?: PlanEstudios;
}
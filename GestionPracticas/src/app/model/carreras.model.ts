import { PlanEstudios } from "./planEstudios.model";

export interface Carrera
{
    id?: string;
    nombreCarrera?: string;
    cod_carrera?: number;
    nombreEncargadoCarrera?: string;
    correoEncargadoCarrera?: string;
    telefonoEncargadoCarrera?: string;
    planEstudio?: PlanEstudios[];
}

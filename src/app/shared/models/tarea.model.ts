
export interface Tarea {
    id?: string;
    create: Date;
    done: boolean;
    descripcion: string;
    createBy?: string;
}
export interface IAnuncio {
    _id?: any;
    titulo: string;
    propiedad: string;
    tipo: string ;
    direccion?: string;
    descripcion?:  string;
    isTaken?:  boolean ;
    image?: any;
    precio?: number;
    servicio?: string;
    horario?: Date;
    user?: any;
   // guardianId?: string[];
}

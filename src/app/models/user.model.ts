export interface IUser {
    _id?: string | null;
    email: string;
    contraseña?: string;
    nombre?: string;
    apellido?: string;
    isGuardian?: boolean;
    date?: Date;
    gender?: string;
    role?: string;
    foto?: string;
}

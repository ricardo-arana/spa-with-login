export interface Usuario {
    nombre: string;
    password: string;
    email: string;
    recaptcha: string;
}

export interface Login {
    email: string;
    password: string;
    recaptcha: string;
}
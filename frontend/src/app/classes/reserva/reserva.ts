export class Reserva {
    id?: number;
    dia: number = 1; // Día del mes (1 - 31)
    numero: number = 0; // Número de la reserva
    hora: string = '00:00'; // Hora en formato HH:mm
    nombre: string = ''; // Nombre de la persona que hace la reserva
    disponible: boolean = true; // Indica si la reserva está disponible o no
}
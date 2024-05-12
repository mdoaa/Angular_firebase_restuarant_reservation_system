export class restaurant {
    id?: string;
    name?: string;
    location?: string;
    phone?: string;
    timeSlots?: { time: string, seats: number }[]; // Added timeSlots property
}

import { Photo } from './Photo';
export interface User {
    id: number;
    username: string;
    knownAs: string;
    city: string;
    country: string;
    age: number;
    gender: string;
    created: Date;
    lastActive: Date;
    photoUrl: string;
    interests?: string;
    introduction?: string;
    lookingFor?: string;
    photos?: Photo[];

}

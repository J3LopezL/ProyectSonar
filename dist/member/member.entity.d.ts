import { ClubEntity } from '../club/club.entity';
export declare class MemberEntity {
    id: string;
    name: string;
    email: string;
    dateBirth: Date;
    clubs: ClubEntity[];
}

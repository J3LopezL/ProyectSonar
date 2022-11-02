import { MemberEntity } from '../member/member.entity';
export declare class ClubEntity {
    id: string;
    name: string;
    image: string;
    dateCreate: Date;
    description: string;
    members: MemberEntity[];
}

import { ClubEntity } from '../club/club.entity';
import { MemberEntity } from '../member/member.entity';
import { Repository } from 'typeorm';
export declare class ClubMemberService {
    private readonly clubRepository;
    private readonly memberRepository;
    constructor(clubRepository: Repository<ClubEntity>, memberRepository: Repository<MemberEntity>);
    addMemberToClub(clubId: string, memberId: string): Promise<ClubEntity>;
    findMembersFromClub(clubId: string): Promise<MemberEntity[]>;
    findMemberFromClub(clubId: string, memberId: string): Promise<MemberEntity>;
    updateMembersFromClub(clubId: string, members: MemberEntity[]): Promise<ClubEntity>;
    deleteMemberFromClub(clubId: string, memberId: string): Promise<void>;
}

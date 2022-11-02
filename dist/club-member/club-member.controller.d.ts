import { ClubMemberService } from './club-member.service';
import { MemberEntity } from '../member/member.entity';
import { MemberDto } from '../member/member.dto';
export declare class ClubMemberController {
    private readonly clubMemberService;
    constructor(clubMemberService: ClubMemberService);
    addMemberToClub(clubId: string, memberId: string): Promise<import("../club/club.entity").ClubEntity>;
    finMemberFromClub(clubId: string, memberId: string): Promise<MemberEntity>;
    findMembersFromClub(clubId: string): Promise<MemberEntity[]>;
    updateMembersFromClub(membersDto: MemberDto[], clubId: string): Promise<import("../club/club.entity").ClubEntity>;
    deleteMemberFromClub(clubId: string, memberId: string): Promise<void>;
}

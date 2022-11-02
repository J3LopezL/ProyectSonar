import { MemberDto } from './member.dto';
import { MemberEntity } from './member.entity';
import { MemberService } from './member.service';
export declare class MemberController {
    private readonly memberService;
    constructor(memberService: MemberService);
    findAll(): Promise<MemberEntity[]>;
    findOne(memberId: string): Promise<MemberEntity>;
    create(memberDto: MemberDto): Promise<MemberEntity>;
    update(memberId: string, memberDto: MemberDto): Promise<MemberEntity>;
    delete(memberId: string): Promise<void>;
}

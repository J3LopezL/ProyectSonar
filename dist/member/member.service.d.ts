import { Repository } from 'typeorm';
import { MemberEntity } from './member.entity';
export declare class MemberService {
    private readonly memberRepository;
    constructor(memberRepository: Repository<MemberEntity>);
    findAll(): Promise<MemberEntity[]>;
    findOne(id: string): Promise<MemberEntity>;
    create(member: MemberEntity): Promise<MemberEntity>;
    update(id: string, member: MemberEntity): Promise<MemberEntity>;
    delete(id: string): Promise<void>;
}

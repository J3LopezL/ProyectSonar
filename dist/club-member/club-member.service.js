"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClubMemberService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const club_entity_1 = require("../club/club.entity");
const member_entity_1 = require("../member/member.entity");
const typeorm_2 = require("typeorm");
const business_errors_1 = require("../shared/errors/business-errors");
let ClubMemberService = class ClubMemberService {
    constructor(clubRepository, memberRepository) {
        this.clubRepository = clubRepository;
        this.memberRepository = memberRepository;
    }
    async addMemberToClub(clubId, memberId) {
        const member = await this.memberRepository.findOne({ where: { id: memberId } });
        if (!member)
            throw new business_errors_1.BusinessLogicException("The member with the given id was not found.", business_errors_1.BusinessError.NOT_FOUND);
        const club = await this.clubRepository.findOne({ where: { id: clubId }, relations: ["members"] });
        if (!club)
            throw new business_errors_1.BusinessLogicException("The club with the given id was not found.", business_errors_1.BusinessError.NOT_FOUND);
        club.members = [...club.members, member];
        return await this.clubRepository.save(club);
    }
    async findMembersFromClub(clubId) {
        const club = await this.clubRepository.findOne({ where: { id: clubId }, relations: ["members"] });
        if (!club)
            throw new business_errors_1.BusinessLogicException("The club with the given id was not found.", business_errors_1.BusinessError.NOT_FOUND);
        return club.members;
    }
    async findMemberFromClub(clubId, memberId) {
        const member = await this.memberRepository.findOne({ where: { id: memberId } });
        if (!member)
            throw new business_errors_1.BusinessLogicException("The member with the given id was not found.", business_errors_1.BusinessError.NOT_FOUND);
        const club = await this.clubRepository.findOne({ where: { id: clubId }, relations: ["members"] });
        if (!club)
            throw new business_errors_1.BusinessLogicException("The club with the given id was not found.", business_errors_1.BusinessError.NOT_FOUND);
        const clubMember = club.members.find(e => e.id === member.id);
        if (!clubMember)
            throw new business_errors_1.BusinessLogicException("The member with the given id is not associated to the club.", business_errors_1.BusinessError.PRECONDITION_FAILED);
        return clubMember;
    }
    async updateMembersFromClub(clubId, members) {
        const club = await this.clubRepository.findOne({ where: { id: clubId }, relations: ["members"] });
        if (!club)
            throw new business_errors_1.BusinessLogicException("The club with the given id was not found.", business_errors_1.BusinessError.NOT_FOUND);
        for (let i = 0; i < members.length; i++) {
            const member = await this.memberRepository.findOne({ where: { id: members[i].id } });
            if (!member)
                throw new business_errors_1.BusinessLogicException("The member with the given id was not found.", business_errors_1.BusinessError.NOT_FOUND);
        }
        club.members = members;
        return await this.clubRepository.save(club);
    }
    async deleteMemberFromClub(clubId, memberId) {
        const member = await this.memberRepository.findOne({ where: { id: memberId } });
        if (!member)
            throw new business_errors_1.BusinessLogicException("The member with the given id was not found.", business_errors_1.BusinessError.NOT_FOUND);
        const club = await this.clubRepository.findOne({ where: { id: clubId }, relations: ["members"] });
        if (!club)
            throw new business_errors_1.BusinessLogicException("The club with the given id was not found.", business_errors_1.BusinessError.NOT_FOUND);
        const clubMember = club.members.find(e => e.id === member.id);
        if (!clubMember)
            throw new business_errors_1.BusinessLogicException("The member with the given id is not associated to the club.", business_errors_1.BusinessError.PRECONDITION_FAILED);
        club.members = club.members.filter(e => e.id !== memberId);
        await this.clubRepository.save(club);
    }
};
ClubMemberService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(club_entity_1.ClubEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(member_entity_1.MemberEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ClubMemberService);
exports.ClubMemberService = ClubMemberService;
//# sourceMappingURL=club-member.service.js.map
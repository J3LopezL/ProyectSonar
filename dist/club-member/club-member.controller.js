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
exports.ClubMemberController = void 0;
const common_1 = require("@nestjs/common");
const business_errors_interceptor_1 = require("../shared/interceptors/business-errors.interceptor");
const class_transformer_1 = require("class-transformer");
const club_member_service_1 = require("./club-member.service");
const member_entity_1 = require("../member/member.entity");
let ClubMemberController = class ClubMemberController {
    constructor(clubMemberService) {
        this.clubMemberService = clubMemberService;
    }
    async addMemberToClub(clubId, memberId) {
        return await this.clubMemberService.addMemberToClub(clubId, memberId);
    }
    async finMemberFromClub(clubId, memberId) {
        return await this.clubMemberService.findMemberFromClub(clubId, memberId);
    }
    async findMembersFromClub(clubId) {
        return await this.clubMemberService.findMembersFromClub(clubId);
    }
    async updateMembersFromClub(membersDto, clubId) {
        const members = (0, class_transformer_1.plainToInstance)(member_entity_1.MemberEntity, membersDto);
        return await this.clubMemberService.updateMembersFromClub(clubId, members);
    }
    async deleteMemberFromClub(clubId, memberId) {
        return await this.clubMemberService.deleteMemberFromClub(clubId, memberId);
    }
};
__decorate([
    (0, common_1.Post)(':clubId/members/:memberId'),
    __param(0, (0, common_1.Param)('clubId')),
    __param(1, (0, common_1.Param)('memberId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ClubMemberController.prototype, "addMemberToClub", null);
__decorate([
    (0, common_1.Get)(':clubId/members/:memberId'),
    __param(0, (0, common_1.Param)('clubId')),
    __param(1, (0, common_1.Param)('memberId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ClubMemberController.prototype, "finMemberFromClub", null);
__decorate([
    (0, common_1.Get)(':clubId/members'),
    __param(0, (0, common_1.Param)('clubId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ClubMemberController.prototype, "findMembersFromClub", null);
__decorate([
    (0, common_1.Put)(':clubId/members'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('clubId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, String]),
    __metadata("design:returntype", Promise)
], ClubMemberController.prototype, "updateMembersFromClub", null);
__decorate([
    (0, common_1.Delete)(':clubId/members/:memberId'),
    (0, common_1.HttpCode)(204),
    __param(0, (0, common_1.Param)('clubId')),
    __param(1, (0, common_1.Param)('memberId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ClubMemberController.prototype, "deleteMemberFromClub", null);
ClubMemberController = __decorate([
    (0, common_1.Controller)('clubs'),
    (0, common_1.UseInterceptors)(business_errors_interceptor_1.BusinessErrorsInterceptor),
    __metadata("design:paramtypes", [club_member_service_1.ClubMemberService])
], ClubMemberController);
exports.ClubMemberController = ClubMemberController;
//# sourceMappingURL=club-member.controller.js.map
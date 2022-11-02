"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const typeorm_testing_config_1 = require("../shared/testing-utils/typeorm-testing-config");
const typeorm_1 = require("@nestjs/typeorm");
const club_member_service_1 = require("./club-member.service");
const club_entity_1 = require("../club/club.entity");
const member_entity_1 = require("../member/member.entity");
const faker_1 = require("@faker-js/faker");
describe('ClubMemberService', () => {
    let service;
    let clubRepository;
    let memberRepository;
    let club;
    let membersList;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            imports: [...(0, typeorm_testing_config_1.TypeOrmTestingConfig)()],
            providers: [club_member_service_1.ClubMemberService],
        }).compile();
        service = module.get(club_member_service_1.ClubMemberService);
        clubRepository = module.get((0, typeorm_1.getRepositoryToken)(club_entity_1.ClubEntity));
        memberRepository = module.get((0, typeorm_1.getRepositoryToken)(member_entity_1.MemberEntity));
        await seedDatabase();
    });
    const seedDatabase = async () => {
        memberRepository.clear();
        clubRepository.clear();
        membersList = [];
        for (let i = 0; i < 5; i++) {
            const member = await memberRepository.save({
                name: faker_1.faker.company.name(),
                email: faker_1.faker.internet.email(),
                dateBirth: faker_1.faker.date.birthdate()
            });
            membersList.push(member);
        }
        club = await clubRepository.save({
            name: faker_1.faker.company.name(),
            image: faker_1.faker.image.business(),
            dateCreate: faker_1.faker.date.birthdate(),
            description: faker_1.faker.lorem.sentence(),
            members: membersList
        });
    };
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
    it('addMemberToClub should add an member to a club', async () => {
        const newMember = await memberRepository.save({
            name: faker_1.faker.company.name(),
            email: faker_1.faker.internet.email(),
            dateBirth: faker_1.faker.date.birthdate()
        });
        const newClub = await clubRepository.save({
            name: faker_1.faker.company.name(),
            image: faker_1.faker.image.business(),
            dateCreate: faker_1.faker.date.birthdate(),
            description: faker_1.faker.lorem.sentence(),
            members: membersList
        });
        const result = await service.addMemberToClub(newClub.id, newMember.id);
        expect(result.members.length).toBe(6);
        expect(result.members[0]).not.toBeNull();
    });
    it('addMemberToClub should thrown exception for an invalid member', async () => {
        const newClub = await clubRepository.save({
            name: faker_1.faker.company.name(),
            image: faker_1.faker.image.business(),
            dateCreate: faker_1.faker.date.birthdate(),
            description: faker_1.faker.lorem.sentence()
        });
        await expect(() => service.addMemberToClub(newClub.id, "0")).rejects.toHaveProperty("message", "The member with the given id was not found.");
    });
    it('addMemberToClub should throw an exception for an invalid club', async () => {
        const newMember = await memberRepository.save({
            name: faker_1.faker.company.name(),
            email: faker_1.faker.internet.email(),
            dateBirth: faker_1.faker.date.birthdate()
        });
        await expect(() => service.addMemberToClub("0", newMember.id)).rejects.toHaveProperty("message", "The club with the given id was not found.");
    });
    it('findMemberFromClub should return member by club', async () => {
        const member = membersList[0];
        const storedMember = await service.findMemberFromClub(club.id, member.id);
        expect(storedMember).not.toBeNull();
        expect(storedMember.name).toBe(member.name);
        expect(storedMember.email).toBe(member.email);
    });
    it('findMemberFromClub should throw an exception for an invalid member', async () => {
        await expect(() => service.findMemberFromClub(club.id, "0")).rejects.toHaveProperty("message", "The member with the given id was not found.");
    });
    it('findMemberFromClub should throw an exception for an invalid club', async () => {
        const member = membersList[0];
        await expect(() => service.findMemberFromClub("0", member.id)).rejects.toHaveProperty("message", "The club with the given id was not found.");
    });
    it('findMemberFromClub should throw an exception for an member not associated to the club', async () => {
        const newMember = await memberRepository.save({
            name: faker_1.faker.company.name(),
            email: faker_1.faker.internet.email(),
            dateBirth: faker_1.faker.date.birthdate()
        });
        await expect(() => service.findMemberFromClub(club.id, newMember.id)).rejects.toHaveProperty("message", "The member with the given id is not associated to the club.");
    });
    it('findMembersFromClub should return members by club', async () => {
        const members = await service.findMembersFromClub(club.id);
        expect(members.length).toBe(5);
    });
    it('findMembersFromClub should throw an exception for an invalid club', async () => {
        await expect(() => service.findMembersFromClub("0")).rejects.toHaveProperty("message", "The club with the given id was not found.");
    });
    it('updateMembersFromClub should update members list for a club', async () => {
        const newMember = await memberRepository.save({
            name: faker_1.faker.company.name(),
            email: faker_1.faker.internet.email(),
            dateBirth: faker_1.faker.date.birthdate()
        });
        const updatedClub = await service.updateMembersFromClub(club.id, [newMember]);
        expect(updatedClub.members.length).toBe(1);
        expect(updatedClub.members[0].name).toBe(newMember.name);
        expect(updatedClub.members[0].email).toBe(newMember.email);
        expect(updatedClub.members[0].dateBirth).toBe(newMember.dateBirth);
    });
    it('updateMembersFromClub should throw an exception for an invalid club', async () => {
        const newMember = await memberRepository.save({
            name: faker_1.faker.company.name(),
            email: faker_1.faker.internet.email(),
            dateBirth: faker_1.faker.date.birthdate()
        });
        await expect(() => service.updateMembersFromClub("0", [newMember])).rejects.toHaveProperty("message", "The club with the given id was not found.");
    });
    it('updateMembersFromClub should throw an exception for an invalid member', async () => {
        const newMember = membersList[0];
        newMember.id = "0";
        await expect(() => service.updateMembersFromClub(club.id, [newMember])).rejects.toHaveProperty("message", "The member with the given id was not found.");
    });
    it('deleteMemberFromClub should remove an member from a club', async () => {
        const member = membersList[0];
        await service.deleteMemberFromClub(club.id, member.id);
        const storedClub = await clubRepository.findOne({ where: { id: club.id }, relations: ["members"] });
        const deletedMember = storedClub.members.find(a => a.id === member.id);
        expect(deletedMember).toBeUndefined();
    });
    it('deleteMemberFromClub should thrown an exception for an invalid member', async () => {
        await expect(() => service.deleteMemberFromClub(club.id, "0")).rejects.toHaveProperty("message", "The member with the given id was not found.");
    });
    it('deleteMemberFromClub should thrown an exception for an invalid club', async () => {
        const member = membersList[0];
        await expect(() => service.deleteMemberFromClub("0", member.id)).rejects.toHaveProperty("message", "The club with the given id was not found.");
    });
    it('deleteMemberFromClub should thrown an exception for an non asocciated member', async () => {
        const newMember = await memberRepository.save({
            name: faker_1.faker.company.name(),
            email: faker_1.faker.internet.email(),
            dateBirth: faker_1.faker.date.birthdate()
        });
        await expect(() => service.deleteMemberFromClub(club.id, newMember.id)).rejects.toHaveProperty("message", "The member with the given id is not associated to the club.");
    });
});
//# sourceMappingURL=club-member.service.spec.js.map
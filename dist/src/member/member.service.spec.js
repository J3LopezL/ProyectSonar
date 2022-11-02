"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_testing_config_1 = require("../shared/testing-utils/typeorm-testing-config");
const member_entity_1 = require("./member.entity");
const member_service_1 = require("./member.service");
const faker_1 = require("@faker-js/faker");
describe('MemberService', () => {
    let service;
    let repository;
    let membersList;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            imports: [...(0, typeorm_testing_config_1.TypeOrmTestingConfig)()],
            providers: [member_service_1.MemberService],
        }).compile();
        service = module.get(member_service_1.MemberService);
        repository = module.get((0, typeorm_1.getRepositoryToken)(member_entity_1.MemberEntity));
        await seedDatabase();
    });
    const seedDatabase = async () => {
        repository.clear();
        membersList = [];
        for (let i = 0; i < 5; i++) {
            const member = await repository.save({
                name: faker_1.faker.company.name(),
                email: faker_1.faker.internet.email(),
                dateBirth: faker_1.faker.date.birthdate(),
            });
            membersList.push(member);
        }
    };
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
    it('findAll should return all members', async () => {
        const members = await service.findAll();
        expect(members).not.toBeNull();
        expect(members).toHaveLength(membersList.length);
    });
    it('findOne should return a member by id', async () => {
        const storedMember = membersList[0];
        const member = await service.findOne(storedMember.id);
        expect(member).not.toBeNull();
        expect(member.name).toEqual(storedMember.name);
        expect(member.email).toEqual(storedMember.email);
        expect(member.dateBirth).toEqual(storedMember.dateBirth);
    });
    it('findOne should throw an exception for an invalid member', async () => {
        await expect(() => service.findOne('0')).rejects.toHaveProperty('message', 'The member with the given id was not found');
    });
    it('create should return a new member', async () => {
        const member = {
            id: '',
            name: faker_1.faker.company.name(),
            email: faker_1.faker.internet.email(),
            dateBirth: faker_1.faker.date.birthdate(),
            clubs: [],
        };
        const newMember = await service.create(member);
        expect(newMember).not.toBeNull();
        const storedMember = await repository.findOne({
            where: { id: `${newMember.id}` },
        });
        expect(storedMember).not.toBeNull();
        expect(storedMember.name).toEqual(newMember.name);
        expect(storedMember.email).toEqual(newMember.email);
        expect(storedMember.dateBirth).toEqual(newMember.dateBirth);
    });
    it('update should modify a member', async () => {
        const member = membersList[0];
        member.name = 'New name';
        member.email = 'new@n.e';
        member.dateBirth = faker_1.faker.date.birthdate();
        member.clubs = [];
        const updatedMember = await service.update(member.id, member);
        expect(updatedMember).not.toBeNull();
        const storedMember = await repository.findOne({
            where: { id: `${member.id}` },
        });
        expect(storedMember).not.toBeNull();
        expect(storedMember.name).toEqual(member.name);
        expect(storedMember.email).toEqual(member.email);
        expect(storedMember.dateBirth).toEqual(member.dateBirth);
    });
    it('update should throw an exception for an invalid member', async () => {
        let member = membersList[0];
        member = Object.assign(Object.assign({}, member), { name: 'New name', email: 'New@iamge.com', dateBirth: faker_1.faker.date.birthdate() });
        await expect(() => service.update('0', member)).rejects.toHaveProperty('message', 'The member with the given id was not found');
    });
    it('delete should remove a member', async () => {
        const member = membersList[0];
        await service.delete(member.id);
        const deletedMember = await repository.findOne({
            where: { id: `${member.id}` },
        });
        expect(deletedMember).toBeNull();
    });
    it('delete should throw an exception for an invalid member', async () => {
        const member = membersList[0];
        await service.delete(member.id);
        await expect(() => service.delete('0')).rejects.toHaveProperty('message', 'The member with the given id was not found');
    });
});
//# sourceMappingURL=member.service.spec.js.map
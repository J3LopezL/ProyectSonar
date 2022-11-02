"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_testing_config_1 = require("../shared/testing-utils/typeorm-testing-config");
const club_entity_1 = require("./club.entity");
const club_service_1 = require("./club.service");
const faker_1 = require("@faker-js/faker");
describe('ClubService', () => {
    let service;
    let repository;
    let clubsList;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            imports: [...(0, typeorm_testing_config_1.TypeOrmTestingConfig)()],
            providers: [club_service_1.ClubService],
        }).compile();
        service = module.get(club_service_1.ClubService);
        repository = module.get((0, typeorm_1.getRepositoryToken)(club_entity_1.ClubEntity));
        await seedDatabase();
    });
    const seedDatabase = async () => {
        repository.clear();
        clubsList = [];
        for (let i = 0; i < 5; i++) {
            const club = await repository.save({
                name: faker_1.faker.company.name(),
                image: faker_1.faker.image.business(),
                dateCreate: faker_1.faker.date.birthdate(),
                description: faker_1.faker.lorem.sentence(),
            });
            clubsList.push(club);
        }
    };
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
    it('findAll should return all clubs', async () => {
        const clubs = await service.findAll();
        expect(clubs).not.toBeNull();
        expect(clubs).toHaveLength(clubsList.length);
    });
    it('findOne should return a club by id', async () => {
        const storedClub = clubsList[0];
        const club = await service.findOne(storedClub.id);
        expect(club).not.toBeNull();
        expect(club.name).toEqual(storedClub.name);
        expect(club.image).toEqual(storedClub.image);
        expect(club.dateCreate).toEqual(storedClub.dateCreate);
        expect(club.description).toEqual(storedClub.description);
    });
    it('findOne should throw an exception for an invalid club', async () => {
        await expect(() => service.findOne('0')).rejects.toHaveProperty('message', 'The club with the given id was not found');
    });
    it('create should return a new club', async () => {
        const club = {
            id: '',
            name: faker_1.faker.company.name(),
            image: faker_1.faker.image.business(),
            dateCreate: faker_1.faker.date.birthdate(),
            description: faker_1.faker.lorem.sentence(),
            members: [],
        };
        const newClub = await service.create(club);
        expect(newClub).not.toBeNull();
        const storedClub = await repository.findOne({
            where: { id: `${newClub.id}` },
        });
        expect(storedClub).not.toBeNull();
        expect(storedClub.name).toEqual(newClub.name);
        expect(storedClub.image).toEqual(newClub.image);
        expect(storedClub.dateCreate).toEqual(newClub.dateCreate);
        expect(storedClub.description).toEqual(newClub.description);
    });
    it('update should modify a club', async () => {
        const club = clubsList[0];
        club.name = 'New name';
        club.image = 'New image';
        club.dateCreate = faker_1.faker.date.birthdate();
        club.description = 'New description';
        const updatedClub = await service.update(club.id, club);
        expect(updatedClub).not.toBeNull();
        const storedClub = await repository.findOne({
            where: { id: `${club.id}` },
        });
        expect(storedClub).not.toBeNull();
        expect(storedClub.name).toEqual(club.name);
        expect(storedClub.image).toEqual(club.image);
        expect(storedClub.dateCreate).toEqual(club.dateCreate);
        expect(storedClub.description).toEqual(club.description);
    });
    it('update should throw an exception for an invalid club', async () => {
        let club = clubsList[0];
        club = Object.assign(Object.assign({}, club), { name: 'New name', image: 'New iamge', dateCreate: faker_1.faker.date.birthdate(), description: 'New Description' });
        await expect(() => service.update('0', club)).rejects.toHaveProperty('message', 'The club with the given id was not found');
    });
    it('delete should remove a club', async () => {
        const club = clubsList[0];
        await service.delete(club.id);
        const deletedClub = await repository.findOne({
            where: { id: `${club.id}` },
        });
        expect(deletedClub).toBeNull();
    });
    it('delete should throw an exception for an invalid club', async () => {
        const club = clubsList[0];
        await service.delete(club.id);
        await expect(() => service.delete('0')).rejects.toHaveProperty('message', 'The club with the given id was not found');
    });
});
//# sourceMappingURL=club.service.spec.js.map
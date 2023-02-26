const { faker } = require('@faker-js/faker');

function generateCompany() {
  const generateMember = () => ({
    name: faker.name.fullName(),
    email: faker.internet.email(),
    phone: faker.phone.number(),
    skills: [faker.lorem.word(), faker.lorem.word(), faker.lorem.word()].join(', '),
  });

  const generateTeam = () => ({
    name: faker.name.jobArea(),
    description: faker.lorem.words(),
    leader: generateMember(),
    members: Array.from({ length: 2 }, generateMember),
  });

  const generateDepartment = () => ({
    name: faker.commerce.department(),
    description: faker.lorem.paragraphs(),
    manager: generateMember(),
    teams: Array.from({ length: 1 }, generateTeam), // TODO: This makes it slow
  });

  const generateLocations = () => ({
    name: faker.address.city(),
    departments: Array.from({ length: 2 }, generateDepartment),
  });

  return {
    name: faker.company.name(),
    address: {
      street: faker.address.streetAddress(),
      city: faker.address.city(),
      state: faker.address.state(),
      country: faker.address.country(),
      zipCode: faker.address.zipCode(),
    },
    locations: Array.from({ length: 2 }, generateLocations),
  };
}

module.exports = {
  generateCompany,
};

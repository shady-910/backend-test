module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('Users', [{
    email: 'john@example.com',
    created_at: new Date(),
    updated_at: new Date(),
  }]),
  down: async (queryInterface) => queryInterface.bulkDelete('Users', null, {}),
};

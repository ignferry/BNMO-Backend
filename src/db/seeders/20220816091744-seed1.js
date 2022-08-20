const { faker } = require("@faker-js/faker");

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   
    const fakeUsers = [...Array(5)].map((user) => (
      {
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: "$2b$10$6OmCXZrOMGZmtx6JsmO96OwnugT4bkHfqM6yYEt5J/lD3j1hBD8q6", // password
        name: faker.name.fullName(),
        ktp_image: faker.image.food(),
        balance: 0,
        is_verified: true,
        is_admin: false
      }
    ));

    await queryInterface.bulkInsert("users", fakeUsers, {});

    const users = await queryInterface.sequelize.query(
      "SELECT id FROM users"
    );

    const userIds = users[0];

    const fakeTransactions = [...Array(5)].map((transaction) => (
      {
        type: Math.floor(Math.random() * 2),
        sender_id: userIds[Math.floor(Math.random() * 5)].id,
        receiver_id: userIds[Math.floor(Math.random() * 5)].id,
        amount: faker.finance.faker.finance.amount(0, 1000000, 0),
        status: Math.floor(Math.random() * 3) - 1
      }
    ))

    await queryInterface.bulkInsert("transactions", fakeTransactions, {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("users", null, {});
    await queryInterface.bulkDelete("transactions", null, {});
  }
};

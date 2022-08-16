const { faker } = require("@faker-js/faker");

const fakeUsers = [...Array(5)].map((user) => (
  {
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: "$2y$10$zHfwQni69axAwDBZrm9iU.ZdGXewvFITtT6Xn1sXkMGzj.x33vVNi", // password
    name: faker.name.fullName(),
    ktp_image: faker.image.food(),
    balance: 0,
    is_verified: true,
    is_admin: false
  }
));

const fakeTransactions = [...Array(5)].map((transaction) => (
  {
    type: Math.floor(Math.random() * 2),
    sender_id: Math.floor(Math.random() * 5) + 1,
    receiver_id: Math.floor(Math.random() * 5) + 1,
    amount: faker.finance.faker.finance.amount(0, 1000000, 0),
    status: Math.floor(Math.random() * 3) - 1
  }
))

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
   await queryInterface.bulkInsert("users", fakeUsers, {});
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

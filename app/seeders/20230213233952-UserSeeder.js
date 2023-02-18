'use strict';
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [{
        firstname : 'John',
        lastname  : 'Doe',
        email     : 'jhon@example.com',
        password  : "bebas"
      }], {});
  },

  async down (queryInterface, Sequelize) {

    await queryInterface.bulkDelete('Users', null, {truncate: true});
  }
};

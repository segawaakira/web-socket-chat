'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('messages', [
      {
        message: "hey bro, whats up?"        
      },
      {
        message: "not much, n you?"        
      },
      {
        message: "What happened?"
      },
      {
        message: "Hello!"
      },
      {
        message: "Hi! How are you?"
      },
      {
        message: "I'm from Brazil and you?"
      },
      {
        message: "Me too!"
      }
    ], { timestamps: false });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('messages', null, {});
  }
};
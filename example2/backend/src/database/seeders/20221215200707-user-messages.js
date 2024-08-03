'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('user_messages', [
      {
        user_id: 1,
        chat_id: 1,
        message_id: 1,
      },
      {
        user_id: 2,
        chat_id: 1,
        message_id: 2,
      },
      {
        user_id: 1,
        chat_id: 1,
        message_id: 3,
      },
      {
        user_id: 2,
        chat_id: 2,
        message_id: 4,
      },
      {
        user_id: 3,
        chat_id: 2,
        message_id: 5,
      },
      {
        user_id: 1,
        chat_id: 3,
        message_id: 6,
      },
      {
        user_id: 3,
        chat_id: 3,
        message_id: 7,
      },
    ], { timestamps: false });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('user_messages', null, {});
  }
};
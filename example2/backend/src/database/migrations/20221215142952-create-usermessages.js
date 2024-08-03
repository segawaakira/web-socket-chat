'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const userMessagesTable = await queryInterface.createTable('user_messages', {
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
          model: 'users',
          key: 'id'
        }
      },
      chat_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
          model: 'chats',
          key: 'id'
        }
      },
      message_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
          model: 'messages',
          key: 'id'
        }
      }
    })

    return userMessagesTable
  },

  down: async (queryInterface, _Sequelize) => {
    return await queryInterface.dropTable('user_messages')
  }
}

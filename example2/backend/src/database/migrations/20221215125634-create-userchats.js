'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const userChatsTable = await queryInterface.createTable('user_chats', {
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
      }
    })

    return userChatsTable
  },

  down: async (queryInterface, _Sequelize) => {
    return await queryInterface.dropTable('user_chats')
  }
}

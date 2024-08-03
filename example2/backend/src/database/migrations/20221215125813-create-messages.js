'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const messagesTable = await queryInterface.createTable('messages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      message: {
        type: Sequelize.TEXT('long'),
        allowNull: false
      },
      date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      }
    })

    return messagesTable
  },

  down: async (queryInterface, _Sequelize) => {
    return await queryInterface.dropTable('messages')
  }
}

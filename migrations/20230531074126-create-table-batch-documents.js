'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('batch_document', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      batchId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      document_title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      document_description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      document_path: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('batch_document');
  }
};

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('penilai_proposal', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      proposalId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      dosenId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      nama_dosen: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      nilai: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      is_input_score: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      is_change_requested: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
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
    await queryInterface.dropTable('penilai_proposal');
  }
};

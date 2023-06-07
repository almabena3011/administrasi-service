'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('sptjm', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      mahasiswaId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      proposalId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      nama_lengkap: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      prodi: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      nim: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      nik: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      no_wa: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      nama_ot_ttd: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM('Menunggu', 'Diterbitkan', 'Ditolak'),
        allowNull: false,
        defaultValue: 'Menunggu'
      },
      sptjm_path: {
        type: Sequelize.TEXT,
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
    await queryInterface.dropTable('sptjm');
  }
};

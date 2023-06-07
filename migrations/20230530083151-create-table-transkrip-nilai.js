'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('transkrip_nilai', {
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
      nama_mahasiswa: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      angkatan: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      nim: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM('Menunggu', 'Disetujui', 'Ditolak'),
        allowNull: false,
        defaultValue: 'Menunggu'
      },
      transkrip_nilai_path: {
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
    await queryInterface.dropTable('transkrip_nilai');
  }
};

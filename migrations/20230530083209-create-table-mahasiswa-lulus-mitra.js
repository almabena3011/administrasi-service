'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('mahasiswa_lulus_mitra', {
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
      batchId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      jenis_mbkm: {
        type: Sequelize.ENUM('Magang', 'Studi Independen'),
        allowNull: false,
      },
      mitra: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      tempat_pelaksanaan: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      bukti_kelulusan_path: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      tanggal_mulai: {
        type: Sequelize.DATE,
        allowNull: false
      },
      tanggal_berakhir: {
        type: Sequelize.DATE,
        allowNull: false
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
    await queryInterface.dropTable('mahasiswa_lulus_mitra');
  }
};

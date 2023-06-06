'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('proposals', {
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
      nama_mahasiswa: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      nim: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      angkatan: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      prodi: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      jenis_program: {
        type: Sequelize.ENUM('Magang', 'Studi Independen'),
        allowNull: false,
      },
      proposal_path: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      surat_rekomendasi_path: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      status_approval: {
        type: Sequelize.ENUM('Menunggu', 'Ditolak', 'Disetujui'),
        allowNull: false,
        defaultValue: 'Menunggu'
      },
      is_suratrekomendasi_generated: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      averageSkor: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable('proposals');
  }
};

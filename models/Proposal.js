const { DataTypes, Model } = require('sequelize');
const moment = require('moment');

module.exports = (sequelize) => {
    class Proposal extends Model {
        static associate(models) {

        }
    }
    Proposal.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            mahasiswaId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            batchId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            nama_mahasiswa: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            nim: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            angkatan: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            prodi: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            nik: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            ipk: {
                type: DataTypes.FLOAT,
                allowNull: false,
            },
            sks_total: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            current_semester: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            jenis_program: {
                type: DataTypes.ENUM('Magang', 'Studi Independen'),
                allowNull: false,
            },
            averageSkor: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            proposal_path: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            transkrip_path: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            status_approval: {
                type: DataTypes.ENUM('Menunggu', 'Ditolak', 'Disetujui'),
                allowNull: false,
                defaultValue: 'Menunggu'
            },
            is_suratrekomendasi_generated: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false
            },
            is_transkrip_generated: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false
            },
            is_sptjm_generated: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false
            },
            createdAt: {
                type: DataTypes.DATE,
                allowNull: false,
                get() {
                    return moment(this.getDataValue('createdAt')).format('YY-MM-DD');
                }
            },
            updatedAt: {
                type: DataTypes.DATE,
                allowNull: false,
                get() {
                    return moment(this.getDataValue('updatedAt')).format('YY-MM-DD');
                }
            },
        },
        {
            sequelize,
            modelName: 'Proposal',
            tableName: 'proposals',
            timestamps: true,
        }
    );

    return Proposal;
};





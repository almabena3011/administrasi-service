const { DataTypes, Model } = require('sequelize');
const moment = require('moment');

module.exports = (sequelize) => {
    class MahasiswaLulus extends Model {
        static associate(models) {

        }
    }
    MahasiswaLulus.init(
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
            nama_kegiatan: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            jenis_mbkm: {
                type: DataTypes.ENUM('Magang', 'Studi Independen'),
                allowNull: false,
            },
            mitra: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            tempat_pelaksanaan: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            bukti_kelulusan_path: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            tanggal_mulai: {
                type: DataTypes.DATE,
                allowNull: false
            },
            tanggal_berakhir: {
                type: DataTypes.DATE,
                allowNull: false
            },
            is_assigned_to_pembimbing: {
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
            modelName: 'MahasiswaLulus',
            tableName: 'mahasiswa_lulus_mitra',
            timestamps: true,
        }
    );

    return MahasiswaLulus;
};





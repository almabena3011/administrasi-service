const { DataTypes, Model } = require('sequelize');
const moment = require('moment');

module.exports = (sequelize) => {
    class TranskripNilai extends Model {
        static associate(models) {

        }
    }
    TranskripNilai.init(
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
            nama_mahasiswa: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            angkatan: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            nim: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            status: {
                type: DataTypes.ENUM('Menunggu', 'Disetujui', 'Ditolak'),
                allowNull: false,
                defaultValue: 'Menunggu'
            },
            transkrip_nilai_path: {
                type: DataTypes.TEXT,
                allowNull: true,
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
            modelName: 'TranskripNilai',
            tableName: 'transkrip_nilai',
            timestamps: true,
        }
    );

    return TranskripNilai;
};





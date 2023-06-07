const { DataTypes, Model } = require('sequelize');
const moment = require('moment');

module.exports = (sequelize) => {
    class Sptjm extends Model {
        static associate(models) {

        }
    }
    Sptjm.init(
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
            proposalId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            nama_lengkap: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            prodi: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            nim: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            nik: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            no_wa: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            nama_ot_ttd: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            status: {
                type: DataTypes.ENUM('Menunggu', 'Diterbitkan', 'Ditolak'),
                allowNull: false,
                defaultValue: 'Menunggu'
            },
            sptjm_path: {
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
            modelName: 'Sptjm',
            tableName: 'sptjm',
            timestamps: true,
        }
    );

    return Sptjm;
};





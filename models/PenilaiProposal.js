const { DataTypes, Model } = require('sequelize');
const moment = require('moment');

module.exports = (sequelize) => {
    class PenilaiProposal extends Model {
        static associate(models) {

        }
    }
    PenilaiProposal.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            proposalId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            dosenId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            nama_dosen: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            nilai: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            is_input_score: {
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
            modelName: 'PenilaiProposal',
            tableName: 'penilai_proposal',
            timestamps: true,
        }
    );

    return PenilaiProposal;
};





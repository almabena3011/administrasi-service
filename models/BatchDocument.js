const { DataTypes, Model } = require('sequelize');
const moment = require('moment');

module.exports = (sequelize) => {
    class BatchDocument extends Model {
        static associate(models) {

        }
    }
    BatchDocument.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            batchId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            document_title: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            document_description: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            document_path: {
                type: DataTypes.STRING,
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
            modelName: 'BatchDocument',
            tableName: 'batch_document',
            timestamps: true,
        }
    );

    return BatchDocument;
};





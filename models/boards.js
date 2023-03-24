'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Boards extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.belongsTo(models.Posts, {
                targetKey: 'postId',
                foreignKey: 'postId',
                onDelete: 'CASCADE',
            });
        }
    }
    Boards.init(
        {
            boardId: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
            },
            postId: {
                allowNull: false,
                type: DataTypes.INTEGER,
            },
            img: {
                allowNull: true,
                type: DataTypes.STRING,
            },
            space: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            content: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            tags: {
                allowNull: true,
                type: DataTypes.STRING,
            },
            createdAt: {
                allowNull: false,
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
            },
            updatedAt: {
                allowNull: false,
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
            },
        },
        {
            sequelize,
            modelName: 'Boards',
        }
    );
    return Boards;
};

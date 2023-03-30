'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Posts extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.belongsTo(models.Users, {
                targetKey: 'userId',
                foreignKey: 'userId',
                onDelete: 'CASCADE',
            });
            this.hasMany(models.Comments, {
                sourceKey: 'postId',
                foreignKey: 'postId',
            });
            this.hasMany(models.Boards, {
                sourceKey: 'postId',
                foreignKey: 'postId',
            });
            this.hasMany(models.Likes, {
                sourceKey: 'postId',
                foreignKey: 'postId',
            });

            this.hasMany(models.Boards, {
                sourceKey: 'postId',
                foreignKey: 'postId',
            });
        }
    }
    Posts.init(
        {
            postId: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
            },
            userId: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            size: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            style: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            lifeType: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            viewCount: {
                allowNull: false,
                type: DataTypes.INTEGER,
                defaultValue: 0,
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
            modelName: 'Posts',
        }
    );
    return Posts;
};

const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db");

const Property = sequelize.define(
  "Property",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Title cannot be empty",
        },
      },
    },
    location: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Location cannot be empty",
        },
      },
    },
    type: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Property type cannot be empty",
        },
      },
    },
    price: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Price cannot be empty",
        },
      },
    },
    marketedBy: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: "marketed_by", // Database column name (snake_case)
    },
    initials: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING(500),
      allowNull: false,
      validate: {
        isUrl: {
          msg: "Image must be a valid URL",
        },
      },
    },
    isSponsored: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      field: "is_sponsored",
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      field: "is_active",
    },
  },
  {
    tableName: "properties",
    timestamps: true, // Adds createdAt and updatedAt
    underscored: true, // Use snake_case for auto-generated fields
    indexes: [
      {
        fields: ["is_sponsored", "is_active"], // Index for faster queries
      },
    ],
  }
);

module.exports = Property;

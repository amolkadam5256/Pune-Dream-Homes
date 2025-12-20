const sequelize = require("../config/db");

// Correct paths based on your structure
const User = require("../modules/users"); // since User.js is still in models
const Property = require("./properties/Property"); // Property.js is in modules/properties

// Associations
Property.belongsTo(User, { as: "owner", foreignKey: "ownerId" });
User.hasMany(Property, { as: "properties", foreignKey: "ownerId" });

module.exports = {
  sequelize,
  User,
  Property,
};

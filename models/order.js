const Sequelize = require("sequelize")
const sequelize = require("../util/database")

const Orders = sequelize.define("orders", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
})

module.exports = Orders
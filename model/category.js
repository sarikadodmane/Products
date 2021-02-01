"use strict"

const sequelize = require('sequelize');

module.exports = global.db.define('category', {
    id: {
        type: sequelize.UUID(45),
        defaultValue: sequelize.UUIDV1,
        primaryKey: true
    },
    name: sequelize.STRING(45),
    product_id : sequelize.UUID(45)
}, {
    tableName: 'category'
});

/*CREATE TABLE `fashion`.`category` (
  `id` VARCHAR(45) NOT NULL,
  `name` VARCHAR(45) NULL,
  `product_id` VARCHAR(45) NULL,
  PRIMARY KEY (`id`));*/
"use strict"

const sequelize = require('sequelize');

module.exports = global.db.define('product', {
    id: {
        type: sequelize.UUID(45),
        defaultValue: sequelize.UUIDV1,
        primaryKey: true
    },
    name: sequelize.STRING(45),
    description: sequelize.STRING(100),
    price: sequelize.FLOAT,
    images: sequelize.TEXT,
    category: sequelize.JSON,
    offer_expiry_date : sequelize.DATE,
    status: sequelize.TINYINT(2)
}, {
    tableName: 'product'
});

/*CREATE TABLE `fashion`.`product` (
  `id` VARCHAR(45) NOT NULL,
  `name` VARCHAR(45) NULL,
  `description` VARCHAR(100) NULL,
  `price` FLOAT NULL,
  `images` TEXT NULL,
  `category` JSON NULL,
  `offer_expiry_date` DATE NULL,
  `status` INT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE);*/
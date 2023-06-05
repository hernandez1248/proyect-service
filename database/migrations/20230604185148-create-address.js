'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Addresses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      street: {
        type: Sequelize.STRING
      },
      outNumber: {
        type: Sequelize.STRING
      },
      intNumber: {
        type: Sequelize.STRING
      },
      localityId: {
        type: Sequelize.INTEGER
      },
      customerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
        references: {
          model: 'Customers',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      }, 
      localityId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Localities',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
    await queryInterface.addIndex('Addresses', ['customerId']);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex('Addresses', ['customerId']);
    await queryInterface.dropTable('Addresses');
  }
};
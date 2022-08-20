'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable("transactions", {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
      },
      type: {
        type: Sequelize.TINYINT.UNSIGNED,
        allowNull: false,
        validate: {
          min: {
            args: [0],
            msg: "Type must be either 0 (request) or 1 (transfer)"
          },
          max: {
            args: [1],
            msg: "Type must be either 0 (request) or 1 (transfer)"
          }
        }
      },
      sender_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        references: {
          model: "users",
          key: "id"
        },
        onUpdate: "cascade",
        onDelete: "cascade"
      },
      receiver_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        references: {
          model: "users",
          key: "id"
        },
        onUpdate: "cascade",
        onDelete: "cascade"
      },
      amount: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false
      },
      status: {
        type: Sequelize.TINYINT,
        allowNull: false,
        validate: {
          min: {
            args: [-1],
            msg: "Status must be either -1 (declined), 0 (pending), or 1 (accepted)"
          },
          max: {
            args: [1],
            msg: "Status must be either -1 (declined), 0 (pending), or 1 (accepted)"
          }
        }
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: new Date()
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: new Date()
      }
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable("transactions");
  }
};

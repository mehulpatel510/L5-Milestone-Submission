// models/todo.js

"use strict";
const { Model, Op } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static async addTask(params) {
      return await Todo.create(params);
    }
    static async showList() {
      console.log("My Todo list \n");

      console.log("Overdue");
      // FILL IN HERE
      const overdueTodos = await Todo.findAll({
        where: {
          dueDate: {
            [Op.lt]: new Date()
          }
        }
      });
      const overdueTodoList = overdueTodos.map(todo => todo.displayableString()).join("\n");
      console.log(overdueTodoList);
      console.log("\n");

      console.log("Due Today");
      // FILL IN HERE
      const dueTodayTodos = await Todo.findAll({
        where: {
          dueDate: new Date()
        }
      });
      const dueTodayTodoList = dueTodayTodos.map(todo => todo.displayableString()).join("\n");
      console.log(dueTodayTodoList);
      console.log("\n");

      console.log("Due Later");
      // FILL IN HERE
      const dueLaterTodos = await Todo.findAll({
        where: {
          dueDate: {
            [Op.gt]: new Date()
          }
        }
      });
      const dueLaterTodoList = dueLaterTodos.map(todo => todo.displayableString()).join("\n");
      console.log(dueLaterTodoList);
      this.dueLater();

    }

    static async overdue() {
      // FILL IN HERE TO RETURN OVERDUE ITEMS
      try {
        const todos = await Todo.findAll({
          where: {
            dueDate: {
              [Op.lt]: new Date()
            }
          }
        });
        return todos;
      }
      catch (error) {
        console.log(error);
      }


    }

    static async dueToday() {
      // FILL IN HERE TO RETURN ITEMS DUE tODAY
      try {
        const todos = await Todo.findAll({
          where: {
            dueDate: new Date()
          }
        });
        return todos;

      }
      catch (error) {
        console.log(error);
      }

    }

    static async dueLater() {
      // FILL IN HERE TO RETURN ITEMS DUE LATER
      try {
        const todos = await Todo.findAll({
          where: {
            dueDate: {
              [Op.gt]: new Date()
            }
          }
        });
        return todos;

      }
      catch (error) {
        console.log(error);
      }

    }

    static async markAsComplete(id) {
      // FILL IN HERE TO MARK AN ITEM AS COMPLETE
      try {
        await Todo.update({ completed: true }, {
          where: {
            id: id
          }
        });
      }
      catch (error) {
        console.log(error);
      }
    }

    displayableString() {
      let checkbox = this.completed ? "[x]" : "[ ]";
      let dateString = this.dueDate == new Date().toLocaleDateString("en-CA") ? "" : this.dueDate;        
      return `${this.id}. ${checkbox} ${this.title} ${ dateString}`;
    }
  }
  Todo.init(
    {
      title: DataTypes.STRING,
      dueDate: DataTypes.DATEONLY,
      completed: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Todo",
    }
  );
  return Todo;
};

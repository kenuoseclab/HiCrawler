const mongoose   = require("mongoose");
const { Schema } = mongoose;
const SchemaCommon    = require("../../mod_base");
const { BaseSchema } = SchemaCommon;
const { Mixed }   = Schema.Types;

const Task = new BaseSchema({
  taskId:                         { type: String, description: "task id"},
  body:                           { type: Mixed, description: "Body" }
});

module.exports = Task;
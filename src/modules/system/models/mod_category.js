const SchemaCommon    = require("../../mod_base");
const { BaseSchema } = SchemaCommon;

const Category = new BaseSchema({
  name:            { type: String, description: "目录名" },
});

module.exports = Category;
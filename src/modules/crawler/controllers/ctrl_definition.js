const _           = require("lodash");
const createError = require("http-errors");
const Joi         = require("joi");
const DefSchema   = require("../models/mod_definition");
const Model       = require("../../../core/model");
const log         = require("../../../core/logger");
const constant    = require("../../../core/constant");

const { DB_NAME_CRAWLER, SCHEMA_CATEGORY, VALID } = constant;
const CategoryModel = new Model(DB_NAME_CRAWLER, SCHEMA_CATEGORY, DefSchema);

const categoryValidate = (obj) => {
  const schema = Joi.object({
    name: Joi.string().trim().required(),
  });

  const output = Joi.validate(obj, schema, { allowUnknown: true });
  if (output.error) {
    throw new createError.BadRequest(__("modules.system.category.name.invalid"));
  }
};

exports.list = async (req) => {
  log.info("category.list() start.");

  try {
    const result = await CategoryModel.getList({ valid: VALID }, "", 0, MOD_FIND_MAX_LIMIT, "createdAt");
    log.info("category.list() end.");
    log.operation("list", "category have been get successfully!", req.user);
    return result;
  } catch (err) {
    throw err;
  }
};
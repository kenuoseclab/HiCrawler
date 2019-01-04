const _           = require("lodash");
const createError = require("http-errors");
const Joi         = require("joi");
const DefSchema   = require("../models/mod_definition");
const Model       = require("../../../core/model");
const log         = require("../../../core/logger");
const constant    = require("../../../core/constant");

const { DB_NAME_CRAWLER, SCHEMA_DEFINITION, VALID, MOD_FIND_DEFAULT_SKIP, MOD_FIND_DEFAULT_LIMIT } = constant;
const DefModel = new Model(DB_NAME_CRAWLER, SCHEMA_DEFINITION, DefSchema);

const defValidate = (obj) => {
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
    const result = await DefModel.getList({ valid: VALID }, "", MOD_FIND_DEFAULT_SKIP, MOD_FIND_DEFAULT_LIMIT, "createdAt");
    log.info("category.list() end.");
    log.operation("list", "category have been get successfully!", req.user);
    return result;
  } catch (err) {
    throw err;
  }
};

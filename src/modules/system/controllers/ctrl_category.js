const _           = require("lodash");
const createError = require("http-errors");
const Joi         = require("joi");
const UserSchema  = require("../models/mod_user");
const Model       = require("../../../core/model");
const log         = require("../../../core/logger");
const constant    = require("../../../core/constant");

const { DB_NAME_CRAWLER, SCHEMA_CATEGORY, VALID, MOD_FIND_MAX_LIMIT } = constant;
const CategoryModel = new Model(DB_NAME_CRAWLER, SCHEMA_CATEGORY, UserSchema);

const categoryValidate = (obj) => {
  const schema = Joi.object({
    name: Joi.string().trim().required(),
  });

  const output = Joi.validate(obj, schema, { allowUnknown: true });
  if (output.error) {
    throw new createError.BadRequest(__("modules.system.category.name.invalid"));
  }
};

exports.create = async (req) => {
  log.info("category.create() start.");

  const { _id, fullName } = req.user;
  const { name } = req.body;

  categoryValidate(req.body);

  try {
    const obj = { name };
    obj.createdAt = obj.updatedAt = new Date();
    obj.createdBy = obj.updatedBy = { _id, fullName };
    obj.valid = VALID;
    await CategoryModel.create(obj);
    log.info("category.create() end.");
    log.operation("create", "category have been created successfully!", req.user);
  } catch (err) {
    throw err;
  }
};

exports.update = async (req) => {
  log.info("category.update() start.");

  const { _id, fullName } = req.user;
  const { cId } = req.params;
  const { name } = req.body;

  categoryValidate(req.body);

  try {
    const obj = { name };
    obj.updatedAt = new Date();
    obj.updatedBy = { _id, fullName };
    await CategoryModel.update(cId, obj);
    log.info("category.update() end.");
    log.operation("update", "category have been updated successfully!", req.user);
  } catch (err) {
    throw err;
  }
};

exports.remove = async (req) => {
  log.info("category.remove() start.");

  const { _id, fullName } = req.user;
  const { cId } = req.params;

  try {
    const obj = {
      updatedAt: new Date(),
      updatedBy: { _id, fullName }
    };
    await CategoryModel.remove(cId, obj);
    log.info("category.remove() end.");
    log.operation("remove", "category have been removed successfully!", req.user);
  } catch (err) {
    throw err;
  }
};

exports.list = async (req) => {
  log.info("category.list() start.");

  try {
    const result = await CategoryModel.getList({ valid: VALID }, "", 0, MOD_FIND_MAX_LIMIT, "");
    log.info("category.list() end.");
    log.operation("list", "category have been get successfully!", req.user);
    return result;
  } catch (err) {
    throw err;
  }
};
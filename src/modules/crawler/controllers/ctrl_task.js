const _           = require("lodash");
const createError = require("http-errors");
const Joi         = require("joi");
const TaskSchema  = require("../models/mod_task");
const TaskHistory = require("../models/mod_task_history");
const Model       = require("../../../core/model");
const log         = require("../../../core/logger");
const constant    = require("../../../core/constant");

const { DB_NAME_CRAWLER, SCHEMA_TASK, SCHEMA_TASK_HISTORY, VALID, MOD_FIND_DEFAULT_SKIP, MOD_FIND_DEFAULT_LIMIT } = constant;
const TaskModel = new Model(DB_NAME_CRAWLER, SCHEMA_TASK, TaskSchema);
const TaskHistoryModel = new Model(DB_NAME_CRAWLER, SCHEMA_TASK_HISTORY, TaskHistory);

const taskValidate = (obj) => {
  const schema = Joi.object({
    name: Joi.string().trim().required(),
  });

  const output = Joi.validate(obj, schema, { allowUnknown: true });
  if (output.error) {
    throw new createError.BadRequest(__("modules.system.task.name.invalid"));
  }
};

exports.create = async (req) => {
  log.info("task.create() start.");
  const { name, comment } = req.body;
  taskValidate(req.body);

  try {
    const obj  = { basicInfo: {name, comment} };
    obj.valid = VALID;
    obj.createdAt = obj.updatedAt = new Date();
    obj.createdBy = obj.updatedBy = req.user.name;
    const newTask = await TaskModel.create(obj);
    log.info("task.create() end.");
    log.operation("task", "create success!", name);
    return newTask;
  } catch (err) {
    throw err;
  }
};

exports.get = async (req) => {
  log.info("task.list() get.");
  try {
    const { name } = req.user;
    const { id } = req.params;
    let result = undefined;
    if (id) {
      const projection = "-valid -updatedAt -updatedBy -createdAt -createdBy -_id -__v";
      result = await TaskModel.get(id, projection);
    }

    log.info("task.get() end.");
    log.operation("get", "task have been get successfully!", name);
    return result;
  } catch (err) {
    throw err;
  }
};

exports.update = async (req) => {
  log.info("task.update() update.");
  try {
    const { name } = req.user;
    const { id } = req.params;
    const { detail } = req.body;
    let result = undefined;
    if (id) {
      // todo check

      if (detail.urls && detail.urls.url) {
        detail.urls.urlItems = detail.urls.url.split(/[\n]/);
      }
      const today = new Date();
      const condition = { _id: id, createdBy: name };
      result = await TaskModel.updateByCondition(condition, {...detail, updatedAt: today});

      const history = {
        taskId: id,
        body: detail,
        valid: 1,
      };

      history.createdAt = history.updatedAt = today;
      history.createdBy = history.updatedBy = req.user.name;
      await TaskHistoryModel.create(history);
    }

    log.info("task.update() end.");
    log.operation("update", "task have been updated successfully!", name);
    return result;
  } catch (err) {
    throw err;
  }
};

exports.list = async (req) => {
  log.info("task.list() start.");
  try {
    const { name } = req.user;
    const condition = { valid: VALID, createdBy: name};
    const projection = "basicInfo.name basicInfo.comment updatedAt";
    const result = await TaskModel.getList(condition, projection, MOD_FIND_DEFAULT_SKIP, MOD_FIND_DEFAULT_LIMIT, "createdAt");
    log.info("task.list() end.");
    log.operation("list", "task have been get successfully!", name);
    return result;
  } catch (err) {
    throw err;
  }
};

exports.getHistory = async (req) => {
  log.info("task.list() get.");
  try {
    const { name } = req.user;
    const { id, skip, limit } = req.params;
    let result = undefined;
    if (id) {
      const projection = "createdAt createdBy";
      const condition = {"taskId": id, createdBy: name};
      const total = await TaskHistoryModel.count(condition);
      const items = await TaskHistoryModel.getList(condition, projection, skip, limit, "-createdAt");
      result = { total, items };
    }

    log.info("task.get() end.");
    log.operation("get", "task have been get successfully!", name);
    return result;
  } catch (err) {
    throw err;
  }
};

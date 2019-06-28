const express        = require("express");
const router         = express.Router();
const response       = require("../core/response");
const ctrlTask       = require("../modules/crawler/controllers/ctrl_task");
const ctrlDef        = require("../modules/crawler/controllers/ctrl_definition");

router.get("/definitions/", async (req, res) => {
  try {
    const result = await ctrlDef.list(req);
    response.sendSuccess(res, result);
  } catch (err) {
    response.sendError(res, err);
  }
});

router.get("/", async (req, res) => {
  try {
    const result = await ctrlTask.list(req);
    response.sendSuccess(res, result);
  } catch (err) {
    response.sendError(res, err);
  }
});

router.get("/history/:id", async (req, res) => {
  try {
    const result = await ctrlTask.getHistory(req);
    response.sendSuccess(res, result);
  } catch (err) {
    response.sendError(res, err);
  }
});

router.get("/detail/:id", async (req, res) => {
  try {
    const result = await ctrlTask.get(req);
    response.sendSuccess(res, result);
  } catch (err) {
    response.sendError(res, err);
  }
});

router.put("/detail/:id", async (req, res) => {
  try {
    const result = await ctrlTask.update(req);
    response.sendSuccess(res, result);
  } catch (err) {
    response.sendError(res, err);
  }
});

router.post("/", async (req, res) => {
  try {
    const result = await ctrlTask.create(req);
    response.sendSuccess(res, result);
  } catch (err) {
    response.sendError(res, err);
  }
});

module.exports = router;
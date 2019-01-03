const express        = require("express");
const router         = express.Router();
const response       = require("../core/response");
const ctrlUser       = require("../modules/system/controllers/ctrl_user");
const ctrlCategory   = require("../modules/system/controllers/ctrl_category");

router.get("/logout", async (req, res) => {
  try {
    const result = await ctrlUser.logout(req);
    response.sendSuccess(res, result);
  } catch (err) {
    response.sendError(res, err);
  }
});

router.post("/categories", async (req, res) => {
  try {
    const result = await ctrlCategory.create(req);
    response.sendSuccess(res, result);
  } catch (err) {
    response.sendError(res, err);
  }
});

router.put("/categories/:cId", async (req, res) => {
  try {
    const result = await ctrlCategory.update(req);
    response.sendSuccess(res, result);
  } catch (err) {
    response.sendError(res, err);
  }
});

router.delete("/categories/:cId", async (req, res) => {
  try {
    const result = await ctrlCategory.remove(req);
    response.sendSuccess(res, result);
  } catch (err) {
    response.sendError(res, err);
  }
});

router.get("/categories/", async (req, res) => {
  try {
    const result = await ctrlCategory.list(req);
    response.sendSuccess(res, result);
  } catch (err) {
    response.sendError(res, err);
  }
});

module.exports = router;
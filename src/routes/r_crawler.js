const express        = require("express");
const router         = express.Router();
const response       = require("../core/response");
const ctrlDef        = require("../modules/crawler/controllers/ctrl_definition");

router.get("/definitions/", async (req, res) => {
  try {
    const result = await ctrlDef.list(req);
    response.sendSuccess(res, result);
  } catch (err) {
    response.sendError(res, err);
  }
});

module.exports = router;
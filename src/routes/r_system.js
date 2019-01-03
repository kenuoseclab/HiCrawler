const express    = require("express");
const router     = express.Router();
const response   = require("../core/response");
const ctrlUser   = require("../modules/system/controllers/ctrl_user");

router.get("/logout", async (req, res) => {
  try {
    const result = await ctrlUser.logout(req);
    response.sendSuccess(res, result);
  } catch (err) {
    response.sendError(res, err);
  }
});

module.exports = router;
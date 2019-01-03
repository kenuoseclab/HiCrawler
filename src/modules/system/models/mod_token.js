const mongoose   = require("mongoose");
const { Schema } = mongoose;

const Token = new Schema({
  token:           { type: String, description: "" },
  user:            { type: Schema.Types.Mixed, description: "" },
  expires:         { type: Date, description: "" }
});

module.exports = Token;
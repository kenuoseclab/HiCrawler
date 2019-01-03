const os          = require("os");
const _           = require("lodash");
const crypto      = require("crypto");
const config      = require("../../config/app");

exports.ip = () => {

  if (global.addresses) {
    return global.addresses;
  }

  let interfaces = os.networkInterfaces()
    , addresses = [];

  _.each(interfaces, function(item) {
    _.each(item, function(address) {
      if (address.family === "IPv4" && !address.internal) {
        addresses.push(address.address);
      }
    });
  });

  global.addresses = addresses[0];
  return global.addresses;
};

exports.sha256 = (str) => {
  if (str) {
    return crypto.createHmac("sha256", config.tokenSecret).update(str).digest("hex");
  } else {
    return "";
  }
};
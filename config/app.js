module.exports = {
  name: "crawler",
  alias: "crawler",
  port: process.env.PORT || 3000,
  tokenHeader: "x-token-crawler",
  tokenSecret: process.env.TOKEN || "crawler",
  tokenLength: 32,
  tokenExpires: 24 * 60 * 60 * 1000, // 24h
};
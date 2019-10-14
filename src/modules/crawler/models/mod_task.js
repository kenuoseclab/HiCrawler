const mongoose = require('mongoose');
const SchemaCommon    = require("../../mod_base");
const { BaseSchema } = SchemaCommon;

const { Schema } = mongoose;
const { Mixed }   = Schema.Types;

const Collector = new Schema({
  name:                           { type: String, description: "" },
  key:                            { type: String, description: "" },
  pageCollectMode:                { type: String, description: "" },
  pageCollectResultDelimiter:     { type: String, description: "" },
  type:                           { type: String, description: "" },
  typeInfo:                       { type: Mixed,  description: "" },
  processors:                     [{ type: Mixed,  description: "" }],
  filter:                         {
    matchMode:                    { type: String, description: "" },
    predicates:                   [{ type: Mixed,  description: "" }],
  },
});

const Task = new BaseSchema({
  basicInfo:                      {
    name:                         { type: String, description: "任务名" },
    comment:                      { type: String, description: "备考" },
    stopAt404:                    { type: Boolean, description: "访问URL返回404时，是否停止采集", default: true },
    enableRender:                 { type: Boolean, description: "对于返回的画面，是否执行渲染并执行js", default: false },
    charset:                      { type: String, description: "响应页面的字符集", default: "UTF-8" },
    readTimeout:                  { type: Number, description: "请求读取的超时时间，单位：秒", default: 60 },
    requestInterval:              { type: Number, description: "请求间隔时间，单位：毫秒", default: 0 },
    userAgent:                    { type: String, description: "请求时使用的User-Agent头" },
    collectorsMatchMode:          { type: String, description: "匹配模式（ANY：任意匹配，ALL：全部匹配）", default: 'ALL' },
    httpHeaders:                  { type: String, description: "请求头设定" },
    proxy:                        {
      host:                       { type: String, description: "服务器地址" },
      port:                       { type: String, description: "端口" },
      userName:                   { type: String, description: "用户名" },
      password:                   { type: String, description: "密码" },
    },
  },
  urls:                           {
    type:                         { type: String, description: "URL集合类型", default: "PlainUrlSet" },
    urls:                          { type: String, description: "URL" },
    templatedUrls:                [{
      key:                        { type: String, description: "URL" },
      template:                   { type: String, description: "URL" },
      params:                     [{ type: Mixed,  description: "" }]
    }]
  },
  pagingResolver: {
    type:                         { type: String, description: "" },
    typeInfo:                     { type: Mixed,  description: "" },
    processors:                   [{ type: Mixed,  description: "" }],
  },
  collectors:                     [ Collector ],
});

module.exports = Task;

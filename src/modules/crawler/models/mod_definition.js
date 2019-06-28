const mongoose = require('mongoose');
const SchemaCommon    = require("../../mod_base");
const { BaseSchema } = SchemaCommon;

const { Schema } = mongoose;
const { Mixed }   = Schema.Types;

const URL = new Schema({
  url:                            { type: String, description: "请求Url" },
  params:                         { type: Mixed,  description: "URL参数定义集合" },
});

const Collector = new Schema({
  name:                           { type: String, description: "" },
  key:                            { type: String, description: "" },
  type:                           { type: String, description: "" },
  pageCollectMode:                { type: String, description: "" },
  pageCollectResultDelimiter:     { type: String, description: "" },
  cssSelector:                    { type: String, description: "" },
  attributeName:                  { type: String, description: "" },
  joinMulti:                      { type: Number, description: "" },
  delimiter:                      { type: String, description: "" },
});

const Consumer = new Schema({
  type:                           { type: String, description: "" },
  filePath:                       { type: String, description: "" },
});

const Definition = new BaseSchema({
  basicInfo:                      {
    category:                     { type: String, description: "目录ID" },
    name:                         { type: String, description: "任务名" },
    stopAt404:                    { type: Boolean, description: "访问URL返回404时，是否停止采集" },
    enableRender:                 { type: Boolean, description: "对于返回的画面，是否执行渲染并执行js" },
    charset:                      { type: String, description: "响应页面的字符集" },
    readTimeout:                  { type: Number, description: "请求读取的超时时间，单位：秒" },
    requestInterval:              { type: Number, description: "请求间隔时间，单位：毫秒" },
    userAgent:                    { type: String, description: "请求时使用的User-Agent头" },
    collectorsMatchMode:          { type: String, description: "匹配模式（ANY：任意匹配，ALL：全部匹配）" },
    httpHeaders:                  { type: String, description: "请求头设定" },
    proxy:                        {
      host:                       { type: String, description: "服务器地址" },
      port:                       { type: String, description: "端口" },
      userName:                   { type: String, description: "用户名" },
      password:                   { type: String, description: "密码" },
    },
  },
  urls:                           {
    type:                         { type: String, description: "URL集合类型" },
    urls:                         [ URL ],
  },
  pagingResolver: {
    type:                         { type: String, description: "" },
    leftPadLength:                { type: Number, description: "" },
    cssSelector:                  { type: String, description: "" },
    urlAttributeName:             { type: String, description: "" },
  },
  collectors:                     [ Collector ],
  consumers:                      [ Consumer ],
});

module.exports = Definition;
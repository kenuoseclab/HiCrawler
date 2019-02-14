// client router
export const ROUTE_LOGIN = '/login';
export const ROUTE_HOME = '/home';
export const ROUTE_ERROR = '/error';
export const ROUTE_CRAWLER_ADD = '/crawler/add';

// api list
export const API_LOGIN = '/login';
export const API_CATEGORY = '/categories';



export const processors = [
  {
    name: "为内容添加前缀的处理器",
    key: "AddPrefixProcessor",
    items: [
      { title: "前缀", key: "prefix", type: "input" }
    ]
  },
  {
    name: "为内容添加后缀的处理器",
    key: "AddSuffixProcessor",
    items: [
      { title: "后缀", key: "suffix", type: "input" }
    ]
  },
  {
    name: "提取html中的文本内容的处理器",
    key: "ConvertHtmlToPlainTextProcessor",
    items: []
  },
  {
    name: "将内容转换为拼音，或为内容标注拼音的处理器",
    key: "ConvertToPinyinProcessor",
    items: [
      { title: "输出模式", key: "outputMode", type: "radio", values: [{ key: "", value: ""}] },
      { title: "音调类型", key: "toneType", type: "textarea" },
      { title: "拼音的首字母是否转化为大写", key: "firstCharToUpperCase", type: "textarea" },
      { title: "拼音间的分隔符", key: "separator", type: "textarea" }
    ]
  },
  {
    name: "将内容转换为简体中文的处理器",
    key: "",
    items: [
      { title: "", type: "checkbox" }
    ]
  },
  {
    name: "将内容转化为繁体字的处理器",
    key: "",
    items: [
      { title: "", type: "checkbox" }
    ]
  },
  {
    name: "默认值处理器。输入值为空时，输出指定的默认值",
    key: "",
    items: [
      { title: "默认值", type: "input" }
    ]
  },
  {
    name: "将日期（时间）由一种格式转化为另一种格式的处理器",
    key: "",
    items: [
      { title: "源日期格式", type: "input" },
      { title: "目标日期格式", type: "input" }
    ]
  },
  {
    name: "使用指定的javascript来处理输入内容的处理器",
    key: "",
    items: [
      { title: "字符串", type: "textarea" }
    ]
  },
  {
    name: "从输入内容中提取关键词的处理器",
    key: "",
    items: [
      { title: "关键词个数", type: "input" },
      { title: "关键词分隔符", type: "input" }
    ]
  },
  {
    name: "执行正则替换的处理器",
    key: "",
    items: [
      { title: "用来匹配输入内容的正则表达式", type: "input" },
      { title: "用来替换每个匹配项的字符串", type: "input" }
    ]
  },
  {
    name: "简单的正则替换处理器",
    key: "",
    items: [
      { title: "用来匹配输入内容的正则表达式", type: "input" },
      { title: "用来替换每个匹配项的字符串", type: "input" }
    ]
  },
  {
    name: "根据指定的替换关系执行简单替换的处理器",
    key: "",
    items: [
      { title: "替换关系表", type: "textarea" }
    ]
  },
  {
    name: "截取指定的分隔符之后的字符串子串的处理器",
    key: "",
    items: [
      { title: "分隔符", type: "input" },
      { title: "重复时是否取最后出现的位置", type: "select", values: ["是"] }
    ]
  },
  {
    name: "截取指定的分隔符之前的字符串子串的处理器",
    key: "",
    items: [
      { title: "分隔符", type: "input" },
      { title: "重复时是否取最后出现的位置", type: "select", values: ["是"] }
    ]
  },
  {
    name: "提取指定的开始字符串和结束字符串之间的字符串的处理器",
    key: "",
    items: [
      { title: "开始字符串", type: "input" },
      { title: "结束字符串", type: "input" }
    ]
  },
  {
    name: "截取字符串子串的处理器",
    key: "",
    items: [
      { title: "开始位置，包含", type: "input" },
      { title: "结束位置，不包含", type: "input" }
    ]
  },
  {
    name: "从中文数据中提取摘要的处理器",
    key: "",
    items: [
      { title: "摘要长度", type: "input" }
    ]
  },
  {
    name: "去除字符串的前导和后缀控制字符的处理器",
    key: "",
    items: [
      { title: "", type: "checkbox" }
    ]
  },
];

export const filters = [];

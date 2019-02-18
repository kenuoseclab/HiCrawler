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
    name: '为内容添加前缀的处理器',
    key: 'AddPrefixProcessor',
    items: [{ title: '前缀', key: 'prefix', type: 'input' }],
  },
  {
    name: '为内容添加后缀的处理器',
    key: 'AddSuffixProcessor',
    items: [{ title: '后缀', key: 'suffix', type: 'input' }],
  },
  {
    name: '提取html中的文本内容的处理器',
    key: 'ConvertHtmlToPlainTextProcessor',
    items: [],
  },
  {
    name: '将内容转换为拼音，或为内容标注拼音的处理器',
    key: 'ConvertToPinyinProcessor',
    items: [
      {
        title: '输出模式',
        key: 'outputMode',
        type: 'radio',
        values: [{ key: 'append', value: '标注模式' }, { key: 'convert', value: '转化模式' }],
      },
      {
        title: '音调类型',
        key: 'toneType',
        type: 'radio',
        values: [
          { key: 'mark', value: '符号音调' },
          { key: 'number', value: '数字音调' },
          { key: 'none', value: '无音调' },
        ],
      },
      { title: '拼音的首字母是否转化为大写', key: 'firstCharToUpperCase', type: 'radio' },
      { title: '拼音间的分隔符', key: 'separator', type: 'input' },
    ],
  },
  {
    name: '将内容转换为简体中文的处理器',
    key: 'ConvertToSimplifiedChineseProcessor',
    items: [{ title: '', type: 'checkbox' }],
  },
  {
    name: '将内容转化为繁体字的处理器',
    key: 'ConvertToTraditionalChineseProcessor',
    items: [{ title: '', type: 'checkbox' }],
  },
  {
    name: '默认值处理器。输入值为空时，输出指定的默认值',
    key: 'DefaultValueProcessor',
    items: [{ title: '默认值', type: 'input' }],
  },
  {
    name: '将日期（时间）由一种格式转化为另一种格式的处理器',
    key: 'FormatDateProcessor',
    items: [
      { title: '源日期格式', key: 'fromFormat', type: 'input' },
      { title: '目标日期格式', key: 'toFormat', type: 'input' },
    ],
  },
  {
    name: '使用指定的javascript来处理输入内容的处理器',
    key: 'JavaScriptProcessor',
    items: [{ title: '字符串', key: 'javascript', type: 'textarea' }],
  },
  {
    name: '从输入内容中提取关键词的处理器',
    key: 'KeywordsProcessor',
    items: [
      { title: '关键词个数', key: 'count', type: 'input' },
      { title: '关键词分隔符', key: 'separator', type: 'input' },
    ],
  },
  {
    name: '执行正则替换的处理器',
    key: 'RegexReplaceProcessor',
    items: [
      { title: '用来匹配输入内容的正则表达式', key: 'regex', type: 'input' },
      { title: '用来替换每个匹配项的字符串', key: 'replacement', type: 'input' },
    ],
  },
  {
    name: '简单的正则替换处理器',
    key: 'SimpleRegexReplaceProcessor',
    items: [
      { title: '用来匹配输入内容的正则表达式', key: 'regex', type: 'input' },
      { title: '用来替换每个匹配项的字符串', key: 'replacement', type: 'input' },
    ],
  },
  {
    name: '根据指定的替换关系执行简单替换的处理器',
    key: 'SimpleReplaceProcessor',
    items: [{ title: '替换关系表', key: 'replaceMap', type: 'textarea' }],
  },
  {
    name: '截取指定的分隔符之后的字符串子串的处理器',
    key: 'SubstringAfterProcessor',
    items: [
      { title: '分隔符', key: 'separator', type: 'input' },
      { title: '重复时是否取最后出现的位置', key: 'afterLast', type: 'checkbox' },
    ],
  },
  {
    name: '截取指定的分隔符之前的字符串子串的处理器',
    key: 'SubstringBeforeProcessor',
    items: [
      { title: '分隔符', key: 'separator', type: 'input' },
      { title: '重复时是否取最后出现的位置', key: 'beforeLast', type: 'checkbox' },
    ],
  },
  {
    name: '提取指定的开始字符串和结束字符串之间的字符串的处理器',
    key: 'SubstringBetweenProcessor',
    items: [{ title: '开始字符串', key: 'open', type: 'input' }, { title: '结束字符串', key: 'close', type: 'input' }],
  },
  {
    name: '截取字符串子串的处理器',
    key: 'SubstringProcessor',
    items: [
      { title: '开始位置，包含', key: 'start', type: 'input' },
      { title: '结束位置，不包含', key: 'end', type: 'input' },
    ],
  },
  {
    name: '从中文数据中提取摘要的处理器',
    key: 'SummaryChineseProcessor',
    items: [{ title: '摘要长度', key: 'length', type: 'input' }],
  },
  {
    name: '去除字符串的前导和后缀控制字符的处理器',
    key: 'TrimProcessor',
    items: [],
  },
];

export const filters = [
  {
    name: '判定字符串是否为空的布尔值函数',
    key: 'BlankStringPredicate',
    items: [],
  },
  {
    name: '判断字符串是否包含指定的字符串的布尔值函数',
    key: 'ContainsStringPredicate',
    items: [
      {
        title: '匹配模式',
        key: 'matchMode',
        type: 'radio',
        values: [{ key: 'any', value: '任意' }, { key: 'all', value: '全部' }],
      },
      {
        title: '字符串列表',
        key: 'strings',
        type: 'inputs',
      },
    ],
  },
  {
    name: '判定字符串是否为空的布尔值函数',
    key: 'EqualsStringPredicate',
    items: [
      {
        title: '字符串列表',
        key: 'strings',
        type: 'inputs',
      },
    ],
  },
  {
    name: '判断字符串是否以指定的字符串为后缀的布尔值函数',
    key: 'EndsWithStringPredicate',
    items: [
      {
        title: '字符串列表',
        key: 'strings',
        type: 'inputs',
      },
    ],
  },
  {
    name: '判定字符串是否非空的布尔值函数',
    key: 'NotBlankStringPredicate',
    items: [],
  },
  {
    name: '判定字符串是否不包含指定的字符串布尔值函数',
    key: 'NotContainsStringPredicate',
    items: [
      {
        title: '字符串列表',
        key: 'strings',
        type: 'inputs',
      },
    ],
  },
  {
    name: '判定输入的字符串是否不等于给定的字符串的布尔值函数',
    key: 'NotEqualsStringPredicate',
    items: [
      {
        title: '字符串列表',
        key: 'strings',
        type: 'inputs',
      },
    ],
  },
  {
    name: '判定字符串是否以给定的字符串为前缀的布尔值函数',
    key: 'StartsWithStringPredicate',
    items: [
      {
        title: '字符串列表',
        key: 'strings',
        type: 'inputs',
      },
    ],
  },
  {
    name: '使用javascript开判定字符串是否满足要求的布尔值函数',
    key: 'JavaScriptPredicate',
    items: [
      {
        title: '判断用的javascript代码',
        key: 'javascript',
        type: 'textarea',
      },
    ],
  },
  {
    name: '简单的数值判定布尔值函数',
    key: 'SimpleNumberPredicate',
    items: [
      {
        title: '判定符',
        key: 'operator',
        type: 'select',
        values: [
          { key: 'EQUALS', value: '等于' },
          { key: 'NOT_EQUALS', value: '不等于' },
          { key: 'GREAT_THAN', value: '大于' },
          { key: 'GREAT_EQUALS_THAN', value: '大于等于' },
          { key: 'LESS_THAN', value: '小于' },
          { key: 'LESS_EQUALS_THAN', value: '小于等于' },
        ],
      },
      {
        title: '判定符右侧的数值',
        key: 'number',
        type: 'input',
      },
    ],
  },
  {
    name: '简单的日期判定布尔值函数',
    key: 'SimpleDatePredicate',
    items: [
      {
        title: '判定符',
        key: 'operator',
        type: 'select',
        values: [
          { key: 'EQUALS', value: '等于' },
          { key: 'NOT_EQUALS', value: '不等于' },
          { key: 'GREAT_THAN', value: '大于' },
          { key: 'GREAT_EQUALS_THAN', value: '大于等于' },
          { key: 'LESS_THAN', value: '小于' },
          { key: 'LESS_EQUALS_THAN', value: '小于等于' },
        ],
      },
      {
        title: '判定符右侧的日期',
        key: 'date',
        type: 'input',
      },
      {
        title: '日期的格式',
        key: 'format',
        type: 'input',
      },
    ],
  },
];

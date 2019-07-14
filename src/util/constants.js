// client router
export const ROUTE_LOGIN = '/login';
export const ROUTE_DASHBOARD = '/dashboard';
export const ROUTE_TASK_LIST = '/task/list';
export const ROUTE_TASK_DETAIL = '/task/detail';
export const ROUTE_SETTING = '/setting';
export const ROUTE_ERROR = '/error';

// api list
export const API_LOGIN = '/login';
export const API_TASK_LIST = '/task';
export const API_TASK_HISTORY = '/task/history';
export const API_TASK_NEW = '/task';
export const API_TASK_DETAIL = '/task/detail';

// url template form
export const URL_TEMPLATE_TYPE = [
  {
    name: '序列',
    key: 'SequenceUrlParam',
    items: [
      {
        title: '参数名',
        key: 'name',
        required: true,
        type: 'input',
        data: [],
        copy: true,
      },
      {
        title: '初始值',
        key: 'start',
        required: true,
        type: 'number',
        data: [],
      },
      {
        title: '最大值',
        key: 'end',
        required: true,
        type: 'number',
        data: [],
      },
      {
        title: '步增',
        key: 'step',
        required: true,
        type: 'number',
        data: [],
      },
      {
        title: '长度',
        key: 'leftPadLength',
        required: false,
        type: 'number',
        data: [],
        desc: '数值小于此长度时，左端补0',
      },
    ],
  },
  {
    name: '枚举',
    key: 'EnumUrlParam',
    items: [
      {
        title: '参数名',
        key: 'name',
        required: true,
        type: 'input',
        data: [],
        copy: true,
      },
      {
        title: '枚举值',
        key: 'values',
        required: true,
        type: 'textarea',
        data: [],
        extra: '一行一个',
      },
    ],
  },
  {
    name: '日期',
    key: 'DateUrlParam',
    items: [
      {
        title: '参数名',
        key: 'name',
        required: true,
        type: 'input',
        data: [],
        copy: true,
      },
      {
        title: '开始日期',
        key: 'startDate',
        required: true,
        type: 'urlForm',
        data: [],
      },
    ],
  },
];

// collector
export const COLLECTOR_TYPE = [
  {
    name: '请求网址',
    key: 'UrlParamCollector',
    items: [
      {
        title: '类型',
        key: 'partType',
        required: true,
        type: 'select',
        data: [
          { name: 'URL整体', value: 'all' },
          { name: '协议', value: 'protocol' },
          { name: '主机名或IP地址', value: 'host' },
          { name: '端口号', value: 'port' },
          { name: '相对路径', value: 'path' },
          { name: '相对路径分部', value: 'pathPart' },
          { name: '请求参数（同名参数有多个时，用半角逗号连接）', value: 'queryParam' },
          { name: '所有参数（即问号之后井号之前的部分）', value: 'queryParams' },
          { name: '问号之前的部分', value: 'beforeQMark' },
          { name: '问号之后的部分', value: 'afterQMark' },
          { name: '井号之前的部分', value: 'beforeHash' },
          { name: '井号之后的部分', value: 'afterHash' },
        ],
      },
      {
        title: '参数名',
        key: 'pathPartIndex',
        required: false,
        type: 'number',
        data: [],
      },
      {
        title: '分部位置',
        key: 'queryParamName',
        required: false,
        type: 'input',
        data: [],
      },
    ],
  },
  {
    name: '响应体-抽取网址',
    key: 'SimpleUrlCollector',
    items: [
      {
        title: 'CSS选择器',
        key: 'cssSelector',
        required: true,
        type: 'input',
        data: [],
      },
    ],
  },
  {
    name: '响应体-CSS选择器',
    key: 'HtmlDomCollector',
    items: [
      {
        title: 'CSS选择器',
        key: 'cssSelector',
        required: false,
        type: 'input',
        data: [],
      },
      {
        title: '属性名',
        key: 'attributeName',
        required: false,
        type: 'input',
        data: [],
      },
      {
        title: '多值连接',
        key: 'joinMulti',
        required: false,
        type: 'switch',
        data: [],
      },
      {
        title: '连接符',
        key: 'delimiter',
        required: false,
        type: 'input',
        data: [],
      },
    ],
  },
  {
    name: '响应头',
    key: 'HttpHeaderCollector',
    items: [
      {
        title: '名称',
        key: 'headerName',
        required: true,
        type: 'input',
        data: [],
      },
    ],
  },
  {
    name: '响应体-文字截取',
    key: 'TextSubstringBetweenCollector',
    items: [
      {
        title: '开始文字',
        key: 'open',
        required: true,
        type: 'input',
        data: [],
      },
      {
        title: '结束文字',
        key: 'close',
        required: true,
        type: 'input',
        data: [],
      },
    ],
  },
  {
    name: '响应体-JsonPath',
    key: 'JsonCollector',
    items: [
      {
        title: 'jsonPath',
        key: 'jsonPath',
        required: true,
        type: 'textarea',
        data: [],
      },
      {
        title: '多值连接',
        key: 'joinMulti',
        required: false,
        type: 'switch',
        data: [],
      },
      {
        title: '连接符',
        key: 'delimiter',
        required: false,
        type: 'input',
        data: [],
      },
    ],
  },
  {
    name: '响应体-Javascript',
    key: 'JavascriptCollector',
    items: [
      {
        title: 'javascript',
        key: 'javascript',
        required: true,
        type: 'textarea',
        data: [],
      },
    ],
  },
  {
    name: '函数',
    key: 'FunctionReturnValueCollector',
    items: [
      {
        title: '函数',
        key: 'function',
        required: true,
        type: 'select',
        data: [
          {
            name: '常量',
            value: 'ConstantValueFunction',
            items: [
              {
                title: '常量值',
                key: 'value',
                required: true,
                type: 'input',
                data: [],
              },
            ],
          },
          {
            name: '随机项目',
            value: 'RandomItemFunction',
            items: [
              {
                title: '备选项目',
                key: 'items',
                required: true,
                type: 'textarea',
                data: [],
              },
            ],
          },
          {
            name: '随机数',
            value: 'RandomNumberFunction',
            items: [
              {
                title: '最小值',
                key: 'min',
                required: true,
                type: 'number',
                data: [],
              },
              {
                title: '最大值',
                key: 'max',
                required: true,
                type: 'number',
                data: [],
              },
            ],
          },
          {
            name: '随机字符串',
            value: 'RandomStringFunction',
            items: [
              {
                title: '可选字符',
                key: 'chars',
                required: false,
                type: 'input',
                data: [],
              },
              {
                title: '输出长度',
                key: 'length',
                required: false,
                type: 'number',
                data: [],
              },
            ],
          },
          {
            name: 'UUID',
            value: 'UUIDFunction',
          },
          {
            name: '时间（毫秒）',
            value: 'CurrentTimeMillisFunction',
          },
          {
            name: '日期时间',
            value: 'CurrentDateFunction',
            items: [
              {
                title: '格式',
                key: 'format',
                required: false,
                type: 'input',
                data: [],
              },
              {
                title: '时区',
                key: 'timeZone',
                required: false,
                type: 'number',
                data: [],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    name: '项目组合',
    key: 'CollectorsCombinationCollector',
    items: [
      {
        title: '格式',
        key: 'format',
        required: true,
        type: 'input',
        data: [],
      },
    ],
  },
];

export const PAGING_RESOLVER_TYPE = [
  {
    name: '无分页',
    key: 'NonePagingResolver',
    items: [],
  },
  {
    name: '<下一页>按钮',
    key: 'NextPageButtonPagingResolver',
    desc:
      '一般带分页的画面上，都有名为<下一页>或之类的按钮。查找指定名称的按钮，并从该按钮的指定属性上提取下一页的网址。',
    items: [
      {
        title: '<下一页>按钮的名字',
        key: 'buttonLabel',
        required: true,
        type: 'input',
        data: [],
      },
      {
        title: '网址属性名',
        key: 'urlAttributeName',
        required: true,
        type: 'input',
        data: [],
      },
    ],
  },
  {
    name: '<下一页>页码',
    key: 'NextPageNumberPagingResolver',
    desc:
      '一般带分页的画面上，都有页码按钮。根据CSS选择器查找到画面上所有的页码按钮，并根据下一页的页码找到对应的按钮，并从该按钮的指定属性上提取下一页的网址。',
    items: [
      {
        title: 'CSS选择器',
        key: 'cssSelector',
        required: true,
        type: 'input',
        data: [],
        default: 'a',
      },
      {
        title: '网址属性名',
        key: 'urlAttributeName',
        required: true,
        type: 'input',
        data: [],
        default: 'href',
      },
      {
        title: '页码长度',
        key: 'leftPadLength',
        required: false,
        type: 'number',
        data: [],
        desc: '页码小于此长度时，左端补0',
      },
    ],
  },
  {
    name: '<下一页>网址采集器',
    key: 'CollectorPagingResolver',
    desc: '使用指定的采集器采集下一页的网址。',
    items: [
      {
        title: '采集器',
        key: 'collector',
        required: true,
        type: 'select',
        data: [
          { value: 'SimpleUrlCollector', name: '根据指定的css规则，从HTML文档中采集URL的采集器' },
          { value: 'HtmlDomCollector', name: '根据指定的CSS选择器查找DOM节点，从DOM节点中提取指定的属性值的采集器' },
          { value: 'TextSubstringBetweenCollector', name: '从HTTP响应文本中提取指定两个字符串之间的文本的采集器' },
          { value: 'JsonCollector', name: '根据指定的路径从Json中提取属性值的采集器' },
          { value: 'JavascriptCollector', name: '使用指定的javascript来处理输入内容的处理器' },
        ],
      },
    ],
  },
];

export const PROCESSORS_TYPE = [
  {
    name: '添加前缀',
    key: 'AddPrefixProcessor',
    items: [
      {
        title: '前缀',
        key: 'prefix',
        type: 'input',
        data: [],
      },
    ],
  },
  {
    name: '添加后缀',
    key: 'AddSuffixProcessor',
    items: [
      {
        title: '后缀',
        key: 'suffix',
        type: 'input',
      },
    ],
  },
  {
    name: 'Html标签过滤',
    key: 'ConvertHtmlToPlainTextProcessor',
    items: [],
  },
  {
    name: '拼音',
    key: 'ConvertToPinyinProcessor',
    items: [
      {
        title: '输出模式',
        key: 'outputMode',
        type: 'radio',
        data: [{ value: 'append', name: '标注模式' }, { value: 'convert', name: '转化模式' }],
      },
      {
        title: '音调类型',
        key: 'toneType',
        type: 'radio',
        data: [
          { value: 'mark', name: '符号音调' },
          { value: 'number', name: '数字音调' },
          { value: 'none', name: '无音调' },
        ],
      },
      {
        title: '首字母大写',
        key: 'firstCharToUpperCase',
        type: 'switch',
        data: [],
      },
      { title: '分隔符', key: 'separator', type: 'input' },
    ],
  },
  {
    name: '繁体转简体',
    key: 'ConvertToSimplifiedChineseProcessor',
    items: [],
  },
  {
    name: '简体转繁体',
    key: 'ConvertToTraditionalChineseProcessor',
    items: [],
  },
  {
    name: '默认值',
    key: 'DefaultValueProcessor',
    items: [{ title: '默认值', key: 'defaultValue', type: 'input' }],
  },
  {
    name: '日期转换',
    key: 'FormatDateProcessor',
    items: [
      { title: '源格式', key: 'fromFormat', type: 'input' },
      { title: '目标格式', key: 'toFormat', type: 'input' },
    ],
  },
  {
    name: 'Javascript处理',
    key: 'JavaScriptProcessor',
    items: [{ title: 'Javascript', key: 'javascript', type: 'textarea' }],
  },
  {
    name: '提取关键词',
    key: 'KeywordsProcessor',
    items: [
      { title: '关键词个数', key: 'count', type: 'number' },
      { title: '分隔符', key: 'separator', type: 'input' },
    ],
  },
  {
    name: '正则替换（标准）',
    key: 'RegexReplaceProcessor',
    items: [
      { title: '匹配表达式', key: 'regex', type: 'input' },
      { title: '替换表达式', key: 'replacement', type: 'input' },
    ],
  },
  {
    name: '正则替换（简单）',
    key: 'SimpleRegexReplaceProcessor',
    items: [
      { title: '匹配表达式', key: 'regex', type: 'input' },
      { title: '替换表达式', key: 'replacement', type: 'input' },
    ],
  },
  {
    name: '文本替换',
    key: 'SimpleReplaceProcessor',
    items: [{ title: '替换关系表', key: 'replaceMap', type: 'textarea' }],
  },
  {
    name: '文字截取（前端）',
    key: 'SubstringAfterProcessor',
    items: [
      { title: '分隔符', key: 'separator', type: 'input' },
      { title: '贪婪模式', key: 'afterLast', type: 'switch' },
    ],
  },
  {
    name: '文字截取（后端）',
    key: 'SubstringBeforeProcessor',
    items: [
      { title: '分隔符', key: 'separator', type: 'input' },
      { title: '贪婪模式', key: 'beforeLast', type: 'switch' },
    ],
  },
  {
    name: '字符串截取（中间）',
    key: 'SubstringBetweenProcessor',
    items: [{ title: '开始字符串', key: 'open', type: 'input' }, { title: '结束字符串', key: 'close', type: 'input' }],
  },
  {
    name: '字符串截取（范围）',
    key: 'SubstringProcessor',
    items: [
      { title: '开始位置，包含', key: 'start', type: 'number' },
      { title: '结束位置，不包含', key: 'end', type: 'number' },
    ],
  },
  {
    name: '摘要',
    key: 'SummaryChineseProcessor',
    items: [{ title: '摘要长度', key: 'length', type: 'number' }],
  },
  {
    name: '移除文字两端空白',
    key: 'TrimProcessor',
    items: [],
  },
];

export const FILTERS_TYPE = [
  {
    name: '空',
    key: 'BlankStringPredicate',
    items: [],
  },
  {
    name: '包含',
    key: 'ContainsStringPredicate',
    items: [
      {
        title: '匹配模式',
        key: 'matchMode',
        type: 'radio',
        data: [{ value: 'any', name: '任意' }, { value: 'all', name: '全部' }],
      },
      {
        title: '字符串列表',
        key: 'strings',
        type: 'textarea',
      },
    ],
  },
  {
    name: '等于',
    key: 'EqualsStringPredicate',
    items: [
      {
        title: '对象文本',
        key: 'strings',
        type: 'textarea',
      },
    ],
  },
  {
    name: '后缀',
    key: 'EndsWithStringPredicate',
    items: [
      {
        title: '对象文本',
        key: 'strings',
        type: 'textarea',
      },
    ],
  },
  {
    name: '非空',
    key: 'NotBlankStringPredicate',
    items: [],
  },
  {
    name: '不包含',
    key: 'NotContainsStringPredicate',
    items: [
      {
        title: '对象文本',
        key: 'strings',
        type: 'textarea',
      },
    ],
  },
  {
    name: '不等于',
    key: 'NotEqualsStringPredicate',
    items: [
      {
        title: '对象文本',
        key: 'strings',
        type: 'textarea',
      },
    ],
  },
  {
    name: '前缀',
    key: 'StartsWithStringPredicate',
    items: [
      {
        title: '对象文本',
        key: 'strings',
        type: 'textarea',
      },
    ],
  },
  {
    name: 'Javascript判断',
    key: 'JavaScriptPredicate',
    items: [
      {
        title: 'Javascript',
        key: 'javascript',
        type: 'textarea',
      },
    ],
  },
  {
    name: '数值比较',
    key: 'SimpleNumberPredicate',
    items: [
      {
        title: '比较符',
        key: 'operator',
        type: 'select',
        data: [
          { value: 'EQUALS', name: '等于' },
          { value: 'NOT_EQUALS', name: '不等于' },
          { value: 'GREAT_THAN', name: '大于' },
          { value: 'GREAT_EQUALS_THAN', name: '大于等于' },
          { value: 'LESS_THAN', name: '小于' },
          { value: 'LESS_EQUALS_THAN', name: '小于等于' },
        ],
      },
      {
        title: '对象数值',
        key: 'number',
        type: 'number',
      },
    ],
  },
  {
    name: '日期时间比较',
    key: 'SimpleDatePredicate',
    items: [
      {
        title: '比较符',
        key: 'operator',
        type: 'select',
        data: [
          { value: 'EQUALS', name: '等于' },
          { value: 'NOT_EQUALS', name: '不等于' },
          { value: 'GREAT_THAN', name: '大于' },
          { value: 'GREAT_EQUALS_THAN', name: '大于等于' },
          { value: 'LESS_THAN', name: '小于' },
          { value: 'LESS_EQUALS_THAN', name: '小于等于' },
        ],
      },
      {
        title: '对象日期',
        key: 'date',
        type: 'input',
      },
      {
        title: '日期格式',
        key: 'format',
        type: 'input',
      },
    ],
  },
];

export const DEF_CHARSET = [
  { id: '1', value: 'ISO-8859-1', name: 'ISO-8859-1' },
  { id: '2', value: 'UTF-8', name: 'UTF-8' },
  { id: '3', value: 'GBK', name: 'GBK' },
  { id: '4', value: 'GB2312', name: 'GB2312' },
  { id: '5', value: 'GB18030', name: 'GB18030' },
  { id: '6', value: 'BIG5', name: 'BIG5' },
  { id: '7', value: 'Shift-JIS', name: 'Shift-JIS' },
  { id: '8', value: 'EUC-JP', name: 'EUC-JP' },
  { id: '9', value: 'EUC-KR', name: 'EUC-KR' },
];

export const DEF_USER_AGENT = [
  { id: '1', value: 'Mozilla/5.0 Chrome/70.0.3538.77 Safari/537.36', name: 'Chrome Mac' },
  { id: '2', value: 'Mozilla/5.0 Chrome/70.0.3538.77', name: 'Chrome Windows' },
  { id: '3', value: 'Mozilla/5.0 Gecko/20100101 Firefox/62.0', name: 'Firefox Mac' },
  { id: '4', value: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64;) Gecko/20100101 Firefox/62.0', name: 'Firefox Windows' },
  {
    id: '5',
    value: 'Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; rv:11.0) like Gecko',
    name: 'Internet Explorer 11',
  },
  { id: '6', value: 'Mozilla/5.0 Chrome/64.0.3282.140 Safari/537.36 Edge/17.17134', name: 'Edge' },
];

// form layout
export const FORM_ITEM_LAYOUT = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

import React from 'react';
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

const DateFormat = (
  <div>
    <span>yyyy：年</span>
    <br />
    <span>MM：月</span>
    <br />
    <span>dd：日</span>
    <br />
    <span>hh：1~12小时制(1-12)</span>
    <br />
    <span>HH：24小时制(0-23)</span>
    <br />
    <span>mm：分</span>
    <br />
    <span>ss：秒</span>
    <br />
    <span>S：毫秒</span>
    <br />
  </div>
);

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
    group: '从请求网址中抽取',
    desc: '从请求网址中抽取内容。可以是整个网址，也可以是网址中的某一部分。',
    items: [
      {
        title: '类型',
        key: 'partType',
        required: true,
        type: 'select',
        data: [
          { name: '网址整体', value: 'all' },
          { name: '协议', value: 'protocol' },
          { name: '主机名或IP地址', value: 'host' },
          { name: '端口号', value: 'port' },
          { name: '相对路径', value: 'path' },
          { name: '相对路径片段', value: 'pathPart' },
          { name: '请求参数', value: 'queryParam' },
          { name: '所有请求参数', value: 'queryParams' },
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
        type: 'input',
        data: [],
      },
      {
        title: '片段位置',
        key: 'queryParamName',
        required: false,
        type: 'number',
        desc: '位置从1开始。如相对路径 news/sports.html 中，片段1为 news，片段2为 sports.html。',
        data: [],
      },
    ],
  },
  {
    name: '响应头',
    key: 'HttpHeaderCollector',
    group: '从响应头中抽取',
    desc: '从Http响应头中抽取指定的响应头的值。',
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
    name: '链接抽取',
    key: 'SimpleUrlCollector',
    group: '从响应体中抽取',
    desc: '响应体为Html时，使用指定的CSS选择器，从Html中抽取各个链接（<a>标签）。',
    items: [
      {
        title: 'CSS选择器',
        key: 'cssSelector',
        required: true,
        type: 'input',
        link: 'https://www.w3school.com.cn/cssref/css_selectors.asp',
        data: [],
      },
    ],
  },
  {
    name: '文字截取',
    key: 'TextSubstringBetweenCollector',
    group: '从响应体中抽取',
    desc: '从响应体中截取指定的【开始文本】和【结束文本】之间的内容。',
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
    name: 'CSS选择器',
    key: 'HtmlDomCollector',
    group: '从响应体中抽取',
    desc: '响应体为Html时，使用CSS选择器从Html中抽取内容。',
    items: [
      {
        title: 'CSS选择器',
        key: 'cssSelector',
        required: false,
        type: 'input',
        link: 'https://www.w3school.com.cn/cssref/css_selectors.asp',
        data: [],
      },
      {
        title: '属性名',
        key: 'attributeName',
        required: false,
        type: 'inputSelect',
        desc: '从CSS选择器匹配的DOM节点上，抽取指定属性的值。',
        data: [
          { name: 'outerHTML', value: 'outerHTML' },
          { name: 'innerHTML', value: 'innerHTML' },
          { name: 'innerText', value: 'innerText' },
          { name: 'href', value: 'href' },
        ],
      },
      {
        title: '多值连接',
        key: 'joinMulti',
        required: false,
        type: 'switch',
        desc: 'CSS选择器匹配多个DOM节点时，是否将取得的多个值拼接起来。',
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
    name: 'JsonPath',
    key: 'JsonCollector',
    group: '从响应体中抽取',
    desc: '响应体为Json时，使用JsonPath从Json中抽取内容。',
    items: [
      {
        title: 'jsonPath',
        key: 'jsonPath',
        required: true,
        type: 'textarea',
        link: 'https://github.com/json-path/JsonPath',
        data: [],
      },
      {
        title: '多值连接',
        key: 'joinMulti',
        required: false,
        type: 'switch',
        desc: 'JsonPath匹配多个值时，是否将取得的多个值拼接起来。',
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
    name: 'Javascript',
    key: 'JavascriptCollector',
    group: '从响应体中抽取',
    desc:
      '使用自定义的Javascript，从响应文本中抽取内容。响应体被记录在名为src的变量中，执行指定的javascript处理后，将其返回值（即最后一个表达式的值）作为采集结果。',
    items: [
      {
        title: 'javascript',
        key: 'javascript',
        required: true,
        type: 'textarea',
        link: 'https://www.w3school.com.cn/js/index.asp',
        data: [],
      },
    ],
  },
  {
    name: '函数',
    key: 'FunctionReturnValueCollector',
    group: '其他',
    desc: '使用指定函数的返回值作为抽取结果。',
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
                placeholder: '项目A\n项目B\n项目C',
                autosize: { minRows: 3 },
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
                type: 'textarea',
                autosize: { minRows: 3 },
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
                desc: DateFormat,
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
    group: '其他',
    desc: '组合已抽取的各个项目的值作为抽取结果。',
    items: [
      {
        title: '格式',
        key: 'format',
        required: true,
        type: 'input',
        desc: '格式串中 {项目名} 的部分，会被替换成指定项目的值。',
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
      '一般带分页的画面上，都有名为<下一页>或<Next>之类的按钮。查找指定名称的按钮，并从该按钮的指定属性上提取下一页的网址。',
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

export const PAGING_PROCESSORS_TYPE = [
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
    name: '默认值',
    key: 'DefaultValueProcessor',
    desc: '采集结果为空时，使用指定的默认值作为采集结果。',
    items: [{ title: '默认值', key: 'defaultValue', type: 'input' }],
  },
  {
    name: 'Javascript处理',
    key: 'JavaScriptProcessor',
    desc:
      '使用自定义的javascript来处理采集结果。原采集结果被记录在名为value的变量中，执行指定的javascript处理后，将其返回值（即最后一个表达式的值）作为处理结果。',
    items: [
      { title: 'Javascript', key: 'javascript', type: 'textarea', link: 'https://www.w3school.com.cn/js/index.asp' },
    ],
  },
  {
    name: '正则替换（标准）',
    key: 'RegexReplaceProcessor',
    desc:
      '使用<a href="https://www.runoob.com/java/java-regular-expressions.html" target="_blank">标准的正则语法</a>来执行文本替换。',
    items: [
      {
        title: '匹配表达式',
        key: 'regex',
        type: 'input',
        desc: '例：(?<year>\\\\d{4})-(?<month>\\\\d{2})-(?<day>\\\\d{2})',
      },
      // eslint-disable-next-line no-template-curly-in-string
      { title: '替换表达式', key: 'replacement', type: 'input', desc: '例：${day}-${month}-${year}' },
    ],
  },
  {
    name: '正则替换（简单）',
    key: 'SimpleRegexReplaceProcessor',
    desc: '使用简单的正则语法来执行文本替换。表达式中仅支持 {paramName} 和 {*} 两种标记形式。',
    items: [
      {
        title: '匹配表达式',
        key: 'regex',
        type: 'input',
        desc: (
          <div>
            <span>{'例1：{year}-{month}-{day}'}</span>
            <br />
            <span>{"例2：<div class='content'>{*}<h2>{title}</h2>{*}<div id='tools'>【作者：{author}】【{*}】"}</span>
          </div>
        ),
      },
      {
        title: '替换表达式',
        key: 'replacement',
        type: 'input',
        desc: (
          <div>
            <span>{'例1：{day}-{month}-{year}'}</span>
            <br />
            <span>{'例2：标题：{title} ，作者：{author}'}</span>
          </div>
        ),
      },
    ],
  },
  {
    name: '文本替换',
    key: 'SimpleReplaceProcessor',
    items: [{ title: '替换关系表', key: 'replaceMap', type: 'textarea', placeholder: 'AAA -> BBB\nCCC -> DDD' }],
  },
  {
    name: '文本截取（前端）',
    key: 'SubstringAfterProcessor',
    desc: '截取指定的分隔符之前的文本。',
    items: [
      { title: '分隔符', key: 'separator', type: 'input' },
      {
        title: '贪婪模式',
        key: 'afterLast',
        type: 'switch',
        desc: '分隔符重复出现时，是否取最后出现的位置作为分隔点。',
      },
    ],
  },
  {
    name: '文本截取（后端）',
    key: 'SubstringBeforeProcessor',
    desc: '截取指定的分隔符之后的文本。',
    items: [
      { title: '分隔符', key: 'separator', type: 'input' },
      {
        title: '贪婪模式',
        key: 'beforeLast',
        type: 'switch',
        desc: '分隔符重复出现时，是否取最后出现的位置作为分隔点。',
      },
    ],
  },
  {
    name: '文本截取（中间）',
    key: 'SubstringBetweenProcessor',
    desc: '截取指定的开始文本和结束文本之间的文本。',
    items: [{ title: '开始文本', key: 'open', type: 'input' }, { title: '结束文本', key: 'close', type: 'input' }],
  },
  {
    name: '文本截取（范围）',
    key: 'SubstringProcessor',
    desc: '截取指定的开始位置和结束位置之间的文本。',
    items: [
      { title: '开始位置', key: 'start', type: 'number', desc: '从0开始，包含。' },
      { title: '结束位置', key: 'end', type: 'number', desc: '不包含。' },
    ],
  },
  {
    name: '移除文字两端空白',
    key: 'TrimProcessor',
    items: [],
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
    desc: '采集结果为空时，使用指定的默认值作为采集结果。',
    items: [{ title: '默认值', key: 'defaultValue', type: 'input' }],
  },
  {
    name: '日期转换',
    key: 'FormatDateProcessor',
    items: [
      { title: '源格式', key: 'fromFormat', type: 'input', desc: DateFormat },
      { title: '目标格式', key: 'toFormat', type: 'input', desc: DateFormat },
    ],
  },
  {
    name: 'Javascript处理',
    key: 'JavaScriptProcessor',
    desc:
      '使用自定义的javascript来处理采集结果。原采集结果被记录在名为value的变量中，执行指定的javascript处理后，将其返回值（即最后一个表达式的值）作为处理结果。',
    items: [
      { title: 'Javascript', key: 'javascript', type: 'textarea', link: 'https://www.w3school.com.cn/js/index.asp' },
    ],
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
    desc:
      '使用<a href="https://www.runoob.com/java/java-regular-expressions.html" target="_blank">标准的正则语法</a>来执行文本替换。',
    items: [
      {
        title: '匹配表达式',
        key: 'regex',
        type: 'input',
        desc: '例：(?<year>\\\\d{4})-(?<month>\\\\d{2})-(?<day>\\\\d{2})',
      },
      // eslint-disable-next-line no-template-curly-in-string
      { title: '替换表达式', key: 'replacement', type: 'input', desc: '例：${day}-${month}-${year}' },
    ],
  },
  {
    name: '正则替换（简单）',
    key: 'SimpleRegexReplaceProcessor',
    desc: '使用简单的正则语法来执行文本替换。表达式中仅支持 {paramName} 和 {*} 两种标记形式。',
    items: [
      {
        title: '匹配表达式',
        key: 'regex',
        type: 'input',
        desc: (
          <div>
            <span>{'例1：{year}-{month}-{day}'}</span>
            <br />
            <span>{"例2：<div class='content'>{*}<h2>{title}</h2>{*}<div id='tools'>【作者：{author}】【{*}】"}</span>
          </div>
        ),
      },
      {
        title: '替换表达式',
        key: 'replacement',
        type: 'input',
        desc: (
          <div>
            <span>{'例1：{day}-{month}-{year}'}</span>
            <br />
            <span>{'例2：标题：{title} ，作者：{author}'}</span>
          </div>
        ),
      },
    ],
  },
  {
    name: '文本替换',
    key: 'SimpleReplaceProcessor',
    items: [{ title: '替换关系表', key: 'replaceMap', type: 'textarea', placeholder: 'AAA -> BBB\nCCC -> DDD' }],
  },
  {
    name: '文本截取（前端）',
    key: 'SubstringAfterProcessor',
    desc: '截取指定的分隔符之前的文本。',
    items: [
      { title: '分隔符', key: 'separator', type: 'input' },
      {
        title: '贪婪模式',
        key: 'afterLast',
        type: 'switch',
        desc: '分隔符重复出现时，是否取最后出现的位置作为分隔点。',
      },
    ],
  },
  {
    name: '文本截取（后端）',
    key: 'SubstringBeforeProcessor',
    desc: '截取指定的分隔符之后的文本。',
    items: [
      { title: '分隔符', key: 'separator', type: 'input' },
      {
        title: '贪婪模式',
        key: 'beforeLast',
        type: 'switch',
        desc: '分隔符重复出现时，是否取最后出现的位置作为分隔点。',
      },
    ],
  },
  {
    name: '文本截取（中间）',
    key: 'SubstringBetweenProcessor',
    desc: '截取指定的开始文本和结束文本之间的文本。',
    items: [{ title: '开始文本', key: 'open', type: 'input' }, { title: '结束文本', key: 'close', type: 'input' }],
  },
  {
    name: '文本截取（范围）',
    key: 'SubstringProcessor',
    desc: '截取指定的开始位置和结束位置之间的文本。',
    items: [
      { title: '开始位置', key: 'start', type: 'number', desc: '从0开始，包含。' },
      { title: '结束位置', key: 'end', type: 'number', desc: '不包含。' },
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
    desc: '如果采集结果是一个数值，则将其以下面的数值进行比较。',
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

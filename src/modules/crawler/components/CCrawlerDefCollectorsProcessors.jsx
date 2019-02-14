import React from 'react';
import {Button, Checkbox, Form, Input, Select} from 'antd';

const { TextArea } = Input;
const { Option } = Select;

class CCrawlerDefCollectorsProcessors extends React.Component {
  render() {
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 12 },
    };

    return (
      <div>
        <div className="area">
          <span className="area-title">过滤器</span>
        </div>
        <div style={{ padding: "0 24px 24px 24px" }}>
          <Form layout="inline">
            <Form.Item>
              <Select defaultValue="equals" style={{width: 400}}>
                <Option value="equals">为内容添加前缀的处理器</Option>
                <Option value="notEquals">为内容添加后缀的处理器</Option>
                <Option value="greaterThan">提取html中的文本内容的处理器</Option>
                <Option value="greaterEqualsThan">将内容转换为拼音，或为内容标注拼音的处理器</Option>
              </Select>
            </Form.Item>
            <Form.Item>
              <Button type="primary" size="small">
                追加
              </Button>
            </Form.Item>
          </Form>
        </div>
        {/*<div className="collectors-filter">*/}
          {/*<div className="title">*/}
            {/*<Checkbox>为内容添加前缀的处理器</Checkbox>*/}
          {/*</div>*/}
          {/*<Form>*/}
            {/*<Form.Item label="前缀" {...formItemLayout}>*/}
              {/*<Input />*/}
            {/*</Form.Item>*/}
          {/*</Form>*/}
        {/*</div>*/}
        {/*<div className="collectors-filter">*/}
          {/*<div className="title">*/}
            {/*<Checkbox>为内容添加后缀的处理器</Checkbox>*/}
          {/*</div>*/}
          {/*<Form>*/}
            {/*<Form.Item label="后缀" {...formItemLayout}>*/}
              {/*<Input />*/}
            {/*</Form.Item>*/}
          {/*</Form>*/}
        {/*</div>*/}
        {/*<div className="collectors-filter">*/}
          {/*<div className="title">*/}
            {/*<Checkbox>提取html中的文本内容的处理器</Checkbox>*/}
          {/*</div>*/}
        {/*</div>*/}
        {/*<div className="collectors-filter">*/}
          {/*<div className="title">*/}
            {/*<Checkbox>将内容转换为拼音，或为内容标注拼音的处理器</Checkbox>*/}
          {/*</div>*/}
          {/*<Form>*/}
            {/*<Form.Item label="字符串数组" {...formItemLayout}>*/}
              {/*<TextArea />*/}
            {/*</Form.Item>*/}
          {/*</Form>*/}
        {/*</div>*/}
        {/*<div className="collectors-filter">*/}
          {/*<div className="title">*/}
            {/*<Checkbox>将内容转换为简体中文的处理器</Checkbox>*/}
          {/*</div>*/}
        {/*</div>*/}
        {/*<div className="collectors-filter">*/}
          {/*<div className="title">*/}
            {/*<Checkbox>将内容转化为繁体字的处理器</Checkbox>*/}
          {/*</div>*/}
        {/*</div>*/}
        {/*<div className="collectors-filter">*/}
          {/*<div className="title">*/}
            {/*<Checkbox>默认值处理器。输入值为空时，输出指定的默认值</Checkbox>*/}
          {/*</div>*/}
          {/*<Form>*/}
            {/*<Form.Item label="默认值" {...formItemLayout}>*/}
              {/*<Input />*/}
            {/*</Form.Item>*/}
          {/*</Form>*/}
        {/*</div>*/}
        {/*<div className="collectors-filter">*/}
          {/*<div className="title">*/}
            {/*<Checkbox>将日期（时间）由一种格式转化为另一种格式的处理器</Checkbox>*/}
          {/*</div>*/}
          {/*<Form>*/}
            {/*<Form.Item label="源日期格式" {...formItemLayout}>*/}
              {/*<Input />*/}
            {/*</Form.Item>*/}
            {/*<Form.Item label="目标日期格式" {...formItemLayout}>*/}
              {/*<Input />*/}
            {/*</Form.Item>*/}
          {/*</Form>*/}
        {/*</div>*/}
        {/*<div className="collectors-filter">*/}
          {/*<div className="title">*/}
            {/*<Checkbox>使用指定的javascript来处理输入内容的处理器</Checkbox>*/}
          {/*</div>*/}
          {/*<Form>*/}
            {/*<Form.Item label="字符串" {...formItemLayout}>*/}
              {/*<TextArea />*/}
            {/*</Form.Item>*/}
          {/*</Form>*/}
        {/*</div>*/}
        {/*<div className="collectors-filter">*/}
          {/*<div className="title">*/}
            {/*<Checkbox>从输入内容中提取关键词的处理器</Checkbox>*/}
          {/*</div>*/}
          {/*<Form>*/}
            {/*<Form.Item label="关键词个数" {...formItemLayout}>*/}
              {/*<Input />*/}
            {/*</Form.Item>*/}
            {/*<Form.Item label="关键词分隔符" {...formItemLayout}>*/}
              {/*<Input />*/}
            {/*</Form.Item>*/}
          {/*</Form>*/}
        {/*</div>*/}
        {/*<div className="collectors-filter">*/}
          {/*<div className="title">*/}
            {/*<Checkbox>执行正则替换的处理器</Checkbox>*/}
          {/*</div>*/}
          {/*<Form>*/}
            {/*<Form.Item label="用来匹配输入内容的正则表达式" {...formItemLayout}>*/}
              {/*<Input />*/}
            {/*</Form.Item>*/}
            {/*<Form.Item label="用来替换每个匹配项的字符串" {...formItemLayout}>*/}
              {/*<Input />*/}
            {/*</Form.Item>*/}
          {/*</Form>*/}
        {/*</div>*/}
        {/*<div className="collectors-filter">*/}
          {/*<div className="title">*/}
            {/*<Checkbox>简单的正则替换处理器</Checkbox>*/}
          {/*</div>*/}
          {/*<Form>*/}
            {/*<Form.Item label="用来匹配输入内容的正则表达式" {...formItemLayout}>*/}
              {/*<Input />*/}
            {/*</Form.Item>*/}
            {/*<Form.Item label="用来替换每个匹配项的字符串" {...formItemLayout}>*/}
              {/*<Input />*/}
            {/*</Form.Item>*/}
          {/*</Form>*/}
        {/*</div>*/}
        {/*<div className="collectors-filter">*/}
          {/*<div className="title">*/}
            {/*<Checkbox>根据指定的替换关系执行简单替换的处理器</Checkbox>*/}
          {/*</div>*/}
          {/*<Form>*/}
            {/*<Form.Item label="替换关系表" {...formItemLayout}>*/}
              {/*<TextArea />*/}
            {/*</Form.Item>*/}
          {/*</Form>*/}
        {/*</div>*/}
        {/*<div className="collectors-filter">*/}
          {/*<div className="title">*/}
            {/*<Checkbox>截取指定的分隔符之后的字符串子串的处理器</Checkbox>*/}
          {/*</div>*/}
          {/*<Form>*/}
            {/*<Form.Item label="分隔符" {...formItemLayout}>*/}
              {/*<Input />*/}
            {/*</Form.Item>*/}
            {/*<Form.Item label="重复时是否取最后出现的位置" {...formItemLayout}>*/}
              {/*<Select defaultValue="equals">*/}
                {/*<Option value="Equals">是</Option>*/}
              {/*</Select>*/}
            {/*</Form.Item>*/}
          {/*</Form>*/}
        {/*</div>*/}
        {/*<div className="collectors-filter">*/}
          {/*<div className="title">*/}
            {/*<Checkbox>截取指定的分隔符之前的字符串子串的处理器</Checkbox>*/}
          {/*</div>*/}
          {/*<Form>*/}
            {/*<Form.Item label="分隔符" {...formItemLayout}>*/}
              {/*<Input />*/}
            {/*</Form.Item>*/}
            {/*<Form.Item label="重复时是否取最后出现的位置" {...formItemLayout}>*/}
              {/*<Select defaultValue="equals">*/}
                {/*<Option value="Equals">是</Option>*/}
              {/*</Select>*/}
            {/*</Form.Item>*/}
          {/*</Form>*/}
        {/*</div>*/}
        {/*<div className="collectors-filter">*/}
          {/*<div className="title">*/}
            {/*<Checkbox>提取指定的开始字符串和结束字符串之间的字符串的处理器</Checkbox>*/}
          {/*</div>*/}
          {/*<Form>*/}
            {/*<Form.Item label="开始字符串" {...formItemLayout}>*/}
              {/*<Input />*/}
            {/*</Form.Item>*/}
            {/*<Form.Item label="结束字符串" {...formItemLayout}>*/}
              {/*<Input />*/}
            {/*</Form.Item>*/}
          {/*</Form>*/}
        {/*</div>*/}
        {/*<div className="collectors-filter">*/}
          {/*<div className="title">*/}
            {/*<Checkbox>截取字符串子串的处理器</Checkbox>*/}
          {/*</div>*/}
          {/*<Form>*/}
            {/*<Form.Item label="开始位置，包含" {...formItemLayout}>*/}
              {/*<Input />*/}
            {/*</Form.Item>*/}
            {/*<Form.Item label="结束位置，不包含" {...formItemLayout}>*/}
              {/*<Input />*/}
            {/*</Form.Item>*/}
          {/*</Form>*/}
        {/*</div>*/}
        {/*<div className="collectors-filter">*/}
          {/*<div className="title">*/}
            {/*<Checkbox>从中文数据中提取摘要的处理器</Checkbox>*/}
          {/*</div>*/}
          {/*<Form>*/}
            {/*<Form.Item label="摘要长度" {...formItemLayout}>*/}
              {/*<Input />*/}
            {/*</Form.Item>*/}
          {/*</Form>*/}
        {/*</div>*/}
        {/*<div className="collectors-filter">*/}
          {/*<div className="title">*/}
            {/*<Checkbox>去除字符串的前导和后缀控制字符的处理器</Checkbox>*/}
          {/*</div>*/}
        {/*</div>*/}
      </div>
    );
  }
}

export default CCrawlerDefCollectorsProcessors;

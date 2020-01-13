import React, { useState } from 'react'
import { Button, Row, Col, Input, Select } from 'antd'
import Form from '@monajs/react-form'
import FormItem from '@/component/form-item'

const { TextArea } = Input
const { Option } = Select

const Home = () => {
  const [input, setInput] = useState('sss')
  const formRef = React.createRef()

  const getForm = () => {
    const formData = formRef.current.getFormData()
    const verifyInfo = formRef.current.getVerifyInfo()
    console.log(formData)
    console.log(verifyInfo)
  }

  const onChange = (e) => {
    setInput(e.target.value)
  }

  const reset = () => {
    formRef.current.reset()
    setInput('sss')
  }

  return (
    <Form ref={formRef}>
      <Row>
        <Col span={8} className='p-15'>
          <FormItem bn='name' label='输入框' required>
            <Form.Proxy to={TextArea} bn='name' getValue={(val) => val.target.value} defaultValue={'ss'} onChange={onChange} verify verifyMsg='请检查事' />
          </FormItem>
        </Col>
        <Col span={8} className='p-15'>
          <FormItem bn='id' label='下拉框' required>
            <Form.Proxy to={Input} bn='id' getValue={(val) => val.target.value} verify={(val) => val === 'aaa'} verifyMsg={(verify) => verify.val} />
          </FormItem>
        </Col>
        <Col span={8} className='p-15'>
          <FormItem bn='scholl' label='下拉框' required>
            <Form.Proxy
              bn='scholl'
              style={{ width: 300 }}
              to={Select}
              placeholder='请输入'>
              <Option key={'1'} value='1'>1</Option>
              <Option key={'2'} value='2'>2</Option>
            </Form.Proxy>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span={8} className='p-15'>
          <FormItem bn='id1' label='下拉框' required>
            <Form.Proxy to={Input} bn='id1' getValue={(val) => val.target.value} value={input} />
          </FormItem>
        </Col>
        <If condition={input === 'ss'}>
          <Col span={8} className='p-15'>
            <FormItem bn='a[0][1].age'>
              <Form.Proxy to={Input} bn='a[0][1].age' getValue={(val) => val.target.value} verify={(val) => val === 'bbb'} verifyMsg='请检查事input实上' />
            </FormItem>
          </Col>
        </If>
        <Col span={8} className='p-15'>
          <FormItem bn='a[0][1].other' label='下拉框' desc='请选择' required>
            <Form.Proxy
              style={{ width: 300 }}
              to={Select}
              bn='a[0][1].other'
              verify={(val) => val === '3'}
              verifyMsg={(verify) => verify.val}
              placeholder='请输入other'>
              <Option key='3' value='3'>3</Option>
              <Option key='4' value='4'>4</Option>
            </Form.Proxy>
          </FormItem>
        </Col>
      </Row>
      <Button onClick={getForm}>提交</Button>
      <Button onClick={reset}>重置</Button>
    </Form>
  )
}

export default Home

[原文链接](https://github.com/func-star/blog/issues/34)

## 1 前言
经常开发中后台项目的同学肯定都经历过大型表单的折磨，几十个甚至上百个表单元素足以让我们欲仙欲死，这可真是个体力活。特别当你选择 React 作为技术框架的情况下，这满屏幕的 `onChange` 简直是一个噩梦。

当然我们还是有追求的，肯定不会屈服于此。社区内有很多的解决方案，比如双向绑定就是一个接受度很高的策略。这种方式也是我两年前惯用的手法，来看一段代码：

```jsx
<Input 
    value={this.state.title}
    maxLength={25}
    onChange={Bind.valueChange.bind(this, 'title')}
    placeholder='请输入标题' />
```

通过这种方式我们确实减少了大量的手写回调函数来绑定数据源，但是 `onChang` 这东西就像狗皮膏药一样依附在那里。

那有没有一种方式，能够完全解放这种重复代码，我们只需要通过配置数据源就可以达到数据收集的目的呢？

接下来我们开始来讨论一下极致的 React 表单解决方案：[@monajs/react-form](https://github.com/monajs/react-form)

## 2 使用方式
```jsx
import React from 'react'
import { Button, Input, Select } from 'antd'
import Form from '@monajs/react-form'
import FormItem from '@/component/form-item'

const { TextArea } = Input
const { Option } = Select

const Home = () => {
  const formRef = React.createRef()

  const getForm = () => {
    const formData = formRef.current.getFormData()
    const verifyInfo = formRef.current.getVerifyInfo()
    console.log(formData)
    console.log(verifyInfo)
  }

  return (
    <Form ref={formRef}>
      <FormItem bn='name' label='输入框' required>
        <Form.Proxy 
            to={TextArea} 
            bn='name' 
            getValue={(val) => val.target.value} defaultValue='ss' />
      </FormItem>
    
      <FormItem bn='other' label='下拉框' desc='请选择' required>
        <Form.Proxy
          to={Select}
          bn='other'
          style={{ width: 300 }}
          placeholder='请输入other'>
          <Option key={'3'} value='3'>3</Option>
          <Option key={'4'} value='4'>4</Option>
        </Form.Proxy>
      </FormItem>
      <Button onClick={getForm}>提交</Button>
    </Form>
  )
}

export default Home

```

```js
// 打印结果
{
    name: 'fangke',
    other: '3'
}
```

我们来分析一下上面的代码。
1. 首先我插入了一个容器节点 `Form`。
2. 然后我们把  [antd](https://ant.design/docs/react/introduce-cn) 的组件通过 `Form.Proxy` 架了一层代理，通过 `to` 属性来声明代理路径，通过 `bn` 属性来声明要绑定的数据源。
3. 最后通过 `Form` 实例上的 `getFormData` 来获取最终的表单数据对象。

这里我先阐述主链路，像`Form`、`Form.Proxy`、`FormItem` 、`getValue`等到底是干什么的会在后面详细介绍。

## 3 API 介绍

### 3.1 表单容器（Form）

顾名思义它是个容器，我们所有的表单元素都必须是它的子节点，然后我们可以通过节点实例来全局性的做一些操作，比如数据收集、错误收集和重置表单。

#### 3.1.1 表单数据收集（getFormData）

实际上我们在第2节中已经了解了如何来获取表单的所有绑定数据，使用姿势比较简单，这里就不再重复阐述。

```js
 const formData = formRef.current.getFormData()
 console.log(formData)
```

```js
//打印结果
{name: "sss", id: "11", scholl: "2", other: "4"}
```

一般返回的结果就是我们最终想要的数据结构，但是我们日常的需求中也难免会碰到很多层级很深的数据格式，这块我们会在 3.2.1 章节进行介绍。

#### 3.1.2 未通过校验信息收集（getVerifyInfo）

只有当我们的表单元素中绑定了 `verify` 属性，我们才会对其进行数据校验，并进行最终校验未通过信息收集。具体 `verify` 是如何执行的，我们将在 3.2.2 章节进行介绍。

```js
 const verifyInfo = formRef.current.getVerifyInfo()
 console.log(verifyInfo)
```

```js
//打印结果
 [
     {id: 1, val: "1", vm: FormItemComponent, isEmptyVerify: true, verifyMsg: ƒ},
     {id: 2, val: "s", vm: FormItemComponent, isRegVerify: true, verifyMsg: ƒ},
     {id: 3, val: "4", vm: FormItemComponent, isFunctionVerify: true, verifyMsg: ƒ}
 ]
```

返回结果中包含了以下信息：
| 字段 | 说明 |
| --- | :-- |
| id | 表单元素的唯一id |
| val | 表单元素的返回值 |
| vm | 表单元素的实例对象 |
| isEmptyVerify | 校验类型是否为空校验 |
| isRegVerify | 校验类型是否为正则校验 |
| isFunctionVerify | 校验类型是否为函数校验 |
| verifyMsg | 当校验未通过时，会通过该方法返回校验报错信息 |

- 注：通过校验返回的错误信息，我们可以进行一些自定义操作，比如通过表单实例（`vm`）返回到指定位置。


#### 3.1.3 重置表单（reset）

重置是表单操作中比较常见的功能，我们的组件设计当然也考虑到了这个场景。

```js
formRef.current.reset()
```

### 3.2 组件赋能

通过上面的使用介绍，我们应该大致知道了我们是通过 `bn` 属性来进行数据绑定的，表单元素组件最终的返回值会被绑定到 `bn` 声明的字段上。

#### 3.2.1 数据绑定（bn）

##### 一级结构

在多数情况下，我们的表单是一级结构，是扁平的，我们只需要给 `bn` 属性传递一个 `key` 值就可以实现，例如：

```jsx
<Form.Proxy bn='name' to={Input} getValue={(val) => val.target.value} />
```

```js
// 返回结果
{
    name: "fangke"
}
```

##### json 格式

针对一些层级比较深的 json 数据结构，我们支持 `.` 点运算符，我们来看一个例子：

```jsx
<Form.Proxy bn='people.name' to={Input} getValue={(val) => val.target.value} />
<Form.Proxy bn='people.age' to={Input} getValue={(val) => val.target.value} />
<Form.Proxy bn='type' to={Input} getValue={(val) => val.target.value} />
```
```js
// 返回
{
    people: {
        name: 'fangke',
        age: 18
    },
    type: '贫民'
}
```

##### array 格式

针对数组类型的数据结构，我们支持 `[]` 运算符，我们来看一个例子：

```jsx
<Form.Proxy bn='people[0]' to={Input} getValue={(val) => val.target.value} />
```

```js
// 返回
{
    people: ['fangke']
}
```

##### 混合格式

接下来我们看一下混合模式下的应用。

```jsx
<Form.Proxy bn='CH.people[0].name' to={Input} getValue={(val) => val.target.value} />
<Form.Proxy bn='CH.type[0]' to={Input} getValue={(val) => val.target.value} />
<Form.Proxy bn='CH.father.name' to={Input} getValue={(val) => val.target.value} />
<Form.Proxy bn='CH.father.age' to={Input} getValue={(val) => val.target.value} />
```

```js
// 返回
{
    CH: {
        people: [{
            name: 'fangke'
        }]
        type: ['贫民'],
        father: {
            name: 'fangke',
            age: 18
        }
    }
}
```

#### 3.2.2 数据校验（verify）

在 3.1.2 章节中我们提到过当表单元素组件传递了 `verify` 属性，我们就会对其开启校验，接下来我们来详细介绍一下。

我们支持三种形式的形式：

1. 非空校验
```jsx
<Form.Proxy bn='name' to={Input} verify verifyMsg='name不允许为空' getValue={(val) => val.target.value} />
```
当输入值为空时，则校验不通过，并且提示信息为 `verifyMsg` 属性绑定的"name不允许为空"。

2. 正则校验
```jsx
<Form.Proxy bn='mobile' to={Input} verify={/^1[3456789]\d{9}$/} verifyMsg='手机号格式不符合要求' getValue={(val) => val.target.value} />
```
当输入值不匹配正则表达式时，则校验不通过，并且提示信息为 `verifyMsg` 属性绑定的"手机号格式不符合要求"。

3. 函数校验
```jsx
<Form.Proxy bn='name' to={Input} verify={(val) => val === 'fangke'} verifyMsg='请输入fangke' getValue={(val) => val.target.value} />
```
当输入值通过 `verify` 方法返回 `false` 时，则校验不通过，并且提示信息为 `verifyMsg` 属性绑定的"请输入fangke"。

#### 3.2.3 数据校验（verifyMsg）

介绍完 3.2.1 大家肯定会有一个疑问，如果 `verifyMsg` 只支持传递字符串那我们如何进行个性化提示。

实际上我们的 `verifyMsg` 是支持函数形式的，我们可以根据输入值进行多形式提示。
```jsx
<Form.Proxy to={Input} bn='name' getValue={(val) => val.target.value} verify={(val) => val === 'fangke'} verifyMsg={(verify) => verify.val} />
```

这个 demo 只有当你输入 “fangke” 时才不会提示，否则你输入什么就提示什么。


### 3.3 如何给组件赋能

#### 3.3.1 方案一：Proxy

讲到这里，我们应该会有以下几个疑问：

**问题一：`Form.Proxy` 到底是干什么的**

我们先来设想一下，如果我们不用 `Form.Proxy` 来架设代理层，那么我们怎么让 `Form` 表单容器和表单元素组件建立联系，那么我们是不是就无法通过 `Form` 实例的 `getFormData` 方法来全局收集到所有的表单元素的输入值。

那我们就可以这么理解，通过 `Form.Proxy` 代理过后的组件就跟 `Form` 建立了通信，从而实现数据双向输送。

传递到 `Form.Proxy` 中的所有属性，都会**透传**到目标组件中（即 `to` 属性传递的组件），除了`to`、`verify`和`verifyMsg`这些私有属性。

**问题二：是不是所有的组件都可以用在这种模式下成为表单元素**

只要组件支持 `onChange` 属性回调返回，那就可以通过 `Form.Proxy` 成为 `Form` 的表单元素。


**问题三：为什么需要添加 `getValue` 属性**

`getValue` 实际上是一种钩子形态，它让接入的组件可以更加灵活。
举个例子：
```jsx
onChange = (e) => {
    console.log('val:' + e.target.value)
}
...
<Input onChange={this.onChange}>
```

`Input` 组件的形参实际上是一个合成事件对象，并不是我们最终想要的数据结果，`getValue` 就提供了这么一种能力来帮我们返回最终想要的数据。

如果 `onChange` 的形参已经是我们最终想要的数据结果，那么 `getValue` 就可以省略，因为我们会默认处理。


#### 3.3.2 方案二：withFormContext

通过 `Form.Proxy` 我们确实达到了目的，代码中再也不需要写一大堆的 `onChange` 来绑定数据，我们只需要简单的一个 `bn` 进行绑定就可以实现数据全量收集。

但是 `Input` 和 `TextArea` 上一大堆的 `getValue` 钩子，看着还是很难受，都是些重复代码。实际上, `Form.Proxy` 是针对一些自定义的组件而设计的，它适合于使用频率不高的组件。

像 `Input`、`TextArea`、`Select` 这些高频组件，我们推荐使用 `withFormContext` 进行一次封装，然后统一使用封装后的组件，看下面例子：

```jsx
// input.jsx

import Form from '@monajs/react-form'
import { Input } from 'antd'

const { withFormContext } = Form

const TextArea = Input.TextArea

const I = withFormContext(Input, (val) => val.target.value)

I.TextArea = withFormContext(TextArea, (val) => val.target.value)

export default I

```

投入使用：

```jsx
import React from 'react'
import { Button } from 'antd'
import Form from '@monajs/react-form'
import Input from './input.jsx'

const { TextArea } = Input

const Test = () => {
  const formRef = React.createRef()

  const getForm = () => {
    const formData = formRef.current.getFormData()
    console.log(formData)
  }

  return (
    <Form ref={formRef}>
      <TextArea bn='name' />
      <Input bn='age' />
      <Button onClick={getForm} >提交</Button>
    </Form>
  )
}

export default Test
```
```js
// 打印结果
{
    name: 'fangke',
    age: 18
}
```

### 3.4 错误展示（withVerifyContext）

在 3.1.2 章节中我们介绍，通过 `getVerifyInfo` 方法我们可以获取到全量的校验未通过信息。那么我们能否实现一个实时报错的功能呢？

当然是可以，我们先来看一个封装好的实例，也就是我们 2 章节中使用的 `FormItem` 组件。

```jsx

import React from 'react'
import PropTypes from 'prop-types'
import Form from '@monajs/react-form'
import { Row, Col } from 'antd'
import './index.less'

const DefaultFormWrap = (props) => {
  const {
    children = null,
    verifyMsg = '',
    required = false,
    label = '',
    desc = '',
    className = '',
    span = 6
  } = props

  return (
    <Row className={['page-form-item', className]}>
      <Col className={['label', { 'required': required }]} span={span}>{label}</Col>
      <Col className='content' span={24 - span}>
        {children}
        <If condition={verifyMsg}>
          <div className='error'>{verifyMsg}</div>
        </If>
        <If condition={!error && !verifyMsg && desc}>
          <div className='desc' dangerouslySetInnerHTML={{ __html: desc }} />
        </If>
      </Col>
    </Row>
  )

}

DefaultFormWrap.propTypes = {
  required: PropTypes.bool,
  span: PropTypes.number,
  label: PropTypes.string,
  desc: PropTypes.string,
  verifyMsg: PropTypes.string, // 附加属性
  className: PropTypes.string,
  children: PropTypes.node
}

export default Form.withVerifyContext(DefaultFormWrap)

```

实际上 `FormItem` 就是一个纯UI展示组件，通过 `Form.withVerifyContext` 高阶组件返回的组件会附加一个 `verifyMsg` 属性。如果校验未通过（实时进行：每次的 `onChange` 触发都会进行校验），就会收到校验未通过的提示信息，并做UI展示。


**问题：我们如何让 `FormItem` 知道要提示哪一个表单元素的校验未通过信息**

```jsx
<FormItem bn='name' label='姓名' desc='请填写' required>
    <Input bn='name' />
</FormItem>
```

我们通过 `bn` 属性来跟表单元素进行绑定。`FormItem` 会提示跟自身 `bn` 绑定值一致的表单元素的校验信息。


### 3.5 错误校验上下文（FormVerifyContext）

除了通过 `Form.withVerifyContext` 高阶组件来获取单个校验信息，我们还可以通过上下文实时获取批量校验未通过信息。

```jsx
import Form from '@monajs/react-form'
const { FormVerifyContext } = Form

...

<FormVerifyContext.Consumer>
    {(verifyInfo = {}) => (
       ...
    )}
</FormVerifyContext.Consumer>
```

## 4 使用场景

1. 各种表单，特别是大型表单，能大幅减少重复代码量，并且能够快速搞定。
2. 自定义表单系统，我们可以在这个组件的基础上，通过一份配置动态搭建出一个表单页面。

## 5 后续规划

后续会推出 [antd](https://ant.design/docs/react/introduce-cn) 的一套配套组件，因为是**透传**，所以跟 antd 的使用无异。

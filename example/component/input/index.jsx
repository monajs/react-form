/**
 * Input
 * author: yangxi
 */

import Form from '@monajs/react-form'
import { Input } from 'antd'

const { withFormContext } = Form

const TextArea = Input.TextArea

const I = withFormContext(Input, (val) => val.target.value)

I.TextArea = withFormContext(TextArea, (val) => val.target.value)

export default I

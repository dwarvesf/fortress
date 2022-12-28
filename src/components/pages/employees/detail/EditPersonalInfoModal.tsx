import {
  Col,
  DatePicker,
  Form,
  Input,
  Modal,
  notification,
  Row,
  Select,
} from 'antd'
import { client } from 'libs/apis'
import { useState } from 'react'
import { RequestUpdatePersonalInfoInput } from 'types/schema'
import moment from 'moment'
import { SELECT_BOX_DATE_FORMAT } from 'constants/date'
import { theme } from 'styles'
import { searchFilterOption } from 'utils/select'
import { getErrorMessage } from 'utils/string'

interface Props {
  employeeID: string
  isOpen: boolean
  initialValues?: Omit<RequestUpdatePersonalInfoInput, 'dob'> & {
    dob: moment.Moment
  }
  onClose: () => void
  onAfterSubmit: () => void
}

export const EditPersonalInfoModal = (props: Props) => {
  const { employeeID, isOpen, initialValues, onClose, onAfterSubmit } = props

  const [form] = Form.useForm()
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const onSubmit = async (values: Required<RequestUpdatePersonalInfoInput>) => {
    try {
      setIsSubmitting(true)

      await client.updateEmployeePersonalInfo(employeeID, values)

      notification.success({
        message: "Employee's personal info successfully updated!",
      })

      onClose()
      onAfterSubmit()
    } catch (error: any) {
      notification.error({
        message: getErrorMessage(
          error,
          "Could not update employee's personal info",
        ),
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Modal
      open={isOpen}
      onCancel={() => {
        onClose()
        form.resetFields()
      }}
      onOk={form.submit}
      okButtonProps={{ loading: isSubmitting }}
      destroyOnClose
      title="Edit personal info"
    >
      <Form form={form} onFinish={onSubmit} initialValues={initialValues}>
        <Row gutter={24}>
          <Col span={24}>
            <Form.Item
              label="Date of birth"
              name="dob"
              rules={[
                { required: true, message: 'Please select date of birth' },
              ]}
            >
              <DatePicker
                format={SELECT_BOX_DATE_FORMAT}
                style={{ width: '100%' }}
                placeholder="Select date of birth"
                className="bordered"
              />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              label="Gender"
              name="gender"
              rules={[{ required: true, message: 'Please select gender' }]}
            >
              <Select
                style={{ background: theme.colors.white }}
                placeholder="Select gender"
                showSearch
                showArrow
                options={['Male', 'Female'].map((key) => ({
                  value: key,
                  label: key,
                }))}
                filterOption={searchFilterOption}
                maxTagCount="responsive"
              />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              label="Address"
              name="address"
              rules={[
                { required: true, message: 'Please input address' },
                {
                  max: 200,
                  message:
                    'Address must be less than or equal to 200 characters',
                },
              ]}
            >
              <Input
                className="bordered"
                type="text"
                placeholder="Enter address"
              />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              label="Personal email"
              name="personalEmail"
              rules={[
                { required: true, message: 'Please input personal email' },
                { type: 'email', message: 'Wrong email format' },
              ]}
            >
              <Input
                className="bordered"
                type="email"
                placeholder="Enter personal email"
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}

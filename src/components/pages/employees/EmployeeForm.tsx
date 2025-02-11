import {
  Form,
  Row,
  Col,
  Input,
  Button,
  notification,
  Select,
  DatePicker,
} from 'antd'
import { FormWrapper } from 'components/common/FormWrapper'
import { AsyncSelect } from 'components/common/Select'
import { renderEmployeeOption } from 'components/common/Select/renderers/employeeOption'
import { renderStatusOption } from 'components/common/Select/renderers/statusOption'
import { SELECT_BOX_DATE_FORMAT, SERVER_DATE_FORMAT } from 'constants/date'
import { ROUTES } from 'constants/routes'
import { EmployeeStatus, employeeStatuses } from 'constants/status'
import { client, GET_PATHS } from 'libs/apis'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { NumericFormat } from 'react-number-format'
import { theme } from 'styles'
import { fullListPagination } from 'types/filters/Pagination'
import { RequestCreateEmployeeInput } from 'types/schema'
import {
  searchFilterOption,
  transformEmployeeDataToSelectOption,
  transformMetadataToSelectOption,
} from 'utils/select'
import { getErrorMessage } from 'utils/string'

interface Props {
  initialValues?: RequestCreateEmployeeInput
  isEditing?: boolean
}

export const EmployeeForm = (props: Props) => {
  const { initialValues, isEditing = false } = props
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const { push } = useRouter()

  const [form] = Form.useForm()

  const onCreateSubmit = async (
    values: Required<RequestCreateEmployeeInput>,
  ) => {
    try {
      setIsSubmitting(true)

      const { data } = await client.createNewEmployee(
        transformDataToSend(values),
      )

      notification.success({
        message: 'New employee successfully created!',
        btn: (
          <Button
            type="primary"
            onClick={() => {
              push(ROUTES.EMPLOYEE_DETAIL(data.id!))
            }}
          >
            View employee detail
          </Button>
        ),
        duration: 5,
      })

      // Redirect to employee list page if create successfully
      setTimeout(() => push(ROUTES.EMPLOYEES))
    } catch (error: any) {
      notification.error({
        message: getErrorMessage(error, 'Could not create new employee'),
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // TODO: const onEditSubmit

  const transformDataToSend = (
    values: Required<Record<string, any>>,
  ): RequestCreateEmployeeInput => {
    return {
      fullName: values.fullName,
      displayName: values.displayName,
      personalEmail: values.personalEmail,
      positions: values.positions,
      roles: values.roles,
      salary: parseFloat(values.salary),
      seniorityID: values.seniorityID,
      status: values.status,
      teamEmail: values.teamEmail,
      referredBy: values.referredBy,
      joinedDate: values.joinedDate
        ? values.joinedDate.format(SERVER_DATE_FORMAT)
        : '',
    }
  }

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues)
    }
  }, [initialValues]) // eslint-disable-line

  return (
    <FormWrapper
      footer={
        <Button
          type="primary"
          htmlType="submit"
          loading={isSubmitting}
          onClick={form.submit}
        >
          Submit
        </Button>
      }
    >
      <Form
        form={form}
        initialValues={initialValues}
        onFinish={(values) => {
          if (!isEditing) {
            onCreateSubmit(values as Required<RequestCreateEmployeeInput>)
          }
        }}
      >
        <Row gutter={24}>
          <Col span={24} md={{ span: 12 }}>
            <Form.Item
              label="Full Name"
              name="fullName"
              rules={[
                { required: true, message: 'Required' },
                {
                  max: 99,
                  message: 'Full name must be less than 100 characters',
                },
              ]}
            >
              <Input
                className="bordered"
                type="text"
                placeholder="Enter full name"
              />
            </Form.Item>
          </Col>

          <Col span={24} md={{ span: 12 }}>
            <Form.Item
              label="Display Name"
              name="displayName"
              rules={[
                { required: true, message: 'Required' },
                {
                  max: 99,
                  message: 'Display name must be less than 100 characters',
                },
              ]}
            >
              <Input
                className="bordered"
                type="text"
                placeholder="Enter display name"
              />
            </Form.Item>
          </Col>

          <Col span={24} md={{ span: 12 }}>
            <Form.Item
              label="Status"
              name="status"
              rules={[{ required: true, message: 'Required' }]}
            >
              <Select
                style={{ background: theme.colors.white }}
                placeholder="Select status"
                showSearch
                showArrow
                filterOption={searchFilterOption}
              >
                {Object.values(EmployeeStatus).map((status) => (
                  <Select.Option key={status} value={status}>
                    {employeeStatuses[status]}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          <Col span={24} md={{ span: 12 }}>
            <Form.Item
              label="Joined Date"
              name="joinedDate"
              rules={[{ required: true, message: 'Required' }]}
            >
              <DatePicker
                format={SELECT_BOX_DATE_FORMAT}
                style={{ width: '100%' }}
                placeholder="Select joined date"
                className="bordered"
              />
            </Form.Item>
          </Col>

          <Col span={24} md={{ span: 12 }}>
            <Form.Item
              label="Team Email"
              name="teamEmail"
              rules={[
                { required: true, message: 'Required' },
                { type: 'email', message: 'Wrong email format' },
              ]}
            >
              <Input
                className="bordered"
                type="email"
                placeholder="Enter team email"
              />
            </Form.Item>
          </Col>

          <Col span={24} md={{ span: 12 }}>
            <Form.Item
              label="Personal Email"
              name="personalEmail"
              rules={[
                { required: true, message: 'Required' },
                { type: 'email', message: 'Wrong email format' },
              ]}
            >
              <Input
                className="bordered"
                type="email"
                placeholder="Enter email"
              />
            </Form.Item>
          </Col>

          <Col span={24} md={{ span: 12 }}>
            <Form.Item
              label="Positions"
              name="positions"
              rules={[{ required: true, message: 'Required' }]}
            >
              <AsyncSelect
                mode="multiple"
                optionGetter={async () => {
                  const { data } = await client.getPositionsMetadata()
                  return data?.map(transformMetadataToSelectOption) || []
                }}
                swrKeys={GET_PATHS.getPositionMetadata}
                placeholder="Select positions"
              />
            </Form.Item>
          </Col>

          <Col span={24} md={{ span: 12 }}>
            <Form.Item
              label="Seniority"
              name="seniorityID"
              rules={[{ required: true, message: 'Required' }]}
            >
              <AsyncSelect
                optionGetter={async () => {
                  const { data } = await client.getSenioritiesMetadata()
                  return data?.map(transformMetadataToSelectOption) || []
                }}
                swrKeys={GET_PATHS.getSeniorityMetadata}
                placeholder="Select seniority"
              />
            </Form.Item>
          </Col>

          <Col span={24} md={{ span: 12 }}>
            <Form.Item
              label="Salary"
              name="salary"
              rules={[{ required: true, message: 'Required' }]}
              normalize={(value) =>
                value ? Number(value.replace(/[^\d.]/g, '')) : undefined
              }
            >
              <NumericFormat
                className="bordered"
                placeholder="Enter salary"
                thousandSeparator=","
                allowNegative={false}
                decimalScale={3}
                customInput={Input}
              />
            </Form.Item>
          </Col>

          <Col span={24} md={{ span: 12 }}>
            <Form.Item
              label="Roles"
              name="roles"
              rules={[{ required: true, message: 'Required' }]}
            >
              <AsyncSelect
                mode="multiple"
                optionGetter={async () => {
                  const { data } = await client.getAccountRolesMetadata()
                  return data?.map(transformMetadataToSelectOption) || []
                }}
                swrKeys={GET_PATHS.getRoleMetadata}
                placeholder="Select account roles"
              />
            </Form.Item>
          </Col>
          <Col span={24} md={{ span: 12 }}>
            <Form.Item label="Referred By" name="referredBy">
              <AsyncSelect
                optionGetter={async () => {
                  const { data } = await client.getEmployees({
                    ...fullListPagination,
                    // Only get active employees
                    workingStatuses: Object.values(EmployeeStatus).filter(
                      (status) => status !== EmployeeStatus.LEFT,
                    ),
                  })
                  return data?.map(transformEmployeeDataToSelectOption) || []
                }}
                swrKeys={GET_PATHS.getEmployees}
                placeholder="Select referrer"
                customOptionRenderer={renderEmployeeOption}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </FormWrapper>
  )
}

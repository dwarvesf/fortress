import { Form, Row, Col, Input, DatePicker, Select, Card } from 'antd'
import { FormInstance } from 'antd/es/form/Form'
import { AsyncSelect } from 'components/common/Select'
import { renderEmployeeOption } from 'components/common/Select/renderers/employeeOption'
import { renderStatusOption } from 'components/common/Select/renderers/statusOption'
import { SELECT_BOX_DATE_FORMAT } from 'constants/date'
import { projectTypes } from 'constants/projectTypes'
import { EmployeeStatus } from 'constants/status'
import { GET_PATHS, client } from 'libs/apis'
import { theme } from 'styles'
import { ProjectCreateProjectInput } from 'types/schema'
import {
  searchFilterOption,
  transformEmployeeDataToSelectOption,
  transformMetadataToSelectOption,
} from 'utils/select'

interface Props {
  form: FormInstance<any>
  initialValues?: ProjectCreateProjectInput
  onSubmit: (values: Required<ProjectCreateProjectInput>) => Promise<void>
}

export const ProjectForm = (props: Props) => {
  const { form, initialValues, onSubmit } = props

  const employeeOptionGetter = async () => {
    const { data } = await client.getEmployees({
      page: 1,
      size: 1000,
      preload: false,
      workingStatus: [EmployeeStatus.FULLTIME],
    })
    return (data || []).map(transformEmployeeDataToSelectOption)
  }

  return (
    <Card>
      <Form
        form={form}
        onFinish={(values) => {
          onSubmit(values as Required<ProjectCreateProjectInput>)
        }}
        initialValues={initialValues}
      >
        <Row gutter={24}>
          <Col span={24} md={{ span: 12 }}>
            <Form.Item
              label="Project name"
              name="name"
              rules={[
                { required: true, message: 'Please input project name' },
                {
                  max: 99,
                  message: 'Display name must be less than 100 characters',
                },
              ]}
            >
              <Input
                className="bordered"
                type="text"
                placeholder="Enter project name"
              />
            </Form.Item>
          </Col>

          <Col span={24} md={{ span: 12 }}>
            <Form.Item
              label="Status"
              name="status"
              rules={[{ required: true, message: 'Please select status' }]}
            >
              <AsyncSelect
                optionGetter={async () => {
                  const { data } = await client.getProjectStatusMetadata()
                  return data.map(transformMetadataToSelectOption)
                }}
                swrKeys={[
                  GET_PATHS.getProjectStatusMetadata,
                  'create-new-project',
                ]}
                placeholder="Select project status"
                customOptionRenderer={renderStatusOption}
              />
            </Form.Item>
          </Col>

          <Col span={24} md={{ span: 12 }}>
            <Form.Item
              label="Account manager"
              name="accountManagerID"
              rules={[
                {
                  required: true,
                  message: 'Please select account manager',
                },
              ]}
            >
              <AsyncSelect
                optionGetter={employeeOptionGetter}
                swrKeys={[
                  GET_PATHS.getEmployees,
                  'create-new-project',
                  'account-manager',
                ]}
                placeholder="Select account manager"
                customOptionRenderer={renderEmployeeOption}
              />
            </Form.Item>
          </Col>

          <Col span={24} md={{ span: 12 }}>
            <Form.Item
              label="Country"
              name="countryID"
              rules={[{ required: true, message: 'Please select country' }]}
            >
              <AsyncSelect
                optionGetter={async () => {
                  const { data } = await client.getCountryMetadata()
                  return data.map(transformMetadataToSelectOption)
                }}
                swrKeys={[GET_PATHS.getCountryMetadata, 'create-new-project']}
                placeholder="Select project country"
              />
            </Form.Item>
          </Col>
          <Col span={24} md={{ span: 12 }}>
            <Form.Item label="Delivery manager" name="deliveryManagerID">
              <AsyncSelect
                optionGetter={employeeOptionGetter}
                swrKeys={[
                  GET_PATHS.getEmployees,
                  'create-new-project',
                  'delivery-manager',
                ]}
                placeholder="Select delivery manager"
                customOptionRenderer={renderEmployeeOption}
              />
            </Form.Item>
          </Col>

          <Col span={24} md={{ span: 12 }}>
            <Form.Item label="Start date" name="startDate">
              <DatePicker
                bordered
                className="bg-white bordered"
                format={SELECT_BOX_DATE_FORMAT}
                style={{ width: '100%', borderColor: theme.colors.white }}
                placeholder="Select start date"
              />
            </Form.Item>
          </Col>

          <Col span={24} md={{ span: 12 }}>
            <Form.Item
              label="Project email"
              name="projectEmail"
              rules={[
                { required: true, message: 'Please input project email' },
                { type: 'email', message: 'Wrong email format' },
              ]}
            >
              <Input
                className="bordered"
                type="email"
                placeholder="Enter project email"
              />
            </Form.Item>
          </Col>

          <Col span={24} md={{ span: 12 }}>
            <Form.Item
              label="Client email"
              name="clientEmail"
              rules={[
                { required: true, message: 'Please input client email' },
                { type: 'email', message: 'Wrong email format' },
              ]}
            >
              <Input
                className="bordered"
                type="email"
                placeholder="Enter client email"
              />
            </Form.Item>
          </Col>

          <Col span={24} md={{ span: 12 }}>
            <Form.Item
              label="Type"
              name="type"
              rules={[{ required: true, message: 'Please select type' }]}
            >
              <Select
                style={{ background: theme.colors.white }}
                placeholder="Select type"
                showSearch
                showArrow
                options={Object.keys(projectTypes).map((key) => ({
                  value: key,
                  label: projectTypes[key as keyof typeof projectTypes],
                }))}
                filterOption={searchFilterOption}
                maxTagCount="responsive"
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Card>
  )
}

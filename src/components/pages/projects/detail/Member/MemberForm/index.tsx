import { Checkbox, Col, Form, Input, Row, Select } from 'antd'
import { client, GET_PATHS, Meta } from 'libs/apis'
import {
  ProjectAssignMemberInput,
  ViewEmployeeListDataResponse,
  ViewPositionResponse,
  ViewSeniorityResponse,
} from 'types/schema'
import {
  searchFilterOption,
  transformEmployeeDataToSelectOption,
  transformMetadataToSelectOption,
} from 'utils/select'
import { DeploymentType, deploymentTypes } from 'constants/deploymentTypes'
import {
  EmployeeStatus,
  ProjectMemberStatus,
  projectMemberStatuses,
} from 'constants/status'
import { renderEmployeeOption } from 'components/common/Select/renderers/employeeOption'
import { FormInstance } from 'antd/es/form/Form'
import { useEffect } from 'react'
import { useFetchWithCache } from 'hooks/useFetchWithCache'
import { theme } from 'styles'

export type MemberFormValues = Partial<ProjectAssignMemberInput>

interface Props {
  isAssigning?: boolean
  form: FormInstance<any>
  initialValues?: MemberFormValues
  excludedEmployeeIds?: string[]
  onSubmit: (values: MemberFormValues) => void
  getDataOnSubmit?: (
    e: ViewEmployeeListDataResponse & Meta,
    s: ViewSeniorityResponse,
    p: ViewPositionResponse,
  ) => void
}

export const MemberForm = (props: Props) => {
  const {
    isAssigning = false,
    form,
    initialValues,
    excludedEmployeeIds = [],
    onSubmit,
    getDataOnSubmit,
  } = props

  const employeeID = Form.useWatch('employeeID', form)
  const status: ProjectMemberStatus = Form.useWatch('status', form)

  const { data: employeesData, loading: isEmployeesDataLoading } =
    useFetchWithCache(
      [GET_PATHS.getEmployees, excludedEmployeeIds.join(''), 'member-form'],
      () =>
        client.getEmployees({
          page: 1,
          size: 1000,
          workingStatus: [EmployeeStatus.PROBATION, EmployeeStatus.FULLTIME],
        }),
    )

  const { data: senioritiesData, loading: isSenioritiesDataLoading } =
    useFetchWithCache([GET_PATHS.getSeniorityMetadata, 'member-form'], () =>
      client.getSenioritiesMetadata(),
    )

  const { data: positionsData, loading: isPositionsDataLoading } =
    useFetchWithCache([GET_PATHS.getPositionMetadata, 'member-form'], () =>
      client.getPositionsMetadata(),
    )

  // Set status to active if user selected an employee
  // We don't allow pending status if employeeID is available
  useEffect(() => {
    if (employeeID && status === ProjectMemberStatus.PENDING) {
      form.setFieldValue('status', ProjectMemberStatus.ACTIVE)
    }
  }, [employeeID]) // eslint-disable-line

  // Left date is only input-able if status === inactive
  useEffect(() => {
    if (status === ProjectMemberStatus.INACTIVE) {
      form.setFieldValue('leftDate', '')
    }
  }, [status]) // eslint-disable-line

  const isPending = status === ProjectMemberStatus.PENDING
  const isInactive = status === ProjectMemberStatus.INACTIVE

  return (
    <Form
      form={form}
      onFinish={(values) => {
        if (typeof getDataOnSubmit === 'function') {
          getDataOnSubmit(employeesData!, senioritiesData!, positionsData!)
        }
        onSubmit(values)
      }}
      initialValues={{
        ...initialValues,
      }}
    >
      <Row gutter={24}>
        <Col span={24} md={{ span: 12 }}>
          <Form.Item
            label="Member"
            name="employeeID"
            required={!isPending}
            rules={[
              {
                required: !isPending,
                message: 'Please select member',
              },
            ]}
          >
            <Select
              style={{
                background: theme.colors.white,
              }}
              placeholder={
                isEmployeesDataLoading ? 'Fetching data' : 'Select a member'
              }
              loading={isEmployeesDataLoading}
              disabled={isEmployeesDataLoading}
              showSearch
              showArrow
              filterOption={searchFilterOption}
              maxTagCount="responsive"
            >
              {(employeesData?.data || [])
                .filter(
                  (employee) =>
                    !excludedEmployeeIds.includes(employee?.id || ''),
                )
                .map(transformEmployeeDataToSelectOption)
                .map(renderEmployeeOption)}
            </Select>
          </Form.Item>
        </Col>
        <Col span={24} md={{ span: 12 }}>
          <Form.Item
            label="Seniority"
            name="seniorityID"
            required
            rules={[{ required: true, message: 'Please select seniority' }]}
          >
            <Select
              style={{
                background: theme.colors.white,
              }}
              placeholder={
                isSenioritiesDataLoading ? 'Fetching data' : 'Select seniority'
              }
              loading={isSenioritiesDataLoading}
              disabled={isSenioritiesDataLoading}
              showSearch
              showArrow
              filterOption={searchFilterOption}
              maxTagCount="responsive"
              options={senioritiesData?.data?.map(
                transformMetadataToSelectOption,
              )}
            />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item
            label="Positions"
            name="positions"
            required
            rules={[{ required: true, message: 'Please select positions' }]}
          >
            <Select
              mode="multiple"
              style={{
                background: theme.colors.white,
                overflow: 'auto',
              }}
              placeholder={
                isPositionsDataLoading ? 'Fetching data' : 'Select positions'
              }
              loading={isPositionsDataLoading}
              disabled={isPositionsDataLoading}
              showSearch
              showArrow
              filterOption={searchFilterOption}
              maxTagCount="responsive"
              options={positionsData?.data?.map(
                transformMetadataToSelectOption,
              )}
            />
          </Form.Item>
        </Col>
        <Col span={24} md={{ span: 12 }}>
          <Form.Item
            label="Deployment Type"
            name="deploymentType"
            required
            rules={[
              { required: true, message: 'Please select deployment type' },
            ]}
          >
            <Select
              placeholder="Select deployment type"
              options={Object.keys(deploymentTypes).map((status) => {
                return {
                  label: deploymentTypes[status as DeploymentType],
                  value: status,
                }
              })}
            />
          </Form.Item>
        </Col>
        <Col span={24} md={{ span: 12 }}>
          <Form.Item
            label="Joined Date"
            name="joinedDate"
            rules={[
              {
                required: isAssigning && !isPending,
                message: 'Please select joined date',
              },
            ]}
          >
            <Input
              type="date"
              placeholder="Select joined date"
              className="bordered"
            />
          </Form.Item>
        </Col>
        <Col span={24} md={{ span: 12 }}>
          <Form.Item
            label="Left Date"
            name="leftDate"
            rules={[
              {
                required: isInactive,
                message: 'Please select left date',
              },
            ]}
          >
            <Input
              type="date"
              placeholder="Select left date"
              className="bordered"
            />
          </Form.Item>
        </Col>
        <Col span={24} md={{ span: 12 }}>
          <Form.Item
            label="Rate"
            name="rate"
            required
            rules={[{ required: true, message: 'Please input rate' }]}
          >
            <Input
              type="number"
              placeholder="Enter rate"
              className="bordered"
            />
          </Form.Item>
        </Col>
        <Col span={24} md={{ span: 12 }}>
          <Form.Item label="Discount" name="discount">
            <Input
              type="number"
              placeholder="Enter discount"
              className="bordered"
            />
          </Form.Item>
        </Col>
        <Col span={24} md={{ span: 12 }}>
          <Form.Item
            label="Status"
            name="status"
            rules={[{ required: isAssigning, message: 'Please select status' }]}
          >
            <Select
              placeholder="Select status"
              options={Object.keys(projectMemberStatuses)
                .filter((status) => {
                  if (isAssigning && status === ProjectMemberStatus.INACTIVE) {
                    return false
                  }

                  if (employeeID && status === ProjectMemberStatus.PENDING) {
                    return false
                  }

                  return true
                })
                .map((status) => {
                  return {
                    label: projectMemberStatuses[status as ProjectMemberStatus],
                    value: status,
                  }
                })}
            />
          </Form.Item>
        </Col>
        <Col span={24} md={{ span: 12 }}>
          <Form.Item label="Role" name="isLead" valuePropName="checked">
            <Checkbox>Is Lead</Checkbox>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  )
}

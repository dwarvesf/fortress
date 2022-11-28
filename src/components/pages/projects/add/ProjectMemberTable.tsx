import { Space, Table, Tag } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import { AvatarWithName } from 'components/common/AvatarWithName'
import { DATE_FORMAT } from 'constants/date'
import { format } from 'date-fns'
import { Meta } from 'libs/apis'
import { Dispatch, SetStateAction, useMemo } from 'react'
import {
  ModelPosition,
  ModelSeniority,
  PkgHandlerProjectAssignMemberInput,
  ViewEmployeeListDataResponse,
  ViewPosition,
  ViewPositionResponse,
  ViewProjectMember,
  ViewSeniorityResponse,
} from 'types/schema'
import { capitalizeFirstLetter } from 'utils/string'
import { Actions } from './Actions'

export const ProjectMemberTable = ({
  data,
  memberData,
  setMemberData,
  getDataOnSubmit,
}: {
  data: ViewProjectMember[]
  memberData: PkgHandlerProjectAssignMemberInput[]
  setMemberData: Dispatch<SetStateAction<PkgHandlerProjectAssignMemberInput[]>>
  getDataOnSubmit?: (
    e: ViewEmployeeListDataResponse & Meta,
    s: ViewSeniorityResponse,
    p: ViewPositionResponse,
  ) => void
}) => {
  const columns = useMemo(() => {
    return [
      {
        title: 'Name',
        key: 'name',
        render: (value) =>
          value.displayName ? (
            <Space>
              <AvatarWithName user={value} />
              {value.isLead && <Tag color="red">Lead</Tag>}
            </Space>
          ) : (
            '-'
          ),
        fixed: 'left',
      },
      {
        title: 'Positions',
        key: 'positions',
        dataIndex: 'positions',
        render: (value: ViewPosition[]) =>
          value.length > 0 ? (
            <Space size={[0, 8]}>
              {value.map((position: ModelPosition) => (
                <Tag key={position.id}>{position.name}</Tag>
              ))}
            </Space>
          ) : (
            '-'
          ),
      },
      {
        title: 'Seniority',
        key: 'seniority',
        dataIndex: 'seniority',
        render: (value: ModelSeniority) => value?.name || '-',
      },
      {
        title: 'Deployment Type',
        key: 'deploymentType',
        dataIndex: 'deploymentType',
        render: (value) => (value ? capitalizeFirstLetter(value) : '-'),
      },
      {
        title: 'Joined Date',
        key: 'joinedDate',
        dataIndex: 'joinedDate',
        render: (value) => (value ? format(new Date(value), DATE_FORMAT) : '-'),
      },
      {
        title: 'Left Date',
        key: 'leftDate',
        dataIndex: 'leftDate',
        render: (value) => (value ? format(new Date(value), DATE_FORMAT) : '-'),
      },
      {
        key: 'action',
        render: (value) => (
          <Actions
            rowData={value}
            getDataOnSubmit={getDataOnSubmit}
            tableData={data}
            memberData={memberData}
            setMemberData={setMemberData}
          />
        ),
        fixed: 'right',
      },
    ] as ColumnsType<ViewProjectMember>
  }, [data, memberData, getDataOnSubmit, setMemberData])

  return (
    <Table
      rowKey={(row, rowIndex) => row.employeeID || String(rowIndex)}
      columns={columns}
      dataSource={data}
      pagination={false}
      scroll={{ x: 'max-content' }}
    />
  )
}

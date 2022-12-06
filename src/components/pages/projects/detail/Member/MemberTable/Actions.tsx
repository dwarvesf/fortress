import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { useDisclosure } from '@dwarvesf/react-hooks'
import { Col, Modal, notification, Row, Tooltip } from 'antd'
import { Button } from 'components/common/Button'
import { SERVER_DATE_FORMAT } from 'constants/date'
import { ProjectMemberStatus } from 'constants/status'
import { format } from 'date-fns'
import { client } from 'libs/apis'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { ViewProjectMember } from 'types/schema'
import { MemberFormModal } from '../MemberForm/MemberFormModal'

export const Actions = ({
  record,
  onAfterAction,
}: {
  record: ViewProjectMember
  onAfterAction: () => void
}) => {
  const {
    query: { id: projectId },
  } = useRouter()

  const {
    isOpen: isEditDialogOpen,
    onOpen: openEditDialog,
    onClose: closeEditDialog,
  } = useDisclosure()

  const [isLoading, setIsLoading] = useState(false)

  const onDelete = async () => {
    try {
      setIsLoading(true)
      await client.deleteProjectMember(
        projectId as string,
        record.employeeID || '',
      )

      notification.success({
        message: 'Project member deleted successfully!',
      })

      onAfterAction()
    } catch (error: any) {
      notification.error({
        message: error?.message || 'Could not delete this project member!',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const confirmDelete = () => {
    Modal.confirm({
      content: 'Are you sure you want to delete this project member?',
      okButtonProps: { loading: isLoading },
      onOk: onDelete,
    })
  }

  if (record.status === ProjectMemberStatus.INACTIVE) {
    return null
  }

  return (
    <>
      <Row justify="end" gutter={[8, 8]}>
        <Col>
          <Tooltip title="Edit">
            <Button
              type="text-primary"
              size="small"
              icon={<EditOutlined />}
              onClick={openEditDialog}
            />
          </Tooltip>
        </Col>
        <Col>
          <Tooltip title="Delete">
            <Button
              type="text-primary"
              size="small"
              icon={<DeleteOutlined />}
              onClick={confirmDelete}
            />
          </Tooltip>
        </Col>
      </Row>
      {isEditDialogOpen && (
        <MemberFormModal
          isEditing
          isOpen={isEditDialogOpen}
          onClose={closeEditDialog}
          projectSlotID={record.projectSlotID}
          projectMemberID={record.employeeID}
          initialValues={{
            ...record,
            positions:
              record.positions?.map((position) => position.id || '') || [],
            joinedDate: record.joinedDate
              ? format(new Date(record.joinedDate), SERVER_DATE_FORMAT)
              : undefined,
            leftDate: record.leftDate
              ? format(new Date(record.leftDate), SERVER_DATE_FORMAT)
              : undefined,
            seniorityID: record.seniority?.id || '',
          }}
          onAfterSubmit={onAfterAction}
        />
      )}
    </>
  )
}

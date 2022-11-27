import { Modal, notification } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import { Dispatch, SetStateAction, useState } from 'react'
import {
  PkgHandlerProjectAssignMemberInput,
  ViewEmployeeData,
  ViewPositionResponse,
  ViewSeniorityResponse,
} from 'types/schema'
import { StaffForm, StaffFormValues } from './detail/Staff/StaffForm/StaffForm'

interface Props {
  isOpen: boolean
  isEditing?: boolean
  initialValues?: PkgHandlerProjectAssignMemberInput
  onClose: () => void
  memberData: PkgHandlerProjectAssignMemberInput[]
  setMemberData: Dispatch<SetStateAction<PkgHandlerProjectAssignMemberInput[]>>
  getDataOnSubmit: (
    e: ViewEmployeeData,
    s: ViewSeniorityResponse,
    p: ViewPositionResponse,
  ) => void
}

export const ProjectMemberModal = (props: Props) => {
  const [form] = useForm()

  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    isOpen,
    isEditing = false,
    initialValues,
    onClose,
    memberData,
    setMemberData,
    getDataOnSubmit,
  } = props

  const onSubmit = async (values: StaffFormValues) => {
    try {
      setIsSubmitting(true)

      const newData = transformDataToSend(values)
      setMemberData([...memberData, newData])

      notification.success({
        message: `Member ${isEditing ? 'updated' : 'assign'} successfully!`,
      })

      onClose()
    } catch (error: any) {
      notification.error({
        message:
          error?.message ||
          `Could not ${isEditing ? 'update' : 'assign'} the member!`,
      })
    } finally {
      setIsSubmitting(false)
      form.resetFields()
    }
  }

  const transformDataToSend = (
    values: Record<string, any>,
  ): PkgHandlerProjectAssignMemberInput => {
    return {
      deploymentType: values.deploymentType || '',
      discount: values.discount,
      employeeID: values.employeeID,
      isLead: values.isLead,
      joinedDate: values.joinedDate,
      leftDate: values.leftDate,
      positions: values.positions || [],
      rate: parseFloat(values.rate) || 0,
      seniorityID: values.seniorityID || '',
      status: values.status || '',
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
      title={`${isEditing ? 'Edit' : 'Assign'} member`}
    >
      <StaffForm
        form={form}
        initialValues={initialValues}
        onSubmit={onSubmit}
        getDataOnSubmit={getDataOnSubmit}
      />
    </Modal>
  )
}

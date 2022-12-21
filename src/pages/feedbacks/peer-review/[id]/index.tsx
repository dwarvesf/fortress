import {
  Button,
  Col,
  Dropdown,
  Input,
  Menu,
  Modal,
  notification,
  Pagination,
  Row,
  Space,
  Table,
  Tag,
} from 'antd'
import { ColumnsType } from 'antd/lib/table'
import { AvatarArray } from 'components/common/AvatarArray'
import { UserAvatar } from 'components/common/AvatarWithName'
import { NameArray } from 'components/common/NameArray'
import { PageHeader } from 'components/common/PageHeader'
import { PeerReviewEventDetailActions } from 'components/pages/feedbacks/peer-review/PeerReviewEventDetailActions'
import { ProgressColumn } from 'components/common/ProgressColumn'
import { statusColors } from 'constants/colors'
import { ROUTES } from 'constants/routes'
import { SurveyEventStatus, surveyEventStatuses } from 'constants/status'
import { useFetchWithCache } from 'hooks/useFetchWithCache'
import { useFilter } from 'hooks/useFilter'
import { client, GET_PATHS } from 'libs/apis'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { SurveyDetailFilter } from 'types/filters/SurveyDetailFilter'
import { ViewTopic } from 'types/schema'
import debounce from 'lodash.debounce'
import { Breadcrumb } from 'components/common/Header/Breadcrumb'
import { More } from '@icon-park/react'
import { SEO } from 'components/common/SEO'

interface ColumnProps {
  eventStatus?: SurveyEventStatus
  onAfterDelete: () => void
  onAfterEdit: () => void
}

const columns = ({
  eventStatus,
  onAfterDelete,
  onAfterEdit,
}: ColumnProps): ColumnsType<ViewTopic> => [
  {
    title: 'Employee',
    key: 'employee',
    dataIndex: 'employee',
    render: (value) => <UserAvatar user={value} />,
    fixed: 'left',
  },
  {
    title: 'Participants',
    key: 'participants',
    dataIndex: 'participants',
    render: (value) => (value.length > 0 ? <AvatarArray data={value} /> : '-'),
  },
  {
    title: 'Completed',
    render: (value: ViewTopic) => (
      <ProgressColumn done={value.count?.done} total={value.count?.total} />
    ),
  },
  {
    title: 'Sent',
    render: (value: ViewTopic) => `${value.count?.sent}/${value.count?.total}`,
  },
  {
    title: '',
    render: (value: ViewTopic) => (
      <PeerReviewEventDetailActions
        topic={value}
        onAfterDelete={onAfterDelete}
        onAfterEdit={onAfterEdit}
        eventStatus={eventStatus}
      />
    ),
    fixed: 'right',
  },
]

const Default = () => {
  const {
    query: { id },
  } = useRouter()
  const peerReviewId = id as string
  const { filter, setFilter } = useFilter(new SurveyDetailFilter())
  const {
    data,
    loading,
    mutate: mutateSurveyDetail,
  } = useFetchWithCache(
    [GET_PATHS.getSurveyDetail(peerReviewId), peerReviewId, filter],
    () => client.getSurveyDetail(peerReviewId, filter),
  )
  const { title, status, topics: peerReviews = [] } = data?.data || {}
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys)
  }

  const onSendServey = async () => {
    try {
      setIsLoading(true)

      const selectedPeerReviews = peerReviews.filter((each) =>
        selectedRowKeys.includes(each.id!),
      )
      await client.sendSurvey(peerReviewId, {
        topics: selectedPeerReviews.map((each) => ({
          topicID: each.id!,
          participants:
            each.participants?.map((participant) => participant.id!) || [],
        })),
      })

      notification.success({
        message: 'Peer performance servey sent successfully!',
      })

      setSelectedRowKeys([])
      mutateSurveyDetail()
    } catch (error: any) {
      notification.error({
        message: error?.message || 'Could not send peer performance servey',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const confirmSendServey = () => {
    const selectedPeerReviews = peerReviews.filter((each) =>
      selectedRowKeys.includes(each.id || ''),
    )
    const participants = selectedPeerReviews.flatMap(
      (each) => each.participants || [],
    )
    if (participants.length === 0) {
      return
    }

    Modal.confirm({
      title: 'Send survey',
      content: (
        <>
          Do you want to send peer review feedback to{' '}
          <NameArray employees={participants} />?
        </>
      ),
      okText: 'Send',
      onOk: onSendServey,
    })
  }

  const onDelete = async () => {
    try {
      setIsLoading(true)

      await client.deleteSurvey(peerReviewId)

      notification.success({
        message: 'Peer performance review event deleted successfully!',
      })

      router.push(ROUTES.PEER_REVIEW)
    } catch (error: any) {
      notification.error({
        message:
          error?.message || 'Could not delete peer performance review event',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const confirmDelete = () => {
    Modal.confirm({
      title: 'Delete event',
      content: (
        <>
          Do you want to delete <strong>{title}</strong> event?
        </>
      ),
      okText: 'Delete',
      okButtonProps: { loading: isLoading },
      onOk: onDelete,
    })
  }

  const markDone = async () => {
    try {
      setIsLoading(true)

      await client.markSurveyAsDone(peerReviewId)

      notification.success({
        message: 'Peer performance review event marked as done successfully!',
      })

      mutateSurveyDetail()
    } catch (error: any) {
      notification.error({
        message:
          error?.message ||
          'Could not mark peer performance review event as done',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const confirmMarkDone = () => {
    Modal.confirm({
      title: 'Mark done',
      content: 'Do you want to mark this event as done?',
      okText: 'Mark done',
      okButtonProps: { loading: isLoading },
      onOk: markDone,
    })
  }

  return (
    <>
      <SEO title={`Peer Review - ${title || '-'}`} />

      <Breadcrumb
        items={[
          {
            label: 'Dashboard',
            href: ROUTES.DASHBOARD,
          },
          {
            label: 'Feedbacks',
          },
          {
            label: 'Peer Review',
            href: ROUTES.PEER_REVIEW,
          },
          {
            label: title || '-',
          },
        ]}
      />

      <Space direction="vertical" size={24} style={{ width: '100%' }}>
        <PageHeader
          backHref={ROUTES.PEER_REVIEW}
          title={
            <Space align="center">
              <span>{title}</span>
              {status && (
                <div style={{ display: 'flex' }}>
                  <Tag color={statusColors[status]}>
                    {surveyEventStatuses[status as SurveyEventStatus] || '-'}
                  </Tag>
                </div>
              )}
            </Space>
          }
          rightRender={
            <>
              <Col style={{ width: 256 }}>
                <Input
                  placeholder="Search by name..."
                  bordered
                  onChange={debounce((e) => {
                    setFilter({ keyword: e.target.value })
                  }, 500)}
                />
              </Col>
              <Col>
                <Button
                  type="primary"
                  disabled={!selectedRowKeys.length || isLoading}
                  loading={isLoading}
                  onClick={confirmSendServey}
                >
                  Send
                </Button>
              </Col>
              <Col style={{ display: 'flex', alignItems: 'center' }}>
                <Dropdown
                  placement="bottomRight"
                  trigger={['click']}
                  overlay={
                    <Menu>
                      <Menu.Item
                        disabled={status !== SurveyEventStatus.INPROGRESS}
                        onClick={confirmMarkDone}
                      >
                        Mark done
                      </Menu.Item>
                      <Menu.Item
                        disabled={status !== SurveyEventStatus.DRAFT}
                        onClick={confirmDelete}
                      >
                        Delete
                      </Menu.Item>
                    </Menu>
                  }
                >
                  <More size={24} />
                </Dropdown>
              </Col>
            </>
          }
        />
        <Table
          dataSource={peerReviews}
          columns={columns({
            onAfterDelete: mutateSurveyDetail,
            onAfterEdit: mutateSurveyDetail,
            eventStatus: status as SurveyEventStatus,
          })}
          rowSelection={{
            type: 'checkbox',
            selectedRowKeys,
            onChange: onSelectChange,
          }}
          rowKey={(row) => row.id as string}
          loading={loading}
          pagination={false}
          scroll={{ x: 'max-content' }}
        />
        <Row justify="end">
          <Pagination
            current={filter.page}
            onChange={(page) => setFilter({ page })}
            total={data?.total}
            pageSize={filter.size}
            hideOnSinglePage
          />
        </Row>
      </Space>
    </>
  )
}

export default Default

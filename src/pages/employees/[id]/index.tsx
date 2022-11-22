import { Spin, Tabs } from 'antd'
import { PageHeader } from 'components/common/PageHeader'
import { General } from 'components/pages/employees/detail/General'
import { useFetchWithCache } from 'hooks/useFetchWithCache'
import { client, GET_PATHS } from 'libs/apis'
import { useRouter } from 'next/router'

const Default = () => {
  const {
    query: { id },
  } = useRouter()

  const { data, loading } = useFetchWithCache(
    [GET_PATHS.getEmployees, id],
    () => client.getEmployee(id as string),
  )
  const employee = data?.data

  if (loading || !employee) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <Spin size="large" />
      </div>
    )
  }

  return (
    <>
      <PageHeader title={employee?.displayName || ''} />
      <Tabs
        defaultActiveKey="1"
        items={[
          {
            key: '1',
            label: 'General',
            children: <General data={employee} />,
          },
          {
            key: '2',
            label: 'Document',
            children: 'Document',
          },
        ]}
      />
    </>
  )
}

export default Default

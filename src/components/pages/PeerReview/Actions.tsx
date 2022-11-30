import { DeleteOutlined, EyeOutlined } from '@ant-design/icons'
import { Col, Row, Tooltip } from 'antd'
import { Button } from 'components/common/Button'

export const Actions = () => {
  return (
    <Row justify="end" gutter={[8, 8]}>
      <Col>
        <Tooltip title="View">
          <Button type="text-primary" size="small" icon={<EyeOutlined />} />
        </Tooltip>
      </Col>
      <Col>
        <Tooltip title="Delete">
          <Button type="text-primary" size="small" icon={<DeleteOutlined />} />
        </Tooltip>
      </Col>
    </Row>
  )
}

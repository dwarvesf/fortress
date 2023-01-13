import { Card, Tag } from 'antd'
import { AreaChart } from 'components/common/AreaChart'
import { CartesianAxisProps, TooltipProps } from 'recharts'
import { theme } from 'styles'
import { getTrendByPercentage, getTrendStatusColor } from 'utils/score'

interface Props {
  dataset: any[] // TODO: update type
}

// TODO: generic CustomTooltip if all datasets have the same interface
const CustomTooltip = (
  record: TooltipProps<any, any> & {
    dataset: any[]
  },
) => {
  const { dataset } = record

  if (record.active && record.payload?.length) {
    return (
      <Card
        bordered={false}
        bodyStyle={{
          padding: 12,
          borderRadius: 8,
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        }}
      >
        <strong>{record.label}</strong>
        <div>
          {record.payload.map((item) => {
            const currentWorkData = dataset.find(
              (d: any) => d.quarter === item.payload.quarter,
            )
            const currentWorkDataId = dataset.indexOf(currentWorkData)

            return (
              <span style={{ color: theme.colors.gray700 }} key={item.dataKey}>
                <span>Average: </span>
                {item.payload.trend === null ? (
                  <strong style={{ color: theme.colors.primary }}>
                    {item?.value === 0 ? 'No data' : item?.value}
                  </strong>
                ) : (
                  <>
                    <strong style={{ color: theme.colors.primary }}>
                      {item?.value === 0 ? 'No data' : item?.value}
                    </strong>{' '}
                    {getTrendByPercentage(
                      dataset[currentWorkDataId - 1].value,
                      item.payload.value,
                      item.payload.trend,
                    ) && (
                      <Tag
                        style={{
                          color: getTrendStatusColor(item.payload.trend),
                          borderColor: getTrendStatusColor(item.payload.trend),
                          backgroundColor: `${getTrendStatusColor(
                            item.payload.trend,
                          )}08`,
                        }}
                      >
                        {getTrendByPercentage(
                          dataset[currentWorkDataId - 1].value,
                          item.payload.value,
                          item.payload.trend,
                        )}
                      </Tag>
                    )}
                  </>
                )}
              </span>
            )
          })}
        </div>
      </Card>
    )
  }

  return null
}

const CustomAxisTick = ({
  x,
  y,
  payload,
  currentEvent,
}: CartesianAxisProps & {
  payload?: any // TODO: update type
  currentEvent: string
}) => {
  return (
    <g
      transform={`translate(${x},${y})`}
      style={{
        fontWeight: 400,
        fontSize: 13,
      }}
    >
      <text
        role="button"
        x={0}
        y={0}
        dy={14}
        textAnchor="middle"
        fill={theme.colors.gray700}
        style={{ fontWeight: payload.value === currentEvent ? 600 : 400 }}
      >
        {payload.value}
      </text>
    </g>
  )
}

export const EngineeringHealthAverageChart = (props: Props) => {
  const { dataset } = props
  return (
    <AreaChart
      width="100%"
      height={230}
      minWidth={320}
      dataset={dataset}
      lineDataKey="value"
      xAxisDataKey="quarter"
      xAxisTick={
        <CustomAxisTick currentEvent={dataset[dataset.length - 1].quarter} />
      }
      yAxisTicks={[1, 3, 5]}
      yAxisDomain={[0, 5]}
      customToolTip={<CustomTooltip dataset={dataset} />}
    />
  )
}

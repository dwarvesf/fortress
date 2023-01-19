import { Col, Row } from 'antd'
import { DomainTypes } from 'constants/feedbackTypes'
import { useState } from 'react'
import { getTrendByPercentage, getTrendStatusColor } from 'utils/score'
import { useFetchWithCache } from 'hooks/useFetchWithCache'
import { GET_PATHS, client } from 'libs/apis'
import { ViewAudit, ViewEngineeringHealth } from 'types/schema'
import { StatisticBlock } from '../StatisticBlock'
import { CardWithTabs } from './CardWithTabs'
import { AverageDatasetChart } from './AverageDatasetChart'
import { ProjectSizeCard } from './ProjectSizeCard'
import { WorkSurveyDomainCard } from './WorkSurveyDomainCard'
import { GroupDatasetChart } from './GroupDatasetChart'

const averageDatasetRenderer = (
  dataset: (ViewAudit | ViewEngineeringHealth)[],
) => {
  const datasetArray = dataset || []

  const statisticBlockRenderer = () => {
    if (datasetArray.length === 0) {
      return <StatisticBlock />
    }
    if (datasetArray.length === 1) {
      return (
        <StatisticBlock
          stat={(datasetArray[datasetArray.length - 1].avg || 0).toFixed(1)}
        />
      )
    }
    if (datasetArray.length > 1) {
      return (
        <StatisticBlock
          stat={(datasetArray[datasetArray.length - 1].avg || 0).toFixed(1)}
          postfix={getTrendByPercentage(
            datasetArray[datasetArray.length - 1].trend || 0,
          )}
          postfixColor={getTrendStatusColor(
            datasetArray[datasetArray.length - 1].trend || 0,
          )}
        />
      )
    }
  }

  return (
    <>
      {statisticBlockRenderer()}

      <div
        style={{
          width: '100%',
          overflowX: 'auto',
          overflowY: 'hidden',
        }}
      >
        <AverageDatasetChart dataset={datasetArray} />
      </div>
    </>
  )
}

const engineeringHealthGroupDatasetRenderer = (dataset: any) => {
  const datasetArray = dataset || []

  return (
    <div
      style={{
        width: '100%',
        overflowX: 'auto',
        overflowY: 'hidden',
      }}
    >
      <GroupDatasetChart
        dataKeys={['collaboration', 'delivery', 'feedback', 'quality']}
        dataset={datasetArray}
      />
    </div>
  )
}

const auditScoreGroupDatasetRenderer = (dataset: any) => {
  const datasetArray = dataset || []

  return (
    <div
      style={{
        width: '100%',
        overflowX: 'auto',
        overflowY: 'hidden',
      }}
    >
      <GroupDatasetChart
        dataKeys={[
          'backend',
          'blockchain',
          'frontend',
          'mobile',
          'process',
          'system',
        ]}
        dataset={datasetArray}
      />
    </div>
  )
}

const Projects = () => {
  const [selectedProjectId, setSelectedProjectId] = useState<string>('')

  const { data: projectsSizesData, loading: isProjectsSizesLoading } =
    useFetchWithCache(GET_PATHS.getProjectsSizes, () =>
      client.getProjectsSizes(),
    )

  const {
    data: projectsWorkSurveysData,
    loading: isProjectsWorkSurveysLoading,
  } = useFetchWithCache(
    [GET_PATHS.getProjectsWorkSurveysAverage, selectedProjectId],
    () => client.getProjectsWorkSurveysAverage(selectedProjectId),
  )

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col span={24} lg={{ span: 12 }} xl={{ span: 8 }}>
          <ProjectSizeCard
            data={projectsSizesData || {}}
            selectedProjectId={selectedProjectId}
            setSelectedProjectId={setSelectedProjectId}
            isLoading={isProjectsSizesLoading}
          />
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        {['workload', 'deadline', 'learning'].map((k) => (
          <Col span={8} key={k}>
            <WorkSurveyDomainCard
              data={projectsWorkSurveysData?.data || {}}
              domain={k as Exclude<DomainTypes, 'engagement'>}
              isLoading={isProjectsWorkSurveysLoading}
            />
          </Col>
        ))}
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <CardWithTabs
          groupKey="engineering-health"
          title="Engineering Health"
          tabTitles={['average', 'groups']}
          selectedProjectId={selectedProjectId}
          fetcher={() =>
            client.getProjectsEngineeringHealthScore(selectedProjectId)
          }
          childrenRenderers={[
            averageDatasetRenderer,
            engineeringHealthGroupDatasetRenderer,
          ]}
        />

        <CardWithTabs
          groupKey="audit-score"
          title="Audit Score"
          tabTitles={['average', 'groups']}
          selectedProjectId={selectedProjectId}
          fetcher={() => client.getProjectsAuditScore(selectedProjectId)}
          childrenRenderers={[
            averageDatasetRenderer,
            auditScoreGroupDatasetRenderer,
          ]}
        />
      </Row>
    </>
  )
}

export default Projects

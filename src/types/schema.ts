/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface GormDeletedAt {
  time?: string
  /** Valid is true if Time is not NULL */
  valid?: boolean
}

export interface ModelAccountingItem {
  amount?: number
  name?: string
}

export interface ModelAudience {
  created_at?: string
  email?: string
  full_name?: string
  id?: string
  source?: string[]
}

export interface ModelBankAccount {
  accountNumber?: string
  address?: string
  bankName?: string
  createdAt?: string
  currency?: ModelCurrency
  currencyID?: string
  deletedAt?: GormDeletedAt
  id?: string
  name?: string
  ownerName?: string
  routingNumber?: string
  swiftCode?: string
  uksortCode?: string
  updatedAt?: string
}

export interface ModelChapter {
  code?: string
  createdAt?: string
  deletedAt?: GormDeletedAt
  id?: string
  lead_id?: string
  name?: string
  updatedAt?: string
}

export interface ModelCountry {
  cities?: string[]
  code?: string
  createdAt?: string
  deletedAt?: GormDeletedAt
  id?: string
  name?: string
  updatedAt?: string
}

export interface ModelCurrency {
  createdAt?: string
  deletedAt?: GormDeletedAt
  id?: string
  locale?: string
  name?: string
  symbol?: string
  type?: string
  updatedAt?: string
}

export interface ModelDateTime {
  has_time?: boolean
  time?: string
}

export interface ModelDigest {
  created_at?: string
  id?: string
  name?: string
}

export interface ModelEarn {
  due_date?: string
  function?: string[]
  id?: string
  name?: string
  pics?: ModelEmployee[]
  priority?: string
  progress?: number
  reward?: number
  status?: string
  tags?: string[]
}

export interface ModelEmployee {
  address?: string
  avatar?: string
  basecampAttachableSGID?: string
  /** social services */
  basecampID?: string
  city?: string
  country?: string
  createdAt?: string
  dateOfBirth?: string
  deletedAt?: GormDeletedAt
  discordID?: string
  discordName?: string
  displayName?: string
  employeeChapters?: ModelEmployeeChapter[]
  employeeOrganizations?: ModelEmployeeOrganization[]
  employeePositions?: ModelEmployeePosition[]
  employeeRoles?: ModelEmployeeRole[]
  employeeStacks?: ModelEmployeeStack[]
  /** basic info */
  fullName?: string
  gender?: string
  githubID?: string
  gitlabID?: string
  horoscope?: string
  id?: string
  identityCardPhotoBack?: string
  identityCardPhotoFront?: string
  joinedDate?: string
  leftDate?: string
  lineManager?: ModelEmployee
  lineManagerID?: string
  linkedInName?: string
  localBankBranch?: string
  localBankCurrency?: string
  localBankNumber?: string
  localBankRecipientName?: string
  localBranchName?: string
  mbti?: string
  mentees?: ModelEmployee[]
  notionEmail?: string
  notionID?: string
  notionName?: string
  organizations?: ModelOrganization[]
  passportPhotoBack?: string
  passportPhotoFront?: string
  personalEmail?: string
  phoneNumber?: string
  placeOfResidence?: string
  positions?: ModelPosition[]
  projectMembers?: ModelProjectMember[]
  referredBy?: string
  referrer?: ModelEmployee
  roles?: ModelRole[]
  seniority?: ModelSeniority
  seniorityID?: string
  socialAccounts?: ModelSocialAccount[]
  teamEmail?: string
  updatedAt?: string
  username?: string
  wiseAccountNumber?: string
  wiseCurrency?: string
  /** payroll info */
  wiseRecipientEmail?: string
  wiseRecipientID?: string
  wiseRecipientName?: string
  /** working info */
  workingStatus?: string
}

export interface ModelEmployeeChapter {
  chapter?: ModelChapter
  chapterID?: string
  createdAt?: string
  deletedAt?: GormDeletedAt
  employeeID?: string
  id?: string
  updatedAt?: string
}

export interface ModelEmployeeOrganization {
  createdAt?: string
  deletedAt?: GormDeletedAt
  employeeID?: string
  id?: string
  organization?: ModelOrganization
  organizationID?: string
  updatedAt?: string
}

export interface ModelEmployeePosition {
  createdAt?: string
  deletedAt?: GormDeletedAt
  employeeID?: string
  id?: string
  position?: ModelPosition
  positionID?: string
  updatedAt?: string
}

export interface ModelEmployeeRole {
  createdAt?: string
  deletedAt?: GormDeletedAt
  employeeID?: string
  id?: string
  role?: ModelRole
  roleID?: string
  updatedAt?: string
}

export interface ModelEmployeeStack {
  createdAt?: string
  deletedAt?: GormDeletedAt
  employeeID?: string
  id?: string
  stack?: ModelStack
  stackID?: string
  updatedAt?: string
}

export interface ModelEvent {
  activity_type?: string
  created_at?: string
  date?: ModelDateTime
  id?: string
  name?: string
}

export interface ModelHiringPosition {
  created_at?: string
  id?: string
  name?: string
  project?: string[]
  status?: string
}

export interface ModelLikertScaleCount {
  agree?: number
  disagree?: number
  mixed?: number
  stronglyAgree?: number
  stronglyDisagree?: number
}

export interface ModelMemo {
  author?: string
  created_at?: string
  id?: string
  name?: string
  tags?: string[]
}

export interface ModelOrganization {
  avatar?: string
  code?: string
  createdAt?: string
  deletedAt?: GormDeletedAt
  id?: string
  name?: string
  updatedAt?: string
}

export interface ModelPosition {
  code?: string
  createdAt?: string
  deletedAt?: GormDeletedAt
  id?: string
  name?: string
  updatedAt?: string
}

export interface ModelProject {
  allowsSendingSurvey?: boolean
  avatar?: string
  bankAccount?: ModelBankAccount
  bankAccountID?: string
  clientEmail?: string
  code?: string
  country?: ModelCountry
  countryID?: string
  createdAt?: string
  deletedAt?: GormDeletedAt
  endDate?: string
  function?: string
  heads?: ModelProjectHead[]
  id?: string
  name?: string
  notionID?: string
  projectEmail?: string
  projectMembers?: ModelProjectMember[]
  projectStacks?: ModelProjectStack[]
  slots?: ModelProjectSlot[]
  startDate?: string
  status?: string
  type?: string
  updatedAt?: string
}

export interface ModelProjectHead {
  commissionRate?: number
  createdAt?: string
  deletedAt?: GormDeletedAt
  employee?: ModelEmployee
  employeeID?: string
  endDate?: string
  id?: string
  position?: string
  projectID?: string
  startDate?: string
  updatedAt?: string
}

export interface ModelProjectMember {
  createdAt?: string
  deletedAt?: GormDeletedAt
  deploymentType?: string
  discount?: number
  employee?: ModelEmployee
  employeeID?: string
  endDate?: string
  id?: string
  isLead?: boolean
  positions?: ModelPosition[]
  project?: ModelProject
  projectID?: string
  projectMemberPositions?: ModelProjectMemberPosition[]
  projectSlotID?: string
  rate?: number
  seniority?: ModelSeniority
  seniorityID?: string
  startDate?: string
  status?: string
  updatedAt?: string
  upsellPersonID?: string
}

export interface ModelProjectMemberPosition {
  createdAt?: string
  deletedAt?: GormDeletedAt
  id?: string
  position?: ModelPosition
  positionID?: string
  projectMemberID?: string
  updatedAt?: string
}

export interface ModelProjectSize {
  code?: string
  id?: string
  name?: string
  size?: number
}

export interface ModelProjectSlot {
  createdAt?: string
  deletedAt?: GormDeletedAt
  deploymentType?: string
  discount?: number
  id?: string
  project?: ModelProject
  projectID?: string
  projectMember?: ModelProjectMember
  projectSlotPositions?: ModelProjectSlotPosition[]
  rate?: number
  seniority?: ModelSeniority
  seniorityID?: string
  status?: string
  updatedAt?: string
  upsellPersonID?: string
}

export interface ModelProjectSlotPosition {
  createdAt?: string
  deletedAt?: GormDeletedAt
  id?: string
  position?: ModelPosition
  positionID?: string
  projectSlotID?: string
  updatedAt?: string
}

export interface ModelProjectStack {
  createdAt?: string
  deletedAt?: GormDeletedAt
  id?: string
  projectID?: string
  stack?: ModelStack
  stackID?: string
  updatedAt?: string
}

export interface ModelResourceUtilization {
  available?: number
  date?: string
  official?: number
  shadow?: number
}

export interface ModelRole {
  code?: string
  createdAt?: string
  deletedAt?: GormDeletedAt
  id?: string
  level?: number
  name?: string
  updatedAt?: string
}

export interface ModelSeniority {
  code?: string
  createdAt?: string
  deletedAt?: GormDeletedAt
  id?: string
  level?: number
  name?: string
  updatedAt?: string
}

export interface ModelSocialAccount {
  accountID?: string
  createdAt?: string
  deletedAt?: GormDeletedAt
  email?: string
  employeeID?: string
  id?: string
  name?: string
  type?: string
  updatedAt?: string
}

export interface ModelStack {
  avatar?: string
  code?: string
  createdAt?: string
  deletedAt?: GormDeletedAt
  id?: string
  name?: string
  updatedAt?: string
}

export interface ModelStaffingDemand {
  id?: string
  name?: string
  request?: string
}

export interface ModelTechRadar {
  assign?: string
  categories?: string[]
  id?: string
  name?: string
  quadrant?: string
  ring?: string
}

export interface ModelUpdate {
  audience?: string
  created_at?: string
  id?: string
  name?: string
}

export interface ModelValuation {
  /** money that company will receive in the future */
  accountReceivable?: {
    items?: ModelAccountingItem[]
    total?: number
  }
  /** valuation info */
  assets?: number
  currency?: string
  /** Total paid invoice, investment & bank interest */
  income?: {
    detail?: {
      consultantService?: number
      interest?: number
      investment?: number
    }
    total?: number
  }
  /** money that company will pay in the future */
  liabilities?: {
    items?: ModelAccountingItem[]
    total?: number
  }
  /** Sum of Expenses and payroll */
  outcome?: {
    detail?: {
      expense?: number
      investment?: number
      payroll?: number
    }
    total?: number
  }
  rate?: number
  /** basic info */
  year?: string
}

export interface RequestAssignMemberInput {
  deploymentType: string
  discount?: number
  employeeID?: string
  endDate?: string
  isLead?: boolean
  positions: string[]
  rate: number
  seniorityID: string
  startDate?: string
  status: string
}

export interface RequestBasicEventQuestionInput {
  answer?: string
  eventQuestionID: string
  note?: string
}

export interface RequestCreateEmployeeInput {
  displayName?: string
  fullName: string
  personalEmail: string
  positions: string[]
  referredBy?: string
  roleID: string
  salary: number
  seniorityID: string
  status: string
  teamEmail: string
}

export interface RequestCreatePositionInput {
  code: string
  name: string
}

export interface RequestCreateProjectInput {
  accountManagerID: string
  bankAccountID?: string
  clientEmail?: string[]
  code?: string
  countryID: string
  deliveryManagerID?: string
  function: string
  members?: RequestAssignMemberInput[]
  name: string
  notionID?: string
  projectEmail?: string
  startDate?: string
  status: string
  type?: string
}

export interface RequestCreateStackInput {
  avatar?: string
  code: string
  name: string
}

export interface RequestCreateSurveyFeedbackInput {
  fromDate?: string
  quarter?: string
  toDate?: string
  type: string
  year?: number
}

export interface RequestCreateWorkUnitBody {
  members?: string[]
  name: string
  stacks: string[]
  status: string
  type: string
  url?: string
}

export interface RequestDeleteTopicReviewersBody {
  reviewerIDs?: string[]
}

export interface RequestGetListEmployeeInput {
  chapters?: string[]
  keyword?: string
  lineManagers?: string[]
  organizations?: string[]
  /** page index */
  page?: number
  positions?: string[]
  preload?: boolean
  projects?: string[]
  seniorities?: string[]
  /** page size */
  size?: number
  stacks?: string[]
  workingStatuses?: string[]
}

export interface RequestSendSurveyInput {
  topicIDs?: string[]
  type: string
}

export interface RequestSubmitBody {
  answers: RequestBasicEventQuestionInput[]
  status: string
}

export interface RequestUpdateContactInfoInput {
  accountManagerID: string
  clientEmail?: string[]
  deliveryManagerID?: string
  projectEmail?: string
}

export interface RequestUpdateEmployeeGeneralInfoInput {
  discordID?: string
  discordName?: string
  displayName?: string
  email: string
  fullName: string
  githubID?: string
  joinedDate?: string
  leftDate?: string
  lineManagerID?: string
  linkedInName?: string
  notionEmail?: string
  notionID?: string
  notionName?: string
  organizationIDs?: string[]
  phone: string
  referredBy?: string
}

export interface RequestUpdateInfoInput {
  address?: string
  city?: string
  country?: string
  discordName?: string
  githubID?: string
  linkedInName?: string
  notionEmail?: string
  notionID?: string
  notionName?: string
  personalEmail: string
  phoneNumber: string
  placeOfResidence: string
}

export interface RequestUpdateMemberInput {
  deploymentType: string
  discount?: number
  employeeID?: string
  endDate?: string
  isLead?: boolean
  positions: string[]
  projectMemberID?: string
  projectSlotID: string
  rate: number
  seniorityID: string
  startDate?: string
  status: string
}

export interface RequestUpdatePersonalInfoInput {
  address: string
  city?: string
  country?: string
  dob: string
  gender: string
  personalEmail: string
  placeOfResidence?: string
}

export interface RequestUpdatePositionBody {
  code?: string
  name?: string
}

export interface RequestUpdateProjectGeneralInfoInput {
  bankAccountID?: string
  countryID: string
  function: string
  name: string
  notionID?: string
  stacks?: string[]
  startDate?: string
}

export interface RequestUpdateSkillsInput {
  chapters: string[]
  leadingChapters?: string[]
  positions: string[]
  seniority: string
  stacks: string[]
}

export interface RequestUpdateStackBody {
  avatar?: string
  code?: string
  name?: string
}

export interface RequestUpdateTopicReviewersBody {
  reviewerIDs?: string[]
}

export interface RequestUpdateWorkUnitBody {
  members?: string[]
  name: string
  stacks: string[]
  type: string
  url?: string
}

export interface RequestUpdateWorkUnitInput {
  body?: RequestUpdateWorkUnitBody
  projectID?: string
  workUnitID?: string
}

export interface ViewAccountRoleResponse {
  data?: ModelRole[]
}

export interface ViewActionItemReportResponse {
  data?: ViewAuditActionItemReport[]
}

export interface ViewActionItemSquash {
  snapDate?: string
  trend?: number
  value?: number
}

export interface ViewActionItemSquashReport {
  all?: ViewActionItemSquash[]
  high?: ViewActionItemSquash[]
  low?: ViewActionItemSquash[]
  medium?: ViewActionItemSquash[]
}

export interface ViewActionItemSquashReportResponse {
  data?: ViewActionItemSquashReport
}

export interface ViewActionItemTrend {
  high?: number
  low?: number
  medium?: number
}

/**
 * validation error details
 */
export interface ViewApiError {
  /** available options incase of field's payload is enums */
  enums?: string[]
  /** the field cause the error */
  field?: string
  /** error message */
  msg?: string
}

export interface ViewAudit {
  avg?: number
  quarter?: string
  trend?: number
}

export interface ViewAuditActionItemReport {
  high?: number
  low?: number
  medium?: number
  quarter?: string
  trend?: ViewActionItemTrend
}

export interface ViewAuditData {
  average?: ViewAudit[]
  groups?: ViewGroupAudit[]
}

export interface ViewAuditResponse {
  data?: ViewAuditData
}

export interface ViewAuditSummaries {
  summary?: ViewAuditSummary[]
}

export interface ViewAuditSummariesResponse {
  data?: ViewAuditSummaries
}

export interface ViewAuditSummary {
  audit?: ViewAuditValue
  avatar?: string
  code?: string
  health?: ViewAuditValue
  id?: string
  name?: string
  newItem?: ViewItemValue
  resolvedItem?: ViewItemValue
  size?: ViewItemValue
}

export interface ViewAuditValue {
  trend?: number
  value?: number
}

export interface ViewAuthData {
  accessToken?: string
  employee?: ViewEmployeeData
}

export interface ViewAuthUserResponse {
  data?: ViewLoggedInUserData
}

export interface ViewAvailableEmployee {
  avatar?: string
  displayName?: string
  fullName?: string
  id?: string
  positions?: ViewPosition[]
  projects?: ViewBasicProjectInfo[]
  seniority?: ViewSeniority
  stacks?: ViewStack[]
}

export interface ViewAvailableSlot {
  createdAt?: string
  id?: string
  positions?: ViewPosition[]
  project?: ViewBasicProjectInfo
  seniority?: ViewSeniority
  type?: string
}

export interface ViewBasicBankAccountInfo {
  accountNumber?: string
  bankName?: string
  id?: string
  ownerName?: string
}

export interface ViewBasicCountryInfo {
  code?: string
  id?: string
  name?: string
}

export interface ViewBasicEmployeeInfo {
  avatar?: string
  displayName?: string
  fullName?: string
  id?: string
  username?: string
}

export interface ViewBasicMember {
  avatar?: string
  displayName?: string
  employeeID?: string
  fullName?: string
  username?: string
}

export interface ViewBasicProjectHeadInfo {
  avatar?: string
  displayName?: string
  employeeID?: string
  fullName?: string
  position?: string
  username?: string
}

export interface ViewBasicProjectInfo {
  avatar?: string
  code?: string
  id?: string
  name?: string
  status?: string
  type?: string
}

export interface ViewChapter {
  code?: string
  id?: string
  leadID?: string
  name?: string
}

export interface ViewChapterResponse {
  data?: ModelChapter[]
}

export interface ViewCitiesResponse {
  data?: string[]
}

export interface ViewCountriesResponse {
  data?: ModelCountry[]
}

export interface ViewCreateMemberData {
  avatar?: string
  deploymentType?: string
  displayName?: string
  employeeID?: string
  fullName?: string
  isLead?: boolean
  positions?: ViewPosition[]
  projectMemberID?: string
  projectSlotID?: string
  seniority?: ModelSeniority
  status?: string
  username?: string
}

export interface ViewCreateMemberDataResponse {
  data?: ViewCreateMemberData
}

export interface ViewCreateProjectData {
  accountManager?: ViewProjectHead
  bankAccount?: ViewBasicBankAccountInfo
  clientEmail?: string[]
  code?: string
  country?: ViewBasicCountryInfo
  createdAt?: string
  deletedAt?: GormDeletedAt
  deliveryManager?: ViewProjectHead
  function?: string
  id?: string
  members?: ViewCreateMemberData[]
  name?: string
  projectEmail?: string
  startDate?: string
  status?: string
  type?: string
  updatedAt?: string
}

export interface ViewDomain {
  average?: number
  count?: ModelLikertScaleCount
  name?: string
}

export interface ViewEmployeeContentData {
  url?: string
}

export interface ViewEmployeeContentDataResponse {
  data?: ViewEmployeeContentData
}

export interface ViewEmployeeData {
  address?: string
  avatar?: string
  birthday?: string
  chapters?: ViewChapter[]
  city?: string
  country?: string
  createdAt?: string
  deletedAt?: GormDeletedAt
  discordID?: string
  discordName?: string
  displayName?: string
  /** basic info */
  fullName?: string
  gender?: string
  githubID?: string
  horoscope?: string
  id?: string
  joinedDate?: string
  leftDate?: string
  lineManager?: ViewBasicEmployeeInfo
  linkedInName?: string
  mbti?: string
  mentees?: ViewMenteeInfo[]
  notionID?: string
  notionName?: string
  organizations?: ViewOrganization[]
  personalEmail?: string
  phoneNumber?: string
  placeOfResidence?: string
  positions?: ViewPosition[]
  projects?: ViewEmployeeProjectData[]
  referredBy?: ViewBasicEmployeeInfo
  roles?: ViewRole[]
  seniority?: ModelSeniority
  stacks?: ViewStack[]
  /** working info */
  status?: string
  teamEmail?: string
  updatedAt?: string
  username?: string
}

export interface ViewEmployeeListDataResponse {
  data?: ViewEmployeeData[]
}

export interface ViewEmployeeProjectData {
  avatar?: string
  code?: string
  deploymentType?: string
  endDate?: string
  id?: string
  name?: string
  positions?: ViewPosition[]
  startDate?: string
  status?: string
}

export interface ViewEngagementDashboard {
  content?: string
  questionID?: string
  stats?: ViewEngagementDashboardQuestionStat[]
}

export interface ViewEngagementDashboardDetail {
  questionID?: string
  stats?: ViewEngagementDashboardQuestionDetailStat[]
}

export interface ViewEngagementDashboardQuestionDetailStat {
  field?: string
  point?: number
  startDate?: string
}

export interface ViewEngagementDashboardQuestionStat {
  point?: number
  startDate?: string
  title?: string
}

export interface ViewEngineeringHealth {
  avg?: number
  quarter?: string
  trend?: number
}

export interface ViewEngineeringHealthData {
  average?: ViewEngineeringHealth[]
  groups?: ViewGroupEngineeringHealth[]
}

export interface ViewEngineeringHealthResponse {
  data?: ViewEngineeringHealthData
}

export interface ViewEngineeringHealthTrend {
  collaboration?: number
  delivery?: number
  feedback?: number
  quality?: number
}

export interface ViewErrorResponse {
  error?: string
  errors?: ViewApiError[]
}

export interface ViewFeedBackReviewDetail {
  employee?: ViewBasicEmployeeInfo
  project?: ViewBasicProjectInfo
  questions?: ViewQuestionAnswer[]
  relationship?: string
  reviewer?: ViewBasicEmployeeInfo
  topicName?: string
}

export interface ViewFeedback {
  author?: ViewBasicEmployeeInfo
  employeeID?: string
  eventID?: string
  eventReviewerID?: string
  isRead?: boolean
  lastUpdated?: string
  projectID?: string
  status?: string
  subtype?: string
  title?: string
  topicID?: string
  type?: string
}

export interface ViewFeedbackCount {
  done?: number
  sent?: number
  total?: number
}

export interface ViewFeedbackDetail {
  answers?: ViewQuestionAnswer[]
  employeeID?: string
  eventID?: string
  project?: ViewBasicProjectInfo
  relationship?: string
  reviewer?: ViewBasicEmployeeInfo
  status?: string
  title?: string
  topicID?: string
}

export interface ViewFeedbackDetailResponse {
  data?: ViewFeedbackDetail
}

export interface ViewFeedbackReviewDetailResponse {
  data?: ViewFeedBackReviewDetail
}

export interface ViewGetDashboardResourceUtilizationResponse {
  data?: ModelResourceUtilization[]
}

export interface ViewGetEngagementDashboardDetailResponse {
  data?: ViewEngagementDashboardDetail[]
}

export interface ViewGetEngagementDashboardResponse {
  data?: ViewEngagementDashboard[]
}

export interface ViewGetQuestionResponse {
  data?: ViewQuestion[]
}

export interface ViewGroupAudit {
  backend?: number
  blockchain?: number
  frontend?: number
  mobile?: number
  process?: number
  quarter?: string
  system?: number
  trend?: ViewGroupAuditTrend
}

export interface ViewGroupAuditTrend {
  backend?: number
  blockchain?: number
  frontend?: number
  mobile?: number
  process?: number
  system?: number
}

export interface ViewGroupEngineeringHealth {
  collaboration?: number
  delivery?: number
  feedback?: number
  quality?: number
  quarter?: string
  trend?: ViewEngineeringHealthTrend
}

export interface ViewHiringResponse {
  data?: ModelHiringPosition[]
}

export interface ViewItemValue {
  trend?: number
  value?: number
}

export interface ViewLineManagersResponse {
  data?: ViewBasicEmployeeInfo[]
}

export interface ViewListBankAccountResponse {
  data?: ModelBankAccount[]
}

export interface ViewListFeedbackResponse {
  data?: ViewFeedback[]
}

export interface ViewListSurveyDetailResponse {
  data?: ViewSurveyDetail
}

export interface ViewListSurveyResponse {
  data?: ViewSurvey[]
}

export interface ViewListWorkUnitResponse {
  data?: ViewWorkUnit[]
}

export interface ViewLoggedInUserData {
  avatar?: string
  displayName?: string
  fullName?: string
  id?: string
  permissions?: string[]
  role?: string
  teamEmail?: string
}

export interface ViewMenteeInfo {
  avatar?: string
  displayName?: string
  fullName?: string
  id?: string
  positions?: ModelPosition[]
  seniority?: ModelSeniority
  username?: string
}

export interface ViewMessageResponse {
  message?: string
}

export interface ViewMetaData {
  code?: string
  id?: string
  name?: string
}

export interface ViewOrganization {
  avatar?: string
  code?: string
  id?: string
  name?: string
}

export interface ViewOrganizationsResponse {
  data?: ModelOrganization[]
}

export interface ViewPeerReviewer {
  eventReviewerID?: string
  isForcedDone?: boolean
  relationship?: string
  reviewer?: ViewBasicEmployeeInfo
  status?: string
}

export interface ViewPosition {
  code?: string
  id?: string
  name?: string
}

export interface ViewPositionResponse {
  data?: ModelPosition[]
}

export interface ViewProfileData {
  address?: string
  avatar?: string
  birthday?: string
  city?: string
  country?: string
  discordID?: string
  discordName?: string
  displayName?: string
  fullName?: string
  gender?: string
  githubID?: string
  id?: string
  linkedInName?: string
  notionEmail?: string
  notionID?: string
  notionName?: string
  personalEmail?: string
  phoneNumber?: string
  placeOfResidence?: string
  teamEmail?: string
  username?: string
}

export interface ViewProfileDataResponse {
  data?: ViewProfileData
}

export interface ViewProjectContentData {
  url?: string
}

export interface ViewProjectContentDataResponse {
  data?: ViewProjectContentData
}

export interface ViewProjectData {
  accountManager?: ViewProjectHead
  allowsSendingSurvey?: boolean
  avatar?: string
  bankAccount?: ViewBasicBankAccountInfo
  clientEmail?: string[]
  code?: string
  country?: ViewBasicCountryInfo
  createdAt?: string
  deletedAt?: GormDeletedAt
  deliveryManager?: ViewProjectHead
  endDate?: string
  function?: string
  id?: string
  industry?: string
  members?: ViewProjectMember[]
  name?: string
  notionID?: string
  projectEmail?: string
  salePerson?: ViewProjectHead
  stacks?: ViewStack[]
  startDate?: string
  status?: string
  technicalLeads?: ViewProjectHead[]
  type?: string
  updatedAt?: string
}

export interface ViewProjectDataResponse {
  data?: ViewProjectData
}

export interface ViewProjectHead {
  avatar?: string
  displayName?: string
  employeeID?: string
  fullName?: string
  username?: string
}

export interface ViewProjectListDataResponse {
  data?: ViewProjectData[]
}

export interface ViewProjectMember {
  avatar?: string
  deploymentType?: string
  discount?: number
  displayName?: string
  employeeID?: string
  endDate?: string
  fullName?: string
  isLead?: boolean
  positions?: ViewPosition[]
  projectMemberID?: string
  projectSlotID?: string
  rate?: number
  seniority?: ModelSeniority
  startDate?: string
  status?: string
  username?: string
}

export interface ViewProjectMemberListResponse {
  data?: ViewProjectMember[]
}

export interface ViewProjectSizeResponse {
  data?: ModelProjectSize[]
}

export interface ViewQuestion {
  category?: string
  content?: string
  id?: string
  order?: number
  subcategory?: string
  type?: string
}

export interface ViewQuestionAnswer {
  answer?: string
  content?: string
  domain?: string
  eventQuestionID?: string
  note?: string
  order?: number
  type?: string
}

export interface ViewResourceAvailability {
  employees?: ViewAvailableEmployee[]
  slots?: ViewAvailableSlot[]
}

export interface ViewResourceAvailabilityResponse {
  data?: ViewResourceAvailability
}

export interface ViewRole {
  code?: string
  id?: string
  name?: string
}

export interface ViewSeniority {
  code?: string
  id?: string
  name?: string
}

export interface ViewSeniorityResponse {
  data?: ModelSeniority[]
}

export interface ViewStack {
  avatar?: string
  code?: string
  id?: string
  name?: string
}

export interface ViewStackResponse {
  data?: ModelStack[]
}

export interface ViewSubmitFeedback {
  answers?: ViewQuestionAnswer[]
  employeeID?: string
  eventID?: string
  reviewer?: ViewBasicEmployeeInfo
  status?: string
  title?: string
  topicID?: string
}

export interface ViewSubmitFeedbackResponse {
  data?: ViewSubmitFeedback
}

export interface ViewSurvey {
  count?: ViewFeedbackCount
  domains?: ViewDomain[]
  endDate?: string
  id?: string
  startDate?: string
  status?: string
  subtype?: string
  title?: string
  type?: string
}

export interface ViewSurveyDetail {
  author?: ViewBasicEmployeeInfo
  endDate?: string
  eventID?: string
  startDate?: string
  status?: string
  subtype?: string
  title?: string
  topics?: ViewTopic[]
  type?: string
}

export interface ViewSurveyTopicDetail {
  employee?: ViewBasicEmployeeInfo
  participants?: ViewPeerReviewer[]
  title?: string
  topicID?: string
}

export interface ViewSurveyTopicDetailResponse {
  data?: ViewSurveyTopicDetail
}

export interface ViewTopic {
  comments?: number
  count?: ViewFeedbackCount
  domains?: ViewDomain[]
  employee?: ViewBasicEmployeeInfo
  eventID?: string
  id?: string
  isForcedDone?: boolean
  participants?: ViewBasicEmployeeInfo[]
  project?: ViewBasicProjectInfo
  reviewID?: string
  status?: string
  subtype?: string
  title?: string
  type?: string
}

export interface ViewTrend {
  deadline?: number
  learning?: number
  workload?: number
}

export interface ViewUnreadFeedbackCountData {
  count?: number
  reviewerID?: string
}

export interface ViewUnreadFeedbackCountResponse {
  data?: ViewUnreadFeedbackCountData
}

export interface ViewUpdateEmployeeStatusResponse {
  data?: ViewEmployeeData
}

export interface ViewUpdateGeneralEmployeeResponse {
  data?: ViewUpdateGeneralInfoEmployeeData
}

export interface ViewUpdateGeneralInfoEmployeeData {
  createdAt?: string
  deletedAt?: GormDeletedAt
  discordID?: string
  discordName?: string
  displayName?: string
  /** basic info */
  fullName?: string
  githubID?: string
  id?: string
  lineManager?: ViewBasicEmployeeInfo
  linkedInName?: string
  notionEmail?: string
  notionID?: string
  notionName?: string
  organizations?: ViewOrganization[]
  phoneNumber?: string
  referredBy?: ViewBasicEmployeeInfo
  teamEmail?: string
  updatedAt?: string
}

export interface ViewUpdatePersonalEmployeeData {
  address?: string
  birthday?: string
  city?: string
  country?: string
  createdAt?: string
  deletedAt?: GormDeletedAt
  gender?: string
  id?: string
  personalEmail?: string
  placeOfResidence?: string
  updatedAt?: string
}

export interface ViewUpdatePersonalEmployeeResponse {
  data?: ViewUpdatePersonalEmployeeData
}

export interface ViewUpdateProfileInfoData {
  address?: string
  city?: string
  country?: string
  createdAt?: string
  deletedAt?: GormDeletedAt
  discordID?: string
  discordName?: string
  githubID?: string
  id?: string
  linkedInName?: string
  notionEmail?: string
  notionID?: string
  notionName?: string
  phoneNumber?: string
  placeOfResidence?: string
  /** basic info */
  teamEmail?: string
  updatedAt?: string
  username?: string
}

export interface ViewUpdateProfileInfoResponse {
  data?: ViewUpdateProfileInfoData
}

export interface ViewUpdateProjectContactInfo {
  clientEmail?: string[]
  projectEmail?: string
  projectHead?: ViewBasicProjectHeadInfo[]
}

export interface ViewUpdateProjectContactInfoResponse {
  data?: ViewUpdateProjectContactInfo
}

export interface ViewUpdateProjectGeneralInfo {
  bankAccount?: ViewBasicBankAccountInfo
  country?: ViewBasicCountryInfo
  function?: string
  name?: string
  notionID?: string
  stacks?: ModelStack[]
  startDate?: string
}

export interface ViewUpdateProjectGeneralInfoResponse {
  data?: ViewUpdateProjectGeneralInfo
}

export interface ViewUpdateProjectStatusResponse {
  data?: ViewUpdatedProject
}

export interface ViewUpdateSkillEmployeeData {
  chapters?: ModelChapter[]
  createdAt?: string
  deletedAt?: GormDeletedAt
  id?: string
  positions?: ModelPosition[]
  seniority?: ModelSeniority
  stacks?: ModelStack[]
  updatedAt?: string
}

export interface ViewUpdateSkillsEmployeeResponse {
  data?: ViewUpdateSkillEmployeeData
}

export interface ViewUpdatedProject {
  createdAt?: string
  deletedAt?: GormDeletedAt
  endDate?: string
  id?: string
  name?: string
  startDate?: string
  status?: string
  type?: string
  updatedAt?: string
}

export interface ViewWorkSurvey {
  deadline?: number
  endDate?: string
  learning?: number
  trend?: ViewTrend
  workload?: number
}

export interface ViewWorkSurveyResponse {
  data?: ViewWorkSurveysData
}

export interface ViewWorkSurveySummary {
  data?: ViewWorkSurveySummaryEmployee[]
  type?: string
}

export interface ViewWorkSurveySummaryAnswer {
  answer?: string
  date?: string
}

export interface ViewWorkSurveySummaryEmployee {
  answers?: ViewWorkSurveySummaryAnswer[]
  project?: ViewBasicProjectInfo
  reviewer?: ViewBasicEmployeeInfo
}

export interface ViewWorkSurveySummaryResponse {
  data?: ViewWorkSurveySummary[]
}

export interface ViewWorkSurveysData {
  project?: ViewBasicProjectInfo
  workSurveys?: ViewWorkSurvey[]
}

export interface ViewWorkUnit {
  code?: string
  id?: string
  members?: ViewBasicMember[]
  name?: string
  projectID?: string
  stacks?: ViewStack[]
  status?: string
  type?: string
  url?: string
}

export interface ViewWorkUnitDistribution {
  development?: number
  employee?: ViewBasicEmployeeInfo
  learning?: number
  management?: number
  training?: number
}

export interface ViewWorkUnitDistributionData {
  workUnitDistributions?: ViewWorkUnitDistribution[]
}

export interface ViewWorkUnitDistributionsResponse {
  data?: ViewWorkUnitDistributionData
}

export interface ViewWorkUnitResponse {
  data?: ViewWorkUnit
}

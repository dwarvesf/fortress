import { EmployeeListFilter } from 'types/filters/EmployeeListFilter'
import { ProjectListFilter } from 'types/filters/ProjectListFilter'
import { ProjectMemberListFilter } from 'types/filters/ProjectMemberListFilter'
import {
  ViewAuthData,
  ViewProfileData,
  ViewEmployeeListDataResponse,
  ViewProjectListDataResponse,
  ViewMetaData,
  ViewEmployeeData,
  ViewAccountRoleResponse,
  ViewPositionResponse,
  ViewSeniorityResponse,
  PkgHandlerEmployeeCreateEmployeeInput,
  PkgHandlerProfileUpdateInfoInput,
  ViewProjectData,
  ViewProjectMemberListResponse,
  PkgHandlerEmployeeUpdateGeneralInfoInput,
  ViewUpdateGeneralEmployeeResponse,
  PkgHandlerEmployeeUpdateSkillsInput,
  ViewUpdateSkillsEmployeeResponse,
  ViewStackResponse,
  ViewChapterResponse,
  PkgHandlerEmployeeUpdatePersonalInfoInput,
  ViewUpdatePersonalEmployeeResponse,
  ViewProjectMember,
  GithubComDwarvesfFortressApiPkgHandlerProjectUpdateMemberInput,
  GithubComDwarvesfFortressApiPkgHandlerProjectAssignMemberInput,
  PkgHandlerProjectCreateProjectInput,
  ViewCreateProjectData,
  PkgHandlerProjectUpdateGeneralInfoInput,
  ViewUpdateProjectGeneralInfoResponse,
  PkgHandlerProjectUpdateContactInfoInput,
  ViewUpdateProjectContactInfoResponse,
} from 'types/schema'
import qs from 'qs'
import fetcher from './fetcher'

const BASE_URL = process.env.BASE_URL

export interface Response<T> {
  data: T
}

// keys for swr
export const GET_PATHS = {
  getUsers: '/users',
  getEmployees: '/employees',
  getProjects: '/projects',
  getProjectMemberList: (id: string) => `/projects/${id}/members`,
  getAccountStatusMetadata: '/metadata/account-statuses',
  getPositionMetadata: '/metadata/positions',
  getAccountRoleMetadata: '/metadata/account-roles',
  getSeniorityMetadata: '/metadata/seniorities',
  getProjectStatusMetadata: '/metadata/project-statuses',
  getStackMetadata: '/metadata/stacks',
  getCountryMetadata: '/metadata/countries',
  getChapterMetadata: '/metadata/chapters',
}
export interface Meta {
  page?: number
  size?: number
  sort?: string
  total?: number
}

class Client {
  headers: HeadersInit = {
    'Content-Type': 'application/json',
  }

  privateHeaders: HeadersInit = {
    ...this.headers,
  }

  public setAuthToken(token: string) {
    this.privateHeaders = {
      ...this.privateHeaders,
      Authorization: `Bearer ${token}`,
    }
  }

  public clearAuthToken() {
    this.privateHeaders = { ...this.headers }
  }

  public login(code: string, redirectUrl: string) {
    return fetcher<Response<ViewAuthData>>(`${BASE_URL}/auth`, {
      method: 'POST',
      headers: {
        ...this.headers,
      },
      body: JSON.stringify({ code, redirectUrl }),
    })
  }

  public getProfile() {
    return fetcher<Response<ViewProfileData>>(`${BASE_URL}/profile`, {
      headers: { ...this.privateHeaders },
    })
  }

  public updateProfile(data: Partial<PkgHandlerProfileUpdateInfoInput>) {
    return fetcher<Response<ViewProfileData>>(`${BASE_URL}/profile`, {
      headers: { ...this.privateHeaders },
      method: 'PUT',
      body: JSON.stringify(data),
    })
  }

  public getEmployees(filter: EmployeeListFilter) {
    const queryString = qs.stringify(filter)

    return fetcher<ViewEmployeeListDataResponse & Meta>(
      `${BASE_URL}/employees?${queryString}`,
      {
        headers: { ...this.privateHeaders },
      },
    )
  }

  public getEmployee(id: string) {
    return fetcher<Response<ViewEmployeeData>>(`${BASE_URL}/employees/${id}`, {
      headers: { ...this.privateHeaders },
    })
  }

  public updateEmployeeStatus(id: string, employeeStatus: string) {
    return fetcher<Response<ViewEmployeeData>>(
      `${BASE_URL}/employees/${id}/employee-status`,
      {
        method: 'PUT',
        headers: { ...this.privateHeaders, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          employeeStatus,
        }),
      },
    )
  }

  public getProjects(filter: ProjectListFilter) {
    const queryString = qs.stringify(filter)

    return fetcher<ViewProjectListDataResponse & Meta>(
      `${BASE_URL}/projects?${queryString}`,
      {
        headers: { ...this.privateHeaders },
      },
    )
  }

  public getProject(id: string) {
    return fetcher<Response<ViewProjectData>>(`${BASE_URL}/projects/${id}`, {
      headers: { ...this.privateHeaders },
    })
  }

  public getProjectMemberList(
    projectId: string,
    filter: ProjectMemberListFilter,
  ) {
    const queryString = qs.stringify(filter)

    return fetcher<ViewProjectMemberListResponse & Meta>(
      `${BASE_URL}/projects/${projectId}/members?${queryString}`,
      {
        headers: { ...this.privateHeaders },
      },
    )
  }

  public updateProjectStatus(id: string, status: string) {
    return fetcher<Response<ViewEmployeeData>>(
      `${BASE_URL}/projects/${id}/status`,
      {
        method: 'PUT',
        headers: { ...this.privateHeaders, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status,
        }),
      },
    )
  }

  public getSenioritiesMetadata() {
    return fetcher<ViewSeniorityResponse>(`${BASE_URL}/metadata/seniorities`, {
      headers: { ...this.privateHeaders },
    })
  }

  public getPositionsMetadata() {
    return fetcher<ViewPositionResponse>(`${BASE_URL}/metadata/positions`, {
      headers: { ...this.privateHeaders },
    })
  }

  public getAccountRolesMetadata() {
    return fetcher<ViewAccountRoleResponse>(
      `${BASE_URL}/metadata/account-roles`,
      {
        headers: { ...this.privateHeaders },
      },
    )
  }

  public getProjectStatusMetadata = () => {
    return fetcher<Response<ViewMetaData[]>>(
      `${BASE_URL}/metadata/project-statuses`,
      {
        headers: { ...this.privateHeaders },
      },
    )
  }

  public getStackMetadata = () => {
    return fetcher<ViewStackResponse>(`${BASE_URL}/metadata/stacks`, {
      headers: { ...this.privateHeaders },
    })
  }

  public getChaptersMetadata = () => {
    return fetcher<ViewChapterResponse>(`${BASE_URL}/metadata/chapters`, {
      headers: { ...this.privateHeaders },
    })
  }

  public getCountryMetadata = () => {
    return fetcher<Response<ViewMetaData[]>>(`${BASE_URL}/metadata/countries`, {
      headers: { ...this.privateHeaders },
    })
  }

  public createNewEmployee(data: PkgHandlerEmployeeCreateEmployeeInput) {
    return fetcher<Response<ViewEmployeeData>>(`${BASE_URL}/employees`, {
      method: 'POST',
      headers: {
        ...this.privateHeaders,
      },
      body: JSON.stringify(data),
    })
  }

  public updateEmployeeGeneralInfo(
    id: string,
    data: PkgHandlerEmployeeUpdateGeneralInfoInput,
  ) {
    return fetcher<ViewUpdateGeneralEmployeeResponse>(
      `${BASE_URL}/employees/${id}/general-info`,
      {
        method: 'PUT',
        headers: {
          ...this.privateHeaders,
        },
        body: JSON.stringify(data),
      },
    )
  }

  public updateEmployeeSkills(
    id: string,
    data: PkgHandlerEmployeeUpdateSkillsInput,
  ) {
    return fetcher<ViewUpdateSkillsEmployeeResponse>(
      `${BASE_URL}/employees/${id}/skills`,
      {
        method: 'PUT',
        headers: {
          ...this.privateHeaders,
        },
        body: JSON.stringify(data),
      },
    )
  }

  public updateEmployeePersonalInfo(
    id: string,
    data: PkgHandlerEmployeeUpdatePersonalInfoInput,
  ) {
    return fetcher<ViewUpdatePersonalEmployeeResponse>(
      `${BASE_URL}/employees/${id}/personal-info`,
      {
        method: 'PUT',
        headers: {
          ...this.privateHeaders,
        },
        body: JSON.stringify(data),
      },
    )
  }

  public createNewProject(data: PkgHandlerProjectCreateProjectInput) {
    return fetcher<Response<ViewCreateProjectData>>(`${BASE_URL}/projects`, {
      method: 'POST',
      headers: {
        ...this.privateHeaders,
      },
      body: JSON.stringify(data),
    })
  }

  public createProjectMember(
    projectId: string,
    data: Partial<GithubComDwarvesfFortressApiPkgHandlerProjectAssignMemberInput>,
  ) {
    return fetcher<Response<ViewProjectMember>>(
      `${BASE_URL}/projects/${projectId}/members`,
      {
        method: 'POST',
        headers: {
          ...this.privateHeaders,
        },
        body: JSON.stringify(data),
      },
    )
  }

  public updateProjectMember(
    projectId: string,
    data: Partial<GithubComDwarvesfFortressApiPkgHandlerProjectUpdateMemberInput>,
  ) {
    return fetcher<Response<ViewProjectMember>>(
      `${BASE_URL}/projects/${projectId}/members`,
      {
        method: 'PUT',
        headers: {
          ...this.privateHeaders,
        },
        body: JSON.stringify(data),
      },
    )
  }

  public deleteProjectMember(projectId: string, memberId: string) {
    return fetcher<any>(
      `${BASE_URL}/projects/${projectId}/members/${memberId}`,
      {
        method: 'DELETE',
        headers: {
          ...this.privateHeaders,
        },
      },
    )
  }

  public updateProjectGeneralInfo(
    id: string,
    data: Partial<PkgHandlerProjectUpdateGeneralInfoInput>,
  ) {
    return fetcher<ViewUpdateProjectGeneralInfoResponse>(
      `${BASE_URL}/projects/${id}/general-info`,
      {
        method: 'PUT',
        headers: {
          ...this.privateHeaders,
        },
        body: JSON.stringify(data),
      },
    )
  }

  public updateProjectContactInfo(
    id: string,
    data: Partial<PkgHandlerProjectUpdateContactInfoInput>,
  ) {
    return fetcher<ViewUpdateProjectContactInfoResponse>(
      `${BASE_URL}/projects/${id}/contact-info`,
      {
        method: 'PUT',
        headers: {
          ...this.privateHeaders,
        },
        body: JSON.stringify(data),
      },
    )
  }
}

const client = new Client()

export { client }

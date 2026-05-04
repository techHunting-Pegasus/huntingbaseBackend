export class DashboardresponseDto {
  message?: string;
  status?: boolean;
  projects?: {
    id?: number
    name?: string;
    project_id?: string;
    description?: string;
  }
}
export class GetallDto {
  message?: string;
  status?: boolean;
  projects?: 
    projects[]
  
}

export class projects {
      id?: number
      name?: string;
      project_id?: string;
      description?: string;
    }
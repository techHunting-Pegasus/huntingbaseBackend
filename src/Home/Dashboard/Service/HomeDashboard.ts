import { Injectable } from "@nestjs/common";
import { DashboardDto } from "../Dto/crashlytics.req";
import { DbService } from "src/db/db.service";
import {  DashboardresponseDto, GetallDto } from "../ResponeDto/home.dasboardresponse";
import { buildInsertQuery, checkBundleIdExists, getprojects } from "src/modules/users/Register/users.queries";
import { randomUUID } from 'crypto';

@Injectable()
export class HomeDashboardService {
  constructor(
    private readonly db: DbService,
  ) {}

  
  async createrproject(dto: DashboardDto): Promise<DashboardresponseDto> {

    const existing = await this.db.query(
    checkBundleIdExists,
    [dto.bundle_id],
  );

  if (existing.rows.length > 0) {
    return {
      message: 'Bundle ID already exists',
      status: false,
    };
  }
  

    let projectid = randomUUID();

    const data = {
    ...dto,
    project_id: projectid,
  };

  const { query, values } = buildInsertQuery('project', data);

  

 let res =  await this.db.query(query, values);

  return {
    message: 'Project created successfully',
    status: true,
    projects: res.rows[0],
  };
}

  async getAllProjects(): Promise<GetallDto> {
     const result = await this.db.query(
    getprojects
  );

  return {
    message: 'Projects fetched successfully',
    status: true,
    projects: result.rows,
  };
    
  }
}
import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { crashResponseDto } from '../crashlytics/ResponeDto/crashlytics.responseDTO';
import { CrashlyticsService } from '../crashlytics/Service/crashlytics.service';
import { crashlyticsDto } from '../crashlytics/Dto/crashlytics.req';
import { HomeDashboardService } from '../Dashboard/Service/HomeDashboard';
import { DashboardDto } from '../Dashboard/Dto/crashlytics.req';
import { DashboardresponseDto, GetallDto } from '../Dashboard/ResponeDto/home.dasboardresponse';
import { AuthGuard } from 'src/common/Authguard';



@Controller('home')
export class HomeController {
  constructor(
    private readonly crashservice: CrashlyticsService,
    private readonly dashboardservice: HomeDashboardService
  ) { }

  @Post('upload_crash')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() dto: crashlyticsDto): Promise<crashResponseDto> {
    return this.crashservice.postcrash(dto);
  }

  @UseGuards(AuthGuard)
   @Post('createproject')
  @HttpCode(HttpStatus.CREATED)
  async createproject(@Body() dto: DashboardDto): Promise<DashboardresponseDto> {
    return this.dashboardservice.createrproject(dto);
  }
  
@UseGuards(AuthGuard)
  @Get('projects')
  @HttpCode(HttpStatus.OK)
  async getAllProjects(): Promise<GetallDto> {
    return this.dashboardservice.getAllProjects();
  }

}

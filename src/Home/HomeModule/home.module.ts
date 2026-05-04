import { Module } from '@nestjs/common';


import { JwtModule } from '@nestjs/jwt';
import { HomeController } from '../HomeController/home.controller';
import { CrashlyticsService } from '../crashlytics/Service/crashlytics.service';
import { HomeDashboardService } from '../Dashboard/Service/HomeDashboard';


@Module({
  imports: [
  ],
  controllers: [HomeController],
  providers: [CrashlyticsService, HomeDashboardService],
})
export class HomeModule {

}

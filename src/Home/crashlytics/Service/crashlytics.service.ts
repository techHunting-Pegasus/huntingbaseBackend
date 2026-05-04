import { Injectable } from "@nestjs/common";
import { crashlyticsDto } from "../Dto/crashlytics.req";
import { DbService } from "src/db/db.service";
import { crashResponseDto } from "../ResponeDto/crashlytics.responseDTO";

@Injectable()
export class CrashlyticsService {
  constructor(
    private readonly db: DbService,
  ) {}

  async postcrash(dto: crashlyticsDto ): Promise<crashResponseDto> {

    
    return {
      message: 'Crashlytics data received successfully',
      status: true,
    };
  }
}
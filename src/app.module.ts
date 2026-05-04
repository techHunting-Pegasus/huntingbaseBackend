import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbModule } from './db/db.module';

import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from './modules/users/Register/users.module';
import { HomeModule } from './Home/HomeModule/home.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DbModule,
    JwtModule.registerAsync({
      global: true,
      useFactory: () => ({
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: '7d' },
      }),
    }),
    UsersModule,
    HomeModule

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

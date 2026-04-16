import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbModule } from './db/db.module';

import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from './modules/users/Register/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DbModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET, // env se lo
      signOptions: { expiresIn: '7d' },
    }),
    UsersModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

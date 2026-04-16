import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { INSERT_USER, SELECT_USER_ID_BY_EMAIL } from './users.queries';
import { DbService } from 'src/db/db.service';
import { RegisterDto } from '../dto/register.dto';
import { RegisterResponseDto } from '../ResponseDto/registerResponse';
import { isUniqueViolation } from 'src/common/postgres-errors';

type InsertedUserRow = {
  id: string | number;
  email: string;
  category: string;
};

@Injectable()
export class UsersService {
  constructor(private readonly db: DbService) {}

  async register(dto: RegisterDto): Promise<RegisterResponseDto> {
    const email = dto?.email?.trim().toLowerCase();
    const category = dto?.category?.trim();

    const existing = await this.db.query<{ id: string | number }>(
      SELECT_USER_ID_BY_EMAIL,
      [email],
    );
    if (existing.rows.length > 0) {
      throw new ConflictException('An account with this email already exists');
    }

    const passwordHash = await bcrypt.hash(dto?.password ?? '', 10);

    try {
      const result = await this.db.query<InsertedUserRow>(INSERT_USER, [
        email,
        passwordHash,
        category,
      ]);
      const row = result.rows[0];
      if (!row) {
        throw new InternalServerErrorException('Could not create user');
      }
      return {
        message: 'User registered successfully',
        status: true,
        id: String(row.id),
        email: row.email,
        category: row.category,
      };
    } catch (err: unknown) {
      if (isUniqueViolation(err)) {
        throw new ConflictException(
          'An account with this email already exists',
        );
      }
      throw new InternalServerErrorException('Could not create user');
    }
  }
}

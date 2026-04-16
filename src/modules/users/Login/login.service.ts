import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { DbService } from '../../../db/db.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from '../dto/register.dto';
import { loginResponseDto } from '../ResponseDto/registerResponse';
import { SELECT_USER_BY_EMAIL } from '../Register/users.queries';

@Injectable()
export class AuthService {
  constructor(
    private readonly db: DbService,
    private readonly jwtService: JwtService,
  ) {}

  async login(dto: LoginDto): Promise<loginResponseDto> {
    const normalizedEmail = dto.email?.trim().toLowerCase();
    const password = dto.password;

    const result = await this.db.query<{
      id: string;
      email: string;
      password: string;
      category: string;
    }>(
      SELECT_USER_BY_EMAIL,
      [normalizedEmail],
    );

    const user = result.rows[0];

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isMatch = await bcrypt.compare(dto?.password ?? "", user.password);

    if (!isMatch) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // ✅ JWT Payload
    const payload = {
      sub: user.id,
      email: user.email,
      category: user.category,
    };

    // ✅ Access Token
    const accessToken = await this.jwtService.signAsync(payload);

    return {
      message: 'Login successful',
      accessToken,
      user: {
        id: user.id,
        email: user.email,
        category: user.category,
      },
    };
  }
}
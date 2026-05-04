// auth.guard.ts
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const authHeader = request.headers['authorization'];

    if (!authHeader) {
      throw new UnauthorizedException('Token missing');
    }

    const token = authHeader.split(' ')[1]; // Bearer TOKEN

    try {
      const decoded = this.jwtService.verify(token);
      request.user = decoded; 
      return true;
    } catch (err) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
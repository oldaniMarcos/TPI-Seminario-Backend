import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { IS_PUBLIC_KEY } from 'src/public/public.decorator';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private jwtService: JwtService, private reflector: Reflector) {}

  async canActivate(context: ExecutionContext) {

    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if(IS_PUBLIC_KEY) {
      return true
    }
    
    const request = context.switchToHttp().getRequest()
    const authorization = request.headers.authorization
    const token = authorization?.split(' ')[1]

    if(!token) {
      throw new UnauthorizedException()
    }

    try {
      const payload = await this.jwtService.verifyAsync(token)
      request.user = {
        id: payload.sub,
        username: payload.username,
      }
      return true
    } catch (error) {
      throw new UnauthorizedException(error)
    }
  }
}

import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private jwtService: JwtService, private reflector: Reflector) {}

  async canActivate(context: ExecutionContext) {

    const isPublic = this.reflector.get<boolean>('isPublic', context.getHandler())
    if(isPublic) {
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
